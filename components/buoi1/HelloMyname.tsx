import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

type Props = {
  name: string;
  age: number;
};

export default function HelloMyname({ name, age }: Props) {
  const sayHello = () => {
    Alert.alert("Xin chào", `Hello ${name}, ${age} tuổi`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tên: {name}</Text>
      <Text style={styles.text}>Tuổi: {age}</Text>
      <Button title="Nhấn để chào" onPress={sayHello} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
