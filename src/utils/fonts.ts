import { FONT_FAMILY, FONT_WEIGHT } from '@/constants/uiConstants';

export const getFontFamily = (weight?: keyof typeof FONT_WEIGHT, italic?: boolean): string => {
  const family = italic ? FONT_FAMILY.italic : FONT_FAMILY.regular;
  return family;
};

export const getFontStyle = (
  weight: keyof typeof FONT_WEIGHT = 'normal',
  italic?: boolean
): { fontFamily: string; fontWeight: string } => {
  return {
    fontFamily: getFontFamily(weight, italic),
    fontWeight: FONT_WEIGHT[weight],
  };
};

