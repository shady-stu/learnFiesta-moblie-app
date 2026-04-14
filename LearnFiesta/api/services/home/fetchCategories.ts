import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Category } from '@/types/Category';

export async function fetchCategories(): Promise<Category[]> {
  console.log('🔥 fetchCategories called');

  const snap = await getDocs(collection(db, 'category'));

  console.log('✅ snap.size:', snap.size);

  if (snap.size > 0) {
    console.log('✅ first doc:', snap.docs[0]?.data());
  } else {
    console.log('⚠️ categories collection is empty or wrong path/rules');
  }

  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));
}