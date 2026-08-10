'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#browse', label: 'Browse services' },
  { href: '#how', label: 'How it works' },
  { href: '#provider', label: 'Become a provider' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold text-foreground sm:text-xl"
        >
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Servifio
        </Link>

        <div className="hidden gap-7 text-sm font-medium text-foreground/75 lg:flex lg:gap-9">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 sm:flex">
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

        {/* Mobile menu trigger - visible below lg */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground sm:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="dark w-[80vw] max-w-[320px] border-border bg-background text-foreground"
          >
            <SheetTitle className="px-5 pt-5 font-display text-lg font-bold">
              Servifio
            </SheetTitle>
            <div className="mt-6 flex flex-col gap-1 px-5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-3 border-t border-border" />
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-[15px] font-medium text-foreground/80"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: 'default' }),
                  'mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90',
                )}
              >
                Book a service
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
