import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/courses/Rating";

type Props = {
    title: string;
    badge?: string;
    category?: string;
    rating: number;
    reviewsCount: number;
    studentsCount?: number;
}

export default function CourseHeaderInfo({title, badge, category, rating, reviewsCount}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.badgesRow}>
                {badge && <Badge label={badge} />}
                {category && (
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.ratingRow}>
                <Rating rating={rating} reviews={reviewsCount} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    badgesRow: {
        flexDirection: "row",
        gap: 6,
        marginBottom: 6,
    },
    categoryBadge: {
        backgroundColor: "#e5e7eb",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    categoryText: {
        fontSize: 10,
        color: "#555",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
    },
});