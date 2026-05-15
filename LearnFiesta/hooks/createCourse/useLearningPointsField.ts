import { useCallback } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { CourseFoundationFormData } from "@/components/createCourse/foundation/schema";

type Props = {
  learningPoints: string[];
  setValue: UseFormSetValue<CourseFoundationFormData>;
};

export function useLearningPointsField({ learningPoints, setValue }: Props) {
  const setLearningPoints = useCallback(
    (points: string[]) => {
      setValue("whatYouWillLearn", points, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const addLearningPoint = useCallback(() => {
    setLearningPoints([...learningPoints, ""]);
  }, [learningPoints, setLearningPoints]);

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

  const removeLearningPoint = useCallback(
    (index: number) => {
      setLearningPoints(
        learningPoints.filter((_, pointIndex) => pointIndex !== index)
      );
    },
    [learningPoints, setLearningPoints]
  );

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
