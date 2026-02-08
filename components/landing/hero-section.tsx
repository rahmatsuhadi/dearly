'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Star, Mail } from 'lucide-react';
import { Button } from '@/components/ui';
import Image from 'next/image';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className = '' }: HeroSectionProps) {
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden gradient-mesh ${className}`}>
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute top-32 left-10 w-64 h-64 bg-accent-rose/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-20 right-20 w-72 h-72 bg-accent-lavender/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-20 left-1/3 w-56 h-56 bg-accent-sky/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 text-primary-700 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Platform Kartu Ucapan Digital
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-6"
          >
            Kirim Kartu Ucapan{' '}
            <span className="text-gradient">Digital</span>{' '}
            untuk Momen Spesial
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
          >
            Buat dan kirimkan kartu ucapan digital kepada teman, keluarga, atau pasangan dengan mudah. Pilih template, tulis pesan, dan kirim.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/auth/register">
              <Button size="lg" leftIcon={<Heart className="w-5 h-5" />}>
                Buat Kartu Sekarang
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Lihat Demo
              </Button>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-border/50"
          >
            <div className="text-center">
              <p className="font-semibold text-text-primary">Mudah Digunakan</p>
              <p className="text-sm text-text-tertiary">Tanpa Ribet</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-text-primary">Banyak Pilihan</p>
              <p className="text-sm text-text-tertiary">Template Menarik</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-text-primary">Gratis</p>
              <p className="text-sm text-text-tertiary">Siap Pakai</p>
            </div>
          </motion.div>
        </div>
        
        {/* Hero Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-accent-rose/20 via-accent-lavender/20 to-accent-sky/20 p-8 flex items-center justify-center">
            <EnvelopePreview />
            <FloatingDecorations />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EnvelopePreview() {
  return (
    <motion.div
      initial={{ rotateX: 0 }}
      animate={{ rotateX: [0, -180, -180, 0] }}
      transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
      className="w-80 h-52 rounded-xl"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(135deg, #d4a574, #c49a6c)'
      }}
    >
      <div 
        className="absolute top-0 rounded-t-xl left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(180deg, #c9986a, #d4a574)',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
        }}
      />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-red-400 flex items-center justify-center shadow-lg">
        <Heart className="w-8 h-8 text-white fill-white" />
      </div>
    </motion.div>
  );
}

function FloatingDecorations() {
  return (
    <>
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 right-20"
      >
        <Star className="w-8 h-8 text-primary-400 fill-primary-400" />
      </motion.div>
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-16 left-20"
      >
        <Heart className="w-6 h-6 text-accent-rose fill-accent-rose" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-32"
      >
        <Sparkles className="w-5 h-5 text-primary-500" />
      </motion.div>
    </>
  );
}
