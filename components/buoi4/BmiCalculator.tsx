import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { Button } from '@react-navigation/elements'

const BmiCalculator = () => {
    const [heightNum, setHeightNum]=useState('')
    const [weightNum, setWeightNum]= useState('')
    const [resultBmi, setResult]= useState('')
    const [disCategory, setCategory]= useState('')
    const [bgColor, setBgColor]=useState('')

    const solveCalculator =()=>{
            const height=parseFloat(heightNum)
            const weight =parseFloat(weightNum)

            if (isNaN(height) || isNaN(weight)){
                Alert.alert("Error", "Please enter valid numbers");
                return;
            }
            if(height <=0 || weight <=0 ){
                Alert.alert("Error", "Height and Weight must be greater than 0 !")
                return;
            }
             
            //  Nếu người dùng nhập cm thì tự chuyển sang mét
            const heightInMeters = height > 3 ? height / 100 : height;

            const result = weight / (heightInMeters * heightInMeters);

            setResult(result.toFixed(2)); // Giữ 2 số thập phân

            if (result<18.5){
                setCategory(' 😒Underweight')
                setBgColor('#f5b041')
            }else if (result <=24.9){
                setCategory('😊Normal weight')
                setBgColor('#27ae60')
            }else if (result <=29.9){
                setCategory('😁Overweight')
                setBgColor('#f39c12')
            } else {
                setCategory('😢 Obese')
                setBgColor('#e74c3c')
            }       

        };
        const reset =()=>{
            setHeightNum('')
            setWeightNum('')
            setResult('')
            setCategory('')
            };

  return (
    <View style={styles.container}>
      <Text style={styles.title} >BMI Calculator: </Text>

      <View style={styles.containInput}>
            <TextInput 
            style={styles.section1} 
            placeholder='Enter your height (m)'
            value={heightNum} 
            onChangeText={setHeightNum}
            keyboardType='numeric'>
      </TextInput>

      <TextInput  
            style={styles.section2}
            placeholder='Enter your weight (kg) '
            value={weightNum} 
            onChangeText={setWeightNum}
            keyboardType='numeric'>
        </TextInput>
      </View>
        <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.button} onPress={solveCalculator}>
            <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetBtn]} onPress={reset}>
            <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.resultBox, { backgroundColor: bgColor }]}>
            <Text style={styles.result}>BMI: {resultBmi}</Text>
            <Text style={styles.category}>{disCategory}</Text>
        </View>

    </View>
  );
};
    const styles = StyleSheet.create({
         container: {
            flex: 1,
            backgroundColor: '#F5D2D2',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        containInput:{
            flex: 1
        },
        section1:{
            flex:1,
            backgroundColor:'green'
        },
        section2:{
            flex:1,
            backgroundColor:'pink',
            // width: 70
        },

        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 30,
        },
        input: {
            borderWidth: 1,
            borderColor: '#d0e3d3ff',
            borderRadius: 10,
            backgroundColor: '#fff',
            padding: 12,
            width: '80%',
            marginBottom: 15,
            fontSize: 16,
        },
        btnGroup: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            marginTop: 10,
        },
        button: {
            backgroundColor: '#F8F7BA',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
        },
        resetBtn: {
            backgroundColor: '#A3CCDA',
        },
        buttonText: {
            color: 'black',
            fontSize: 14,
        },
        resultBox: {
            marginTop: 30,
            backgroundColor: '#d0e3d3ff',
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
            width: '80%',
        },
        result: {
            fontSize: 18,
            color: 'black',
        },
        category: {
            fontSize: 18,
            marginTop: 8,
            fontStyle: 'italic',
            fontWeight: '600',
            }
        });


export default BmiCalculator