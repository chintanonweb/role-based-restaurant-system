'use client';

import { useAuth } from '@/contexts/AuthContext';
import { hasPermission } from '@/lib/utils';

export const usePermission = () => {
  const { user } = useAuth();

  const checkPermission = (action: string, resource: string): boolean => {
    return hasPermission(user, action, resource);
  };

  return { checkPermission };
};