import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";

type Props = {
  totalStudents: number;
  activeCourses: number;
  totalRevenue: string;
  inactiveCourses: number;
};

const PerformanceCard = ({
  totalStudents,
  activeCourses,
  totalRevenue,
  inactiveCourses,
}: Props) => {
  return (
    <View style={styles.performanceCard}>
      <Text style={styles.performanceTitle}>Your Statistics</Text>
      <Text style={styles.performanceSubtitle}>
        Each instructor has their own course performance overview.
      </Text>

      <View style={styles.perfGrid}>
        <View style={styles.perfGridItem}>
          <Text style={styles.perfGridLabel}>TOTAL STUDENTS</Text>
          <Text style={styles.perfGridValue}>{totalStudents}</Text>
        </View>

        <View style={styles.perfGridItem}>
          <Text style={styles.perfGridLabel}>ACTIVE COURSES</Text>
          <Text style={styles.perfGridValue}>{activeCourses}</Text>
        </View>

        <View style={styles.perfGridItem}>
          <Text style={styles.perfGridLabel}>TOTAL REVENUE</Text>
          <Text style={styles.perfGridValue}>{totalRevenue}</Text>
        </View>

        <View style={styles.perfGridItem}>
          <Text style={styles.perfGridLabel}>INACTIVE COURSES</Text>
          <Text style={styles.perfGridValue}>{inactiveCourses}</Text>
        </View>
      </View>
    </View>
  );
};

export default PerformanceCard;

const styles = StyleSheet.create({
  performanceCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  performanceTitle: {
    fontSize: Typography.subheading,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  performanceSubtitle: {
    fontSize: Typography.caption,
    color: "rgba(255,255,255,0.75)",
    marginBottom: Spacing.lg,
  },
  perfGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  perfGridItem: {
    width: "48%",
    marginBottom: 16,
  },
  perfGridLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.65)",
    marginBottom: Spacing.xs,
  },
  perfGridValue: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.white,
  },
});