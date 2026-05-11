import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";

type Props = {
  courseId: string;
  onPress: () => void;
};

export default function FirebaseCoursePreviewCard({ courseId, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Ionicons name="cloud-outline" size={24} color={Colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Open Firebase course</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {courseId}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0E9FF",
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: Typography.body,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
});
