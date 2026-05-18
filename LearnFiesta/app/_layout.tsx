import {
  Stack,
  usePathname,
  useRootNavigationState,
  useRouter,
  useSegments,
} from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../api/services/firebase/firebase';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import CartProvider from '@/app/context/CartContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const pathname = usePathname();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (loading || !rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';
    const atRoot = pathname === '/';

    if (!user && !inAuthGroup) {
      router.replace('/login');
      return;
    }

    if (user && atRoot) {
      router.replace('/(tabs)');
      return;
    }

    if (user && inAuthGroup) {
      router.replace('/post-login-splash');
    }
  }, [loading, pathname, rootNavigationState?.key, router, segments, user]);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider userId={user?.uid}>
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
