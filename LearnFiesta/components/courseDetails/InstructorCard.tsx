import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props =  {
    name: string;
    role?: string;
    avatarUrl: string;
    onFollow?: () => void;
}

export default function InstructorCard({name, role = "Instructor", avatarUrl, onFollow,}: Props) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />

            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.role}>{role}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 16,
        padding: 12,
        borderRadius: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: "700",
    },
    role: {
        fontSize: 12,
        color: "#777",
    },
    followBtn: {
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    followText: {
        fontSize: 12,
        color: "#5523d1",
        fontWeight: "600",
    },
});
