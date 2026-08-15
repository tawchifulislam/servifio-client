import Link from 'next/link';
import { Ticket, ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-secondary/40">
        <Ticket size={30} strokeWidth={1.5} className="text-secondary" />
      </div>

      <div className="mt-7 font-display text-sm font-bold uppercase tracking-widest text-secondary">
        Ticket No. 404
      </div>
      <h1 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
        This ticket doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-95 text-[15px] leading-relaxed text-foreground/55">
        The page you&apos;re looking for was never booked - or it&apos;s been
        torn off. Let&apos;s get you back on record.
      </p>

      <Link
        href="/"
        className={cn(
          buttonVariants({ size: 'lg' }),
          'mt-8 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90',
        )}
      >
        <ArrowLeft size={16} />
        Back to Servifio
      </Link>
    </div>
  );
}
