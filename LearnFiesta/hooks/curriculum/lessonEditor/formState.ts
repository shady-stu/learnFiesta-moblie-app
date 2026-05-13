import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFormState, useWatch } from "react-hook-form";
import type { CurriculumLesson } from "@/api/services/curriculumService";
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

const lessonTextFields = [
  "title",
  "durationMinutes",
  "description",
  "contentUrl",
  "keyConceptsText",
] as const;

export function useLessonEditorFormState() {
  const [lessonEditor, setLessonEditor] = useState<LessonEditorState>(null);
  const lessonFormController = useForm<LessonFormState>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: emptyLessonForm(),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const lessonForm = useWatch({
    control: lessonFormController.control,
    defaultValue: emptyLessonForm(),
  }) as LessonFormState;

  const { errors } = useFormState({
    control: lessonFormController.control,
  });

  const openLessonEditor = (sectionId: string, lesson?: CurriculumLesson) => {
    setLessonEditor({ sectionId, lesson });
    lessonFormController.reset(emptyLessonForm(lesson));
  };

  const closeLessonEditor = () => {
    setLessonEditor(null);
    lessonFormController.reset(emptyLessonForm());
  };

  const saveLessonField = (
    field: (typeof lessonTextFields)[number],
    value: string
  ) => {
    lessonFormController.setValue(field, value, setValueOptions);
    lessonFormController.trigger(field);
  };

  const saveResources = (resources: ResourceFormState[]) => {
    lessonFormController.setValue("resources", resources, setValueOptions);
  };

  const saveQa = (qa: LessonQaItem[]) => {
    lessonFormController.setValue("qa", qa, setValueOptions);
  };

  const setLessonField = (field: string, value: string) => {
    if (field === "type") {
      lessonFormController.setValue("type", value as LessonFormState["type"], setValueOptions);
      lessonFormController.trigger("type");
      return;
    }

    const textField = lessonTextFields.find((item) => item === field);
    if (textField) saveLessonField(textField, value);
  };

  const setResourceField = (index: number, field: string, value: string) => {
    const resources = lessonFormController.getValues("resources");
    saveResources(
      resources.map((resource, resourceIndex) =>
        resourceIndex === index ? { ...resource, [field]: value } : resource
      )
    );
    lessonFormController.trigger(`resources.${index}`);
  };

  const addResourceRow = () => {
    const resources = lessonFormController.getValues("resources");
    saveResources([...resources, { title: "", type: "pdf", url: "" }]);
  };

  const removeResourceRow = (index: number) => {
    const resources = lessonFormController.getValues("resources");
    saveResources(resources.filter((_, resourceIndex) => resourceIndex !== index));
  };

  const setQaField = (index: number, field: "question" | "answer", value: string) => {
    const qa = lessonFormController.getValues("qa");
    saveQa(
      qa.map((item, qaIndex) =>
        qaIndex === index ? { ...item, [field]: value } : item
      )
    );
    lessonFormController.trigger(`qa.${index}`);
  };

  const addQaRow = () => {
    const qa = lessonFormController.getValues("qa");
    saveQa([...qa, { question: "", answer: "" }]);
  };

  const removeQaRow = (index: number) => {
    const qa = lessonFormController.getValues("qa");
    saveQa(qa.filter((_, qaIndex) => qaIndex !== index));
  };

  return {
    lessonEditor,
    lessonForm,
    errors,
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
