import * as SQLite from 'expo-sqlite';

// --- 1. SETUP & TYPES ---

// Mở database
let db: SQLite.SQLiteDatabase | null = null;



export const getDb = async () => {
  if (!db) {
    try {
      db = await SQLite.openDatabaseAsync('myDatabase.db');
    } catch (e) {
      console.error('❌ Failed to open DB:', e);
      throw e; // ném ra để biết lỗi
    }
  }
  return db;
};


// --- TYPES (Định nghĩa dữ liệu) ---
export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  categoryId: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

// Type cho Giỏ Hàng
export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  // Các field dưới đây lấy từ bảng products khi join
  productName?: string;
  productPrice?: number;
  productImg?: string;
};

// Type cho Đơn Hàng
export type Order = {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  productName?: string;
  productImg?: string;
};

// --- Dữ liệu mẫu ---
const initialCategories: Category[] = [
  { id: 1, name: 'Áo' }, { id: 2, name: 'Giày' }, { id: 3, name: 'Balo' },
  { id: 4, name: 'Mũ' }, { id: 5, name: 'Túi' },
];

const initialProducts: Product[] = [
  { id: 1, name: 'Bánh gạo', price: 250000, img: 'tui.jpg', categoryId: 1 },
  { id: 2, name: 'Kẹo Oxi', price: 1100000, img: 'tuiong.jpg', categoryId: 2 },
  { id: 3, name: 'Bánh Mandu', price: 490000, img: 'vit.jpg', categoryId: 3 },
  { id: 4, name: 'Cơm nắm', price: 120000, img: 'hoa.jpg', categoryId: 4 },
  { id: 5, name: 'Kem cá', price: 980000, img: 'tui.jpg', categoryId: 5 },
];


let initialized = false;
// --- 2. INIT DATABASE (Tạo bảng) ---
export const initDatabase = async () => {
if (db) return db;

  try {
    const database = await getDb();
await database.execAsync('PRAGMA foreign_keys = ON;');


await database.execAsync('  CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT);');

await database.execAsync('  CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, img TEXT, categoryId INTEGER, FOREIGN KEY(categoryId) REFERENCES categories(id));');

await database.execAsync('  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, role TEXT);');

await database.execAsync('  CREATE TABLE IF NOT EXISTS cart_items (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, productId INTEGER, quantity INTEGER);');

await database.execAsync('  CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, totalAmount REAL, status TEXT, createdAt TEXT);');

await database.execAsync('  CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, orderId INTEGER, productId INTEGER, quantity INTEGER, priceAtPurchase REAL);');
    console.log("Database initialized ✓");
  } catch (err) {
    console.log("Init DB error", err);
  }
};
// --- 3. CRUD FUNCTIONS ---

// --- CATEGORIES & PRODUCTS ---
export const fetchCategories = async (): Promise<Category[]> => {
  const database = await getDb();
  return await database.getAllAsync<Category>('SELECT * FROM categories');
};

export const fetchProducts = async (): Promise<Product[]> => {
  const database = await getDb();
  return await database.getAllAsync<Product>('SELECT * FROM products');
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const database = await getDb();
  await database.runAsync(
    'INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)',
    [product.name, product.price, product.img, product.categoryId]
  );
  console.log('✅ Product added');
};

export const updateProduct = async (product: Product) => {
  const database = await getDb();
  await database.runAsync(
    'UPDATE products SET name = ?, price = ?, img = ?, categoryId = ? WHERE id = ?',
    [product.name, product.price, product.img, product.categoryId, product.id]
  );
  console.log('✅ Product updated');
};

export const deleteProduct = async (id: number) => {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM cart_items WHERE productId = ?', [id]);
    await db.runAsync('DELETE FROM order_items WHERE productId = ?', [id]);
    await db.runAsync('DELETE FROM products WHERE id = ?', [id]);
  });
  console.log('✅ Product deleted safely');
};

export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const database = await getDb();
  return await database.getAllAsync<Product>('SELECT * FROM products WHERE categoryId = ?', [categoryId]);
};

export const searchProductsByNameOrCategory = async (keyword: string): Promise<Product[]> => {
  const database = await getDb();
  return await database.getAllAsync<Product>(
    `SELECT products.* FROM products
     JOIN categories ON products.categoryId = categories.id
     WHERE products.name LIKE ? OR categories.name LIKE ?`,
    [`%${keyword}%`, `%${keyword}%`]
  );
};

// --- USERS ---
export const addUser = async (username: string, password: string, role: string): Promise<boolean> => {
  try {
    const database = await getDb();
    await database.runAsync('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    return true;
  } catch (e) { return false; }
};

export const getUserByCredentials = async (username: string, password: string): Promise<User | null> => {
  const database = await getDb();
  return (await database.getFirstAsync<User>('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])) ?? null;
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
  const database = await getDb();
  return (
    await database.getFirstAsync<User>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )
  ) ?? null;
};

// ⭐ BỔ SUNG HÀM NÀY
export const getAllUsers = async (): Promise<User[]> => {
  const database = await getDb();
  return await database.getAllAsync<User>('SELECT * FROM users');
};

// ⭐ ĐỔI VAI TRÒ
export const updateUserRole = async (id: number, newRole: string) => {
  const database = await getDb();
  await database.runAsync('UPDATE users SET role = ? WHERE id = ?', [newRole, id]);
};

// ⭐ XÓA USER
export const deleteUser = async (id: number) => {
  const database = await getDb();
  await database.runAsync('DELETE FROM users WHERE id = ?', [id]);
};

// --- CART ---
export const getCartByUser = async (userId: number): Promise<CartItem[]> => {
  const database = await getDb();
  return await database.getAllAsync<CartItem>(
    `SELECT cart_items.*, products.name as productName, products.price as productPrice, products.img as productImg 
     FROM cart_items 
     JOIN products ON cart_items.productId = products.id 
     WHERE cart_items.userId = ?`,
    [userId]
  );
};

export const addToCart = async (userId: number, productId: number, quantity: number = 1) => {
  const database = await getDb();
  const existingItem = await database.getFirstAsync<{ id: number, quantity: number }>(
    'SELECT id, quantity FROM cart_items WHERE userId = ? AND productId = ?', [userId, productId]
  );
  if (existingItem) {
    await database.runAsync('UPDATE cart_items SET quantity = ? WHERE id = ?', [existingItem.quantity + quantity, existingItem.id]);
    console.log('✅ Updated cart quantity');
  } else {
    await database.runAsync('INSERT INTO cart_items (userId, productId, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
    console.log('✅ Added to cart');
  }
};

export const updateCartQuantity = async (cartItemId: number, quantity: number) => {
  const database = await getDb();
  if (quantity <= 0) {
    await database.runAsync('DELETE FROM cart_items WHERE id = ?', [cartItemId]);
  } else {
    await database.runAsync('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, cartItemId]);
  }
};

export const deleteCartItem = async (cartItemId: number) => {
  const database = await getDb();
  await database.runAsync('DELETE FROM cart_items WHERE id = ?', [cartItemId]);
};

export const clearCart = async (userId: number) => {
  const database = await getDb();
  await database.runAsync('DELETE FROM cart_items WHERE userId = ?', [userId]);
};

// --- ORDERS ---
export const createOrder = async (userId: number, items: CartItem[], totalAmount: number): Promise<boolean> => {
  const database = await getDb();
  try {
    await database.withTransactionAsync(async () => {
      const createdAt = new Date().toISOString();
      // 1. Order Header
      const result = await database.runAsync(
        'INSERT INTO orders (userId, totalAmount, status, createdAt) VALUES (?, ?, ?, ?)',
        [userId, totalAmount, 'pending', createdAt]
      );
      const orderId = result.lastInsertRowId;
      // 2. Order Items
      for (const item of items) {
        await database.runAsync(
          'INSERT INTO order_items (orderId, productId, quantity, priceAtPurchase) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, item.productPrice || 0]
        );
      }
      // 3. Clear Cart
      await database.runAsync('DELETE FROM cart_items WHERE userId = ?', [userId]);
    });
    console.log('✅ Order created');
    return true;
  } catch (error) {
    console.error('❌ Error creating order:', error);
    return false;
  }
};

export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  const database = await getDb();
  return await database.getAllAsync<Order>(
    'SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC', [userId]
  );
};

export const getOrderDetails = async (orderId: number): Promise<OrderItem[]> => {
  const database = await getDb();
  return await database.getAllAsync<OrderItem>(
    `SELECT order_items.*, products.name as productName, products.img as productImg 
     FROM order_items 
     JOIN products ON order_items.productId = products.id 
     WHERE order_items.orderId = ?`,
    [orderId]
  );
};