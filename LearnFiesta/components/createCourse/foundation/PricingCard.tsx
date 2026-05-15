import { Text, View } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import TextInputField from "@/components/inputs/TextInputField";
import { foundationStyles as styles } from "./styles";
import type { CourseFoundationFormData } from "./schema";

type Props = {
  control: Control<CourseFoundationFormData>;
  errors: FieldErrors<CourseFoundationFormData>;
};

export default function PricingCard({ control, errors }: Props) {
  return (
    <View style={styles.cardSmall}>
      <Text style={styles.sectionTitle}>Pricing</Text>

      <Controller
        control={control}
        name="price"
        render={({ field }) => (
          <>
            <View style={[styles.priceBox, errors.price && { borderColor: "#EF4444" }]}>
              <Text style={styles.currency}>$</Text>

              <TextInputField
                label=""
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="numeric"
                style={{ flex: 1, marginBottom: 0 }}
              />

              <Text style={styles.usd}>USD</Text>
            </View>

            {errors.price && (
              <Text style={styles.errorText}>{errors.price.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}
