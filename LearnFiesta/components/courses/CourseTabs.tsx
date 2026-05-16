import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";

export type CourseTab = "all" | "progress" | "completed";

type Props = {
  activeTab: CourseTab;
  onChangeTab: (tab: CourseTab) => void;
};

export default function CourseTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View style={styles.tabs}>
      {(["all", "progress", "completed"] as const).map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.tabActive]}
          onPress={() => onChangeTab(tab)}
        >
          <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>
            {tab === "all"? "All" : tab === "progress" ? "In Progress" : "Completed"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});