import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppTabs from './AppTabs';

import { HomeStackParamList } from '../components/projectComponents/type';
const Stack = createNativeStackNavigator<HomeStackParamList>(); // ✅ Thêm kiểu dữ liệu

const AppNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
//---------------