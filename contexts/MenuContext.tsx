'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { MenuItem } from '@/lib/types';
import { getMenuItems, setMenuItems } from '@/lib/localStorage';
import { generateId, getCurrentDateTime } from '@/lib/utils';
import { initializeMenuItems } from '@/lib/data-init';

interface MenuContextType {
  menuItems: MenuItem[];
  categories: string[];
  addMenuItem: (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  getMenuItemById: (id: string) => MenuItem | undefined;
  getMenuItemsByCategory: (category: string) => MenuItem[];
}

const MenuContext = createContext<MenuContextType>({
  menuItems: [],
  categories: [],
  addMenuItem: () => {},
  updateMenuItem: () => {},
  deleteMenuItem: () => {},
  getMenuItemById: () => undefined,
  getMenuItemsByCategory: () => [],
});

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItemsState] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Initialize menu items if needed
    initializeMenuItems();
    
    // Load menu items from localStorage
    const items = getMenuItems();
    setMenuItemsState(items);
    
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
    setCategories(uniqueCategories);
  }, []);

  const addMenuItem = (itemData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: generateId(),
      createdAt: getCurrentDateTime(),
      updatedAt: getCurrentDateTime(),
    };
    
    const updatedItems = [...menuItems, newItem];
    setMenuItemsState(updatedItems);
    setMenuItems(updatedItems);
    
    // Update categories if needed
    if (!categories.includes(itemData.category)) {
      setCategories([...categories, itemData.category]);
    }
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedItems = menuItems.map(item => 
      item.id === id
        ? { ...item, ...updates, updatedAt: getCurrentDateTime() }
        : item
    );
    
    setMenuItemsState(updatedItems);
    setMenuItems(updatedItems);
    
    // Update categories if needed
    if (updates.category && !categories.includes(updates.category)) {
      setCategories([...categories, updates.category]);
    }
  };

  const deleteMenuItem = (id: string) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItemsState(updatedItems);
    setMenuItems(updatedItems);
    
    // Recalculate categories
    const remainingCategories = Array.from(
      new Set(updatedItems.map(item => item.category))
    );
    setCategories(remainingCategories);
  };

  const getMenuItemById = (id: string) => {
    return menuItems.find(item => item.id === id);
  };

  const getMenuItemsByCategory = (category: string) => {
    return menuItems.filter(item => item.category === category);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        categories,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        getMenuItemById,
        getMenuItemsByCategory,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);