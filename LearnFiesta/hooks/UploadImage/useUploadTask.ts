import { useState } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadToCloudinary } from "@/api/upload/cloudinary";

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

      // 1️⃣ compress image
      const compressed = await compressImage(uri);

      // fake progress
      setProgress(30);

      // 2️⃣ upload to cloudinary
      const url = await uploadToCloudinary(compressed.uri);

      setProgress(100);

      return url;
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      return null;
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