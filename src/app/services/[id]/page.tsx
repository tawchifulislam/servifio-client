'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { getErrorMessage } from '@/lib/get-error-message';
import { getInitials } from '@/lib/get-initials';
import type { Service } from '@/lib/types';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BookingDialog } from '@/components/booking-dialog';
import { ServiceReviews } from '@/components/service-reviews';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function ServiceDetailsPage() {
  const params = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get<Service>(`/api/services/${params.id}`);
        setService(data);
      } catch (error) {
        toast.error(getErrorMessage(error, 'Could not load this service'));
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  return (
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
        {loading && <Skeleton className="h-64 w-full rounded-lg" />}

        {!loading && !service && (
          <p className="text-foreground/50">Service not found.</p>
        )}

        {!loading && service && (
          <>
            <div className="rounded-lg border border-border bg-foreground/3 p-7 sm:p-10">
              <span
                className="inline-block rounded-sm px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-background"
                style={{ background: 'var(--secondary)' }}
              >
                {service.category?.name ?? 'Service'}
              </span>
              <h1 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {service.title}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-accent-foreground">
                  {getInitials(service.provider?.name ?? 'Service Provider')}
                </div>
                {service.provider?.name}
              </div>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/70">
                {service.description}
              </p>

              <div className="my-7 border-t border-dashed border-foreground/15" />

              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <span className="font-display text-2xl font-bold text-foreground">
                  ৳{service.price}
                </span>
                <BookingDialog
                  serviceId={service.id}
                  serviceTitle={service.title}
                />
              </div>
            </div>

            <ServiceReviews serviceId={service.id} />
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}
