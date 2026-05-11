import React from "react";
import {View, Text, StyleSheet, Pressable, Linking,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useResources } from "@/libr/useResources";
import { ResourceType } from "@/types/lesson";

type Props = {
    courseId: string;
};

export default function ResourcesTab({ courseId }: Props) {
    const {data: resources, isLoading,} = useResources(courseId);
    const getResourceIcon = (type: ResourceType) => {

        if (type === "pdf") { return "document-text-outline"; }
        if (type === "slides") { return "layers-outline"; }
        return "document-outline";
    };

    const getResourceLabel = (type: ResourceType) => {

        if (type === "pdf") { return "PDF"; }
        if (type === "slides") { return "Slides"; }
        return "Resource";
    };

    if (isLoading) {
        return <Text>Loading resources...</Text>;
    }

    if (!resources || resources.length === 0) {
        return <Text>No resources available</Text>;
    }

    return (
        <View style={styles.container}>
            {resources.map((item) => (
                <Pressable
                    key={item.id}
                    style={styles.card}
                    onPress={() => Linking.openURL(item.url)}
                >
                    <Ionicons
                        name={getResourceIcon(item.type) as any}
                        size={22}
                        color="#5523d1"
                    />

                    <View style={styles.info}>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>

                        <Text style={styles.type}>
                            {getResourceLabel(item.type)}
                        </Text>
                    </View>

                    <Ionicons
                        name="download-outline"
                        size={20}
                        color="#999"
                    />
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        gap: 10,
    },

    info: {
        flex: 1,
    },

    title: {
        fontSize: 13,
        fontWeight: "600",
    },

    type: {
        fontSize: 11,
        color: "#777",
        marginTop: 2,
    },
});