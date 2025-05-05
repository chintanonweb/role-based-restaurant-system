'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderList } from '@/components/orders/OrderList';

export default function CustomerOrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { orders } = useOrders();
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  
  // Filter orders for the current user
  const userOrders = user ? orders.filter(order => order.userId === user.id) : [];
  
  // Separate orders by status
  const activeOrders = userOrders.filter(
    order => order.status === 'pending' || order.status === 'preparing' || order.status === 'ready'
  );
  
  const completedOrders = userOrders.filter(
    order => order.status === 'delivered'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Order History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
                <CardDescription>
                  Track your current orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeOrders.length > 0 ? (
                  <OrderList orders={activeOrders} />
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">You don't have any active orders</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  Your past orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedOrders.length > 0 ? (
                  <OrderList orders={completedOrders} />
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">You don't have any completed orders yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}