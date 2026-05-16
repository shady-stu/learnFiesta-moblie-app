import { useEffect, useState } from "react";
import * as Network from "expo-network";

import type { Enrollment } from "@/types/Enrollment";
import { listenToUserEnrollments } from "@/api/services/enrollments/enrollmentService";
import {
  initCoursesDb,
  getOfflineEnrollments,
  saveEnrollmentsOffline,
} from "@/db/offlineCoursesDb";

export function useOfflineCourses(refreshCount: number) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [offlineEnrollments, setOfflineEnrollments] = useState<Enrollment[]>([]);
  const [onlineEnrollments, setOnlineEnrollments] = useState<Enrollment[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCourses() {
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

        if (!cancelled) {
          setIsOnline(false);

          const savedCourses = await getOfflineEnrollments();
          setOfflineEnrollments(savedCourses);
        }
      } finally {
        if (!cancelled) {
          setDbLoading(false);
        }
      }
    }

    loadCourses();

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

        try {
          await saveEnrollmentsOffline(enrollments);
          setOfflineEnrollments(enrollments);
        } catch (error) {
          console.log("Failed to sync offline enrollments:", error);
        }
      },
      (error) => {
        console.log("Realtime enrollments error:", error);
        setIsError(true);
      }
    );

    return unsubscribe;
  }, [isOnline]);

  const uniqueOnlineEnrollments = Array.from(
    new Map(onlineEnrollments.map((item) => [item.courseId, item])).values()
  );

  const uniqueOfflineEnrollments = Array.from(
    new Map(offlineEnrollments.map((item) => [item.courseId, item])).values()
  );

  const enrollments: Enrollment[] =
    isOnline === true ? uniqueOnlineEnrollments : uniqueOfflineEnrollments;

  const loading = isOnline === null || dbLoading;

  return {
    enrollments,
    isOnline,
    isError,
    loading,
  };
}
