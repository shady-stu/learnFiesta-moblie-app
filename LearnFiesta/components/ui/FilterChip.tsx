import React from "react";
import { Text, StyleSheet, ScrollView, Pressable} from "react-native";
import {Radius} from "@/constants/radius";
import {Colors} from "@/constants/colors";


type FilterChipProps = {
    activeFilter: string;
    onSelectFilter: (filter: string) => void;
};

export const FilterChip = ({ activeFilter, onSelectFilter }: FilterChipProps) => {
    const filters = ["All", "Free", "Top Rated", "Best seller", "Bookmarked"];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            decelerationRate="fast"
        >
            {filters.map((filter) => (
                <Pressable
                    key={filter}
                    style={[
                        styles.chip,
                        filter === activeFilter ? styles.active : styles.inactive,
                    ]}
                    onPress={() => onSelectFilter(filter)}
                >
                    <Text
                        style={[
                            styles.chipText,
                            { color: filter === activeFilter ? "#fff" : Colors.primary },
                        ]}
                    >
                        {filter}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginVertical: 5,
        gap: 8,
    },

    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: Radius.full,
        minWidth: 70,
        alignItems: "center",
        justifyContent: "center",
    },

    active: {
        backgroundColor: Colors.primary,
    },

    inactive: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d1c4fc",
    },

    chipText: {
        fontSize: 14,
        fontWeight: "500",
    },
});