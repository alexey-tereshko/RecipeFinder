import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { RecipeImage } from './RecipeImage';
import type { RecipeListItem } from '@/types/recipe';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, LINE_HEIGHT, SHADOW, ACTIVE_OPACITY } from '@/constants/uiConstants';

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
      <RecipeImage uri={recipe.image} width={100} height={100} borderRadius={BORDER_RADIUS.md} />
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
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.lg,
    ...SHADOW.medium,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.lg,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    lineHeight: LINE_HEIGHT.lg,
  },
});

