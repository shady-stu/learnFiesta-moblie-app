import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore";
import { auth, db } from "@/api/services/firebase";
import { Course, CreateCourseDTO } from "@/types/course";


const normalizeCourse = (id: string, data: Record<string, any>): Course => ({
  id,
  title: data.title ?? "",
  instructorId: data.instructorId ?? "",
  instructorName: data.instructorName ?? "Instructor",
  duration: data.duration ?? "0m",
  rating: data.rating ?? 0,
  reviewsCount: data.reviewsCount ?? 0,
  price: Number(data.price ?? 0),
  oldPrice: data.oldPrice ?? null,
  imageUrl: data.imageUrl ?? "",
  badge: data.badge ?? null,
});

export const fetchCourses = async (): Promise<Course[]> => {
  const snapshot = await getDocs(collection(db, "courses"));

  return snapshot.docs.map((courseDoc) =>
    normalizeCourse(courseDoc.id, courseDoc.data())
  );
};

export const subscribeToCourses = (
  onNext: (courses: Course[]) => void,
  onError?: (error: Error) => void
): Unsubscribe =>
  onSnapshot(
    collection(db, "courses"),
    (snapshot) => {
      onNext(
        snapshot.docs.map((courseDoc) =>
          normalizeCourse(courseDoc.id, courseDoc.data())
        )
      );
    },
    (error) => onError?.(error)
  );

export const subscribeToRecommendedCourses = (
  onNext: (courses: Course[]) => void,
  onError?: (error: Error) => void,
  limitCount = 10
): Unsubscribe => {
  const recommendedQuery = query(collection(db, "courses"), limit(limitCount));

  return onSnapshot(
    recommendedQuery,
    (snapshot) => {
      onNext(
        snapshot.docs.map((courseDoc) =>
          normalizeCourse(courseDoc.id, courseDoc.data())
        )
      );
    },
    (error) => onError?.(error)
  );
};

export const subscribeToCoursesByCategory = (
  categoryId: string,
  onNext: (courses: Course[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const categoryQuery = query(
    collection(db, "courses"),
    where("categoryId", "==", categoryId)
  );

  return onSnapshot(
    categoryQuery,
    (snapshot) => {
      onNext(
        snapshot.docs.map((courseDoc) =>
          normalizeCourse(courseDoc.id, courseDoc.data())
        )
      );
    },
    (error) => onError?.(error)
  );
};
type CreateCourseInput = CreateCourseDTO & {
  category?: string;
  thumbnail?: string;
};

export type CourseFoundation = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  price: number;
};

export const fetchCourseFoundation = async (
  courseId: string
): Promise<CourseFoundation> => {
  const snapshot = await getDoc(doc(db, "courses", courseId));

  if (!snapshot.exists()) {
    throw new Error("Course not found");
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    title: data.title ?? "",
    description: data.description ?? "",
    categoryId: data.categoryId ?? "",
    categoryName: data.categoryName ?? "",
    imageUrl: data.imageUrl ?? "",
    price: Number(data.price ?? 0),
  };
};

export const createCourse = async (data: CreateCourseInput) => {
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

    imageUrl: data.thumbnail || data.imageUrl || "",

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

    durationMinutes: 0,

    sectionCount: 0,

    whatYouWillLearn:
      data.whatYouWillLearn || [],

    status: "draft",

    isPublished: false,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),
  };

  const courseDocRef = doc(collection(db, "courses"));
  const instructorDocRef = doc(collection(db, "Instructor"));
  const batch = writeBatch(db);

  batch.set(courseDocRef, courseData);
  batch.set(instructorDocRef, {
    usersId: user.uid,
    courseId: courseDocRef.id,
    students: 0,
    revenue: 0,
    rating: 0,
    isActive: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await batch.commit();

  return courseDocRef.id;
};

export const updateCourseFoundation = async (
  courseId: string,
  data: CreateCourseInput
) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const courseDocRef = doc(db, "courses", courseId);
  const snapshot = await getDoc(courseDocRef);

  if (!snapshot.exists()) {
    throw new Error("Course not found");
  }

  const course = snapshot.data();

  if (course.instructorId && course.instructorId !== user.uid) {
    throw new Error("You can only edit your own courses");
  }

  await updateDoc(courseDocRef, {
    title: data.title,
    description: data.description,
    categoryId: data.category,
    categoryName: data.categoryName || "",
    imageUrl: data.thumbnail || data.imageUrl || "",
    price: Number(data.price),
    badge: Number(data.price) === 0 ? "Free" : "Best Seller",
    updatedAt: serverTimestamp(),
  });

  return courseId;
};
