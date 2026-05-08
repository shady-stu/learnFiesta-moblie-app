import { lessons } from '@/app/data/lessons';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoPlayer from '@/components/lesson/VideoPlayer';
import LessonInfo from '@/components/lesson/LessonInfo';
import TabsSection from '@/components/lesson/TabsSection';  
import NavigationHeader from '@/components/common/NavigationHeader';

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();console.log("ID القادم من الرابط:", id);
  const lesson = lessons.find((l) => l.id === id);
 
  if (!lesson) {
    return (
      < SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <NavigationHeader title="Course Details" />
        <Text>the course is not available</Text>

        </SafeAreaView>
    );
  }

  const currentIndex = lessons.findIndex((l) => l.id === id);
  const prevLessonId = currentIndex > 0 ? lessons[currentIndex - 1].id : null;
  const nextLessonId = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1].id : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavigationHeader title={lesson.title} />
      <ScrollView>
        <VideoPlayer thumbnail={lesson.thumbnail} videoUrl={lesson.videoUrl} />
        <LessonInfo
          module={lesson.module}
          duration={lesson.duration}
        title={lesson.title}
        description={lesson.description}
        lessonId={lesson.id}
        prevLessonId={prevLessonId}
        nextLessonId={nextLessonId}
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