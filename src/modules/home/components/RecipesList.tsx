import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import type { RecipeListItem } from '@/types/recipe';
import { SPACING } from '@/constants/uiConstants';

interface RecipesListProps {
  recipes: RecipeListItem[];
  onRecipePress: (recipeId: number) => void;
  onFavoritePress?: (recipe: RecipeListItem) => void;
  isFavorite?: (recipeId: number) => boolean;
}

export const RecipesList = ({ recipes, onRecipePress, onFavoritePress, isFavorite }: RecipesListProps) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const numColumns = 2;
  const cardWidth = (width - SPACING.lg * 3) / numColumns;

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => String(item.id)}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item}
          onPress={onRecipePress}
          onFavoritePress={onFavoritePress}
          isFavorite={isFavorite?.(item.id) || false}
          width={cardWidth}
        />
      )}
      contentContainerStyle={[styles.content, { paddingBottom: SPACING.xl + insets.bottom }]}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
});

