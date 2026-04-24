import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import { useCategoryCoursesScreen } from '@/hooks/useCategoryCoursesScreen';
import CategoryScreenState from '@/components/category/CategoryScreenState';
import CategoryCoursesList from '@/components/category/CategoryCoursesList';
import { Colors } from '@/constants/colors';

export default function CategoryCoursesScreen() {
  const {
    categoryId,
    screenTitle,
    courses,
    isLoading,
    isError,
    isRefetching,
    handleRefetch,
  } = useCategoryCoursesScreen();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: screenTitle }} />

      {!categoryId && (
        <CategoryScreenState
          title="Category not found"
          description="The selected category is invalid or missing."
        />
      )}

      {categoryId && isLoading && (
        <CategoryScreenState loading title="Loading courses..." />
      )}

      {categoryId && isError && (
        <CategoryScreenState
          title="Something went wrong"
          description="We couldn't load the courses for this category."
          actionLabel="Try again"
          onAction={handleRefetch}
        />
      )}

      {categoryId && !isLoading && !isError && courses.length === 0 && (
        <CategoryScreenState
          title="No courses found"
          description="There are no courses in this category yet."
          actionLabel="Refresh"
          onAction={handleRefetch}
        />
      )}

      {categoryId && !isLoading && !isError && courses.length > 0 && (
        <CategoryCoursesList
          courses={courses}
          screenTitle={screenTitle}
          isRefetching={isRefetching}
          onRefresh={handleRefetch}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});