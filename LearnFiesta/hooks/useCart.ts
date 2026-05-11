import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from '@/api/services/cart/cartService';
import type { CartItem } from '@/types/cart';


export const cartKey = (userId: string) => ['cart', userId];


export function useCartQuery(userId: string) {
  return useQuery({
    queryKey: cartKey(userId),
    queryFn: () => fetchCart(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}


export function useAddToCart(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Omit<CartItem, 'addedAt'>) =>
      addToCart(userId, item),
    // After add, refresh cart from Firestore
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartKey(userId) });
    },
  });
}


export function useRemoveFromCart(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => removeFromCart(userId, courseId),
    // After remove, refresh cart from Firestore
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartKey(userId) });
    },
  });
}
