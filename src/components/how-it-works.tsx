'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    no: '01',
    title: 'Describe the job',
    body: 'Tell us what needs doing, pick a category, and choose a time that works for you.',
  },
  {
    no: '02',
    title: 'Get matched & confirmed',
    body: 'A vetted provider from your area accepts the job. You get a ticket with their name and rating.',
  },
  {
    no: '03',
    title: 'They show up, you rate the visit',
    body: 'Pay after the work is done. Your review helps the next household on your street decide.',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary">
            How it works
          </div>
          <h2 className="font-display text-[28px] font-semibold leading-tight text-foreground sm:text-[34px] lg:text-[42px]">
            Three steps,
            <br />
            one visit.
          </h2>
        </div>
        <p className="max-w-70 text-[14.5px] text-foreground/55 sm:text-[15px] sm:text-right">
          No app download, no middleman calls - just a ticket you can track from
          request to receipt.
        </p>
      </div>

      <div className="relative">
        <svg
          className="pointer-events-none absolute left-0 top-6.5 hidden w-full lg:block"
          height="2"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="16.5%"
            y1="1"
            x2="83.5%"
            y2="1"
            stroke="var(--foreground)"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            strokeDasharray="5 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
          />
        </svg>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
              className={`rounded-lg border border-border bg-foreground/3 p-6 sm:p-7 ${
                i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative z-10 mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-secondary/50 bg-background font-display text-sm italic text-secondary">
                {step.no}
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground sm:text-xl">
                {step.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-foreground/55 sm:text-[14.5px]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
