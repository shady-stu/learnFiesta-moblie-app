import { useEffect, useState } from "react";
import * as Network from "expo-network";
import type { Enrollment } from "@/components/CourseCard";
import { useCourse } from "@/hooks/use-course";
import {initCoursesDb, getOfflineEnrollments,} from "@/db/offlineCoursesDb";
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
  const uniqueOnlineEnrollments = Array.from(
    new Map(onlineEnrollments.map((item) => [item.courseId, item])).values()
  );
  const uniqueOfflineEnrollments = Array.from(
    new Map(offlineEnrollments.map((item) => [item.courseId, item])).values()
  );
  const enrollments =
    isOnline === true ? uniqueOnlineEnrollments : uniqueOfflineEnrollments;
  const loading = isOnline === null || dbLoading || (isOnline && isLoading);
  return {
    enrollments,
    isOnline,
    isError,
    loading,
  };
}