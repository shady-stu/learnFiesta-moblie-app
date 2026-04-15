import { View, Text, Button, Alert } from 'react-native';
import { router } from 'expo-router';
import { logoutUser } from '@/api/services/authService/authService';
import { auth } from '@/api/services/firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await logoutUser();
                },
            },
        ]);
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Profile</Text>
            <Button title="Logout" onPress={handleLogout} color="#6C3EF4" />
        </View>
    );
}