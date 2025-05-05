import { MenuItem, Order } from './types';
import { getMenuItems, setMenuItems, getOrders, setOrders } from './localStorage';
import { generateId, getCurrentDateTime } from './utils';

// Initialize menu items if none exist
export function initializeMenuItems(): void {
  const menuItems = getMenuItems();
  
  if (menuItems.length === 0) {
    const defaultMenuItems: MenuItem[] = [
      {
        id: generateId(),
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce',
        price: 12.99,
        category: 'Main Dishes',
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan, croutons and Caesar dressing',
        price: 9.99,
        category: 'Starters',
        image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
        price: 14.99,
        category: 'Main Dishes',
        image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Chocolate Brownie',
        description: 'Warm chocolate brownie served with vanilla ice cream',
        price: 7.99,
        category: 'Desserts',
        image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet with lemon herb butter',
        price: 18.99,
        category: 'Main Dishes',
        image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt',
        price: 4.99,
        category: 'Sides',
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Cheesecake',
        description: 'Creamy New York style cheesecake',
        price: 6.99,
        category: 'Desserts',
        image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Chicken Wings',
        description: 'Spicy buffalo wings with blue cheese dip',
        price: 11.99,
        category: 'Starters',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        available: true,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
    ];
    
    setMenuItems(defaultMenuItems);
  }
}

// Initialize sample orders if none exist
export function initializeSampleOrders(): void {
  const orders = getOrders();
  
  if (orders.length === 0) {
    const menuItems = getMenuItems();
    
    if (menuItems.length === 0) {
      return; // Can't create orders without menu items
    }
    
    const sampleOrders: Order[] = [
      {
        id: generateId(),
        userId: 'sample-customer',
        customerName: 'John Smith',
        items: [
          {
            id: generateId(),
            menuItemId: menuItems[0].id,
            name: menuItems[0].name,
            price: menuItems[0].price,
            quantity: 2,
          },
          {
            id: generateId(),
            menuItemId: menuItems[5].id,
            name: menuItems[5].name,
            price: menuItems[5].price,
            quantity: 1,
          },
        ],
        status: 'preparing',
        totalAmount: menuItems[0].price * 2 + menuItems[5].price,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        userId: 'sample-customer',
        customerName: 'Sarah Johnson',
        items: [
          {
            id: generateId(),
            menuItemId: menuItems[2].id,
            name: menuItems[2].name,
            price: menuItems[2].price,
            quantity: 1,
          },
        ],
        status: 'pending',
        totalAmount: menuItems[2].price,
        createdAt: getCurrentDateTime(),
        updatedAt: getCurrentDateTime(),
      },
    ];
    
    setOrders(sampleOrders);
  }
}

// Initialize all data
export function initializeAllData(): void {
  initializeMenuItems();
  initializeSampleOrders();
}