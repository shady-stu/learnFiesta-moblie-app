import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";

const LoadingView = () => {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
});

export default LoadingView;