import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface IngredientsListProps {
  ingredients: string[];
}

export const IngredientsList = ({ ingredients }: IngredientsListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

