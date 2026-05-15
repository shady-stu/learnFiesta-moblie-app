import { Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useController } from "react-hook-form";
import { Colors } from "@/constants/colors";
import { LESSON_TYPES } from "./options";
import { curriculumStyles as styles } from "./styles";
import type { LessonFormModalProps } from "@/types/curriculum";

type Props = Pick<LessonFormModalProps, "control" | "form" | "errors">;

export default function LessonBasicFieldsSection({
  control,
  form,
  errors,
}: Props) {
  const { field: titleField } = useController({ control, name: "title" });
  const { field: typeField } = useController({ control, name: "type" });
  const { field: durationField } = useController({
    control,
    name: "durationMinutes",
  });
  const { field: contentUrlField } = useController({
    control,
    name: "contentUrl",
  });
  const { field: descriptionField } = useController({
    control,
    name: "description",
  });
  const { field: keyConceptsField } = useController({
    control,
    name: "keyConceptsText",
  });

  return (
    <>
      <Text style={styles.label}>Lesson title</Text>
      <TextInput
        value={titleField.value}
        onChangeText={titleField.onChange}
        onBlur={titleField.onBlur}
        placeholder="Example: Course introduction"
        placeholderTextColor={Colors.textSecondary}
        style={styles.input}
      />
      {errors?.title?.message ? (
        <Text style={styles.formErrorText}>{errors.title.message}</Text>
      ) : null}

      <Text style={styles.label}>Lesson type</Text>
      <View style={styles.choiceRow}>
        {LESSON_TYPES.map((type) => (
          <Pressable
            key={type.value}
            onPress={() => typeField.onChange(type.value)}
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
        value={durationField.value}
        onChangeText={durationField.onChange}
        onBlur={durationField.onBlur}
        placeholder="15"
        placeholderTextColor={Colors.textSecondary}
        keyboardType="numeric"
        style={styles.input}
      />
      {errors?.durationMinutes?.message ? (
        <Text style={styles.formErrorText}>{errors.durationMinutes.message}</Text>
      ) : null}

      <Text style={styles.label}>Content URL</Text>
      <TextInput
        value={contentUrlField.value}
        onChangeText={contentUrlField.onChange}
        onBlur={contentUrlField.onBlur}
        placeholder="Video, article, or quiz link"
        placeholderTextColor={Colors.textSecondary}
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={descriptionField.value}
        onChangeText={descriptionField.onChange}
        onBlur={descriptionField.onBlur}
        placeholder="What students will do in this lesson"
        placeholderTextColor={Colors.textSecondary}
        multiline
        style={[styles.input, styles.textArea]}
      />
      {errors?.description?.message ? (
        <Text style={styles.formErrorText}>{errors.description.message}</Text>
      ) : null}

      <Text style={styles.label}>Key Concepts (one per line)</Text>
      <TextInput
        value={keyConceptsField.value}
        onChangeText={keyConceptsField.onChange}
        onBlur={keyConceptsField.onBlur}
        placeholder={"Example:\nUI vs UX\nVisual hierarchy"}
        placeholderTextColor={Colors.textSecondary}
        multiline
        style={[styles.input, styles.textArea]}
      />
    </>
  );
}
