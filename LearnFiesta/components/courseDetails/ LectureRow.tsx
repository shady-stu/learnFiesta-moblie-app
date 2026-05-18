import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type LectureType = "video" | "article" | "quiz";
type Props = {
    title: string;
    duration?: string;
    type?: LectureType;
    isLocked?: boolean;
}

export default function LectureRow({title, duration, type, isLocked = true }: Props) {

    const getIconName = () => {
        if (type === "video") return "play-circle";
        if (type === "article") return "document-text";
        if (type === "quiz") return "help-circle";
    };

    const getIconColor = () => {
        if (type === "video") return "#5523d1";
        if (type === "article") return "#5523d1";
        if (type === "quiz") return "#5523d1";
        return "help-circle";
    };

    const getLabel = () => {
        if (type === "video") return "Video";
        if (type === "article") return "Article";
        if (type === "quiz") return "Quiz";
        return "Unknown";
    };

    return (
        <View style={styles.row}>
            <Ionicons
                name={getIconName() as any}
                size={22}
                color={getIconColor()}
            />

            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.meta}>
                    {getLabel()} • {duration}
                </Text>
            </View>

            <Ionicons
                name={isLocked ? "lock-closed" : "lock-open"}
                size={18}
                color={isLocked ? "#999" : "#5523d1"}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 13,
    },
    meta: {
        fontSize: 10,
        color: "#777",
    },
});