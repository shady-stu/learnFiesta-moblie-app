import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {Spacing} from "@/constants/spacing";
type RatingProps = {
    rating: number;
    reviews: number | string;
};

export default function Rating({ rating, reviews }: RatingProps) {
    return (
        <View style={styles.row}>
            <Text style={styles.rating}>{rating}</Text>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.reviews}>{reviews}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm
    },
    rating: {
        color: "#f59e0b",
        fontWeight: "bold",
    },
    star: {
        fontSize: 12,
    },
    reviews: {
        color: "gray",
        fontSize: 12,
    },
});