import { User, MenuItem, Order, CartItem } from './types';

// Storage keys
const STORAGE_KEYS = {
  USER: 'restaurant_user',
  MENU_ITEMS: 'restaurant_menu_items',
  ORDERS: 'restaurant_orders',
  CART: 'restaurant_cart',
  USERS: 'restaurant_users',
};

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// User management
export const getUser = (): User | null => {
  if (!isLocalStorageAvailable()) return null;
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: User): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const removeUser = (): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Menu items management
export const getMenuItems = (): MenuItem[] => {
  if (!isLocalStorageAvailable()) return [];
  const items = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
  return items ? JSON.parse(items) : [];
};

export const setMenuItems = (items: MenuItem[]): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
};

// Orders management
export const getOrders = (): Order[] => {
  if (!isLocalStorageAvailable()) return [];
  const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return orders ? JSON.parse(orders) : [];
};

export const setOrders = (orders: Order[]): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

// Cart management
export const getCart = (): CartItem[] => {
  if (!isLocalStorageAvailable()) return [];
  const cart = localStorage.getItem(STORAGE_KEYS.CART);
  return cart ? JSON.parse(cart) : [];
};

export const setCart = (items: CartItem[]): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
};

export const clearCart = (): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.removeItem(STORAGE_KEYS.CART);
};

// Users management
export const getUsers = (): User[] => {
  if (!isLocalStorageAvailable()) return [];
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const setUsers = (users: User[]): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};