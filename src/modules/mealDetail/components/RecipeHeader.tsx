import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RecipeImage } from '@/components/recipe/RecipeImage';
import type { Recipe } from '@/types/recipe';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  FONT_FAMILY,
  LINE_HEIGHT,
  ICON_SIZE,
} from '@/constants/uiConstants';

interface RecipeHeaderProps {
  recipe: Recipe;
}

export const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const imageHeight = width * 0.6;

  const renderStars = (rating: number = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={COLORS.primary}
          allowFontScaling={false}
        />,
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <RecipeImage
          uri={recipe.image}
          width={width}
          height={imageHeight}
          borderRadius={0}
        />
        <TouchableOpacity
          style={[styles.backButton, { top: SPACING.xl + insets.top }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={ICON_SIZE.md}
            color={COLORS.white}
            allowFontScaling={false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {recipe.cuisine && (
          <Text style={styles.category}>{recipe.cuisine.toUpperCase()}</Text>
        )}

        <Text style={styles.title}>{recipe.name}</Text>

        <View style={styles.tagsContainer}>
          {recipe.mealType &&
            recipe.mealType.map((type, index) => (
              <View key={`meal-${index}`} style={styles.tag}>
                <Text style={styles.tagText}>{type.toUpperCase()}</Text>
              </View>
            ))}
          {recipe.tags &&
            recipe.tags.map((tag, index) => (
              <View key={`tag-${index}`} style={styles.tag}>
                <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
              </View>
            ))}
        </View>

        {recipe.description && (
          <Text style={styles.description}>{recipe.description}</Text>
        )}

        <View style={styles.summaryContainer}>
          {recipe.servings && (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Servings</Text>
              <Text style={styles.summaryValue}>{recipe.servings} people</Text>
            </View>
          )}
          {(recipe.prepTimeMinutes || recipe.cookTimeMinutes) && (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Cook time</Text>
              <Text style={styles.summaryValue}>
                {(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)}'
                min
              </Text>
            </View>
          )}
          {recipe.rating !== undefined && (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Rating</Text>
              <View style={styles.ratingContainer}>
                {renderStars(Math.round(recipe.rating))}
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.primary,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: SPACING.lg,
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.lg,
  },
  category: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.md,
    letterSpacing: 1,
  },
  title: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    lineHeight: LINE_HEIGHT.xl + 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  tag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  tagText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.white,
  },
  description: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    lineHeight: LINE_HEIGHT.md + 4,
    marginBottom: SPACING.lg,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginRight: SPACING.sm,
    alignItems: 'center',
    minHeight: 70,
    justifyContent: 'center',
  },
  summaryLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  summaryValue: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
});
