import React from "react";
import {
    Keyboard,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCartContext } from "@/app/context/CartContext";

type SearchInputProps = {
    value: string;
    onChange: (text: string) => void;
    onBackPress?: () => void;
    onCartPress?: () => void;
};
export default function SearchInput({value, onChange, onBackPress, onCartPress,}:SearchInputProps) {
    const { cart } = useCartContext();
    const cartCount = cart.totalItems;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
                <MaterialIcons name="arrow-back" size={24} color="#5523d1" />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for courses, skills, or mentors..."
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChange}
                    returnKeyType="search"
                    blurOnSubmit
                    onSubmitEditing={Keyboard.dismiss}
                />

                {value.length > 0 && (
                    <TouchableOpacity
                        onPress={() => onChange("")}
                        style={styles.clearButton}
                    >
                        <MaterialIcons name="close" size={18} color="#6b7280" />
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
                <MaterialIcons name="shopping-cart" size={24} color="#5523d1" />
                {cartCount > 0 ? (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cartCount}</Text>
                    </View>
                ) : null}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f6f6f8",
    },
    input: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: "#fff",
        color: "#111827",
    },
    iconButton: {
        padding: 6,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    cartBadge: {
        position: "absolute",
        right: 0,
        bottom: 0,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        paddingHorizontal: 4,
        backgroundColor: "#5523d1",
        alignItems: "center",
        justifyContent: "center",
    },
    cartBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700",
    },
    inputContainer: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },

    clearButton: {
        position: "absolute",
        right: 12,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
