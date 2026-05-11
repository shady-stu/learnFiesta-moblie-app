import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { profileStyles as styles } from "./styles";

type Props = {
  onPress: () => void;
};

export default function InstructorAccessCard({ onPress }: Props) {
  return (
    <View style={styles.instructorCard}>
      <View style={styles.instructorIcon}>
        <Ionicons name="school-outline" size={22} color={Colors.primary} />
      </View>

      <View style={styles.instructorContent}>
        <Text style={styles.instructorTitle}>Instructor Workspace</Text>
        <Text style={styles.instructorSubtitle}>Manage courses and create new content</Text>
      </View>

      <TouchableOpacity style={styles.instructorButton} onPress={onPress}>
        <Text style={styles.instructorButtonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
}
