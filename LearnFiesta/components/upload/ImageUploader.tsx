import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useUploadTask } from "@/hooks/UploadImage/useUploadTask";

interface Props {
  image?: string;
  loading?: boolean;
  progress?: number;
  error?: string | null;
  onUploaded?: (url: string) => void;
}

export default function ImageUploader({
  image,
  onUploaded,
}: Props) {
  const { upload, loading, progress } = useUploadTask();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    const url = await upload(uri);

    if (url && onUploaded) {
      onUploaded(url);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>Upload Thumbnail</Text>
      )}

      {loading && (
        <Text style={styles.loading}>
          Uploading... {progress}%
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.border,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    overflow: "hidden",
  },

  placeholder: {
    color: Colors.textSecondary,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  loading: {
    position: "absolute",
    bottom: 10,
    color: Colors.primary,
  },
});