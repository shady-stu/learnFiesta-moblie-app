
import { useQuery } from '@tanstack/react-query';
import { fetchRecommendedCourses } from '@/api/services/home/fetchRecommendedCourses';

export function useRecommendedCourses() {
  return useQuery({
    queryKey: ['recommendedCourses'],
    queryFn: fetchRecommendedCourses,
    staleTime: 60_000,
    retry: 1,
  });
}