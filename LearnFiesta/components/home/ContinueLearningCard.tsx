import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';

export default function ContinueLearningCard() {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4' }}
        style={styles.thumbnail}
      />

      <View style={styles.content}>
        <ThemedText style={styles.meta}>Next: Lesson 14 • Advanced Hooks</ThemedText>
        <ThemedText style={styles.title}>React Development Masterclass</ThemedText>

        <View style={styles.progressRow}>
          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>
          <ThemedText style={styles.progressText}>65%</ThemedText>
        </View>
      </View>

      <Pressable style={styles.playButton}>
        <Ionicons name="play" size={20} color={Colors.primary} />
      </Pressable>
    </View>
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
    width: '65%',
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