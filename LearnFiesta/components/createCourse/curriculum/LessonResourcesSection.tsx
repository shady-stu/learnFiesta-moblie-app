import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { RESOURCE_TYPES } from "./options";
import { curriculumStyles as styles } from "./styles";
import type { LessonFormModalProps } from "@/types/curriculum";

type Props = Pick<
  LessonFormModalProps,
  | "form"
  | "errors"
  | "saving"
  | "onAddResource"
  | "onRemoveResource"
  | "onChangeResourceField"
>;

export default function LessonResourcesSection({
  form,
  errors,
  saving,
  onAddResource,
  onRemoveResource,
  onChangeResourceField,
}: Props) {
  return (
    <>
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
              returnKeyType="next"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
              style={styles.input}
            />
            {errors?.resources?.[index]?.title?.message ? (
              <Text style={styles.formErrorText}>
                {errors.resources[index]?.title?.message}
              </Text>
            ) : null}

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
              autoCorrect={false}
              returnKeyType="done"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
              style={styles.input}
            />
            {errors?.resources?.[index]?.url?.message ? (
              <Text style={styles.formErrorText}>
                {errors.resources[index]?.url?.message}
              </Text>
            ) : null}
          </View>
        ))
      )}
    </>
  );
}
