import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

type Props = {
    title?: string;
    onBack?: () => void;
    onShare?: () => void;
}

export default function CourseHeader({ title = "Course Details", onBack, onShare,}: Props) {
    return (
        <View style={styles.header}>
            <Pressable onPress={onBack} hitSlop={8}>
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </Pressable>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            {onShare ? (
                <Pressable onPress={onShare} hitSlop={8}>
                    <Ionicons name="share-outline" size={22} color={Colors.primary} />
                </Pressable>
            ) : (
                <View style={styles.headerIconSpace} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
        color: Colors.textPrimary,
        marginHorizontal: 12,
    },
    headerIconSpace: {
        width: 24,
        height: 24,
    },
});
