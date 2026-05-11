import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import CourseCard from "@/components/CourseCard";
import FirebaseCoursePreviewCard from "@/components/courses/FirebaseCoursePreviewCard";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import LoadingView from "@/components/ui/LoadingView";
import { useCourse } from "@/hooks/use-course";

const FIREBASE_PREVIEW_COURSE_ID = "frLh0ltD0nQRGIzfyMCp";

export default function MyCourses() {
  const router = useRouter();
  const [activeTab, setActiveTab] =
    useState<"all" | "progress" | "completed">("all");

  const { data: enrollments = [], isLoading, isError } = useCourse();

  if (isLoading) return <LoadingView />;

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: "red" }}>Failed to load courses.</Text>
      </View>
    );
  }

  const filteredEnrollments = enrollments.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  const handleLessonPress = (courseId: string) => {
    router.push({
      pathname: "/lesson/[id]",
      params: { id: courseId },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Courses</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(["all", "progress", "completed"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={
                activeTab === tab
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              {tab === "all"
                ? "All"
                : tab === "progress"
                ? "In Progress"
                : "Completed"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.previewWrap}>
        <FirebaseCoursePreviewCard
          courseId={FIREBASE_PREVIEW_COURSE_ID}
          onPress={() => handleLessonPress(FIREBASE_PREVIEW_COURSE_ID)}
        />
      </View>

      {/* Empty state */}
      {filteredEnrollments.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No courses found</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {filteredEnrollments.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                handleLessonPress((item as any).courseId)
              }
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
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.background },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: Typography.title, fontWeight: "bold", marginBottom: Spacing.md, color: Colors.textPrimary },
  tabs: { flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.lg },
  previewWrap: { marginBottom: Spacing.lg },
  tab: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, backgroundColor: Colors.muted, borderRadius: Radius.full },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { color: Colors.textSecondary, fontSize: Typography.caption },
  tabTextActive: { color: Colors.white, fontSize: Typography.caption, fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
  emptyText: { color: Colors.textSecondary, fontSize: Typography.subheading },
});
