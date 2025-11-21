import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { MainTabParamList } from './types';
import { HomeScreen } from '../app/Home';
import { FavoritesScreen } from '../app/Favorites';
import { COLORS } from '../constants/uiConstants';

const Tab = createBottomTabNavigator<MainTabParamList>();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="home" size={size} color={color} />
);

const FavoritesIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="heart" size={size} color={color} />
);

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.placeholder,
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
