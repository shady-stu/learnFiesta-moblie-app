import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoCheckbox from "expo-checkbox";
import { registerUser, getFirebaseErrorMessage } from "@/api/services/authService/registerService";
import {
    RegisterFormData,
    validateFullName,
    validateEmailField,
    validatePasswordField,
    validateConfirmPassword,
} from "@/utils/registerValidation";
import { registerStyles as styles } from "@/styles/auth/register.styles";

export default function Register() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
        defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", agreeTerms: false },
        mode: "onChange",
    });

    const [loading, setLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState<string | null>(null);
    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        if (Object.keys(errors).length > 0 || !data.agreeTerms) {
            Alert.alert(
                !data.agreeTerms ? "Agreement Required" : "Validation Error",
                !data.agreeTerms ? "You must agree to the Terms & Conditions." : "Please fix the red errors above."
            );
            return;
        }
        setLoading(true);
        setFirebaseError(null);
        try {
            await registerUser(data.email, data.password, data.fullName);
            router.replace("/(tabs)");
        } catch (err: any) {
            const msg = getFirebaseErrorMessage(err.code);
            setFirebaseError(msg);
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
                        rules={{ validate: validateFullName }}
                        render={({ field }) => (
                            <View>
                                <Input label="Full Name" placeholder="Enter your full name" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
                                {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{ validate: validateEmailField }}
                        render={({ field }) => (
                            <View>
                                <Input label="Email" placeholder="example@email.com" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} autoCapitalize="none" />
                                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{ validate: validatePasswordField }}
                        render={({ field }) => (
                            <View>
                                <Input label="Password" placeholder="Create a password" secureTextEntry value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
                                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{ validate: validateConfirmPassword(password) }}
                        render={({ field }) => (
                            <View>
                                <Input label="Confirm Password" placeholder="Confirm your password" secureTextEntry value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
                                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                            </View>
                        )}
                    />

                    <View style={styles.checkboxContainer}>
                        <Controller
                            control={control}
                            name="agreeTerms"
                            rules={{ required: "You must agree to the terms" }}
                            render={({ field }) => (
                                <ExpoCheckbox value={field.value} onValueChange={field.onChange} color={field.value ? "#6C3EF4" : undefined} />
                            )}
                        />
                        <Text style={styles.checkboxLabel}>I agree to the Terms & Conditions and Privacy Policy</Text>
                    </View>
                    {errors.agreeTerms && <Text style={styles.errorText}>{errors.agreeTerms.message}</Text>}
                    {firebaseError && <Text style={styles.errorText}>{firebaseError}</Text>}

                    <Button title={loading ? "Creating Account..." : "Sign Up →"} onPress={handleSubmit(onSubmit)} style={styles.signUpButton} />

                    <Text style={styles.footer}>
                        Already have an account? <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>Login</Text>
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
