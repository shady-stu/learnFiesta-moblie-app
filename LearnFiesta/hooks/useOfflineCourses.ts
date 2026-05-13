import { useEffect, useState } from "react";
import * as Network from "expo-network";

import type { Enrollment } from "@/components/CourseCard";
import { useCourse } from "@/hooks/use-course";
import {
  initCoursesDb,
  saveEnrollmentsOffline,
  getOfflineEnrollments,
} from "@/db/offlineCoursesDb";

export function useOfflineCourses(refreshCount: number) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [offlineEnrollments, setOfflineEnrollments] = useState<Enrollment[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  const {
    data: onlineEnrollments = [],
    isLoading,
    isError,
  } = useCourse(isOnline === true, refreshCount);

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
    let cancelled = false;

    async function load() {
      const netState = await Network.getNetworkStateAsync();

      const online =
          Boolean(netState.isConnected) &&
          Boolean(netState.isInternetReachable ?? true);

      if (cancelled) return;

      setIsOnline(online);

      if (!online) {
        const saved = await getOfflineEnrollments();
        setOfflineEnrollments(saved); // OK: ONLY offline load
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [refreshCount]);

  const enrollments: Enrollment[] =
    isOnline === true ? onlineEnrollments : offlineEnrollments;

  const loading = isOnline === null || dbLoading || (isOnline && isLoading);

  return {
    enrollments,
    isOnline,
    isError,
    loading,
  };
}