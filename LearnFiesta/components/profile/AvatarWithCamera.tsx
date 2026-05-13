import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert, ActivityIndicator, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/api/services/firebase';
import { uploadToCloudinary } from '@/api/services/cloudinary';
import { Colors } from '@/constants/colors';
import { profileStyles as styles } from './styles';

type Props = {
    photoURL: string;
    onPhotoUpdate: (url: string) => void;
};

export default function AvatarWithCamera({ photoURL, onPhotoUpdate }: Props) {
    const [uploading, setUploading] = useState(false);

    const takePhoto = async () => {
        try {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permission needed",
                    "Camera access is required."
                );
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });

            if (result.canceled) return;

            const imageUri = result.assets[0].uri;

            console.log("IMAGE URI:", imageUri);

            setUploading(true);

            const uploadedUrl = await uploadToCloudinary(imageUri);

            const user = auth.currentUser;

            if (!user) {
                throw new Error("User not logged in");
            }

            await updateDoc(doc(db, "users", user.uid), {
                photoURL: uploadedUrl,
            });

            onPhotoUpdate(uploadedUrl);

            Alert.alert("Success", "Profile picture updated!");
        } catch (error: any) {
            console.log("PHOTO ERROR:", error);
            Alert.alert("Error", error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <TouchableOpacity onPress={takePhoto} style={styles.avatarContainer}>
            {photoURL ? (
                <Image source={{ uri: photoURL }} style={styles.avatar} />
            ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                    <Text style={styles.avatarPlaceholderText}>No Photo</Text>
                </View>
            )}
            <View style={styles.editIconBadge}>
                <Ionicons name="camera-outline" size={16} color={Colors.white} />
            </View>
            {uploading && <ActivityIndicator style={{ position: 'absolute', top: 40, left: 40 }} />}
        </TouchableOpacity>
    );
}
