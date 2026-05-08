export type Course = {
  id: string;
  title: string;
  categoryId:string;
  categoryName:string;
  instructorId: string;
  instructorName: string;
  duration: string;
  totalLessons: number;
  description: string;
  whatYouWillLearn: string[];
  rating: number;
  reviewsCount: number;
  price: number;         
  oldPrice?: number;      
  imageUrl: string;
  badge?: string;
};
export interface CreateCourseDTO {
  title: string;
  category: string;
  description: string;
  price: number;
  thumbnail?: string;
}