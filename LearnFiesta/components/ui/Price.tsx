import React from "react";
import { View, Text, StyleSheet } from "react-native";

type PriceProps = {
    price: string;
    oldPrice?: string;
};

export default function Price({ price, oldPrice }: PriceProps) {
    const isFree = price === "Free";

    return (
        <View style={styles.row}>
            <Text style={[styles.price, isFree && styles.free]}>
                {isFree ? "FREE" : `$${price}`}
            </Text>

            {oldPrice && !isFree && (
                <Text style={styles.oldPrice}> ${oldPrice}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        fontWeight: "bold",
        fontSize: 14,
    },
    free: {
        color: "green",
    },
    oldPrice: {
        textDecorationLine: "line-through",
        marginLeft: 5,
        color: "gray",
        fontSize: 12,
    },
});