import { useEffect, useState } from "react";
import { subscribeToUserInstructors } from "@/api/services/ServicebyInstructor";
import type { Instructor } from "@/components/InstructorCard";

export const useInstructor = () => {
  const [data, setData] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = subscribeToUserInstructors(
      (courses) => {
        setData(courses);
        setError(null);
        setIsLoading(false);
      },
      (subscriptionError) => {
        setError(subscriptionError);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return {
    data,
    isLoading,
    error,
    isError: Boolean(error),
  };
};
