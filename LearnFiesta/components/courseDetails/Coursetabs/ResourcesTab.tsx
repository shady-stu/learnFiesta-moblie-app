import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export type ResourceType = "pdf" | "slides";

type Resource = {
    id: number;
    title: string;
    type: ResourceType;
};

const resources: Resource[] = [
    {
        id: 1,
        title: "UI/UX Design Slides",
        type: "slides",
    },
    {
        id: 2,
        title: "Design Thinking Handbook",
        type: "pdf",
    },
];

export default function ResourcesTab() {
    const getResourceIcon = (type: ResourceType) => {
        if (type === "pdf") return "document-text-outline";
        if (type === "slides") return "layers-outline";
        return "document-outline";
    };

    const getResourceLabel = (type: ResourceType) => {
        if (type === "pdf") return "PDF";
        if (type === "slides") return "Slides";
        return "Resource";
    };

    return (
        <View style={styles.container}>
            {resources.map((item) => (
                <Pressable key={item.id} style={styles.card}>
                    <Ionicons
                        name={getResourceIcon(item.type) as any}
                        size={22}
                        color="#5523d1"
                    />

                    <View style={styles.info}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.type}>
                            {getResourceLabel(item.type)}
                        </Text>
                    </View>

                    <Ionicons name="download-outline" size={20} color="#999" />
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        gap: 10,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 13,
        fontWeight: "500",
    },
    type: {
        fontSize: 11,
        color: "#777",
    },
});