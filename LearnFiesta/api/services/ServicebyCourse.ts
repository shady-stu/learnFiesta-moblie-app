import { db } from "@/api/services/firebase";
import { collection, getDocs, doc, getDoc, query, where, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Enrollment } from "@/components/CourseCard";
import {clearOfflineEnrollments, saveEnrollmentsOffline} from "@/db/offlineCoursesDb";
import { getDb } from "@/db/offlineCoursesDb";
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

  return Promise.all(
    snap.docs.map(async (d) => {
      const data = d.data();
      const courseSnap = await getDoc(doc(db, "courses", data.courseId));
      const course = courseSnap.data();

      return {
        id: d.id,
        courseId: data.courseId,
        title: course?.title ?? "",
        author: course?.instructorName ?? "",
        img: course?.imageUrl ?? "",
        totalLessons: course?.totalLessons ?? 0,
        progress: data.progress ?? 0,
        lessonsDone: data.lessonsDone ?? 0,
        status: data.status ?? "progress",
      };
    })
  );
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