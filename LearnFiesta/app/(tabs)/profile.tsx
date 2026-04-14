import { View, Text, Button, Alert } from 'react-native';
import { router } from 'expo-router';
import { logoutUser } from '@/api/services/authService/authService';
import { auth } from '@/api/services/firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
    const handleLogout = async () => {
        try {
            console.log("Attempting logout...");

            await logoutUser();

            await signOut(auth);

            console.log("Logout successful");

            router.replace('/login');

        } catch (error: any) {
            console.error("Logout error:", error);
            Alert.alert('Logout Error', error.message || 'Failed to log out. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Profile</Text>
            <Button title="Logout" onPress={handleLogout} color="#6C3EF4" />
        </View>
    );
}