import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    visible: boolean;
    message: string;
    type?: "success" | "error" | "info";
};

export default function Toast({ visible, message, type = "success" }: Props) {
    if (!visible) return null;

    return (
        <View
            style={[
                styles.toast,
                type === "success" && styles.success,
                type === "error" && styles.error,
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    toast: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: "#111",
        zIndex: 999,
    },

    success: {
        backgroundColor: "#16a34a",
    },

    error: {
        backgroundColor: "#dc2626",
    },

    text: {
        color: "#fff",
        fontWeight: "600",
    },
});