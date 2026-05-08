import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { profileStyles as styles } from './styles';

const settingsItems = ['Account Settings', 'Notifications', 'Download Options', 'Payment Methods', 'Help & Support'];

export default function SettingsList() {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
            {settingsItems.map((item) => (
                <TouchableOpacity
                    key={item}
                    style={styles.settingItem}
                >
                    <Text style={styles.settingText}>{item}</Text>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}