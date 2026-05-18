import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/api/services/firebase";
import { Lesson } from "@/types/lesson";

export const fetchLessons = async (courseId: string): Promise<Lesson[]> => {
  const sectionsQuery = query(
    collection(db, "courses", courseId, "sections"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(sectionsQuery);
  const lessons: Lesson[] = [];

  snapshot.docs.forEach((sectionDoc) => {
    const section = sectionDoc.data();
    const sectionTitle = String(section.title ?? "Course Lessons");
    const sectionLessons = Array.isArray(section.lessons) ? section.lessons : [];

    sectionLessons.forEach((lesson, index) => {
      const item = lesson as Record<string, unknown>;
      const title = String(item.title ?? "").trim();

      if (!title) return;

      lessons.push({
        id: String(item.id ?? `${sectionDoc.id}-${index}`),
        courseId,
        section: sectionTitle,
        title,
        duration: String(item.duration ?? ""),
        type: item.type === "article" || item.type === "quiz" ? item.type : "video",
        isLocked: Boolean(item.isLocked ?? false),
        order: Number.isFinite(Number(item.order)) ? Number(item.order) : index,
      });
    });
  });

  return lessons.sort((a, b) => a.order - b.order);
};
