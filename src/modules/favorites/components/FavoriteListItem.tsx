import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RecipeImage } from '@/components/recipe/RecipeImage';
import type { RecipeListItem } from '@/types/recipe';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  FONT_FAMILY,
  LINE_HEIGHT,
  ICON_SIZE,
  ACTIVE_OPACITY,
} from '@/constants/uiConstants';

interface FavoriteListItemProps {
  recipe: RecipeListItem;
  onPress: (recipeId: number) => void;
  onFavoritePress?: (recipeId: number) => void;
}

export const FavoriteListItem = ({
  recipe,
  onPress,
  onFavoritePress,
}: FavoriteListItemProps) => {
  const imageSize = 80;

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (onFavoritePress) {
      onFavoritePress(recipe.id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(recipe.id)}
      activeOpacity={ACTIVE_OPACITY}
    >
      <RecipeImage
        uri={recipe.image}
        width={imageSize}
        height={imageSize}
        borderRadius={BORDER_RADIUS.md}
      />
      <View style={styles.content}>
        {recipe.cuisine && (
          <Text style={styles.category}>{recipe.cuisine.toUpperCase()}</Text>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={handleFavoritePress}
        activeOpacity={ACTIVE_OPACITY}
      >
        <Ionicons
          name="heart"
          size={ICON_SIZE.md}
          color={COLORS.primary}
          allowFontScaling={false}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.lg,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    marginRight: SPACING.sm,
  },
  category: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    lineHeight: LINE_HEIGHT.md,
  },
  favoriteIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
