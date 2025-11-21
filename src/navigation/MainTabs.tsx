import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { MainTabParamList } from './types';
import { HomeScreen } from '@/app/Home';
import { FavoritesScreen } from '@/app/Favorites';
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  FONT_FAMILY,
} from '@/constants/uiConstants';

const Tab = createBottomTabNavigator<MainTabParamList>();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="home" size={size} color={color} />
);

const FavoritesIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="heart" size={size} color={color} />
);

export const MainTabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.placeholder,
        tabBarStyle: {
          backgroundColor: COLORS.background.primary,
          borderTopWidth: 1,
          borderTopColor: COLORS.border.light,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY.regular,
          fontSize: 12,
          fontWeight: FONT_WEIGHT.medium,
        },
        headerStyle: {
          backgroundColor: COLORS.background.primary,
        },
        headerTitleStyle: {
          fontFamily: FONT_FAMILY.regular,
          fontSize: FONT_SIZE.xl,
          fontWeight: FONT_WEIGHT.bold,
          color: COLORS.text.primary,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: FavoritesIcon,
        }}
      />
    </Tab.Navigator>
  );
};
