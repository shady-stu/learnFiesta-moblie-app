import {
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Pressable,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';

import CourseCard from '@/components/home/CourseCard';
import { useCoursesByCategory } from '@/hooks/useCoursesByCategory';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

type ScreenStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
};

function ScreenState({
  title,
  description,
  actionLabel,
  onAction,
  loading = false,
}: ScreenStateProps) {
  return (
    <View style={styles.centered}>
      {loading ? <ActivityIndicator size="large" color={Colors.primary} /> : null}

      <Text style={styles.stateTitle}>{title}</Text>

      {description ? (
        <Text style={styles.stateDescription}>{description}</Text>
      ) : null}

      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
        >
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default function CategoryCourses() {
  const { id, title } = useLocalSearchParams<{
    id?: string;
    title?: string;
  }>();

  const categoryId = id?.trim() ?? '';
  const screenTitle = title || 'Courses';

  const {
    data: courses = [],
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useCoursesByCategory(categoryId);

  if (!categoryId) {
    return (
      <>
        <Stack.Screen options={{ title: screenTitle }} />
        <SafeAreaView style={styles.container} edges={['bottom']}>
          <ScreenState
            title="Category not found"
            description="The selected category is invalid or missing."
          />
        </SafeAreaView>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: screenTitle }} />
        <SafeAreaView style={styles.container} edges={['bottom']}>
          <ScreenState
            loading
            title="Loading courses..."
            description="Please wait a moment."
          />
        </SafeAreaView>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Stack.Screen options={{ title: screenTitle }} />
        <SafeAreaView style={styles.container} edges={['bottom']}>
          <ScreenState
            title="Something went wrong"
            description="We couldn't load the courses for this category."
            actionLabel="Try again"
            onAction={() => {
              void refetch();
            }}
          />
        </SafeAreaView>
      </>
    );
  }

  if (courses.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: screenTitle }} />
        <SafeAreaView style={styles.container} edges={['bottom']}>
          <ScreenState
            title="No courses found"
            description="There are no courses in this category yet."
            actionLabel="Refresh"
            onAction={() => {
              void refetch();
            }}
          />
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: screenTitle }} />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <FlatList
          data={courses}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => {
                void refetch();
              }}
              tintColor={Colors.primary}
            />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>{screenTitle}</Text>
              <Text style={styles.subtitle}>
                {courses.length} {courses.length === 1 ? 'course' : 'courses'} available
              </Text>
            </View>
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
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  stateTitle: {
    marginTop: Spacing.md,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  stateDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 320,
  },
  actionButton: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonPressed: {
    opacity: 0.85,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  separator: {
    height: Spacing.md,
  },
}); 