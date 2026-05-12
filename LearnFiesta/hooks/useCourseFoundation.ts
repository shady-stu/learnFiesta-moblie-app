import { useQuery } from "@tanstack/react-query";
import { fetchCourseFoundation } from "@/api/services/courseService";

export const useCourseFoundation = (courseId?: string) =>
  useQuery({
    queryKey: ["courseFoundation", courseId],
    queryFn: () => fetchCourseFoundation(courseId as string),
    enabled: Boolean(courseId),
  });
