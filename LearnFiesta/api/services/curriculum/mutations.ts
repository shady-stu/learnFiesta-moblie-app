import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/api/services/firebase";
import type { CurriculumLessonInput, CurriculumMetrics } from "./curriculumType";
import { fetchCourseSections } from "./sections";
import {
  buildLesson,
  courseRef,
  formatDuration,
  normalizeResourceInputs,
  resourceCollectionRef,
  sectionRef,
  normalizeSection,
} from "./shared";


export const createCurriculumSection = async (
  courseId: string,
  title: string,
  order: number
) => {
  const sectionTitle = title.trim();
  if (!sectionTitle) throw new Error("Section title is required");

  const sectionDoc = await addDoc(collection(db, "courses", courseId, "sections"), {
    title: sectionTitle,
    order,
    lessons: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await syncCourseMetrics(courseId);
  return sectionDoc.id;
};

export const updateCurriculumSection = async (
  courseId: string,
  sectionId: string,
  title: string
) => {
  const sectionTitle = title.trim();
  if (!sectionTitle) throw new Error("Section title is required");

  await updateDoc(sectionRef(courseId, sectionId), {
    title: sectionTitle,
    updatedAt: serverTimestamp(),
  });
};

export const deleteCurriculumSection = async (courseId: string, sectionId: string) => {
  const resourcesSnapshot = await getDocs(
    query(
      resourceCollectionRef,
      where("courseId", "==", courseId),
      where("sectionId", "==", sectionId)
    )
  );

  const batch = writeBatch(db);
  resourcesSnapshot.docs.forEach((resourceDoc) => batch.delete(resourceDoc.ref));
  batch.delete(sectionRef(courseId, sectionId));
  batch.update(courseRef(courseId), { updatedAt: serverTimestamp() });

  await batch.commit();
  await syncCourseMetrics(courseId);
};

export const createCurriculumLesson = async (
  courseId: string,
  sectionId: string,
  data: CurriculumLessonInput
) => {
  const lessonId = doc(collection(db, "courses", courseId, "sections", sectionId, "_lessonIds")).id;
  const resources = normalizeResourceInputs(data.resources);

  await runTransaction(db, async (transaction) => {
    const targetSectionRef = sectionRef(courseId, sectionId);
    const sectionSnapshot = await transaction.get(targetSectionRef);

    if (!sectionSnapshot.exists()) {
      throw new Error("Section does not exist");
    }

    const currentSection = normalizeSection(sectionSnapshot.id, sectionSnapshot.data());
    const lesson = buildLesson(lessonId, data, currentSection.lessons.length, resources);

    transaction.update(targetSectionRef, {
      lessons: [...currentSection.lessons, lesson],
      updatedAt: serverTimestamp(),
    });

    resources.forEach((resource) => {
      transaction.set(doc(db, "resources", resource.id), {
        ...resource,
        courseId,
        sectionId,
        lessonId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    transaction.update(courseRef(courseId), { updatedAt: serverTimestamp() });
  });

  await syncCourseMetrics(courseId);
  return lessonId;
};

export const updateCurriculumLesson = async (
  courseId: string,
  sectionId: string,
  lessonId: string,
  data: CurriculumLessonInput
) => {
  const targetSectionRef = sectionRef(courseId, sectionId);
  const sectionSnapshot = await getDoc(targetSectionRef);

  if (!sectionSnapshot.exists()) {
    throw new Error("Section does not exist");
  }

  const currentSection = normalizeSection(sectionSnapshot.id, sectionSnapshot.data());
  const lessonIndex = currentSection.lessons.findIndex((lesson) => lesson.id === lessonId);

  if (lessonIndex === -1) {
    throw new Error("Lesson does not exist");
  }

  const resources = normalizeResourceInputs(data.resources);
  const nextLessons = [...currentSection.lessons];
  nextLessons[lessonIndex] = buildLesson(
    lessonId,
    data,
    currentSection.lessons[lessonIndex].order,
    resources
  );

  const existingResources = await getDocs(
    query(
      resourceCollectionRef,
      where("courseId", "==", courseId),
      where("sectionId", "==", sectionId),
      where("lessonId", "==", lessonId)
    )
  );

  const batch = writeBatch(db);
  existingResources.docs.forEach((resourceDoc) => batch.delete(resourceDoc.ref));
  resources.forEach((resource) => {
    batch.set(doc(db, "resources", resource.id), {
      ...resource,
      courseId,
      sectionId,
      lessonId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });

  batch.update(targetSectionRef, {
    lessons: nextLessons,
    updatedAt: serverTimestamp(),
  });
  batch.update(courseRef(courseId), { updatedAt: serverTimestamp() });

  await batch.commit();
  await syncCourseMetrics(courseId);
};

export const deleteCurriculumLesson = async (
  courseId: string,
  sectionId: string,
  lessonId: string
) => {
  const targetSectionRef = sectionRef(courseId, sectionId);
  const sectionSnapshot = await getDoc(targetSectionRef);

  if (!sectionSnapshot.exists()) return;

  const currentSection = normalizeSection(sectionSnapshot.id, sectionSnapshot.data());
  const nextLessons = currentSection.lessons
    .filter((lesson) => lesson.id !== lessonId)
    .map((lesson, index) => ({ ...lesson, order: index }));

  const existingResources = await getDocs(
    query(
      resourceCollectionRef,
      where("courseId", "==", courseId),
      where("sectionId", "==", sectionId),
      where("lessonId", "==", lessonId)
    )
  );

  const batch = writeBatch(db);
  existingResources.docs.forEach((resourceDoc) => batch.delete(resourceDoc.ref));
  batch.update(targetSectionRef, {
    lessons: nextLessons,
    updatedAt: serverTimestamp(),
  });
  batch.update(courseRef(courseId), { updatedAt: serverTimestamp() });

  await batch.commit();
  await syncCourseMetrics(courseId);
};

export const syncCourseMetrics = async (courseId: string): Promise<CurriculumMetrics> => {
  const sections = await fetchCourseSections(courseId);
  const totalLessons = sections.reduce((sum, section) => sum + section.lessons.length, 0);
  const totalMinutes = sections.reduce(
    (sum, section) =>
      sum +
      section.lessons.reduce(
        (lessonSum, lesson) => lessonSum + lesson.durationMinutes,
        0
      ),
    0
  );
  const metrics = {
    sectionCount: sections.length,
    totalLessons,
    totalMinutes,
    duration: formatDuration(totalMinutes),
  };

  await updateDoc(courseRef(courseId), {
    sectionCount: metrics.sectionCount,
    totalLessons: metrics.totalLessons,
    durationMinutes: metrics.totalMinutes,
    duration: metrics.duration,
    updatedAt: serverTimestamp(),
  });

  return metrics;
};

export const publishCourseCurriculum = async (courseId: string) => {
  const metrics = await syncCourseMetrics(courseId);

  if (metrics.sectionCount === 0) {
    throw new Error("Add at least one section before publishing");
  }

  if (metrics.totalLessons === 0) {
    throw new Error("Add at least one lesson before publishing");
  }

  await updateDoc(courseRef(courseId), {
    status: "published",
    isPublished: true,
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const instructorSnapshot = await getDocs(
    query(collection(db, "Instructor"), where("courseId", "==", courseId))
  );

  if (!instructorSnapshot.empty) {
    const batch = writeBatch(db);
    instructorSnapshot.docs.forEach((instructorDoc) => {
      batch.update(instructorDoc.ref, {
        isActive: true,
        updatedAt: serverTimestamp(),
      });
    });
    await batch.commit();
  }

  return metrics;
};
