import { Text, View } from "react-native";
import { Image } from "expo-image";
import ImageUploader from "@/components/upload/ImageUploader";
import { foundationStyles as styles } from "./styles";

type Props = {
  thumbnail?: string;
  error?: string;
  onUploaded: (url: string) => void;
};

export default function ThumbnailCard({ thumbnail, error, onUploaded }: Props) {
  return (
    <View style={styles.cardSmall}>
      <Text style={styles.sectionTitle}>Course Thumbnail</Text>

      <ImageUploader onUploaded={onUploaded} />

      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnailPreview} />
      ) : null}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
