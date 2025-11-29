import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserByCredentials } from '../../database/database';
import { BottomTabParamList } from '../../navigations/AppTabs';
import { HomeStackParamList } from '../HomeScreen';

const LoginSqlite = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigationHome = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const navigationTab = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();

  const handleLogin = async () => {
    if (!username || !password) return Alert.alert('Lỗi', 'Nhập thiếu thông tin!');

    try {
      const user = await getUserByCredentials(username, password);

      if (user) {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

        Alert.alert('Thành công', `Xin chào ${user.username}`, [
          {
            text: 'OK',
            onPress: () => {
              if (user.role === 'admin') {
                navigationTab.navigate('HomeTab', { screen: 'AdminDashboard' });
              } else {
                navigationTab.navigate('HomeTab');
              }
            }
          }
        ]);
      } else {
        Alert.alert('Lỗi', 'Sai tài khoản/mật khẩu');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>


      <View style={styles.card}>
        <Text style={styles.title}> CHÀO MỪNG 🌸</Text>

        <TextInput
          placeholder="Nhập tên"
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />

        <TextInput
          placeholder="Nhập mật khẩu"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigationTab.navigate('HomeTab', { screen: 'SignUp' })}
        >
          <Text style={styles.switchText}>Bạn chưa có tài khoản? Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd6e6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },


  card: {
    width: '85%',
    backgroundColor: 'white',
    padding: 28,
    borderRadius: 30,
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  title: {
    alignSelf: 'center',
    backgroundColor: '#ff82c1',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    fontWeight: '700',
    marginBottom: 25,
    fontSize: 15,
  },

  input: {
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: 18,
  },

  button: {
    backgroundColor: '#ff5fa8',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  switchText: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 12,
    color: '#ff2f6f',
    textDecorationLine: 'underline',
  },
});

export default LoginSqlite;
