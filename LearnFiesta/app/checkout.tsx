import React from "react";
import { ScrollView, View, StyleSheet,} from "react-native";
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
import { mockCourses } from "@/constants/mockcourses";
export default function Checkout  ()  {
    const { control, handleSubmit } = useForm<CheckoutFormData>({
        defaultValues: {
            cardholderName: "",
            cardNumber: "",
            expiry: "",
            cvv: "",
        },
    });
    const subtotal = mockCourses.reduce((s, c) => s + c.price, 0);
    const discount = 10;
    const total = subtotal - discount;
    const onSubmit = (data: any) => {
        console.log(data);
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
                {mockCourses.map((course) => (
                    <View key={course.id} style={{ marginBottom: 12 }}>
                        <CourseSummaryCard course={course} />
                    </View>
                ))}</ScrollView>
                <View style={{ height: 32 }} />
                <SectionTitle title="Payment Method" />
                <PaymentTabs />
                <CreditCardForm control={control} />
                <View style={{ height: 32 }} />
                <OrderSummaryCard
                    courses={mockCourses}
                    total={total}
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
        width: 320, // 👈 important for horizontal layout
    },
});