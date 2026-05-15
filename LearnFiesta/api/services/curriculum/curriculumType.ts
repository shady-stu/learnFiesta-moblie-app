export type LessonType = "video" | "article" | "quiz";
export type ResourceType = "pdf" | "slides" | "link" | "file";

export type LessonResource = {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  order: number;
};

export type CurriculumLesson = {
  id: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  duration: string;
  description?: string;
  contentUrl?: string;
  order: number;
  resources: LessonResource[];
  keyConcepts: string[];
  qa: {
    id: string;
    question: string;
    answer: string;
  }[];
};

export type CurriculumSection = {
  id: string;
  title: string;
  order: number;
  lessons: CurriculumLesson[];
};

export type LessonResourceInput = {
  id?: string;
  title: string;
  type: ResourceType;
  url: string;
};

export type CurriculumLessonInput = {
  title: string;
  type: LessonType;
  durationMinutes: number;
  description?: string;
  contentUrl?: string;
  resources?: LessonResourceInput[];
  keyConcepts?: string[];
  qa?: {
    id?: string;
    question: string;
    answer: string;
  }[];
};

export type CurriculumMetrics = {
  sectionCount: number;
  totalLessons: number;
  totalMinutes: number;
  duration: string;
};
