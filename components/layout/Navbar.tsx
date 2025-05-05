'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, LogOut, User, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const pathname = usePathname();
  
  // Determine which dashboard to link to based on user role
  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'chef':
        return '/chef';
      case 'customer':
        return '/customer';
      default:
        return '/';
    }
  };

  // Mobile menu links based on user role
  const getMobileMenuLinks = () => {
    if (!user) {
      return (
        <>
          <Link href="/login" className="flex w-full p-2 hover:bg-accent rounded-md">
            Login
          </Link>
          <Link href="/register" className="flex w-full p-2 hover:bg-accent rounded-md">
            Register
          </Link>
        </>
      );
    }

    if (user.role === 'admin') {
      return (
        <>
          <Link href="/admin" className="flex w-full p-2 hover:bg-accent rounded-md">
            Dashboard
          </Link>
          <Link href="/admin/menu" className="flex w-full p-2 hover:bg-accent rounded-md">
            Menu Management
          </Link>
          <Link href="/admin/orders" className="flex w-full p-2 hover:bg-accent rounded-md">
            Orders
          </Link>
          <Link href="/admin/users" className="flex w-full p-2 hover:bg-accent rounded-md">
            Users
          </Link>
          <Link href="/admin/financial" className="flex w-full p-2 hover:bg-accent rounded-md">
            Financial Reports
          </Link>
        </>
      );
    }

    if (user.role === 'chef') {
      return (
        <>
          <Link href="/chef" className="flex w-full p-2 hover:bg-accent rounded-md">
            Dashboard
          </Link>
          <Link href="/chef/kitchen" className="flex w-full p-2 hover:bg-accent rounded-md">
            Kitchen
          </Link>
          <Link href="/chef/inventory" className="flex w-full p-2 hover:bg-accent rounded-md">
            Inventory
          </Link>
        </>
      );
    }

    // Customer links
    return (
      <>
        <Link href="/customer" className="flex w-full p-2 hover:bg-accent rounded-md">
          Dashboard
        </Link>
        <Link href="/menu" className="flex w-full p-2 hover:bg-accent rounded-md">
          Menu
        </Link>
        <Link href="/customer/orders" className="flex w-full p-2 hover:bg-accent rounded-md">
          My Orders
        </Link>
        <Link href="/cart" className="flex w-full p-2 hover:bg-accent rounded-md">
          Cart ({getTotalItems()})
        </Link>
      </>
    );
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Restaurant<span className="text-primary">App</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link href={getDashboardLink()}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              
              {user.role === 'customer' && (
                <>
                  <Link href="/menu">
                    <Button variant="ghost">Menu</Button>
                  </Link>
                  <Link href="/cart" className="relative">
                    <Button variant="ghost">
                      <ShoppingCart className="h-5 w-5 mr-1" />
                      <span>Cart</span>
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="default">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="py-4 flex flex-col gap-2">
                <div className="text-lg font-semibold mb-4">
                  {user ? `Hello, ${user.name}` : 'Menu'}
                </div>
                {getMobileMenuLinks()}
                {user && (
                  <Button
                    variant="ghost"
                    className="flex w-full justify-start p-2 mt-4 text-destructive hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}