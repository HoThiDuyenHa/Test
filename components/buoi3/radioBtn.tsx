import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState<string | number | null>(null);
  const input2Ref = useRef<TextInput>(null); //neu thong bao loi thi se chi vao cai o dau tien

  const operations = [
    { label: "Cộng", value: "+" },
    { label: "Trừ", value: "-" },
    { label: "Nhân", value: "*" },
    { label: "Chia", value: "/" },
    { label: "So sánh", value: "compare" },
  ];

  const handleCalculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      Alert.alert("Lỗi", "Vui lòng nhập hai số hợp lệ!");
      return;
    }

    if (operator === "/" && b === 0) {
      Alert.alert("Lỗi", "Không thể chia cho 0!");
      return;
    }

    let res;
    switch (operator) {
      case "+":
        res = a + b;
        break;
      case "-":
        res = a - b;
        break;
      case "*":
        res = a * b;
        break;
      case "/":
        res = a / b;
        break;
      case "compare":
        res =
          a > b
            ? `Số lớn hơn là: ${a}`
            : a < b
            ? `Số lớn hơn là: ${b}`
            : "Hai số bằng nhau";
        break;
      default:
        res = "Phép toán không hợp lệ";
    }

    setResult(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ứng dụng tính toán</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số thứ nhất"
        // keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
        onSubmitEditing={() => input2Ref.current?.focus()}
      />

      <TextInput
        ref={input2Ref}
        style={styles.input}
        placeholder="Nhập số thứ hai"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
        onSubmitEditing={handleCalculate}
      />

      <Text style={styles.label}>Chọn phép toán:</Text>

      <View style={styles.radioGroup}>
        {operations.map((op) => (
          <TouchableOpacity
            key={op.value}
            style={styles.radioItem}
            onPress={() => setOperator(op.value)}
          >
            <View style={styles.radioCircle}>
              {operator === op.value && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioLabel}>{op.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Tính toán</Text>
      </TouchableOpacity>

      <Text style={styles.result}>Kết quả: {result}</Text>
    </View>
  );
}

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f6fa",
      },
      title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: "#fff",
      },
      label: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 10,
      },
      radioGroup: {
        marginBottom: 10,
      },
      radioItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
      },
      radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#007bff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
      },
      radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#007bff",
      },
      radioLabel: {
        fontSize: 16,
      },
      button: {
        backgroundColor: "#fa330bff",
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
      },
      result: {
        marginTop: 20,
        textAlign: "left",
        fontSize: 16,
        color: "#f25e09ff",
      },
    });
