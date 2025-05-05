'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePermission } from '@/hooks/usePermission';
import { useMenu } from '@/contexts/MenuContext';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { MenuItemForm } from '@/components/menu/MenuItemForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { PlusCircle } from 'lucide-react';
import { MenuItem } from '@/lib/types';

export default function AdminMenuPage() {
  const { user } = useAuth();
  const { checkPermission } = usePermission();
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const router = useRouter();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);
  
  const handleAddItem = (values: any) => {
    addMenuItem(values);
    setIsAddDialogOpen(false);
  };
  
  const handleEditItem = (values: any) => {
    if (selectedItem) {
      updateMenuItem(selectedItem.id, values);
      setIsEditDialogOpen(false);
      setSelectedItem(null);
    }
  };
  
  const handleDeleteItem = () => {
    if (selectedItem) {
      deleteMenuItem(selectedItem.id);
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };
  
  const openEditDialog = (item: MenuItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (id: string) => {
    const item = menuItems.find(item => item.id === id);
    if (item) {
      setSelectedItem(item);
      setIsDeleteDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Menu Item
          </Button>
        </div>
        
        <MenuGrid
          items={menuItems}
          categories={categories}
          onEditItem={openEditDialog}
          onDeleteItem={openDeleteDialog}
        />
        
        {/* Add Item Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
            </DialogHeader>
            <MenuItemForm
              categories={categories}
              onSubmit={handleAddItem}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Edit Item Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <MenuItemForm
                item={selectedItem}
                categories={categories}
                onSubmit={handleEditItem}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the menu item{' '}
                <span className="font-medium">
                  {selectedItem?.name}
                </span>
                . This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteItem}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}