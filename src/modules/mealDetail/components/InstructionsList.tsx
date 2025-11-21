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
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>{index + 1}</Text>
            </View>
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
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
    minWidth: 36,
  },
  stepText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
    lineHeight: LINE_HEIGHT.lg,
  },
  text: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    lineHeight: LINE_HEIGHT.md,
  },
});

