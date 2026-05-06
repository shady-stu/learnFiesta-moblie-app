import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    imageUrl: string;
    onPlay?: () => void;
}

export default function VideoPreview({ imageUrl, onPlay }: Props) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.overlay} />
            <Pressable style={styles.playButton} onPress={onPlay}>
                <Ionicons name="play" size={30} color="#fff" />
            </Pressable>
            <Text style={styles.label}>Preview this course</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        borderRadius: 16,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    playButton: {
        position: "absolute",
        top: "38%",
        left: "42%",
        backgroundColor: "#5523d1",
        padding: 16,
        borderRadius: 50,
    },
    label: {
        position: "absolute",
        bottom: 10,
        right: 10,
        color: "#fff",
        fontSize: 12,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
});