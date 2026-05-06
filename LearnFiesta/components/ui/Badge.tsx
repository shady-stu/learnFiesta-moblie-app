import { Text, StyleSheet, View } from "react-native";

export default function Badge({ label, type = "primary" }: any) {
    return (
        <View style={[styles.badge, type === "primary" ? styles.primary : styles.secondary]}>
            <Text style={[styles.text, type === "primary" && { color: "#5523d1" }]}>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    primary: {
        backgroundColor: "#5523d120",
    },
    secondary: {
        backgroundColor: "#e5e7eb",
    },
    text: {
        fontSize: 10,
        fontWeight: "700",
        textTransform: "uppercase",
    },
});