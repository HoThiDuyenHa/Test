import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const HelloState = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = () => {
    Alert.alert(`Xin chào ${name}, bạn ${age} tuổi!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập tên:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Tên của bạn"
      />

      <Text style={styles.label}>Nhập tuổi:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder="Tuổi của bạn"
        keyboardType="numeric"
      />

      {/* Button đơn giản */}
      <Button title="Xác nhận" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    marginBottom: 15,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HelloState;
