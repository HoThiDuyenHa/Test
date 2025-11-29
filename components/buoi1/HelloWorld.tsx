import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HelloWorldScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "red" }}>
        Hi! Hồ Thị Duyên Hà
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", 
  },
});

export default HelloWorldScreen;
