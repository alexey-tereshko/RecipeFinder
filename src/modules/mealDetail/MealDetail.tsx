import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/navigation';
import { useRecipe } from '@/hooks/recipes';
import { useFavorites } from '@/hooks/favorites';
import { LoadingIndicator } from '@/modules/home/components/LoadingIndicator';
import { ErrorView } from '@/modules/home/components/ErrorView';
import { RecipeHeader } from './components/RecipeHeader';
import { IngredientsList } from './components/IngredientsList';
import { InstructionsList } from './components/InstructionsList';
import { FavoriteButton } from './components/FavoriteButton';
import { COLORS } from '@/constants/uiConstants';

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>;

export const MealDetail = ({ route }: Props) => {
  const { recipeId } = route.params;
  const { recipe, isLoading, error, refetch } = useRecipe(recipeId);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteToggle = async () => {
    if (!recipe) return;
    
    if (isFavorite(recipe.id)) {
      await removeFavorite(recipe.id);
    } else {
      await addFavorite({ id: recipe.id, name: recipe.name, image: recipe.image });
    }
  };

  if (isLoading) {
    return <LoadingIndicator message="Loading recipe details..." />;
  }

  if (error || !recipe) {
    return <ErrorView message={error?.message || 'Recipe not found'} onRetry={refetch} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <RecipeHeader recipe={recipe} />
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <IngredientsList ingredients={recipe.ingredients} />
      )}
      {recipe.instructions && recipe.instructions.length > 0 && (
        <InstructionsList instructions={recipe.instructions} />
      )}
      <FavoriteButton 
        isFavorite={isFavorite(recipe.id)} 
        onPress={handleFavoriteToggle} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
});

