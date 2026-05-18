import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    sectionCount: number;
    lectureCount: number;
}

export default function CourseContentHeader({sectionCount, lectureCount,}: Props) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Course Content</Text>
            <Text style={styles.meta}>
                {sectionCount} Sections • {lectureCount} Lectures
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontWeight: "700",
    },
    meta: {
        fontSize: 12,
        color: "#5523d1",
    },
});