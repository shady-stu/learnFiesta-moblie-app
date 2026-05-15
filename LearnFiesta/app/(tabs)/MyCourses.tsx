import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CourseCard from "@/components/courses/EnrollmentCourseCard";
import CourseTabs, { CourseTab } from "@/components/courses/CourseTabs";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius"
import LoadingView from "@/components/ui/LoadingView";
import { useOfflineCourses } from "@/hooks/courses/useOfflineCourses";
import { clearAllEnrollments } from "@/api/services/enrollments/enrollmentService"
import { getContinueLessonParams } from "@/utils/learningNavigation";
import type { Enrollment } from "@/types/Enrollment";

export default function MyCourses() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<CourseTab>("all");
  const [refreshCount, setRefreshCount] = useState(0);

  const { enrollments, isOnline, isError, loading } =
    useOfflineCourses(refreshCount);

  if (loading) {
    return <LoadingView />;
  }

  const filteredEnrollments = enrollments.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  const openEnrollmentLesson = (enrollment: Enrollment) => {
    router.push({
      pathname: "/lesson/[id]",
      params: getContinueLessonParams(enrollment),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Courses</Text>

      <TouchableOpacity
        style={styles.refreshBtn}
        activeOpacity={0.8}
        onPress={() => setRefreshCount((count) => count + 1)}
      >
        <TouchableOpacity
            onPress={async () => {
              await clearAllEnrollments();
            }}
        >
          <Text>Clear Offline Courses</Text>
        </TouchableOpacity>
        <Ionicons
          name="refresh-outline"
          size={18}
          color={Colors.white}
        />

        <Text style={styles.refreshText}>
          {isOnline ? "Refresh Online" : "Refresh Offline"}
        </Text>
      </TouchableOpacity>

      {!isOnline && (
        <Text style={styles.offlineText}>
          Offline mode: showing saved courses
        </Text>
      )}

      {isOnline && isError && (
        <Text style={styles.errorText}>
          Failed to load courses from Firebase.
        </Text>
      )}

      <CourseTabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {filteredEnrollments.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {isOnline
              ? "No courses found"
              : "No offline courses saved yet"}
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {filteredEnrollments.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => openEnrollmentLesson(item)}
            >
              <CourseCard enrollment={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },

  header: {
    fontSize: Typography.title,
    fontWeight: "bold",
    marginBottom: Spacing.md,
    color: Colors.textPrimary,
  },

  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    alignSelf: "flex-start",
    marginBottom: Spacing.sm,
  },

  refreshText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: Typography.caption,
  },

  offlineText: {
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    fontSize: Typography.caption,
  },

  errorText: {
    color: "red",
    marginBottom: Spacing.md,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    color: Colors.textSecondary,
    fontSize: Typography.subheading,
  },
});
