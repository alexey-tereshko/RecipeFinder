import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RecipeCard } from '../../../components/recipe';
import type { RecipeListItem } from '../../../types/recipe';

interface RecipesListProps {
  recipes: RecipeListItem[];
  onRecipePress: (recipeId: number) => void;
}

export const RecipesList = ({ recipes, onRecipePress }: RecipesListProps) => {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <RecipeCard recipe={item} onPress={onRecipePress} />
      )}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

