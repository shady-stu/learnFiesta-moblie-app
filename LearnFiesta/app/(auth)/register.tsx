import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { validateRegisterForm, RegisterFormData, RegisterFormErrors } from "@/utils/validators";
import { registerUser, getFirebaseErrorMessage } from "@/api/services/authService/registerService";

export default function Register() {
    const { control, handleSubmit } = useForm<RegisterFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<RegisterFormErrors>({});

    const onSubmit = async (data: RegisterFormData) => {
        const validationErrors = validateRegisterForm(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Show alert for the first validation error
            if (validationErrors.fullName) {
                Alert.alert("Missing Name", validationErrors.fullName);
            } else if (validationErrors.email) {
                Alert.alert("Invalid Email", validationErrors.email);
            } else if (validationErrors.password) {
                Alert.alert("Weak Password", validationErrors.password);
            } else if (validationErrors.confirmPassword) {
                Alert.alert("Password Mismatch", validationErrors.confirmPassword);
            } else if (validationErrors.agreeTerms) {
                Alert.alert("Agreement Required", validationErrors.agreeTerms);
            }
            return;
        }
        setLoading(true);
        setError(null);
        setErrors({});
        try {
            await registerUser(data.email, data.password, data.fullName);
            router.replace("/(tabs)");
        } catch (err: any) {
            const msg = getFirebaseErrorMessage(err.code);
            setError(msg);
            Alert.alert("Registration Failed", msg);
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

                    <Controller
                        control={control}
                        name="fullName"
                        render={({ field }) => (
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={field.value}
                                onChangeText={field.onChange}
                                error={errors.fullName}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Input
                                label="Email"
                                placeholder="example@email.com"
                                value={field.value}
                                onChangeText={field.onChange}
                                error={errors.email}
                                autoCapitalize="none"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input
                                label="Password"
                                placeholder="Create a password"
                                secureTextEntry
                                value={field.value}
                                onChangeText={field.onChange}
                                error={errors.password}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                secureTextEntry
                                value={field.value}
                                onChangeText={field.onChange}
                                error={errors.confirmPassword}
                            />
                        )}
                    />

                    <View style={styles.checkboxContainer}>
                        <Controller
                            control={control}
                            name="agreeTerms"
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
                    {errors.agreeTerms && <Text style={styles.errorText}>{errors.agreeTerms}</Text>}
                    {error && <Text style={styles.errorText}>{error}</Text>}

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
                        <TouchableOpacity style={styles.socialBtn}><Text>Google</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}><Text>Facebook</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F5F6F8" },
    scrollContent: { flexGrow: 1, justifyContent: "center", padding: 20 },
    card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 5 },
    logo: { fontWeight: "700", fontSize: 16, color: "#6C3EF4", marginBottom: 10 },
    title: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
    subtitle: { fontSize: 16, color: "#333", marginBottom: 2 },
    subtitle2: { fontSize: 14, color: "#666", marginBottom: 20 },
    checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 12, gap: 10 },
    checkboxLabel: { flex: 1, fontSize: 14, color: "#444" },
    errorText: { color: "red", fontSize: 12, marginBottom: 8 },
    signUpButton: { marginTop: 8 },
    footer: { marginTop: 20, textAlign: "center", color: "#666" },
    link: { color: "#6C3EF4", fontWeight: "600" },
    dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
    line: { flex: 1, height: 1, backgroundColor: "#ddd" },
    dividerText: { marginHorizontal: 10, fontSize: 12, color: "#888" },
    socialRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
    socialBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, alignItems: "center" },
});
