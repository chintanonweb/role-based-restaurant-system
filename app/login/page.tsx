'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
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

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}