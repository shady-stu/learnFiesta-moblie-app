import { useQuery } from '@tanstack/react-query';
import { getCoursesByCategory } from '@/api/services/home/getCoursesByCategory ';

export const useCoursesByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['courses', categoryId],
    queryFn: () => getCoursesByCategory(categoryId),
    enabled: !!categoryId,
  });
};