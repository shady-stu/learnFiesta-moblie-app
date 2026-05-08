import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Colors } from "@/constants/colors";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function TextInputField({
  label,
  error,
  style,
  ...rest
}: Props) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...rest}
        style={[
          styles.input,
          error && styles.inputError,
          style, // allow external styles
        ]}
        placeholderTextColor={Colors.textSecondary}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const ERROR_COLOR = "red";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    color: Colors.textPrimary,
  },

  inputError: {
    borderColor: ERROR_COLOR,
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: ERROR_COLOR,
  },
});