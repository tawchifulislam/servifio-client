'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Plus, Pencil, Trash2, Wrench } from 'lucide-react';
import { serviceSchema, type ServiceValues } from '@/lib/validations/service';
import { api } from '@/lib/api';
import { getErrorMessage } from '@/lib/get-error-message';
import { authStore } from '@/lib/auth-store';
import type { Service, Category } from '@/lib/types';
import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

function ServiceForm({
  categories,
  initial,
  onDone,
}: {
  categories: Category[];
  initial?: Service;
  onDone: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<ServiceValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      price: initial?.price ?? 0,
      categoryId: initial?.categoryId ?? '',
    },
  });

  const onSubmit = async (values: ServiceValues) => {
    setLoading(true);
    try {
      if (initial) {
        await api.patch(`/api/services/${initial.id}`, values);
        toast.success('Service updated');
      } else {
        await api.post('/api/services', values);
        toast.success('Service created');
      }
      onDone();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Emergency pipe repair" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="What does this service include?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (৳)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark border-border bg-card text-card-foreground">
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          {initial ? 'Save changes' : 'Create service'}
        </Button>
      </form>
    </Form>
  );
}

function ProviderServicesContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  const load = useCallback(async () => {
    try {
      const [allServices, cats] = await Promise.all([
        api.get<Service[]>('/api/services'),
        api.get<Category[]>('/api/categories'),
      ]);
      const userId = authStore.getUser()?.id;
      setServices(allServices.filter(s => s.providerId === userId));
      setCategories(cats);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not load services'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/services/${id}`);
      toast.success('Service removed');
      load();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not remove service'));
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      await api.patch(`/api/services/${service.id}`, {
        status: service.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      });
      toast.success('Status updated');
      load();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update status'));
    }
  };

  return (
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              My services
            </h1>
            <p className="mt-2 text-foreground/60">
              Manage what you offer on Servifio.
            </p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              <Plus size={15} />
              New service
            </DialogTrigger>
            <DialogContent className="dark border-border bg-card text-card-foreground">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  New service
                </DialogTitle>
              </DialogHeader>
              <ServiceForm
                categories={categories}
                onDone={() => {
                  setCreateOpen(false);
                  load();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8 space-y-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}

          {!loading && services.length === 0 && (
            <EmptyState
              icon={Wrench}
              title="You haven't listed any services yet"
              description="Create your first service to start receiving bookings."
            />
          )}

          {!loading &&
            services.map(service => (
              <div
                key={service.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-foreground/3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${
                        service.status === 'ACTIVE'
                          ? 'border-secondary/40 text-secondary'
                          : 'border-foreground/20 text-foreground/40'
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/55">
                    ৳{service.price}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(service)}
                  >
                    {service.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(service)}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            ))}
        </div>

        <Dialog open={!!editing} onOpenChange={v => !v && setEditing(null)}>
          <DialogContent className="dark border-border bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                Edit service
              </DialogTitle>
            </DialogHeader>
            {editing && (
              <ServiceForm
                categories={categories}
                initial={editing}
                onDone={() => {
                  setEditing(null);
                  load();
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </section>
      <Footer />
    </div>
  );
}

export default function ProviderServicesPage() {
  return (
    <ProtectedRoute allowedRoles={['PROVIDER']}>
      <ProviderServicesContent />
    </ProtectedRoute>
  );
}
