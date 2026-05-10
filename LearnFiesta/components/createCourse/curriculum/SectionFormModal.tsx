import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/colors";
import type { CurriculumSection } from "@/api/services/curriculumService";
import { curriculumStyles as styles } from "./styles";

type Props = {
  visible: boolean;
  saving: boolean;
  title: string;
  editingSection: CurriculumSection | null;
  onChangeTitle: (title: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function SectionFormModal({
  visible,
  saving,
  title,
  editingSection,
  onChangeTitle,
  onClose,
  onSave,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>
            {editingSection ? "Edit section" : "New section"}
          </Text>
          <TextInput
            value={title}
            onChangeText={onChangeTitle}
            placeholder="Section title"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
          />
          <View style={styles.modalActions}>
            <Pressable style={styles.secondaryButton} onPress={onClose} disabled={saving}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.modalPrimaryButton} onPress={onSave} disabled={saving}>
              <Text style={styles.modalPrimaryButtonText}>
                {saving ? "Saving..." : "Save section"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
