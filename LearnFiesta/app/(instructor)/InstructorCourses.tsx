import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import InstructorCard from "@/components/instructor/InstructorCourseCard";
import LoadingView from "@/components/ui/LoadingView";
import PerformanceCard from "@/components/instructor/PerformanceCard";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { useInstructor } from "@/hooks/useInstructor";

export default function InstructorCourses() {
  const insets = useSafeAreaInsets();
  const { data: instructors = [], isLoading, isError } = useInstructor();

  if (isLoading) return <LoadingView />;

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load courses.</Text>
      </View>
    );
  }

  const activeCourses = instructors.filter((course) => course.isActive);
  const inactiveCourses = instructors.filter((course) => !course.isActive);
  const totalStudents = instructors.reduce(
    (sum, course) => sum + (course.students || 0),
    0
  );
  const totalRevenue = instructors.reduce(
    (sum, course) => sum + (course.revenue || 0),
    0
  );

  const openCreateCourse = () => {
    router.push({ pathname: "/(instructor)/create-course" });
  };

  const openEditCourse = (courseId: string) => {
    router.push({
      pathname: "/(instructor)/create-course",
      params: { courseId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.push("/(tabs)/profile")}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Ionicons name="arrow-back" size={18} color={Colors.primary} />
            <Text style={styles.backButtonText}>Back to Profile</Text>
          </Pressable>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Instructor Courses</Text>
          <Text style={styles.headerSubtitle}>
            Manage and monitor your educational content performance.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Active Courses</Text>
        {activeCourses.length > 0 ? (
          activeCourses.map((course) => (
            <InstructorCard
              key={course.id}
              {...course}
              onEdit={() => openEditCourse(course.courseId)}
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No active courses yet</Text>
            <Text style={styles.emptyText}>Create or publish a course to see it here.</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Other Courses</Text>
        {inactiveCourses.length > 0 ? (
          inactiveCourses.map((course) => (
            <InstructorCard
              key={course.id}
              {...course}
              onEdit={() => openEditCourse(course.courseId)}
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No draft courses</Text>
            <Text style={styles.emptyText}>Courses that are not active will appear here.</Text>
          </View>
        )}

        <PerformanceCard
          totalStudents={totalStudents}
          activeCourses={activeCourses.length}
          inactiveCourses={inactiveCourses.length}
          totalRevenue={`$${totalRevenue.toLocaleString()}`}
        />
      </ScrollView>

      <Pressable
        onPress={openCreateCourse}
        style={({ pressed }) => [
          styles.createButton,
          { bottom: Math.max(insets.bottom, 16) + 24 },
          pressed && styles.buttonPressed,
        ]}
      >
        <Ionicons name="add" size={18} color={Colors.white} />
        <Text style={styles.createButtonText}>New Course</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 110,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  header: {
    paddingBottom: Spacing.lg,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backButtonText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: Typography.caption,
  },
  headerTitle: {
    fontSize: Typography.title,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.subheading,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  createButton: {
    position: "absolute",
    right: Spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  createButtonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    color: Colors.textPrimary,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: Typography.caption,
  },
});
