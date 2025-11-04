
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

const ContactScreen = () => {
 const [contacts, setContacts] = useState([
    { id: "1", name: "Hồ Thị Duyên Hà", phone: "0901234567" },
    { id: "2", name: "Hồ Vũ Minh Hiếu", phone: "0912345678" },
    { id: "3", name: "Hồ Văn Hùng", phone: "0987654321" },
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId]=useState(null);

const addList = () => {
  if (!name.trim() || !phone.trim()) return;
  
  if(editId){
    const updateContacts = contacts.map((contact)=>
      contact.id ===editId ?{...contact, name, phone}: contact
    );
    setContacts(updateContacts);
    setEditId(null); // reset sau khi sửa xong
}else{
  const newContact = {
    id: Date.now().toString(),
    name: name.trim(),
    phone: phone.trim(),
  };
     setContacts([...contacts, newContact]);
}
  setName("");
  setPhone("");

};

// Lọc danh bạ theo tên và số điện thoại
const filterContacts =contacts.filter((contact)=>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.phone.includes(search)
);
 const handleEdit = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditId(contact.id);
  };

  const handleDelete =(id)=>{
    Alert.alert( "Xác nhận xóa",
      "Bạn có chắc muốn xóa liên hệ này không?",
    [
      { text: "HỦY", style: "cancel" },
    {
      text: "XÓA",
      style: "destructive",
      onPress: () => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
      },
    },
    ])
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh bạ</Text>
      <TextInput placeholder="Tên" style={styles.input}    value={name}
        onChangeText={setName}/>
      <TextInput placeholder="Số điện thoại" keyboardType="phone-pad" style={styles.input} value={phone}
        onChangeText={setPhone}/>
      <TouchableOpacity style={styles.addBtn} onPress={addList}>
        <Text style={styles.addText} >{editId ? "LƯU": "THÊM"}</Text>
      </TouchableOpacity>
      <TextInput placeholder="Tìm kiếm..." style={styles.input}  value={search} onChangeText={setSearch}/>

      {/* Danh sách liên hệ */}
      <FlatList
        data={filterContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil" size={20} color="#f39c12" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={20} color="#3498db" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5fbff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#006699",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderColor: "#b3e0f2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#0BA6DF",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e74c3c",
  },
  phone: {
    fontSize: 14,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ContactScreen;
