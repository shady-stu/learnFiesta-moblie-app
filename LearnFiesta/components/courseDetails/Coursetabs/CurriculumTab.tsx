import React from "react";
import { View, Text } from "react-native";
import CourseContentHeader from "@/components/courseDetails/CourseContentHeader";
import SectionCard from "@/components/courseDetails/SectionCard";
import LectureRow from "@/components/courseDetails/ LectureRow";
import { useLessons } from "@/libr/useLessons";
type Props = {
    courseId: string;
};

export default function CurriculumTab({ courseId }: Props) {
    const { data: lessons, isLoading } = useLessons(courseId);
    if (isLoading) {
        return <Text>Loading lessons...</Text>;
    }

    if (!lessons || lessons.length === 0) {
        return <Text>No lessons available</Text>;
    }

    // group lessons by section
    const groupedLessons = lessons.reduce((acc, lesson) => {
        if (!acc[lesson.section]) {
            acc[lesson.section] = [];
        }

        acc[lesson.section].push(lesson);

        return acc;
    }, {} as Record<string, typeof lessons>);

    const sections = Object.entries(groupedLessons);

    return (
        <View>
            <CourseContentHeader
                sectionCount={sections.length}
                lectureCount={lessons.length}
            />

            {sections.map(([sectionName, sectionLessons], index) => (
                <SectionCard
                    key={sectionName}
                    number={index + 1}
                    title={sectionName}
                    defaultExpanded={index === 0}
                >
                    {sectionLessons
                        .sort((a, b) => a.order - b.order)
                        .map((lesson) => (
                            <LectureRow
                                key={lesson.id}
                                title={lesson.title}
                                duration={lesson.duration || ""}
                                type={lesson.type}
                                isLocked={lesson.isLocked}
                            />
                        ))}
                </SectionCard>
            ))}
        </View>
    );
}