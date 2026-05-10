import { useEffect, useMemo, useState } from "react";
import {
  createCurriculumLesson,
  createCurriculumSection,
  deleteCurriculumLesson,
  deleteCurriculumSection,
  listenToCourseSections,
  publishCourseCurriculum,
  updateCurriculumLesson,
  updateCurriculumSection,
  type CurriculumLesson,
  type CurriculumLessonInput,
  type CurriculumMetrics,
  type CurriculumSection,
  type LessonType,
  type ResourceType,
} from "@/api/services/curriculumService";

export type ResourceFormState = {
  id?: string;
  title: string;
  type: ResourceType;
  url: string;
};

export type LessonFormState = {
  title: string;
  type: LessonType;
  durationMinutes: string;
  description: string;
  contentUrl: string;
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
  resources:
    lesson?.resources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      type: resource.type,
      url: resource.url,
    })) ?? [],
});

const buildLessonPayload = (lessonForm: LessonFormState): CurriculumLessonInput => {
  const title = lessonForm.title.trim();
  const durationMinutes = Number(lessonForm.durationMinutes);

  if (title.length < 3) {
    throw new Error("Use at least 3 characters for the lesson title.");
  }

  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
    throw new Error("Enter the lesson duration in minutes.");
  }

  const resources = lessonForm.resources
    .map((resource) => ({
      ...resource,
      title: resource.title.trim(),
      url: resource.url.trim(),
    }))
    .filter((resource) => resource.title || resource.url);

  const incompleteResource = resources.find((resource) => !resource.title || !resource.url);
  if (incompleteResource) {
    throw new Error("Each resource needs both a title and a URL.");
  }

  return {
    title,
    type: lessonForm.type,
    durationMinutes,
    description: lessonForm.description.trim(),
    contentUrl: lessonForm.contentUrl.trim(),
    resources,
  };
};

export function useCourseCurriculum(courseId?: string) {
  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sectionModalVisible, setSectionModalVisible] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [editingSection, setEditingSection] = useState<CurriculumSection | null>(null);

  const [lessonEditor, setLessonEditor] = useState<LessonEditorState>(null);
  const [lessonForm, setLessonForm] = useState<LessonFormState>(emptyLessonForm());

  const totalLessons = useMemo(
    () => sections.reduce((total, section) => total + section.lessons.length, 0),
    [sections]
  );

  const totalMinutes = useMemo(
    () =>
      sections.reduce(
        (total, section) =>
          total +
          section.lessons.reduce(
            (sectionTotal, lesson) => sectionTotal + lesson.durationMinutes,
            0
          ),
        0
      ),
    [sections]
  );

  useEffect(() => {
    if (!courseId) {
      setError("Missing course id.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = listenToCourseSections(
      courseId,
      (nextSections) => {
        setSections(nextSections);
        setLoading(false);
      },
      (subscriptionError) => {
        setError(subscriptionError.message || "Failed to load curriculum.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [courseId]);

  const openAddSection = () => {
    setEditingSection(null);
    setSectionTitle("");
    setSectionModalVisible(true);
  };

  const openEditSection = (section: CurriculumSection) => {
    setEditingSection(section);
    setSectionTitle(section.title);
    setSectionModalVisible(true);
  };

  const closeSectionModal = () => {
    setSectionModalVisible(false);
    setEditingSection(null);
    setSectionTitle("");
  };

  const saveSection = async () => {
    if (!courseId) return;

    const title = sectionTitle.trim();
    if (!title) {
      throw new Error("Add a clear title for this section.");
    }

    setSaving(true);
    try {
      if (editingSection) {
        await updateCurriculumSection(courseId, editingSection.id, title);
      } else {
        await createCurriculumSection(courseId, title, sections.length);
      }
      closeSectionModal();
    } finally {
      setSaving(false);
    }
  };

  const removeSection = async (sectionId: string) => {
    if (!courseId) return;

    setSaving(true);
    try {
      await deleteCurriculumSection(courseId, sectionId);
    } finally {
      setSaving(false);
    }
  };

  const openLessonEditor = (sectionId: string, lesson?: CurriculumLesson) => {
    setLessonEditor({ sectionId, lesson });
    setLessonForm(emptyLessonForm(lesson));
  };

  const closeLessonEditor = () => {
    setLessonEditor(null);
    setLessonForm(emptyLessonForm());
  };

  const setLessonField = <K extends keyof LessonFormState>(
    field: K,
    value: LessonFormState[K]
  ) => {
    setLessonForm((current) => ({ ...current, [field]: value }));
  };

  const setResourceField = <K extends keyof ResourceFormState>(
    index: number,
    field: K,
    value: ResourceFormState[K]
  ) => {
    setLessonForm((current) => ({
      ...current,
      resources: current.resources.map((resource, resourceIndex) =>
        resourceIndex === index ? { ...resource, [field]: value } : resource
      ),
    }));
  };

  const addResourceRow = () => {
    setLessonForm((current) => ({
      ...current,
      resources: [...current.resources, { title: "", type: "pdf", url: "" }],
    }));
  };

  const removeResourceRow = (index: number) => {
    setLessonForm((current) => ({
      ...current,
      resources: current.resources.filter((_, resourceIndex) => resourceIndex !== index),
    }));
  };

  const saveLesson = async () => {
    if (!courseId || !lessonEditor) return;

    const payload = buildLessonPayload(lessonForm);

    setSaving(true);
    try {
      if (lessonEditor.lesson) {
        await updateCurriculumLesson(
          courseId,
          lessonEditor.sectionId,
          lessonEditor.lesson.id,
          payload
        );
      } else {
        await createCurriculumLesson(courseId, lessonEditor.sectionId, payload);
      }
      closeLessonEditor();
    } finally {
      setSaving(false);
    }
  };

  const removeLesson = async (sectionId: string, lessonId: string) => {
    if (!courseId) return;

    setSaving(true);
    try {
      await deleteCurriculumLesson(courseId, sectionId, lessonId);
    } finally {
      setSaving(false);
    }
  };

  const publishCourse = async (): Promise<CurriculumMetrics | undefined> => {
    if (!courseId) return undefined;

    setSaving(true);
    try {
      return await publishCourseCurriculum(courseId);
    } finally {
      setSaving(false);
    }
  };

  return {
    sections,
    loading,
    saving,
    error,
    totalLessons,
    totalMinutes,
    sectionModalVisible,
    sectionTitle,
    editingSection,
    lessonEditor,
    lessonForm,
    setSectionTitle,
    openAddSection,
    openEditSection,
    closeSectionModal,
    saveSection,
    removeSection,
    openLessonEditor,
    closeLessonEditor,
    setLessonField,
    setResourceField,
    addResourceRow,
    removeResourceRow,
    saveLesson,
    removeLesson,
    publishCourse,
  };
}
