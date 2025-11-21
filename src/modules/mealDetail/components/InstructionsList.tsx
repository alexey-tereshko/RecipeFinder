import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, LINE_HEIGHT, BORDER_RADIUS } from '@/constants/uiConstants';

interface InstructionsListProps {
  instructions: string[];
}

export const InstructionsList = ({ instructions }: InstructionsListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <FlatList
        data={instructions}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
    lineHeight: LINE_HEIGHT.xl,
  },
  item: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
    marginRight: SPACING.md,
    lineHeight: LINE_HEIGHT.md,
  },
  text: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    lineHeight: LINE_HEIGHT.md,
  },
});

