import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { useCartContext } from '@/app/context/CartContext';

type AppHeaderProps = {
  title?: string;
  onCartPress?: () => void;
  onNotificationsPress?: () => void;
};

export default function AppHeader({
  title = 'LearnFiesta',
  onCartPress,
  onNotificationsPress,
}: AppHeaderProps) {
  const { cart } = useCartContext();
  const cartCount = cart.totalItems;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logo}>
          <Ionicons name="school-outline" size={20} color={Colors.white} />
        </View>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>

      <View style={styles.right}>
        <Pressable
          style={styles.iconButton}
          onPress={onCartPress ?? (() => router.push('/cart'))}
        >
          <Ionicons name="cart-outline" size={22} color={Colors.textSecondary} />
          {cartCount > 0 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          ) : null}
        </Pressable>

        {onNotificationsPress ? (
          <Pressable style={styles.iconButton} onPress={onNotificationsPress}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: '700',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
