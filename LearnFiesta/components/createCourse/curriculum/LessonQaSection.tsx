import { Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { curriculumStyles as styles } from "./styles";
import type { LessonFormModalProps } from "@/types/curriculum";

type Props = Pick<
  LessonFormModalProps,
  "form" | "errors" | "saving" | "onAddQa" | "onRemoveQa" | "onChangeQaField"
>;

export default function LessonQaSection({
  form,
  errors,
  saving,
  onAddQa,
  onRemoveQa,
  onChangeQaField,
}: Props) {
  return (
    <>
      <View style={styles.resourceHeader}>
        <Text style={styles.resourceTitle}>Q&A</Text>
        <Pressable style={styles.smallButton} onPress={onAddQa}>
          <MaterialIcons name="add" size={18} color={Colors.primary} />
          <Text style={styles.smallButtonText}>Add Q&A</Text>
        </Pressable>
      </View>

      {form.qa.length === 0 ? (
        <Text style={styles.helperText}>Add common questions with clear answers.</Text>
      ) : (
        form.qa.map((item, index) => (
          <View key={`${item.id ?? "qa"}-${index}`} style={styles.resourceFormCard}>
            <View style={styles.resourceFormHeader}>
              <Text style={styles.resourceFormTitle}>Q&A {index + 1}</Text>
              <Pressable onPress={() => onRemoveQa(index)} disabled={saving}>
                <MaterialIcons name="close" size={20} color="#ba1a1a" />
              </Pressable>
            </View>
            <TextInput
              value={item.question}
              onChangeText={(value) => onChangeQaField(index, "question", value)}
              placeholder="Question"
              placeholderTextColor={Colors.textSecondary}
              style={styles.input}
            />
            {errors?.qa?.[index]?.question?.message ? (
              <Text style={styles.formErrorText}>
                {errors.qa[index]?.question?.message}
              </Text>
            ) : null}

            <TextInput
              value={item.answer}
              onChangeText={(value) => onChangeQaField(index, "answer", value)}
              placeholder="Answer"
              placeholderTextColor={Colors.textSecondary}
              multiline
              style={[styles.input, styles.textArea]}
            />
            {errors?.qa?.[index]?.answer?.message ? (
              <Text style={styles.formErrorText}>
                {errors.qa[index]?.answer?.message}
              </Text>
            ) : null}
          </View>
        ))
      )}
    </>
  );
}
