'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

import { AuthLayout } from '@/components/auth';
import { Logo } from '@/components/shared';
import { Button, Input } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Login berhasil!');
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout decorativePosition="right">
      <Logo size="lg" className="mb-8" />

      <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
        Selamat Datang Kembali
      </h1>
      <p className="text-text-secondary mb-8">
        Masuk untuk melanjutkan membuat kartu ucapan digital
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          leftIcon={<Mail className="w-5 h-5" />}
          placeholder="nama@email.com"
        />

        <Input
          label="Password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          leftIcon={<Lock className="w-5 h-5" />}
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border text-primary-500 focus:ring-primary-500" />
            <span className="text-sm text-text-secondary">Ingat saya</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Lupa password?
          </Link>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="w-full py-4"
        >
          Masuk
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-muted">atau</span>
        </div>
      </div>

      <p className="text-center text-text-secondary">
        Belum punya akun?{' '}
        <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  );
}
