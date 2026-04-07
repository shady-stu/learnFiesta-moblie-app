import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Pressable} from "react-native";
import {Radius} from "@/constants/radius";
import {Colors} from "@/constants/colors";


type FilterChipProps = {
    activeFilter: string;
    onSelectFilter: (filter: string) => void;
};

export const FilterChip = (Filter: FilterChipProps) => {
    const screenWidth = Dimensions.get("window").width;
    const chipHeight = Math.max(36, screenWidth * 0.08); // responsive height
    const filters = ["All", "Free", "Top Rated", "Best seller","Bookmarked"];
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
                        { height: chipHeight },
                        filter === Filter.activeFilter ? styles.active : styles.inactive,
                    ]}
                    onPress={() => Filter.onSelectFilter(filter)}
                >
                    <Text
                        style={[
                            styles.chipText,
                            filter === Filter.activeFilter ? { color: "#fff" } : { color: Colors.primary},
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
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Radius.full,
        minWidth: 80, // minimum width for readability
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