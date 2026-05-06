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


    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: cartKey(userId) });

      const previous = queryClient.getQueryData<CartItem[]>(cartKey(userId));

      queryClient.setQueryData<CartItem[]>(cartKey(userId), (old = []) => [
        ...old,
        { ...newItem, addedAt: Date.now() },
      ]);

      return { previous };
    },

    onError: (_err, _item, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKey(userId), context.previous);
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: cartKey(userId) });
    },
  });
}


export function useRemoveFromCart(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => removeFromCart(userId, courseId),

   
    onMutate: async (courseId) => {
      await queryClient.cancelQueries({ queryKey: cartKey(userId) });

      const previous = queryClient.getQueryData<CartItem[]>(cartKey(userId));

      queryClient.setQueryData<CartItem[]>(cartKey(userId), (old = []) =>
        old.filter((item) => item.courseId !== courseId)
      );

      return { previous };
    },

    onError: (_err, _courseId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKey(userId), context.previous);
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: cartKey(userId) });
    },
  });
}