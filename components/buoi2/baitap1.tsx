import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

// Component cha
const Parent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');


  const handleChange = (newName, newAge) => {
    setName(newName);
    setAge(newAge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Họ và tên của cha:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nhập họ và tên"
      />

      <Text style={styles.label}>Nhập tuổi của cha:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder="Nhập tuổi"
        keyboardType="numeric"
      />

      <Text style={styles.result}>Tên của cha: {name}</Text>
      <Text style={styles.result}>Tuổi của cha: {age}</Text>

      {/* Truyền giá trị và hàm cập nhật xuống Child */}
      <Child name={name} age={age} handleChange={handleChange} />
    </View>
  );
};


const Child = ({ name, age, handleChange }) => {
  return (
    <View style={{ padding: 10,backgroundColor: 'lightblue', borderRadius: 5,}}>
      <Text style={styles.label}>Tên cha trong Child: {name}</Text>
      <Text style={styles.label}>Tuổi cha trong Child: {age}</Text>

      <Text style={[styles.label, { marginTop: 10 }]}>Cập nhật từ Child:</Text>
      <Text>Tên mới:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên mới"
        onChangeText={(text) => handleChange(text, age)}
      />
      <Text>Tuổi mới:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi mới"
        keyboardType="numeric"
        onChangeText={(text) => handleChange(name, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "lightyellow",
    borderRadius:5,
    
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
  result: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Parent;
