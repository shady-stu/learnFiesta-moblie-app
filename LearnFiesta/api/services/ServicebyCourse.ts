<<<<<<< HEAD
import { db } from "@/api/services/firebase";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import type { Enrollment } from "@/components/CourseCard";

import {
  clearOfflineEnrollments,
  saveEnrollmentsOffline,
} from "@/db/offlineCoursesDb";

export async function getUserEnrollments(): Promise<Enrollment[]> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return [];

  const q = query(
    collection(db, "Enrollment"),
    where("usersId", "==", currentUser.uid)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    await saveEnrollmentsOffline([]);
    return [];
  }

  const seenCourseIds = new Set<string>();

  const enrollments = await Promise.all(
    snap.docs.map(async (d) => {
      const data = d.data();
      if (!data.courseId) return null;
      if (seenCourseIds.has(data.courseId)) {
        return null;
      }
      seenCourseIds.add(data.courseId);
      const courseSnap = await getDoc(doc(db, "courses", data.courseId));
      const course = courseSnap.data();
 return {
        id: data.courseId,
        courseId: data.courseId,
        title: course?.title ?? "",
        author: course?.instructorName ?? "",
        img: course?.imageUrl ?? "",
        totalLessons: Number(course?.totalLessons ?? 0),
        progress: Number(data.progress ?? 0),
        lessonsDone: Number(data.lessonsDone ?? 0),
        status: data.status === "completed" ? "completed" : "progress",
      } as Enrollment;
    })
  );
  const cleanEnrollments = enrollments.filter(
    (item): item is Enrollment => item !== null
  );
  await saveEnrollmentsOffline(cleanEnrollments);
  return cleanEnrollments;
}
export async function purchaseCourses(cartItems: any[]) {
  const user = getAuth().currentUser;

  if (!user) return;

  const uniqueCartItems = Array.from(
    new Map(cartItems.map((item) => [item.courseId, item])).values()
  );

  const newEnrollments: Enrollment[] = [];

  for (const item of uniqueCartItems) {
    const existingQuery = query(
      collection(db, "Enrollment"),
      where("usersId", "==", user.uid),
      where("courseId", "==", item.courseId)
    );

    const existingSnap = await getDocs(existingQuery);

    if (!existingSnap.empty) {
      continue;
    }

    await addDoc(collection(db, "Enrollment"), {
      usersId: user.uid,
      courseId: item.courseId,
      progress: 0,
      lessonsDone: 0,
      status: "progress",
      createdAt: new Date(),
    });

    const courseSnap = await getDoc(doc(db, "courses", item.courseId));
    const course = courseSnap.data();

    newEnrollments.push({
      id: item.courseId,
      courseId: item.courseId,
      title: course?.title ?? "",
      author: course?.instructorName ?? "",
      img: course?.imageUrl ?? "",
      totalLessons: Number(course?.totalLessons ?? 0),
      progress: 0,
      lessonsDone: 0,
      status: "progress",
    });
  }

  if (newEnrollments.length > 0) {
    await saveEnrollmentsOffline(newEnrollments);
  }

  console.log("New enrollments saved:", newEnrollments.length);
}

export async function clearAllEnrollments() {
  await clearOfflineEnrollments();
}
=======
export * from "@/api/services/enrollments/enrollmentService";
>>>>>>> 517ffbdaaf76fe120b2542cbb6a2cdb7f1b55bab
