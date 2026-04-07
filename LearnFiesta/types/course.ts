export type Course = {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  duration: string; // "5h 30m"
  rating: number;
  reviewsCount: number;
  price: string; // "50" or "Free"
  oldPrice?: string; // "100" (optional)
  imageUrl: string;
  badge?: string;
};