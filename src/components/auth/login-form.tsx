'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { loginSchema, type LoginValues } from '@/lib/validations/auth';
import { api, ApiClientError } from '@/lib/api';
import { authStore, type AuthData } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    try {
      const data = await api.post<AuthData>('/api/auth/login', values);
      authStore.save(data);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}`);
      router.push('/');
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Log in
        </Button>
      </form>
    </Form>
  );
}
