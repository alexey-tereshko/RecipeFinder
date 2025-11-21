import { useState, useCallback, useRef, useEffect } from 'react';
import { apiClient } from '@/api/apiClient';
import type { RecipeListItem, RecipesResponse } from '@/types/recipe';

interface UseSearchRecipesParams {
  limit?: number;
  skip?: number;
}

export const useSearchRecipes = (params?: UseSearchRecipesParams) => {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(
    async (query: string, skipOverride?: number) => {
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
          skip: skipOverride !== undefined ? skipOverride : params?.skip ?? 0,
          select: 'name,image,cuisine,tags,mealType',
        });
        setRecipes(response.recipes);
        setTotal(response.total);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to search recipes'),
        );
        setRecipes([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    },
    [params?.limit, params?.skip],
  );

  const search = useCallback(
    (query: string, skipOverride?: number) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (!query.trim()) {
        setRecipes([]);
        setTotal(0);
        setIsLoading(false);
        return;
      }

      debounceTimerRef.current = setTimeout(() => {
        performSearch(query, skipOverride);
      }, 500);
    },
    [performSearch],
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    recipes,
    isLoading,
    error,
    total,
    search,
  };
};
