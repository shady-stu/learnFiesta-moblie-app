import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Colors} from "@/constants/colors";

const TrustBadges = () => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Ionicons name="shield-checkmark" size={24} color={Colors.textSecondary} />
                <Text style={styles.text}>PCI DSS</Text>
            </View>

            <View style={styles.item}>
                <Ionicons name="refresh-circle" size={24} color={Colors.textSecondary} />
                <Text style={styles.text}>30-DAY REFUND</Text>
            </View>

            <View style={styles.item}>
                <Ionicons name="headset" size={24} color={Colors.textSecondary} />
                <Text style={styles.text}>24/7 SUPPORT</Text>
            </View>
        </View>
    );
};

export default TrustBadges;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        paddingHorizontal: 8,
    },

    item: {
        alignItems: "center",
        gap: 4,
    },

    text: {
        fontSize: 10,
        fontWeight: "700",
        color: Colors.textSecondary,
        textAlign: "center",
    },
});