import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useCartQuery, useAddToCart, useRemoveFromCart } from '@/hooks/cart/useCart';
import type { Cart, CartItem } from '@/types/cart';


type CartContextType = {
  cart: Cart;
  isLoading: boolean;
  isError: boolean;
  addItem: (item: Omit<CartItem, 'addedAt'>) => Promise<void>;
  removeItem: (courseId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (courseId: string) => boolean;
  isAdding: boolean;
  isRemoving: boolean;
};


const CartContext = createContext<CartContextType | null>(null);


type Props = {
  userId?: string | null;
  children: ReactNode;
};

export  default function CartProvider({ userId, children }: Props) {
  const safeUserId = userId ?? "";
  const {
    data: items = [],
    isLoading,
    isError,
  } = useCartQuery(safeUserId);

const { mutateAsync: addMutateAsync, isPending: isAdding } =
  useAddToCart(safeUserId);

const { mutateAsync: removeMutateAsync, isPending: isRemoving } =
  useRemoveFromCart(safeUserId);

  const cart: Cart = useMemo(() => ({
    items,
    totalItems: items.length,
    totalPrice: items.reduce((sum, item) => sum + item.price, 0),
  }), [items]);

 
  const isInCart = (courseId: string) =>
    items.some((item) => item.courseId === courseId);

  const addItem = async (item: Omit<CartItem, 'addedAt'>) => {
    if (!userId) throw new Error('Please log in to use the cart.');
    await addMutateAsync(item);
  };

  const removeItem = async (courseId: string) => {
    if (!userId) return;
    await removeMutateAsync(courseId);
  };

  const clearCart = async () => {
    if (!userId) return;

    for (const item of items) {
      await removeMutateAsync(item.courseId);
    }
  };

  const value: CartContextType = {
    cart,
    isLoading: userId ? isLoading : false,
    isError: userId ? isError : false,
    addItem,
    removeItem,
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
