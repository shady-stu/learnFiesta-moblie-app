import { useEffect, useRef } from "react";
import type {
  UseFormReset,
  UseFormWatch,
} from "react-hook-form";
import type { CourseFoundationFormData } from "@/components/createCourse/foundation/schema";
import { useCourseFoundationDraft } from "@/hooks/createCourse/useCourseFoundationDraft";

type Props = {
  isEditing: boolean;
  reset: UseFormReset<CourseFoundationFormData>;
  watch: UseFormWatch<CourseFoundationFormData>;
};

export function useCourseFoundationDraftSync({ isEditing, reset, watch }: Props) {
  const { clearDraft, draft, isDraftLoading, saveDraft } =
    useCourseFoundationDraft(!isEditing);
  const didRestoreDraft = useRef(false);

  useEffect(() => {
    if (isEditing || isDraftLoading || didRestoreDraft.current) return;

    didRestoreDraft.current = true;

    if (draft) {
      reset(draft);
    }
  }, [draft, isDraftLoading, isEditing, reset]);

  useEffect(() => {
    if (isEditing || isDraftLoading || !didRestoreDraft.current) return;

    let saveTimeout: ReturnType<typeof setTimeout> | undefined;

    const subscription = watch((values) => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      saveTimeout = setTimeout(() => {
        saveDraft({
          title: values.title || "",
          category: values.category || "",
          description: values.description || "",
          whatYouWillLearn: values.whatYouWillLearn || [""],
          price: values.price || "",
          thumbnail: values.thumbnail,
        });
      }, 600);
    });

    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      subscription.unsubscribe();
    };
  }, [isDraftLoading, isEditing, saveDraft, watch]);

  return { clearDraft };
}
