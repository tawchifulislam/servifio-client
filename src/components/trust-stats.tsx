'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '2,400+', label: 'Jobs completed' },
  { value: '4.8', label: 'Average rating' },
  { value: '38', label: 'Neighbourhoods covered' },
  { value: '6 hrs', label: 'Average match time' },
];

export function TrustStats() {
  return (
    <div className="border-t border-border py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-6 lg:flex lg:justify-between lg:px-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center lg:flex-1"
          >
            <div className="font-display text-[34px] font-bold text-secondary sm:text-[42px]">
              {stat.value}
            </div>
            <div className="mt-1.5 text-[13px] text-foreground/55 sm:text-[13.5px]">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
