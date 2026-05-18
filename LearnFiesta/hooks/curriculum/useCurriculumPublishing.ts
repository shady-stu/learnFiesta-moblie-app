import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  publishCourseCurriculum,
  type CurriculumMetrics,
} from "@/api/services/curriculum/curriculumService";

export function useCurriculumPublishing(courseId?: string) {
  // Local saving keeps the returned API stable while React Query handles mutation state.
  const [saving, setSaving] = useState(false); // kept for stable API shape during migration

  // The service validates curriculum rules and then marks the course as published.
  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!courseId) return undefined;
      return publishCourseCurriculum(courseId);
    },
  });

  // Public function called by the footer button.
  const publishCourse = async (): Promise<CurriculumMetrics | undefined> => {
    setSaving(true);
    try {
      return await publishMutation.mutateAsync();
    } finally {
      setSaving(false);
    }
  };

  return {
    saving: saving || publishMutation.isPending,
    publishCourse,
  };
}
