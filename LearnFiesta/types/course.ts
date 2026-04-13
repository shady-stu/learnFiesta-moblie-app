export type Course = {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  price: string;
  oldPrice?: string;
  imageUrl: string;
  badge?: string;
};
