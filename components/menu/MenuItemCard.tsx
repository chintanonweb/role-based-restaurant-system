'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { usePermission } from '@/hooks/usePermission';
import { Edit, Trash2 } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit?: (item: MenuItem) => void;
  onDelete?: (id: string) => void;
}

export function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const { checkPermission } = usePermission();
  const canEditMenu = checkPermission('update', 'menu_item');
  
  const handleAddToCart = () => {
    addToCart(item, 1);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-transform duration-200 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Unavailable</span>
          </div>
        )}
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
          <span className="font-semibold text-primary">{formatCurrency(item.price)}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
        <div className="mt-2">
          <span className="text-xs inline-block bg-secondary px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        {canEditMenu && onEdit && onDelete ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit(item)}
            >
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive hover:text-destructive"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="w-full"
            disabled={!item.available}
            onClick={handleAddToCart}
          >
            {item.available ? 'Add to Cart' : 'Unavailable'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}