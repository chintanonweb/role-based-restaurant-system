'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'in-stock' | 'low' | 'out-of-stock';
  lastUpdated: string;
}

export default function InventoryManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (user && user.role !== 'chef' && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  // Sample inventory data - In a real app, this would come from your backend
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Ground Beef',
      quantity: 25,
      unit: 'kg',
      status: 'in-stock',
      lastUpdated: '2024-03-20T10:00:00Z',
    },
    {
      id: '2',
      name: 'Tomatoes',
      quantity: 5,
      unit: 'kg',
      status: 'low',
      lastUpdated: '2024-03-20T09:30:00Z',
    },
    {
      id: '3',
      name: 'Lettuce',
      quantity: 0,
      unit: 'kg',
      status: 'out-of-stock',
      lastUpdated: '2024-03-20T08:45:00Z',
    },
    // Add more items as needed
  ];

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-green-500">In Stock</Badge>;
      case 'low':
        return <Badge variant="warning">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Low Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryItems
              .filter(item => item.status === 'low' || item.status === 'out-of-stock')
              .map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Current quantity: {item.quantity} {item.unit}
                    </p>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredItems.map(item => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} {item.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(item.lastUpdated).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(item.status)}
                  <Button variant="outline" size="sm">
                    Update Stock
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}