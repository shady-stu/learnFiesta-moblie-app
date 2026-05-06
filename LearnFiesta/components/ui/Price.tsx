import React from "react";
import { View, Text, StyleSheet } from "react-native";

type PriceProps = {
  price: number;
  oldPrice?: number;
};

export default function Price({ price, oldPrice }: PriceProps) {
  const isFree = price === 0;

  return (
    <View style={styles.row}>
      <Text style={[styles.price, isFree && styles.free]}>
        {isFree ? "FREE" : `$${price.toFixed(2)}`}
      </Text>

      {oldPrice && oldPrice > price && (
        <Text style={styles.oldPrice}>
          ${oldPrice.toFixed(2)}
        </Text>
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