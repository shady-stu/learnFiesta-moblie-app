import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { curriculumStyles as styles } from "./styles";
import type { LessonFormModalProps } from "@/types/curriculum";
import LessonBasicFieldsSection from "./LessonBasicFieldsSection";
import LessonQaSection from "./LessonQaSection";
import LessonResourcesSection from "./LessonResourcesSection";

export default function LessonFormModal({
  editor,
  form,
  errors,
  saving,
  onClose,
  onSave,
  onAddResource,
  onRemoveResource,
  onChangeLessonField,
  onChangeResourceField,
  onAddQa,
  onRemoveQa,
  onChangeQaField,
}: LessonFormModalProps) {
  return (
    <Modal transparent visible={Boolean(editor)} animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.lessonModalCard}>
          <View style={styles.lessonModalHeader}>
            <Text style={styles.modalTitle}>
              {editor?.lesson ? "Edit lesson" : "New lesson"}
            </Text>
            <Pressable onPress={onClose} style={styles.iconButton} disabled={saving}>
              <MaterialIcons name="close" size={22} color={Colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <LessonBasicFieldsSection
              form={form}
              errors={errors}
              onChangeLessonField={onChangeLessonField}
            />
            <LessonQaSection
              form={form}
              errors={errors}
              saving={saving}
              onAddQa={onAddQa}
              onRemoveQa={onRemoveQa}
              onChangeQaField={onChangeQaField}
            />
            <LessonResourcesSection
              form={form}
              errors={errors}
              saving={saving}
              onAddResource={onAddResource}
              onRemoveResource={onRemoveResource}
              onChangeResourceField={onChangeResourceField}
            />
          </ScrollView>

          <View style={styles.modalActions}>
            <Pressable style={styles.secondaryButton} onPress={onClose} disabled={saving}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.modalPrimaryButton} onPress={onSave} disabled={saving}>
              <Text style={styles.modalPrimaryButtonText}>
                {saving ? "Saving..." : "Save lesson"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
