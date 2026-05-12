import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F5F6F8", justifyContent: "center", padding: 20 },
    card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 5 },
    logo: { fontWeight: "700", fontSize: 16, color: "#6C3EF4", marginBottom: 10 },
    title: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
    subtitle: { color: "#666", marginBottom: 20 },
    error: { color: "red", marginBottom: 10 },
    dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
    line: { flex: 1, height: 1, backgroundColor: "#ddd" },
    dividerText: { marginHorizontal: 10, fontSize: 12, color: "#888" },
    socialRow: { flexDirection: "row", justifyContent: "space-between" },
    socialBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, alignItems: "center", marginHorizontal: 5 },
    footer: { marginTop: 20, textAlign: "center", color: "#666" },
    link: { color: "#6C3EF4", fontWeight: "600" },
});