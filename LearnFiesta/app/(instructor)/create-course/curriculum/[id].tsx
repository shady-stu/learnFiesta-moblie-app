import { Alert, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AddSectionButton from "@/components/createCourse/curriculum/AddSectionButton";
import CurriculumEmptyState from "@/components/createCourse/curriculum/CurriculumEmptyState";
import CurriculumFooter from "@/components/createCourse/curriculum/CurriculumFooter";
import CurriculumHeader from "@/components/createCourse/curriculum/CurriculumHeader";
import CurriculumSectionCard from "@/components/createCourse/curriculum/CurriculumSectionCard";
import CurriculumStateView from "@/components/createCourse/curriculum/CurriculumStateView";
import LessonFormModal from "@/components/createCourse/curriculum/LessonFormModal";
import SectionFormModal from "@/components/createCourse/curriculum/SectionFormModal";
import { curriculumStyles as styles } from "@/components/createCourse/curriculum/styles";
import type { CurriculumLesson, CurriculumSection } from "@/api/services/curriculumService";
import { useCourseCurriculum } from "@/hooks/useCourseCurriculum";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export default function CurriculumBuilderScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const courseId = Array.isArray(id) ? id[0] : id;
  const curriculum = useCourseCurriculum(courseId);

  const handleSaveSection = async () => {
    try {
      await curriculum.saveSection();
    } catch (error) {
      Alert.alert("Save failed", getErrorMessage(error, "Unable to save section."));
    }
  };

  const handleDeleteSection = (section: CurriculumSection) => {
    Alert.alert(
      "Delete section?",
      "This removes the section, its lessons, and the linked resources.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await curriculum.removeSection(section.id);
            } catch (error) {
              Alert.alert("Delete failed", getErrorMessage(error, "Unable to delete section."));
            }
          },
        },
      ]
    );
  };

  const handleSaveLesson = async () => {
    try {
      await curriculum.saveLesson();
    } catch (error) {
      Alert.alert("Save failed", getErrorMessage(error, "Unable to save lesson."));
    }
  };

  const handleDeleteLesson = (sectionId: string, lesson: CurriculumLesson) => {
    Alert.alert("Delete lesson?", "This also removes its linked resources.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await curriculum.removeLesson(sectionId, lesson.id);
          } catch (error) {
            Alert.alert("Delete failed", getErrorMessage(error, "Unable to delete lesson."));
          }
        },
      },
    ]);
  };

  const handlePublish = async () => {
    try {
      await curriculum.publishCourse();
      Alert.alert("Course published", "The course is now active and ready for students.", [
        {
          text: "View courses",
          onPress: () => router.replace("/(instructor)/InstructorCourses"),
        },
        { text: "Stay here", style: "cancel" },
      ]);
    } catch (error) {
      Alert.alert("Publish failed", getErrorMessage(error, "Unable to publish course."));
    }
  };

  if (curriculum.loading || curriculum.error) {
    return <CurriculumStateView error={curriculum.error} />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CurriculumHeader
          sectionCount={curriculum.sections.length}
          totalLessons={curriculum.totalLessons}
          totalMinutes={curriculum.totalMinutes}
        />

        {curriculum.sections.length === 0 ? (
          <CurriculumEmptyState onAddSection={curriculum.openAddSection} />
        ) : (
          curriculum.sections.map((section, index) => (
            <CurriculumSectionCard
              key={section.id}
              section={section}
              index={index}
              disabled={curriculum.saving}
              onAddLesson={curriculum.openLessonEditor}
              onEditLesson={curriculum.openLessonEditor}
              onDeleteLesson={handleDeleteLesson}
              onEditSection={curriculum.openEditSection}
              onDeleteSection={handleDeleteSection}
            />
          ))
        )}

        {curriculum.sections.length > 0 && (
          <AddSectionButton
            disabled={curriculum.saving}
            onPress={curriculum.openAddSection}
          />
        )}
      </ScrollView>

      <CurriculumFooter
        saving={curriculum.saving}
        disabled={curriculum.saving || curriculum.totalLessons === 0}
        onPublish={handlePublish}
      />

      <SectionFormModal
        visible={curriculum.sectionModalVisible}
        saving={curriculum.saving}
        title={curriculum.sectionTitle}
        editingSection={curriculum.editingSection}
        onChangeTitle={curriculum.setSectionTitle}
        onClose={curriculum.closeSectionModal}
        onSave={handleSaveSection}
      />

      <LessonFormModal
        editor={curriculum.lessonEditor}
        form={curriculum.lessonForm}
        saving={curriculum.saving}
        onClose={curriculum.closeLessonEditor}
        onSave={handleSaveLesson}
        onAddResource={curriculum.addResourceRow}
        onRemoveResource={curriculum.removeResourceRow}
        onChangeLessonField={curriculum.setLessonField}
        onChangeResourceField={curriculum.setResourceField}
      />
    </View>
  );
}
