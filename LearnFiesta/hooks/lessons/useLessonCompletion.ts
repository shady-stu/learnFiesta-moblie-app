import { useEffect, useState } from "react";
import {
  listenToLessonCompletion,
  markLessonAsCompleted,
} from "@/api/services/enrollments/enrollmentService";

type Params = {
  courseId?: string;
  lessonId?: string;
  totalLessons?: number;
};

export function useLessonCompletion({
  courseId,
  lessonId,
  totalLessons = 0,
}: Params) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !lessonId) return;

    const unsubscribe = listenToLessonCompletion(
      courseId,
      lessonId,
      setIsCompleted,
      (err) => setError(err.message)
    );

    return unsubscribe;
  }, [courseId, lessonId]);

  const completeLesson = async () => {
    if (!courseId || !lessonId) return;

    setSaving(true);
    setError(null);

    try {
      await markLessonAsCompleted(courseId, lessonId, totalLessons);
      setIsCompleted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to complete lesson";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return {
    isCompleted,
    saving,
    error,
    completeLesson,
  };
}
