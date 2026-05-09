import {collection, getDocs, query, where} from "firebase/firestore";
import { Resource } from "@/types/lesson";
import {db} from "@/api/services/firebase";

export const fetchResources = async (courseId: string): Promise<Resource[]> => {
     const q = query(collection(db, "resources"), where("courseId", "==", courseId));
     const snapshot = await getDocs(q);
     return snapshot.docs.map((doc) => {
         const data = doc.data();
         return {
             id: doc.id,
             courseId: data.courseId,
             title: data.title,
             type: data.type,
             url: data.url,
         };
      });
 };