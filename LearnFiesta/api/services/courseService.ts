import { collection, getDocs } from "firebase/firestore";
import { db } from "@/api/services/firebase";
import { Course } from "@/types/course";

export const fetchCourses = async (): Promise<Course[]> => {
    const snapshot = await getDocs(collection(db, "courses"));

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Course[];
};