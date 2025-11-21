import { useState, useCallback } from 'react';
import type { RecipeListItem } from '../../types/recipe';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<RecipeListItem[]>([]);

  const addFavorite = useCallback((recipe: RecipeListItem) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === recipe.id)) {
        return prev;
      }
      return [...prev, recipe];
    });
  }, []);

  const removeFavorite = useCallback((recipeId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== recipeId));
  }, []);

  const isFavorite = useCallback((recipeId: number) => {
    return favorites.some(fav => fav.id === recipeId);
  }, [favorites]);

  return {
    favorites,
    isLoading: false,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: () => {},
  };
};

