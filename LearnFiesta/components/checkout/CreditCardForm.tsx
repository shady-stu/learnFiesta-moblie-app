import React from "react";
import { View, StyleSheet } from "react-native";
import { Control } from "react-hook-form";
import InputField from "./InputField";
import {CheckoutFormData} from "@/types/CheckoutFormData";
type CreditCardFormProps = {
    control: Control<CheckoutFormData>;
}

const CreditCardForm = ({control,}: CreditCardFormProps) => {
    return (
        <View style={styles.container}>
            <InputField
                label="Cardholder Name"
                placeholder="Angela Yu"
                control={control}
                name="cardholderName"
                rules={{
                    required: "Cardholder name is required",
                }}
            />

            <InputField
                label="Card Number"
                placeholder="0000 0000 0000 0000"
                control={control}
                name="cardNumber"
                keyboardType="numeric"
                rules={{
                    required: "Card number is required",
                    minLength: {
                        value: 16,
                        message: "Card number is too short",
                    },
                }}
            />

            <View style={styles.row}>
                <View style={styles.flex}>
                    <InputField
                        label="Expiry"
                        placeholder="MM/YY"
                        control={control}
                        name="expiry"
                        keyboardType="numeric"
                        rules={{
                            required: "Expiry date is required",
                        }}
                    />
                </View>

                <View style={styles.flex}>
                    <InputField
                        label="CVV"
                        placeholder="***"
                        secureTextEntry
                        control={control}
                        name="cvv"
                        keyboardType="numeric"
                        rules={{
                            required: "CVV is required",
                            minLength: {
                                value: 3,
                                message: "Invalid CVV",
                            },
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default CreditCardForm;

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },

    flex: {
        flex: 1,
    },
});