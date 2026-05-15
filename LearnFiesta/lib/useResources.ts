import {useQuery} from "@tanstack/react-query";
import {fetchResources} from "@/api/services/resourceService";

export const useResources = (courseId: string) => {
    return useQuery({
        queryKey: ["resources", courseId],
        queryFn: () => fetchResources(courseId),
        enabled: !!courseId,
    });
};