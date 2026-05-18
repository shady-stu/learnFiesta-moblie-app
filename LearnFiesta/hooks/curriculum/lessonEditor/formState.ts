import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFormState, useWatch } from "react-hook-form";
import type { CurriculumLesson } from "@/api/services/curriculum/curriculumService";
import { lessonFormSchema } from "@/domain/curriculum/schemas";
import {
  emptyLessonForm,
  type LessonEditorState,
  type LessonFormState,
  type LessonQaItem,
  type ResourceFormState,
} from "@/types/curriculum";

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
  shouldTouch: true,
} as const;

// These are simple lesson fields. Arrays like resources and Q&A are handled separately.
const lessonTextFields = [
  "title",
  "durationMinutes",
  "description",
  "contentUrl",
  "keyConceptsText",
] as const;

export function useLessonEditorFormState() {
  const [lessonEditor, setLessonEditor] = useState<LessonEditorState>(null);

  // React Hook Form owns the lesson form values, and Zod validates them in real time.
  const lessonFormController = useForm<LessonFormState>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: emptyLessonForm(),
    mode: "all",
    reValidateMode: "onChange",
  });

  // Live form values used by the lesson modal UI.
  const lessonForm = useWatch({
    control: lessonFormController.control,
    defaultValue: emptyLessonForm(),
  }) as LessonFormState;

  // Validation errors are read from React Hook Form instead of being managed manually.
  const { errors } = useFormState({
    control: lessonFormController.control,
  });

  // Open the modal for adding a new lesson or editing an existing one.
  const openLessonEditor = (sectionId: string, lesson?: CurriculumLesson) => {
    setLessonEditor({ sectionId, lesson });
    lessonFormController.reset(emptyLessonForm(lesson));
    setTimeout(() => {
      void lessonFormController.trigger(["title", "durationMinutes", "description"]);
    }, 0);
  };

  // Close the modal and reset values so old lesson data does not leak into the next edit.
  const closeLessonEditor = () => {
    setLessonEditor(null);
    lessonFormController.reset(emptyLessonForm());
  };

  // Update a normal text field and immediately validate it.
  const saveLessonField = (
    field: (typeof lessonTextFields)[number],
    value: string
  ) => {
    lessonFormController.setValue(field, value, setValueOptions);
    lessonFormController.trigger(field);
  };

  // Save the resources array back into the form state.
  const saveResources = (resources: ResourceFormState[]) => {
    lessonFormController.setValue("resources", resources, setValueOptions);
  };

  // Save the Q&A array back into the form state.
  const saveQa = (qa: LessonQaItem[]) => {
    lessonFormController.setValue("qa", qa, setValueOptions);
  };

  // Public setter used by the UI for basic lesson fields.
  const setLessonField = (field: string, value: string) => {
    if (field === "type") {
      lessonFormController.setValue("type", value as LessonFormState["type"], setValueOptions);
      lessonFormController.trigger("type");
      return;
    }

    const textField = lessonTextFields.find((item) => item === field);
    if (textField) saveLessonField(textField, value);
  };

  // Update one resource row while keeping all other rows unchanged.
  const setResourceField = (index: number, field: string, value: string) => {
    const resources = lessonFormController.getValues("resources");
    saveResources(
      resources.map((resource, resourceIndex) =>
        resourceIndex === index ? { ...resource, [field]: value } : resource
      )
    );
    lessonFormController.trigger(`resources.${index}`);
  };

  // Add a new empty resource row and validate it right away.
  const addResourceRow = () => {
    const resources = lessonFormController.getValues("resources");
    saveResources([...resources, { title: "", type: "pdf", url: "" }]);
    setTimeout(() => {
      void lessonFormController.trigger(`resources.${resources.length}`);
    }, 0);
  };

  // Remove one resource row by index.
  const removeResourceRow = (index: number) => {
    const resources = lessonFormController.getValues("resources");
    saveResources(resources.filter((_, resourceIndex) => resourceIndex !== index));
  };

  // Update one Q&A row while keeping the other rows unchanged.
  const setQaField = (index: number, field: "question" | "answer", value: string) => {
    const qa = lessonFormController.getValues("qa");
    saveQa(
      qa.map((item, qaIndex) =>
        qaIndex === index ? { ...item, [field]: value } : item
      )
    );
    lessonFormController.trigger(`qa.${index}`);
  };

  // Add a new empty Q&A row and validate it right away.
  const addQaRow = () => {
    const qa = lessonFormController.getValues("qa");
    saveQa([...qa, { question: "", answer: "" }]);
    setTimeout(() => {
      void lessonFormController.trigger(`qa.${qa.length}`);
    }, 0);
  };

  // Remove one Q&A row by index.
  const removeQaRow = (index: number) => {
    const qa = lessonFormController.getValues("qa");
    saveQa(qa.filter((_, qaIndex) => qaIndex !== index));
  };

  return {
    lessonEditor,
    lessonForm,
    errors,
    control: lessonFormController.control,
    lessonFormController,
    openLessonEditor,
    closeLessonEditor,
    setLessonField,
    setResourceField,
    addResourceRow,
    removeResourceRow,
    setQaField,
    addQaRow,
    removeQaRow,
  };
}
