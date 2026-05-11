import React from "react";
import { Text, StyleSheet } from "react-native";
import {Colors} from "@/constants/colors";
type props ={
    title: string,
}

const SectionTitle = ({ title }:props) => {
    return <Text style={styles.title}>{title}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.textPrimary,
        marginBottom: 16,
    },
});