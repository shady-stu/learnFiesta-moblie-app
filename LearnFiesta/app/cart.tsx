import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';


import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CartEmpty from '@/components/cart/CartEmpty';
import CategoryScreenState from '@/components/category/CategoryScreenState';
import NavigationHeader from '@/components/common/NavigationHeader';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { useCartContext } from './context/CartContext';

export default function CartScreen() {
  const { cart, isLoading, isError, removeItem } = useCartContext();
  const sortedItems = [...cart.items].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <NavigationHeader title="My Cart" />

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
            data={sortedItems}
            keyExtractor={(item) => item.courseId}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onRemove={removeItem}
                onOpenCourse={(courseId) =>
                  router.push({ pathname: "/course/[id]", params: { id: courseId } })
                }
              />
            )}
          />
          <CartSummary
            totalItems={cart.totalItems}
            totalPrice={cart.totalPrice}
            onCheckout={() => router.push("/checkout")}
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
