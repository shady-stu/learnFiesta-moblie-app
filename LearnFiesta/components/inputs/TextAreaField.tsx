import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

interface Props {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
}

export default function TextAreaField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        multiline
        numberOfLines={4}
        style={[styles.input, error && styles.inputError]}  // ✅ بدون inline object
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

    </View>
  );
}

const ERROR_COLOR = "red"; // ✅ مصدر واحد للون

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
    height: 120,                    
    textAlignVertical: "top",       
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