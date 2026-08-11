import type { BookingStatus } from '@/lib/types';

const statusStyles: Record<BookingStatus, string> = {
  PENDING: 'bg-secondary/15 text-secondary border-secondary/30',
  ACCEPTED: 'bg-accent/15 text-accent border-accent/30',
  COMPLETED: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
  REJECTED: 'bg-destructive/15 text-destructive border-destructive/30',
  CANCELLED: 'bg-foreground/10 text-foreground/50 border-foreground/20',
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
