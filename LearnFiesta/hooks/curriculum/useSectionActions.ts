import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createCurriculumSection,
  deleteCurriculumSection,
  updateCurriculumSection,
  type CurriculumSection,
} from "@/api/services/curriculumService";
import {
  sectionFormSchema,
  type SectionFormValues,
} from "@/domain/curriculum/schemas";

export function useSectionActions(courseId?: string, sectionCount = 0) {
  const [sectionModalVisible, setSectionModalVisible] = useState(false);
  const [editingSection, setEditingSection] = useState<CurriculumSection | null>(null);
  const sectionForm = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: { title: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const saveMutation = useMutation({
    mutationFn: async (title: string) => {
      if (!courseId) return;
      if (editingSection) {
        await updateCurriculumSection(courseId, editingSection.id, title);
        return;
      }
      await createCurriculumSection(courseId, title, sectionCount);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (sectionId: string) => {
      if (!courseId) return;
      await deleteCurriculumSection(courseId, sectionId);
    },
  });

  const openAddSection = () => {
    setEditingSection(null);
    sectionForm.reset({ title: "" });
    setSectionModalVisible(true);
    setTimeout(() => {
      void sectionForm.trigger("title");
    }, 0);
  };

  const openEditSection = (section: CurriculumSection) => {
    setEditingSection(section);
    sectionForm.reset({ title: section.title });
    setSectionModalVisible(true);
    setTimeout(() => {
      void sectionForm.trigger("title");
    }, 0);
  };

  const closeSectionModal = () => {
    setSectionModalVisible(false);
    setEditingSection(null);
    sectionForm.reset({ title: "" });
  };

  const saveSection = async () => {
    await sectionForm.handleSubmit(
      async (values) => {
        await saveMutation.mutateAsync(values.title.trim());
        closeSectionModal();
      },
      async (errors) => {
        const message = errors.title?.message || "Please check the section data.";
        throw new Error(message);
      }
    )();
  };

  const removeSection = async (sectionId: string) => {
    await deleteMutation.mutateAsync(sectionId);
  };

  const sectionTitle = sectionForm.watch("title");
  const setSectionTitle = (title: string) => {
    sectionForm.setValue("title", title, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return {
    sectionModalVisible,
    sectionTitle,
    editingSection,
    sectionTitleError: sectionForm.formState.errors.title?.message ?? null,
    saving: saveMutation.isPending || deleteMutation.isPending,
    setSectionTitle,
    openAddSection,
    openEditSection,
    closeSectionModal,
    saveSection,
    removeSection,
  };
}
