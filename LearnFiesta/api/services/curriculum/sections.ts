import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/api/services/firebase";
import type { CurriculumSection } from "./types";
import { normalizeSection } from "./shared";

export const listenToCourseSections = (
  courseId: string,
  onNext: (sections: CurriculumSection[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const sectionsQuery = query(
    collection(db, "courses", courseId, "sections"),
    orderBy("order", "asc")
  );

  return onSnapshot(
    sectionsQuery,
    (snapshot) => {
      const sections = snapshot.docs.map((sectionDoc) =>
        normalizeSection(sectionDoc.id, sectionDoc.data())
      );
      onNext(sections);
    },
    (error) => onError?.(error)
  );
};

export const fetchCourseSections = async (
  courseId: string
): Promise<CurriculumSection[]> => {
  const sectionsQuery = query(
    collection(db, "courses", courseId, "sections"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(sectionsQuery);

  return snapshot.docs.map((sectionDoc) =>
    normalizeSection(sectionDoc.id, sectionDoc.data())
  );
};
