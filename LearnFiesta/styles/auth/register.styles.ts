import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

export const registerStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: Spacing.lg },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: { fontWeight: '700', fontSize: 16, color: Colors.primary, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 2 },
  subtitle2: { fontSize: 14, color: '#666', marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12, gap: 10 },
  checkboxLabel: { flex: 1, fontSize: 14, color: '#444' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 8 },
  signUpButton: { marginTop: 8 },
  footer: { marginTop: 20, textAlign: 'center', color: '#666' },
  link: { color: Colors.primary, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  dividerText: { marginHorizontal: 10, fontSize: 12, color: '#888' },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  socialBtn: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
  },
});