'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  decorativeContent?: ReactNode;
  decorativePosition?: 'left' | 'right';
}

export function AuthLayout({ 
  children, 
  decorativeContent,
  decorativePosition = 'right' 
}: AuthLayoutProps) {
  const decorativeSection = decorativeContent || <DefaultDecorativeContent />;

  return (
    <div className="min-h-screen flex">
      {decorativePosition === 'left' && (
        <DecorativePanel>{decorativeSection}</DecorativePanel>
      )}
      
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: decorativePosition === 'left' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          {children}
        </motion.div>
      </div>
      
      {decorativePosition === 'right' && (
        <DecorativePanel>{decorativeSection}</DecorativePanel>
      )}
    </div>
  );
}

function DecorativePanel({ children }: { children: ReactNode }) {
  return (
    <div className="hidden lg:flex flex-1 gradient-romantic items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-20"
      >
        <Heart className="w-12 h-12 text-white/30 fill-white/30" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-32 right-24"
      >
        <Heart className="w-8 h-8 text-white/40 fill-white/40" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/3 right-32"
      >
        <Mail className="w-10 h-10 text-white/20" />
      </motion.div>

      {children}
    </div>
  );
}

function DefaultDecorativeContent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 text-center text-white max-w-md"
    >
      <div className="mb-8 relative">
        <div className="w-64 h-40 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm shadow-2xl flex items-center justify-center">
          <div className="text-4xl">💌</div>
        </div>
      </div>
      
      <h2 className="text-3xl font-display font-bold mb-4">
        Kirim Cinta Lewat Kartu Digital
      </h2>
      <p className="text-white/80 text-lg">
        Buat momen istimewa lebih berkesan dengan kartu ucapan yang personal dan kreatif
      </p>
    </motion.div>
  );
}
