import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Course } from '@/types/course';
import { auth } from '@/api/services/firebase';

export async function fetchRecommendedCourses(): Promise<Course[]> {
 

  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }


  
  const token = await user.getIdToken();
  console.log(' token ', token.slice(0, 20));

  const snap = await getDocs(collection(db, 'courses'));
  console.log(' courses snap.size :', snap.size);

  if (snap.empty) return [];

  const first = snap.docs[0];
  console.log(' first doc keys:', Object.keys(first.data()));
  console.log(' first doc data:', first.data());

  const docs = snap.docs.slice(0, 10);

  return docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      ...(data as Omit<Course, 'id'>),
    };
  });
}