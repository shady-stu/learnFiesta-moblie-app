import { useEffect, useState } from "react";
import { subscribeToCourses } from "@/api/services/courses/courseService";
import type { Course } from "@/types/course";

export const useCourses = () => {
    const [data, setData] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);

        const unsubscribe = subscribeToCourses(
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
