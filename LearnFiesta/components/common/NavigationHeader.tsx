import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';

type NavigationHeaderProps = {
  title: string;
  showBackButton?: boolean;
  onShare?: () => void;
};

export default function NavigationHeader({ title, showBackButton = true, onShare }: NavigationHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onShare} style={styles.iconButton}>
        <Ionicons name="share-outline" size={24} color={Colors.primary} />
      </TouchableOpacity>
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
    borderBottomColor: Colors.primary + '20', // إضافة شفافية 20% (hex: #5624D020)
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  iconButton: {
    padding: 8,
  },
});