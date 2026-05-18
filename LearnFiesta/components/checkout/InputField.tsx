import React from "react";
import {
    Keyboard,
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
} from "react-native";
import {Controller, Control, RegisterOptions,} from "react-hook-form";
import { Colors } from "@/constants/colors";
import {CheckoutFormData} from "@/types/CheckoutFormData";

type InputFieldProps = {
    label: string;
    placeholder: string;
    secureTextEntry?: boolean;
    control: Control<CheckoutFormData>;
    name: keyof CheckoutFormData;
    rules?: RegisterOptions<CheckoutFormData, keyof CheckoutFormData>;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
}

const InputField = ({
    label,
    placeholder,
    secureTextEntry = false,
    control,
    name,
    rules = {},
    keyboardType = "default",
    returnKeyType = "next",
}: InputFieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({field: { onChange, onBlur, value }, fieldState: { error },}) => (
                    <>
                        <TextInput
                            placeholder={placeholder}
                            placeholderTextColor={Colors.textSecondary}
                            secureTextEntry={secureTextEntry}
                            keyboardType={keyboardType}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            returnKeyType={returnKeyType}
                            blurOnSubmit
                            onSubmitEditing={Keyboard.dismiss}
                            style={[
                                styles.input,
                                error && styles.inputError,
                            ]}
                        />

                        {error && (
                            <Text style={styles.errorText}>
                                {error.message}
                            </Text>
                        )}
                    </>
                )}
            />
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },

    label: {
        marginBottom: 8,
        color: Colors.textSecondary,
        fontWeight: "600",
        fontSize: 12,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        backgroundColor: Colors.white,
        fontSize: 16,
        color: Colors.textPrimary,
    },

    inputError: {
        borderColor: "red",
    },

    errorText: {
        marginTop: 6,
        color: "red",
        fontSize: 12,
    },
});
