'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Utensils, ChefHat, ShoppingBag, Users } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'chef') {
        router.push('/chef');
      } else {
        router.push('/customer');
      }
    }
  }, [user, router]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl mx-auto text-center py-16"
        >
          <motion.div variants={item} className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 blur"></div>
              <Utensils className="h-20 w-20 text-primary relative" />
            </div>
          </motion.div>

          <motion.h1 
            variants={item}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
          >
            Restaurant Management System
          </motion.h1>

          <motion.p 
            variants={item}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            A complete solution for managing your restaurant operations,
            from menu management to order processing and customer service.
          </motion.p>

          <motion.div variants={item} className="flex gap-4 justify-center mb-20">
            {!user ? (
              <>
                <Button 
                  onClick={() => router.push('/login')} 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Get Started
                </Button>
                <Button 
                  onClick={() => router.push('/register')} 
                  variant="outline" 
                  size="lg"
                  className="px-8"
                >
                  Learn More
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => router.push('/menu')} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                View Menu
              </Button>
            )}
          </motion.div>

          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-card p-6 rounded-lg space-y-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <ChefHat className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Kitchen Management</h3>
                  <p className="text-muted-foreground">
                    Streamline your kitchen operations with real-time order tracking and inventory management.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-card p-6 rounded-lg space-y-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Order Processing</h3>
                  <p className="text-muted-foreground">
                    Efficient order management system with real-time updates and status tracking.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-card p-6 rounded-lg space-y-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Customer Experience</h3>
                  <p className="text-muted-foreground">
                    Enhanced customer experience with easy ordering and real-time status updates.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}