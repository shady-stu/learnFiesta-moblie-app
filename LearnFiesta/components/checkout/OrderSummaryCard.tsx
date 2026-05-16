import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {Colors} from "@/constants/colors";
import PrimaryButton from "./PrimaryButton";
import { CartItem } from "@/types/cart";
type OrderSummaryCardProps ={
    courses: CartItem[];
    onPress: () => void;
    total: number;
}

const OrderSummaryCard = ({onPress, courses, total}: OrderSummaryCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.heading}>Order Summary</Text>


            {courses.map((c) => (
                <View key={c.id} style={styles.row}>
                    <Text
                        style={styles.label}
                        numberOfLines={2}
                    >
                        {c.title}
                    </Text>
                    <Text style={styles.price}>${c.price}</Text>
                </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.row}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.totalPrice}>
                    ${total.toFixed(2)}
                </Text>
            </View>

            <View style={{ marginTop: 24 }}>
                <PrimaryButton
                    title="Complete Payment"
                    onPress={onPress}
                />
            </View>
        </View>
    );
};

export default OrderSummaryCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f8f1ff",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#cac3d8",

        padding: 20,
    },

    heading: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 24,
        color: Colors.textPrimary,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    label: {
        color: Colors.textSecondary,
        flex: 1,
        flexShrink: 1,
    },

    price: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.textPrimary,
        flexShrink: 0,
    },

    oldPrice: {
        textDecorationLine: "line-through",
        color: Colors.textSecondary,
    },

    discount: {
        color: "#8a3300",
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "#cac3d8",
        marginVertical: 16,
    },

    total: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.textPrimary,
    },

    totalPrice: {
        fontSize: 32,
        fontWeight: "800",
        color: Colors.primary,
    },
});
