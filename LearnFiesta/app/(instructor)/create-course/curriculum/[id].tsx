import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '@/api/services/firebase';



interface Lesson {
  title: string;
  type: string;
  order?: number;
}

interface Section {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export default function CurriculumBuilderScreen() {
  const { id } = useLocalSearchParams();
  
  
  const courseId = id as string; 

 
  const [sections, setSections] = useState<Section[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

  
    const sectionsRef = collection(db, 'courses', courseId, 'sections');
    const q = query(sectionsRef, orderBy('order', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
     
      const sectionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Section[]; 
      
      setSections(sectionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [courseId]);

  const handleAddSection = async () => {
    try {
      const sectionsRef = collection(db, 'courses', courseId, 'sections');
      await addDoc(sectionsRef, {
        title: `Section ${sections.length + 1}`,
        order: sections.length,
        lessons: [] 
      });
    } catch (error) {
      console.error("Error adding section: ", error);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#5624D0" />;

  return (
    <ScrollView style={styles.container}>
      {/* Stepper Header */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepCompleted}>
          <MaterialIcons name="check" size={16} color="#fff" />
        </View>
        <Text style={styles.stepTextCompleted}>1. Foundations</Text>
        <View style={styles.line} />
        <View style={styles.stepActive}>
          <Text style={styles.stepTextActive}>2</Text>
        </View>
        <Text style={styles.stepTitleActive}>Curriculum</Text>
      </View>

      {/* Sections List */}
      {sections.map((section, index) => (
        <View key={section.id} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="drag-indicator" size={24} color="#7a7486" />
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity>
              <MaterialIcons name="delete-outline" size={24} color="#ba1a1a" />
            </TouchableOpacity>
          </View>

          {/* Lessons */}
          {section.lessons?.map((lesson, i) => (
            <View key={i} style={styles.lessonItem}>
              <MaterialIcons name="drag-indicator" size={20} color="#7a7486" />
              <MaterialIcons name={lesson.type === 'video' ? 'play-circle' : 'article'} size={24} color="#5624d0" />
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
            </View>
          ))}

          {/* Add Lesson Button */}
          <TouchableOpacity style={styles.addLessonBtn}>
            <MaterialIcons name="add" size={20} color="#5624D0" />
            <Text style={styles.addLessonText}>Add Lesson</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Section Button */}
      <TouchableOpacity style={styles.addSectionBtn} onPress={handleAddSection}>
        <View style={styles.addSectionIconBg}>
          <MaterialIcons name="add" size={24} color="#5a5f63" />
        </View>
        <Text style={styles.addSectionText}>Add New Section</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF7FF', padding: 20 },
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  stepCompleted: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#5624D0', alignItems: 'center', justifyContent: 'center' },
  stepTextCompleted: { marginLeft: 8, fontSize: 14, color: '#494455' },
  line: { height: 2, width: 40, backgroundColor: '#5624D0', marginHorizontal: 16 },
  stepActive: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#5624D0', alignItems: 'center', justifyContent: 'center' },
  stepTextActive: { color: '#fff', fontWeight: 'bold' },
  stepTitleActive: { marginLeft: 8, fontSize: 16, color: '#5624D0', fontWeight: 'bold' },
  sectionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e6e0ee', borderLeftWidth: 4, borderLeftColor: '#5624D0' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 8, color: '#1D1A24' },
  lessonItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f1ff', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#e6e0ee' },
  lessonTitle: { marginLeft: 12, fontSize: 14, color: '#1D1A24' },
  addLessonBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderWidth: 1, borderColor: '#5624D0', borderStyle: 'dashed', borderRadius: 8, marginTop: 8 },
  addLessonText: { color: '#5624D0', fontWeight: 'bold', marginLeft: 8 },
  addSectionBtn: { height: 80, borderWidth: 2, borderColor: '#cac3d8', borderStyle: 'dashed', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  addSectionIconBg: { backgroundColor: '#e6e0ee', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  addSectionText: { fontSize: 16, fontWeight: 'bold', color: '#494455' }
});