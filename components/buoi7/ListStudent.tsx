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
    { id: 2, name: 'Bình', age: 19, grade: 7 },
    { id: 3, name: 'Chi', age: 20, grade: 8.5 },
    { id: 4, name: 'Dương', age: 18, grade: 6 },
    { id: 5, name: 'Hà', age: 17, grade: 9.5 },
  ]);

  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  // 🔹 Thêm học sinh mới
  const handleAdd = () => {
    if (!name || !age || !grade) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name,
      age: Number(age),
      grade: Number(grade),
    };
    setStudents([...students, newStudent]);
    setName('');
    setAge('');
    setGrade('');
  };

  // 🔹 Xóa học sinh
  const handleDelete = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // 🔹 Sửa học sinh (ở đây chỉ là demo)
  const handleEdit = (id: number) => {
    Alert.alert('Chức năng sửa', `Bạn muốn sửa học sinh có ID = ${id}`);
  };

  // 🔹 Lọc danh sách theo search
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.age.toString().includes(search) ||
      s.grade.toString().includes(search)
  );

  // 🔹 Tính số học sinh có điểm trên 8
  const highScoreCount = students.filter((s) => s.grade > 8).length;

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
          onPress={() => handleEdit(item.id)}
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

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Thêm học sinh</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Số học sinh có điểm trên 8: {highScoreCount}
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
