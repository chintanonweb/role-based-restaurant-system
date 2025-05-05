'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePermission } from '@/hooks/usePermission';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { useOrders } from '@/contexts/OrderContext';

interface OrderListProps {
  orders: Order[];
  showCustomerName?: boolean;
}

export function OrderList({ orders, showCustomerName = false }: OrderListProps) {
  const { checkPermission } = usePermission();
  const { updateOrderStatus } = useOrders();
  const canUpdateOrders = checkPermission('update', 'order');
  
  // Sort orders by date (newest first) and then by status
  const sortedOrders = [...orders].sort((a, b) => {
    // First by status - pending and preparing first
    const statusPriority = { 'pending': 0, 'preparing': 1, 'ready': 2, 'delivered': 3, 'cancelled': 4 };
    const statusDiff = statusPriority[a.status] - statusPriority[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    // Then by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'outline';
      case 'preparing':
        return 'secondary';
      case 'ready':
        return 'default';
      case 'delivered':
        return 'default'; // was 'success'
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };  
  
  const handleUpdateStatus = (orderId: string, currentStatus: Order['status']) => {
    const nextStatus = (() => {
      switch (currentStatus) {
        case 'pending':
          return 'preparing';
        case 'preparing':
          return 'ready';
        case 'ready':
          return 'delivered';
        default:
          return currentStatus;
      }
    })();
    
    updateOrderStatus(orderId, nextStatus);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedOrders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  Order #{order.id.slice(0, 6)}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </div>
                {showCustomerName && (
                  <div className="text-sm font-medium mt-1">
                    Customer: {order.customerName}
                  </div>
                )}
              </div>
              <Badge variant={getStatusBadgeVariant(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} × {item.name}
                    {item.specialInstructions && (
                      <span className="block text-xs text-muted-foreground italic">
                        Note: {item.specialInstructions}
                      </span>
                    )}
                  </span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="font-semibold">
              Total: {formatCurrency(order.totalAmount)}
            </div>
            {canUpdateOrders && order.status !== 'delivered' && order.status !== 'cancelled' && (
              <Button
                size="sm"
                variant="default"
                onClick={() => handleUpdateStatus(order.id, order.status)}
              >
                {order.status === 'pending' && (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Start Preparing
                  </>
                )}
                {order.status === 'preparing' && (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Ready
                  </>
                )}
                {order.status === 'ready' && (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Mark as Delivered
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}