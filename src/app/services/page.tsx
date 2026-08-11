'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { api } from '@/lib/api';
import type { Service, Category } from '@/lib/types';
import { TicketCard } from '@/components/ticket-card';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [svc, cats] = await Promise.all([
          api.get<Service[]>('/api/services'),
          api.get<Category[]>('/api/categories'),
        ]);
        setServices(svc);
        setCategories(cats);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = services.filter(s => {
    const matchesCategory = !activeCategory || s.categoryId === activeCategory;
    const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Browse services
        </h1>
        <p className="mt-2 text-foreground/60">
          Find a vetted provider near you.
        </p>

        <div className="relative mt-8 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search services..."
            className="border-foreground/20 bg-foreground/5 pl-9 text-foreground placeholder:text-foreground/40"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              !activeCategory
                ? 'border-secondary bg-secondary/10 text-secondary'
                : 'border-foreground/15 text-foreground/70'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-foreground/15 text-foreground/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-70 w-full max-w-85 rounded-lg"
              />
            ))}

          {!loading && filtered.length === 0 && (
            <p className="col-span-full text-foreground/50">
              No services match your search.
            </p>
          )}

          {!loading &&
            filtered.map(service => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="flex justify-center sm:block"
              >
                <TicketCard
                  ticketNo={service.id.slice(0, 4).toUpperCase()}
                  category={service.category?.name ?? 'Service'}
                  categoryColor="var(--foreground)"
                  title={service.title}
                  providerName={service.provider?.name ?? 'Provider'}
                  providerInitials={(service.provider?.name ?? 'SR')
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                  meta={service.description}
                  price={`৳${service.price}`}
                  rotate={0}
                  className="max-w-none"
                />
              </Link>
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
