import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type IconButtonProps = {
    icon: string;
    onPress?: () => void;
};

export default function IconButton({ icon, onPress }:IconButtonProps) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.icon}>{icon}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        borderRadius: 50,
    },
    icon: {
        fontSize: 18,
        color: "#5523d1",
    },
});