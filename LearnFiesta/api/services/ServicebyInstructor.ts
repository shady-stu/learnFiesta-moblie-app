import { db } from '@/api/services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Instructor } from '@/components/InstructorCard';

export async function getUserInstructors(): Promise<Instructor[]> {
  const instructorsRef = collection(db, 'Instructor');
  const snapshot = await getDocs(instructorsRef);

  console.log("snapshot empty?", snapshot.empty);
  console.log("docs count:", snapshot.docs.length);
  console.log("raw data:", snapshot.docs.map(d => d.data()));

  if (snapshot.empty) return [];

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Instructor[];
}
