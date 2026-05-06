export type Enrollment = {
  id: string;
  courseId: string;
  title: string;
  author: string;
  img: string;
  totalLessons: number;
  progress: number;
  lessonsDone: number;
  status: "progress" | "completed";
};