import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';


import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CartEmpty from '@/components/cart/CartEmpty';
import CategoryScreenState from '@/components/category/CategoryScreenState';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { useCartContext } from './context/CartContext';

export default function CartScreen() {
  const { cart, isLoading, isError, removeItem } = useCartContext();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: 'My Cart' }} />

      {isLoading && (
        <CategoryScreenState loading title="Loading cart..." />
      )}

      {isError && (
        <CategoryScreenState
          title="Something went wrong"
          description="We couldn't load your cart."
        />
      )}

      {!isLoading && !isError && cart.items.length === 0 && (
        <CartEmpty />
      )}

      {!isLoading && !isError && cart.items.length > 0 && (
        <>
          <FlatList
            data={cart.items}
            keyExtractor={(item) => item.courseId}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <CartItem item={item} onRemove={removeItem} />
            )}
          />
          <CartSummary
            totalItems={cart.totalItems}
            totalPrice={cart.totalPrice}
            onCheckout={() => { /* checkout logic */ }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: Spacing.lg,
  },
  separator: {
    height: Spacing.md,
  },
});