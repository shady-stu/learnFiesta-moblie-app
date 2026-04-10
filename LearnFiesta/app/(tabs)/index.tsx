import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '@/components/ui/AppHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import HeroBanner from '@/components/home/HeroBanner';
import ContinueLearningCard from '@/components/home/ContinueLearningCard';
import CourseCard from '@/components/home/CourseCard';
import CategoryCard from '@/components/home/CategoryCard';

import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { categories, recommendedCourses } from '../data/home';

export default function HomeScreen() {
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
          <FlatList
            data={recommendedCourses}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CourseCard {...item} />}
          />
        </View>

        <View style={styles.categoriesSection}>
          <SectionHeader title="Top Categories" />
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    width: '50%',
    paddingHorizontal: Spacing.sm, // مسافة بين الكرتين
    paddingBottom: Spacing.md,     // مسافة بين الصفوف
  },
});