import { useEffect } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import NavigationHeader from "@/components/common/NavigationHeader";
import CourseFoundationHeader from "@/components/createCourse/foundation/CourseFoundationHeader";
import FoundationDetailsCard from "@/components/createCourse/foundation/FoundationDetailsCard";
import PricingCard from "@/components/createCourse/foundation/PricingCard";
import ThumbnailCard from "@/components/createCourse/foundation/ThumbnailCard";
import {
  courseFoundationDefaultValues,
  courseFoundationSchema,
  type CourseFoundationFormData,
} from "@/components/createCourse/foundation/schema";
import { foundationStyles as styles } from "@/components/createCourse/foundation/styles";
import LoadingView from "@/components/ui/LoadingView";
import { useCategories } from "@/hooks/category/useCategories";
import { useCourseFoundation } from "@/hooks/createCourse/useCourseFoundation";
import { useSaveCourseFoundation } from "@/hooks/createCourse/useSaveCourseFoundation";

export default function CreateCourseScreen() {
  const router = useRouter();
  const { courseId: courseIdParam } = useLocalSearchParams<{ courseId?: string }>();
  const courseId = Array.isArray(courseIdParam) ? courseIdParam[0] : courseIdParam;
  const isEditing = Boolean(courseId);

  const { mutateAsync, isPending } = useSaveCourseFoundation();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const {
    data: editingCourse,
    isLoading: isLoadingCourse,
    isError: isCourseLoadError,
  } = useCourseFoundation(courseId);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFoundationFormData>({
    resolver: zodResolver(courseFoundationSchema),
    mode: "onChange",
    defaultValues: courseFoundationDefaultValues,
  });

  const thumbnail = watch("thumbnail");
  const learningPoints = watch("whatYouWillLearn");

  useEffect(() => {
    if (!editingCourse) return;

    reset({
      title: editingCourse.title,
      category: editingCourse.categoryId,
      description: editingCourse.description,
      whatYouWillLearn: editingCourse.whatYouWillLearn.length
        ? editingCourse.whatYouWillLearn
        : [""],
      price: String(editingCourse.price),
      thumbnail: editingCourse.imageUrl,
    });
  }, [editingCourse, reset]);

  const addLearningPoint = () => {
    setValue("whatYouWillLearn", [...learningPoints, ""], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const updateLearningPoint = (index: number, value: string) => {
    setValue(
      "whatYouWillLearn",
      learningPoints.map((point, pointIndex) =>
        pointIndex === index ? value : point
      ),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  const removeLearningPoint = (index: number) => {
    setValue(
      "whatYouWillLearn",
      learningPoints.filter((_, pointIndex) => pointIndex !== index),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  const onSubmit = async (data: CourseFoundationFormData) => {
    try {
      const selectedCategory = categories.find(
        (category: { id: string }) => category.id === data.category
      );

      const savedCourseId = await mutateAsync({
        courseId,
        data: {
          title: data.title,
          category: data.category,
          description: data.description,
          whatYouWillLearn: data.whatYouWillLearn
            .map((point) => point.trim())
            .filter(Boolean),
          categoryName: selectedCategory?.title || "",
          imageUrl: data.thumbnail,
          thumbnail: data.thumbnail,
          price: Number(data.price),
        },
      });

      Alert.alert(
        isEditing ? "Course updated" : "Course created",
        "Now review the curriculum and resources."
      );

      router.replace({
        pathname: "/(instructor)/create-course/curriculum/[id]" as any,
        params: { id: String(savedCourseId), mode: isEditing ? "edit" : "create" },
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
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <NavigationHeader
        title={isEditing ? "Edit Course" : "Create Course"}
        onBackPress={() => router.replace("/(instructor)/InstructorCourses")}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <CourseFoundationHeader isEditing={isEditing} />

        <FoundationDetailsCard
          control={control}
          errors={errors}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          learningPoints={learningPoints}
          onAddLearningPoint={addLearningPoint}
          onUpdateLearningPoint={updateLearningPoint}
          onRemoveLearningPoint={removeLearningPoint}
        />

        <PricingCard control={control} errors={errors} />

        <ThumbnailCard
          thumbnail={thumbnail}
          error={errors.thumbnail?.message}
          onUploaded={(url) => setValue("thumbnail", url, { shouldValidate: true })}
        />

        <View style={styles.footer}>
          <View style={styles.buttonWrapper}>
            <Button
              title={
                isPending
                  ? "Saving..."
                  : isEditing
                    ? "Update & Continue"
                    : "Save & Continue"
              }
              onPress={handleSubmit(onSubmit)}
              color="#5624D0"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
