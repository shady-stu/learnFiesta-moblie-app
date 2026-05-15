import { Text, View } from "react-native";
import { foundationStyles as styles } from "./styles";

type Props = {
  isEditing: boolean;
};

export default function CourseFoundationHeader({ isEditing }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.step}>STEP 1</Text>
      <Text style={styles.title}>
        {isEditing ? "Edit Course Foundations" : "Course Foundations"}
      </Text>
      <Text style={styles.subtitle}>
        {isEditing
          ? "Update the basic details for this course"
          : "Set up the basic details for your new course"}
      </Text>
    </View>
  );
}
