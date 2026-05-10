import React from "react";
import {View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type SearchInputProps = {
    value: string;
    onChange: (text: string) => void;
};
export default function SearchInput({ value, onChange }:SearchInputProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="arrow-back" size={24} color="#5523d1" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Search for courses, skills, or mentors..."
                placeholderTextColor="#9ca3af"
                value={value}
                onChangeText={onChange}
            />
            <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="shopping-cart" size={24} color="#5523d1" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f6f6f8",
    },
    input: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: "#fff",
        color: "#111827",
    },
    iconButton: {
        padding: 6,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});
