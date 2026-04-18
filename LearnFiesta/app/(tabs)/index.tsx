import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';

import AppHeader from '@/components/ui/AppHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import HeroBanner from '@/components/home/HeroBanner';
import ContinueLearningCard from '@/components/home/ContinueLearningCard';
import CourseCard from '@/components/home/CourseCard';
import CategoryCard from '@/components/home/CategoryCard';

import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

import { useRecommendedCourses } from '@/hooks/useRecommendedCourses';
import { useCategories } from '@/hooks/useCategories';
import { auth } from '@/api/services/firebase';

export default function HomeScreen() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
      }
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

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <AppHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HeroBanner />

       
        <View style={styles.section}>
          <SectionHeader title="Continue Learning" actionLabel="View All" />
          <ContinueLearningCard />
        </View>

       
        <View style={styles.section}>
          <SectionHeader title="Recommended for You" actionLabel="See More" />

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
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: Spacing.md }}
              renderItem={({ item }) => (
                <View style={styles.courseWrapper}>
                  <CourseCard
                    title={item.title}
                    instructor={item.instructorName}
                    rating={item.rating}
                    reviews={String(item.reviewsCount)}
                    price={item.price}
                    image={item.imageUrl}
                  />
                </View>
              )}
            />
          )}
        </View>

        
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
                ? `: ${(categoriesErrObj as any)?.message ?? ''}`
                : ''}
            </Text>
          ) : (
            <View style={styles.categoriesGrid}>
              {(categories ?? []).map((category) => (
                <View key={category.id} style={styles.categoryItem}>
                  <CategoryCard
                    title={category.title}
                    icon={category.icon}
                    backgroundColor={category.backgroundColor}
                    iconColor={category.iconColor}
                  />
                </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryItem: {
    width: '48%',
    marginBottom: 12,
  },

  loadingWrap: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: 'red',
  },
});