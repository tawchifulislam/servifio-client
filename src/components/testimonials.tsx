'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const featured = {
  quote:
    'The provider showed up exactly when the ticket said. No back-and-forth calls, no guessing - just a name and a time I could count on.',
  name: 'Nusrat Jahan',
  role: 'Customer, Bashundhara',
};

const quotes = [
  {
    quote: 'Booked a tutor for my daughter in ten minutes flat.',
    name: 'Tanvir Islam',
    role: 'Uttara',
    rating: 5,
  },
  {
    quote: 'Left a review after the visit - felt like it actually mattered.',
    name: 'Sadia Rahman',
    role: 'Banani',
    rating: 5,
  },
  {
    quote: 'The ticket made it easy to know exactly who was coming.',
    name: 'Mahfuz Hasan',
    role: 'Provider, Uttara',
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Quote className="h-8 w-8 text-secondary/60" strokeWidth={1.5} />
          <p className="mt-5 font-display text-2xl font-medium leading-snug text-foreground sm:text-[28px] lg:text-3xl">
            {featured.quote}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-accent-foreground">
              {featured.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                {featured.name}
              </div>
              <div className="text-[13px] text-foreground/50">
                {featured.role}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
              className="rounded-lg border border-border bg-foreground/3 p-5"
            >
              <div className="flex gap-0.5 text-secondary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={11}
                    fill={j < q.rating ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-foreground/70">
                &ldquo;{q.quote}&rdquo;
              </p>
              <div className="mt-3 text-[12.5px] text-foreground/45">
                {q.name} · {q.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
