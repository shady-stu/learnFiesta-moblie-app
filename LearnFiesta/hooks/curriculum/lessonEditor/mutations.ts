import { useMutation } from "@tanstack/react-query";
import {
  createCurriculumLesson,
  deleteCurriculumLesson,
  updateCurriculumLesson,
} from "@/api/services/curriculumService";
import { buildLessonPayload } from "@/domain/curriculum/validators";
import type { LessonEditorState, LessonFormState } from "@/types/curriculum";

export function useLessonEditorMutations(
  courseId: string | undefined,
  lessonEditor: LessonEditorState,
  onSaved: () => void
) {
  // One mutation handles both create and update.
  // If lessonEditor.lesson exists, we update. Otherwise, we create.
  const saveMutation = useMutation({
    mutationFn: async (values: LessonFormState) => {
      if (!courseId || !lessonEditor) return;
      // Build the payload in one place before sending to Firebase.
      // This keeps form cleanup and type conversion outside the UI.
      const payload = buildLessonPayload(values);

      if (lessonEditor.lesson) {
        await updateCurriculumLesson(
          courseId,
          lessonEditor.sectionId,
          lessonEditor.lesson.id,
          payload
        );
        return;
      }

      await createCurriculumLesson(courseId, lessonEditor.sectionId, payload);
    },
  });

  // Delete is separate because it only needs the section id and lesson id.
  const deleteMutation = useMutation({
    mutationFn: async ({ sectionId, lessonId }: { sectionId: string; lessonId: string }) => {
      if (!courseId) return;
      await deleteCurriculumLesson(courseId, sectionId, lessonId);
    },
  });

  // Save then close the modal through the callback from useLessonEditor.
  const saveLesson = async (values: LessonFormState) => {
    await saveMutation.mutateAsync(values);
    onSaved();
  };

  // Public delete function used by the section lesson cards.
  const removeLesson = async (sectionId: string, lessonId: string) => {
    await deleteMutation.mutateAsync({ sectionId, lessonId });
  };

  return {
    saveLesson,
    removeLesson,
    saving: saveMutation.isPending || deleteMutation.isPending,
  };
}
