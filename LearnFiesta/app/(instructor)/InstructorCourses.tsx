import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import InstructorCard from '@/components/InstructorCard';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { Radius } from '@/constants/radius';


const InstructorCourses = () => {
  const courses = [
    {
      title: 'Advanced Python: True Automation at AI',
      students: 1863,
      revenue: '$146',
      rating: 4.3,
      isActive: false,
      imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop',
    },
    {
      title: 'Mastering Modern UI/UX: Design Systems 2024',
      students: 1248,
      revenue: '$18.4k',
      rating: 4.9,
      isActive: true,
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    },
    {
      title: 'Financial Freedom: Data-Driven Investing',
      students: 0,
      revenue: '$741',
      rating: 0,
      isActive: false,
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Instructor Courses</Text>
          <Text style={styles.headerSubtitle}>
            Manage and monitor your educational content performance.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Active Courses</Text>
        {courses.filter(c => c.isActive).map((course) => (
          <InstructorCard key={course.title} {...course} />
        ))}

        <Text style={styles.sectionTitle}>Other Courses</Text>
        {courses.filter(c => !c.isActive).map((course) => (
          <InstructorCard key={course.title} {...course} />
        ))}

        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Your Statistics</Text>
          <Text style={styles.performanceSubtitle}>
            Each instructor has their own course performance overview.
          </Text>
          <View style={styles.perfGrid}>
            <View style={styles.perfGridItem}>
              <Text style={styles.perfGridLabel}>TOTAL STUDENTS</Text>
              <Text style={styles.perfGridValue}>3,111</Text>
            </View>
            <View style={styles.perfGridItem}>
              <Text style={styles.perfGridLabel}>ACTIVE COURSES</Text>
              <Text style={styles.perfGridValue}>1</Text>
            </View>
            <View style={styles.perfGridItem}>
              <Text style={styles.perfGridLabel}>TOTAL REVENUE</Text>
              <Text style={styles.perfGridValue}>$19,287</Text>
            </View>
            <View style={styles.perfGridItem}>
              <Text style={styles.perfGridLabel}>INACTIVE COURSES</Text>
              <Text style={styles.perfGridValue}>2</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.title,
    fontWeight: '700',
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
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  performanceCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  performanceTitle: {
    fontSize: Typography.subheading,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  performanceSubtitle: {
    fontSize: Typography.caption,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: Spacing.lg,
  },
  perfGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
 perfGridItem: {
  width: "48%",
  marginBottom: 16,
},
  perfGridLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: Spacing.xs,
  },
  perfGridValue: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: Spacing.xl,
    width: 60,
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 28,
    color: Colors.white,
  },
});

export default InstructorCourses;