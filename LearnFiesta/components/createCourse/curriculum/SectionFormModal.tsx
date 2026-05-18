import { Keyboard, Modal, Pressable, Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/colors";
import KeyboardNavigator from "@/components/common/KeyboardNavigator";
import type { CurriculumSection } from "@/api/services/curriculum/curriculumService";
import { curriculumStyles as styles } from "./styles";

type Props = {
  visible: boolean;
  saving: boolean;
  title: string;
  titleError?: string | null;
  editingSection: CurriculumSection | null;
  onChangeTitle: (title: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function SectionFormModal({
  visible,
  saving,
  title,
  titleError,
  editingSection,
  onChangeTitle,
  onClose,
  onSave,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <KeyboardNavigator>
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
              returnKeyType="done"
              blurOnSubmit
              onSubmitEditing={() => {
                Keyboard.dismiss();
                onSave();
              }}
              style={styles.input}
            />
            {titleError ? <Text style={styles.formErrorText}>{titleError}</Text> : null}
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
      </KeyboardNavigator>
    </Modal>
  );
}
