import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { auth, db } from '@/api/services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { logoutUser } from '@/api/services/authService/authService';
import { profileStyles as styles } from '@/components/profile/styles';
import AvatarWithCamera from '@/components/profile/AvatarWithCamera';
import EditProfileModal from '@/components/profile/EditProfileModal';
import StatsCard from '@/components/profile/StatsCard';
import SettingsList from '@/components/profile/SettingsList';
import InstructorAccessCard from '@/components/profile/InstructorAccessCard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';

type UserProfile = {
    name: string;
    email: string;
    role?: string;
    coursesCompleted: number;
    hoursLearned: number;
    photoURL: string;
};

export default function ProfileScreen() {
    const { isInstructor } = useCurrentUserRole();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchProfile = async () => {
        const user = auth.currentUser;
        if (!user) return router.replace('/(auth)/login');
        try {
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            if (docSnap.exists()) setProfile(docSnap.data() as UserProfile);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSaveName = async (newName: string) => {
        const user = auth.currentUser;
        if (!user) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), { name: newName });
            setProfile(prev => prev ? { ...prev, name: newName } : null);
            setModalVisible(false);
            Alert.alert('Success', 'Name updated successfully');
        } catch {
            Alert.alert('Error', 'Failed to update name');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await logoutUser();
                    router.replace('/(auth)/login');
                }
            }
        ]);
    };

    if (loading) return <SafeAreaView style={styles.container}><Text style={styles.loading}>Loading...</Text></SafeAreaView>;
    if (!profile) return <SafeAreaView style={styles.container}><Text style={styles.error}>Error loading profile</Text></SafeAreaView>;
    const canAccessInstructor = isInstructor || profile.role === 'instructor';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.appName}>LearnFiesta</Text>
                    <Text style={styles.pageSubtitle}>Your learning profile and account settings</Text>
                </View>

                <View style={styles.userCard}>
                    <AvatarWithCamera
                        photoURL={profile.photoURL}
                        onPhotoUpdate={(url) => setProfile({ ...profile, photoURL: url })}
                    />
                    <Text style={styles.userName}>{profile.name}</Text>
                    <Text style={styles.userEmail}>{profile.email}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleBadgeText}>
                            {(profile.role || 'student').toUpperCase()}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.editButtonText}>Edit Name</Text>
                    </TouchableOpacity>
                </View>

                <StatsCard
                    coursesCompleted={profile.coursesCompleted}
                    hoursLearned={profile.hoursLearned}
                />

                {canAccessInstructor && (
                    <InstructorAccessCard
                        onPress={() => router.push('/(instructor)/InstructorCourses')}
                    />
                )}

                <SettingsList />

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Version 2.4.1 (Build 1082)</Text>
            </ScrollView>

            <EditProfileModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                currentName={profile.name}
                onSave={handleSaveName}
                saving={saving}
            />
        </SafeAreaView>
    );
}
