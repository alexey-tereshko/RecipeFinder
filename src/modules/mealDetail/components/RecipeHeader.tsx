import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { RecipeImage } from '../../../components/recipe';
import type { Recipe } from '../../../types/recipe';

interface RecipeHeaderProps {
  recipe: Recipe;
}

export const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
  const { width } = useWindowDimensions();
  const imageWidth = width - 32;
  const imageHeight = (imageWidth * 9) / 16;

  return (
    <View style={styles.container}>
      <RecipeImage 
        uri={recipe.image} 
        width={imageWidth} 
        height={imageHeight} 
        borderRadius={12} 
      />
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.name}</Text>
        {recipe.category && (
          <Text style={styles.category}>{recipe.category}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  info: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
});

