import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { SearchBar } from '../../components/recipe';
import { RecipesList } from './components/RecipesList';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ErrorView } from './components/ErrorView';
import { useHomeRecipes } from './hooks/useHomeRecipes';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const { recipes, isLoading, error, searchQuery, handleSearchChange, refetch } = useHomeRecipes();

  const handleRecipePress = (recipeId: number) => {
    navigation.navigate('MealDetail', { recipeId });
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={handleSearchChange} />
      {isLoading ? (
        <LoadingIndicator message="Loading recipes..." />
      ) : error ? (
        <ErrorView message={error.message} onRetry={refetch} />
      ) : (
        <RecipesList recipes={recipes} onRecipePress={handleRecipePress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

