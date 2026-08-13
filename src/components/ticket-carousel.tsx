'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { TicketCard } from '@/components/ticket-card';

interface CarouselTicket {
  ticketNo: string;
  category: string;
  categoryColor: string;
  icon: LucideIcon;
  title: string;
  providerName: string;
  area: string;
  date: string;
  time: string;
  price: string;
  rating?: number;
}

export function TicketCarousel({ tickets }: { tickets: CarouselTicket[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -360 : 360,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {tickets.map(t => (
          <div key={t.ticketNo} className="shrink-0 snap-center">
            <TicketCard {...t} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('left')}
        className="absolute -left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-lg sm:flex"
        aria-label="Previous ticket"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-lg sm:flex"
        aria-label="Next ticket"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
