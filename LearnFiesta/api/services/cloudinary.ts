export const uploadToCloudinary = async (imageUri: string) => {
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    name: "upload.jpg",
    type: "image/jpeg",
  } as any);

  formData.append("upload_preset", "learnfiesta_upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dbnklkkl8/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  return JSON.parse(text);
};