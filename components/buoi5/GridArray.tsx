import { View, Text, StyleSheet } from 'react-native';
import React from 'react'
 
const color=['#ff9999','#99ccff' ,'#99ff99','#ffcc99',  
              '#cc99ff', '#ffff99', '#ffb6c1', '#87ceeb', '#90ee90' ]

const GridArray = () => {
  return (
    <View style={styles.container}>
      {color.map((color,index)=>(
        <View key={index} style={[styles.box,{backgroundColor:color}]}>
        <Text style={styles.text}>Box{index+1}</Text>
        </View>
      ))}
    </View>
  )
}
 const styles=StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  box:{
    width: '33.33%',
    height: '33.33%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderColor:'yellow'
  },
  text:{
    fontSize:12,
    fontWeight:'bold'
  }
 })
export default GridArray