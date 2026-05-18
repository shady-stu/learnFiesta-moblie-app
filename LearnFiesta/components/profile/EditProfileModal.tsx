import React, { useState, useEffect } from 'react';
import {View, Text, Alert} from 'react-native';
import Modal from 'react-native-modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { profileStyles as styles } from './styles';

type Props = {
    visible: boolean;
    onClose: () => void;
    currentName: string;
    onSave: (newName: string) => void;
    saving: boolean;
};

export default function EditProfileModal({ visible, onClose, currentName, onSave, saving }: Props) {
    const [editName, setEditName] = useState(currentName);

    useEffect(() => {
        setEditName(currentName);
    }, [currentName]);

    const handleSave = () => {
        if (editName.trim().length < 3) {
            Alert.alert('Invalid Name', 'Name must be at least 3 characters');
            return;
        }
        onSave(editName.trim());
    };

    return (
        <Modal isVisible={visible} onBackdropPress={onClose} avoidKeyboard>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Name</Text>
                <Input
                    label="Full Name"
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Enter your name"
                    returnKeyType="done"
                    onSubmitEditing={handleSave}
                />
                <View style={styles.modalButtons}>
                    <Button title="Cancel" onPress={onClose} type="outline" />
                    <Button title={saving ? 'Saving...' : 'Save'} onPress={handleSave} />
                </View>
            </View>
        </Modal>
    );
}
