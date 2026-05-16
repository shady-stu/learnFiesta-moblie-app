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
  // Modal state for adding or editing a section.
  const [sectionModalVisible, setSectionModalVisible] = useState(false);
  const [editingSection, setEditingSection] = useState<CurriculumSection | null>(null);

  // Section title form with real-time Zod validation.
  const sectionForm = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: { title: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // One save mutation handles both create and update.
  // editingSection tells us which action is needed.
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

  // Delete mutation only needs the section id.
  const deleteMutation = useMutation({
    mutationFn: async (sectionId: string) => {
      if (!courseId) return;
      await deleteCurriculumSection(courseId, sectionId);
    },
  });

  // Prepare the modal for creating a new section.
  const openAddSection = () => {
    setEditingSection(null);
    sectionForm.reset({ title: "" });
    setSectionModalVisible(true);
    setTimeout(() => {
      // Show validation feedback immediately when the modal opens.
      void sectionForm.trigger("title");
    }, 0);
  };

  // Prepare the modal with existing section data for editing.
  const openEditSection = (section: CurriculumSection) => {
    setEditingSection(section);
    sectionForm.reset({ title: section.title });
    setSectionModalVisible(true);
    setTimeout(() => {
      void sectionForm.trigger("title");
    }, 0);
  };

  // Reset modal state so the next open starts clean.
  const closeSectionModal = () => {
    setSectionModalVisible(false);
    setEditingSection(null);
    sectionForm.reset({ title: "" });
  };

  // Validate the section title before saving it to Firebase.
  const saveSection = async () => {
    await sectionForm.handleSubmit(
      async (values) => {
        await saveMutation.mutateAsync(values.title.trim());
        closeSectionModal();
      },
      async (errors) => {
        // Return a simple message for the alert/toast layer.
        const message = errors.title?.message || "Please check the section data.";
        throw new Error(message);
      }
    )();
  };

  // Public delete action used by section cards.
  const removeSection = async (sectionId: string) => {
    await deleteMutation.mutateAsync(sectionId);
  };

  const sectionTitle = sectionForm.watch("title");

  // Setter used by the modal input. It also triggers live validation.
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
