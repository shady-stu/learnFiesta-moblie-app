import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
export type Enrollment = {
  id: string;
  courseId: string;
  title: string;
  author: string;
  img: string;
  totalLessons: number;
  progress: number;
  lessonsDone: number;
  status: "progress" | "completed";
};
const CourseCard = ({ enrollment }: { enrollment: Enrollment }) => {
  const isDone = enrollment.progress === 100;
  return (
    <View style={s.card}>
     <Image source={{ uri: enrollment.img }} style={s.image} />

      <View style={s.info}>
        <View style={s.row}>
          <Text style={s.title} >{enrollment.title}</Text>
          <Text style={s.lessonsText}>
            {enrollment.lessonsDone} / {enrollment.totalLessons} lessons
          </Text>
        </View>

        <Text style={s.author}>{enrollment.author}</Text>

        <View style={s.bar}>
          <View style={[s.fill, { width: `${enrollment.progress}%` }, isDone && s.fillDone]} />
        </View>

        <View style={s.row}>
          <Text style={[s.progressText, isDone && s.doneText]}>
            {isDone ? "✅ Completed" : `${enrollment.progress}% Complete`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;

const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: Radius.md,
    backgroundColor: Colors.muted,
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
    gap: Spacing.xs,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  author: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  lessonsText: {
    fontSize: Typography.caption,
    color: Colors.border,
  },
  bar: {
    height: 6,
    backgroundColor: Colors.muted,
    borderRadius: Radius.full,
  },
  fill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  fillDone: {
    backgroundColor: Colors.success,
  },
  progressText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  doneText: {
    color: Colors.success,
    fontWeight: "600",
  },
});