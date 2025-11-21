import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { RecipeImage } from '@/components/recipe';
import type { Recipe } from '@/types/recipe';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, LINE_HEIGHT } from '@/constants/uiConstants';

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
    marginTop: SPACING.xl,
  },
  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    lineHeight: LINE_HEIGHT.xl,
  },
  category: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.secondary,
    textTransform: 'capitalize',
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.lg,
  },
});

