import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { useFavorites } from '../../hooks/favorites';
import { RecipesList } from '../home/components/RecipesList';
import { ErrorView } from '../home/components/ErrorView';
import { COLORS } from '../../constants/uiConstants';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Favorites = () => {
  const navigation = useNavigation<NavigationProp>();
  const { favorites } = useFavorites();

  const handleRecipePress = (recipeId: number) => {
    navigation.navigate('MealDetail', { recipeId });
  };

  if (favorites.length === 0) {
    return (
      <ErrorView 
        message="No favorites yet. Add recipes to favorites to see them here." 
      />
    );
  }

  return (
    <View style={styles.container}>
      <RecipesList recipes={favorites} onRecipePress={handleRecipePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
});

