import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useCartQuery, useAddToCart, useRemoveFromCart } from '@/hooks/useCart';
import type { Cart, CartItem } from '@/types/cart';


type CartContextType = {
  cart: Cart;
  isLoading: boolean;
  isError: boolean;
  addItem: (item: Omit<CartItem, 'addedAt'>) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => Promise<void>;
  isInCart: (courseId: string) => boolean;
  isAdding: boolean;
  isRemoving: boolean;
};


const CartContext = createContext<CartContextType | null>(null);


type Props = {
  userId: string;
  children: ReactNode;
};

export  default function CartProvider({ userId, children }: Props) {
  const {
    data: items = [],
    isLoading,
    isError,
  } = useCartQuery(userId);

  const { mutate: addMutate, isPending: isAdding } = useAddToCart(userId);
  const {mutateAsync: removeMutate, isPending: isRemoving} = useRemoveFromCart(userId);

  const cart: Cart = useMemo(() => ({
    items,
    totalItems: items.length,
    totalPrice: items.reduce((sum, item) => sum + item.price, 0),
  }), [items]);

 
  const isInCart = (courseId: string) =>
    items.some((item) => item.courseId === courseId);

  const clearCart = async () => {
    for (const item of items) {
      await removeMutate(item.courseId);
    }
  };

  const value: CartContextType = {
    cart,
    isLoading,
    isError,
    addItem: addMutate,
    removeItem: removeMutate,
    clearCart,
    isInCart,
    isAdding,
    isRemoving,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}


export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used inside CartProvider');
  }
  return context;
}