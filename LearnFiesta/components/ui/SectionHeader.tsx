import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export default function SectionHeader({
  title,
  actionLabel,
  onPressAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>

      {actionLabel ? (
        <Pressable onPress={onPressAction}>
          <ThemedText style={styles.action}>{actionLabel}</ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});