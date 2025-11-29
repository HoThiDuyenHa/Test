import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Import AsyncStorage
import { useFocusEffect } from '@react-navigation/native'; // 2. Import useFocusEffect để load lại khi quay lại
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet, Text,
  TouchableOpacity,
  View
} from 'react-native';

// Import Component
import { HomeStackParamList } from '../components/projectComponents/type';

// --- IMPORT DATABASE ---
import {
  addToCart,
  Category,
  fetchCategories
} from '../database/database';

type DetailsScreenProps = NativeStackScreenProps<HomeStackParamList, 'Details'>;

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { product } = route.params;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  
  // 3. Thay currentUserId cứng bằng State
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // --- LẤY USER ID TỪ ASYNC STORAGE ---
  // Dùng useFocusEffect để đảm bảo nếu user logout/login lại thì ID được cập nhật
  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        try {
          // Lưu ý: Key phải khớp với bên LoginSqlite ('loggedInUser')
          const jsonValue = await AsyncStorage.getItem('loggedInUser'); 
          if (jsonValue != null) {
            const user = JSON.parse(jsonValue);
            setCurrentUserId(user.id);
          } else {
            setCurrentUserId(null); // Chưa đăng nhập
          }
        } catch (e) {
          console.error(e);
        }
      };
      getUser();
    }, [])
  );

  // --- LẤY DANH MỤC TỪ DB ---
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchCategories();
      setCategories(result);
      setCategoryNames(result.map(c => c.name));
    };
    loadData();
  }, []);

  const handleSelectCategory = (categoryName: string) => {
    const selectedCat = categories.find(c => c.name === categoryName);
    if (selectedCat) {
      // @ts-ignore: Bỏ qua lỗi check type nếu bạn chưa update ParamList
      navigation.navigate('ProductsByCategory', { initialCategoryId: selectedCat.id });
    }
  };

  // --- XỬ LÝ THÊM VÀO GIỎ ---
  const handleAddToCart = async () => {
    // 4. Kiểm tra xem đã đăng nhập chưa
    if (currentUserId === null) {
      Alert.alert(
        "Yêu cầu đăng nhập", 
        "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Đăng nhập ngay", onPress: () => {
              // Điều hướng về tab Tài khoản (nơi chứa Login)
              // Lưu ý: Điều hướng này phụ thuộc vào cấu trúc Nav của bạn
              // Nếu bạn đang ở Stack con, có thể cần navigate về Root trước
              // @ts-ignore 
              navigation.navigate('AccountTab'); 
            } 
          }
        ]
      );
      return;
    }

    const productId = parseInt(product.id);
    if (isNaN(productId)) {
      Alert.alert("Lỗi", "Không xác định được ID sản phẩm");
      return;
    }

    // 5. Thêm vào giỏ của user hiện tại
    await addToCart(currentUserId, productId, 1);
    Alert.alert("Thành công", `Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Chi Tiết Sản Phẩm</Text>
        
        <Image source={product.image} style={styles.productImage} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.desc}>
            Sản phẩm handmade tinh xảo, chất liệu thân thiện môi trường. 
            Phù hợp làm quà tặng hoặc trang trí.
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Thêm Vào Giỏ Hàng</Text>
        </TouchableOpacity> 
   


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { alignItems: 'center', padding: 20, paddingBottom: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  productImage: { width: 250, height: 250, borderRadius: 20, marginBottom: 20, resizeMode: 'cover', borderWidth: 1, borderColor: '#eee' },
  infoContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#E91E63', textAlign: 'center', marginBottom: 10 },
  price: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 15 },
  desc: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, paddingHorizontal: 10 },
  addToCartBtn: { backgroundColor: '#E91E63', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, marginBottom: 30, elevation: 3, shadowColor: '#E91E63', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#888', marginBottom: 10, alignSelf: 'flex-start' },
});

export default DetailsScreen;