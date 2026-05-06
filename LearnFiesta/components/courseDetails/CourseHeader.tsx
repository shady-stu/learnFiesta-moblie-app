import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    title?: string;
    onBack?: () => void;
    onShare?: () => void;
}

export default function CourseHeader({ title = "Course Details", onBack, onShare,}: Props) {
    return (
        <View style={styles.header}>
            <Pressable onPress={onBack} hitSlop={8}>
                <Ionicons name="arrow-back" size={24} />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onShare} hitSlop={8}>
                <Ionicons name="share-outline" size={22} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontWeight: "700",
        fontSize: 16,
    },
});