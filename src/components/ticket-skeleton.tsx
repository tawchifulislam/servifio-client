export function TicketSkeleton() {
  return (
    <div className="relative flex w-full max-w-105 animate-pulse overflow-hidden rounded-xl border border-black/5 bg-card">
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 rounded-sm bg-foreground/10" />
          <div className="h-3 w-10 rounded-sm bg-foreground/10" />
        </div>
        <div className="mt-4 h-5 w-3/4 rounded-sm bg-foreground/10" />
        <div className="mt-5 flex items-center justify-between">
          <div className="h-8 w-16 rounded-sm bg-foreground/10" />
          <div className="h-px flex-1 mx-2 border-t border-dashed border-foreground/10" />
          <div className="h-8 w-16 rounded-sm bg-foreground/10" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-3">
          <div className="h-8 rounded-sm bg-foreground/10" />
          <div className="h-8 rounded-sm bg-foreground/10" />
          <div className="h-8 rounded-sm bg-foreground/10" />
        </div>
      </div>
      <div className="w-px border-l border-dashed border-foreground/15" />
      <div className="flex w-23 shrink-0 flex-col items-center justify-center gap-3 p-3">
        <div className="h-14 w-8 rounded-sm bg-foreground/10" />
      </div>
    </div>
  );
}
