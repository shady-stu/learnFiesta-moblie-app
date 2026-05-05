export type Instructor = {
  id: string;
  courseId: string;

  title: string;
  imageUrl: string;

  students: number;
  revenue: number;
  rating: number;
  isActive: boolean;
};