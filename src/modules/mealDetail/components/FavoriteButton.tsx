import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, LINE_HEIGHT, ICON_SIZE, SHADOW, ACTIVE_OPACITY } from '@/constants/uiConstants';

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
          size={ICON_SIZE.lg} 
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
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.xl,
    ...SHADOW.small,
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: SPACING.md,
  },
  text: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.primary,
    lineHeight: LINE_HEIGHT.lg,
  },
  textActive: {
    color: COLORS.white,
  },
});

