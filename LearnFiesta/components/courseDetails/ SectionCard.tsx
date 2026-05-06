import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    number: number;
    title: string;
    defaultExpanded?: boolean;
    children?: React.ReactNode;
}

export default function SectionCard({number, title, defaultExpanded = true, children,}: Props) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <View style={styles.card}>
            <Pressable
                style={styles.header}
                onPress={() => setExpanded((prev) => !prev)}
            >
                <View>
                    <Text style={styles.sectionNumber}>Section {number}</Text>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#999"
                />
            </Pressable>

            {expanded && children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
    },
    sectionNumber: {
        fontSize: 10,
        color: "#5523d1",
        fontWeight: "700",
    },
    sectionTitle: {
        fontWeight: "600",
        marginTop: 2,
    },
});