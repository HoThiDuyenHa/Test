import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Import Database functions
import {
    CartItem,
    createOrder,
    deleteCartItem,
    getCartByUser,
    updateCartQuantity
} from '../database/database'; // Kiểm tra đường dẫn db của bạn

// --- COPY LẠI MAP ẢNH (Để hiển thị đúng ảnh tĩnh/động) ---
const staticImageMap: Record<string, ImageSourcePropType> = {
  'tui.jpg': require('../assets/images/productImg/tui.jpg'),
  'tuiong.jpg': require('../assets/images/productImg/tuiong.jpg'),
  'vit.jpg': require('../assets/images/productImg/vit.jpg'),
  'hoa.jpg': require('../assets/images/productImg/hoa.jpg'),
  'default': require('../assets/images/productImg/tui.jpg'),
};

const getProductImage = (imgString?: string): ImageSourcePropType => {
  if (!imgString) return staticImageMap['default'];
  if (imgString.startsWith('file://') || imgString.startsWith('content://')) {
    return { uri: imgString };
  }
  return staticImageMap[imgString] || staticImageMap['default'];
};

const CartScreen = ({ navigation }: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // 1. Load User & Cart data
  const loadCartData = async () => {
    setLoading(true);
    try {
      const userJson = await AsyncStorage.getItem('loggedInUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        setUserId(user.id);

        // Lấy giỏ hàng từ DB
        const items = await getCartByUser(user.id);
        setCartItems(items);

        // Tính tổng tiền
        const total = items.reduce((sum, item) => sum + (item.quantity * (item.productPrice || 0)), 0);
        setTotalAmount(total);
      } else {
        setUserId(null);
        setCartItems([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Tự động load mỗi khi vào màn hình
  useFocusEffect(
    useCallback(() => {
      loadCartData();
    }, [])
  );

  // 2. Xử lý Tăng/Giảm số lượng
  const handleUpdateQuantity = async (itemId: number, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 1) {
      // Nếu giảm xuống 0 -> Hỏi xóa
      Alert.alert("Xóa sản phẩm", "Bạn muốn xóa sản phẩm này khỏi giỏ?", [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: async () => {
            await deleteCartItem(itemId);
            loadCartData(); // Reload lại giỏ
          }}
      ]);
    } else {
      await updateCartQuantity(itemId, newQty);
      loadCartData();
    }
  };

  // 3. Xử lý xóa
  const handleDelete = async (itemId: number) => {
    await deleteCartItem(itemId);
    loadCartData();
  };

  // 4. Xử lý Thanh toán (Checkout)
  const handleCheckout = async () => {
    if (!userId || cartItems.length === 0) return;

    Alert.alert("Xác nhận", `Tổng thanh toán là ${totalAmount.toLocaleString('vi-VN')}đ. Bạn có muốn đặt hàng?`, [
      { text: "Hủy", style: "cancel" },
      { text: "Đặt hàng", onPress: async () => {
          const success = await createOrder(userId, cartItems, totalAmount);
          if (success) {
            Alert.alert("Thành công", "Đơn hàng đã được tạo!");
            loadCartData(); // Giỏ hàng sẽ rỗng sau khi đặt
          } else {
            Alert.alert("Lỗi", "Đặt hàng thất bại, vui lòng thử lại.");
          }
        }}
    ]);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemCard}>
      <Image source={getProductImage(item.productImg)} style={styles.itemImage} />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.productName}</Text>
        <Text style={styles.itemPrice}>{(item.productPrice || 0).toLocaleString('vi-VN')}đ</Text>
        
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity, -1)} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
        <Text style={{ fontSize: 20 }}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{flex:1}} color="#E91E63"/>;

  if (!userId) {
    return (
      <View style={styles.centerContainer}>
        <Text>Vui lòng đăng nhập để xem giỏ hàng</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Giỏ Hàng Của Bạn</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: 'gray' }}>Giỏ hàng đang trống</Text>
        }
      />

      {/* FOOTER THANH TOÁN */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalValue}>{totalAmount.toLocaleString('vi-VN')}đ</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Thanh Toán</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#E91E63', margin: 15, textAlign: 'center' },
  
  itemCard: {
    flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 15, marginBottom: 10,
    borderRadius: 10, padding: 10, alignItems: 'center', elevation: 2
  },
  itemImage: { width: 70, height: 70, borderRadius: 5, backgroundColor: '#eee' },
  itemInfo: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 14, color: '#E91E63', fontWeight: '600', marginTop: 4 },
  
  qtyContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { width: 25, height: 25, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  qtyText: { fontSize: 18, fontWeight: 'bold', lineHeight: 20 },
  qtyValue: { marginHorizontal: 10, fontSize: 14 },
  
  deleteBtn: { padding: 5 },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'white', padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: '#eee', elevation: 10
  },
  totalLabel: { fontSize: 14, color: 'gray' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#E91E63' },
  checkoutBtn: { backgroundColor: '#E91E63', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 },
  checkoutText: { color: 'white', fontWeight: 'bold' }
});

export default CartScreen;