import { StyleSheet } from "react-native";

export const foundationStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FDF7FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FDF7FF",
    paddingHorizontal: 20,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF7FF",
    padding: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 24,
  },
  step: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D1A24",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#5A5F63",
  },
  cardLarge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardSmall: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
    color: "#1D1A24",
  },
  helperText: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 12,
  },
  learningBlock: {
    marginTop: 4,
  },
  learningPointRow: {
    marginBottom: 6,
  },
  learningPointInput: {
    flex: 1,
  },
  addPointButton: {
    borderWidth: 1,
    borderColor: "#5624D0",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4,
  },
  addPointText: {
    color: "#5624D0",
    fontWeight: "700",
  },
  removePointButton: {
    alignSelf: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: -10,
    marginBottom: 8,
  },
  removePointText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 12,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E0EE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F8F1FF",
  },
  currency: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5624D0",
    marginRight: 6,
  },
  usd: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 6,
  },
  footer: {
    marginTop: 10,
    marginBottom: 30,
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  thumbnailPreview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 10,
  },
});
