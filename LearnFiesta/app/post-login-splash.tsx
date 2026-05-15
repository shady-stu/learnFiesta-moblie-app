import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { Spacing } from "@/constants/spacing";
import { Typography } from "@/constants/typography";

export default function PostLoginSplash() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                return Math.min(prev + 5, 100);
            });
        }, 70);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => {
                router.replace("/(tabs)");
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [progress]);

    return (
        <View style={styles.container}>
            <View style={styles.brand}>
                <Image
                    source={require("../assets/images/splash.png")}
                    style={styles.logo}
                />

                <Text style={styles.title}>
                    Learn<Text style={styles.titleAccent}>Fiesta</Text>
                </Text>

                <Text style={styles.subtitle}>Knowledge at your fingertips</Text>
            </View>

            <View style={styles.bottom}>
                <View style={styles.loadingRow}>
                    <Text style={styles.loading}>Preparing your classroom</Text>
                    <Text style={styles.percent}>{progress}%</Text>
                </View>

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
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: Spacing.xxl,
    },
    brand: {
        alignItems: "center",
        transform: [{ translateY: -24 }],
    },
    logo: {
        width: 124,
        height: 124,
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    titleAccent: {
        color: Colors.primary,
    },
    subtitle: {
        fontSize: Typography.body,
        color: Colors.textSecondary,
        fontWeight: "500",
    },
    bottom: {
        position: "absolute",
        bottom: 64,
        width: "100%",
        paddingHorizontal: Spacing.xxl,
    },
    loadingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Spacing.sm,
    },
    loading: {
        fontSize: Typography.caption,
        color: Colors.textSecondary,
        fontWeight: "600",
    },
    percent: {
        fontSize: Typography.caption,
        color: Colors.primary,
        fontWeight: "700",
    },
    progressBar: {
        height: 8,
        backgroundColor: Colors.muted,
        borderRadius: Radius.full,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: Colors.primary,
        borderRadius: Radius.full,
    },
});
