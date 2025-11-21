import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  FONT_FAMILY,
  LINE_HEIGHT,
  ICON_SIZE,
  ACTIVE_OPACITY,
} from '@/constants/uiConstants';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export const FavoriteButton = ({
  isFavorite,
  onPress,
}: FavoriteButtonProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingBottom: SPACING.xl + insets.bottom }]}
    >
      <TouchableOpacity
        testID="meal-detail-favorite-button"
        style={styles.button}
        onPress={onPress}
        activeOpacity={ACTIVE_OPACITY}
      >
        <View style={styles.content}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={ICON_SIZE.md}
            color={COLORS.black}
            style={styles.icon}
            allowFontScaling={false}
          />
          <Text style={styles.text}>
            {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    width: '100%',
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
    color: COLORS.text.primary,
    lineHeight: LINE_HEIGHT.lg,
  },
});
