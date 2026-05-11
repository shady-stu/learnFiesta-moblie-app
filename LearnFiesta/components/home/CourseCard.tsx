import { Image, Pressable, StyleSheet, View, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';
import Price from "@/components/ui/Price";
import { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "@/api/services/firebase";
import { useAddToCart } from "@/hooks/useCart";
type CourseCardProps = {
  courseId: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: string;
  price: number;
  oldPrice?: number;
  image: string;
  
};

export default function CourseCard({
  courseId,
  title,
  instructor,
  rating,
  reviews,
  price,
  oldPrice,
  image,
}: CourseCardProps) {
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();
  const userId = auth.currentUser?.uid ?? "";
  const addToCartMutation = useAddToCart(userId);

  const handleAddToCart = async () => {
    if (!userId) {
      Alert.alert("Sign in required", "Please sign in before adding items to cart.");
      return;
    }

    await addToCartMutation.mutateAsync({
      id: `${userId}-${courseId}`,
      courseId,
      title,
      instructorName: instructor,
      price,
      imageUrl: image,
    });
    Alert.alert("Added to cart", "Course was added to your cart.");
    setFlipped(false);
  };

  return (
    <Pressable style={styles.card} onPress={() => setFlipped((prev) => !prev)}>
      {!flipped ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.content}>
            <ThemedText numberOfLines={2} style={styles.title}>
              {title}
            </ThemedText>
            <ThemedText style={styles.instructor}>{instructor}</ThemedText>
            <View style={styles.ratingRow}>
              <ThemedText style={styles.rating}>{rating}</ThemedText>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <ThemedText style={styles.reviews}>({reviews})</ThemedText>
            </View>
            <View style={styles.footer}>
              <Price price={price} oldPrice={oldPrice} />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.backFace}>
          <Text style={styles.backTitle} numberOfLines={2}>{title}</Text>
          <Pressable
            style={styles.primaryAction}
            onPress={handleAddToCart}
            disabled={addToCartMutation.isPending}
          >
            <Text style={styles.primaryActionText}>
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.secondaryAction}
            onPress={() =>
              router.push({ pathname: "/course/[id]", params: { id: courseId } })
            }
          >
            <Text style={styles.secondaryActionText}>View Details</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
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
  backFace: {
    flex: 1,
    minHeight: 230,
    padding: Spacing.md,
    justifyContent: "center",
    gap: 12,
    backgroundColor: Colors.surface,
  },
  backTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  primaryAction: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryActionText: {
    color: Colors.white,
    fontWeight: "700",
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  secondaryActionText: {
    color: Colors.textPrimary,
    fontWeight: "700",
  },
});
