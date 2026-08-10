'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TicketCard } from '@/components/ticket-card';

const services = [
  {
    ticketNo: '0512',
    category: 'Plumbing',
    categoryColor: 'var(--accent)',
    title: 'Kitchen sink & leak repair',
    providerName: 'Karim Uddin',
    providerInitials: 'KU',
    meta: 'Mirpur · Same-day available',
    price: '৳500',
    rating: 5,
  },
  {
    ticketNo: '0498',
    category: 'Cleaning',
    categoryColor: 'var(--destructive)',
    title: 'Full apartment deep clean',
    providerName: 'Rima Akter',
    providerInitials: 'RA',
    meta: 'Dhanmondi · 3-hour service',
    price: '৳1,200',
    rating: 4,
  },
  {
    ticketNo: '0447',
    category: 'Tutoring',
    categoryColor: 'var(--secondary)',
    title: 'SSC Physics & Chemistry',
    providerName: 'Mahfuz Hasan',
    providerInitials: 'MH',
    meta: 'Uttara · Home visits',
    price: '৳800/mo',
    rating: 5,
  },
];

export function FeaturedServices() {
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
          A sample of active listings — browse the full board once you&apos;re
          logged in.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.ticketNo}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className="flex justify-center sm:block"
          >
            <TicketCard {...service} rotate={0} className="max-w-none" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 flex justify-center sm:mt-12"
      >
        <button className="group flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground">
          View all open tickets
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </motion.div>
    </section>
  );
}
