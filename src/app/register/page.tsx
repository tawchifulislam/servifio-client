import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <AuthCard
      eyebrow="Get started"
      title="Create your account"
      subtitle="Book trusted local providers in a few clicks."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-secondary">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
