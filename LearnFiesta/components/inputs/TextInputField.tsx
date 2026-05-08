import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

interface Props {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: "default" | "numeric" | "email-address";
}

export default function TextInputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        keyboardType={keyboardType}
        style={[styles.input, error && styles.inputError]}  // ✅ style منفصل
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