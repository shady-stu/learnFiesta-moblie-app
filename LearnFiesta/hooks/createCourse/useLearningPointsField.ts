import { useCallback } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { CourseFoundationFormData } from "@/components/createCourse/foundation/schema";

type Props = {
  learningPoints: string[];
  setValue: UseFormSetValue<CourseFoundationFormData>;
};

export function useLearningPointsField({ learningPoints, setValue }: Props) {
  // One helper updates the whole array and asks React Hook Form to validate immediately.
  const setLearningPoints = useCallback(
    (points: string[]) => {
      setValue("whatYouWillLearn", points, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  // Adds a new empty input row for another learning outcome.
  const addLearningPoint = useCallback(() => {
    setLearningPoints([...learningPoints, ""]);
  }, [learningPoints, setLearningPoints]);

  // Updates only the selected point while keeping the other points unchanged.
  const updateLearningPoint = useCallback(
    (index: number, value: string) => {
      setLearningPoints(
        learningPoints.map((point, pointIndex) =>
          pointIndex === index ? value : point
        )
      );
    },
    [learningPoints, setLearningPoints]
  );

  // Removes one point from the list.
  // The schema still requires at least one point, so validation protects the form.
  const removeLearningPoint = useCallback(
    (index: number) => {
      setLearningPoints(
        learningPoints.filter((_, pointIndex) => pointIndex !== index)
      );
    },
    [learningPoints, setLearningPoints]
  );

  // Stores the uploaded image URL inside the same form state.
  const updateThumbnail = useCallback(
    (url: string) => {
      setValue("thumbnail", url, { shouldValidate: true });
    },
    [setValue]
  );

  return {
    addLearningPoint,
    removeLearningPoint,
    updateLearningPoint,
    updateThumbnail,
  };
}
