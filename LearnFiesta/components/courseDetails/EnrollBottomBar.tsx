import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

type Props = {
    onEnroll?: () => void;
    enrollLabel?: string;
    loading?: boolean;
};

export default function EnrollBottomBar({onEnroll, enrollLabel = "Add to Cart", loading = false}: Props) {
    return (
        <View style={styles.bar}>
            <Pressable
                onPress={onEnroll}
                disabled={loading}
                style={({ pressed }) => [
                    styles.enrollBtn,
                    pressed && styles.pressed,
                    loading && styles.disabled,
                ]}
            >
                <Text style={styles.enrollText}>
                    {loading ? "Adding..." : enrollLabel}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        padding: 12,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },

    enrollBtn: {
        backgroundColor: "#5523d1",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        paddingVertical: 14,

        // 👇 adds depth
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },

    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },

    disabled: {
        opacity: 0.5,
    },

    enrollText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
});