'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="dark flex min-h-screen flex-col bg-background px-5 py-10 sm:px-6">
      <Link
        href="/"
        className="mx-auto mb-10 flex items-center gap-2 font-display text-xl font-bold text-foreground sm:mb-14"
      >
        <span className="h-2 w-2 rounded-full bg-secondary" />
        Servifio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-105 rounded-lg border border-black/5 bg-card p-7 text-card-foreground shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)] sm:p-9"
      >
        <div
          className="absolute -top-1.5 left-0 right-0 h-3"
          style={{
            background:
              'radial-gradient(circle 5px at 0 100%, transparent 5px, var(--card) 5.5px) 0 100% / 20px 100% repeat-x',
          }}
        />
        <div
          className="absolute -bottom-1.5 left-0 right-0 h-3"
          style={{
            background:
              'radial-gradient(circle 5px at 0 0%, transparent 5px, var(--card) 5.5px) 0 0 / 20px 100% repeat-x',
          }}
        />

        <div className="mb-1 text-xs font-bold uppercase tracking-widest text-secondary">
          {eyebrow}
        </div>
        <h1 className="font-display text-2xl font-semibold leading-tight sm:text-[28px]">
          {title}
        </h1>
        <p className="mt-2 text-[14.5px] text-muted-foreground">{subtitle}</p>

        <div className="my-6 border-t border-dashed border-foreground/15" />

        {children}
      </motion.div>

      <div className="mx-auto mt-6 text-sm text-foreground/55">{footer}</div>
    </div>
  );
}
