// HomeStackScreen.tsx
import AdminDashboardScreen from '@/screens/AdminDashboardScreen';
import AdminProductScreen from '@/screens/AdminProductScreen';
import CartScreen from '@/screens/CartScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeStackParamList } from '../components/projectComponents/type';
import DetailsScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsByCategoryScreen from '../screens/ProductsByCategoryScreen';
import LoginSQLite from '../screens/authScreens/LoginSqlite';
import SignUpSQLite from '../screens/authScreens/SignupSqlite';
import AboutUsScreen from '../screens/AboutUsScreen';
import AdminUserScreen from '../screens/AdminUserSreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => {
  return (
    // Màn hình đầu tiên (<Stack.Screen ... />) trong <Stack.Navigator> sẽ mặc định là màn hình được mở đầu tiên.
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategoryScreen} />
      <Stack.Screen name="Cart"  component={CartScreen}  />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="AdminProduct" component={AdminProductScreen} />
      <Stack.Screen name="AdminUser" component={AdminUserScreen} />
      <Stack.Screen name="Login" component={LoginSQLite} />
      <Stack.Screen name="SignUp" component={SignUpSQLite} />
      <Stack.Screen name="About" component={AboutUsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;//------------------------