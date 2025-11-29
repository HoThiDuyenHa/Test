import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Header from '../components/projectComponents/Header';
import { HomeStackParamList, Product1 } from '../components/projectComponents/type'; // Import type cũ của bạn

// --- IMPORT DATABASE ---
// (Lưu ý: kiểm tra đường dẫn import database cho đúng với máy bạn)
import {
    Category,
    fetchCategories,
    fetchProducts,
    fetchProductsByCategory
} from '../database/database';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductsByCategory'>;

// --- 1. COPY LẠI MAP ẢNH TỪ HOME SCREEN ---
// Để đảm bảo logic hiển thị ảnh giống nhau ở mọi nơi
const staticImageMap: Record<string, ImageSourcePropType> = {
  'tui.jpg': require('../assets/images/productImg/tui.jpg'),
  'tuiong.jpg': require('../assets/images/productImg/tuiong.jpg'),
  'vit.jpg': require('../assets/images/productImg/vit.jpg'),
  'hoa.jpg': require('../assets/images/productImg/hoa.jpg'),
  'hinh1.jpg': require('../assets/images/productImg/tui.jpg'), 
  'default': require('../assets/images/productImg/tui.jpg'),
};

const ProductsByCategoryScreen = ({ navigation }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // Null = Tất cả
  const [products, setProducts] = useState<Product1[]>([]);
  const [loading, setLoading] = useState(false);

  // --- 2. HÀM XỬ LÝ ẢNH ---
  const getProductImage = (imgString: string): ImageSourcePropType => {
    if (!imgString) return staticImageMap['default'];
    if (imgString.startsWith('file://') || imgString.startsWith('content://')) {
      return { uri: imgString };
    }
    return staticImageMap[imgString] || staticImageMap['default'];
  };

  // --- 3. LẤY DANH MỤC LÚC MỞ MÀN HÌNH ---
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      // Thêm mục "Tất cả" giả
      setCategories([{ id: 0, name: 'Tất cả' }, ...cats]);
      loadProducts(0); // Mặc định load tất cả
    };
    loadCategories();
  }, []);

  // --- 4. HÀM LOAD SẢN PHẨM THEO DANH MỤC ---
  const loadProducts = async (catId: number) => {
    setLoading(true);
    setSelectedCategoryId(catId);
    try {
      let result = [];
      if (catId === 0) {
        result = await fetchProducts(); // ID 0 -> Lấy hết
      } else {
        result = await fetchProductsByCategory(catId); // Lấy theo ID
      }

      // Convert dữ liệu DB sang UI
      const formattedData: Product1[] = result.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price.toLocaleString('vi-VN') + 'đ',
        category: `Danh mục ${item.categoryId}`,
        image: getProductImage(item.img), // Xử lý ảnh
      }));

      setProducts(formattedData.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.catItem,
        selectedCategoryId === item.id && styles.catItemActive,
      ]}
      onPress={() => loadProducts(item.id)}
    >
      <Text
        style={[
          styles.catText,
          selectedCategoryId === item.id && styles.catTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product1 }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { product: item })}>
        <Image source={item.image} style={styles.productImage} />
      </TouchableOpacity>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Mua</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Danh mục sản phẩm</Text>

      {/* List Danh mục ngang */}
      <View style={{ height: 60 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.catList}
        />
      </View>

      {/* List Sản phẩm */}
      {loading ? (
        <ActivityIndicator size="large" color="#E91E63" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderProduct}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Chưa có sản phẩm nào</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE4EC' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#E91E63', margin: 15, textAlign: 'center' },
  
  // Style cho Category
  catList: { paddingHorizontal: 10, alignItems: 'center' },
  catItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  catItemActive: { backgroundColor: '#E91E63' },
  catText: { color: '#E91E63', fontWeight: '600' },
  catTextActive: { color: '#fff' },

  // Style cho Product (Giống Home)
  productList: { padding: 10, paddingBottom: 20 },
  productCard: {
    width: '48%', // Chia đôi màn hình
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3,
  },
  productImage: { width: 100, height: 100, borderRadius: 10, resizeMode: 'cover' },
  productName: { fontSize: 14, fontWeight: '600', marginTop: 5, textAlign: 'center' },
  productPrice: { fontSize: 13, color: '#E91E63', fontWeight: 'bold', marginVertical: 3 },
  buyButton: {
    backgroundColor: '#E91E63', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 8, marginTop: 5
  },
  buyButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

export default ProductsByCategoryScreen;