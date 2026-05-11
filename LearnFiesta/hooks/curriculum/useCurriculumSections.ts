import { useEffect, useMemo, useState } from "react";
import {
  listenToCourseSections,
  type CurriculumSection,
} from "@/api/services/curriculumService";

export function useCurriculumSections(courseId?: string) {
  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setError("Missing course id.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = listenToCourseSections(
      courseId,
      (nextSections) => {
        setSections(nextSections);
        setLoading(false);
      },
      (subscriptionError) => {
        setError(subscriptionError.message || "Failed to load curriculum.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [courseId]);

  const totalLessons = useMemo(
    () => sections.reduce((total, section) => total + section.lessons.length, 0),
    [sections]
  );

  const totalMinutes = useMemo(
    () =>
      sections.reduce(
        (total, section) =>
          total +
          section.lessons.reduce(
            (sectionTotal, lesson) => sectionTotal + lesson.durationMinutes,
            0
          ),
        0
      ),
    [sections]
  );

  return {
    sections,
    loading,
    error,
    totalLessons,
    totalMinutes,
  };
}
