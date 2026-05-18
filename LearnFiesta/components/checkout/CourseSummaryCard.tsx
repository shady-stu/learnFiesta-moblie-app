import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { CartItem } from "@/types/cart";
type Props = {
    course: CartItem;
};
const CourseSummaryCard =  ({ course }: Props)  => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: course.imageUrl }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    {course.title}
                </Text>

                <Text style={styles.instructor}>
                    Instructor: {course.instructorName}
                </Text>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>
                    ${course.price}
                </Text>
            </View>
        </View>
    );
};

export default CourseSummaryCard;

const styles = StyleSheet.create({
    section: {
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        color: Colors.textPrimary,
    },

    card: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 16,
        padding: 12,

        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    image: {
        width: 96,
        height: 80,
        borderRadius: 10,
    },

    content: {
        flex: 1,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.textPrimary,
    },

    instructor: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: 4,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        gap: 4,
    },

    star: {
        color: "#8a3300",
        fontSize: 14,
    },

    rating: {
        fontSize: 12,
        fontWeight: "600",
        color: "#8a3300",
    },

    priceContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
    },

    price: {
        fontSize: 18,
        fontWeight: "800",
        color: Colors.primary,
    },
});