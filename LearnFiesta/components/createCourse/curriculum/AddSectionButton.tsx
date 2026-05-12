import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { curriculumStyles as styles } from "./styles";

type Props = {
  disabled?: boolean;
  onPress: () => void;
};

export default function AddSectionButton({ disabled, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.addSectionBtn} onPress={onPress} disabled={disabled}>
      <View style={styles.addSectionIconBg}>
        <MaterialIcons name="add" size={24} color={Colors.primary} />
      </View>
      <Text style={styles.addSectionText}>Add another section</Text>
    </TouchableOpacity>
  );
}
