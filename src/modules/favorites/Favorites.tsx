import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/navigation';
import { useFavorites } from '@/hooks/favorites/useFavorites';
import { FavoritesList } from './components/FavoritesList';
import { ErrorView } from '@/modules/home/components/ErrorView';
import { LoadingIndicator } from '@/modules/home/components/LoadingIndicator';
import { COLORS } from '@/constants/uiConstants';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Favorites = () => {
  const navigation = useNavigation<NavigationProp>();
  const { favorites, isLoading, refetch, removeFavorite } = useFavorites();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleRecipePress = (recipeId: number) => {
    navigation.navigate('MealDetail', { recipeId });
  };

  const handleFavoritePress = async (recipeId: number) => {
    await removeFavorite(recipeId);
  };

  if (isLoading) {
    return <LoadingIndicator message="Loading favorites..." />;
  }

  if (favorites.length === 0) {
    return (
      <ErrorView 
        message="No favorites yet. Add recipes to favorites to see them here." 
      />
    );
  }

  return (
    <View style={styles.container}>
      <FavoritesList
        recipes={favorites}
        onRecipePress={handleRecipePress}
        onFavoritePress={handleFavoritePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
});

