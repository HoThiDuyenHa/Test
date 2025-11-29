import { Ionicons } from '@expo/vector-icons'; // Icon
import * as ImagePicker from 'expo-image-picker'; // Thư viện chọn ảnh
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ImageSourcePropType,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// --- IMPORT DATABASE ---
import {
    addProduct,
    Category,
    deleteProduct,
    fetchCategories,
    fetchProducts,
    Product,
    updateProduct
} from '../../database/database'; // Kiểm tra lại đường dẫn db của bạn

// --- IMPORT COMPONENT CHỌN DANH MỤC ---
import CategorySelector from './CategorySelector';

// --- XỬ LÝ ẢNH (MAPPING) ---
const staticImageMap: Record<string, ImageSourcePropType> = {
  'tui.jpg': require('../../assets/images/productImg/tui.jpg'),
  'tuiong.jpg': require('../../assets/images/productImg/tuiong.jpg'),
  'vit.jpg': require('../../assets/images/productImg/vit.jpg'),
  'hoa.jpg': require('../../assets/images/productImg/hoa.jpg'),
  'default': require('../../assets/images/productImg/tui.jpg'),
};

const getProductImage = (imgString?: string): ImageSourcePropType => {
  if (!imgString) return staticImageMap['default'];
  // Nếu là ảnh chọn từ máy (file://)
  if (imgString.startsWith('file://') || imgString.startsWith('content://')) {
    return { uri: imgString };
  }
  // Nếu là ảnh tĩnh
  return staticImageMap[imgString] || staticImageMap['default'];
};

const AdminProductScreen = () => {
  // State dữ liệu
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // Danh sách danh mục từ DB
  const [loading, setLoading] = useState(false);
  
  // State UI
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State Form
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1); // Lưu ID danh mục (số)
  const [imageUri, setImageUri] = useState<string>(''); 

  // 1. Load dữ liệu (Sản phẩm + Danh mục)
  const loadData = async () => {
    setLoading(true);
    try {
      const prodData = await fetchProducts();
      const catData = await fetchCategories();
      
      setProducts(prodData.reverse()); // Mới nhất lên đầu
      setCategories(catData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. Chọn ảnh
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Ảnh vuông
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 3. Lưu (Thêm/Sửa)
  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và giá sản phẩm');
      return;
    }

    const finalImage = imageUri || 'default'; 

    if (isEditing && currentId) {
      // SỬA
      await updateProduct({
        id: currentId,
        name,
        price: parseFloat(price),
        categoryId: categoryId, 
        img: finalImage
      });
      Alert.alert('Thành công', 'Đã cập nhật sản phẩm');
    } else {
      // THÊM MỚI
      await addProduct({
        name,
        price: parseFloat(price),
        categoryId: categoryId,
        img: finalImage
      });
      Alert.alert('Thành công', 'Đã thêm sản phẩm mới');
    }

    setModalVisible(false);
    resetForm();
    loadData();
  };

  // 4. Xóa
  const handleDelete = (id: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', style: 'destructive', onPress: async () => {
          await deleteProduct(id);
          loadData();
        } 
      }
    ]);
  };

  // 5. Mở form Sửa
  const openEdit = (item: Product) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setName(item.name);
    setPrice(item.price.toString());
    setCategoryId(item.categoryId); // Set lại ID danh mục hiện tại
    setImageUri(item.img);
    setModalVisible(true);
  };

  // 6. Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setCategoryId(1); // Mặc định về danh mục 1
    setImageUri('');
    setIsEditing(false);
    setCurrentId(null);
  };

  // Helper để lấy tên danh mục từ ID (để hiển thị cho đẹp)
  const getCategoryName = (id: number) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : `ID: ${id}`;
  };

  // --- RENDER ITEM ---
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={getProductImage(item.img)} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.cat}>Loại: {getCategoryName(item.categoryId)}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEdit(item)} style={styles.editBtn}>
          <Ionicons name="pencil" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
          <Ionicons name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản Lý Sản Phẩm</Text>
        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => { resetForm(); setModalVisible(true); }}
        >
          <Text style={styles.addBtnText}>+ Thêm Mới</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E91E63" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>Chưa có sản phẩm nào</Text>}
        />
      )}

      {/* --- MODAL FORM --- */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEditing ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</Text>

            {/* CHỌN ẢNH */}
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {imageUri ? (
                 <Image source={getProductImage(imageUri)} style={{ width: 100, height: 100, borderRadius: 10 }} />
              ) : (
                 <View style={styles.placeholderImg}>
                    <Ionicons name="camera" size={40} color="#ccc" />
                    <Text style={{ color: '#888' }}>Chọn ảnh</Text>
                 </View>
              )}
            </TouchableOpacity>

            {/* INPUT TÊN & GIÁ */}
            <TextInput 
              placeholder="Tên sản phẩm" 
              style={styles.input} 
              value={name} onChangeText={setName} 
            />
            <TextInput 
              placeholder="Giá (VNĐ)" 
              style={styles.input} 
              keyboardType="numeric"
              value={price} onChangeText={setPrice} 
            />

            {/* CHỌN DANH MỤC (Dùng Component CategorySelector) */}
            <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 5, color: '#333' }}>Chọn Danh mục:</Text>
            <CategorySelector 
                categories={categories} // Truyền danh sách lấy từ DB
                selectedId={categoryId} // Truyền ID đang chọn
                onSelect={(id) => setCategoryId(id)} // Khi chọn thì update state
            />

            {/* BUTTONS */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{isEditing ? 'Lưu' : 'Thêm'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  addBtn: { backgroundColor: '#E91E63', padding: 10, borderRadius: 8 },
  addBtnText: { color: 'white', fontWeight: 'bold' },
  
  // Card Styles
  card: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 2, alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10, backgroundColor: '#eee' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { color: '#E91E63', fontWeight: 'bold' },
  cat: { fontSize: 12, color: 'gray' },
  actions: { flexDirection: 'row', gap: 10 },
  editBtn: { backgroundColor: '#2196F3', padding: 8, borderRadius: 5 },
  deleteBtn: { backgroundColor: '#F44336', padding: 8, borderRadius: 5 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#E91E63' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 12, fontSize: 16 },
  imagePicker: { alignSelf: 'center', marginBottom: 20 },
  placeholderImg: { width: 100, height: 100, backgroundColor: '#f0f0f0', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelBtn: { flex: 1, backgroundColor: '#999', padding: 12, borderRadius: 8, marginRight: 10, alignItems: 'center' },
  saveBtn: { flex: 1, backgroundColor: '#E91E63', padding: 12, borderRadius: 8, alignItems: 'center' },
});

export default AdminProductScreen;