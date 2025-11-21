export const COLORS = {
  primary: '#80E619',
  secondary: '#F7931E',
  white: '#FFFFFF',
  black: '#000000',
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    placeholder: '#999999',
    light: '#FFFFFF',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F8',
    image: '#E5E5E5',
    card: '#FFFFFF',
  },
  border: {
    light: '#E0E0E0',
    medium: '#CCCCCC',
  },
  shadow: '#000000',
  error: '#FF3B30',
  success: '#34C759',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 9999,
} as const;

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
} as const;

export const FONT_FAMILY = {
  regular: 'Epilogue',
  italic: 'Epilogue-Italic',
} as const;

export const FONT_WEIGHT = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const LINE_HEIGHT = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const;

export const ICON_SIZE = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const;

export const SHADOW = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export const ACTIVE_OPACITY = 0.7;

