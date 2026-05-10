import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { formatDuration } from "@/api/services/curriculumService";
import { curriculumStyles as styles } from "./styles";

type Props = {
  sectionCount: number;
  totalLessons: number;
  totalMinutes: number;
};

export default function CurriculumHeader({
  sectionCount,
  totalLessons,
  totalMinutes,
}: Props) {
  return (
    <>
      <View style={styles.stepperContainer}>
        <View style={styles.stepCompleted}>
          <MaterialIcons name="check" size={16} color={Colors.white} />
        </View>
        <Text style={styles.stepTextCompleted}>1. Foundations</Text>
        <View style={styles.line} />
        <View style={styles.stepActive}>
          <Text style={styles.stepTextActive}>2</Text>
        </View>
        <Text style={styles.stepTitleActive}>Curriculum</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.kicker}>STEP 2</Text>
        <Text style={styles.title}>Build the course curriculum</Text>
        <Text style={styles.subtitle}>
          Add sections, lessons, and lesson resources before publishing.
        </Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{sectionCount}</Text>
          <Text style={styles.metricLabel}>Sections</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{totalLessons}</Text>
          <Text style={styles.metricLabel}>Lessons</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatDuration(totalMinutes)}</Text>
          <Text style={styles.metricLabel}>Duration</Text>
        </View>
      </View>
    </>
  );
}
