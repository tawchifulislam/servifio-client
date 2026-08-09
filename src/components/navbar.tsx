'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dark sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-foreground"
        >
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Servifio
        </Link>

        <div className="hidden gap-9 text-sm font-medium text-foreground/75 md:flex">
          <Link
            href="#browse"
            className="hover:text-foreground transition-colors"
          >
            Browse services
          </Link>
          <Link href="#how" className="hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link
            href="#provider"
            className="hover:text-foreground transition-colors"
          >
            Become a provider
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-foreground/85"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'bg-secondary text-secondary-foreground hover:bg-secondary/90',
            )}
          >
            Book a service
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
