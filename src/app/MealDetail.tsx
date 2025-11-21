import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>;

export const MealDetailScreen = ({ route }: Props) => {
  const { recipeId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meal Detail Screen</Text>
      <Text style={styles.subtext}>Recipe ID: {recipeId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 16,
    marginTop: 8,
  },
});

