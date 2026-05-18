import { useEffect, useState } from "react";
import { subscribeToUserInstructors } from "@/api/services/instructor/instructorService";
import {useQuery} from "@tanstack/react-query";
import { fetchInstructorById } from "@/api/services/courses/fetchCourseById";
import { Instructor } from "@/components/instructor/InstructorCourseCard";

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

export const useInstructorById = (id?: string) => {
  return useQuery({
    queryKey: ["instructor", id],
    queryFn: () => fetchInstructorById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};

