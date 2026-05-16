import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {router, useRouter} from 'expo-router';
import { Colors } from '@/constants/colors';

type NavigationHeaderProps = {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onShare?: () => void;
};

export default function NavigationHeader({
  title,
  showBackButton = true,
  onBackPress,
  onShare,
}: NavigationHeaderProps) {
  const router = useRouter();
  const handleBack = onBackPress ?? (() => router.replace("/(tabs)"));

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}

      <Text numberOfLines={1} style={styles.title}>{title}</Text>

      {onShare ? (
        <TouchableOpacity onPress={onShare} style={styles.iconButton}>
          <Ionicons name="share-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  iconButton: {
    width: 40,
    height: 40,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
