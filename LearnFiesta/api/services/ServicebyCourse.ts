import { db } from "@/api/services/firebase";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Enrollment } from "@/components/CourseCard";

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