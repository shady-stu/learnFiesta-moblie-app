import React from "react";
import { View } from "react-native";
import CourseContentHeader from "@/components/courseDetails/CourseContentHeader";
import SectionCard from "@/components/courseDetails/ SectionCard";
import LectureRow from "@/components/courseDetails/ LectureRow";

export default function CurriculumTab() {
    return (
        <View>
            <CourseContentHeader sectionCount={12} lectureCount={142} />

            <SectionCard number={1} title="Introduction to UI/UX Design">
                <LectureRow title="What is UI/UX?" duration="05:24" type="video" isLocked={false} />
                <LectureRow title="Design Thinking Overview" duration="08:10" type="video" isLocked />
                <LectureRow title="Tools of the Trade" type="article" isLocked />
            </SectionCard>

            <SectionCard number={2} title="Wireframing & Prototyping" defaultExpanded={false}>
                <LectureRow title="Low-fidelity Wireframes" duration="10:00" type="quiz" isLocked />
            </SectionCard>
        </View>
    );
}