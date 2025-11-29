import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AdminDashboardScreen = () => {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    // Quay về Tab Tài khoản (nơi sẽ tự hiện form Login)
    navigation.navigate('AccountTab');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛡️ ADMIN PANEL</Text>
      
      <View style={styles.grid}>
<TouchableOpacity 
  style={styles.card} 
  onPress={() => navigation.navigate('AdminProduct')} 
>
  <Text style={styles.icon}>📦</Text>
  <Text style={styles.cardText}>Quản lý Sản phẩm</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Tính năng đang phát triển')}>
          <Text style={styles.icon}>📝</Text>
          <Text style={styles.cardText}>Quản lý Loại Sản Phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('AdminUser')} >
          <Text style={styles.icon}>👥</Text>
          <Text style={styles.cardText}>Quản lý User</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#E91E63', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  card: { width: '48%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 15, elevation: 3 },
  icon: { fontSize: 30, marginBottom: 10 },
  cardText: { fontWeight: '600', textAlign: 'center' },
  logoutBtn: { marginTop: 30, backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  logoutText: { color: 'white', fontWeight: 'bold' }
});

export default AdminDashboardScreen;