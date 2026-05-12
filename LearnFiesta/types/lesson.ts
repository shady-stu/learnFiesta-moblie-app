export type LessonType = | "video" | "article" | "quiz";

export type Lesson = {
    id: string;
    courseId: string;
    section: string;
    title: string;
    duration?: string;
    type: LessonType;
    isLocked: boolean;
    order: number;
};

export type ResourceType = "pdf" | "slides";

export type Resource = {
    id: string;
    courseId: string;
    title: string;
    type: ResourceType;
    url: string;
};