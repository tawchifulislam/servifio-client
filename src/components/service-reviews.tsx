'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { api } from '@/lib/api';
import type { Review } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function ServiceReviews({ serviceId }: { serviceId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get<Review[]>(
          `/api/reviews/service/${serviceId}`,
        );
        setReviews(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="mt-8 space-y-3">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return <p className="mt-8 text-sm text-foreground/45">No reviews yet.</p>;
  }

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Reviews
        </h2>
        <span className="flex items-center gap-1 text-sm text-secondary">
          <Star size={13} fill="currentColor" strokeWidth={0} />
          {avg.toFixed(1)} · {reviews.length} review
          {reviews.length !== 1 && 's'}
        </span>
      </div>
      <div className="space-y-3">
        {reviews.map(review => (
          <div
            key={review.id}
            className="rounded-lg border border-border bg-foreground/3 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                {review.customer?.name ?? 'Customer'}
              </span>
              <div className="flex gap-0.5 text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < review.rating ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>
            {review.comment && (
              <p className="mt-2 text-sm text-foreground/65">
                {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
