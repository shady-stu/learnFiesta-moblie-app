import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationHeader from "@/components/common/NavigationHeader";
import CourseFoundationHeader from "@/components/createCourse/foundation/CourseFoundationHeader";
import FoundationDetailsCard from "@/components/createCourse/foundation/FoundationDetailsCard";
import FoundationFooter from "@/components/createCourse/foundation/FoundationFooter";
import FoundationPricingCard from "@/components/createCourse/foundation/FoundationPricingCard";
import ThumbnailCard from "@/components/createCourse/foundation/ThumbnailCard";
import { foundationStyles as styles } from "@/components/createCourse/foundation/styles";
import LoadingView from "@/components/ui/LoadingView";
import { useCourseFoundationForm } from "@/hooks/createCourse/useCourseFoundationForm";
import KeyboardNavigator from "@/components/common/KeyboardNavigator";

export default function CreateCourseScreen() {
  const foundation = useCourseFoundationForm();

  if (foundation.isLoadingCourse) return <LoadingView />;

  if (foundation.isCourseLoadError) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.errorText}>Failed to load course details.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <NavigationHeader
        title={foundation.isEditing ? "Edit Course" : "Create Course"}
        onBackPress={foundation.goBackToCourses}
      />

      <KeyboardNavigator>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <CourseFoundationHeader isEditing={foundation.isEditing} />

          <FoundationDetailsCard
            control={foundation.control}
            errors={foundation.errors}
            categories={foundation.categories}
            isLoadingCategories={foundation.isLoadingCategories}
            learningPoints={foundation.learningPoints}
            onAddLearningPoint={foundation.addLearningPoint}
            onUpdateLearningPoint={foundation.updateLearningPoint}
            onRemoveLearningPoint={foundation.removeLearningPoint}
          />

          <FoundationPricingCard control={foundation.control} errors={foundation.errors} />

          <ThumbnailCard
            thumbnail={foundation.thumbnail}
            error={foundation.errors.thumbnail?.message}
            onUploaded={foundation.updateThumbnail}
          />

          <FoundationFooter
            isEditing={foundation.isEditing}
            isPending={foundation.isPending}
            onSubmit={foundation.submit}
          />
        </ScrollView>
      </KeyboardNavigator>
    </SafeAreaView>
  );
}
