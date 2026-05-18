import { getUserEnrollments } from "@/api/services/enrollments/enrollmentService";
import { useQuery } from "@tanstack/react-query";

export const useCourse = (
  enabled: boolean = true,
  refreshCount: number = 0
) => {
  return useQuery({
    queryKey: ["enrollments", refreshCount],
    queryFn: getUserEnrollments,
    enabled,
  });
};
