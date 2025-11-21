import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants/uiConstants';

interface RecipeImageProps {
  uri: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const RecipeImage = ({ 
  uri, 
  width = 100, 
  height = 100, 
  borderRadius = 12 
}: RecipeImageProps) => {
  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      <Image
        source={{ uri }}
        style={[styles.image, { borderRadius }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: COLORS.background.image,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

