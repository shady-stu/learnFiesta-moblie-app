import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/api/services/firebase";
import { Course, CreateCourseDTO } from "@/types/course";



export const fetchCourses = async (): Promise<Course[]> => {
  const snapshot = await getDocs(collection(db, "courses"));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      instructorId: data.instructorId,
      instructorName: data.instructorName,
      duration: data.duration,
      rating: data.rating ?? 0,
      reviewsCount: data.reviewsCount ?? 0,
      price: data.price,
      oldPrice: data.oldPrice ?? null,
      imageUrl: data.imageUrl,
      badge: data.badge ?? null,
    };
  });
};
export const createCourse = async (
  data: any
) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userDoc = await getDoc(
    doc(db, "users", user.uid)
  );

  const userData = userDoc.data();

  const courseData = {
    title: data.title,

    description: data.description,

    categoryId: data.category,

    categoryName:
      data.categoryName || "",

    imageUrl: data.thumbnail,

    instructorId: user.uid,

    instructorName:
      userData?.name || "Instructor",

    price: Number(data.price),

    badge:
      Number(data.price) === 0
        ? "Free"
        : "Best Seller",

    rating: 0,

    reviewsCount: 0,

    totalLessons: 0,

    duration: "0h 0m",

    whatYouWillLearn:
      data.whatYouWillLearn || [],

    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(db, "courses"),
    courseData
  );

  return docRef.id;
};
