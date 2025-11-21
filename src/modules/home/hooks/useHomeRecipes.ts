import { useState, useEffect, useCallback } from 'react';
import { useRecipes } from '@/hooks/recipes/useRecipes';
import { useSearchRecipes } from '@/hooks/recipes/useSearchRecipes';
import type { RecipeListItem } from '@/types/recipe';

const ITEMS_PER_PAGE = 10;

export const useHomeRecipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [total, setTotal] = useState(0);

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const {
    recipes: defaultRecipes,
    isLoading: isLoadingDefault,
    error: defaultError,
    total: defaultTotal,
    refetch: refetchDefault,
  } = useRecipes({ limit: ITEMS_PER_PAGE, skip });

  const {
    recipes: searchResults,
    isLoading: isLoadingSearch,
    error: searchError,
    total: searchTotal,
    search,
  } = useSearchRecipes({ limit: ITEMS_PER_PAGE, skip });

  useEffect(() => {
    if (searchQuery.trim()) {
      setCurrentPage(1);
      search(searchQuery, 0);
    }
  }, [searchQuery, search]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const newSkip = (currentPage - 1) * ITEMS_PER_PAGE;
      search(searchQuery, newSkip);
    }
  }, [currentPage, searchQuery, search]);

  useEffect(() => {
    if (!searchQuery.trim() && currentPage > 1) {
      refetchDefault();
    }
  }, [currentPage, searchQuery, refetchDefault]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setRecipes(searchResults);
      setTotal(searchTotal);
    } else {
      setRecipes(defaultRecipes);
      setTotal(defaultTotal);
    }
  }, [
    searchQuery,
    searchResults,
    defaultRecipes,
    searchTotal,
    defaultTotal,
  ]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    []
  );

  const refetch = useCallback(() => {
    if (searchQuery.trim()) {
      search(searchQuery, skip);
    } else {
      refetchDefault();
    }
  }, [searchQuery, search, refetchDefault, skip]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return {
    recipes,
    isLoading: searchQuery.trim() ? isLoadingSearch : isLoadingDefault,
    error: searchQuery.trim() ? searchError : defaultError,
    searchQuery,
    handleSearchChange,
    currentPage,
    totalPages,
    handlePageChange,
    refetch,
  };
};

