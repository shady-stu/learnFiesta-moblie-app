import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import CourseCard from '@/components/home/CourseCard';
import CategoryHeader from './CategoryHeader';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import type { Course } from '@/types/course';

type Props = {
  courses: Course[];
  screenTitle: string;
  isRefetching: boolean;
  onRefresh: () => void;
};

export default function CategoryCoursesList({
  courses,
  screenTitle,
  isRefetching,
  onRefresh,
}: Props) {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <CategoryHeader title={screenTitle} count={courses.length} />
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
        />
      }
      renderItem={({ item }) => (
        <CourseCard
          title={item.title}
          instructor={item.instructorName}
          rating={item.rating}
          reviews={String(item.reviewsCount)}
          price={item.price}
          image={item.imageUrl}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  separator: {
    height: Spacing.md,
  },
});