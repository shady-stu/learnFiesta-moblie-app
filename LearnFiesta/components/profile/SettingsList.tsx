import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles as styles } from './styles';

const settingsItems = [
    { title: 'Account Settings', icon: 'person-outline' },
    { title: 'Notifications', icon: 'notifications-outline' },
    { title: 'Download Options', icon: 'download-outline' },
    { title: 'Payment Methods', icon: 'card-outline' },
    { title: 'Help & Support', icon: 'help-circle-outline' },
] as const;

export default function SettingsList() {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            {settingsItems.map((item) => (
                <TouchableOpacity key={item.title} style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <View style={styles.settingIcon}>
                            <Ionicons name={item.icon} size={18} color="#5624D0" />
                        </View>
                        <Text style={styles.settingText}>{item.title}</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={18} color="#A0A7B1" />
                </TouchableOpacity>
            ))}
        </View>
    );
}
