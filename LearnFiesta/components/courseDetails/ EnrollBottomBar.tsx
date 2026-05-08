import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    onEnroll?: () => void;
    enrollLabel?: string;
}

export default function EnrollBottomBar({onEnroll, enrollLabel = "Enroll Now",}: Props) {
    const [favorited, setFavorited] = useState(false);

    return (
        <View style={styles.bar}>
            <Pressable
                style={styles.favoriteBtn}
                onPress={() => setFavorited((prev) => !prev)}
            >
                <Ionicons
                    name={favorited ? "heart" : "heart-outline"}
                    size={22}
                    color="#5523d1"
                />
            </Pressable>

            <Pressable style={styles.enrollBtn} onPress={onEnroll}>
                <Text style={styles.enrollText}>{enrollLabel}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        padding: 12,
        backgroundColor: "#fff",
    },
    favoriteBtn: {
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        marginRight: 10,
    },
    enrollBtn: {
        flex: 1,
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