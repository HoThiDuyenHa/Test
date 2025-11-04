import { Image, View, Text, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'

type Product={
      name: string,
      price:string,
      img:ImageSourcePropType //tuong duong voi uri:string => thuoc tinh; image nhan ve mot doi tuong require or uri
}
const Card= ({name, price, img}:Product) => {
  return (
    <View style={styles.productCard}>
         <Image source={img} style={styles.boxImg}></Image>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Mua ngay</Text>
        </TouchableOpacity>
    </View>
      
  )
}
const  ProductCard =()=>{
    return (
      <View>
          <Text> Products</Text>
          <View style={styles.productList}>
              <Card name='Kem dâu' price='15000' img={require('../../assets/images/productImg/icream.jpg')}></Card>
              <Card name='Cơm cuộn' price='15000' img={require('../../assets/images/productImg/rice.jpg')}></Card>
              <Card name='Há cảo' price='15000' img={require('../../assets/images/productImg/mandu.webp')}></Card>
              <Card name='Kem dâu' price='15000' img={require('../../assets/images/productImg/icream.jpg')}></Card>
              <Card name='Cơm cuộn' price='15000' img={require('../../assets/images/productImg/rice.jpg')}></Card>
              <Card name='Há cảo' price='15000' img={require('../../assets/images/productImg/mandu.webp')}></Card>
              <Card name='Kem dâu' price='15000' img={require('../../assets/images/productImg/icream.jpg')}></Card>
              <Card name='Cơm cuộn' price='15000' img={require('../../assets/images/productImg/rice.jpg')}></Card>
              <Card name='Há cảo' price='15000' img={require('../../assets/images/productImg/mandu.webp')}></Card>
          </View>
      </View>
    )
}
const styles = StyleSheet.create({
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    alignItems: 'center',     
    gap: 12,
    marginTop: 40,
    paddingBottom: 20,
  },

  productCard: {
    width: 100,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#BADFDB',
    backgroundColor: '#facbcbff',

    //  Bóng đổ đẹp 
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
});

export default ProductCard