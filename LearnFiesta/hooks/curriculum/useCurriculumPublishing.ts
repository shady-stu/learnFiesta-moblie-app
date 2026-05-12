import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  publishCourseCurriculum,
  type CurriculumMetrics,
} from "@/api/services/curriculumService";

export function useCurriculumPublishing(courseId?: string) {
  const [saving, setSaving] = useState(false); // kept for stable API shape during migration
  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!courseId) return undefined;
      return publishCourseCurriculum(courseId);
    },
  });

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
