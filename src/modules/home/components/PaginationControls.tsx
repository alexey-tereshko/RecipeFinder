import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  FONT_FAMILY,
  ICON_SIZE,
  ACTIVE_OPACITY,
} from '@/constants/uiConstants';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationControlsProps) => {
  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        testID="pagination-prev-button"
        style={[
          styles.button,
          (currentPage === 1 || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        activeOpacity={ACTIVE_OPACITY}
      >
        <Ionicons
          name="chevron-back"
          size={ICON_SIZE.md}
          color={
            currentPage === 1 || isLoading
              ? COLORS.text.placeholder
              : COLORS.text.primary
          }
          allowFontScaling={false}
        />
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text testID="pagination-page-info" style={styles.pageText}>
          {currentPage} / {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        testID="pagination-next-button"
        style={[
          styles.button,
          (currentPage === totalPages || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handleNext}
        disabled={currentPage === totalPages || isLoading}
        activeOpacity={ACTIVE_OPACITY}
      >
        <Ionicons
          name="chevron-forward"
          size={ICON_SIZE.md}
          color={
            currentPage === totalPages || isLoading
              ? COLORS.text.placeholder
              : COLORS.text.primary
          }
          allowFontScaling={false}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  pageInfo: {
    marginHorizontal: SPACING.xl,
  },
  pageText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
  },
});
