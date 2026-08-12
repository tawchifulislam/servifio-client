'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Pencil } from 'lucide-react';
import {
  categorySchema,
  type CategoryValues,
} from '@/lib/validations/category';
import { api, ApiClientError } from '@/lib/api';
import { authStore } from '@/lib/auth-store';
import type { Category } from '@/lib/types';
import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
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

function CategoryForm({
  initial,
  onDone,
}: {
  initial?: Category;
  onDone: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initial?.name ?? '',
      description: initial?.description ?? '',
      icon: initial?.icon ?? '',
    },
  });

  const onSubmit = async (values: CategoryValues) => {
    setLoading(true);
    try {
      const token = authStore.getToken() ?? undefined;
      if (initial) {
        await api.patch(`/api/categories/${initial.id}`, values, token);
        toast.success('Category updated');
      } else {
        await api.post('/api/categories', values, token);
        toast.success('Category created');
      }
      onDone();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Plumbing" {...field} />
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
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Pipe fitting, leak repair..." {...field} />
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
          {initial ? 'Save changes' : 'Create category'}
        </Button>
      </form>
    </Form>
  );
}

function AdminCategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await api.get<Category[]>('/api/categories');
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    const token = authStore.getToken() ?? undefined;
    try {
      await api.delete(`/api/categories/${id}`, token);
      toast.success('Category deleted');
      load();
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : 'Could not delete category';
      toast.error(message);
    }
  };

  return (
    <div className="dark min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Manage categories
            </h1>
            <p className="mt-2 text-foreground/60">
              Add, edit, or remove service categories.
            </p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger className="inline-flex h-10 items-center gap-1.5 rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              <Plus size={15} />
              New category
            </DialogTrigger>
            <DialogContent className="dark border-border bg-card text-card-foreground">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  New category
                </DialogTitle>
              </DialogHeader>
              <CategoryForm
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
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}

          {!loading && categories.length === 0 && (
            <p className="text-foreground/50">No categories yet.</p>
          )}

          {!loading &&
            categories.map(cat => (
              <div
                key={cat.id}
                className="flex items-center justify-between rounded-lg border border-border bg-foreground/3 p-4"
              >
                <div>
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  {cat.description && (
                    <p className="mt-0.5 text-sm text-foreground/50">
                      {cat.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(cat)}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() => handleDelete(cat.id)}
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
                Edit category
              </DialogTitle>
            </DialogHeader>
            {editing && (
              <CategoryForm
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

export default function AdminCategoriesPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminCategoriesContent />
    </ProtectedRoute>
  );
}
