import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CourseHeader from "@/components/courseDetails/CourseHeader";
import VideoPreview from "@/components/courseDetails/VideoPreview";
import CourseHeaderInfo from "@/components/courseDetails/CourseHeaderInfo";
import InstructorCard from "@/components/courseDetails/InstructorCard";
import CourseTabs from "@/components/courseDetails/CourseTabs";
import EnrollBottomBar from "@/components/courseDetails/ EnrollBottomBar";
import { Course } from "@/types/course";
import Price from "@/components/ui/Price";
import { SafeAreaView } from "react-native-safe-area-context";
import CurriculumTab from "@/components/courseDetails/Coursetabs/CurriculumTab";
import ResourcesTab from "@/components/courseDetails/Coursetabs/ResourcesTab";
import LearnTab from "@/components/courseDetails/Coursetabs/LearnTab";
import DescriptionTab from "@/components/courseDetails/Coursetabs/DescriptionTab";
import {router} from "expo-router";

const TABS = ["Curriculum", "Resources","What you'll learn","description"];
export const mockCourse: Course = {
    id: "course_001",
    title: "LearnFiesta: Complete UI/UX Design Masterclass",
    instructorId: "inst_001",
    instructorName: "Jane Doe",
    duration: "15h 30m",
    rating: 4.8,
    reviewsCount: 1240,
    price: 49.99,
    oldPrice: 84.99,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdDfXAEDJ6wMxM3-AyjOCrSdF6g_XFqtLPnFdj6aE83IIumWvgFc3GskhyLs45i0WXCsZqwWFS3C3BlRMBRzcAT44GAK2dvfE3qth9Pj7bN72L7VWnD-Cf3_MYbAP3Ar4ipJPGHkF3tAhbFQw6LIo37PwI4VGbCneM5PACjj4VsyBAZEZndskEDt0ZRZtNx3ywoJnRXjBNtuELaAW-Z_3IDv3wY6_fNbU3OWDygkjfWNyugLE4PfDZPAjaPjpEdlA3BwQNTgwzaNg",
    badge: "Bestseller",
};
export default function CourseDetailsScreen() {
    const [activeTab, setActiveTab] = useState("Curriculum");
    const renderTabContent = () => {
        if (activeTab === "Curriculum") return <CurriculumTab />;
        if (activeTab === "Resources") return <ResourcesTab />;
        if (activeTab === "What you'll learn") return <LearnTab />;
        if (activeTab === "description") return <DescriptionTab />;
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <CourseHeader
                title="Course Details"
                onBack={() => router.replace("/")}
                onShare={() => {}}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <VideoPreview imageUrl={mockCourse.imageUrl} onPlay={() => {}} />

                <CourseHeaderInfo
                    title={mockCourse.title}
                    badge={mockCourse.badge}
                    category="UI/UX Design"
                    rating={mockCourse.rating}
                    reviewsCount={mockCourse.reviewsCount}
                />

                <InstructorCard
                    name={mockCourse.instructorName}
                    role="Lead Product Designer"
                    avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCtr-1ggOUroeTACOvrWUNi_YHGgDUjbBqOJ1cnl9JR8LZZjBhc9ikuAczKFev_Uef40VOhGq-N0nvaKZvWlcCzR76lqaOCC8ICRllE3wby7TO-0-ztI43rtPthhTUikAzjU-OblYeF1k_LoKDYdXH6X1o8UUasS1ZdQabHSD7AwGe8B7ASN-iosYF5VXq29Cjz4cD9_qCEp3_CxwL1LvBfG3SzJiMEov4wSfUIG7itzZYAxdmxS7gZ77DW2Cy8OiLKmC6IqWNyPKc"
                    onFollow={() => {}}
                />

                <View style={styles.priceSection}>
                    <Price
                        price={mockCourse.price}
                        oldPrice={mockCourse.oldPrice}
                    />
                </View>

                <CourseTabs
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <View style={styles.content}>
                    {renderTabContent()}
                </View>
            </ScrollView>

            <EnrollBottomBar onEnroll={() => {}} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f6f8",

    },
    content: {
        padding: 16,
    },
    priceSection: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
    },

    discountBadge: {
        backgroundColor: "#10b981",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },

    discountText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700",
    },
});