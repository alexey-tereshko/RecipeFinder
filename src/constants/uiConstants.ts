export const COLORS = {
  primary: '#007AFF',
  white: '#fff',
  black: '#000',
  text: {
    primary: '#333',
    secondary: '#666',
    placeholder: '#999',
  },
  background: {
    primary: '#fff',
    secondary: '#f5f5f5',
    image: '#f0f0f0',
  },
  shadow: '#000',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export const FONT_SIZE = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
} as const;

export const FONT_WEIGHT = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const ICON_SIZE = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export const SHADOW = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

export const ACTIVE_OPACITY = 0.7;

