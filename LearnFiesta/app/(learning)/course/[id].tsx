import React, { useState } from "react";
import {View, ScrollView, StyleSheet, Text, ActivityIndicator} from "react-native";
import CourseHeader from "@/components/courseDetails/CourseHeader";
import VideoPreview from "@/components/courseDetails/VideoPreview";
import CourseHeaderInfo from "@/components/courseDetails/CourseHeaderInfo";
import InstructorCard from "@/components/courseDetails/InstructorCard";
import CourseTabs from "@/components/courseDetails/CourseTabs";
import EnrollBottomBar from "@/components/courseDetails/ EnrollBottomBar";
import Price from "@/components/ui/Price";
import { SafeAreaView } from "react-native-safe-area-context";
import CurriculumTab from "@/components/courseDetails/Coursetabs/CurriculumTab";
import ResourcesTab from "@/components/courseDetails/Coursetabs/ResourcesTab";
import LearnTab from "@/components/courseDetails/Coursetabs/LearnTab";
import DescriptionTab from "@/components/courseDetails/Coursetabs/DescriptionTab";
import {router, useLocalSearchParams, useRouter} from "expo-router";
import {useCourseById} from "@/libr/useCourseById";
const TABS = ["Curriculum", "Resources", "What you'll learn", "Description",];

export default function CourseDetailsScreen() {
    const [activeTab, setActiveTab] = useState("Curriculum");
    const { id } = useLocalSearchParams();
    const { data: course, isLoading } = useCourseById(id as string);
    const router = useRouter();
    const renderTabContent = () => {
        if (!course) return null;

        if (activeTab === "Curriculum") { return <CurriculumTab courseId={course.id} />; }
        if (activeTab === "Resources") { return <ResourcesTab courseId={course.id}/>; }
        if (activeTab === "What you'll learn") { return ( <LearnTab items={course.whatYouWillLearn || []} /> ); }
        if (activeTab === "Description") { return ( <DescriptionTab description={course.description || ""}/> ); }


    };

    if (isLoading) {
     return (
          <SafeAreaView style={styles.loadingContainer}>
             <ActivityIndicator size="large" color="#5523d1" />
        </SafeAreaView>
        );
     }

    if (!course) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text>Course not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <CourseHeader
                title="Course Details"
                onBack={() => router.replace("/")}
                onShare={() => {}}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <VideoPreview
                    imageUrl={course.imageUrl}
                    onPlay={() => {}}
                />

                <CourseHeaderInfo
                    title={course.title}
                    badge={course.badge}
                    category={course.categoryName}
                    rating={course.rating}
                    reviewsCount={course.reviewsCount}
                />

                <InstructorCard
                    name={course.instructorName}
                    role="Instructor"
                    avatarUrl="https://i.pravatar.cc/150?img=12"
                    onFollow={() => {}}
                />

                <View style={styles.priceSection}>
                    <Price price={course.price} />
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

            <EnrollBottomBar
                onEnroll={() => router.push("/checkout")}
            />
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});