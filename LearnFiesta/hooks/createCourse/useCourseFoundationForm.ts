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

  // courseId exists only when the instructor opens the form to edit a course.
  const { courseId: courseIdParam } = useLocalSearchParams<{ courseId?: string }>();
  const courseId = Array.isArray(courseIdParam) ? courseIdParam[0] : courseIdParam;
  const isEditing = Boolean(courseId);

  // These two queries prepare the data needed by the form.
  // Categories fill the select input, and editingCourse fills the form in edit mode.
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const {
    data: editingCourse,
    isLoading: isLoadingCourse,
    isError: isCourseLoadError,
  } = useCourseFoundation(courseId);

  // Main React Hook Form setup.
  // Zod handles validation, and mode "all" shows errors while the user types.
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

  // Draft sync is used only for new courses, not for editing existing courses.
  const { clearDraft } = useCourseFoundationDraftSync({
    isEditing,
    reset,
    watch,
  });

  // Keeps add/update/remove logic for learning points outside the screen component.
  const learningPointActions = useLearningPointsField({
    learningPoints,
    setValue,
  });

  // Handles the Firebase save and navigation to the curriculum step.
  const { isPending, submitCourseFoundation } = useSubmitCourseFoundation({
    categories,
    clearDraft,
    courseId,
    isEditing,
    router,
  });

  // When editing, copy Firebase values into the form.
  // This runs after the course data finishes loading.
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
    // The screen receives one clean object from this hook instead of managing many hooks itself.
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
