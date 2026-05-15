import { useEffect, useState } from "react";
import * as Network from "expo-network";

import type { Enrollment } from "@/types/Enrollment";
import { listenToUserEnrollments } from "@/api/services/enrollments/enrollmentService";
import {
  initCoursesDb,
  getOfflineEnrollments,
} from "@/db/offlineCoursesDb";

export function useOfflineCourses(refreshCount: number) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [offlineEnrollments, setOfflineEnrollments] = useState<Enrollment[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [onlineEnrollments, setOnlineEnrollments] = useState<Enrollment[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkNetworkAndLoadOffline() {
      try {
        setDbLoading(true);

        await initCoursesDb();

        const netState = await Network.getNetworkStateAsync();

        const online =
          Boolean(netState.isConnected) &&
          Boolean(netState.isInternetReachable ?? true);

        if (cancelled) return;

        setIsOnline(online);

        if (!online) {
          const savedCourses = await getOfflineEnrollments();

          if (!cancelled) {
            setOfflineEnrollments(savedCourses);
          }
        }
      } catch (error) {
        console.log("SQLite / Network error:", error);
      } finally {
        if (!cancelled) {
          setDbLoading(false);
        }
      }
    }

    checkNetworkAndLoadOffline();

    return () => {
      cancelled = true;
    };
  }, [refreshCount]);

  useEffect(() => {
    if (!isOnline) return;

    setIsError(false);

    const unsubscribe = listenToUserEnrollments(
      async (enrollments) => {
        setOnlineEnrollments(enrollments);
      },
      (error) => {
        console.log("Realtime enrollments error:", error);
        setIsError(true);
      }
    );

    return unsubscribe;
  }, [isOnline]);

  const enrollments: Enrollment[] =
    isOnline === true ? onlineEnrollments : offlineEnrollments;

  const loading = isOnline === null || dbLoading;

  return {
    enrollments,
    isOnline,
    isError,
    loading,
  };
}
