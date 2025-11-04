import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';

const PhuongTrinhBacNhat = () => {
    const [soA, setSoA] = useState('');
    const [soB, setSoB] = useState('');
    const [ketQua, setKetQua] = useState('');
    
    const inputARef = useRef<TextInput>(null);
    const inputBRef = useRef<TextInput>(null);

    const solveEquation = () => {
        Keyboard.dismiss();
        
        const numberA = parseFloat(soA);
        const numberB = parseFloat(soB);
        
        // Kiểm tra đầu vào
        if (soA === '' || soB === '') {
            setKetQua('Vui lòng nhập đầy đủ số A và số B!');
            return;
        }

        if (isNaN(numberA) && isNaN(numberB)) {
            setKetQua('Vui lòng nhập số hợp lệ cho A & B!');
            inputARef.current?.focus();
            return;
        }

        if (isNaN(numberA)) {
            setKetQua('Vui lòng nhập số hợp lệ cho A!');
            inputARef.current?.focus();
            return;
        } 

        if (isNaN(numberB)) {
            setKetQua('Vui lòng nhập số hợp lệ cho B!');
            inputBRef.current?.focus();
            return;
        } 
    
        // Giải phương trình
        if (numberA === 0) {
            if (numberB === 0) {
                setKetQua('Phương trình vô số nghiệm');
            } else {
                setKetQua('Phương trình vô nghiệm');
            }
        } else {
            const x = -numberB / numberA;
            setKetQua(`Phương trình có nghiệm: x = ${x.toFixed(2)}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Giải Phương Trình Bậc Nhất</Text>
                <Text style={styles.subtitle}>ax + b = 0</Text>
            </View>

            <View >
                <Text style={styles.label}>Nhập hệ số a:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setSoA}
                    value={soA}
                    placeholder="Nhập số a..."
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    ref={inputARef}
                    returnKeyType="next"
                    onSubmitEditing={() => inputBRef.current?.focus()}
                />
                
                <Text style={styles.label}>Nhập hệ số b:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setSoB}
                    value={soB}
                    placeholder="Nhập số b..."
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    ref={inputBRef}
                    returnKeyType="done"
                    onSubmitEditing={solveEquation}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.solveButton]}
                    onPress={solveEquation}
                >
                    <Text style={styles.buttonText}>Giải Phương Trình</Text>
                </TouchableOpacity>
            </View>

            {ketQua ? (
                <View >
                    <Text style={styles.resultLabel}>Kết quả:</Text>
                    <Text style={styles.resultText}>{ketQua}</Text>
                </View>
            ) : null}

        </View>
    );
};

export default PhuongTrinhBacNhat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        fontStyle: 'italic',
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    solveButton: {
        backgroundColor: '#007AFF',
    },
    clearButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    resultLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        textAlign: 'center',
    }
});