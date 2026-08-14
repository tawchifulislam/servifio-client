'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import type { Service } from '@/lib/types';
import { getCategoryStyle } from '@/lib/category-style';
import { TicketCarousel } from '@/components/ticket-carousel';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get<Service[]>('/api/services');
        setServices(data.slice(0, 6));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const tickets = services.map(service => ({
    ticketNo: service.id.slice(0, 4).toUpperCase(),
    category: service.category?.name ?? 'Service',
    categoryColor: getCategoryStyle(service.category?.name).color,
    icon: getCategoryStyle(service.category?.name).icon,
    title: service.title,
    providerName: service.provider?.name ?? 'Provider',
    area: 'Nearby',
    date: 'Available',
    time: 'On request',
    price: `৳${service.price}`,
  }));

  return (
    <section
      id="browse"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary">
            Featured today
          </div>
          <h2 className="font-display text-[28px] font-semibold leading-tight text-foreground sm:text-[34px] lg:text-[42px]">
            Open tickets
            <br />
            near you.
          </h2>
        </div>
        <p className="max-w-70 text-[14.5px] text-foreground/55 sm:text-[15px] sm:text-right">
          Swipe through active listings — browse the full board once you&apos;re
          logged in.
        </p>
      </div>

      {loading && (
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-60 w-full max-w-105 shrink-0 rounded-xl"
            />
          ))}
        </div>
      )}

      {!loading && services.length === 0 && (
        <p className="text-foreground/50">
          No open tickets right now — check back soon.
        </p>
      )}

      {!loading && services.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <TicketCarousel tickets={tickets} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 flex justify-center sm:mt-12"
      >
        <Link href="/services"
          className="group flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
        >
          View all open tickets
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </section>
  );
}
