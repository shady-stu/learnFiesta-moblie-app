import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {Colors} from "@/constants/colors";
type props ={
    title: string,
    onPress?: () => void;
}

const PrimaryButton = ({ title, onPress }:props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        height: 54,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "700",
    },
});