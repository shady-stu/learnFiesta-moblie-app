import { useQuery } from "@tanstack/react-query";
import { fetchCourseFoundation } from "@/api/services/courses/courseService";

// Loads the basic course data only when we are editing an existing course.
// In create mode courseId is empty, so this query stays disabled.
export const useCourseFoundation = (courseId?: string) =>
  useQuery({
    queryKey: ["courseFoundation", courseId],
    queryFn: () => fetchCourseFoundation(courseId as string),
    enabled: Boolean(courseId),
  });
