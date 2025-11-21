import { useState, useEffect } from 'react';
import { apiClient } from '@/api';
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

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response: RecipesResponse = await apiClient.fetchRecipes({
        limit: params?.limit ?? 10,
        skip: params?.skip ?? 0,
        select: 'name,image',
      });
      setRecipes(response.recipes);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch recipes'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [params?.limit, params?.skip]);

  return {
    recipes,
    isLoading,
    error,
    total,
    refetch: fetchRecipes,
  };
};

