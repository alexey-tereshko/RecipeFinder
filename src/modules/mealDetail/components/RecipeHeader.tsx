import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { RecipeImage } from '../../../components/recipe';
import type { Recipe } from '../../../types/recipe';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../../constants/uiConstants';

interface RecipeHeaderProps {
  recipe: Recipe;
}

export const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
  const { width } = useWindowDimensions();
  const imageWidth = width - 32;
  const imageHeight = (imageWidth * 9) / 16;

  return (
    <View style={styles.container}>
      <RecipeImage 
        uri={recipe.image} 
        width={imageWidth} 
        height={imageHeight} 
        borderRadius={BORDER_RADIUS.lg} 
      />
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.name}</Text>
        {recipe.category && (
          <Text style={styles.category}>{recipe.category}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
  },
  info: {
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  category: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    textTransform: 'capitalize',
  },
});

