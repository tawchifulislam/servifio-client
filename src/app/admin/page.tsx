'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tag, Wrench, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import type { Category, Service } from '@/lib/types';
import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';

function AdminHomeContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [cats, svc] = await Promise.all([
          api.get<Category[]>('/api/categories'),
          api.get<Service[]>('/api/services'),
        ]);
        setCategories(cats);
        setServices(svc);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Admin panel
        </h1>
        <p className="mt-2 text-foreground/60">
          Platform overview and management tools.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {loading ? (
            <>
              <Skeleton className="h-28 w-full rounded-lg" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </>
          ) : (
            <>
              <div className="rounded-lg border border-border bg-foreground/3 p-6">
                <Tag className="text-secondary" size={20} />
                <div className="mt-3 font-display text-3xl font-bold text-foreground">
                  {categories.length}
                </div>
                <div className="text-sm text-foreground/55">Categories</div>
              </div>
              <div className="rounded-lg border border-border bg-foreground/3 p-6">
                <Wrench className="text-accent" size={20} />
                <div className="mt-3 font-display text-3xl font-bold text-foreground">
                  {services.length}
                </div>
                <div className="text-sm text-foreground/55">
                  Active services
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 space-y-3">
          <Link
            href="/admin/categories"
            className="flex items-center justify-between rounded-lg border border-border bg-foreground/3 p-5 transition-colors hover:border-secondary/40"
          >
            <div>
              <h3 className="font-semibold text-foreground">
                Manage categories
              </h3>
              <p className="mt-0.5 text-sm text-foreground/50">
                Add, edit, or remove service categories.
              </p>
            </div>
            <ArrowRight size={16} className="text-foreground/40" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function AdminHomePage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminHomeContent />
    </ProtectedRoute>
  );
}
