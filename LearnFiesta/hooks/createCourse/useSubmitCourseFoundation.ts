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

  const submitCourseFoundation = async (data: CourseFoundationFormData) => {
    try {
      const selectedCategory = categories.find(
        (category) => category.id === data.category
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

      if (!isEditing) {
        await clearDraft();
      }

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

  return { isPending, submitCourseFoundation };
}
