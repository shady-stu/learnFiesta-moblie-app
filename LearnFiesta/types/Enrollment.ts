export type Enrollment = {
  id: string;
  courseId: string;
  title: string;
  author: string;
  progress: number;
  lessonsDone: number;
  totalLessons: number;
  img: string;
  status: "progress" | "completed";
};