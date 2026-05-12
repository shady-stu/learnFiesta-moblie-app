import {
  collection,
  getDocs,
  onSnapshot,
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
  const sectionsRef = collection(db, "courses", courseId, "sections");

  return onSnapshot(
    sectionsRef,
    (snapshot) => {
      const sections = snapshot.docs
        .map((sectionDoc) => normalizeSection(sectionDoc.id, sectionDoc.data()))
        .sort((a, b) => a.order - b.order);
      onNext(sections);
    },
    (error) => onError?.(error)
  );
};

export const fetchCourseSections = async (
  courseId: string
): Promise<CurriculumSection[]> => {
  const snapshot = await getDocs(collection(db, "courses", courseId, "sections"));

  return snapshot.docs
    .map((sectionDoc) => normalizeSection(sectionDoc.id, sectionDoc.data()))
    .sort((a, b) => a.order - b.order);
};
