'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Star, Loader2 } from 'lucide-react';
import { reviewSchema, type ReviewValues } from '@/lib/validations/review';
import { api, ApiClientError } from '@/lib/api';
import { authStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function ReviewDialog({
  bookingId,
  serviceTitle,
  onSubmitted,
}: {
  bookingId: string;
  serviceTitle: string;
  onSubmitted?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
  });

  const rating = useWatch({ control: form.control, name: 'rating' });

  const onSubmit = async (values: ReviewValues) => {
    setLoading(true);
    try {
      const token = authStore.getToken() ?? undefined;
      await api.post(
        '/api/reviews',
        {
          bookingId,
          rating: values.rating,
          comment: values.comment || undefined,
        },
        token,
      );
      toast.success('Review submitted — thanks for the feedback');
      setOpen(false);
      form.reset();
      onSubmitted?.();
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-secondary/50 px-4 text-sm font-semibold text-secondary transition-colors hover:bg-secondary/10">
        Leave a review
      </DialogTrigger>
      <DialogContent className="dark border-border bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Rate: {serviceTitle}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() =>
                          form.setValue('rating', n, { shouldValidate: true })
                        }
                        className="text-secondary"
                      >
                        <Star
                          size={26}
                          fill={
                            n <= (hoverRating || rating)
                              ? 'currentColor'
                              : 'none'
                          }
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="How was the service?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit review
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
