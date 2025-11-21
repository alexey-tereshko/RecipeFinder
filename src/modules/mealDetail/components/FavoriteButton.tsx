import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export const FavoriteButton = ({ isFavorite, onPress }: FavoriteButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isFavorite && styles.buttonActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isFavorite && styles.textActive]}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  textActive: {
    color: '#fff',
  },
});

