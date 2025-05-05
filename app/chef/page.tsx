'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePermission } from '@/hooks/usePermission';
import { useOrders } from '@/contexts/OrderContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderList } from '@/components/orders/OrderList';
import { Utensils, Package } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';

export default function ChefDashboardPage() {
  const { user } = useAuth();
  const { checkPermission } = usePermission();
  const { orders } = useOrders();
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is chef
    if (user && user.role !== 'chef' && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);
  
  // Get pending and preparing orders
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Chef Dashboard</h1>
        <Button variant="outline" onClick={() => router.push('/chef/inventory')}>
          <Package className="mr-2 h-4 w-4" />
          Manage Inventory
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Pending Orders"
          value={pendingOrders.length}
          icon={<Utensils className="h-4 w-4" />}
          description="Orders waiting to be prepared"
        />
        <StatCard
          title="Preparing"
          value={preparingOrders.length}
          icon={<Utensils className="h-4 w-4" />}
          description="Orders currently being prepared"
        />
        <StatCard
          title="Ready for Pickup"
          value={readyOrders.length}
          icon={<Package className="h-4 w-4" />}
          description="Orders ready to be delivered"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Kitchen Queue</CardTitle>
            <CardDescription>
              Manage incoming and in-progress orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pendingOrders.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Pending Orders</h3>
                  <OrderList orders={pendingOrders} showCustomerName />
                </div>
              )}
              
              {preparingOrders.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Currently Preparing</h3>
                  <OrderList orders={preparingOrders} showCustomerName />
                </div>
              )}
              
              {readyOrders.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Ready for Pickup</h3>
                  <OrderList orders={readyOrders} showCustomerName />
                </div>
              )}
              
              {pendingOrders.length === 0 && preparingOrders.length === 0 && readyOrders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active orders at the moment</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}