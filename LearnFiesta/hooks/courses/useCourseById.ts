import { useQuery } from "@tanstack/react-query";
import { fetchCourseById } from "@/api/services/courses/fetchCourseById";

export const useCourseById = (id: string) => {
    return useQuery({
        queryKey: ["course", id],
        queryFn: () => fetchCourseById(id),
        enabled: !!id,
    });
};