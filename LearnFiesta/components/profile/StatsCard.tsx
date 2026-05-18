import React from 'react';
import { View, Text } from 'react-native';
import { profileStyles as styles } from './styles';

type Props = {
    coursesCompleted: number;
    hoursLearned: number;
};

export default function StatsCard({ coursesCompleted, hoursLearned }: Props) {
    return (
        <View style={styles.statsRow}>
            <View style={styles.statBox}>
                <Text style={styles.statNumber}>{coursesCompleted}</Text>
                <Text style={styles.statLabel}>COURSES COMPLETED</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
                <Text style={styles.statNumber}>{hoursLearned}</Text>
                <Text style={styles.statLabel}>HOURS LEARNED</Text>
            </View>
        </View>
    );
}