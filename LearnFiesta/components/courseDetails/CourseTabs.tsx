import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

type Props = {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function CourseTabs({ tabs, activeTab, onTabChange }: Props) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {tabs.map((tab) => {
                const isActive = tab === activeTab;
                return (
                    <Pressable key={tab} onPress={() => onTabChange(tab)}>
                        <Text style={[styles.tab, isActive && styles.activeTab]}>
                            {tab}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    content: {
        paddingHorizontal: 16,
    },
    tab: {
        color: "#777",
        marginRight: 16,
        paddingBottom: 8,
        paddingTop: 4,
    },
    activeTab: {
        color: "#5523d1",
        fontWeight: "700",
        borderBottomWidth: 2,
        borderBottomColor: "#5523d1",
    },
});