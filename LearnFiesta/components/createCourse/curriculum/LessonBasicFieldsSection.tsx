import { Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { LESSON_TYPES } from "./options";
import { curriculumStyles as styles } from "./styles";
import type { LessonFormModalProps } from "@/types/curriculum";

type Props = Pick<LessonFormModalProps, "form" | "errors" | "onChangeLessonField">;

export default function LessonBasicFieldsSection({
  form,
  errors,
  onChangeLessonField,
}: Props) {
  return (
    <>
      <Text style={styles.label}>Lesson title</Text>
      <TextInput
        value={form.title}
        onChangeText={(value) => onChangeLessonField("title", value)}
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
      {errors?.durationMinutes?.message ? (
        <Text style={styles.formErrorText}>{errors.durationMinutes.message}</Text>
      ) : null}

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

      <Text style={styles.label}>Key Concepts (one per line)</Text>
      <TextInput
        value={form.keyConceptsText}
        onChangeText={(value) => onChangeLessonField("keyConceptsText", value)}
        placeholder={"Example:\nUI vs UX\nVisual hierarchy"}
        placeholderTextColor={Colors.textSecondary}
        multiline
        style={[styles.input, styles.textArea]}
      />
    </>
  );
}
