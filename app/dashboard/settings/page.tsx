'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { Button, Input, Card } from '@/components/ui';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profil berhasil diperbarui!');
    } catch {
      toast.error('Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Settings */}
      <Card animate>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-text-primary">
              Profil Pengguna
            </h2>
            <p className="text-text-tertiary">Kelola informasi profilmu</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nama Lengkap"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nama lengkap"
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            disabled
            hint="Email tidak dapat diubah"
          />

          <Button type="submit" isLoading={isLoading}>
            Simpan Perubahan
          </Button>
        </form>
      </Card>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-surface rounded-xl border border-red-200 p-6"
      >
        <h3 className="text-lg font-display font-semibold text-red-600 mb-4">
          Zona Berbahaya
        </h3>
        
        <div className="flex items-center justify-between p-4 rounded-xl bg-red-50">
          <div>
            <p className="font-medium text-text-primary">Keluar dari Akun</p>
            <p className="text-sm text-text-tertiary">Kamu akan keluar dari sesi ini</p>
          </div>
          <Button
            variant="danger"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Keluar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
