import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Header from '@/components/ui/header';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import App from './app';
import AppHeader from '@/components/ui/header';

export default function HomeScreen() {
  return (
<view style={{ flex: 1 }}>
     <AppHeader />
     </view>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});