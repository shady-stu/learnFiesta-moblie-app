import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function PostLoginSplash() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);

                    // Navigate to main app
                    router.replace("/(tabs)");
                    return 100;
                }
                return prev + 10;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/splash.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                Learn<Text style={{ color: "#6C4EFF" }}>Fiesta</Text>
            </Text>

            <Text style={styles.subtitle}>Knowledge at your fingertips</Text>

            <View style={styles.bottom}>
                <Text style={styles.loading}>
                    Preparing your classroom... {progress}%
                </Text>

                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDEAF7",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 110,
        height: 110,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
    },
    bottom: {
        position: "absolute",
        bottom: 60,
        width: "80%",
    },
    loading: {
        fontSize: 12,
        marginBottom: 8,
        color: "#555",
    },
    progressBar: {
        height: 6,
        backgroundColor: "#ddd",
        borderRadius: 10,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#6C4EFF",
    },
});