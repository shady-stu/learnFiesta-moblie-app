import { db } from "@/api/services/firebase";

import { collection, getDocs } from "firebase/firestore";
import type { Enrollment } from "@/components/CourseCard";

export async function getUserEnrollments(): Promise<Enrollment[]> {
  const enrollmentsRef = collection(db, "Enrollment");
  const snapshot = await getDocs(enrollmentsRef);

  if (snapshot.empty) return [];

 
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Enrollment[];
}