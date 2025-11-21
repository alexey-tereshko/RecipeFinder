import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '@/constants/uiConstants';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator = ({ message = 'Loading...' }: LoadingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
  },
});

