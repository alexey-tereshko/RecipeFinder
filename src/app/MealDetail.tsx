import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types/navigation';
import { MealDetail } from '@/modules/mealDetail';

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>;

export const MealDetailScreen = ({ route }: Props) => {
  return <MealDetail route={route} />;
};

