import NavigationHeader from "@/components/common/NavigationHeader";
import LessonInfo from "@/components/lesson/LessonInfo";
import TabsSection from "@/components/lesson/TabsSection";
import VideoPlayer from "@/components/lesson/VideoPlayer";
import LoadingView from "@/components/ui/LoadingView";
import { useLesson } from "@/hooks/useLesson";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LessonDetailScreen() {
  const { id, courseId } = useLocalSearchParams<{ id?: string; courseId?: string }>();
  const lessonId = Array.isArray(id) ? id[0] : id;
  const currentCourseId = Array.isArray(courseId) ? courseId[0] : courseId;
  const { lesson, isLoading, isError } = useLesson({
    id: lessonId,
    courseId: currentCourseId,
  });

  if (isLoading) return <LoadingView />;

  if (isError || !lesson) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NavigationHeader title="Course Details" />
        <Text>The lesson is not available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <NavigationHeader title={lesson.title} />
      <ScrollView>
        <VideoPlayer thumbnail={lesson.thumbnail} videoUrl={lesson.videoUrl} />
        <LessonInfo
          module={lesson.module}
          duration={lesson.duration}
          title={lesson.title}
          description={lesson.description}
          courseId={lesson.courseId}
          prevLessonId={lesson.prevLessonId}
          nextLessonId={lesson.nextLessonId}
        />
        <TabsSection
          notes={lesson.notes}
          keyConcepts={lesson.keyConcepts}
          resources={lesson.resources}
          qa={lesson.qa}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
