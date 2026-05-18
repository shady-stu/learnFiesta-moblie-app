import { useQuery } from "@tanstack/react-query";
import { fetchLessons } from "@/api/services/lesson/lessonsService";

export const useLessons = (courseId: string) => {
    return useQuery({
        queryKey: ["lessons", courseId],
        queryFn: () => fetchLessons(courseId),
        enabled: !!courseId,
    });
};