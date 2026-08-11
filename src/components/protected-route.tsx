'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/use-auth';
import type { User } from '@/lib/auth-store';

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: User['role'][];
}) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push('/');
    }
  }, [ready, user, allowedRoles, router]);

  const blocked =
    !ready || !user || (allowedRoles && !allowedRoles.includes(user.role));

  if (blocked) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}
