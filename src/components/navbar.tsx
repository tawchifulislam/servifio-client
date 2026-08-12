'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, LogOut, LayoutDashboard, Wrench } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/use-auth';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/services', label: 'Browse services' },
  { href: '/#how', label: 'How it works' },
  { href: '/#provider', label: 'Become a provider' },
];

const roleHome: Record<string, string> = {
  CUSTOMER: '/bookings',
  PROVIDER: '/bookings',
  ADMIN: '/admin',
};

const roleLabel: Record<string, string> = {
  CUSTOMER: 'My bookings',
  PROVIDER: 'Incoming bookings',
  ADMIN: 'Admin panel',
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, ready, logout } = useAuth();
  const router = useRouter();

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
          {ready && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-accent-foreground">
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="dark w-56 border-border bg-card text-card-foreground"
              >
                <div className="px-2 py-1.5">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push(roleHome[user.role] ?? '/')}
                >
                  <LayoutDashboard size={14} />
                  {roleLabel[user.role]}
                </DropdownMenuItem>
                {user.role === 'PROVIDER' && (
                  <DropdownMenuItem
                    className="gap-2"
                    onClick={() => router.push('/provider/services')}
                  >
                    <Wrench size={14} />
                    My services
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 text-destructive"
                  onClick={logout}
                >
                  <LogOut size={14} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </div>

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
                  className="rounded-md px-2 py-3 text-[15px] font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-3 border-t border-border" />
              {ready && user ? (
                <>
                  <button
                    onClick={() => {
                      router.push(roleHome[user.role] ?? '/');
                      setOpen(false);
                    }}
                    className="rounded-md px-2 py-3 text-left text-[15px] font-medium text-foreground/80"
                  >
                    {roleLabel[user.role]}
                  </button>
                  {user.role === 'PROVIDER' && (
                    <button
                      onClick={() => {
                        router.push('/provider/services');
                        setOpen(false);
                      }}
                      className="rounded-md px-2 py-3 text-left text-[15px] font-medium text-foreground/80"
                    >
                      My services
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="rounded-md px-2 py-3 text-left text-[15px] font-medium text-destructive"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
