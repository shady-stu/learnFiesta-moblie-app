import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

export default function CartEmpty() {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={80} color={Colors.textSecondary} />
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>Add courses to get started</Text>

      <Pressable
        onPress={() => router.replace('/')}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Browse Courses</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  button: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});