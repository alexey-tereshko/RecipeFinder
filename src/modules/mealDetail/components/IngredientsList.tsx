import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../constants/uiConstants';

interface IngredientsListProps {
  ingredients: string[];
}

export const IngredientsList = ({ ingredients }: IngredientsListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.bullet}>•</Text>
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
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  item: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginRight: SPACING.sm,
  },
  text: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    lineHeight: 24,
  },
});

