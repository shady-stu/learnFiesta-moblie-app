import React from "react";
import { Text, StyleSheet } from "react-native";

type Props = {
    description: string;
};

export default function DescriptionTab({ description }: Props) {
    return <Text style={styles.text}>{description}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 13,
        color: "#444",
        lineHeight: 20,
    },
});