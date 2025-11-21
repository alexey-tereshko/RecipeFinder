import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/navigation';
import { SearchBar } from '@/components/recipe/SearchBar';
import { RecipesList } from './components/RecipesList';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ErrorView } from './components/ErrorView';
import { useHomeRecipes } from './hooks/useHomeRecipes';
import { useFavorites } from '@/hooks/favorites/useFavorites';
import { COLORS } from '@/constants/uiConstants';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    recipes,
    isLoading,
    error,
    searchQuery,
    handleSearchChange,
    currentPage,
    totalPages,
    handlePageChange,
    refetch,
  } = useHomeRecipes();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleRecipePress = (recipeId: number) => {
    navigation.navigate('MealDetail', { recipeId });
  };

  const handleFavoritePress = async (recipe: {
    id: number;
    name: string;
    image: string;
  }) => {
    if (isFavorite(recipe.id)) {
      await removeFavorite(recipe.id);
    } else {
      await addFavorite(recipe);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={handleSearchChange} />
      {isLoading ? (
        <LoadingIndicator message="Loading recipes..." />
      ) : error ? (
        <ErrorView message={error.message} onRetry={refetch} />
      ) : (
        <RecipesList
          recipes={recipes}
          onRecipePress={handleRecipePress}
          onFavoritePress={handleFavoritePress}
          isFavorite={isFavorite}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
});
