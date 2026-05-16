import { Alert } from "react-native";
import type { Router } from "expo-router";
import type { CourseFoundationFormData } from "@/components/createCourse/foundation/schema";
import { useSaveCourseFoundation } from "@/hooks/createCourse/useSaveCourseFoundation";

type Category = {
  id: string;
  title?: string;
};

type Props = {
  categories: Category[];
  clearDraft: () => Promise<void>;
  courseId?: string;
  isEditing: boolean;
  router: Router;
};

export function useSubmitCourseFoundation({
  categories,
  clearDraft,
  courseId,
  isEditing,
  router,
}: Props) {
  const { mutateAsync, isPending } = useSaveCourseFoundation();

  // This function is called only after React Hook Form + Zod validation succeeds.
  const submitCourseFoundation = async (data: CourseFoundationFormData) => {
    try {
      // Find the readable category name because Firebase stores both id and display name.
      const selectedCategory = categories.find(
        (category) => category.id === data.category
      );

      // Save the basic course info first, then continue to the curriculum step.
      const savedCourseId = await mutateAsync({
        courseId,
        data: {
          title: data.title,
          category: data.category,
          description: data.description,
          // Remove spaces and ignore empty points before saving to Firebase.
          whatYouWillLearn: data.whatYouWillLearn
            .map((point) => point.trim())
            .filter(Boolean),
          categoryName: selectedCategory?.title || "",
          imageUrl: data.thumbnail,
          thumbnail: data.thumbnail,
          price: Number(data.price),
        },
      });

      // Drafts are only for new courses. Once the course exists, we clear the local draft.
      if (!isEditing) {
        await clearDraft();
      }

      // After step 1, the instructor continues to sections, lessons, and resources.
      Alert.alert(
        isEditing ? "Course updated" : "Course created",
        "Now review the curriculum and resources."
      );

      router.replace({
        pathname: "/(instructor)/create-course/curriculum/[id]" as any,
        params: { id: String(savedCourseId), mode: isEditing ? "edit" : "create" },
      });
    } catch {
      // Keep the error message simple for the user.
      Alert.alert(
        isEditing ? "Update failed" : "Create failed",
        isEditing ? "Failed to update course" : "Failed to create course"
      );
    }
  };

  return { isPending, submitCourseFoundation };
}
