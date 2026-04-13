import { useQuery } from "@tanstack/react-query";
import { getUserInstructors } from "@/api/services/ServicebyInstructor";

export const useInstructor = () => {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: getUserInstructors,
  });
};