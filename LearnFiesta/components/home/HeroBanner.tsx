import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/radius';
import { Spacing } from '@/constants/spacing';

export default function HeroBanner() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f' }}
      style={styles.container}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <ThemedText style={styles.badge}>FEATURED COURSE</ThemedText>
        <ThemedText style={styles.title}>Master UI/UX Design with Figma 2024</ThemedText>
        <ThemedText style={styles.subtitle}>
          Learn industry secrets from top designers.
        </ThemedText>

        <Pressable style={styles.button}>
          <ThemedText style={styles.buttonText}>Enroll Now</ThemedText>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    borderRadius: Radius.md,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: {
    borderRadius: Radius.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(86, 36, 208, 0.65)',
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  badge: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.white,
    fontSize: 12,
  },
  button: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.sm,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});