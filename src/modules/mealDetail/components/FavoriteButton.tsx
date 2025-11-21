import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, ICON_SIZE, ACTIVE_OPACITY } from '../../../constants/uiConstants';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export const FavoriteButton = ({ isFavorite, onPress }: FavoriteButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isFavorite && styles.buttonActive]}
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
    >
      <View style={styles.content}>
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={ICON_SIZE.md} 
          color={isFavorite ? COLORS.white : COLORS.primary} 
          style={styles.icon}
        />
        <Text style={[styles.text, isFavorite && styles.textActive]}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.lg,
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SPACING.sm,
  },
  text: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.primary,
  },
  textActive: {
    color: COLORS.white,
  },
});

