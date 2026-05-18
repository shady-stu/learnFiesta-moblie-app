import { doc, onSnapshot, type Unsubscribe } from "firebase/firestore";

import {
  listenToCourseSections,
  type CurriculumLesson,
  type CurriculumSection,
  type LessonResource,
} from "@/api/services/curriculum/curriculumService";
import { db } from "../firebase/firebase";

type LearningNote = {
  id: string;
  timestamp: string;
  text: string;
};

type LearningQuestion = {
  id: string;
  question: string;
  answer: string;
};

export type LearningLesson = {
  id: string;
  courseId: string;
  sectionId: string;
  module: string;
  duration: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  notes: LearningNote[];
  keyConcepts: string[];
  resources: LessonResource[];
  qa: LearningQuestion[];
  totalLessons: number;
  prevLessonId: string | null;
  nextLessonId: string | null;
};

type LessonSubscriptionParams = {
  id: string;
  courseId?: string;
};

type CourseSnapshot = {
  id: string;
  imageUrl: string;
  whatYouWillLearn: string[];
};

const normalizeStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const normalizeNotes = (value: unknown): LearningNote[] =>
  Array.isArray(value)
    ? value.map((note, index) => {
        const item = note as Partial<LearningNote>;
        return {
          id: String(item.id ?? `note-${index}`),
          timestamp: String(item.timestamp ?? ""),
          text: String(item.text ?? ""),
        };
      })
    : [];

const normalizeQa = (value: unknown): LearningQuestion[] =>
  Array.isArray(value)
    ? value.map((qa, index) => {
        const item = qa as Partial<LearningQuestion>;
        return {
          id: String(item.id ?? `qa-${index}`),
          question: String(item.question ?? ""),
          answer: String(item.answer ?? ""),
        };
      })
    : [];

const flattenLessons = (
  course: CourseSnapshot,
  sections: CurriculumSection[]
): LearningLesson[] =>
  sections.flatMap((section) =>
    section.lessons.map((lesson) => {
      const data = lesson as CurriculumLesson & Record<string, unknown>;

      return {
        id: lesson.id,
        courseId: course.id,
        sectionId: section.id,
        module: section.title,
        duration: lesson.duration,
        title: lesson.title,
        description: lesson.description || "",
        thumbnail: String(data.thumbnail ?? course.imageUrl),
        videoUrl: lesson.contentUrl || "",
        notes: normalizeNotes(data.notes),
        keyConcepts: normalizeStringArray(data.keyConcepts ?? data.whatYouWillLearn).length
          ? normalizeStringArray(data.keyConcepts ?? data.whatYouWillLearn)
          : course.whatYouWillLearn,
        resources: lesson.resources,
        qa: normalizeQa(data.qa),
        totalLessons: 0,
        prevLessonId: null,
        nextLessonId: null,
      };
    })
  );

const withNavigation = (
  lessons: LearningLesson[],
  index: number
): LearningLesson | null => {
  const lesson = lessons[index];
  if (!lesson) return null;

  return {
    ...lesson,
    totalLessons: lessons.length,
    prevLessonId: index > 0 ? lessons[index - 1].id : null,
    nextLessonId: index < lessons.length - 1 ? lessons[index + 1].id : null,
  };
};

export const subscribeToLearningLesson = (
  { id, courseId }: LessonSubscriptionParams,
  onNext: (lesson: LearningLesson | null) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const resolvedCourseId = courseId || id;
  let course: CourseSnapshot | null = null;
  let sections: CurriculumSection[] | null = null;

  const emitLesson = () => {
    if (!course || !sections) return;

    const lessons = flattenLessons(course, sections);
    const targetIndex = courseId
      ? lessons.findIndex((lesson) => lesson.id === id)
      : 0;

    onNext(withNavigation(lessons, targetIndex));
  };

  const unsubscribeCourse = onSnapshot(
    doc(db, "courses", resolvedCourseId),
    (snapshot) => {
      if (!snapshot.exists()) {
        course = null;
        onNext(null);
        return;
      }

      const data = snapshot.data();
      course = {
        id: snapshot.id,
        imageUrl: String(data.imageUrl ?? ""),
        whatYouWillLearn: normalizeStringArray(data.whatYouWillLearn),
      };
      emitLesson();
    },
    (error) => onError?.(error)
  );

  const unsubscribeSections = listenToCourseSections(
    resolvedCourseId,
    (nextSections) => {
      sections = nextSections;
      emitLesson();
    },
    onError
  );

  return () => {
    unsubscribeCourse();
    unsubscribeSections();
  };
};
