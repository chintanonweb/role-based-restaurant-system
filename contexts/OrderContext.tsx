'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Order, CartItem } from '@/lib/types';
import { getOrders, setOrders } from '@/lib/localStorage';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { generateId, getCurrentDateTime } from '@/lib/utils';
import { initializeSampleOrders } from '@/lib/data-init';

interface OrderContextType {
  orders: Order[];
  placeOrder: (customerName: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getUserOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  placeOrder: () => {
    throw new Error('OrderContext not initialized');
  },
  updateOrderStatus: () => {},
  getUserOrders: () => [],
  getOrderById: () => undefined,
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrdersState] = useState<Order[]>([]);
  const { user } = useAuth();
  const { items, getTotalPrice, clearCartItems } = useCart();

  useEffect(() => {
    // Initialize sample orders if needed
    initializeSampleOrders();
    
    // Load orders from localStorage
    const savedOrders = getOrders();
    setOrdersState(savedOrders);
  }, []);

  const placeOrder = (customerName: string) => {
    if (items.length === 0) {
      throw new Error('Cannot place an empty order');
    }

    const newOrder: Order = {
      id: generateId(),
      userId: user?.id || 'guest',
      customerName: customerName || user?.name || 'Guest',
      items: [...items],
      status: 'pending',
      totalAmount: getTotalPrice(),
      createdAt: getCurrentDateTime(),
      updatedAt: getCurrentDateTime(),
    };

    const updatedOrders = [...orders, newOrder];
    setOrdersState(updatedOrders);
    setOrders(updatedOrders);
    
    // Clear the cart after placing the order
    clearCartItems();
    
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: getCurrentDateTime() }
        : order
    );
    
    setOrdersState(updatedOrders);
    setOrders(updatedOrders);
  };

  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id);
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        getUserOrders,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);