import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const items = [
    "Understand UI/UX fundamentals",
    "Create wireframes and prototypes",
    "Use design tools effectively : Figma, Adobe",
    "Apply design thinking process",
];

export default function LearnTab() {
    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Ionicons name="checkmark-circle" size={18} color="#5523d1" />
                    <Text style={styles.text}>{item}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    text: {
        fontSize: 13,
    },
});