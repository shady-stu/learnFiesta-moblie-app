
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchInput from "@/components/ui/SearchInput"
import {FilterChip} from "@/components/ui/FilterChip";
import CourseCard  from "@/components/courses/CourseCard";
import { Course } from "@/types/course";
import {Colors} from "@/constants/colors";
import { useBookmarks } from "@/hooks/useBookmarks";

const courses: Course[] = [
    {
        id: "1",
        title: "Complete Python Bootcamp: From Zero to Hero",
        instructorId: "inst_1",
        instructorName: "Jose Port",
        duration: "22h 0m",
        rating: 4.8,
        reviewsCount: 120000,
        price: "14.99",
        oldPrice: "84.99",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfvD5BdWY56zY4XSLNSLoYL01-Ebj13fcTaZ8aNoyx8St1UDRGGTlka3Ot3X8s-K_0eZ9r9yIHdJ6hjo0H98OLSuMeFeWN4ajxRduyLLgFXCknlUwsWbV7dThX6rf__SHANg5DtyVprL6SkwKZXXIgooAo8hRWoRpk2MwbcDEnODpHcw9DWkDaH9XJkmBB_QwCGgbYTNOdS3nxjXZZq6hftQWqL2lCcRXhgqrWyUJZKmWYZXuq1mKAQQYq-R90Jbw-AOxZmJLrbcU",
        badge: "Bestseller",
    },
    {
        id: "2",
        title: "Advanced Python: Mastering Metaprogramming",
        instructorId: "inst_2",
        instructorName: "Sarah Jenkins",
        duration: "15h 0m",
        rating: 4.9,
        reviewsCount: 1200,
        price: "19.99",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuSkxs0DndEL7885wQiMV1AI6QaEkcaf6-LXz0pZiJKircON4KGGNsSBm7gmRTbFP2cUYPSUMgYfBrm0wD2ol3ZSP1Oi2F9IhVVgAiS6Y8LIvrLsh1exb2Yv4Ym_Vr-vnjJ9eRH4PsWbF6AH-0Ojy1-es6JyXLixKjOPqsG1CFHlARo2k9Fa9LniIZqpZI0iCRKjBQRtTbG4v9sQndpOyp550JR_Oju9Ty-5kGdZzWplW-waXWx8RFCYAAm3G83hUuzqW0VvpkohE",
        badge: "New Arrival",
    },
    {
        id: "3",
        title: "Python for Data Science and Machine Learning",
        instructorId: "inst_3",
        instructorName: "Dr. Angela Yu",
        duration: "32h 0m",
        rating: 4.7,
        reviewsCount: 45000,
        price: "12.99",
        oldPrice: "99.99",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFjpBiZmQYo8xt2b0gAXDvWHJwrEFEBoSasdwUVFzPKwvX3fzcejTobUaVDqhwWr2OTMXbJnBhVcNgD5KpFWFgNP_aYZ47Svl0PaD_6GJXeRvio3JhKBXAy4tCB4evb4ZhHU4odrKHNP9j3s1nHSQF8o4oSV8fTH5d8N5-RRogDHvkJlPsGfxoz3n3VMQrVtdF-B8iamfSA0mbduzNedKvhm7N2Qn_H00oVdG9XkbQV3C8Z1PZCXm9KbbHpHBkTvioOziOUtGv8IU",
        badge: "Top Rated",
    },
    {
        id: "4",
        title: "Python Basics for Beginners",
        instructorId: "inst_4",
        instructorName: "LearnFiesta Academy",
        duration: "4h 0m",
        rating: 4.5,
        reviewsCount: 8500,
        price: "Free",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVWZoviCATZMG1gv_6DSSYDHt6WMJpIMMvbBuJ6cAhWO3mlLlemnehmMTwEk3x-JpijQA3Ho22XDfzjwoyoXyST5bDstmzOoPeIzV77L-kNsbrnzdzOBfb6Yzy_-90Vmfdgd33HJXyWvIOZS-YfM51IZFV3paMFh3pYz6ZjCrPNhdcC4Wi9oEP3GHTeXLNjY7fObjGheafqkGAUL9OJmY58aHbwTjV1VXsApYbgfKlonP8u0avOSYJLEBqxQOM-244LIsgE2Rd89g",
        badge: "Free Course",
    },
];

export const SearchScreen = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { toggleBookmark, isBookmarked, bookmarked} = useBookmarks();


    const filtered = courses.filter((course) => {

        const matchesSearch =
            course.title.toLowerCase().includes(searchText.toLowerCase()) ||
            course.instructorName.toLowerCase().includes(searchText.toLowerCase());

        if (!matchesSearch) return false;
        if (activeFilter === "All") return true;
        if (activeFilter === "Free") return course.price === "Free";
        if (activeFilter === "Top Rated") return course.rating >= 4.8;
        if (activeFilter === "Best seller") return course.badge === "Bestseller";
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


export default function Search() {
    return <SearchScreen />;
}


