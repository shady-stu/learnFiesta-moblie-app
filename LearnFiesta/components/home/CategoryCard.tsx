import { StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';

type CategoryCardProps = {
  title: string;
  icon: string;
  backgroundColor: string;
  iconColor: string;
  onPress?: () => void;
};

export default function CategoryCard({
  title,
  icon,
  backgroundColor,
  iconColor,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#eee' }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.card,
        pressed && {
          opacity: 0.7,
          transform: [{ scale: 0.98 }],
        },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor }]}>
        <Ionicons name={icon as any} size={24} color={iconColor} />
      </View>

      <ThemedText numberOfLines={2} style={styles.title}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 132,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    minHeight: 40,
  },
});