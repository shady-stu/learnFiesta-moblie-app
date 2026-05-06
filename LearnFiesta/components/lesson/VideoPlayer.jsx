import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function VideoPlayer({ thumbnail, videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
        </TouchableOpacity>
      </View>
   
      <View style={styles.controls}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '42%' }]} />
        </View>
        <View style={styles.controlsRow}>
          <View style={styles.leftControls}>
            <Ionicons name="pause" size={16} color="white" />
            <Text style={styles.timeText}>08:42 / 15:30</Text>
          </View>
          <View style={styles.rightControls}>
            <Ionicons name="settings-outline" size={16} color="white" />
            <Ionicons name="expand-outline" size={16} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16 / 9,
    backgroundColor: '#0f172a',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#5523d1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5523d1',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightControls: {
    flexDirection: 'row',
    gap: 12,
  },
  timeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
});