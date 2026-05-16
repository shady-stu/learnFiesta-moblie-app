import { useLessonEditorFormState } from "./lessonEditor/formState";
import { useLessonEditorMutations } from "./lessonEditor/mutations";

export function useLessonEditor(courseId?: string) {
  const formState = useLessonEditorFormState();
  const mutations = useLessonEditorMutations(
    courseId,
    formState.lessonEditor,
    formState.closeLessonEditor
  );

  const saveLesson = async () => {
    await formState.lessonFormController.handleSubmit(
      async (values) => {
        await mutations.saveLesson(values);
      },
      async (errors) => {
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
