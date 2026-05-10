import { ActivityIndicator, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { curriculumStyles as styles } from "./styles";

type Props = {
  error?: string | null;
};

export default function CurriculumStateView({ error }: Props) {
  if (error) {
    return (
      <View style={styles.centerState}>
        <MaterialIcons name="error-outline" size={34} color="#ba1a1a" />
        <Text style={styles.errorTitle}>Could not load curriculum</Text>
        <Text style={styles.centerStateText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.centerState}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.centerStateText}>Loading curriculum...</Text>
    </View>
  );
}
