import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  StyleSheet,
} from "react-native";
import InstructorCard from "@/components/InstructorCard";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import LoadingView from "@/components/ui/LoadingView";
import PerformanceCard from "@/components/PerformanceCard";
import { useInstructor } from "@/hooks/useInstructor";
import { router } from "expo-router";

const InstructorCourses = () => {
  const { data: instructors = [], isLoading, isError } = useInstructor();

  if (isLoading) return <LoadingView />;

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: "red" }}>Failed to load courses.</Text>
      </View>
    );
  }

  const activeCourses = instructors.filter((c) => c.isActive);
  const inactiveCourses = instructors.filter((c) => !c.isActive);

  const totalStudents = instructors.reduce(
    (sum, c) => sum + (c.students || 0),
    0
  );

  const totalRevenue = instructors.reduce(
    (sum, c) => sum + (c.revenue || 0),
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Instructor Courses</Text>
          <Text style={styles.headerSubtitle}>
            Manage and monitor your educational content performance.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Active Courses</Text>
        {activeCourses.map((course) => (
          <InstructorCard key={course.id} {...course} />
        ))}

        <Text style={styles.sectionTitle}>Other Courses</Text>
        {inactiveCourses.map((course) => (
          <InstructorCard key={course.id} {...course} />
        ))}

        <PerformanceCard
          totalStudents={totalStudents}
          activeCourses={activeCourses.length}
          inactiveCourses={inactiveCourses.length}
          totalRevenue={`$${totalRevenue.toLocaleString()}`}
        />
      </ScrollView>

      <Pressable
        onPress={() =>
          router.push({ pathname: "/(instructor)/create-course" })
        }
        style={({ pressed }) => [
          styles.testButton,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.testButtonText}>➕ Create Course</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default InstructorCourses;