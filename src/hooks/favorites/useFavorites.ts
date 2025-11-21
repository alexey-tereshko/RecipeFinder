import { useState, useEffect, useCallback } from 'react';
import type { RecipeListItem } from '@/types/recipe';
import { favoritesService } from '@/services/realm';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await favoritesService.getAll();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (recipe: RecipeListItem) => {
    try {
      await favoritesService.add(recipe);
      setFavorites(prev => {
        if (prev.some(fav => fav.id === recipe.id)) {
          return prev;
        }
        return [...prev, recipe];
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
      await loadFavorites();
    }
  }, [loadFavorites]);

  const removeFavorite = useCallback(async (recipeId: number) => {
    try {
      await favoritesService.remove(recipeId);
      setFavorites(prev => prev.filter(fav => fav.id !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      await loadFavorites();
    }
  }, [loadFavorites]);

  const isFavorite = useCallback((recipeId: number): boolean => {
    return favorites.some(fav => fav.id === recipeId);
  }, [favorites]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: loadFavorites,
  };
};

