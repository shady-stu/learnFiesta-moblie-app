import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  courseFoundationDefaultValues,
  courseFoundationSchema,
  type CourseFoundationFormData,
} from "@/components/createCourse/foundation/schema";
import { useCategories } from "@/hooks/category/useCategories";
import { useCourseFoundation } from "@/hooks/createCourse/useCourseFoundation";
import { useCourseFoundationDraftSync } from "@/hooks/createCourse/useCourseFoundationDraftSync";
import { useLearningPointsField } from "@/hooks/createCourse/useLearningPointsField";
import { useSubmitCourseFoundation } from "@/hooks/createCourse/useSubmitCourseFoundation";

export function useCourseFoundationForm() {
  const router = useRouter();
  const { courseId: courseIdParam } = useLocalSearchParams<{ courseId?: string }>();
  const courseId = Array.isArray(courseIdParam) ? courseIdParam[0] : courseIdParam;
  const isEditing = Boolean(courseId);

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
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: courseFoundationDefaultValues,
  });

  const thumbnail = watch("thumbnail");
  const learningPoints = watch("whatYouWillLearn");

  const { clearDraft } = useCourseFoundationDraftSync({
    isEditing,
    reset,
    watch,
  });

  const learningPointActions = useLearningPointsField({
    learningPoints,
    setValue,
  });

  const { isPending, submitCourseFoundation } = useSubmitCourseFoundation({
    categories,
    clearDraft,
    courseId,
    isEditing,
    router,
  });

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

  return {
    ...learningPointActions,
    categories,
    control,
    errors,
    goBackToCourses: () => router.replace("/(instructor)/InstructorCourses"),
    isCourseLoadError,
    isEditing,
    isLoadingCategories,
    isLoadingCourse,
    isPending,
    learningPoints,
    submit: handleSubmit(submitCourseFoundation),
    thumbnail,
  };
}
