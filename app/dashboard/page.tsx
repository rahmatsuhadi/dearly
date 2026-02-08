'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, FileText, Eye, Send, Clock, TrendingUp, Heart, Sparkles } from 'lucide-react';

import { Card, Button } from '@/components/ui';
import { StatCard, StatGrid } from '@/components/shared';
import { RecentCardsList, QuickActions } from '@/components/cards';
import { CATEGORIES, QUICK_CATEGORIES, getCategoryById } from '@/lib/constants';

const stats = [
  { label: 'Total Kartu', value: '12', icon: FileText, color: 'bg-primary-500' },
  { label: 'Dilihat', value: '248', icon: Eye, color: 'bg-accent-sky' },
  { label: 'Terkirim', value: '8', icon: Send, color: 'bg-accent-mint' },
  { label: 'Draft', value: '4', icon: Clock, color: 'bg-accent-peach' },
];

const recentCards = [
  { 
    id: '1', 
    title: 'Happy Birthday Sayang!', 
    category: 'birthday', 
    status: 'published' as const,
    viewCount: 45,
  },
  { 
    id: '2', 
    title: 'Valentine untuk Kamu', 
    category: 'valentine', 
    status: 'published' as const,
    viewCount: 128,
  },
  { 
    id: '3', 
    title: 'Selamat Wisuda!', 
    category: 'graduation', 
    status: 'draft' as const,
    viewCount: 0,
  },
];

export default function DashboardPage() {
  const getCategoryInfo = (categoryId: string) => {
    const cat = getCategoryById(categoryId);
    if (cat) {
      return { icon: cat.icon, color: cat.color };
    }
    return undefined;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 p-8 text-white"
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-display font-bold mb-2">
            Selamat datang kembali! 👋
          </h2>
          <p className="text-white/80 mb-6 max-w-lg">
            Siap membuat momen spesial lebih berkesan? Buat kartu ucapan digital yang unik dan personal.
          </p>
          <Link href="/dashboard/cards/create">
            <Button 
              variant="secondary" 
              leftIcon={<Plus className="w-5 h-5" />}
              className="bg-white text-primary-600 hover:bg-white/90"
            >
              Buat Kartu Baru
            </Button>
          </Link>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <Heart className="absolute top-8 right-8 w-16 h-16 fill-white" />
          <Sparkles className="absolute top-24 right-32 w-10 h-10" />
          <Heart className="absolute bottom-8 right-16 w-8 h-8 fill-white" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <StatGrid>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.color}
            />
          </motion.div>
        ))}
      </StatGrid>

      {/* Recent Cards & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <RecentCardsList 
            cards={recentCards} 
            getCategoryInfo={getCategoryInfo}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <QuickActions categories={[...QUICK_CATEGORIES]} />
        </motion.div>
      </div>

      {/* Tips Card */}
      <Card animate delay={0.5} className="bg-gradient-to-br from-accent-lavender/20 to-accent-sky/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-text-primary mb-1">
              Tips: Kartu yang Berkesan
            </h3>
            <p className="text-text-secondary text-sm">
              Tambahkan foto pribadi dan pesan yang heartfelt untuk membuat kartu ucapanmu lebih personal dan bermakna. 
              Penerima akan lebih tersentuh dengan pesan yang tulus!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
