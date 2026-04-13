import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress }: any) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#6C4EFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    text: { color: "#fff", fontWeight: "bold" },
});