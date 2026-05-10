import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import type {
  LessonEditorState,
  LessonFormState,
  ResourceFormState,
} from "@/hooks/useCourseCurriculum";
import { LESSON_TYPES, RESOURCE_TYPES } from "./options";
import { curriculumStyles as styles } from "./styles";

type Props = {
  editor: LessonEditorState;
  form: LessonFormState;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onAddResource: () => void;
  onRemoveResource: (index: number) => void;
  onChangeLessonField: <K extends keyof LessonFormState>(
    field: K,
    value: LessonFormState[K]
  ) => void;
  onChangeResourceField: <K extends keyof ResourceFormState>(
    index: number,
    field: K,
    value: ResourceFormState[K]
  ) => void;
};

export default function LessonFormModal({
  editor,
  form,
  saving,
  onClose,
  onSave,
  onAddResource,
  onRemoveResource,
  onChangeLessonField,
  onChangeResourceField,
}: Props) {
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
            <Text style={styles.label}>Lesson title</Text>
            <TextInput
              value={form.title}
              onChangeText={(value) => onChangeLessonField("title", value)}
              placeholder="Example: Course introduction"
              placeholderTextColor={Colors.textSecondary}
              style={styles.input}
            />

            <Text style={styles.label}>Lesson type</Text>
            <View style={styles.choiceRow}>
              {LESSON_TYPES.map((type) => (
                <Pressable
                  key={type.value}
                  onPress={() => onChangeLessonField("type", type.value)}
                  style={[
                    styles.choiceChip,
                    form.type === type.value && styles.choiceChipActive,
                  ]}
                >
                  <MaterialIcons
                    name={type.icon}
                    size={18}
                    color={form.type === type.value ? Colors.white : Colors.primary}
                  />
                  <Text
                    style={[
                      styles.choiceText,
                      form.type === type.value && styles.choiceTextActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Duration in minutes</Text>
            <TextInput
              value={form.durationMinutes}
              onChangeText={(value) => onChangeLessonField("durationMinutes", value)}
              placeholder="15"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>Content URL</Text>
            <TextInput
              value={form.contentUrl}
              onChangeText={(value) => onChangeLessonField("contentUrl", value)}
              placeholder="Video, article, or quiz link"
              placeholderTextColor={Colors.textSecondary}
              autoCapitalize="none"
              style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={form.description}
              onChangeText={(value) => onChangeLessonField("description", value)}
              placeholder="What students will do in this lesson"
              placeholderTextColor={Colors.textSecondary}
              multiline
              style={[styles.input, styles.textArea]}
            />

            <View style={styles.resourceHeader}>
              <Text style={styles.resourceTitle}>Resources</Text>
              <Pressable style={styles.smallButton} onPress={onAddResource}>
                <MaterialIcons name="add" size={18} color={Colors.primary} />
                <Text style={styles.smallButtonText}>Add resource</Text>
              </Pressable>
            </View>

            {form.resources.length === 0 ? (
              <Text style={styles.helperText}>Add optional PDFs, slides, files, or links.</Text>
            ) : (
              form.resources.map((resource, index) => (
                <View key={`${resource.id ?? "new"}-${index}`} style={styles.resourceFormCard}>
                  <View style={styles.resourceFormHeader}>
                    <Text style={styles.resourceFormTitle}>Resource {index + 1}</Text>
                    <Pressable onPress={() => onRemoveResource(index)} disabled={saving}>
                      <MaterialIcons name="close" size={20} color="#ba1a1a" />
                    </Pressable>
                  </View>

                  <TextInput
                    value={resource.title}
                    onChangeText={(value) => onChangeResourceField(index, "title", value)}
                    placeholder="Resource title"
                    placeholderTextColor={Colors.textSecondary}
                    style={styles.input}
                  />

                  <View style={styles.choiceRow}>
                    {RESOURCE_TYPES.map((type) => (
                      <Pressable
                        key={type.value}
                        onPress={() => onChangeResourceField(index, "type", type.value)}
                        style={[
                          styles.resourceChip,
                          resource.type === type.value && styles.choiceChipActive,
                        ]}
                      >
                        <MaterialIcons
                          name={type.icon}
                          size={16}
                          color={resource.type === type.value ? Colors.white : Colors.primary}
                        />
                        <Text
                          style={[
                            styles.resourceChipText,
                            resource.type === type.value && styles.choiceTextActive,
                          ]}
                        >
                          {type.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <TextInput
                    value={resource.url}
                    onChangeText={(value) => onChangeResourceField(index, "url", value)}
                    placeholder="https://..."
                    placeholderTextColor={Colors.textSecondary}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
              ))
            )}
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
