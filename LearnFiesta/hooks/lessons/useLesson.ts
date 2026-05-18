import { useEffect, useState } from "react";
import {
  subscribeToLearningLesson,
  type LearningLesson,
} from "@/api/services/lesson/lessonService";

type UseLessonParams = {
  id?: string;
  courseId?: string;
};

export function useLesson({ id, courseId }: UseLessonParams) {
  const [lesson, setLesson] = useState<LearningLesson | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLesson(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = subscribeToLearningLesson(
      { id, courseId },
      (nextLesson) => {
        setLesson(nextLesson);
        setError(null);
        setIsLoading(false);
      },
      (subscriptionError) => {
        setError(subscriptionError);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [id, courseId]);

  return {
    lesson,
    isLoading,
    error,
    isError: Boolean(error),
  };
}
