import { useState, useCallback } from 'react';
import { apiClient } from '../../api';
import type { RecipeListItem, RecipesResponse } from '../../types/recipe';

interface UseSearchRecipesParams {
  limit?: number;
  skip?: number;
}

export const useSearchRecipes = (params?: UseSearchRecipesParams) => {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setRecipes([]);
      setTotal(0);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response: RecipesResponse = await apiClient.searchRecipes({
        q: query,
        limit: params?.limit ?? 10,
        skip: params?.skip ?? 0,
        select: 'name,image',
      });
      setRecipes(response.recipes);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search recipes'));
    } finally {
      setIsLoading(false);
    }
  }, [params?.limit, params?.skip]);

  return {
    recipes,
    isLoading,
    error,
    total,
    search,
  };
};

