import { useState, useEffect, useCallback } from 'react';
import { useRecipes } from '@/hooks/recipes/useRecipes';
import { useSearchRecipes } from '@/hooks/recipes/useSearchRecipes';
import type { RecipeListItem } from '@/types/recipe';

export const useHomeRecipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  
  const { recipes: defaultRecipes, isLoading: isLoadingDefault, error: defaultError, refetch: refetchDefault } = useRecipes({ limit: 10, skip: 0 });
  const { recipes: searchResults, isLoading: isLoadingSearch, error: searchError, search } = useSearchRecipes({ limit: 10, skip: 0 });

  useEffect(() => {
    if (searchQuery.trim()) {
      search(searchQuery);
    }
  }, [searchQuery, search]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setRecipes(searchResults);
    } else {
      setRecipes(defaultRecipes);
    }
  }, [searchQuery, searchResults, defaultRecipes]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const refetch = useCallback(() => {
    if (searchQuery.trim()) {
      search(searchQuery);
    } else {
      refetchDefault();
    }
  }, [searchQuery, search, refetchDefault]);

  return {
    recipes,
    isLoading: searchQuery.trim() ? isLoadingSearch : isLoadingDefault,
    error: searchQuery.trim() ? searchError : defaultError,
    searchQuery,
    handleSearchChange,
    refetch,
  };
};

