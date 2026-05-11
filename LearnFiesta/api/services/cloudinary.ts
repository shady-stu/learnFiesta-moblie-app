import { Platform } from "react-native";

export const uploadToCloudinary = async (imageUri: string) => {
    const formData = new FormData();

    formData.append("file", {
        uri:
            Platform.OS === "ios"
                ? imageUri.replace("file://", "")
                : imageUri,
        type: "image/jpeg",
        name: "profile.jpg",
    } as any);

    formData.append("upload_preset", "learnfiesta_upload");

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbnklkkl8/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();

    console.log("CLOUDINARY RESPONSE:", data);

    if (!data.secure_url) {
        throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
};