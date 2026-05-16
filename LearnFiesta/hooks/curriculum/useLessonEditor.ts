import { useLessonEditorFormState } from "./lessonEditor/formState";
import { useLessonEditorMutations } from "./lessonEditor/mutations";

// Combines lesson form state with Firebase mutations.
// The screen uses this one hook instead of importing the internal pieces.
export function useLessonEditor(courseId?: string) {
  // Modal state, form values, setters, and validation errors.
  const formState = useLessonEditorFormState();

  // Create, update, and delete lesson operations.
  const mutations = useLessonEditorMutations(
    courseId,
    formState.lessonEditor,
    formState.closeLessonEditor
  );

  // Submit through React Hook Form so Zod validation runs before saving.
  const saveLesson = async () => {
    await formState.lessonFormController.handleSubmit(
      async (values) => {
        await mutations.saveLesson(values);
      },
      async (errors) => {
        // Pick the clearest validation message for the UI.
        const message =
          errors.title?.message ||
          errors.durationMinutes?.message ||
          errors.description?.message ||
          errors.resources?.root?.message ||
          "Please check lesson fields.";
        throw new Error(message);
      }
    )();
  };

  return {
    lessonEditor: formState.lessonEditor,
    control: formState.control,
    lessonForm: formState.lessonForm,
    errors: formState.errors,
    saving: mutations.saving,
    openLessonEditor: formState.openLessonEditor,
    closeLessonEditor: formState.closeLessonEditor,
    setLessonField: formState.setLessonField,
    setResourceField: formState.setResourceField,
    addResourceRow: formState.addResourceRow,
    removeResourceRow: formState.removeResourceRow,
    setQaField: formState.setQaField,
    addQaRow: formState.addQaRow,
    removeQaRow: formState.removeQaRow,
    saveLesson,
    removeLesson: mutations.removeLesson,
  };
}
