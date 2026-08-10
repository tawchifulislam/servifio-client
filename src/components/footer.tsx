import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 text-[13px] text-foreground/45 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base font-bold text-foreground/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          Servifio
        </Link>
        <div>Local service marketplace · Dhaka</div>
      </div>
    </footer>
  );
}
