import { useCurriculumPublishing } from "@/hooks/curriculum/useCurriculumPublishing";
import { useCurriculumSections } from "@/hooks/curriculum/useCurriculumSections";
import { useLessonEditor } from "@/hooks/curriculum/useLessonEditor";
import { useSectionActions } from "@/hooks/curriculum/useSectionActions";
export {
  emptyLessonForm,
  type LessonEditorState,
  type LessonFormState,
  type ResourceFormState,
} from "@/types/curriculum";

// Main coordinator hook for the curriculum screen.
// It combines smaller hooks while keeping each responsibility separated.
export function useCourseCurriculum(courseId?: string) {
  // Realtime sections and calculated totals.
  const sectionsState = useCurriculumSections(courseId);

  // Add, edit, and delete section actions.
  const sectionActions = useSectionActions(courseId, sectionsState.sections.length);

  // Lesson modal state, form fields, and lesson mutations.
  const lessonEditor = useLessonEditor(courseId);

  // Finish and publish workflow.
  const publishing = useCurriculumPublishing(courseId);

  // One saving flag for the screen from all child hooks.
  const saving = sectionActions.saving || lessonEditor.saving || publishing.saving;

  return {
    sectionsState,
    sectionActions,
    lessonEditorState: lessonEditor,
    publishing,
    saving,
  };
}
