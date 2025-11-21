import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/api/apiClient';
import { recipeCacheService } from '@/services/realm/recipeCacheService';
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

      const response: RecipesResponse = await apiClient.fetchRecipes({
        limit: params?.limit ?? 10,
        skip: params?.skip ?? 0,
        select: 'name,image,cuisine,tags,mealType',
      });

      setRecipes(response.recipes);
      setTotal(response.total);
      await recipeCacheService.saveRecipesList(response.recipes);
    } catch (err) {
      const cachedRecipes = await recipeCacheService.getRecipesList();
      const skip = params?.skip ?? 0;
      const limit = params?.limit ?? 10;
      const paginatedCached = cachedRecipes.slice(skip, skip + limit);

      if (paginatedCached.length > 0) {
        setRecipes(paginatedCached);
        setTotal(cachedRecipes.length);
      } else {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch recipes'),
        );
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
