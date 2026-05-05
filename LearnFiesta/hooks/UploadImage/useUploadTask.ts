import { useState } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadImageToStorage } from "@/api/services/firebaseStorage";


export const useUploadTask = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const compressImage = async (uri: string) => {
    return await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1280 } }],
      {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );
  };

  const upload = async (uri: string) => {
    try {
      setLoading(true);

      // 1. compress first
      const compressed = await compressImage(uri);

      // 2. convert to blob
      const response = await fetch(compressed.uri);
      const blob = await response.blob();

      // 3. upload
      const path = `courses/${Date.now()}.jpg`;

      const url = await uploadImageToStorage(
        blob,
        path,
        setProgress
      );

      return url;
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    progress,
    loading,
  };
};