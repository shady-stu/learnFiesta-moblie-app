import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import SearchInput from "@/components/ui/SearchInput"
import {FilterChip} from "@/components/ui/FilterChip";
import CourseCard  from "@/components/courses/CourseCard";
import {Colors} from "@/constants/colors";
import { useBookmarks } from "@/hooks/bockmark/useBookmarks";
import {useCourses} from "@/hooks/courses/useCourses";
import LoadingView from "@/components/ui/LoadingView";

export default function Search() {
    const { data: courses = [], isLoading, error } = useCourses();
    const [searchText, setSearchText] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { toggleBookmark, isBookmarked, bookmarked} = useBookmarks();

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container} edges={["top"]}>
                <Text>Error loading courses</Text>
            </SafeAreaView>
        );
    }


    const filtered = courses.filter((course) => {

        const matchesSearch =
            course.title.toLowerCase().includes(searchText.toLowerCase()) ||
            course.instructorName.toLowerCase().includes(searchText.toLowerCase());

        if (!matchesSearch) return false;
        if (activeFilter === "All") return true;
        if (activeFilter === "Free") return course.price === 0;
        if (activeFilter === "Top Rated") return course.rating >= 4.5;
        if (activeFilter === "Best seller") return course.badge?.toLowerCase() === "best seller";
        if (activeFilter === "Bookmarked") return bookmarked.includes(course.id);
        return true;
    });
    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <SearchInput
                value={searchText}
                onChange={setSearchText}
                onBackPress={() => router.push("/(tabs)")}
                onCartPress={() => router.push("/cart")}
            />
            <View style={{ marginBottom: 10 }}>
                <FilterChip
                    activeFilter={activeFilter}
                    onSelectFilter={(filter) => setActiveFilter(filter)}
                />
            </View>
            <Text style={styles.resultText}>
                Found {filtered.length} courses
            </Text>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item}) =>
                    <CourseCard course={item}   isBookmarked={isBookmarked(item.id)}
                                                      onToggleBookmark={() => toggleBookmark(item.id)}/>
            }
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 12,
    },
    resultText: {
        marginHorizontal: 10,
        marginVertical: 5,
        color: "#6b7280",
        fontSize: 12,
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#eee",
    },
});
