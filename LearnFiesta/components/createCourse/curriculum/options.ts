import { MaterialIcons } from "@expo/vector-icons";
import type { LessonType, ResourceType } from "@/api/services/curriculumService";

export type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export const LESSON_TYPES: { label: string; value: LessonType; icon: MaterialIconName }[] = [
  { label: "Video", value: "video", icon: "play-circle-outline" },
  { label: "Article", value: "article", icon: "article" },
  { label: "Quiz", value: "quiz", icon: "quiz" },
];

export const RESOURCE_TYPES: { label: string; value: ResourceType; icon: MaterialIconName }[] = [
  { label: "PDF", value: "pdf", icon: "picture-as-pdf" },
  { label: "Slides", value: "slides", icon: "slideshow" },
  { label: "Link", value: "link", icon: "link" },
  { label: "File", value: "file", icon: "attach-file" },
];

export const getLessonIcon = (type: LessonType): MaterialIconName => {
  if (type === "article") return "article";
  if (type === "quiz") return "quiz";
  return "play-circle-outline";
};
