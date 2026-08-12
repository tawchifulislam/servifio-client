import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  categoryId: z.string().min(1, 'Select a category'),
});

export type ServiceValues = z.infer<typeof serviceSchema>;
