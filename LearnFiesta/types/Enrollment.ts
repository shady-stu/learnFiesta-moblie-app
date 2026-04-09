export type Enrollment = {
  id: string;
  title: string;
  author: string;
  progress: number;
  lessonsDone: number;
  totalLessons: number;
  img: { uri: string };
  status: "progress" | "completed";
};