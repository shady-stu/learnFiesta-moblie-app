import { collection, doc } from "firebase/firestore";
import { db } from "@/api/services/firebase";
import type {
  CurriculumLesson,
  CurriculumLessonInput,
  CurriculumSection,
  LessonResource,
  LessonResourceInput,
  LessonType,
  ResourceType,
} from "./curriculumType";

export const courseRef = (courseId: string) => doc(db, "courses", courseId);
export const sectionRef = (courseId: string, sectionId: string) =>
  doc(db, "courses", courseId, "sections", sectionId);

export const resourceCollectionRef = collection(db, "resources");

const isLessonType = (value: unknown): value is LessonType =>
  value === "video" || value === "article" || value === "quiz";

const isResourceType = (value: unknown): value is ResourceType =>
  value === "pdf" || value === "slides" || value === "link" || value === "file";

export const formatDuration = (minutes: number) => {
  const safeMinutes = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safeMinutes / 60);
  const mins = safeMinutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const normalizeResources = (resources: unknown): LessonResource[] => {
  if (!Array.isArray(resources)) return [];

  return resources
    .map((resource, index) => {
      const item = resource as Partial<LessonResource>;
      const title = String(item.title ?? "").trim();
      const url = String(item.url ?? "").trim();

      if (!title || !url) return null;

      return {
        id: String(item.id ?? doc(resourceCollectionRef).id),
        title,
        type: isResourceType(item.type) ? item.type : "file",
        url,
        order: Number.isFinite(Number(item.order)) ? Number(item.order) : index,
      };
    })
    .filter((resource): resource is LessonResource => Boolean(resource))
    .sort((a, b) => a.order - b.order);
};

const normalizeLessons = (lessons: unknown): CurriculumLesson[] => {
  if (!Array.isArray(lessons)) return [];

  const normalized: CurriculumLesson[] = [];

  lessons.forEach((lesson, index) => {
    const item = lesson as Partial<CurriculumLesson>;
    const title = String(item.title ?? "").trim();

    if (!title) return;

    const durationMinutes = Number.isFinite(Number(item.durationMinutes))
      ? Number(item.durationMinutes)
      : 0;

    normalized.push({
      id: String(item.id ?? doc(resourceCollectionRef).id),
      title,
      type: isLessonType(item.type) ? item.type : "video",
      durationMinutes,
      duration: item.duration || formatDuration(durationMinutes),
      description: String(item.description ?? "").trim(),
      contentUrl: String(item.contentUrl ?? "").trim(),
      order: Number.isFinite(Number(item.order)) ? Number(item.order) : index,
      resources: normalizeResources(item.resources),
      keyConcepts: Array.isArray(item.keyConcepts)
        ? item.keyConcepts
            .filter((concept): concept is string => typeof concept === "string")
            .map((concept) => concept.trim())
            .filter(Boolean)
        : [],
      qa: Array.isArray(item.qa)
        ? item.qa
            .map((qaItem, qaIndex) => {
              const qaRecord = qaItem as {
                id?: unknown;
                question?: unknown;
                answer?: unknown;
              };
              const question = String(qaRecord.question ?? "").trim();
              const answer = String(qaRecord.answer ?? "").trim();
              if (!question && !answer) return null;
              return {
                id: String(qaRecord.id ?? `qa-${qaIndex}`),
                question,
                answer,
              };
            })
            .filter(
              (
                item
              ): item is {
                id: string;
                question: string;
                answer: string;
              } => Boolean(item)
            )
        : [],
    });
  });

  return normalized.sort((a, b) => a.order - b.order);
};

export const normalizeSection = (
  id: string,
  data: Record<string, unknown>
): CurriculumSection => ({
  id,
  title: String(data.title ?? "Untitled section").trim(),
  order: Number.isFinite(Number(data.order)) ? Number(data.order) : 0,
  lessons: normalizeLessons(data.lessons),
});

export const normalizeResourceInputs = (
  resources: LessonResourceInput[] = []
): LessonResource[] =>
  resources
    .map((resource, index) => ({
      id: resource.id || doc(resourceCollectionRef).id,
      title: resource.title.trim(),
      type: resource.type,
      url: resource.url.trim(),
      order: index,
    }))
    .filter((resource) => resource.title && resource.url);

export const buildLesson = (
  lessonId: string,
  data: CurriculumLessonInput,
  order: number,
  resources: LessonResource[]
): CurriculumLesson => ({
  id: lessonId,
  title: data.title.trim(),
  type: data.type,
  durationMinutes: data.durationMinutes,
  duration: formatDuration(data.durationMinutes),
  description: data.description?.trim() || "",
  contentUrl: data.contentUrl?.trim() || "",
  order,
  resources,
  keyConcepts: (data.keyConcepts ?? [])
    .map((concept) => concept.trim())
    .filter(Boolean),
  qa: (data.qa ?? [])
    .map((item, index) => ({
      id: item.id ?? `qa-${index}`,
      question: item.question.trim(),
      answer: item.answer.trim(),
    }))
    .filter((item) => item.question || item.answer),
});
