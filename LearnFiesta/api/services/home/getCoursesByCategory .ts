import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Course } from '@/types/course';

export const getCoursesByCategory = async (categoryId: string): Promise<Course[]> => {
  const q = query(
    collection(db, 'courses'),
    where('categoryId', '==', categoryId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Course, 'id'>),
  }));
};