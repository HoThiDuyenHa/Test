import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, Platform } from 'react-native';

import HomeStackScreen from './HomeStackScreen';
import SignupSqlite from '@/screens/authScreens/SignupSqlite';
import LoginSqlite from '@/screens/authScreens/LoginSqlite';
import AccountScreen from '../screens/AccountScreen';

export type BottomTabParamList = {
  HomeTab: undefined;
  Signup: undefined;
  Login: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E91E63',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'ios' ? 55 : 50,
          paddingBottom: Platform.OS === 'ios' ? 20 : 4,
          paddingTop: 4,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🏠</Text>,
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
