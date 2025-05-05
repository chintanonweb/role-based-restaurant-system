'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePermission } from '@/hooks/usePermission';
import { useOrders } from '@/contexts/OrderContext';
import { useMenu } from '@/contexts/MenuContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderList } from '@/components/orders/OrderList';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { ShoppingCart, Utensils, History, ArrowRight } from 'lucide-react';

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { orders } = useOrders();
  const { menuItems } = useMenu();
  
  useEffect(() => {
    // Check if user is customer
    if (user && user.role !== 'customer' && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);
  
  // Get user's active orders
  const userOrders = user ? orders.filter(
    order => order.userId === user.id && 
    (order.status === 'pending' || order.status === 'preparing' || order.status === 'ready')
  ) : [];
  
  // Get a few featured menu items
  const featuredItems = menuItems.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name || 'Guest'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Active Orders</CardTitle>
              <CardDescription>
                Track the status of your current orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userOrders.length > 0 ? (
                <OrderList orders={userOrders} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You don't have any active orders</p>
                  <Button variant="outline" onClick={() => router.push('/menu')}>
                    Browse Menu
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() => router.push('/customer/orders')}
              >
                <History className="mr-2 h-4 w-4" /> View Order History
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/menu')}
                >
                  <Utensils className="mr-2 h-4 w-4" />
                  Browse Menu
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/cart')}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/customer/orders')}
                >
                  <History className="mr-2 h-4 w-4" />
                  Order History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Menu Items</h2>
            <Button variant="link" onClick={() => router.push('/menu')}>
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}