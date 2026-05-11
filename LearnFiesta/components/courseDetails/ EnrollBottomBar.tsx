import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
    onEnroll?: () => void;
    enrollLabel?: string;
}

export default function EnrollBottomBar({onEnroll, enrollLabel = "Add to Cart",}: Props) {
    return (
        <View style={styles.bar}>
            <Pressable style={styles.enrollBtn} onPress={onEnroll}>
                <Text style={styles.enrollText}>{enrollLabel}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        padding: 12,
        backgroundColor: "#fff",
    },
    enrollBtn: {
        backgroundColor: "#5523d1",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        paddingVertical: 14,
    },
    enrollText: {
        color: "#fff",
        fontWeight: "700",
    },
});
