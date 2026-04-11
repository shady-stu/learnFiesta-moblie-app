import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { validateEmail, validatePassword } from "@/utils/validators";
import { SafeAreaView } from "react-native-safe-area-context";

import { loginUser, AuthUser } from "@/api/services/authService/authService";

type LoginFormData = {
    email: string;
    password: string;
};

type FormErrors = {
    email?: string;
    password?: string;
};

export default function Login() {
    const { control, handleSubmit } = useForm<LoginFormData>({
        defaultValues: { email: "", password: "" },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        const emailError = validateEmail(data.email);
        const passwordError = validatePassword(data.password);

        if (emailError || passwordError) {
            setErrors({
                email: emailError ?? undefined,
                password: passwordError ?? undefined,
            });
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setErrors({});

            const user: AuthUser = await loginUser(
                data.email,
                data.password
            );

            // 🎯 ROLE BASED NAVIGATION
            if (user.role === "instructor") {
                router.replace("/(tabs)");
            } else {
                router.replace("/(tabs)");
            }

        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.logo}>🎓 LearnFiesta</Text>

                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>
                    Log in to your account to continue your learning journey.
                </Text>

                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <Input
                            label="Email"
                            value={field.value}
                            onChangeText={field.onChange}
                            error={errors.email}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <Input
                            label="Password"
                            secureTextEntry
                            value={field.value}
                            onChangeText={field.onChange}
                            error={errors.password}
                        />
                    )}
                />

                {error && <Text style={styles.error}>{error}</Text>}

                <Button
                    title={loading ? "Loading..." : "Log In"}
                    onPress={handleSubmit(onSubmit)}
                />

                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Text>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialBtn}>
                        <Text>Apple</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footer}>
                    Don’t have an account?{" "}
                    <Text style={styles.link}>Register</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F5F6F8",
        justifyContent: "center",
        padding: 20,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },

    logo: {
        fontWeight: "700",
        fontSize: 16,
        color: "#6C3EF4",
        marginBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        color: "#666",
        marginBottom: 20,
    },

    error: {
        color: "red",
        marginBottom: 10,
    },

    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ddd",
    },

    dividerText: {
        marginHorizontal: 10,
        fontSize: 12,
        color: "#888",
    },

    socialRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    socialBtn: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },

    footer: {
        marginTop: 20,
        textAlign: "center",
        color: "#666",
    },

    link: {
        color: "#6C3EF4",
        fontWeight: "600",
    },
});