import { useEffect, useState } from 'react';
import { subscribeToCoursesByCategory } from '@/api/services/courses/courseService';
import type { Course } from '@/types/course';

export const useCoursesByCategory = (categoryId: string) => {
  const [data, setData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(categoryId));
  const [isRefetching, setIsRefetching] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = subscribeToCoursesByCategory(
      categoryId,
      (courses) => {
        setData(courses);
        setError(null);
        setIsLoading(false);
        setIsRefetching(false);
      },
      (subscriptionError) => {
        setError(subscriptionError);
        setIsLoading(false);
        setIsRefetching(false);
      }
    );

    return unsubscribe;
  }, [categoryId, reloadKey]);

  const refetch = async () => {
    setIsRefetching(true);
    setReloadKey((current) => current + 1);
  };

  return {
    data,
    isLoading,
    isRefetching,
    error,
    isError: Boolean(error),
    refetch,
  };
};
