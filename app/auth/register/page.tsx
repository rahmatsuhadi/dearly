'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { AuthLayout, PasswordStrength, PasswordMatch } from '@/components/auth';
import { Logo } from '@/components/shared';
import { Button, Input } from '@/components/ui';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password tidak cocok!');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password minimal 8 karakter');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mendaftar');
      }

      toast.success('Pendaftaran berhasil! Silakan login.');
      router.push('/auth/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const decorativeContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 text-white max-w-lg"
    >
      <h2 className="text-4xl font-display font-bold mb-6">
        Buat Kartu Ucapan yang Berkesan
      </h2>
      <p className="text-white/80 text-lg mb-8">
        Bergabung dengan ribuan pengguna yang telah mengirimkan momen istimewa lewat Dearly
      </p>
      
      <div className="space-y-4">
        {[
          // 'Akses ke 50+ template premium',
          'Kustomisasi tanpa batas',
          'Animasi amplop yang indah',
          'Dashboard untuk kelola kartu',
        ].map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <AuthLayout decorativePosition="left" decorativeContent={decorativeContent}>
      <Logo size="lg" className="mb-8" />

      <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
        Buat Akun Baru
      </h1>
      <p className="text-text-secondary mb-8">
        Daftar gratis dan mulai membuat kartu ucapan digital
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Nama Lengkap"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          leftIcon={<User className="w-5 h-5" />}
          placeholder="John Doe"
        />

        <Input
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          leftIcon={<Mail className="w-5 h-5" />}
          placeholder="nama@email.com"
        />

        <div>
          <Input
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            leftIcon={<Lock className="w-5 h-5" />}
            placeholder="Min. 8 karakter"
          />
          <PasswordStrength password={formData.password} />
        </div>

        <div>
          <Input
            label="Konfirmasi Password"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            leftIcon={<Lock className="w-5 h-5" />}
            placeholder="Ulangi password"
          />
          <PasswordMatch password={formData.password} confirmPassword={formData.confirmPassword} />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            required 
            className="w-4 h-4 mt-0.5 rounded border-border text-primary-500 focus:ring-primary-500" 
          />
          <span className="text-sm text-text-secondary">
            Dengan mendaftar, saya menyetujui{' '}
            <Link href="#" className="text-primary-600 hover:text-primary-700">
              Syarat & Ketentuan
            </Link>{' '}
            dan{' '}
            <Link href="#" className="text-primary-600 hover:text-primary-700">
              Kebijakan Privasi
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="w-full py-4"
        >
          Daftar Sekarang
        </Button>
      </form>

      <p className="text-center text-text-secondary mt-8">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Masuk di sini
        </Link>
      </p>
    </AuthLayout>
  );
}
