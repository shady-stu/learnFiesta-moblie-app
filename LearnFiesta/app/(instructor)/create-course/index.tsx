
import { useEffect } from "react";
import { View, ScrollView, Button, Text, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import  {Image } from "expo-image";
import TextInputField from "@/components/inputs/TextInputField";
import SelectField from "@/components/inputs/SelectField";
import TextAreaField from "@/components/inputs/TextAreaField";
import ImageUploader from "@/components/upload/ImageUploader";
import LoadingView from "@/components/ui/LoadingView";
import { useCourseFoundation } from "@/hooks/useCourseFoundation";
import { useSaveCourseFoundation } from "@/hooks/useSaveCourseFoundation";
import { useCategories } from '@/hooks/useCategories';
import { useLocalSearchParams, useRouter } from "expo-router";

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
  const router = useRouter();
  const { courseId: courseIdParam } = useLocalSearchParams<{ courseId?: string }>();
  const courseId = Array.isArray(courseIdParam) ? courseIdParam[0] : courseIdParam;
  const isEditing = Boolean(courseId);
  const { mutateAsync, isPending } = useSaveCourseFoundation();
  const { data: categories = [], isLoading } = useCategories();
  const {
    data: editingCourse,
    isLoading: isLoadingCourse,
    isError: isCourseLoadError,
  } = useCourseFoundation(courseId);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
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

  useEffect(() => {
    if (!editingCourse) return;

    reset({
      title: editingCourse.title,
      category: editingCourse.categoryId,
      description: editingCourse.description,
      price: String(editingCourse.price),
      thumbnail: editingCourse.imageUrl,
    });
  }, [editingCourse, reset]);

const thumbnail = watch("thumbnail");
  const onSubmit = async (data: FormData) => {
    try {
      const selectedCategory = categories.find((cat: any) => cat.id === data.category);
  
      const savedCourseId = await mutateAsync({
        courseId,
        data: {
          ...data,
          imageUrl: data.thumbnail,
          price: Number(data.price),
          categoryName: selectedCategory?.title || "",
        },
      });
      
      Alert.alert(
        isEditing ? "Course updated" : "Course created",
        "Now review the curriculum and resources."
      );

      router.replace({
        pathname: "/(instructor)/create-course/curriculum/[id]" as any,
        params: { id: String(savedCourseId), mode: isEditing ? "edit" : "create" }
      });

    } catch {
      Alert.alert(
        isEditing ? "Update failed" : "Create failed",
        isEditing ? "Failed to update course" : "Failed to create course"
      );
    }
  };

  if (isLoadingCourse) return <LoadingView />;

  if (isCourseLoadError) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.errorText}>Failed to load course details.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.step}>STEP 1</Text>
        <Text style={styles.title}>
          {isEditing ? "Edit Course Foundations" : "Course Foundations"}
        </Text>
        <Text style={styles.subtitle}>
          {isEditing
            ? "Update the basic details for this course"
            : "Set up the basic details for your new course"}
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
            title={isPending ? "Saving..." : isEditing ? "Update & Continue" : "Save & Continue"}
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
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF7FF",
    padding: 20,
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
