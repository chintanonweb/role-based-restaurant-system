'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/lib/utils';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems, clearCartItems } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const router = useRouter();
  
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handlePlaceOrder = () => {
    try {
      if (items.length === 0) {
        setError('Your cart is empty');
        return;
      }
      
      if (!customerName) {
        setError('Please enter your name');
        return;
      }
      
      const order = placeOrder(customerName);
      setOrderPlaced(true);
      
      // Auto-redirect to orders page after 3 seconds
      setTimeout(() => {
        router.push('/customer/orders');
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while placing your order');
      }
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. You can track your order status in the Orders section.
          </p>
          <Button onClick={() => router.push('/customer/orders')}>
            View Order Status
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" />
          Your Cart
        </h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {items.length === 0 ? (
          <Card>
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button variant="outline" onClick={() => router.push('/menu')}>
                Browse Menu
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({getTotalItems()})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/menu')}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => clearCartItems()}
                  >
                    Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Your Name</Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={handlePlaceOrder}
                    disabled={items.length === 0}
                  >
                    Place Order <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}