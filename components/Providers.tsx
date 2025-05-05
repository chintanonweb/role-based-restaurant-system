'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { MenuProvider } from '@/contexts/MenuContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <OrderProvider>{children}</OrderProvider>
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}