import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Colors} from "@/constants/colors";
import { useRouter } from "expo-router";
const CheckoutHeader = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity onPress={() => router.push("/cart")}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={Colors.primary}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Checkout</Text>
            </View>

            <Ionicons name="lock-closed" size={22} color={Colors.textSecondary} />
        </View>
    );
};

export default CheckoutHeader;

const styles = StyleSheet.create({
    container: {
        height: 70,
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.surface,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: Colors.primary,
    },
});