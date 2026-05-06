import React from "react";
import { View, ScrollView, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";

import TextInputField from "@/components/inputs/TextInputField";
import SelectField from "@/components/inputs/SelectField";
import TextAreaField from "@/components/inputs/TextAreaField";
import ImageUploader from "@/components/upload/ImageUploader";
import { useCreateCourse } from "@/hooks/useCreateCourse";

type FormData = {
  title: string;
  category: string;
  description: string;
  price: number;
  thumbnail?: string;
};

export const CreateCourseScreen = () => {
  const { control, handleSubmit, setValue } = useForm<FormData>();

  const { mutateAsync, isPending } = useCreateCourse();

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync({
        ...data,
      });

      alert("Course created successfully");
    } catch (e) {
      alert("Failed to create course");
    }
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Create Course
      </Text>

  
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInputField
            label="Title"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

    
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <SelectField
            label="Category"
            value={field.value}
            onChange={field.onChange}
            options={[
              { label: "Design", value: "design" },
              { label: "Development", value: "dev" },
            ]}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextAreaField
            label="Description"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

   
      <ImageUploader
        onUploaded={(url: string) => {
          setValue("thumbnail", url as any);
        }}
      />

      
      <Button
        title={isPending ? "Creating..." : "Create Course"}
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
};