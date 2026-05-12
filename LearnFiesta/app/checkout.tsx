import React, {useState} from "react";
import { Text,ScrollView, View, StyleSheet,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Colors} from "@/constants/colors";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import SectionTitle from "../components/checkout/SectionTitle";
import CourseSummaryCard from "../components/checkout/CourseSummaryCard";
import PaymentTabs from "../components/checkout/PaymentTabs";
import CreditCardForm from "../components/checkout/CreditCardForm";
import OrderSummaryCard from "../components/checkout/OrderSummaryCard";
import TrustBadges from "../components/checkout/TrustBadges";
import {useForm} from "react-hook-form";
import {CheckoutFormData} from "@/types/CheckoutFormData";
import { useCartContext } from "./context/CartContext";

export default function Checkout  ()  {
    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
    const { cart } = useCartContext();
    const { control, handleSubmit } = useForm<CheckoutFormData>({
        mode: "all",
        defaultValues: {
            cardholderName: "",
            cardNumber: "",
            expiry: "",
            cvv: "",
        },
    });
    const subtotal = cart.items.reduce(
        (sum, item) => sum + item.price,
        0
    );
    const onSubmit = (data: CheckoutFormData) => {
        console.log("Checkout Data:", data);
        console.log("Cart:", cart.items);
    };
    return (
        <SafeAreaView style={styles.container}>
            <CheckoutHeader />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <SectionTitle title="Course Summary" />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                >
                    {cart.items.map((item) => (
                        <View
                            key={item.courseId}
                            style={styles.cardWrapper}
                        >
                            <CourseSummaryCard course={item} />
                        </View>
                    ))}</ScrollView>
                <View style={{ height: 32 }} />
                <SectionTitle title="Payment Method" />
                <PaymentTabs
                    selected={paymentMethod}
                    onChange={setPaymentMethod}
                />
                {paymentMethod === "card" ? (
                    <CreditCardForm control={control} />
                ) : (
                    <View style={{ padding: 16 }}>
                        <Text style={{ fontWeight: "500" }}>
                            Pay with PayPal
                        </Text>

                        <Text style={{ color: "gray", marginTop: 6 }}>
                            You will be redirected to PayPal after checkout.
                        </Text>
                    </View>
                )}
                <View style={{ height: 32 }} />
                <OrderSummaryCard
                    courses={cart.items}
                    total={subtotal}
                    onPress={handleSubmit(onSubmit)}
                />
                <TrustBadges />
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        padding: 24,
        paddingBottom: 60,
    },
    list: {
        paddingHorizontal: 16,
        gap: 12,
    },

    cardWrapper: {
        width: 320,
    },
});