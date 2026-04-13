import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard, { Enrollment } from "@/components/CourseCard";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import LoadingView from "@/components/ui/LoadingView";
import { useCourse } from "@/hooks/use-course";

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState<"all" | "progress" | "completed">("all");

  const { data: enrollments = [], isLoading, isError } = useCourse();

  const filteredEnrollments = enrollments.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: "red" }}>Failed to load courses.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Courses</Text>

      <View style={styles.tabs}>
        {(["all", "progress", "completed"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>
              {tab === "all" ? "All" : tab === "progress" ? "In Progress" : "Completed"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
            <CourseCard key={item.id} enrollment={item} />
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: Typography.title,
    fontWeight: "bold",
    marginBottom: Spacing.md,
    color: Colors.textPrimary,
  },
  tabs: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.muted,
    borderRadius: Radius.full,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textSecondary,
    fontSize: Typography.caption,
  },
  tabTextActive: {
    color: Colors.white,
    fontSize: Typography.caption,
    fontWeight: "600",
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