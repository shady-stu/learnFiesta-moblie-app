import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CourseFoundationFormData } from "@/components/createCourse/foundation/schema";

const COURSE_FOUNDATION_DRAFT_KEY = "create-course-foundation-draft";
const COURSE_FOUNDATION_DRAFT_QUERY_KEY = ["courseFoundationDraft"];

// Reads the saved draft from the device storage.
// This helps the instructor avoid losing typed data while creating a new course.
const loadCourseFoundationDraft = async () => {
  const savedDraft = await AsyncStorage.getItem(COURSE_FOUNDATION_DRAFT_KEY);
  if (!savedDraft) return null;

  return JSON.parse(savedDraft) as CourseFoundationFormData;
};

// Saves the current form values locally, not in Firebase yet.
// Firebase is updated only when the instructor presses Save & Continue.
const saveCourseFoundationDraft = async (draft: CourseFoundationFormData) => {
  await AsyncStorage.setItem(COURSE_FOUNDATION_DRAFT_KEY, JSON.stringify(draft));
  return draft;
};

// Removes the draft after the new course is successfully created.
const clearCourseFoundationDraft = async () => {
  await AsyncStorage.removeItem(COURSE_FOUNDATION_DRAFT_KEY);
};

export function useCourseFoundationDraft(enabled: boolean) {
  const queryClient = useQueryClient();

  // React Query keeps the draft loading state simple and reusable.
  const draftQuery = useQuery({
    queryKey: COURSE_FOUNDATION_DRAFT_QUERY_KEY,
    queryFn: loadCourseFoundationDraft,
    enabled,
  });

  // Fire-and-forget save: the form should not freeze while typing.
  const saveDraft = useCallback((draft: CourseFoundationFormData) => {
    void saveCourseFoundationDraft(draft);
  }, []);

  // Mutation is used here because clearing changes stored data.
  const clearDraft = useMutation({
    mutationFn: clearCourseFoundationDraft,
    onSuccess: () => {
      queryClient.setQueryData(COURSE_FOUNDATION_DRAFT_QUERY_KEY, null);
    },
  });

  return {
    clearDraft: clearDraft.mutateAsync,
    draft: draftQuery.data,
    isDraftLoading: enabled && draftQuery.isLoading,
    saveDraft,
  };
}
