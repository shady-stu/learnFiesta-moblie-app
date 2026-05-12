import React from "react";
import {View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {Colors} from "@/constants/colors";

const PaymentTabs = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.activeTab}>
                <Text style={styles.activeText}>Card</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
                <Text style={styles.text}>PayPal</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentTabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor:  "#ffffff",
        borderRadius: 18,
        padding: 4,
        marginBottom: 20,
    },

    activeTab: {
        flex: 1,
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 14,

        justifyContent: "center",
        alignItems: "center",
    },

    tab: {
        flex: 1,
        height: 50,

        justifyContent: "center",
        alignItems: "center",
    },

    activeText: {
        color: Colors.white,
        fontWeight: "700",
    },

    text: {
        color: Colors.textSecondary,
        fontWeight: "600",
    },
});