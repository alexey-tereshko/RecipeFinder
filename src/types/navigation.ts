import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Recipe } from './recipe';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  MealDetail: { recipeId: number };
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

