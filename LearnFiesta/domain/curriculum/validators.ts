import type { CurriculumLessonInput } from "@/api/services/curriculum/curriculumService";
import type { LessonFormState } from "@/types/curriculum";

export const buildLessonPayload = (
  lessonForm: LessonFormState
): CurriculumLessonInput => {
  // We still validate in react-hook-form with zodResolver.
  // This function only converts form data into the API payload shape.
  const durationMinutes = Number(lessonForm.durationMinutes);

  const resources = lessonForm.resources
    .map((resource) => ({
      ...resource,
      title: resource.title.trim(),
      url: resource.url.trim(),
    }))
    .filter((resource) => resource.title || resource.url);

  const keyConcepts = lessonForm.keyConceptsText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const qa = lessonForm.qa
    .map((item) => ({
      id: item.id,
      question: item.question.trim(),
      answer: item.answer.trim(),
    }))
    .filter((item) => item.question || item.answer);

  return {
    title: lessonForm.title.trim(),
    type: lessonForm.type,
    durationMinutes,
    description: lessonForm.description.trim(),
    contentUrl: lessonForm.contentUrl.trim(),
    keyConcepts,
    qa,
    resources,
  };
};
