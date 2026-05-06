import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

type Props = {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
};

export default function CartSummary({
  totalItems,
  totalPrice,
  onCheckout,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Total ({totalItems} items)</Text>
        <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
      </View>

      <Pressable
        onPress={onCheckout}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});