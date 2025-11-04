import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const CardArray = () => {
  const products = [
    {name: 'Kem dâu',price: '35.000đ',image: require('../../assets/images/productImg/icream.jpg'),},
    { name: 'Cơm trộn', price: '45.000đ',image: require('../../assets/images/productImg/rice.jpg'),},
    {name: 'Bánh Mandu',price: '40.000đ',image: require('../../assets/images/productImg/mandu.webp') },
    {name: 'Kem dâu',price: '35.000đ',image: require('../../assets/images/productImg/icream.jpg'),},
    { name: 'Cơm trộn', price: '45.000đ',image: require('../../assets/images/productImg/rice.jpg'),},
    {name: 'Bánh Mandu',price: '40.000đ',image: require('../../assets/images/productImg/mandu.webp') },
    {name: 'Kem dâu',price: '35.000đ',image: require('../../assets/images/productImg/icream.jpg'),},
    { name: 'Cơm trộn', price: '45.000đ',image: require('../../assets/images/productImg/rice.jpg'),},
    {name: 'Bánh Mandu',price: '40.000đ',image: require('../../assets/images/productImg/mandu.webp') },
  ]

  return (
    <View style={styles.productContainer}>
      {products.map((item, index) => (
        <View key={index} style={styles.box}>
          <Image source={item.image} style={styles.boxImg} />
          <View style={styles.boxText}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>Giá: {item.price}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  box: {
    width: '30%',
    backgroundColor: '#ffe9e9',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
  },
  boxImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
    resizeMode: 'cover',
  },
  boxText: {
    textAlign: 'center',
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 10,
    color: '#555',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#ff4b5c',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    width: 70,
    paddingVertical: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default CardArray 
