import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';

type CourseCardProps = {
  title: string;
  instructor: string;
  rating: number;
  reviews: string;
  price: string
  image: string;
};

export default function CourseCard({
  title,
  instructor,
  rating,
  reviews,
  price,
  image,
}: CourseCardProps) {

  
  const renderPrice = () => {
  if(price === 'Free') {
    return 'Free';
  } else {
    return `$${price}`;
  }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <ThemedText numberOfLines={2} style={styles.title}>
          {title}
        </ThemedText>

        <ThemedText style={styles.instructor}>
          {instructor}
        </ThemedText>

        <View style={styles.ratingRow}>
          <ThemedText style={styles.rating}>{rating}</ThemedText>
          <Ionicons name="star" size={14} color="#F59E0B" />
          <ThemedText style={styles.reviews}>({reviews})</ThemedText>
        </View>

        <View style={styles.footer}>
          
          <ThemedText style={styles.price}>
            {renderPrice()}
          </ThemedText>
          <Pressable style={styles.addtocart}>
            <Ionicons name="cart" size={16} color={Colors.textSecondary} />
          </Pressable>
         
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  image: {
    width: '100%',
    height: 128,
  },
  content: {
    padding: Spacing.md,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    minHeight: 40,
  },
  instructor: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  reviews: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  footer: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  addtocart: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});