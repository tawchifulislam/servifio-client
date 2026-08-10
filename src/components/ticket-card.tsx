'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  ticketNo: string;
  category: string;
  categoryColor: string;
  title: string;
  providerName: string;
  providerInitials: string;
  meta: string;
  price: string;
  rating?: number;
  stamped?: boolean;
  className?: string;
  rotate?: number;
}

export function TicketCard({
  ticketNo,
  category,
  categoryColor,
  title,
  providerName,
  providerInitials,
  meta,
  price,
  rating,
  stamped,
  className,
  rotate = 0,
}: TicketCardProps) {
  return (
    <motion.div
      style={{ rotate }}
      whileHover={{ rotate: 0, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={cn(
        'relative w-full max-w-85 rounded-lg border border-black/5 bg-card p-6 pb-5 text-card-foreground shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]',
        className,
      )}
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

      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
          TICKET NO. {ticketNo}
        </span>
        <span
          className="rounded-sm px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide"
          style={{ background: categoryColor, color: 'var(--card)' }}
        >
          {category}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-tight">
        {title}
      </h3>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
            {providerInitials}
          </div>
          <span>{providerName}</span>
        </div>

        {stamped && (
          <div className="flex shrink-0 rotate-[-8deg] items-center gap-1 rounded-full border-[1.5px] border-dashed border-destructive/70 px-2 py-1 text-destructive">
            <BadgeCheck size={12} strokeWidth={2} />
            <span className="text-[9.5px] font-bold tracking-wide">
              CONFIRMED
            </span>
          </div>
        )}
      </div>

      <div className="my-4 border-t border-dashed border-foreground/15" />

      <div className="text-sm text-muted-foreground">{meta}</div>

      <div className="my-4 border-t border-dashed border-foreground/15" />

      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-bold">{price}</span>
        {rating && (
          <div className="flex items-center gap-0.5 text-secondary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < rating ? 'currentColor' : 'none'}
                strokeWidth={1.5}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
