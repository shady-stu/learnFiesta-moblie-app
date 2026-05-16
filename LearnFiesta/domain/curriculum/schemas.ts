import { z } from "zod";

// Simple schema for section form
export const sectionFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Add a clear title for this section.")
    .max(120, "Section title is too long."),
});

// Each resource row in the lesson form
const resourceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Resource title is required."),
  type: z.enum(["pdf", "slides", "link", "file"]),
  url: z.string().min(1, "Resource URL is required."),
});

// Each Q&A row in the lesson form
const qaSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Question is required."),
  answer: z.string().min(1, "Answer is required."),
});

// Main lesson form schema
export const lessonFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Use at least 3 characters for the lesson title.")
    .max(160, "Lesson title is too long."),
  type: z.enum(["video", "article", "quiz"]),
  // Keep duration as text in the form, but validate as a positive number
  durationMinutes: z
    .string()
    .trim()
    .min(1, "Enter the lesson duration in minutes.")
    .refine((value) => {
      const minutes = Number(value);
      return Number.isFinite(minutes) && minutes > 0;
    }, "Duration must be a positive number."),
  description: z
    .string()
    .trim()
    .min(10, "Describe the lesson in at least 10 characters."),
  contentUrl: z.string(),
  keyConceptsText: z.string(),
  qa: z.array(qaSchema),
  resources: z.array(resourceSchema),
});

export type SectionFormValues = z.infer<typeof sectionFormSchema>;
export type LessonFormValues = z.infer<typeof lessonFormSchema>;
