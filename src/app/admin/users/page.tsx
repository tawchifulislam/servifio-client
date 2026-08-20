'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Users } from 'lucide-react';
import { api } from '@/lib/api';
import { getErrorMessage } from '@/lib/get-error-message';
import type { AdminUser } from '@/lib/types';
import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const roleBadge: Record<AdminUser['role'], string> = {
  CUSTOMER: 'border-foreground/20 text-foreground/60',
  PROVIDER: 'border-accent/40 text-accent',
  ADMIN: 'border-secondary/40 text-secondary',
};

function AdminUsersContent() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await api.get<AdminUser[]>('/api/users');
      setUsers(data);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not load users'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const toggleStatus = async (id: string) => {
    try {
      await api.patch(`/api/users/${id}/status`, {});
      toast.success('User status updated');
      load();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update user'));
    }
  };

  return (
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Manage users
        </h1>
        <p className="mt-2 text-foreground/60">
          All registered customers and providers.
        </p>

        <div className="mt-8 space-y-3">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}

          {!loading && users.length === 0 && (
            <EmptyState icon={Users} title="No users found" />
          )}

          {!loading &&
            users.map(u => (
              <div
                key={u.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-foreground/3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{u.name}</h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${roleBadge[u.role]}`}
                    >
                      {u.role}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground/50">{u.email}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className={
                    u.isDeleted ? 'text-secondary' : 'text-destructive'
                  }
                  onClick={() => toggleStatus(u.id)}
                >
                  {u.isDeleted ? 'Reactivate' : 'Deactivate'}
                </Button>
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminUsersContent />
    </ProtectedRoute>
  );
}
