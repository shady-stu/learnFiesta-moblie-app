import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@/api/services/courseService";

export const useCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,
    });
};