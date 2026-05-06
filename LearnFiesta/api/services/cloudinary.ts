export const uploadToCloudinary = async (imageUri: string) => {
  const data = new FormData();

  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "photo.jpg",
  } as any);

  data.append("upload_preset", "learnfiesta_upload");
  data.append("cloud_name", "dbnklkk18");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dbnklkk18/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  console.log("CLOUDINARY RESPONSE:", result);

  if (!result.secure_url) {
    throw new Error("Upload failed");
  }

  return result.secure_url;
};