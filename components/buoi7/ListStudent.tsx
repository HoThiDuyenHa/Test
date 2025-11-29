import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

type Student = {
  id: number;
  name: string;
  age: number;
  grade: number;
};

const ListStudent = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'An', age: 18, grade: 9 },
    { id: 2, name: 'Bình', age: 19, grade: 8 },
    { id: 3, name: 'Chi', age: 20, grade: 8.5 },
    { id: 4, name: 'Dương', age: 18, grade: 8 },
    { id: 5, name: 'Hà', age: 17, grade: 9.5 },
  ]);

  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editId, setEditId] = useState<number | null>(null); // Thêm trạng thái sửa

  // 🔹 Thêm hoặc sửa học sinh
  const handleAddOrEdit = () => {
    if (!name || !age || !grade) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (editId) {
      // Cập nhật học sinh đang sửa
      const updatedStudents = students.map((s) =>
        s.id === editId ? { ...s, name, age: Number(age), grade: Number(grade) } : s
      );
      setStudents(updatedStudents);
      setEditId(null); // reset trạng thái sau khi sửa xong
    } else {
      // Thêm học sinh mới
      const newStudent: Student = {
        id: Date.now(),
        name,
        age: Number(age),
        grade: Number(grade),
      };
      setStudents([...students, newStudent]);
    }

    // Reset form
    setName('');
    setAge('');
    setGrade('');
  };

  // 🔹 Chọn học sinh để sửa
  const handleEdit = (student: Student) => {
    setName(student.name);
    setAge(student.age.toString());
    setGrade(student.grade.toString());
    setEditId(student.id);
  };

  // 🔹 Xóa học sinh
  const handleDelete = (id: number) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa học sinh này không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setStudents(students.filter((s) => s.id !== id));
          },
        },
      ]
    );
  };



const handleSortByGrade = () => {
  const sortedStudents = [...students].sort((a, b) => b.grade - a.grade);
  setStudents(sortedStudents);
};

  // 🔹 Tính số học sinh có điểm trên 8
  const highScoreCount = students.filter((s) => s.grade == 8).length;


const filteredStudents = students.filter( (s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.age.toString().includes(search) ||
    s.grade.toString().includes(search) );

  // 🔹 Component hiển thị từng học sinh
  const renderStudent = ({ item, index }: { item: Student; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.grade}</Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý Danh Sách Học Sinh</Text>

      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm kiếm học sinh theo tên, tuổi hoặc điểm"
      />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên học sinh"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Nhập tuổi"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={grade}
        onChangeText={setGrade}
        placeholder="Nhập điểm"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddOrEdit}>
        <Text style={styles.buttonText}>{editId ? 'Lưu chỉnh sửa' : 'Thêm học sinh'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={handleSortByGrade}>
      <Text style={styles.buttonText}>Sắp xếp theo điểm (cao → thấp)</Text>
    </TouchableOpacity>


      <Text style={styles.text}>
        Số học sinh có điểm bằng 8: {highScoreCount}
      </Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.headerCell}>Tên</Text>
        <Text style={styles.headerCell}>Tuổi</Text>
        <Text style={styles.headerCell}>Điểm</Text>
        <Text style={styles.headerCell}>Hành động</Text>
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#006699',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#b3e0f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#0BA6DF',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 5,
    shadowColor: '#0BA6DF',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: '#333',
    marginTop: 15,
    fontSize: 15,
    fontStyle: 'italic',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0BA6DF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 8,
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
    alignItems: 'center',
  },
  cell: {
    textAlign: 'center',
    flex: 1,
    color: '#333',
  },
  actionContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4B4B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default ListStudent;
