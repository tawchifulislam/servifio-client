'use client';

import { motion } from 'framer-motion';
import { categoryStyles } from '@/lib/category-style';

export function CategoryStrip() {
  const categories = Object.entries(categoryStyles);

  return (
    <div className="border-y border-border py-4 sm:py-5">
      <div className="mx-auto flex max-w-7xl gap-2.5 overflow-x-auto px-5 [-ms-overflow-style:none] scrollbar-none sm:gap-3 sm:px-6 lg:justify-center lg:px-8 [&::-webkit-scrollbar]:hidden">
        {categories.map(([name, style], i) => (
          <motion.button
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ y: -3, borderColor: style.color }}
            className="flex shrink-0 items-center gap-2 rounded-full border border-foreground/15 bg-foreground/3 px-3.5 py-2 text-[13.5px] font-medium text-foreground/80 transition-colors sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <style.icon size={14} style={{ color: style.color }} />
            {name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
