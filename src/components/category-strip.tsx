'use client';

import { motion } from 'framer-motion';
import {
  Wrench,
  BookOpen,
  Sparkles,
  Zap,
  Wind,
  PaintRoller,
  Truck,
} from 'lucide-react';

const categories = [
  { name: 'Plumbing', icon: Wrench, color: 'var(--accent)' },
  { name: 'Tutoring', icon: BookOpen, color: 'var(--secondary)' },
  { name: 'Cleaning', icon: Sparkles, color: 'var(--destructive)' },
  { name: 'Electrical', icon: Zap, color: 'var(--accent)' },
  { name: 'Appliance repair', icon: Wind, color: 'var(--secondary)' },
  { name: 'Painting', icon: PaintRoller, color: 'var(--destructive)' },
  { name: 'Moving help', icon: Truck, color: 'var(--accent)' },
];

export function CategoryStrip() {
  return (
    <div className="border-y border-border py-4 sm:py-5">
      <div className="mx-auto flex max-w-7xl gap-2.5 overflow-x-auto px-5 [-ms-overflow-style:none] scrollbar-none sm:gap-3 sm:px-6 lg:justify-center lg:px-8 [&::-webkit-scrollbar]:hidden">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ y: -3, borderColor: cat.color }}
            className="flex shrink-0 items-center gap-2 rounded-full border border-foreground/15 bg-foreground/3 px-3.5 py-2 text-[13.5px] font-medium text-foreground/80 transition-colors sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <cat.icon size={14} style={{ color: cat.color }} />
            {cat.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
