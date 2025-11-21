import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/api';
import { recipeCacheService } from '@/services/realm';
import type { RecipeListItem, RecipesResponse } from '@/types/recipe';

interface UseRecipesParams {
  limit?: number;
  skip?: number;
}

export const useRecipes = (params?: UseRecipesParams) => {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  const fetchRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const cachedRecipes = await recipeCacheService.getRecipesList();
      if (cachedRecipes.length > 0) {
        setRecipes(cachedRecipes);
        setIsLoading(false);
      }

      const response: RecipesResponse = await apiClient.fetchRecipes({
        limit: params?.limit ?? 10,
        skip: params?.skip ?? 0,
        select: 'name,image',
      });
      
      setRecipes(response.recipes);
      setTotal(response.total);
      await recipeCacheService.saveRecipesList(response.recipes);
    } catch (err) {
      const cachedRecipes = await recipeCacheService.getRecipesList();
      if (cachedRecipes.length > 0) {
        setRecipes(cachedRecipes);
      } else {
        setError(err instanceof Error ? err : new Error('Failed to fetch recipes'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [params?.limit, params?.skip]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return {
    recipes,
    isLoading,
    error,
    total,
    refetch: fetchRecipes,
  };
};

