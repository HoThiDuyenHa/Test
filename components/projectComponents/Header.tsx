import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabParamList } from '../../navigations/AppTabs';



const Header = () => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();

  // Load user khi focus vào màn hình
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');
      setUser(loggedInUser ? JSON.parse(loggedInUser) : null);
    });
    return unsubscribe;
  }, [navigation]);

const handleLogout = () => {
  Alert.alert(
    'Xác nhận',
    'Bạn có chắc chắn muốn đăng xuất không?',
    [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đăng Xuất',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('loggedInUser');
          setUser(null);
          // Navigate về login và reset stack
navigation.navigate('Login');
        },
      },
    ]
  );
};

  return (
    <View style={styles.header}>
      {user && (
        <>
          <Text style={styles.userInfo}>Xin chào, {user.username} ({user.role})</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Đăng Xuất</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFE4EC',
  },
  userInfo:{
    color:"#E91E63"
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  role: {
    color: '#FFD700',
    fontSize: 14,
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FF4B5C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  noUser: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
  },

});


export default Header;