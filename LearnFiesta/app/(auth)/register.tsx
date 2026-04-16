import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { registerUser, getFirebaseErrorMessage } from "@/api/services/authService/registerService";

type RegisterFormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
};

export default function Register() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
        },
        mode: "onBlur",
    });

    const [loading, setLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        setFirebaseError(null);
        try {
            await registerUser(data.email, data.password, data.fullName);
            router.replace("/(tabs)");
        } catch (err: any) {
            setFirebaseError(getFirebaseErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.logo}>🎓 LearnFiesta</Text>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join LearnFiesta</Text>
                    <Text style={styles.subtitle2}>Start your learning journey today</Text>

                    {/* ✅ Full Name */}
                    <Controller
                        control={control}
                        name="fullName"
                        rules={{
                            required: "Full name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.fullName?.message}
                            />
                        )}
                    />

                    {/* ✅ Email */}
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                label="Email"
                                placeholder="example@email.com"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.email?.message}
                                autoCapitalize="none"
                            />
                        )}
                    />

                    {/* ✅ Password */}
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                label="Password"
                                placeholder="Create a password"
                                secureTextEntry
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.password?.message}
                            />
                        )}
                    />

                    {/* ✅ Confirm Password */}
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        }}
                        render={({ field }) => (
                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                secureTextEntry
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                error={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    {/* ✅ Checkbox */}
                    <View style={styles.checkboxContainer}>
                        <Controller
                            control={control}
                            name="agreeTerms"
                            rules={{
                                validate: (value) =>
                                    value === true || "You must agree to the terms",
                            }}
                            render={({ field }) => (
                                <Checkbox
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    color={field.value ? "#6C3EF4" : undefined}
                                />
                            )}
                        />
                        <Text style={styles.checkboxLabel}>
                            I agree to the Terms & Conditions and Privacy Policy
                        </Text>
                    </View>

                    {errors.agreeTerms && (
                        <Text style={styles.errorText}>{errors.agreeTerms.message}</Text>
                    )}

                    {firebaseError && (
                        <Text style={styles.errorText}>{firebaseError}</Text>
                    )}

                    <Button
                        title={loading ? "Creating Account..." : "Sign Up →"}
                        onPress={handleSubmit(onSubmit)}
                        style={styles.signUpButton}
                    />

                    <Text style={styles.footer}>
                        Already have an account?{" "}
                        <Text style={styles.link} onPress={() => router.push("/login")}>
                            Login
                        </Text>
                    </Text>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>Or register with</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialBtn}>
                            <Text>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}>
                            <Text>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F5F6F8" },
    scrollContent: { flexGrow: 1, justifyContent: "center", padding: 20 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },
    logo: { fontWeight: "700", fontSize: 16, color: "#6C3EF4", marginBottom: 10 },
    title: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
    subtitle: { fontSize: 16, color: "#333", marginBottom: 2 },
    subtitle2: { fontSize: 14, color: "#666", marginBottom: 20 },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
        gap: 10,
    },
    checkboxLabel: { flex: 1, fontSize: 14, color: "#444" },
    errorText: { color: "red", fontSize: 12, marginBottom: 8 },
    signUpButton: { marginTop: 8 },
    footer: { marginTop: 20, textAlign: "center", color: "#666" },
    link: { color: "#6C3EF4", fontWeight: "600" },
    dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
    line: { flex: 1, height: 1, backgroundColor: "#ddd" },
    dividerText: { marginHorizontal: 10, fontSize: 12, color: "#888" },
    socialRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
    socialBtn: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        alignItems: "center",
    },
});