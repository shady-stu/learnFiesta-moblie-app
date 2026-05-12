import { doc, getDoc } from "firebase/firestore";
import { db } from "@/api/services/firebase";
import { Course } from "@/types/course";

const normalizeLearningOutcomes = (value: unknown): string[] => {
    if (!Array.isArray(value)) return [];

    return value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
};

export const fetchCourseById = async (id: string): Promise<Course | null> => {
    const docRef = doc(db, "courses", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return {
        id: snapshot.id,
        title: data.title,
        description: data.description || "",
        whatYouWillLearn: normalizeLearningOutcomes(data.whatYouWillLearn),
        instructorId: data.instructorId,
        instructorName: data.instructorName,
        categoryId: data.categoryId,
        categoryName:data.categoryName,
        duration: data.duration,
        totalLessons: data.totalLessons || 0,
        rating: Number(data.rating) || 0,
        reviewsCount: Number(data.reviewsCount) || 0,
        price: Number(data.price) || 0,
        imageUrl: data.imageUrl,
        badge: data.badge || "",
    };
};
