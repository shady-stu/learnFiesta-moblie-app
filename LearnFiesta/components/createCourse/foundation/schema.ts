import * as z from "zod";

export const courseFoundationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  whatYouWillLearn: z
    .array(z.string().trim().min(3, "Learning point must be at least 3 characters"))
    .min(1, "Add at least one learning point"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
      message: "Price must be a valid number greater than 0",
    }),
  thumbnail: z.string().optional(),
});

export type CourseFoundationFormData = z.infer<typeof courseFoundationSchema>;

export const courseFoundationDefaultValues: CourseFoundationFormData = {
  title: "",
  category: "",
  description: "",
  whatYouWillLearn: [""],
  price: "",
  thumbnail: undefined,
};
