'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const secondaryStats = [
  { value: '4.8', label: 'Average rating' },
  { value: '38', label: 'Neighbourhoods' },
  { value: '6 hrs', label: 'Avg. match time' },
];

export function TrustStats() {
  return (
    <div className="relative overflow-hidden border-t border-border py-16 sm:py-20">
      {/* decorative dotted map path - abstract, not a literal map */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M -50 130 Q 250 50, 500 140 T 1000 100 T 1300 160"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="1.5"
          strokeDasharray="2 8"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        {[80, 340, 620, 900, 1180].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={90 + (i % 2) * 50}
            r="4"
            fill="var(--secondary)"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Users className="h-7 w-7 text-secondary" strokeWidth={1.5} />
            <div className="mt-4 font-display text-[44px] font-bold leading-none text-foreground sm:text-[56px]">
              2,400+
            </div>
            <p className="mt-2 max-w-70 text-[15px] text-foreground/55">
              Jobs completed by providers your neighbours already trust.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {secondaryStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[12.5px] text-foreground/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
