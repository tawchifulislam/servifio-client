import { z } from 'zod';

export const bookingSchema = z.object({
  scheduledDate: z.string().min(1, 'Pick a date and time'),
  note: z.string().optional(),
});

export type BookingValues = z.infer<typeof bookingSchema>;
