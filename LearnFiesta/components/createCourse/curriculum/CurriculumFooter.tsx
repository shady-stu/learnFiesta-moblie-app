import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { curriculumStyles as styles } from "./styles";

type Props = {
  disabled: boolean;
  saving: boolean;
  onPublish: () => void;
};

export default function CurriculumFooter({ disabled, saving, onPublish }: Props) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.publishButton, disabled && styles.buttonDisabled]}
        onPress={onPublish}
        disabled={disabled}
      >
        {saving ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <>
            <MaterialIcons name="task-alt" size={20} color={Colors.white} />
            <Text style={styles.publishButtonText}>Finish and publish</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
