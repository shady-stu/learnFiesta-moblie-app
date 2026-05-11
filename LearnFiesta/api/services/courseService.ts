import {addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/api/services/firebase";
import { Course, CreateCourseDTO } from "@/types/course";

export const fetchCourses = async (): Promise<Course[]> => {
  const snapshot = await getDocs(collection(db, "courses"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description ?? "",
      whatYouWillLearn: data.whatYouWillLearn ?? [],
      instructorId: data.instructorId,
      instructorName: data.instructorName,
      categoryId: data.categoryId,
      categoryName:data.categoryName,
      duration: data.duration,
      totalLessons: data.totalLessons ?? 0,
      rating: data.rating ?? 0,
      reviewsCount: data.reviewsCount ?? 0,
      price: data.price,
      imageUrl: data.imageUrl,
      badge: data.badge ?? undefined,
    };
  });
};export const createCourse = async (data: CreateCourseDTO) => {
  const docRef = await addDoc(collection(db, "courses"), {
    ...data,
    createdAt: serverTimestamp(), 
  });

  return docRef.id;
};