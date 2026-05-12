import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/api/services/firebase";
import { Resource } from "@/types/lesson";

export const fetchResources = async (courseId: string): Promise<Resource[]> => {
  const sectionsQuery = query(
    collection(db, "courses", courseId, "sections"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(sectionsQuery);
  const resources: Resource[] = [];

  snapshot.docs.forEach((sectionDoc) => {
    const section = sectionDoc.data();
    const lessons = Array.isArray(section.lessons) ? section.lessons : [];

    lessons.forEach((lesson, lessonIndex) => {
      const lessonRecord = lesson as Record<string, unknown>;
      const lessonResources = Array.isArray(lessonRecord.resources)
        ? lessonRecord.resources
        : [];

      lessonResources.forEach((resource, resourceIndex) => {
        const item = resource as Record<string, unknown>;
        const title = String(item.title ?? "").trim();
        const url = String(item.url ?? "").trim();

        if (!title || !url) return;

        resources.push({
          id: String(item.id ?? `${sectionDoc.id}-${lessonIndex}-${resourceIndex}`),
          courseId,
          title,
          type: item.type === "slides" ? "slides" : "pdf",
          url,
        });
      });
    });
  });

  return resources;
};
