import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed/themed-text';
import type { Course } from '@/types/course';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';

type Props = {
  course?: Course;
  onPress: () => void;
};

export default function HeroBanner({ course, onPress }: Props) {
  const imageUrl =
    course?.imageUrl ||
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4';

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.container}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <ThemedText style={styles.badge}>
          {course?.badge || 'BEST SELLER'}
        </ThemedText>
        <ThemedText numberOfLines={2} style={styles.title}>
          {course?.title || 'Find your next course'}
        </ThemedText>
        <ThemedText numberOfLines={2} style={styles.subtitle}>
          {course?.description || 'Explore popular courses selected from LearnFiesta.'}
        </ThemedText>

        <Pressable style={styles.button} onPress={onPress}>
          <ThemedText style={styles.buttonText}>View Course</ThemedText>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    borderRadius: Radius.md,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: {
    borderRadius: Radius.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28, 29, 31, 0.62)',
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  badge: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.white,
    fontSize: 12,
  },
  button: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.sm,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
