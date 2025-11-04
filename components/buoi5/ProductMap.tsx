import { Image, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

const GridProducts = () => {
  // 🧩 Dữ liệu sản phẩm đưa thành mảng
  const products = [
    {
      id: 1,
      name: 'Kem dâu',
      price: '35.000đ',
      image: require('../../assets/images/productImg/icream.jpg'),
    },
    {
      id: 2,
      name: 'Cơm trộn',
      price: '45.000đ',
      image: require('../../assets/images/productImg/rice.jpg'),
    },
    {
      id: 3,
      name: 'Bánh Mandu',
      price: '40.000đ',
      image: require('../../assets/images/productImg/mandu.webp'),
    },
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      {/* Product section */}
      <View style={styles.productContainer}>
        {products.map((item) => (
          <View key={item.id} style={styles.box}>
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#ffe600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    backgroundColor: '#ffc0cb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  box: {
    width: '30%',
    backgroundColor: '#ffe9e9',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
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

export default GridProducts
