import { db } from "@/api/services/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Instructor } from "@/components/InstructorCard";

export async function getUserInstructors(): Promise<Instructor[]> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return [];

  const q = query(
    collection(db, "Instructor"),
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
        imageUrl: course?.imageUrl ?? "",
        students: data.students ?? 0,
        revenue: data.revenue ?? 0,
        rating: data.rating ?? 0,
        isActive: data.isActive ?? false,
      };
    })
  );
}