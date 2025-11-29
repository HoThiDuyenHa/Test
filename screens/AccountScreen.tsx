import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

import LoginSqlite from './authScreens/LoginSqlite';

const AccountScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('loggedInUser');
      if (value) {
        setUser(JSON.parse(value));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    setUser(null);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  // 1. CÓ USER -> HIỆN PROFILE
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 50 }}>👤</Text>
        <Text style={styles.title}>Chào, {user.username}!</Text>
        <Text style={{ marginBottom: 20 }}>Role: {user.role}</Text>

        {/* --- NÚT ADMIN (MỚI THÊM) --- */}
        {user.role === 'admin' && (
          <View style={{ marginTop: 10, width: '80%' }}>
            <Button 
              title="🛡️ Vào Trang Quản Trị" 
              color="#2196F3" 
              // Nhảy sang HomeTab -> rồi vào màn AdminDashboard
              onPress={() => navigation.navigate('HomeTab', { screen: 'AdminDashboard' })}
            />
          </View>
        )}

        {/* --- NÚT GIỎ HÀNG --- */}
        <View style={{ marginTop: 20, width: '80%' }}>
            <Button 
                title="🛒 Xem Giỏ Hàng" 
                color="#E91E63" 
                onPress={() => navigation.navigate('HomeTab', { screen: 'Cart' })}
            />
        </View>

        {/* --- NÚT ĐĂNG XUẤT --- */}
        <View style={{ marginTop: 10, width: '80%' }}>
           <Button title="Đăng xuất" onPress={handleLogout} color="red" />
        </View>
      </View>
    );
  }


  // 3. MẶC ĐỊNH -> HIỆN FORM ĐĂNG NHẬP
  return (
    <View style={{ flex: 1 }}>
       <LoginSqlite /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
});

export default AccountScreen;