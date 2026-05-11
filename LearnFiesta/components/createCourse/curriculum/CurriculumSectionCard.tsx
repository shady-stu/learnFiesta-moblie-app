import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import type { CurriculumLesson, CurriculumSection } from "@/api/services/curriculumService";
import { getLessonIcon } from "./options";
import { curriculumStyles as styles } from "./styles";

type Props = {
  section: CurriculumSection;
  index: number;
  disabled?: boolean;
  onAddLesson: (sectionId: string) => void;
  onEditLesson: (sectionId: string, lesson: CurriculumLesson) => void;
  onDeleteLesson: (sectionId: string, lesson: CurriculumLesson) => void;
  onEditSection: (section: CurriculumSection) => void;
  onDeleteSection: (section: CurriculumSection) => void;
};

export default function CurriculumSectionCard({
  section,
  index,
  disabled,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onEditSection,
  onDeleteSection,
}: Props) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionNumber}>
          <Text style={styles.sectionNumberText}>{index + 1}</Text>
        </View>

        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionMeta}>{section.lessons.length} lessons</Text>
        </View>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onEditSection(section)}
          disabled={disabled}
        >
          <MaterialIcons name="edit" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onDeleteSection(section)}
          disabled={disabled}
        >
          <MaterialIcons name="delete-outline" size={21} color="#ba1a1a" />
        </TouchableOpacity>
      </View>

      {section.lessons.length === 0 ? (
        <View style={styles.sectionEmpty}>
          <Text style={styles.sectionEmptyText}>No lessons yet.</Text>
        </View>
      ) : (
        section.lessons.map((lesson) => (
          <View key={lesson.id} style={styles.lessonItem}>
            <View style={styles.lessonIcon}>
              <MaterialIcons
                name={getLessonIcon(lesson.type)}
                size={22}
                color={Colors.primary}
              />
            </View>

            <View style={styles.lessonBody}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonMeta}>
                {lesson.duration} - {lesson.type}
                {lesson.resources.length
                  ? ` - ${lesson.resources.length} resources`
                  : ""}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onEditLesson(section.id, lesson)}
              disabled={disabled}
            >
              <MaterialIcons name="edit" size={19} color={Colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onDeleteLesson(section.id, lesson)}
              disabled={disabled}
            >
              <MaterialIcons name="delete-outline" size={20} color="#ba1a1a" />
            </TouchableOpacity>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.addLessonButton}
        onPress={() => onAddLesson(section.id)}
        disabled={disabled}
      >
        <MaterialIcons name="add" size={20} color={Colors.primary} />
        <Text style={styles.addLessonText}>Add lesson</Text>
      </TouchableOpacity>
    </View>
  );
}
