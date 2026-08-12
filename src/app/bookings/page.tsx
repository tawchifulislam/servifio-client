'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { api, ApiClientError } from '@/lib/api';
import { authStore } from '@/lib/auth-store';
import { useAuth } from '@/lib/use-auth';
import type { Booking, BookingStatus } from '@/lib/types';
import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BookingStatusBadge } from '@/components/booking-status-badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ReviewDialog } from '@/components/review-dialog';

const nextActions: Record<
  BookingStatus,
  { label: string; value: BookingStatus }[]
> = {
  PENDING: [
    { label: 'Accept', value: 'ACCEPTED' },
    { label: 'Reject', value: 'REJECTED' },
  ],
  ACCEPTED: [{ label: 'Mark completed', value: 'COMPLETED' }],
  REJECTED: [],
  COMPLETED: [],
  CANCELLED: [],
};

function BookingsContent() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const token = authStore.getToken();
    if (!token) return;
    try {
      const data = await api.get<Booking[]>('/api/bookings/my-bookings', token);
      setBookings(data);
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : 'Could not load bookings';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      await load();
    };

    void fetchBookings();
  }, [load]);

  const updateStatus = async (id: string, status: BookingStatus) => {
    const token = authStore.getToken();
    if (!token) return;
    try {
      await api.patch(`/api/bookings/${id}/status`, { status }, token);
      toast.success(`Booking marked ${status.toLowerCase()}`);
      load();
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : 'Could not update booking';
      toast.error(message);
    }
  };

  return (
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          {user?.role === 'PROVIDER' ? 'Incoming bookings' : 'My bookings'}
        </h1>
        <p className="mt-2 text-foreground/60">
          {user?.role === 'PROVIDER'
            ? 'Requests coming in for your services.'
            : "Track every ticket you've opened."}
        </p>

        <div className="mt-8 space-y-4">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}

          {!loading && bookings.length === 0 && (
            <p className="text-foreground/50">No bookings yet.</p>
          )}

          {!loading &&
            bookings.map(booking => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-lg border border-border bg-foreground/3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {booking.service?.title ?? 'Service'}
                    </h3>
                    <BookingStatusBadge status={booking.status} />
                  </div>
                  <p className="mt-1 text-sm text-foreground/55">
                    {new Date(booking.scheduledDate).toLocaleString()}
                    {user?.role === 'PROVIDER' &&
                      booking.customer &&
                      ` · ${booking.customer.name}`}
                  </p>
                  {booking.note && (
                    <p className="mt-1 text-sm text-foreground/45">
                      {booking.note}
                    </p>
                  )}
                </div>

                {user?.role === 'PROVIDER' &&
                  nextActions[booking.status].length > 0 && (
                    <div className="flex shrink-0 gap-2">
                      {nextActions[booking.status].map(action => (
                        <Button
                          key={action.value}
                          size="sm"
                          variant={
                            action.value === 'REJECTED' ? 'outline' : 'default'
                          }
                          onClick={() => updateStatus(booking.id, action.value)}
                          className={
                            action.value !== 'REJECTED'
                              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                              : ''
                          }
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}

                {user?.role === 'CUSTOMER' &&
                  booking.status === 'COMPLETED' && (
                    <div className="shrink-0">
                      <ReviewDialog
                        bookingId={booking.id}
                        serviceTitle={booking.service?.title ?? 'this service'}
                      />
                    </div>
                  )}
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <BookingsContent />
    </ProtectedRoute>
  );
}
