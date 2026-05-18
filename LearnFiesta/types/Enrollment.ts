export type Enrollment = {
  id: string;
  courseId: string;
  title: string;
  author: string;
  img: string;
  totalLessons: number;
  progress: number;
  lessonsDone: number;
  completedLessonIds?: string[];
  nextLessonId?: string | null;
  status: "progress" | "completed";
};
