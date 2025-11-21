import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RecipeImage } from './RecipeImage';
import type { RecipeListItem } from '@/types/recipe';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, LINE_HEIGHT, SHADOW, ACTIVE_OPACITY, ICON_SIZE } from '@/constants/uiConstants';

interface RecipeCardProps {
  recipe: RecipeListItem;
  onPress: (recipeId: number) => void;
  onFavoritePress?: (recipe: RecipeListItem) => void;
  isFavorite?: boolean;
  width?: number;
}

export const RecipeCard = ({ recipe, onPress, onFavoritePress, isFavorite = false, width }: RecipeCardProps) => {
  const cardWidth = width || (Dimensions.get('window').width - SPACING.lg * 3) / 2;
  const imageHeight = cardWidth * 0.75;

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (onFavoritePress) {
      onFavoritePress(recipe);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => onPress(recipe.id)}
      activeOpacity={ACTIVE_OPACITY}
    >
      <View style={styles.imageContainer}>
        <RecipeImage 
          uri={recipe.image} 
          width={cardWidth} 
          height={imageHeight} 
          borderRadius={0} 
        />
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={ACTIVE_OPACITY}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={ICON_SIZE.md}
              color={isFavorite ? COLORS.primary : COLORS.text.primary}
            />
          </TouchableOpacity>
        )}
        {recipe.cuisine && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{recipe.cuisine}</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>
        {recipe.tags && recipe.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {recipe.tags.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
    ...SHADOW.medium,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.small,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  content: {
    padding: SPACING.md,
  },
  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
    lineHeight: LINE_HEIGHT.md,
    marginBottom: SPACING.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.xs,
  },
  tag: {
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.xs,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  tagText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
});

