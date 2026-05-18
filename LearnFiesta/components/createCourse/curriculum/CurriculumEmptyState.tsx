import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { curriculumStyles as styles } from "./styles";

type Props = {
  onAddSection: () => void;
};

export default function CurriculumEmptyState({ onAddSection }: Props) {
  return (
    <View style={styles.emptyState}>
      <MaterialIcons name="playlist-add" size={42} color={Colors.primary} />
      <Text style={styles.emptyTitle}>Start with your first section</Text>
      <Text style={styles.emptyText}>
        Sections keep the course organized and make the student experience easier to scan.
      </Text>
      <TouchableOpacity style={styles.primaryButton} onPress={onAddSection}>
        <MaterialIcons name="add" size={20} color={Colors.white} />
        <Text style={styles.primaryButtonText}>Add section</Text>
      </TouchableOpacity>
    </View>
  );
}
