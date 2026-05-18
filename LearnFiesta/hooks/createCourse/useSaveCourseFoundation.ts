import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCourse,
  updateCourseFoundation,
} from "@/api/services/courses/courseService";
import type { CreateCourseDTO } from "@/types/course";

type SaveCourseFoundationInput = {
  courseId?: string;
  data: CreateCourseDTO;
};

export const useSaveCourseFoundation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // If courseId exists we update; otherwise we create a new course.
    mutationFn: ({ courseId, data }: SaveCourseFoundationInput) =>
      courseId ? updateCourseFoundation(courseId, data) : createCourse(data),
    onSuccess: (savedCourseId, variables) => {
      // Refresh screens that may show this course after saving.
      void queryClient.invalidateQueries({ queryKey: ["courses"] });
      void queryClient.invalidateQueries({ queryKey: ["recommendedCourses"] });
      void queryClient.invalidateQueries({ queryKey: ["instructors"] });
      void queryClient.invalidateQueries({
        queryKey: ["course", variables.courseId || savedCourseId],
      });

      if (variables.courseId) {
        // Refresh the edit form data after updating an existing course.
        void queryClient.invalidateQueries({
          queryKey: ["courseFoundation", variables.courseId],
        });
      }
    },
  });
};
