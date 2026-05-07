import { View, ScrollView, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import TextInputField from "@/components/inputs/TextInputField";
import SelectField from "@/components/inputs/SelectField";
import TextAreaField from "@/components/inputs/TextAreaField";
import ImageUploader from "@/components/upload/ImageUploader";
import { useCreateCourse } from "@/hooks/useCreateCourse";


type FormData = {
  title: string;
  category: string;
  description: string;
  price: string; 
  thumbnail?: string;
};

export default function CreateCourseScreen() {

    const { control, handleSubmit, setValue } = useForm<FormData>();


    const { mutateAsync, isPending } = useCreateCourse();

    const onSubmit = async (data: FormData) => {
        try {
          await mutateAsync({
  ...data,
  price: Number(data.price), 
});

            alert("Course created successfully");
        } catch (e) {
            alert("Failed to create course");
        }
    };

  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 40 }}
    showsVerticalScrollIndicator={false}
  >
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.step}>STEP 1</Text>
      <Text style={styles.title}>Course Foundations</Text>
      <Text style={styles.subtitle}>
        Set up the basic details for your new course
      </Text>
    </View>

  
    <View style={styles.cardLarge}>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInputField
            label="Course Title"
            value={field.value}
            onChangeText={field.onChange}
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
            options={[
              { label: "Design & UX", value: "design" },
              { label: "Web Development", value: "dev" },
            ]}
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
          />
        )}
      />
    </View>

    {/* Pricing Card */}
    <View style={styles.cardSmall}>
      <Text style={styles.sectionTitle}>Pricing</Text>

      <Controller
        control={control}
        name="price"
        rules={{ required: true }}
        render={({ field }) => (
          <View style={styles.priceBox}>
            <Text style={styles.currency}>$</Text>

            <TextInputField
              label=""
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />

            <Text style={styles.usd}>USD</Text>
          </View>
        )}
      />
    </View>

    {/* Thumbnail Card */}
    <View style={styles.cardSmall}>
      <Text style={styles.sectionTitle}>Course Thumbnail</Text>

      <ImageUploader
        onUploaded={(url: string) => {
          setValue("thumbnail", url as any);
        }}
      />
    </View>

    {/* Footer Button */}
    <View style={styles.footer}>
      <View style={styles.buttonWrapper}>
        <Button
          title={isPending ? "Saving..." : "Save & Continue"}
          onPress={handleSubmit(onSubmit)}
          color="#5624D0"
        />
      </View>
    </View>
  </ScrollView>
);}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF7FF",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 30,
    marginBottom: 24,
  },

  step: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D1A24",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#5A5F63",
  },

  cardLarge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardSmall: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
    color: "#1D1A24",
  },

  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E0EE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F8F1FF",
  },

  currency: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5624D0",
    marginRight: 6,
  },

  usd: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
  },

  footer: {
    marginTop: 10,
    marginBottom: 30,
  },

  buttonWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
});