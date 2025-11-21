import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { RecipeImage } from './RecipeImage';
import type { RecipeListItem } from '../../types/recipe';

interface RecipeCardProps {
  recipe: RecipeListItem;
  onPress: (recipeId: number) => void;
}

export const RecipeCard = ({ recipe, onPress }: RecipeCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(recipe.id)}
      activeOpacity={0.7}
    >
      <RecipeImage uri={recipe.image} width={80} height={80} borderRadius={8} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

