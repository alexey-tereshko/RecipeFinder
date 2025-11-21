import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RecipeImage } from './RecipeImage';
import type { RecipeListItem } from '@/types/recipe';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  FONT_FAMILY,
  LINE_HEIGHT,
  SHADOW,
  ACTIVE_OPACITY,
  ICON_SIZE,
} from '@/constants/uiConstants';

interface RecipeCardProps {
  recipe: RecipeListItem;
  onPress: (recipeId: number) => void;
  onFavoritePress?: (recipe: RecipeListItem) => void;
  isFavorite?: boolean;
  width?: number;
}

export const RecipeCard = React.memo(({
  recipe,
  onPress,
  onFavoritePress,
  isFavorite = false,
  width,
}: RecipeCardProps) => {
  const cardWidth =
    width || (Dimensions.get('window').width - SPACING.lg * 3) / 2;
  const imageHeight = cardWidth * 0.75;

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (onFavoritePress) {
      onFavoritePress(recipe);
    }
  };

  return (
    <TouchableOpacity
      testID={`recipe-card-${recipe.id}`}
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
        {onFavoritePress && isFavorite && (
          <TouchableOpacity
            testID={`favorite-button-${recipe.id}`}
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={ACTIVE_OPACITY}
          >
            <Ionicons
              name="heart"
              size={ICON_SIZE.sm}
              color={COLORS.primary}
              allowFontScaling={false}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        {recipe.cuisine && (
          <Text style={styles.categoryText}>
            {recipe.cuisine.toUpperCase()}
          </Text>
        )}
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
});

RecipeCard.displayName = 'RecipeCard';

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
    width: 30,
    height: 30,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background.favoriteButton,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.small,
  },
  categoryText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
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
