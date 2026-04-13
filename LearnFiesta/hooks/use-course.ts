import { getUserEnrollments } from "@/api/services/ServicebyCourse";
import { useQuery } from "@tanstack/react-query";

export const useCourse = () => {

  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getUserEnrollments,
  });
}