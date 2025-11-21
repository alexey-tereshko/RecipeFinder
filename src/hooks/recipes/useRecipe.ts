import { useState, useEffect } from 'react';
import { apiClient } from '../../api';
import type { Recipe } from '../../types/recipe';

export const useRecipe = (id: number) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecipe = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiClient.fetchRecipeById(id);
      setRecipe(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch recipe'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  return {
    recipe,
    isLoading,
    error,
    refetch: fetchRecipe,
  };
};

