import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/api/services/firebase";
import { storeToken, scheduleTokenRefresh } from "@/api/services/authService/authService";
import { validateEmail, validatePassword } from "@/utils/validators";
import Checkbox from "expo-checkbox"; // we'll install this

type RegisterFormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
};

type FormErrors = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
};

export default function Register() {
    const { control, handleSubmit, watch } = useForm<RegisterFormData>({
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
    const [errors, setErrors] = useState<FormErrors>({});

    const passwordValue = watch("password");

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        // Validation
        const newErrors: FormErrors = {};

        if (!data.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        const emailError = validateEmail(data.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(data.password);
        if (passwordError) newErrors.password = passwordError;

        if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!data.agreeTerms) {
            newErrors.agreeTerms = "You must agree to the Terms & Conditions";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setError(null);
        setErrors({});

        try {
            // 1. Create user in Firebase Auth
            const userCred = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const uid = userCred.user.uid;

            // 2. Create user document in Firestore (with role = "student")
            await setDoc(doc(db, "users", uid), {
                name: data.fullName,
                email: data.email,
                role: "student", // default role
                createdAt: serverTimestamp(),
            });

            // 3. Also create a role document (optional, but good for role-based queries)
            await setDoc(doc(db, "roles", uid), {
                role: "student",
            });

            // 4. Get ID token and store it (auto-login)
            const token = await userCred.user.getIdToken();
            await storeToken(token);
            scheduleTokenRefresh(); // start auto-refresh

            // 5. Navigate to main app
            router.replace("/(tabs)");
        } catch (err: any) {
            console.error(err);
            let message = "Registration failed. Please try again.";
            if (err.code === "auth/email-already-in-use") {
                message = "This email is already registered. Please log in.";
            } else if (err.code === "auth/weak-password") {
                message = "Password is too weak. Use at least 6 characters.";
            }
            setError(message);
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
                    {errors.agreeTerms && (
                        <Text style={styles.errorText}>{errors.agreeTerms}</Text>
                    )}

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
    screen: {
        flex: 1,
        backgroundColor: "#F5F6F8",
    },
    scrollContent: {
        flexGrow: 1,
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
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: "#333",
        marginBottom: 2,
    },
    subtitle2: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
        gap: 10,
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 14,
        color: "#444",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 8,
    },
    signUpButton: {
        marginTop: 8,
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
        gap: 12,
    },
    socialBtn: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        alignItems: "center",
    },
});