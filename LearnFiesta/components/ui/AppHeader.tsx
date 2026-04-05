import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

type AppHeaderProps = {
  title?: string;
  onCartPress?: () => void;
  onNotificationsPress?: () => void;
};

export default function AppHeader({
  title = 'LearnFiesta',
  onCartPress,
  onNotificationsPress,
}: AppHeaderProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logo}>
          <Ionicons name="school-outline" size={20} color={Colors.white} />
        </View>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>

      <View style={styles.right}>
        <Pressable style={styles.iconButton} onPress={onCartPress}>
          <Ionicons name="cart-outline" size={22} color={Colors.textSecondary} />
        </Pressable>

        <Pressable style={styles.iconButton} onPress={onNotificationsPress}>
          <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: '700',
  },
  iconButton: {
    padding: 8,
  },
});