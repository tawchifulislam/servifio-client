'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CtaBanner() {
  return (
    <section
      id="provider"
      className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-start justify-between gap-8 rounded-xl bg-card p-8 text-card-foreground sm:p-11 lg:flex-row lg:items-center lg:gap-10 lg:p-16"
      >
        <h2 className="max-w-120 font-display text-[26px] font-semibold leading-tight sm:text-[32px] lg:text-[38px]">
          Know a trade? Start filling tickets, not just time.
        </h2>
        <Link
          href="/register?role=provider"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'group shrink-0 gap-2 bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          Become a provider
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </section>
  );
}
