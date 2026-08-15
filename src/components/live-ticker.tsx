'use client';

import { motion } from 'framer-motion';
import { categoryStyles } from '@/lib/category-style';

const activity = [
  {
    name: 'Karim U.',
    action: 'booked a plumber',
    area: 'Mirpur',
    category: 'Plumbing',
  },
  {
    name: 'Rima A.',
    action: 'hired a cleaner',
    area: 'Dhanmondi',
    category: 'Cleaning',
  },
  {
    name: 'Mahfuz H.',
    action: 'started tutoring',
    area: 'Uttara',
    category: 'Tutoring',
  },
  {
    name: 'Sadia R.',
    action: 'booked an electrician',
    area: 'Banani',
    category: 'Electrical',
  },
  {
    name: 'Tanvir I.',
    action: 'hired a mover',
    area: 'Gulshan',
    category: 'Moving help',
  },
  {
    name: 'Nusrat J.',
    action: 'booked a painter',
    area: 'Bashundhara',
    category: 'Painting',
  },
];

export function LiveTicker() {
  const items = [...activity, ...activity];

  return (
    <div className="overflow-hidden border-y border-border bg-foreground/2 py-3.5">
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {items.map((entry, i) => {
          const style = categoryStyles[entry.category];
          return (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2 text-[13px] text-foreground/50"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: style?.color ?? 'var(--secondary)' }}
              />
              <span className="font-medium text-foreground/75">
                {entry.name}
              </span>
              {entry.action}
              <span className="text-foreground/35">·</span>
              <span>{entry.area}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
