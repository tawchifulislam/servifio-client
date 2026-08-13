"use client";

import { motion } from "framer-motion";
import { type LucideIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketCardProps {
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
  className?: string;
}

export function TicketCard({
  ticketNo,
  category,
  categoryColor,
  icon: Icon,
  title,
  providerName,
  area,
  date,
  time,
  price,
  rating,
  className,
}: TicketCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "relative flex w-full max-w-105 overflow-hidden rounded-xl border border-black/5 bg-card text-card-foreground shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* main panel */}
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between">
          <span
            className="rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wide"
            style={{ background: categoryColor, color: "var(--card)" }}
          >
            {category}
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-muted-foreground">
            NO. {ticketNo}
          </span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold leading-tight">
          {title}
        </h3>

        {/* route visualization — the "someone's coming" metaphor */}
        <div className="relative mt-5 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Provider
            </span>
            <span className="font-display text-sm font-bold">{providerName}</span>
          </div>
          <div className="relative mx-2 h-px flex-1 border-t border-dashed border-foreground/25">
            <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card">
              <Icon size={13} className="text-secondary" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              You
            </span>
            <span className="font-display text-sm font-bold">{area}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-3">
          <div>
            <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
              Date
            </div>
            <div className="text-[13px] font-semibold">{date}</div>
          </div>
          <div>
            <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
              Time
            </div>
            <div className="text-[13px] font-semibold">{time}</div>
          </div>
          <div>
            <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
              Price
            </div>
            <div className="text-[13px] font-semibold">{price}</div>
          </div>
        </div>
      </div>

      {/* perforation with punch-hole notches */}
      <div className="relative w-px border-l border-dashed border-foreground/20">
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-background" />
        <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-background" />
      </div>

      {/* tear-off stub */}
      <div className="flex w-23 shrink-0 flex-col items-center justify-between gap-3 p-3">
        {rating ? (
          <div className="flex items-center gap-0.5 text-secondary">
            <Star size={11} fill="currentColor" strokeWidth={0} />
            <span className="text-[11px] font-bold">{rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
            Ticket
          </span>
        )}

        <div
          className="h-14 w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--foreground) 0px, var(--foreground) 1.5px, transparent 1.5px, transparent 3px)",
            opacity: 0.55,
          }}
        />
        <span className="font-mono text-[8.5px] tracking-wide text-muted-foreground">
          #{ticketNo}
        </span>
      </div>
    </motion.div>
  );
}