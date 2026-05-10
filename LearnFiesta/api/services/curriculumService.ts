import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/api/services/firebase";

export type LessonType = "video" | "article" | "quiz";
export type ResourceType = "pdf" | "slides" | "link" | "file";

export type LessonResource = {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  order: number;
};

export type CurriculumLesson = {
  id: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  duration: string;
  description?: string;
  contentUrl?: string;
  order: number;
  resources: LessonResource[];
};

export type CurriculumSection = {
  id: string;
  title: string;
  order: number;
  lessons: CurriculumLesson[];
};

export type LessonResourceInput = {
  id?: string;
  title: string;
  type: ResourceType;
  url: string;
};

export type CurriculumLessonInput = {
  title: string;
  type: LessonType;
  durationMinutes: number;
  description?: string;
  contentUrl?: string;
  resources?: LessonResourceInput[];
};

export type CurriculumMetrics = {
  sectionCount: number;
  totalLessons: number;
  totalMinutes: number;
  duration: string;
};

const courseRef = (courseId: string) => doc(db, "courses", courseId);
const sectionRef = (courseId: string, sectionId: string) =>
  doc(db, "courses", courseId, "sections", sectionId);

const resourceCollectionRef = collection(db, "resources");

const isLessonType = (value: unknown): value is LessonType =>
  value === "video" || value === "article" || value === "quiz";

const isResourceType = (value: unknown): value is ResourceType =>
  value === "pdf" || value === "slides" || value === "link" || value === "file";

export const formatDuration = (minutes: number) => {
  const safeMinutes = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safeMinutes / 60);
  const mins = safeMinutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const normalizeResources = (resources: unknown): LessonResource[] => {
  if (!Array.isArray(resources)) return [];

  return resources
    .map((resource, index) => {
      const item = resource as Partial<LessonResource>;
      const title = String(item.title ?? "").trim();
      const url = String(item.url ?? "").trim();

      if (!title || !url) return null;

      return {
        id: String(item.id ?? doc(resourceCollectionRef).id),
        title,
        type: isResourceType(item.type) ? item.type : "file",
        url,
        order: Number.isFinite(Number(item.order)) ? Number(item.order) : index,
      };
    })
    .filter((resource): resource is LessonResource => Boolean(resource))
    .sort((a, b) => a.order - b.order);
};

const normalizeLessons = (lessons: unknown): CurriculumLesson[] => {
  if (!Array.isArray(lessons)) return [];

  const normalized: CurriculumLesson[] = [];

  lessons.forEach((lesson, index) => {
    const item = lesson as Partial<CurriculumLesson>;
    const title = String(item.title ?? "").trim();

    if (!title) return;

    const durationMinutes = Number.isFinite(Number(item.durationMinutes))
      ? Number(item.durationMinutes)
      : 0;

    normalized.push({
      id: String(item.id ?? doc(resourceCollectionRef).id),
      title,
      type: isLessonType(item.type) ? item.type : "video",
      durationMinutes,
      duration: item.duration || formatDuration(durationMinutes),
      description: String(item.description ?? "").trim(),
      contentUrl: String(item.contentUrl ?? "").trim(),
      order: Number.isFinite(Number(item.order)) ? Number(item.order) : index,
      resources: normalizeResources(item.resources),
    });
  });

  return normalized.sort((a, b) => a.order - b.order);
};

const normalizeSection = (id: string, data: Record<string, unknown>): CurriculumSection => ({
  id,
  title: String(data.title ?? "Untitled section").trim(),
  order: Number.isFinite(Number(data.order)) ? Number(data.order) : 0,
  lessons: normalizeLessons(data.lessons),
});

const normalizeResourceInputs = (resources: LessonResourceInput[] = []): LessonResource[] =>
  resources
    .map((resource, index) => ({
      id: resource.id || doc(resourceCollectionRef).id,
      title: resource.title.trim(),
      type: resource.type,
      url: resource.url.trim(),
      order: index,
    }))
    .filter((resource) => resource.title && resource.url);

const buildLesson = (
  lessonId: string,
  data: CurriculumLessonInput,
  order: number,
  resources: LessonResource[]
): CurriculumLesson => ({
  id: lessonId,
  title: data.title.trim(),
  type: data.type,
  durationMinutes: data.durationMinutes,
  duration: formatDuration(data.durationMinutes),
  description: data.description?.trim() || "",
  contentUrl: data.contentUrl?.trim() || "",
  order,
  resources,
});

export const listenToCourseSections = (
  courseId: string,
  onNext: (sections: CurriculumSection[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const sectionsQuery = query(
    collection(db, "courses", courseId, "sections"),
    orderBy("order", "asc")
  );

  return onSnapshot(
    sectionsQuery,
    (snapshot) => {
      const sections = snapshot.docs.map((sectionDoc) =>
        normalizeSection(sectionDoc.id, sectionDoc.data())
      );
      onNext(sections);
    },
    (error) => onError?.(error)
  );
};

export const fetchCourseSections = async (courseId: string): Promise<CurriculumSection[]> => {
  const sectionsQuery = query(
    collection(db, "courses", courseId, "sections"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(sectionsQuery);

  return snapshot.docs.map((sectionDoc) =>
    normalizeSection(sectionDoc.id, sectionDoc.data())
  );
};

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

    const currentLessons = normalizeLessons(sectionSnapshot.data().lessons);
    const lesson = buildLesson(lessonId, data, currentLessons.length, resources);

    transaction.update(targetSectionRef, {
      lessons: [...currentLessons, lesson],
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

  const currentLessons = normalizeLessons(sectionSnapshot.data().lessons);
  const lessonIndex = currentLessons.findIndex((lesson) => lesson.id === lessonId);

  if (lessonIndex === -1) {
    throw new Error("Lesson does not exist");
  }

  const resources = normalizeResourceInputs(data.resources);
  const nextLessons = [...currentLessons];
  nextLessons[lessonIndex] = buildLesson(
    lessonId,
    data,
    currentLessons[lessonIndex].order,
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

  const nextLessons = normalizeLessons(sectionSnapshot.data().lessons)
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
