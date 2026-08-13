'use client';

import { motion, type Variants } from 'framer-motion';
import { Search, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TicketCard } from '@/components/ticket-card';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:px-8 lg:pt-24">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div
          variants={item}
          className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-semibold text-secondary sm:text-sm"
        >
          <span className="h-px w-5 bg-secondary" />
          <span className="uppercase tracking-widest">
            Dhaka-wide network
          </span>
          <span className="font-normal text-foreground/50">
            - on record, every visit
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[36px] font-semibold leading-[1.05] text-foreground xs:text-[40px] sm:text-[48px] md:text-[54px] lg:text-[64px]"
        >
          Someone&apos;s
          <br />
          coming. Not
          <br />
          <span className="italic text-secondary">just anyone.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-110 text-[15.5px] leading-relaxed text-foreground/70 sm:mt-6 sm:text-[17px]"
        >
          Book plumbers, tutors, and cleaners from your own neighbourhood. Every
          visit comes with a name, a rating, and a ticket you can point to if
          something&apos;s wrong.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex max-w-115 flex-col gap-2.5 sm:mt-8 sm:flex-row"
        >
          <Input
            placeholder="What needs doing today?"
            className="h-12 border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40"
          />
          <Button
            size="lg"
            className="h-12 shrink-0 bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90"
          >
            <Search className="mr-1.5 h-4 w-4" />
            Find someone
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-5 text-[13px] text-foreground/45 sm:text-[13.5px]"
        >
          Trusted by 2,400+ households across 38 neighbourhoods
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: 8 }}
        animate={{ opacity: 1, scale: 1, rotate: 3.5 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        className="relative flex justify-center py-4 md:py-6"
      >
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-65 w-65 rounded-full bg-secondary/25 blur-[90px]" />
        </div>
        <TicketCard
          ticketNo="0417"
          category="Plumbing"
          categoryColor="var(--foreground)"
          icon={Wrench}
          title="Emergency pipe repair"
          providerName="Karim Uddin"
          area="Mirpur"
          date="Sat, 15 Aug"
          time="10:00 AM"
          price="৳500"
          rating={5}
        />
      </motion.div>
    </section>
  );
}
