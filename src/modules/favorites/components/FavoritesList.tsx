import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FavoriteListItem } from './FavoriteListItem';
import type { RecipeListItem } from '@/types/recipe';
import { SPACING } from '@/constants/uiConstants';

interface FavoritesListProps {
  recipes: RecipeListItem[];
  onRecipePress: (recipeId: number) => void;
}

export const FavoritesList = ({
  recipes,
  onRecipePress,
}: FavoritesListProps) => {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <FavoriteListItem recipe={item} onPress={onRecipePress} />
      )}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: SPACING.lg + insets.top,
          paddingBottom: SPACING.xl + insets.bottom,
        },
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});

