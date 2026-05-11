import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import type { CartItem as CartItemType } from '@/types/cart';

type Props = {
  item: CartItemType;
  onRemove: (courseId: string) => void;
  onOpenCourse?: (courseId: string) => void;
};

export default function CartItem({ item, onRemove, onOpenCourse }: Props) {
  return (
    <Pressable style={styles.container} onPress={() => onOpenCourse?.(item.courseId)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.instructor}>{item.instructorName}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          onRemove(item.courseId);
        }}
        hitSlop={8}
      >
        <Ionicons name="trash-outline" size={20} color={Colors.warning} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: Spacing.md,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  instructor: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});
