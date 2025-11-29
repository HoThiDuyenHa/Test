import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addUser, getUserByUsername } from '../../database/database';
import { BottomTabParamList } from '../../navigations/AppTabs';

const SignupSqlite = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Mặc định là 'user'
  const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();

  const reset = () => {
    setUsername('');
    setPassword('');
  };

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        Alert.alert('Lỗi', 'Tên đăng nhập đã tồn tại!');
        return;
      }

      const success = await addUser(username, password, role);
      if (success) {
        reset();
        Alert.alert('Thành công', 'Đăng ký thành công!', [
          { text: 'OK', onPress: () => navigation.navigate('HomeTab', { screen: 'Login' }) },
        ]);
      } else {
        Alert.alert('Lỗi', 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error('ERROR ❌ Error adding user:', error);
      Alert.alert('Lỗi', 'Đăng ký thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>TẠO TÀI KHOẢN ✨</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.switchText}>Bạn đã có tài khoản? Đăng nhập ngay</Text>
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

export default SignupSqlite;
