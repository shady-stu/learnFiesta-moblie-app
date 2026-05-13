// InstructorCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { Radius } from '@/constants/radius';

export type Instructor = {
  id: string;
  courseId: string;
  title: string;
  imageUrl: string;
  students: number;
  revenue: number;
  rating: number;
  isActive: boolean;
};
const InstructorCard = ({ title, students, revenue, rating, isActive, imageUrl }: Instructor) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImagePlaceholder}>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        )}
        {isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>ACTIVE</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>

        <View style={styles.cardStatsRow}>
          <View>
            <Text style={styles.cardStatLabel}>Students</Text>
            <Text style={styles.cardStatValue}>{students.toLocaleString()}</Text>
          </View>

          <View>
            <Text style={styles.cardStatLabel}>Revenue</Text>
            <Text style={styles.cardStatValue}>${revenue.toLocaleString()}</Text>
          </View>

          <View>
            <Text style={styles.cardStatLabel}>Rating</Text>
            <Text style={styles.cardStatValue}>
  {rating > 0 ? (
    <>
      <Text>{rating} </Text>
      <Text style={{ color: '#F59E0B' }}>★</Text>
    </>
  ) : 'N/A'}
</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardImagePlaceholder: {
    height: 130,
    backgroundColor: '#1A1A3E',
  },
  activeBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },
  cardBody: { padding: Spacing.md },
  cardTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.md,
    color: Colors.textPrimary,
  },
  cardStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  cardStatLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  cardStatValue: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardActions: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  editButton: {
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
  },
  editButtonText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
});

export default InstructorCard;