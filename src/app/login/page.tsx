import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Log in to Servifio"
      subtitle="Pick up where you left off."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-secondary">
            Create one
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
