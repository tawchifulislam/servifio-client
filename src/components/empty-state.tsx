import { Ticket, type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = Ticket,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-foreground/15 bg-foreground/2 px-6 py-16 text-center">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-foreground/20">
        <Icon size={22} strokeWidth={1.5} className="text-foreground/35" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-[320px] text-[14px] leading-relaxed text-foreground/50">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
