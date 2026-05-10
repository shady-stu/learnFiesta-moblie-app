import { useState } from "react";
import { Linking, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function TabsSection({ notes, keyConcepts, resources, qa }) {
  const [activeTab, setActiveTab] = useState("notes");

  const safeNotes = Array.isArray(notes) ? notes : [];
  const safeKeyConcepts = Array.isArray(keyConcepts) ? keyConcepts : [];
  const safeResources = Array.isArray(resources) ? resources : [];
  const safeQa = Array.isArray(qa) ? qa : [];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, activeTab === "notes" && styles.activeTab]} onPress={() => setActiveTab("notes")}>
          <Text style={[styles.tabText, activeTab === "notes" && styles.activeTabText]}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === "resources" && styles.activeTab]} onPress={() => setActiveTab("resources")}>
          <Text style={[styles.tabText, activeTab === "resources" && styles.activeTabText]}>Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === "qa" && styles.activeTab]} onPress={() => setActiveTab("qa")}>
          <Text style={[styles.tabText, activeTab === "qa" && styles.activeTabText]}>Q&A</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === "notes" && (
          <View>
            {safeNotes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <Text style={styles.timestamp}>Timestamp: {note.timestamp}</Text>
                <Text style={styles.noteText}>{note.text}</Text>
              </View>
            ))}
            <Text style={styles.conceptsTitle}>Key Concepts</Text>
            {safeKeyConcepts.map((item, idx) => (
              <View key={idx} style={styles.conceptItem}>
                <Ionicons name="checkmark-circle" size={16} color="#5523d1" />
                <Text style={styles.conceptText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === "resources" && (
          <View>
            {safeResources.length === 0 && (
              <Text style={styles.emptyText}>No resources for this lesson yet.</Text>
            )}
            {safeResources.map((res) => (
              <TouchableOpacity
                key={res.id}
                style={styles.resourceCard}
                onPress={() => res.url && Linking.openURL(res.url)}
                disabled={!res.url}
              >
                <Ionicons name="document-text-outline" size={24} color="#5523d1" />
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceTitle}>{res.title}</Text>
                  {res.url ? <Text style={styles.resourceUrl}>{res.type}</Text> : null}
                </View>
                {res.url ? <Ionicons name="open-outline" size={18} color="#94a3b8" /> : null}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === "qa" && (
          <View>
            {safeQa.map((item) => (
              <View key={item.id} style={styles.qaCard}>
                <Text style={styles.question}>Q: {item.question}</Text>
                <Text style={styles.answer}>A: {item.answer}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginTop: 8 },
  tabBar: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#5523d120" },
  tab: { flex: 1, paddingVertical: 16, alignItems: "center" },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#5523d1" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#64748b" },
  activeTabText: { color: "#5523d1" },
  content: { padding: 16 },
  noteCard: { backgroundColor: "#f1f5f9", padding: 12, borderRadius: 12, marginBottom: 16 },
  timestamp: { fontSize: 10, fontWeight: "bold", color: "#5523d1", backgroundColor: "#ede9fe", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, alignSelf: "flex-start", marginBottom: 8 },
  noteText: { fontSize: 13, fontStyle: "italic", color: "#334155" },
  conceptsTitle: { fontSize: 14, fontWeight: "bold", color: "#1e293b", marginTop: 8, marginBottom: 8 },
  conceptItem: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  conceptText: { fontSize: 13, color: "#475569" },
  resourceCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, backgroundColor: "#f8fafc", borderRadius: 12, marginBottom: 12 },
  resourceInfo: { flex: 1 },
  resourceTitle: { fontSize: 14, fontWeight: "500", color: "#0f172a" },
  resourceUrl: { fontSize: 11, color: "#64748b", marginTop: 2, textTransform: "uppercase" },
  qaCard: { backgroundColor: "#f8fafc", padding: 12, borderRadius: 12, marginBottom: 12 },
  question: { fontWeight: "bold", color: "#5523d1", marginBottom: 4 },
  answer: { color: "#334155" },
  emptyText: { color: "#64748b", fontSize: 13, paddingVertical: 8 },
});
