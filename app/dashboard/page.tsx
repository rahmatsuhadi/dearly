'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Eye, Send, Clock, TrendingUp, Sparkles, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

import { Card, Button } from '@/components/ui';
import { StatCard, StatGrid } from '@/components/shared';
import { RecentCardsList, QuickActions } from '@/components/cards';
import { QUICK_CATEGORIES, getCategoryById } from '@/lib/constants';

interface CardData {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'draft';
  viewCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { label: 'Total Kartu', value: '0', icon: FileText, color: 'bg-primary-500' },
    { label: 'Dilihat', value: '0', icon: Eye, color: 'bg-accent-sky' },
    { label: 'Terkirim', value: '0', icon: Send, color: 'bg-accent-mint' },
    { label: 'Draft', value: '0', icon: Clock, color: 'bg-accent-peach' },
  ]);
  const [recentCards, setRecentCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/cards');
        if (res.ok) {
          const cards: CardData[] = await res.json();
          
          // Calculate stats
          const totalCards = cards.length;
          const totalViews = cards.reduce((acc, card) => acc + (card.viewCount || 0), 0);
          const publishedCards = cards.filter(card => card.status === 'published').length;
          const draftCards = cards.filter(card => card.status === 'draft').length;

          setStats([
            { label: 'Total Kartu', value: totalCards.toString(), icon: FileText, color: 'bg-primary-500' },
            { label: 'Dilihat', value: totalViews.toString(), icon: Eye, color: 'bg-accent-sky' },
            { label: 'Terkirim', value: publishedCards.toString(), icon: Send, color: 'bg-accent-mint' },
            { label: 'Draft', value: draftCards.toString(), icon: Clock, color: 'bg-accent-peach' },
          ]);

          // Get 3 most recent cards
          setRecentCards(cards.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Gagal memuat data dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getCategoryInfo = (categoryId: string) => {
    const cat = getCategoryById(categoryId);
    return cat ? { icon: cat.icon, color: cat.color } : undefined;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 p-8 text-white shadow-lg shadow-primary-500/20"
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-3">
            Selamat datang kembali! 👋
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Siap membuat momen spesial lebih berkesan? Buat kartu ucapan digital interaktif yang unik dan personal sekarang.
          </p>
          <Link href="/dashboard/cards/create">
            <Button 
              size="lg"
              variant="secondary" 
              leftIcon={<Plus className="w-5 h-5" />}
              className="bg-white text-primary-600 hover:bg-gray-50 border-0 shadow-xl shadow-black/10 font-semibold px-8"
            >
              Buat Kartu Baru
            </Button>
          </Link>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <motion.div 
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-12 right-12"
          >
            <Heart className="w-24 h-24 fill-white" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-12 right-32"
          >
            <Sparkles className="w-16 h-16 text-yellow-200" />
          </motion.div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-white/20 blur-3xl rounded-full mix-blend-overlay" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <StatGrid>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {isLoading ? (
              <div className="bg-white rounded-xl p-6 h-32 animate-pulse" />
            ) : (
              <StatCard
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.color}
              />
            )}
          </motion.div>
        ))}
      </StatGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">Kartu Terbaru</h3>
             <Link href="/dashboard/cards" className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">
              Lihat Semua
            </Link>
          </div>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <RecentCardsList 
              cards={recentCards} 
              getCategoryInfo={getCategoryInfo}
            />
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-text-primary mb-4">Mulai Cepat</h3>
          <QuickActions categories={[...QUICK_CATEGORIES]} />
        </motion.div>
      </div>

      {/* Tips Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-text-primary mb-2 text-lg">
                Tips Membuat Kartu Berkesan 💡
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Gunakan fitur <span className="font-medium text-indigo-600">AI Writer</span> kami untuk membuat pesan yang puitis dan personal secara instan! 
                Jangan lupa tambahkan musik latar yang sesuai dengan suasana hati penerima.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
