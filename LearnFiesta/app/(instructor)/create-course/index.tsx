
import { View, ScrollView, Button, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import  {Image } from "expo-image";
import TextInputField from "@/components/inputs/TextInputField";
import SelectField from "@/components/inputs/SelectField";
import TextAreaField from "@/components/inputs/TextAreaField";
import ImageUploader from "@/components/upload/ImageUploader";
import { useCreateCourse } from "@/hooks/useCreateCourse";
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from "expo-router";

// 1. Define your Zod Validation Schema
const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // Validate that price is entered and is a valid number
  price: z.string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid number greater than 0",
    }),
  thumbnail: z.string().optional(),
});


type FormData = z.infer<typeof courseSchema>;

export default function CreateCourseScreen() {
  const { mutateAsync, isPending } = useCreateCourse();
const { data: categories = [], isLoading } = useCategories();
const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
     watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(courseSchema),
     mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: "",
    },
  });
const thumbnail = watch("thumbnail");
  const onSubmit = async (data: FormData) => {
    try {
  
      const courseId = await mutateAsync({
        ...data,
        price: Number(data.price),
      });
      
      alert("Course created successfully");

     
      router.push({
        pathname: "/(instructor)/create-course/curriculum/[id]",
        params: { id: String(courseId) }
      });

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
          render={({ field }) => (
            <>
              <TextInputField
                label="Course Title"
                value={field.value}
                onChangeText={field.onChange}
              />
          
              {errors.title && (
                <Text style={styles.errorText}>{errors.title.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <>
              <SelectField
                label="Category"
                value={field.value}
                onChange={field.onChange}
                options={
                  isLoading
                    ? [{ label: 'Loading...', value: '' }]
                    : categories.map((cat:any) => ({
                        label: cat.title,
                        value: cat.id,
                      }))
                }
              />
              {errors.category && (
                <Text style={styles.errorText}>{errors.category.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <>
              <TextAreaField
                label="Description"
                value={field.value}
                onChangeText={field.onChange}
              />
              {errors.description && (
                <Text style={styles.errorText}>
                  {errors.description.message}
                </Text>
              )}
            </>
          )}
        />
      </View>

     
      <View style={styles.cardSmall}>
        <Text style={styles.sectionTitle}>Pricing</Text>

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <>
              <View
                style={[
                  styles.priceBox,
                  errors.price && { borderColor: "#EF4444" }, // highlight border on error
                ]}
              >
                <Text style={styles.currency}>$</Text>

                <TextInputField
                  label=""
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  style={{ flex: 1, marginBottom: 0 }} // Prevent inner margin
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

    
<View style={styles.cardSmall}>
  <Text style={styles.sectionTitle}>Course Thumbnail</Text>

  <ImageUploader
    onUploaded={(url: string) => {
      setValue("thumbnail", url, { shouldValidate: true });
    }}
  />

  
  {thumbnail ? (
    <Image
      source={{ uri: thumbnail }}
      style={{
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginTop: 10,
      }}
    />
  ) : null}

  {errors.thumbnail && (
    <Text style={styles.errorText}>{errors.thumbnail.message}</Text>
  )}
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
  );
}

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

  errorText: {
    color: "#EF4444", 
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
});