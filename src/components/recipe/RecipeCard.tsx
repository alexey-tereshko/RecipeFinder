import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { RecipeImage } from './RecipeImage';
import type { RecipeListItem } from '@/types/recipe';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOW, ACTIVE_OPACITY } from '@/constants/uiConstants';

interface RecipeCardProps {
  recipe: RecipeListItem;
  onPress: (recipeId: number) => void;
}

export const RecipeCard = ({ recipe, onPress }: RecipeCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(recipe.id)}
      activeOpacity={ACTIVE_OPACITY}
    >
      <RecipeImage uri={recipe.image} width={80} height={80} borderRadius={BORDER_RADIUS.md} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.small,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
  },
});

