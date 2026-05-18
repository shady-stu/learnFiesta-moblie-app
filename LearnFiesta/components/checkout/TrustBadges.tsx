import React from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Colors} from "@/constants/colors";

const TrustBadges = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >


        <View style={styles.container}>
            <View style={styles.item}>
                <Ionicons name="refresh-circle" size={24} color={Colors.textSecondary} />
                <Text style={styles.text}>30-DAY REFUND</Text>
            </View>

            <View style={styles.item}>
                <Ionicons name="checkmark-done-circle" size={24} color={Colors.textSecondary} />
                <Text style={styles.text}>CERTIFIED COURSE</Text>
            </View>

            <View style={styles.item}>
                <Ionicons name="shield-checkmark" size={24} color={Colors.textSecondary} />
                <Text style={styles.text}>SECURE PAYMENT</Text>
            </View>

            <View style={styles.item}>
                <Ionicons name="headset" size={24} color={Colors.textSecondary} />
                <Text style={styles.text}>24/7 SUPPORT</Text>
            </View>
        </View>
           </ScrollView>
    );
};

export default TrustBadges;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        paddingHorizontal: 8,
        gap: 24,
    },

    item: {
        alignItems: "center",
        gap: 6,
    },

    text: {
        fontSize: 10,
        fontWeight: "700",
        color: Colors.textSecondary,
        textAlign: "center",
    },
});