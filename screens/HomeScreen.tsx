import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageSourcePropType, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Import Component và Types cũ
import Header from '../components/projectComponents/Header';
import { HomeStackParamList, Product1 } from '../components/projectComponents/type';

// --- 1. IMPORT THÊM fetchCategories ---
import {
  fetchCategories,
  fetchProducts,
  searchProductsByNameOrCategory
} from '../database/database';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

// Map ảnh tĩnh (Giữ nguyên)
const staticImageMap: Record<string, ImageSourcePropType> = {
  'tui.jpg': require('../assets/images/productImg/tui.jpg'),
  'tuiong.jpg': require('../assets/images/productImg/tuiong.jpg'),
  'vit.jpg': require('../assets/images/productImg/vit.jpg'),
  'hoa.jpg': require('../assets/images/productImg/hoa.jpg'),
  'hinh1.jpg': require('../assets/images/productImg/tui.jpg'), 
  'default': require('../assets/images/productImg/tui.jpg'),
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product1[]>([]);
  const [loading, setLoading] = useState(false);

  // Hàm xử lý ảnh (Giữ nguyên)
  const getProductImage = (imgString: string): ImageSourcePropType => {
    if (!imgString) return staticImageMap['default'];
    if (imgString.startsWith('file://') || imgString.startsWith('content://')) {
      return { uri: imgString };
    }
    if (staticImageMap[imgString]) {
      return staticImageMap[imgString];
    }
    return staticImageMap['default'];
  };

  // --- HÀM LOAD DATA ĐÃ NÂNG CẤP ---
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Lấy danh sách danh mục trước
      const categoriesData = await fetchCategories();
      
      // 2. Tạo một bảng tra cứu (Map) để đổi ID thành Tên nhanh chóng
      // Kết quả dạng: { 1: 'Áo', 2: 'Giày', 3: 'Balo' ... }
      const categoryMap: Record<number, string> = {};
      categoriesData.forEach(cat => {
        categoryMap[cat.id] = cat.name;
      });

      // 3. Lấy danh sách sản phẩm
      let result: any[] = [];
      if (search.trim() === '') {
        result = await fetchProducts();
      } else {
        result = await searchProductsByNameOrCategory(search);
      }

      // 4. Chuyển đổi dữ liệu và GÁN TÊN DANH MỤC
      const formattedData: Product1[] = result.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price.toLocaleString('vi-VN') + 'đ',
        
        // --- SỬA Ở ĐÂY: Tra cứu tên từ map, nếu không thấy thì để mặc định ---
        category: categoryMap[item.categoryId] || 'Khác', 
        
        image: getProductImage(item.img), 
      }));

      setFilteredProducts(formattedData.reverse());
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadData();
    }, 500); 
    return () => clearTimeout(timeoutId);
  }, [search]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const renderProduct = ({ item }: { item: Product1 }) => (
    <View style={styles.productCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { product: item })}
      >
        <Image source={item.image} style={styles.productImage} />
      </TouchableOpacity>

      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      {/* Bây giờ ở đây sẽ hiện tên: "Áo", "Giày"... thay vì "Danh mục 1" */}
      <Text style={styles.productCategory}>{item.category}</Text>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Mua Ngay</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Image source={require('../assets/images/productImg/bannerhand.jpg')} style={styles.banner} />

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
          <Text style={styles.menuText}>Giới thiệu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProductsByCategory')}>
          <Text style={styles.menuText}>Danh mục</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm kiếm theo tên, danh mục..."
      />

      <Text style={styles.welcomeText}>Chào mừng đến với cửa hàng Handmade!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#E91E63" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
              Không tìm thấy sản phẩm nào.
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4EC',
  },
  banner: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFD9E1',
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  menuItem: {
    paddingVertical: 6,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E91E63',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 15,
    fontWeight: '500',
    color: '#E91E63',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  searchInput: {
    width: '95%',
    backgroundColor: '#FFE4EC',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: '#E91E63',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  productCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#E91E63',
    marginVertical: 6,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 13,
    color: '#E91E63',
    fontWeight: '500',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 6,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;