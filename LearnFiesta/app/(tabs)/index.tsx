import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo } from "react";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";

import AppHeader from "@/components/ui/AppHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import HeroBanner from "@/components/home/HeroBanner";
import ContinueLearningCard from "@/components/home/ContinueLearningCard";
import CourseCard from "@/components/home/CourseCard";
import CategoryCard from "@/components/home/CategoryCard";

import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { auth } from "@/api/services/firebase";
import { useRecommendedCourses } from "@/hooks/courses/useRecommendedCourses";
import { useCategories } from "@/hooks/category/useCategories";
import { useOfflineCourses } from "@/hooks/courses/useOfflineCourses";
import { chooseContinueCourse, getContinueLessonParams } from "@/utils/learningNavigation";
import type { Course } from "@/types/course";

const chooseFeaturedCourse = (courses: Course[] = []) => {
  const bestSellerCourses = courses.filter((course) =>
    String(course.badge || "").toLowerCase().includes("best")
  );

  const candidates = bestSellerCourses.length > 0
    ? bestSellerCourses
    : [...courses].sort((a, b) => b.reviewsCount - a.reviewsCount);

  if (candidates.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};

export default function HomeScreen() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/login");
    });

    return unsubscribe;
  }, []);

  const {
    data: categories,
    isLoading: loadingCategories,
    isError: categoriesError,
    error: categoriesErrObj,
  } = useCategories();

  const {
    data: recommendedCourses,
    isLoading: loadingCourses,
    isError: coursesError,
  } = useRecommendedCourses();
  const { enrollments } = useOfflineCourses(0);
  const continueCourse = chooseContinueCourse(enrollments);
  const featuredCourse = useMemo(
    () => chooseFeaturedCourse(recommendedCourses ?? []),
    [recommendedCourses]
  );

  const openContinueCourse = () => {
    if (!continueCourse) {
      router.push("/search");
      return;
    }

    router.push({
      pathname: "/lesson/[id]",
      params: getContinueLessonParams(continueCourse),
    });
  };

  const openFeaturedCourse = () => {
    if (!featuredCourse) {
      router.push("/search");
      return;
    }

    router.push({
      pathname: "/course/[id]",
      params: { id: featuredCourse.id },
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AppHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroBanner course={featuredCourse} onPress={openFeaturedCourse} />

        {/* Continue Learning */}
        <View style={styles.section}>
          <SectionHeader
            title="Continue Learning"
            actionLabel="View All"
            onPress={() => router.push("/MyCourses")}
          />
          <ContinueLearningCard
            enrollment={continueCourse}
            onPress={openContinueCourse}
          />
        </View>

        {/* Recommended */}
        <View style={styles.section}>
          <SectionHeader
            title="Recommended for You"
            actionLabel="See More"
            onPress={() => router.push("/search")}
          />

          {loadingCourses ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : coursesError ? (
            <Text style={styles.errorText}>
              Failed to load recommended courses
            </Text>
          ) : (
            <FlatList
              data={recommendedCourses ?? []}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: Spacing.md }}
              renderItem={({ item }) => (
                <View style={styles.courseWrapper}>
                  <CourseCard
                    courseId={item.id}
                    title={item.title}
                    instructor={item.instructorName}
                    rating={item.rating}
                    reviews={String(item.reviewsCount)}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    image={item.imageUrl}
                  />
                </View>
              )}
            />
          )}
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <SectionHeader title="Top Categories" />

          {loadingCategories ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : categoriesError ? (
            <Text style={styles.errorText}>
              Failed to load categories
              {categoriesErrObj
                ? `: ${(categoriesErrObj as any)?.message ?? ""}`
                : ""}
            </Text>
          ) : (
            <View style={styles.categoriesGrid}>
              {(categories ?? []).map((category) => (
                <Pressable
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() =>
                    router.push({
                      pathname: "/categories/[id]",
                      params: { id: category.id },
                    })
                  }
                >
                  <CategoryCard
                    title={category.title}
                    icon={category.icon}
                    backgroundColor={category.backgroundColor}
                    iconColor={category.iconColor}
                    onPress={() =>
                      router.push({
                        pathname: "/categories/[id]",
                        params: { id: category.id },
                      })
                    }
                  />
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

   

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.xl,
    paddingBottom: 120,
  },
  section: {
    gap: Spacing.md,
  },
  categoriesSection: {
    gap: Spacing.md,
  },
  courseWrapper: {
    marginRight: 12,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%",
    marginBottom: 12,
  },
  loadingWrap: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
  },

  testButton: {
    position: "absolute",
    bottom: 70,
    right: Spacing.xl,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  testButtonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
