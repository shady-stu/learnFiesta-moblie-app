import { useEffect, useMemo, useState } from "react";
import {
  listenToCourseSections,
  type CurriculumSection,
} from "@/api/services/curriculum/curriculumService";

export function useCurriculumSections(courseId?: string) {
  // This hook only reads curriculum data: sections, loading, errors, and totals.
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

    // Firestore listener keeps the curriculum screen updated in real time.
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

  // Derived value used by the header and publish summary.
  const totalLessons = useMemo(
    () => sections.reduce((total, section) => total + section.lessons.length, 0),
    [sections]
  );

  // Derived value used to show total curriculum duration.
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
