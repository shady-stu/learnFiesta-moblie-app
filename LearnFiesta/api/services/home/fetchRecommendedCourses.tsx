import { db } from '../firebase';
import { collection, getDocs, limit } from 'firebase/firestore';
import type { Course } from '@/types/course';

export async function fetchRecommendedCourses(): Promise<Course[]> {
  console.log('🔥 fetchRecommendedCourses called');

  const snap = await getDocs(collection(db, 'courses'));
  console.log('✅ courses snap.size (no orderBy):', snap.size);

  if (snap.empty) return [];

  const first = snap.docs[0];
  console.log('🔎 first doc keys:', Object.keys(first.data()));
  console.log('🔎 first doc data:', first.data());

  const docs = snap.docs.slice(0, 10);

  return docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      ...(data as Omit<Course, 'id'>),
    };
  });
}