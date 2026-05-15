import { Alert, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { useCourseCurriculum } from "@/hooks/curriculum/useCourseCurriculum";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export default function CurriculumBuilderScreen() {
  const router = useRouter();
  const { id, mode } = useLocalSearchParams<{ id?: string; mode?: string }>();
  const courseId = Array.isArray(id) ? id[0] : id;
  const curriculumMode = Array.isArray(mode) ? mode[0] : mode;
  const isEditing = curriculumMode === "edit";
  const curriculum = useCourseCurriculum(courseId);
  const { sectionsState, sectionActions, lessonEditorState, publishing, saving } = curriculum;

  const handleSaveSection = async () => {
    try {
      await sectionActions.saveSection();
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
              await sectionActions.removeSection(section.id);
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
      await lessonEditorState.saveLesson();
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
            await lessonEditorState.removeLesson(sectionId, lesson.id);
          } catch (error) {
            Alert.alert("Delete failed", getErrorMessage(error, "Unable to delete lesson."));
          }
        },
      },
    ]);
  };

  const handlePublish = async () => {
    try {
      await publishing.publishCourse();
      Alert.alert("Course published", "The course is now active and ready for students.", [
        {
          text: "Go to courses",
          onPress: () => router.replace("/(instructor)/InstructorCourses"),
        },
      ]);
    } catch (error) {
      Alert.alert("Publish failed", getErrorMessage(error, "Unable to publish course."));
    }
  };

  if (sectionsState.loading || sectionsState.error) {
    return <CurriculumStateView error={sectionsState.error} />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CurriculumHeader
          mode={isEditing ? "edit" : "create"}
          sectionCount={sectionsState.sections.length}
          totalLessons={sectionsState.totalLessons}
          totalMinutes={sectionsState.totalMinutes}
        />

        {sectionsState.sections.length === 0 ? (
          <CurriculumEmptyState onAddSection={sectionActions.openAddSection} />
        ) : (
          sectionsState.sections.map((section, index) => (
            <CurriculumSectionCard
              key={section.id}
              section={section}
              index={index}
              disabled={saving}
              onAddLesson={lessonEditorState.openLessonEditor}
              onEditLesson={lessonEditorState.openLessonEditor}
              onDeleteLesson={handleDeleteLesson}
              onEditSection={sectionActions.openEditSection}
              onDeleteSection={handleDeleteSection}
            />
          ))
        )}

        {sectionsState.sections.length > 0 && (
          <AddSectionButton
            disabled={saving}
            onPress={sectionActions.openAddSection}
          />
        )}
      </ScrollView>

      <CurriculumFooter
        saving={saving}
        disabled={saving || sectionsState.totalLessons === 0}
        onPublish={handlePublish}
      />

      <SectionFormModal
        visible={sectionActions.sectionModalVisible}
        saving={saving}
        title={sectionActions.sectionTitle}
        titleError={sectionActions.sectionTitleError}
        editingSection={sectionActions.editingSection}
        onChangeTitle={sectionActions.setSectionTitle}
        onClose={sectionActions.closeSectionModal}
        onSave={handleSaveSection}
      />

      <LessonFormModal
        editor={lessonEditorState.lessonEditor}
        form={lessonEditorState.lessonForm}
        errors={lessonEditorState.errors}
        saving={saving}
        onClose={lessonEditorState.closeLessonEditor}
        onSave={handleSaveLesson}
        onAddQa={lessonEditorState.addQaRow}
        onRemoveQa={lessonEditorState.removeQaRow}
        onChangeQaField={lessonEditorState.setQaField}
        onAddResource={lessonEditorState.addResourceRow}
        onRemoveResource={lessonEditorState.removeResourceRow}
        onChangeLessonField={lessonEditorState.setLessonField}
        onChangeResourceField={lessonEditorState.setResourceField}
      />
    </View>
  );
}
