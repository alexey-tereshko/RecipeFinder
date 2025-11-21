import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_FAMILY, LINE_HEIGHT, ICON_SIZE } from '@/constants/uiConstants';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  value, 
  onChangeText, 
  placeholder = 'Search recipes...' 
}: SearchBarProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: SPACING.lg + insets.top }]}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={ICON_SIZE.md} color={COLORS.text.placeholder} style={styles.icon} allowFontScaling={false} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.background.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  icon: {
    marginRight: SPACING.md,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    lineHeight: LINE_HEIGHT.md,
  },
});

