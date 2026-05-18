import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    items: string[];
};

export default function LearnTab({ items }: Props) {
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