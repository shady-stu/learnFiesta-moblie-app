import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LessonInfo({ module, duration, title, description, courseId, prevLessonId, nextLessonId }) {
  return (
    <View style={styles.container}>
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{module}</Text>
        </View>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

    
      <View style={styles.buttonRow}>
        {prevLessonId ? (
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={() =>
              router.push({
                pathname: "/lesson/[id]",
                params: { id: prevLessonId, courseId },
              })
            }
          >
            <Ionicons name="chevron-back" size={20} color="#5523d1" />
            <Text style={styles.prevButtonText}>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.navButton, styles.disabledButton]} />
        )}

        {nextLessonId ? (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={() =>
              router.push({
                pathname: "/lesson/[id]",
                params: { id: nextLessonId, courseId },
              })
            }
          >
            <Text style={styles.nextButtonText}>Next Lesson</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={[styles.navButton, styles.disabledButton]} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#5523d1',
    borderBottomOpacity: 0.1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
  badge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#5523d1',
  },
  dot: {
    color: '#94a3b8',
    fontSize: 12,
  },
  duration: {
    fontSize: 12,
    color: '#64748b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: '#5523d120',
    backgroundColor: '#f8fafc',
  },
  prevButtonText: {
    color: '#5523d1',
    fontWeight: '600',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#5523d1',
    shadowColor: '#5523d1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  disabledButton: {
    flex: 1,
  },
});
