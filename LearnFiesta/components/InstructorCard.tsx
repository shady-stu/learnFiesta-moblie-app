import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { Radius } from '@/constants/radius';

export type InstructorCardProps = {
  id?: string;
  title: string;
  students: number;
  revenue: string;
  rating: number;
  isActive?: boolean;
  imageUrl?: string;
};

const InstructorCard = ({ title, students, revenue, rating, isActive, imageUrl }: InstructorCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImagePlaceholder}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        ) : null}
        {isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>ACTIVE</Text>
          </View>
        )}
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>

        <View style={styles.cardStatsRow}>
          <View style={styles.cardStat}>
            <Text style={styles.cardStatLabel}>Students</Text>
            <Text style={styles.cardStatValue}>{students.toLocaleString()}</Text>
          </View>
          <View style={styles.cardStat}>
            <Text style={styles.cardStatLabel}>Revenue</Text>
            <Text style={styles.cardStatValue}>{revenue}</Text>
          </View>
          <View style={styles.cardStat}>
            <Text style={styles.cardStatLabel}>Rating</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.cardStatValue}>{rating > 0 ? rating : 'N/A'}</Text>
              {rating > 0 && <Text style={styles.starIcon}> ★</Text>}
            </View>
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
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImagePlaceholder: {
    height: 130,
    backgroundColor: '#1A1A3E',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: Spacing.md,
    overflow: 'hidden',
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    zIndex: 1,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
    letterSpacing: 0.8,
  },
  cardBody: {
    padding: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  cardStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  cardStat: {
    alignItems: 'flex-start',
  },
  cardStatLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  cardStatValue: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    color: Colors.warning,
    fontSize: Typography.body,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  editButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  editButtonText: {
    fontSize: Typography.body,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
});

export default InstructorCard;