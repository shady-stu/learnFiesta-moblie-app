import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import CourseCard, { Enrollment } from "@/components/CourseCard";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import LoadingView from "@/components/ui/LoadingView";

const ENROLLMENTS_DATA: Enrollment[] = [
  { id: "1", title: "Advanced React Patterns", author: "Saleh owes", progress: 85, lessonsDone: 12, totalLessons: 15, img: { uri: "https://picsum.photos/seed/react/60/60" }, status: "progress" },
  { id: "2", title: "Mastering UI/UX Design", author: "Salman", progress: 32, lessonsDone: 4, totalLessons: 12, img: { uri: "https://picsum.photos/seed/uiux/60/60" }, status: "progress" },
  { id: "3", title: "Data Science with Python", author: "nassem", progress: 100, lessonsDone: 24, totalLessons: 24, img: { uri: "https://picsum.photos/seed/python/60/60" }, status: "completed" },
];

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState<"all" | "progress" | "completed">("all");

  const fetchData = async () => {
    return ENROLLMENTS_DATA;
  };

  const { data: enrollments = [], isLoading, isError } = useQuery({
    queryKey: ["enrollments"],
    queryFn: fetchData,
  });

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
        <Text style={{ color: 'red' }}>Failed to load courses.</Text>
      
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredEnrollments.map((item) => (
            <CourseCard key={item.id} enrollment={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.background },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: Typography.title, fontWeight: "bold", marginBottom: Spacing.md, color: Colors.textPrimary },
  tabs: { flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.lg },
  tab: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, backgroundColor: Colors.muted, borderRadius: Radius.full },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { color: Colors.textSecondary, fontSize: Typography.caption },
  tabTextActive: { color: Colors.white, fontSize: Typography.caption, fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
  emptyText: { color: Colors.textSecondary, fontSize: Typography.subheading },
});