'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { CartItem, MenuItem } from '@/lib/types';
import { getCart, setCart, clearCart } from '@/lib/localStorage';
import { useAuth } from './AuthContext';
import { generateId } from '@/lib/utils';

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, quantity: number, specialInstructions?: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCartItems: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCartItems: () => {},
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load cart from localStorage
    const cartItems = getCart();
    setItems(cartItems);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    setCart(items);
  }, [items]);

  const addToCart = (menuItem: MenuItem, quantity: number, specialInstructions?: string) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.menuItemId === menuItem.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          specialInstructions: specialInstructions || updatedItems[existingItemIndex].specialInstructions,
        };
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            id: generateId(),
            menuItemId: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity,
            specialInstructions,
          },
        ];
      }
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCartItems = () => {
    setItems([]);
    clearCart();
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCartItems,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);