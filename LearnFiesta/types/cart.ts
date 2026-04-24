export type CartItem = {
  id: string;
  courseId: string;
  title: string;
  instructorName: string;
  price: number;
  imageUrl: string;
  addedAt: number;
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
};