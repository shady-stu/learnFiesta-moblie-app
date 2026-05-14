import type { Enrollment } from "@/types/Enrollment";

export function getContinueLessonParams(enrollment: Enrollment) {
  const completedLessons = enrollment.completedLessonIds ?? [];
  const lastCompletedLessonId = completedLessons[completedLessons.length - 1];

  return {
    id: enrollment.nextLessonId || lastCompletedLessonId || enrollment.courseId,
    courseId: enrollment.courseId,
  };
}

export function chooseContinueCourse(enrollments: Enrollment[]) {
  return enrollments
    .filter((item) => item.progress > 0 && item.progress < 100)
    .sort((a, b) => {
      if (b.progress !== a.progress) return b.progress - a.progress;
      if (b.lessonsDone !== a.lessonsDone) return b.lessonsDone - a.lessonsDone;
      return a.title.localeCompare(b.title);
    })[0];
}
