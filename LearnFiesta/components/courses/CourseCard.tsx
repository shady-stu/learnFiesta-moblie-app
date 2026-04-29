import { Pressable, Image, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { Enrollment } from "@/types/Enrollment";

type Props = {
  enrollment: Enrollment;
  onPress?: () => void;  
};

export default function CourseCard({ enrollment, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Image source={{ uri: enrollment.img }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{enrollment.title}</Text>
        <Text style={styles.author}>{enrollment.author}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Progress: {enrollment.progress}%</Text>
          <Text style={styles.lessonsText}>{enrollment.lessonsDone}/{enrollment.totalLessons} lessons</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: Radius.sm,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  content: { flex: 1, justifyContent: "center" },
  title: { fontWeight: "700", fontSize: 16, color: "#111827", marginBottom: 4 },
  author: { fontSize: 12, color: "#6b7280", marginBottom: 6 },
  progressContainer: { flexDirection: "row", justifyContent: "space-between" },
  progressText: { fontSize: 12, color: Colors.primary },
  lessonsText: { fontSize: 12, color: "#9ca3af" },
  cardPressed: { backgroundColor: "#f3f4f6", transform: [{ scale: 0.98 }] },
});