import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

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
  borderRadius = 8 
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
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

