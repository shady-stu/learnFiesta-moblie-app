import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchInput from "@/components/ui/SearchInput"
import {FilterChip} from "@/components/ui/FilterChip";
import CourseCard  from "@/components/courses/CourseCard";
import {Colors} from "@/constants/colors";
import { useBookmarks } from "@/hooks/useBookmarks";
import {useCourses} from "@/libr/useCourses";

export default function Search() {
    const { data: courses = [], isLoading, error } = useCourses();
    const [searchText, setSearchText] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { toggleBookmark, isBookmarked, bookmarked} = useBookmarks();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading courses</Text>;
    }


    const filtered = courses.filter((course) => {

        const matchesSearch =
            course.title.toLowerCase().includes(searchText.toLowerCase()) ||
            course.instructorName.toLowerCase().includes(searchText.toLowerCase());

        if (!matchesSearch) return false;
        if (activeFilter === "All") return true;
        if (activeFilter === "Free") return course.price === "Free";
        if (activeFilter === "Top Rated") return course.rating >= 4.5;
        if (activeFilter === "Best seller") return course.badge === "Best seller";
        if (activeFilter === "Bookmarked") return bookmarked.includes(course.id);
        return true;
    });
    return (
        <View style={styles.container}>
            <SearchInput value={searchText} onChange={setSearchText} />
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
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 50,
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