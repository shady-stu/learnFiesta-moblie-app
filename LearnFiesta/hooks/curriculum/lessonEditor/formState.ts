import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFormState, useWatch } from "react-hook-form";
import type { CurriculumLesson } from "@/api/services/curriculumService";
import { lessonFormSchema } from "@/domain/curriculum/schemas";
import {
  emptyLessonForm,
  type LessonEditorState,
  type LessonFormState,
} from "@/types/curriculum";

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
  shouldTouch: true,
} as const;

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

  const setLessonField = (field: string, value: string) => {
    if (field === "title") {
      lessonFormController.setValue("title", value, setValueOptions);
      lessonFormController.trigger("title");
      return;
    }

    if (field === "type") {
      lessonFormController.setValue("type", value as LessonFormState["type"], setValueOptions);
      lessonFormController.trigger("type");
      return;
    }

    if (field === "durationMinutes") {
      lessonFormController.setValue("durationMinutes", value, setValueOptions);
      lessonFormController.trigger("durationMinutes");
      return;
    }

    if (field === "description") {
      lessonFormController.setValue("description", value, setValueOptions);
      lessonFormController.trigger("description");
      return;
    }

    if (field === "contentUrl") {
      lessonFormController.setValue("contentUrl", value, setValueOptions);
      lessonFormController.trigger("contentUrl");
      return;
    }

    if (field === "keyConceptsText") {
      lessonFormController.setValue("keyConceptsText", value, setValueOptions);
      lessonFormController.trigger("keyConceptsText");
    }
  };

  // Update one resource row field by index
  const setResourceField = (index: number, field: string, value: string) => {
    const resources = lessonFormController.getValues("resources");
    const updated = resources.map((resource, resourceIndex) => {
      if (resourceIndex !== index) return resource;
      return { ...resource, [field]: value };
    });
    lessonFormController.setValue("resources", updated, setValueOptions);
    lessonFormController.trigger(`resources.${index}`);
  };

  // Add a new empty resource row
  const addResourceRow = () => {
    const resources = lessonFormController.getValues("resources");
    lessonFormController.setValue(
      "resources",
      [...resources, { title: "", type: "pdf", url: "" }],
      setValueOptions
    );
  };

  // Remove resource row by index
  const removeResourceRow = (index: number) => {
    const resources = lessonFormController.getValues("resources");
    lessonFormController.setValue(
      "resources",
      resources.filter((_, resourceIndex) => resourceIndex !== index),
      setValueOptions
    );
  };

  // Update one Q&A row field by index
  const setQaField = (index: number, field: "question" | "answer", value: string) => {
    const qa = lessonFormController.getValues("qa");
    const updated = qa.map((item, qaIndex) => {
      if (qaIndex !== index) return item;
      return { ...item, [field]: value };
    });
    lessonFormController.setValue("qa", updated, setValueOptions);
    lessonFormController.trigger(`qa.${index}`);
  };

  // Add a new empty Q&A row
  const addQaRow = () => {
    const qa = lessonFormController.getValues("qa");
    lessonFormController.setValue(
      "qa",
      [...qa, { question: "", answer: "" }],
      setValueOptions
    );
  };

  // Remove Q&A row by index
  const removeQaRow = (index: number) => {
    const qa = lessonFormController.getValues("qa");
    lessonFormController.setValue(
      "qa",
      qa.filter((_, qaIndex) => qaIndex !== index),
      setValueOptions
    );
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
