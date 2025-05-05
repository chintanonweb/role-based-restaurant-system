'use client';

import React, { useEffect } from 'react';
import { useMenu } from '@/contexts/MenuContext';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { initializeMenuItems } from '@/lib/data-init';

export default function MenuPage() {
  const { menuItems, categories } = useMenu();

  useEffect(() => {
    // Initialize menu items if needed
    initializeMenuItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
        <MenuGrid items={menuItems} categories={categories} />
      </div>
    </div>
  );
}