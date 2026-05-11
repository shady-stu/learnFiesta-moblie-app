import {collection, getDocs, query, where} from "firebase/firestore";
import { db } from "@/api/services/firebase";
import { Lesson } from "@/types/lesson";
export const fetchLessons = async (courseId: string): Promise<Lesson[]> => {
      const q = query (
          collection(db, "lessons"),
          where("courseId", "==", courseId)
      );

     const snapshot = await getDocs(q);
     return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
              id: doc.id,
              courseId: data.courseId,
              section: data.section,
              title: data.title,
              duration: data.duration,
              type: data.type,
              isLocked: data.isLocked,
              order: data.order,
          };
      });
  };