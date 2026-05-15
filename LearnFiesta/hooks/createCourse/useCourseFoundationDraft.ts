import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CourseFoundationFormData } from "@/components/createCourse/foundation/schema";

const COURSE_FOUNDATION_DRAFT_KEY = "create-course-foundation-draft";
const COURSE_FOUNDATION_DRAFT_QUERY_KEY = ["courseFoundationDraft"];

const loadCourseFoundationDraft = async () => {
  const savedDraft = await AsyncStorage.getItem(COURSE_FOUNDATION_DRAFT_KEY);
  if (!savedDraft) return null;

  return JSON.parse(savedDraft) as CourseFoundationFormData;
};

const saveCourseFoundationDraft = async (draft: CourseFoundationFormData) => {
  await AsyncStorage.setItem(COURSE_FOUNDATION_DRAFT_KEY, JSON.stringify(draft));
  return draft;
};

const clearCourseFoundationDraft = async () => {
  await AsyncStorage.removeItem(COURSE_FOUNDATION_DRAFT_KEY);
};

export function useCourseFoundationDraft(enabled: boolean) {
  const queryClient = useQueryClient();

  const draftQuery = useQuery({
    queryKey: COURSE_FOUNDATION_DRAFT_QUERY_KEY,
    queryFn: loadCourseFoundationDraft,
    enabled,
  });

  const saveDraft = useCallback((draft: CourseFoundationFormData) => {
    void saveCourseFoundationDraft(draft);
  }, []);

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
