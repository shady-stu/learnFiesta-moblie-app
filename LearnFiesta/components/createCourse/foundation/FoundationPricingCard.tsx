import { Text, View } from "react-native";
import { Control, FieldErrors, useController } from "react-hook-form";
import TextInputField from "@/components/inputs/TextInputField";
import { foundationStyles as styles } from "./styles";
import type { CourseFoundationFormData } from "./schema";

type Props = {
  control: Control<CourseFoundationFormData>;
  errors: FieldErrors<CourseFoundationFormData>;
};

export default function FoundationPricingCard({ control, errors }: Props) {
  const { field: priceField } = useController({ control, name: "price" });

  return (
    <View style={styles.cardSmall}>
      <Text style={styles.sectionTitle}>Pricing</Text>

      <View style={[styles.priceBox, errors.price && { borderColor: "#EF4444" }]}>
        <Text style={styles.currency}>$</Text>

        <TextInputField
          label=""
          value={priceField.value}
          onChangeText={priceField.onChange}
          onBlur={priceField.onBlur}
          keyboardType="numeric"
          returnKeyType="done"
          style={{ flex: 1, marginBottom: 0 }}
        />

        <Text style={styles.usd}>USD</Text>
      </View>

      {errors.price && (
        <Text style={styles.errorText}>{errors.price.message}</Text>
      )}
    </View>
  );
}
