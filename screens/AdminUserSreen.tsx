import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { getAllUsers, updateUserRole, deleteUser } from "../database/database";

const AdminUserScreen = () => {
  const [users, setUsers] = useState([]);

  // Load tất cả user
  const loadUsers = async () => {
    const result = await getAllUsers();
    setUsers(result);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Đổi vai trò
  const handleUpdateRole = async (id: number, currentRole: string) => {
    const newRole = currentRole === "user" ? "admin" : "user"; // Toggle role

    await updateUserRole(id, newRole);
    await loadUsers(); // Refresh lại list
  };

  // Xóa user
  const handleDelete = (id: number) => {
    Alert.alert(
      "Xóa User",
      "Bạn chắc chắn muốn xóa user này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await deleteUser(id);
            await loadUsers();
          },
        },
      ]
    );
  };

  const renderUser = ({ item }: any) => (
    <View style={styles.userCard}>
      <Text style={styles.name}>{item.username}</Text>
      <Text style={styles.email}>{item.password}</Text>
      <Text style={styles.role}>Role: {item.role}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => handleUpdateRole(item.id, item.role)}
        >
          <Text style={styles.btnText}>Đổi vai trò</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản trị người dùng</Text>

      <FlatList
        data={users}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#FFE4EC" },
  title: { fontSize: 22, fontWeight: "bold", color: "#E91E63", marginBottom: 10 },

  userCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  email: { color: "#444" },
  role: { marginTop: 5, fontStyle: "italic" },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  updateButton: {
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#E91E63",
    padding: 8,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },

  btnText: { color: "#fff", fontWeight: "600" },
});

export default AdminUserScreen;
