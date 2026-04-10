import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";
import Rating from "@/components/courses/Rating";
import Price from "../ui/Price";
import {Course} from "@/types/course";
import {Radius} from "@/constants/radius";
import {Colors} from "@/constants/colors";
import { Ionicons } from '@expo/vector-icons';
type Props = {
    course: Course;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
};

export default function CourseCard({ course, isBookmarked, onToggleBookmark}: Props) {
    return (

        <Pressable

            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed
            ]}
        >{/* Course Image */}
            <Image source={{ uri: course.imageUrl }} style={styles.image} />

            {/* Course Content */}
            <View style={styles.content}>
                {/* Top Row: Badge + Bookmark */}
                <View style={styles.topRow}>
                    {course.badge && <Text style={styles.badge}>{course.badge.toUpperCase()}</Text>}

                    <TouchableOpacity onPress={onToggleBookmark}>
                        <Ionicons
                            name={isBookmarked ? "bookmark" : "bookmark-outline"}
                            size={22}
                            color={isBookmarked ? "#AA60C8" : "#999"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Title & Subtitle */}
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.subtitle}>
                    {course.instructorName} • {course.duration}
                </Text>

                {/* Bottom Row: Rating + Price */}
                <View style={styles.bottom}>
                    <Rating rating={course.rating} reviews={course.reviewsCount} />
                    <Price price={course.price} oldPrice={course.oldPrice} />
                </View>
            </View></Pressable>


    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        backgroundColor:Colors.white,
        borderRadius: Radius.lg,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: Radius.sm,
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 140, // taller image for top
        borderRadius: 12,
        marginBottom: 10, // spacing below image
    },
    content: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "space-between",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    badge: {
        fontSize: 10,
        fontWeight: "700",
        color: "#5523d1",
    },
    bookmark: {
        fontSize: 16,
    },
    title: {
        fontWeight: "700",
        fontSize: 14,
        color: "#111827",
        marginBottom: 2,
    },
    subtitle: {
        color: "#6b7280",
        fontSize: 12,
    },
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        justifyContent: "space-between",
    },
    cardPressed: {
        backgroundColor: "#f3f4f6",
        transform: [{ scale: 0.98 }], // light gray like hover:bg-gray-100
    },
});