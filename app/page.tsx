'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Utensils,
  ChefHat,
  ShoppingBag,
  Users,
  Star,
  MessageCircle,
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') router.push('/admin');
      else if (user.role === 'chef') router.push('/chef');
      else router.push('/customer');
    }
  }, [user, router]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  const faqs = [
    {
      q: 'Can I customize the menu items?',
      a: 'Absolutely! You can add, edit, or remove menu items anytime from the admin panel.',
    },
    {
      q: 'How do I track orders in real-time?',
      a: 'Orders flow directly into the kitchen dashboard with live status updates and timestamps.',
    },
    {
      q: 'Is there mobile support for staff?',
      a: 'Yes, our interface is fully responsive and optimized for tablets and smartphones.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-primary/10 overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-10 -left-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 right-0 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 py-16  space-y-24">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <motion.div variants={item}>
            <Utensils className="mx-auto h-20 w-20 text-primary" />
          </motion.div>
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Restaurant Management System
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground">
            A complete solution for managing your restaurant operations—from menu updates and order
            flow to customer care and analytics.
          </motion.p>
          <motion.div variants={item} className="flex justify-center gap-6">
            {!user ? (
              <>
                <Button
                  onClick={() => router.push('/login')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 shadow-lg transform hover:scale-105"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => router.push('/register')}
                  variant="outline"
                  size="lg"
                  className="px-8 hover:bg-primary/10 transform hover:scale-105"
                >
                  Learn More
                </Button>
              </>
            ) : (
              <Button
                onClick={() => router.push('/menu')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 shadow-lg transform hover:scale-105"
              >
                View Menu
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <section id="features">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <ChefHat className="h-6 w-6 text-primary" />, title: 'Kitchen Management', desc: 'Real-time order tracking, inventory alerts, and prep timers.' },
              { icon: <ShoppingBag className="h-6 w-6 text-primary" />, title: 'Order Processing', desc: 'Seamless order flow with status notifications for staff and customers.' },
              { icon: <Users className="h-6 w-6 text-primary" />, title: 'Customer Experience', desc: 'Digital menus, loyalty integrations, and feedback collection.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={item}
                className="group relative p-6 bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-md"></div>
                <div className="relative space-y-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{f.title}</h3>
                  <p className="text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="space-y-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { name: 'Sophia Lee', text: 'This system streamlined our kitchen workflow and doubled throughput in weeks!', rating: 5 },
              { name: 'Liam Smith', text: 'Orders never get lost, and customers love real-time status updates.', rating: 4 },
              { name: 'Aria Patel', text: 'Intuitive, fast, and reliable—exactly what our restaurant needed.', rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={item}
                className="p-6 bg-card rounded-2xl shadow-lg space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-secondary" />
                  <h4 className="font-semibold">{t.name}</h4>
                </div>
                <p className="text-muted-foreground">“{t.text}”</p>
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="space-y-6">
          <motion.h2 className="text-3xl font-bold text-center">Frequently Asked Questions</motion.h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-muted-foreground rounded-lg">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={faqOpen === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 overflow-hidden text-muted-foreground"
                >
                  <p className="pb-4">{f.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24 bg-primary text-white rounded-xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Restaurant?</h2>
          <p className="mb-6">Join hundreds of restaurants boosting efficiency and delighting customers every day.</p>
          <Button onClick={() => router.push('/register')} size="lg" className="bg-white text-black hover:bg-secondary/90">
            Get Started Now
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-background p-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Restaurant Management System. All rights reserved.
      </footer>
    </div>
  );
}
