// hooks/useImagePicker.ts
import * as ImagePicker from "expo-image-picker";

export const useImagePicker = () => {
  const pickImage = async (): Promise<string | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (result.canceled) return null;

    return result.assets[0].uri;
  };

  return { pickImage };
};