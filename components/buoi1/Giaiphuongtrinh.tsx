import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Giaiphuongtrinh = () => {
  const [soa, setSoa] = useState('');
  const [sob, setSob] = useState('');
  const [ketqua, setKetqua] = useState('');

  const handleSubmit = () => {
    const a = parseFloat(soa);
    const b = parseFloat(sob);


    if (a === 0 && b === 0) {
      setKetqua('Phương trình có vô số nghiệm');
    } else if (a === 0 && b !== 0) {
      setKetqua('Phương trình vô nghiệm');
    } else {
      const x = -b / a;
      setKetqua(`Phương trình có nghiệm duy nhất: x = ${x}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập số a:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSoa}
        value={soa}
        placeholder="Nhập số a"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nhập số b:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSob}
        value={sob}
        placeholder="Nhập số b"
        keyboardType="numeric"
      />

      <Button style={styles.button} title="Giải phương trình" onPress={handleSubmit} />

      {/* Hiển thị kết quả */}
     
        <Text style={styles.result}>{ketqua}</Text>
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
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Giaiphuongtrinh;
