import { Image, View, Text, TouchableOpacity, StyleSheet, FlatList, ImageSourcePropType } from 'react-native'
import React from 'react'

type Product = {
  name: string
  price: string
  img: ImageSourcePropType
}

const Card = ({ name, price, img }: Product) => {
  return (
    <View style={styles.productCard}>
      <Image source={img} style={styles.boxImg} />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  )
}

const CardFlatlist = () => {
  const products: Product[] = [
    { name: 'Kem dâu', price: '15.000đ', img: require('../../assets/images/productImg/icream.jpg') },
    { name: 'Cơm cuộn', price: '25.000đ', img: require('../../assets/images/productImg/rice.jpg') },
    { name: 'Há cảo', price: '30.000đ', img: require('../../assets/images/productImg/mandu.webp') },
    { name: 'Kem dâu', price: '15.000đ', img: require('../../assets/images/productImg/icream.jpg') },
    { name: 'Cơm cuộn', price: '25.000đ', img: require('../../assets/images/productImg/rice.jpg') },
    { name: 'Há cảo', price: '30.000đ', img: require('../../assets/images/productImg/mandu.webp') },
    { name: 'Kem dâu', price: '15.000đ', img: require('../../assets/images/productImg/icream.jpg') },
    { name: 'Cơm cuộn', price: '25.000đ', img: require('../../assets/images/productImg/rice.jpg') },
    { name: 'Há cảo', price: '30.000đ', img: require('../../assets/images/productImg/mandu.webp') },
  ]

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Products</Text>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Card name={item.name} price={item.price} img={item.img} />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3} // hiển thị 3 cột
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 12,
          marginBottom: 12,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 40,
          paddingBottom: 20,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  productCard: {
    width: 100,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#BADFDB',
    backgroundColor: '#facbcbff',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  boxImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 6,
  },

  text: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },

  price: {
    fontSize: 11,
    marginBottom: 4,
    color: '#555',
  },

  button: {
    backgroundColor: '#ff4b5c',
    borderRadius: 6,
    width: 70,
    paddingVertical: 5,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default CardFlatlist

