import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Đảm bảo đường dẫn import database là chính xác
import {
  addProduct,
  Category,
  deleteProduct,
  fetchCategories,
  fetchProducts,
  initDatabase,
  Product,
  searchProductsByNameOrCategory,
  updateProduct,
} from '../../src/database/database';

const Sanpham3Sqlite = () => {
  // ... (Giữ nguyên các State)
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false); // Thêm state cho Refreshing

  // --- LOGIC TẢI DỮ LIỆU ---
  const loadData = useCallback(async () => {
    setRefreshing(true);
    try {
      const cats = await fetchCategories();
      const prods = await fetchProducts();
      setCategories(cats);
      setProducts(prods.reverse());
      // Đảm bảo categoryId mặc định hợp lệ
      if (cats.length > 0 && categoryId === 1) {
        setCategoryId(cats[0].id);
      }
    } catch (e) {
      console.error('Lỗi tải dữ liệu:', e);
    } finally {
      setRefreshing(false);
    }
  }, [categoryId]);

  useEffect(() => {
    // Khởi tạo DB chỉ 1 lần và sau đó tải dữ liệu
    initDatabase(() => loadData());
  }, [loadData]); // Thêm loadData vào dependency array

  // --- (Giữ nguyên các hàm CRUD, Edit, Delete, PickImage) ---
  const handleAddOrUpdate = async () => {
    if (!name || !price) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ Tên và Giá sản phẩm.');
      return;
    }

    const productData = {
      name,
      price: parseFloat(price),
      img: imageUri || 'hinh1.jpg',
      categoryId,
    };

    try {
      if (editingId !== null) {
        await updateProduct({ id: editingId, ...productData });
        setEditingId(null);
        Alert.alert('Thành công', 'Sản phẩm đã được cập nhật.');
      } else {
        await addProduct(productData);
        Alert.alert('Thành công', 'Sản phẩm mới đã được thêm.');
      }
      // Clear Form
      setName('');
      setPrice('');
      setCategoryId(categories.length > 0 ? categories[0].id : 1);
      setImageUri(null);
      loadData(); // Tải lại danh sách
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu dữ liệu.');
    }
  };

  const handleEdit = (id: number) => {
    const p = products.find((x) => x.id === id);
    if (p) {
      setName(p.name);
      setPrice(p.price.toString());
      setCategoryId(p.categoryId);
      setImageUri(p.img);
      setEditingId(p.id);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa sản phẩm này không?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await deleteProduct(id);
          loadData();
        },
      },
    ]);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getImageSource = (img: string) => {
    if (img && img.startsWith('file://')) return { uri: img };
    // Giả định logic require ảnh tĩnh dựa trên tên file
    switch (img) {
      case 'hinh1.jpg':
        return require('../../assets/images/productImg/banhkeo.jpg');
      case 'hinh2.jpg':
        return require('../../assets/images/productImg/banhkeo.jpg');
      default:
        // Cần đảm bảo đường dẫn ảnh mặc định này tồn tại
        return require('../../assets/images/productImg/banhkeo.jpg'); 
    }
  };

  const handleSearch = async (keyword: string) => {
    if (keyword.trim() === '') loadData();
    else {
      const results = await searchProductsByNameOrCategory(keyword);
      setProducts(results.reverse());
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={getImageSource(item.img)} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => handleEdit(item.id)}>
            <Text style={styles.icon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.icon}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // --- COMPONENT CHỨA FORM & TÌM KIẾM (List Header) ---
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>🛒 Quản lý sản phẩm</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá sản phẩm"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* Picker Select */}
      {categories.length > 0 && (
        <RNPickerSelect
          onValueChange={(value) => setCategoryId(value)}
          items={categories.map((c) => ({ label: c.name, value: c.id }))}
          value={categoryId}
          placeholder={{ label: "Chọn danh mục", value: null }} // Đảm bảo placeholder không bị lỗi
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
        />
      )}

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        <Text style={styles.buttonText}>{imageUri ? 'Chọn lại hình ảnh' : 'Chọn hình ảnh'}</Text>
      </TouchableOpacity>

      {imageUri && <Image source={getImageSource(imageUri)} style={styles.selectedImage} />}

      {/* Save/Update Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdate}>
        <Text style={styles.buttonText}>
          {editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="🔍 Tìm theo tên sản phẩm hoặc loại"
        onChangeText={handleSearch}
      />
    </View>
  );

  // --- GIAO DIỆN CHÍNH (Sử dụng FlatList làm container cuộn chính) ---
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader} // Đặt Form và Tìm kiếm ở đầu danh sách
      ListEmptyComponent={
        <Text style={styles.emptyList}>Không có sản phẩm nào</Text>
      }
      contentContainerStyle={styles.container}
      refreshing={refreshing} // Hỗ trợ kéo xuống để làm mới
      onRefresh={loadData}
    />
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    paddingBottom: 50, // Đảm bảo có khoảng trống dưới cùng
  },
  headerContainer: {
    // Container cho ListHeaderComponent
  },
  title: {
    fontSize: 24, // Tăng kích thước tiêu đề cho nổi bật
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 45, // Tăng chiều cao input
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8, // Tăng độ bo góc
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2ecc71', // Màu xanh lá cây nổi bật hơn
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#3498db', // Màu xanh dương cho chọn ảnh
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2, // Thêm bóng cho Android
    shadowColor: '#000', // Thêm bóng cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: { width: 80, height: 80, resizeMode: 'cover' },
  selectedImage: {
    width: 120, 
    height: 120, 
    marginVertical: 10, 
    borderRadius: 8, 
    alignSelf: 'center',
  },
  cardInfo: { flex: 1, padding: 10, justifyContent: 'space-between' },
  productName: { fontWeight: '600', fontSize: 16 },
  productPrice: { color: '#e74c3c', fontWeight: 'bold' }, // Màu đỏ cho giá
  iconRow: { flexDirection: 'row', marginTop: 5 },
  icon: { fontSize: 20, marginRight: 15 },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  }
});

export default Sanpham3Sqlite;