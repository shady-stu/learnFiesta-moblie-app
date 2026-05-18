import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Category } from '@/types/Category';

export async function fetchCategories(): Promise<Category[]> {
  const snap = await getDocs(collection(db, 'category'));
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));
}