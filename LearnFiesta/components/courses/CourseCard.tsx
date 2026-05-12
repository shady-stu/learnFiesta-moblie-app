import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";
import Rating from "@/components/courses/Rating";
import Price from "../ui/Price";
import {Course} from "@/types/course";
import {Radius} from "@/constants/radius";
import {Colors} from "@/constants/colors";
import { Ionicons } from '@expo/vector-icons';
import Badge from "@/components/ui/Badge";
import { useRouter } from "expo-router";
type Props = {
    course: Course;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
};

export default function CourseCard({ course, isBookmarked, onToggleBookmark}: Props) {
    const router = useRouter();
    return (


        <Pressable
            onPress={() => router.push({pathname: "/course/[id]", params: { id: course.id },})}
            style={({ pressed }) =>
                [styles.card, pressed && styles.cardPressed
            ]}
        >
            <Image source={{ uri: course.imageUrl }} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.topRow}>
                    {course.badge && <Badge label={course.badge} />}

                    <TouchableOpacity onPress={onToggleBookmark}>
                        <Ionicons
                            name={isBookmarked ? "bookmark" : "bookmark-outline"}
                            size={22}
                            color={isBookmarked ? "#AA60C8" : "#999"}
                        />
                    </TouchableOpacity>
                </View>


                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.subtitle}>
                    {course.instructorName} • {course.duration}
                </Text>


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
        height: 140,
        borderRadius: 12,
        marginBottom: 10,
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
        transform: [{ scale: 0.98 }],
    },
});
