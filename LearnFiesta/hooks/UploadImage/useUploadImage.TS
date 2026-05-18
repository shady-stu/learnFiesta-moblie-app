import { Alert } from "react-native";
import { useImagePicker } from "./useImagePicker";
import { useUploadTask } from "./useUploadTask";
export const useUploadImage = () => {
  const { pickImage } = useImagePicker();
  const { upload, progress, loading } = useUploadTask();

  const pickAndUpload = async () => {
    try {
      const uri = await pickImage();
      if (!uri) return null;

      const url = await upload(uri);
      return url;
    } catch (e) {
      Alert.alert("Upload failed");
      return null;
    }
  };

  return {
    pickAndUpload,
    progress,
    loading,
  };
};
