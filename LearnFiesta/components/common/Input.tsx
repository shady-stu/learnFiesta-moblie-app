import { View, TextInput, Text, StyleSheet } from "react-native";

export default function Input({ label, ...props }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 15 },
    label: { marginBottom: 5 },
    input: {
        backgroundColor: "#f3f3f3",
        padding: 12,
        borderRadius: 10,
    },
});
