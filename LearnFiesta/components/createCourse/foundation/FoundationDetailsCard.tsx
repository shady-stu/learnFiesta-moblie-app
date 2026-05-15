import { Text, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import TextInputField from "@/components/inputs/TextInputField";
import SelectField from "@/components/inputs/SelectField";
import TextAreaField from "@/components/inputs/TextAreaField";
import { foundationStyles as styles } from "./styles";
import type { CourseFoundationFormData } from "./schema";

type CategoryOption = {
  id: string;
  title: string;
};

type Props = {
  control: Control<CourseFoundationFormData>;
  errors: FieldErrors<CourseFoundationFormData>;
  categories: CategoryOption[];
  isLoadingCategories: boolean;
  learningPoints: string[];
  onAddLearningPoint: () => void;
  onUpdateLearningPoint: (index: number, value: string) => void;
  onRemoveLearningPoint: (index: number) => void;
};

export default function FoundationDetailsCard({
  control,
  errors,
  categories,
  isLoadingCategories,
  learningPoints,
  onAddLearningPoint,
  onUpdateLearningPoint,
  onRemoveLearningPoint,
}: Props) {
  const categoryOptions = isLoadingCategories
    ? [{ label: "Loading...", value: "" }]
    : categories.map((category) => ({
        label: category.title,
        value: category.id,
      }));

  return (
    <View style={styles.cardLarge}>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInputField
            label="Course Title"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <SelectField
            label="Category"
            value={field.value}
            onChange={field.onChange}
            options={categoryOptions}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextAreaField
            label="Description"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.description?.message}
          />
        )}
      />

      <View style={styles.learningBlock}>
        <Text style={styles.sectionTitle}>What students will learn</Text>
        <Text style={styles.helperText}>
          Write each learning outcome as a separate point.
        </Text>

        {learningPoints.map((point, index) => (
          <View key={`learning-point-${index}`} style={styles.learningPointRow}>
            <View style={styles.learningPointInput}>
              <TextInputField
                label={`Point ${index + 1}`}
                value={point}
                onChangeText={(value) => onUpdateLearningPoint(index, value)}
                placeholder="Example: Build a real mobile screen"
                error={errors.whatYouWillLearn?.[index]?.message}
              />
            </View>

            {learningPoints.length > 1 && (
              <TouchableOpacity
                style={styles.removePointButton}
                onPress={() => onRemoveLearningPoint(index)}
              >
                <Text style={styles.removePointText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {typeof errors.whatYouWillLearn?.message === "string" && (
          <Text style={styles.errorText}>{errors.whatYouWillLearn.message}</Text>
        )}

        <TouchableOpacity style={styles.addPointButton} onPress={onAddLearningPoint}>
          <Text style={styles.addPointText}>Add learning point</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
