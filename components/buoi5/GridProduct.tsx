import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'

const GridProduct = () => {
  return (
    <View style={styles.container}>
        {/* box 1 */}
    <View style={styles.box}>
        <Image 
          source={require('../../assets/images/productImg/icream.jpg')} 
          style={styles.boxImg} 
        />
        <View style={styles.boxText}>
          <Text style={styles.productName}>Kem dâu</Text>
          <Text style={styles.price}>Giá: 35.000đ</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* box 2 */}
      <View style={styles.box}>
        <Image 
          source={require('../../assets/images/productImg/rice.jpg')} 
          style={styles.boxImg} 
        />
        <View style={styles.boxText}>
          <Text style={styles.productName}>Cơm trộn</Text>
          <Text style={styles.price}>Giá: 45.000đ</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* box 3 */}
      <View style={styles.box}>
        <Image 
          source={require('../../assets/images/productImg/mandu.webp')} 
          style={styles.boxImg} 
        />
        <View style={styles.boxText}>
          <Text style={styles.productName}>Bánh Mandu</Text>
          <Text style={styles.price}>Giá: 40.000đ</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
 const styles=StyleSheet.create({
        container:{
            flex: 1,
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent: 'center',   // căn giữa ngang
            alignItems: 'center',       // căn giữa dọc
            backgroundColor: '#f5f5f5', // thêm màu nền nhẹ cho đẹp
        }, 
        box:{
            width: '30%',
            height: '30%',
            margin: 5,
            backgroundColor: '#ffe9e9',
            borderRadius: 15,
            alignItems: 'center',
            padding: 10,
        },
        boxImg:{
            width:80,
            height:80,
            borderRadius: 8,
            marginBottom: 6,
            resizeMode: 'stretch' // ảnh giãn phủ kín toàn khung
        },
        boxText:{
            textAlign:'center',
            
        },
        productName:{
            fontSize:12,
            fontWeight:'bold',
            marginBottom:5,
            color:'#333'
        },
        price:{
            fontSize:10,
            fontWeight:'ultralight',
            marginBottom:5,
            color:'#555'
        },
        button:{
            backgroundColor:'#ff4b5c',
            borderRadius:5,
            borderWidth:1,
            borderColor:'white',
            width:70,
            paddingVertical:6,
            alignItems:'center'
        },
        buttonText:{
            fontSize:10,
            textAlign:'center',
            color:'white',
            fontWeight:'bold'
        }
 })
export default GridProduct