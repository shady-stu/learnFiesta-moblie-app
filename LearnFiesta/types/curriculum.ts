import type { FieldErrors } from "react-hook-form";
import type {
  CurriculumLesson,
  LessonType,
  ResourceType,
} from "@/api/services/curriculumService";

export type ResourceFormState = {
  id?: string;
  title: string;
  type: ResourceType;
  url: string;
};

export type LessonQaItem = {
  id?: string;
  question: string;
  answer: string;
};

export type LessonFormState = {
  title: string;
  type: LessonType;
  durationMinutes: string;
  description: string;
  contentUrl: string;
  keyConceptsText: string;
  qa: LessonQaItem[];
  resources: ResourceFormState[];
};

export type LessonEditorState = {
  sectionId: string;
  lesson?: CurriculumLesson;
} | null;

export const emptyLessonForm = (lesson?: CurriculumLesson): LessonFormState => ({
  title: lesson?.title ?? "",
  type: lesson?.type ?? "video",
  durationMinutes: lesson ? String(lesson.durationMinutes) : "",
  description: lesson?.description ?? "",
  contentUrl: lesson?.contentUrl ?? "",
  keyConceptsText: (lesson?.keyConcepts ?? []).join("\n"),
  qa:
    lesson?.qa.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    })) ?? [],
  resources:
    lesson?.resources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      type: resource.type,
      url: resource.url,
    })) ?? [],
});

export type LessonFormModalProps = {
  editor: LessonEditorState;
  form: LessonFormState;
  errors?: FieldErrors<LessonFormState>;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onAddResource: () => void;
  onRemoveResource: (index: number) => void;
  onChangeLessonField: (field: string, value: string) => void;
  onChangeResourceField: (index: number, field: string, value: string) => void;
  onAddQa: () => void;
  onRemoveQa: (index: number) => void;
  onChangeQaField: (
    index: number,
    field: "question" | "answer",
    value: string
  ) => void;
};
