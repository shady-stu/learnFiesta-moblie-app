import { db } from "@/api/services/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Enrollment } from "@/types/Enrollment";
import {clearOfflineEnrollments, saveEnrollmentsOffline} from "@/db/offlineCoursesDb";
import { fetchCourseSections } from "@/api/services/curriculum/sections";

export async function getUserEnrollments(): Promise<Enrollment[]> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return [];

 const q = query(
  collection(db, "Enrollment"),
  where("usersId", "==", currentUser.uid)  
);

  const snap = await getDocs(q);
  if (snap.empty) return [];

  return Promise.all(snap.docs.map(buildEnrollment));
}

async function findNextLessonId(courseId: string, completedLessonIds: string[]) {
  const sections = await fetchCourseSections(courseId);
  const lessons = sections.flatMap((section) =>
    section.lessons.sort((a, b) => a.order - b.order)
  );
  const nextLesson = lessons.find(
    (lesson) => !completedLessonIds.includes(lesson.id)
  );

  return nextLesson?.id ?? null;
}

async function buildEnrollment(enrollmentDoc: any): Promise<Enrollment> {
  const data = enrollmentDoc.data();
  const courseSnap = await getDoc(doc(db, "courses", data.courseId));
  const course = courseSnap.data();
  const completedLessonIds = Array.isArray(data.completedLessonIds)
    ? data.completedLessonIds
    : [];
  const nextLessonId = await findNextLessonId(data.courseId, completedLessonIds);

  return {
    id: enrollmentDoc.id,
    courseId: data.courseId,
    title: course?.title ?? "",
    author: course?.instructorName ?? "",
    img: course?.imageUrl ?? "",
    totalLessons: course?.totalLessons ?? 0,
    progress: data.progress ?? 0,
    lessonsDone: data.lessonsDone ?? 0,
    completedLessonIds,
    nextLessonId,
    status: data.status ?? "progress",
  };
}

export function listenToUserEnrollments(
  onChange: (enrollments: Enrollment[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const user = getAuth().currentUser;

  if (!user) {
    onChange([]);
    return () => {};
  }

  const enrollmentsQuery = query(
    collection(db, "Enrollment"),
    where("usersId", "==", user.uid)
  );

  return onSnapshot(
    enrollmentsQuery,
    async (snapshot) => {
      const enrollments = await Promise.all(snapshot.docs.map(buildEnrollment));
      onChange(enrollments);
    },
    onError
  );
}

export function listenToLessonCompletion(
  courseId: string,
  lessonId: string,
  onChange: (isCompleted: boolean) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const user = getAuth().currentUser;

  if (!user) {
    onChange(false);
    return () => {};
  }

  const enrollmentsQuery = query(
    collection(db, "Enrollment"),
    where("usersId", "==", user.uid),
    where("courseId", "==", courseId)
  );

  return onSnapshot(
    enrollmentsQuery,
    (snapshot) => {
      const enrollment = snapshot.docs[0]?.data();
      const completedLessonIds = Array.isArray(enrollment?.completedLessonIds)
        ? enrollment.completedLessonIds
        : [];

      onChange(completedLessonIds.includes(lessonId));
    },
    onError
  );
}

export async function markLessonAsCompleted(
  courseId: string,
  lessonId: string,
  totalLessons: number
) {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not logged in");

  const enrollmentsQuery = query(
    collection(db, "Enrollment"),
    where("usersId", "==", user.uid),
    where("courseId", "==", courseId)
  );

  const snapshot = await getDocs(enrollmentsQuery);
  const enrollmentDoc = snapshot.docs[0];

  if (!enrollmentDoc) {
    throw new Error("Enrollment not found");
  }

  const data = enrollmentDoc.data();
  const completedLessonIds = Array.isArray(data.completedLessonIds)
    ? data.completedLessonIds
    : [];

  if (completedLessonIds.includes(lessonId)) return;

  const nextCompletedLessonIds = [...completedLessonIds, lessonId];
  const nextLessonsDone = Math.min(nextCompletedLessonIds.length, totalLessons);
  const nextProgress = totalLessons > 0
    ? Math.round((nextLessonsDone / totalLessons) * 100)
    : 0;

  await updateDoc(doc(db, "Enrollment", enrollmentDoc.id), {
    completedLessonIds: nextCompletedLessonIds,
    lessonsDone: nextLessonsDone,
    progress: nextProgress,
    status: nextProgress >= 100 ? "completed" : "progress",
  });
}



export async function purchaseCourses(cartItems: any[]) {
    const user = getAuth().currentUser;

    if (!user) return;

    await Promise.all(
        cartItems.map((item) =>
            addDoc(collection(db, "Enrollment"), {
                usersId: user.uid,
                courseId: item.courseId,
                progress: 0,
                lessonsDone: 0,
                completedLessonIds: [],
                status: "progress",
                createdAt: new Date(),
            })
        )
    );

    const offlineEnrollments = await Promise.all(
        cartItems.map(async (item) => {
            const courseSnap = await getDoc(
                doc(db, "courses", item.courseId)
            );

            const course = courseSnap.data();

            return {
                id: item.courseId,
                courseId: item.courseId,
                title: course?.title ?? "",
                author: course?.instructorName ?? "",
                img: course?.imageUrl ?? "",
                totalLessons: course?.totalLessons ?? 0,
                progress: 0,
                lessonsDone: 0,
                status: "progress" as const,
            };
        })
    );
    await saveEnrollmentsOffline(offlineEnrollments);
    console.log("Offline enrollments saved");
}



export async function clearAllEnrollments() {
await clearOfflineEnrollments();
}
