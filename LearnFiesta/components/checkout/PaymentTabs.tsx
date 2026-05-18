import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

type Props = {
    selected: "card" | "paypal";
    onChange: (value: "card" | "paypal") => void;
};

const PaymentTabs = ({ selected, onChange }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    selected === "card" && styles.activeTab,
                ]}
                onPress={() => onChange("card")}
            >
                <Text
                    style={[
                        styles.text,
                        selected === "card" && styles.activeText,
                    ]}
                >
                    Card
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.tab,
                    selected === "paypal" && styles.activeTab,
                ]}
                onPress={() => onChange("paypal")}
            >
                <Text
                    style={[
                        styles.text,
                        selected === "paypal" && styles.activeText,
                    ]}
                >
                    PayPal
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentTabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 4,
        marginBottom: 20,
    },

    tab: {
        flex: 1,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
    },

    activeTab: {
        backgroundColor: Colors.primary,
    },

    text: {
        color: Colors.textSecondary,
        fontWeight: "600",
    },

    activeText: {
        color: Colors.white,
        fontWeight: "700",
    },
});