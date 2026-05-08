import { useLocalSearchParams } from 'expo-router';
import { useCoursesByCategory } from '@/hooks/useCoursesByCategory';

export function useCategoryCoursesScreen() {
  const { id, title } = useLocalSearchParams<{ id?: string; title?: string }>();

  const categoryId = id?.trim() ?? '';
  const screenTitle = title || 'Courses';

  const {
    data: courses = [],
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useCoursesByCategory(categoryId);

  const handleRefetch = () => void refetch();

  return {
    categoryId,
    screenTitle,
    courses,
    isLoading,
    isError,
    isRefetching,
    handleRefetch,
  };
}