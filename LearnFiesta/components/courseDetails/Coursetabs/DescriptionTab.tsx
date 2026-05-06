import React from "react";
import { Text, StyleSheet } from "react-native";

export default function DescriptionTab() {
    return (

        <Text style={styles.text}>
            This course will teach you everything you need to know about UI/UX design,
            from basics to advanced concepts. You will work on real projects and
            build a strong portfolio.
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 13,
        color: "#444",
        lineHeight: 20,
    },
});