import { useEffect, useState } from "react";
import {
  subscribeToCurrentUserRole,
  type UserRole,
} from "@/api/services/authService/roleService";

export function useCurrentUserRole() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = subscribeToCurrentUserRole(
      (nextRole) => {
        setRole(nextRole);
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
    role,
    isInstructor: role === "instructor",
    isLoading,
    error,
    isError: Boolean(error),
  };
}
