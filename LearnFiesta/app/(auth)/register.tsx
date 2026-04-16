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
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
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

                    {/* Full Name */}
                    <Controller
                        control={control}
                        name="fullName"
                        rules={{
                            required: "Full name is required",
                            minLength: { value: 3, message: "Min 3 characters" },
                        }}
                        render={({ field }) => (
                            <Input {...field} label="Full Name" error={errors.fullName?.message} />
                        )}
                    />

                    {/* Email */}
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email",
                            },
                        }}
                        render={({ field }) => (
                            <Input {...field} label="Email" error={errors.email?.message} />
                        )}
                    />

                    {/* Password */}
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: { value: 8, message: "Min 8 characters" },
                        }}
                        render={({ field }) => (
                            <Input {...field} label="Password" secureTextEntry error={errors.password?.message} />
                        )}
                    />

                    {/* Confirm Password */}
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        }}
                        render={({ field }) => (
                            <Input {...field} label="Confirm Password" secureTextEntry error={errors.confirmPassword?.message} />
                        )}
                    />

                    {/* Terms */}
                    <View style={styles.checkboxContainer}>
                        <Controller
                            control={control}
                            name="agreeTerms"
                            rules={{
                                validate: (value) => value || "You must agree",
                            }}
                            render={({ field }) => (
                                <Checkbox
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                        <Text>I agree to terms</Text>
                    </View>

                    {errors.agreeTerms && (
                        <Text style={styles.errorText}>{errors.agreeTerms.message}</Text>
                    )}

                    {firebaseError && (
                        <Text style={styles.errorText}>{firebaseError}</Text>
                    )}

                    <Button
                        title={loading ? "Loading..." : "Sign Up"}
                        onPress={handleSubmit(onSubmit)}
                    />
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
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        gap: 10,
    },
    errorText: { color: "red", fontSize: 12 },
});