import { Stack, Redirect, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/api/services/firebase';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libr/queryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartProvider from './context/CartContext';
export default function RootLayout() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return null;
  }

  const inAuthGroup = segments[0] === '(auth)';

  if (!user && !inAuthGroup && !loading) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {user ? (
          <CartProvider userId={user.uid}>
            <Stack screenOptions={{ headerShown: false }} />
          </CartProvider>
        ) : (
          <Stack screenOptions={{ headerShown: false }} />
        )}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
