import { useLocalSearchParams } from 'expo-router';
import { useCoursesByCategory } from '@/hooks/category/useCoursesByCategory';
import { useCategories } from '@/hooks/category/useCategories';

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
const { data: options = [] } = useCategories();
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