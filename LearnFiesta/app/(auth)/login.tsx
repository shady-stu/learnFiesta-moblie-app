import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import { validateEmail, validatePassword } from "@/utils/validators";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/auth/useAuth";
import { loginStyles as styles } from "@/styles/auth/login.styles"; 

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

  const { login, loading, error: authError } = useAuth();
  const [errors, setErrors] = useState<FormErrors>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    if (emailError || passwordError) {
      if (passwordError?.includes("6")) {
        Alert.alert("Invalid Password", "Password must be at least 6 characters long.");
      } else if (emailError) {
        Alert.alert("Invalid Email", emailError);
      } else if (passwordError) {
        Alert.alert("Invalid Password", passwordError);
      }
      setErrors({
        email: emailError ?? undefined,
        password: passwordError ?? undefined,
      });
      return;
    }

    setErrors({});
    setLocalError(null);

    const user = await login(data.email, data.password);
    if (user) {
      console.log("✅ Login success via useAuth");
      router.replace("/post-login-splash");
    } else {
      setLocalError(authError || "Login failed");
      Alert.alert("Login Failed", authError || "Invalid credentials");
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

        {(localError || authError) && (
          <Text style={styles.error}>{localError || authError}</Text>
        )}

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
          <Text style={styles.link} onPress={() => router.push("/register")}>
            Register
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
