
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.input, error && { borderColor: "red" }]}
        onPress={() => setOpen(!open)}
      >
        <Text style={{ color: selected ? Colors.textPrimary : Colors.textSecondary }}>
          {selected ? selected.label : "Select option"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 6,
    color: Colors.textPrimary,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 10,
  },

  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    overflow: "hidden",
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.muted,
  },

  optionText: {
    color: Colors.textPrimary,
  },

  error: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});