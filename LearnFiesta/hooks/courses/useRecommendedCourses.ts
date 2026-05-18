
import { useEffect, useState } from 'react';
import { subscribeToRecommendedCourses } from '@/api/services/courses/courseService';
import type { Course } from '@/types/course';

export function useRecommendedCourses(limitCount = 10) {
  const [data, setData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = subscribeToRecommendedCourses(
      (courses) => {
        setData(courses);
        setError(null);
        setIsLoading(false);
      },
      (subscriptionError) => {
        setError(subscriptionError);
        setIsLoading(false);
      },
      limitCount
    );

    return unsubscribe;
  }, [limitCount]);

  return {
    data,
    isLoading,
    error,
    isError: Boolean(error),
  };
}
