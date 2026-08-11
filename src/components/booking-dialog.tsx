'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { bookingSchema, type BookingValues } from '@/lib/validations/booking';
import { api, ApiClientError } from '@/lib/api';
import { authStore } from '@/lib/auth-store';
import { useAuth } from '@/lib/use-auth';
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

export function BookingDialog({
  serviceId,
  serviceTitle,
}: {
  serviceId: string;
  serviceTitle: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { scheduledDate: '', note: '' },
  });

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      router.push('/login');
      return;
    }
    if (user.role !== 'CUSTOMER') {
      e.preventDefault();
      toast.error('Only customer accounts can book services');
    }
  };

  const onSubmit = async (values: BookingValues) => {
    setLoading(true);
    try {
      const token = authStore.getToken() ?? undefined;
      await api.post(
        '/api/bookings',
        {
          serviceId,
          scheduledDate: new Date(values.scheduledDate).toISOString(),
          note: values.note || undefined,
        },
        token,
      );
      toast.success('Booking requested — track it from My Bookings');
      setOpen(false);
      form.reset();
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
      <DialogTrigger
        onClick={handleTriggerClick}
        className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
      >
        Book this service
      </DialogTrigger>
      <DialogContent className="dark border-border bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Book: {serviceTitle}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred date & time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Anything the provider should know"
                      {...field}
                    />
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
              Confirm request
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
