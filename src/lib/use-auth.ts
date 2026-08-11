'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authStore, type User } from '@/lib/auth-store';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => authStore.getUser());
  const [ready] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    authStore.clear();
    setUser(null);
    router.push('/');
  }, [router]);

  return { user, ready, logout, isAuthenticated: !!user };
}
