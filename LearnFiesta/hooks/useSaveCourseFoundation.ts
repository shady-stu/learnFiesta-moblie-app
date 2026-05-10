import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCourse,
  updateCourseFoundation,
} from "@/api/services/courseService";
import type { CreateCourseDTO } from "@/types/course";

type SaveCourseFoundationInput = {
  courseId?: string;
  data: CreateCourseDTO;
};

export const useSaveCourseFoundation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, data }: SaveCourseFoundationInput) =>
      courseId ? updateCourseFoundation(courseId, data) : createCourse(data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["courses"] });
      void queryClient.invalidateQueries({ queryKey: ["recommendedCourses"] });
      void queryClient.invalidateQueries({ queryKey: ["instructors"] });

      if (variables.courseId) {
        void queryClient.invalidateQueries({
          queryKey: ["courseFoundation", variables.courseId],
        });
      }
    },
  });
};
