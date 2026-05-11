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

export function useCourseCurriculum(courseId?: string) {
  const sectionsState = useCurriculumSections(courseId);
  const sectionActions = useSectionActions(courseId, sectionsState.sections.length);
  const lessonEditor = useLessonEditor(courseId);
  const publishing = useCurriculumPublishing(courseId);

  const saving = sectionActions.saving || lessonEditor.saving || publishing.saving;

  return {
    sectionsState,
    sectionActions,
    lessonEditorState: lessonEditor,
    publishing,
    saving,
  };
}
