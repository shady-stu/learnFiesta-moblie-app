import { db } from "@/api/services/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
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

export function subscribeToUserInstructors(
  onNext: (courses: Instructor[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    onNext([]);
    return () => {};
  }

  const coursesQuery = query(
    collection(db, "courses"),
    where("instructorId", "==", currentUser.uid)
  );

  return onSnapshot(
    coursesQuery,
    async (coursesSnapshot) => {
      const instructorSnapshot = await getDocs(
        query(collection(db, "Instructor"), where("usersId", "==", currentUser.uid))
      );
      const statsByCourseId = new Map<string, any>();

      instructorSnapshot.docs.forEach((instructorDoc) => {
        const data = instructorDoc.data();
        if (data.courseId) {
          statsByCourseId.set(data.courseId, data);
        }
      });

      const courses = coursesSnapshot.docs.map((courseDoc) => {
        const course = courseDoc.data();
        const stats = statsByCourseId.get(courseDoc.id);

        return {
          id: stats?.id ?? courseDoc.id,
          courseId: courseDoc.id,
          title: course.title ?? "",
          imageUrl: course.imageUrl ?? "",
          students: stats?.students ?? 0,
          revenue: stats?.revenue ?? 0,
          rating: stats?.rating ?? course.rating ?? 0,
          isActive: stats?.isActive ?? course.isPublished ?? false,
        };
      });

      onNext(courses);
    },
    (error) => onError?.(error)
  );
}
