import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import type { CartItem } from '@/types/cart';
import { db } from '../firebase';

const cartRef = (userId: string) =>
  collection(db, 'users', userId, 'cart');

const cartItemRef = (userId: string, courseId: string) =>
  doc(db, 'users', userId, 'cart', courseId);

export async function fetchCart(userId: string): Promise<CartItem[]> {
  const snapshot = await getDocs(cartRef(userId));
  return snapshot.docs
    .map((d) => d.data() as CartItem)
    .sort((a, b) => b.addedAt - a.addedAt);
}


export async function addToCart(
  userId: string,
  item: Omit<CartItem, 'addedAt'>
): Promise<void> {
  await setDoc(cartItemRef(userId, item.courseId), {
    ...item,
    addedAt: Date.now(),
  });
}

export async function removeFromCart(
  userId: string,
  courseId: string
): Promise<void> {
  await deleteDoc(cartItemRef(userId, courseId));
}

export async function isCourseInCart(
  userId: string,
  courseId: string
): Promise<boolean> {
  const snapshot = await getDoc(cartItemRef(userId, courseId));
  return snapshot.exists();
}
