import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY } from '@/constants/uiConstants';

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
    backgroundColor: COLORS.background.secondary,
  },
  text: {
    fontFamily: FONT_FAMILY.regular,
    marginTop: SPACING.lg,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.secondary,
    fontWeight: FONT_WEIGHT.medium,
  },
});

