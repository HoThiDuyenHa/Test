import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GridExcer = () => {
  return (
    <View style={styles.container}>
      {/* Hàng 1 */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#ff9999' }]}>
          <Text style={styles.text}>Box 1</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#99ccff' }]}>
          <Text style={styles.text}>Box 2</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#99ff99' }]}>
          <Text style={styles.text}>Box 3</Text>
        </View>
      </View>

      {/* Hàng 2 */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#ffcc99' }]}>
          <Text style={styles.text}>Box 4</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#cc99ff' }]}>
          <Text style={styles.text}>Box 5</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#ffff99' }]}>
          <Text style={styles.text}>Box 6</Text>
        </View>
      </View>

      {/* Hàng 3 */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#ffb6c1' }]}>
          <Text style={styles.text}>Box 7</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#87ceeb' }]}>
          <Text style={styles.text}>Box 8</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#90ee90' }]}>
          <Text style={styles.text}>Box 9</Text>
        </View>
      </View>
    </View>
  )
}

export default GridExcer

const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column', // Chia theo cột để hiển thị 3 hàng
  },
  row: {
    flex: 1,
    flexDirection: 'row', // Mỗi hàng chứa 3 box nằm ngang
  },
  box: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})