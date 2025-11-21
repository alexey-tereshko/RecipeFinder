import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { SearchResultItem } from '@/components/recipe/SearchResultItem';
import { EmptyState } from '@/components/common/EmptyState';
import { PaginationControls } from './PaginationControls';
import type { RecipeListItem } from '@/types/recipe';
import { SPACING } from '@/constants/uiConstants';

interface RecipesListProps {
  recipes: RecipeListItem[];
  onRecipePress: (recipeId: number) => void;
  onFavoritePress?: (recipe: RecipeListItem) => void;
  isFavorite?: (recipeId: number) => boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  isSearchMode?: boolean;
}

export const RecipesList = ({
  recipes,
  onRecipePress,
  onFavoritePress,
  isFavorite,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isLoading = false,
  isSearchMode = false,
}: RecipesListProps) => {
  const { width } = useWindowDimensions();
  const numColumns = isSearchMode ? 1 : 2;
  const cardWidth = (width - SPACING.lg * 3) / numColumns;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [currentPage]);

  const renderEmptyComponent = () => {
    if (isSearchMode) {
      return (
        <EmptyState
          icon="search-outline"
          title="No recipes found"
          message="Try searching with different keywords"
        />
      );
    }
    return (
      <EmptyState
        icon="restaurant-outline"
        title="No recipes available"
        message="Check your internet connection and try again"
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={isSearchMode ? 'search' : 'grid'}
        ref={flatListRef}
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        renderItem={({ item }) =>
          isSearchMode ? (
            <SearchResultItem
              recipe={item}
              onPress={onRecipePress}
              onFavoritePress={onFavoritePress}
              isFavorite={isFavorite?.(item.id) || false}
            />
          ) : (
            <RecipeCard
              recipe={item}
              onPress={onRecipePress}
              onFavoritePress={onFavoritePress}
              isFavorite={isFavorite?.(item.id) || false}
              width={cardWidth}
            />
          )
        }
        ListEmptyComponent={recipes.length === 0 ? renderEmptyComponent : null}
        contentContainerStyle={[
          isSearchMode ? styles.searchContent : styles.content,
          { paddingBottom: SPACING.md },
          recipes.length === 0 && styles.emptyContent,
        ]}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      />
      {onPageChange && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  searchContent: {
    paddingTop: SPACING.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContent: {
    flexGrow: 1,
  },
});

