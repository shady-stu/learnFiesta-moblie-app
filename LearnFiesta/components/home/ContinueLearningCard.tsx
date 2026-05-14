import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import type { Enrollment } from '@/types/Enrollment';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';

type Props = {
  enrollment?: Enrollment;
  onPress: () => void;
};

export default function ContinueLearningCard({ enrollment, onPress }: Props) {
  if (!enrollment) {
    return (
      <View style={styles.card}>
        <View style={[styles.thumbnail, styles.emptyThumbnail]}>
          <Ionicons name="book-outline" size={24} color={Colors.primary} />
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.meta}>No course in progress</ThemedText>
          <ThemedText style={styles.title}>Start a course to continue learning here</ThemedText>
        </View>
      </View>
    );
  }

  const progress = Math.max(0, Math.min(enrollment.progress, 100));
  const nextLessonText = enrollment.nextLessonId
    ? `Next lesson • ${enrollment.lessonsDone} of ${enrollment.totalLessons} done`
    : 'Course completed';

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: enrollment.img }} style={styles.thumbnail} />

      <View style={styles.content}>
        <ThemedText style={styles.meta}>{nextLessonText}</ThemedText>
        <ThemedText numberOfLines={2} style={styles.title}>{enrollment.title}</ThemedText>

        <View style={styles.progressRow}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <ThemedText style={styles.progressText}>{progress}%</ThemedText>
        </View>
      </View>

      <View style={styles.playButton}>
        <Ionicons name="play" size={20} color={Colors.primary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: Radius.sm,
    backgroundColor: Colors.muted,
  },
  emptyThumbnail: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    borderRadius: 99,
    backgroundColor: '#EEF1F4',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(86, 36, 208, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
