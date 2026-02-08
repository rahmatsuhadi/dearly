'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  features?: string[];
  className?: string;
}

export function CTASection({ 
  title = 'Siap Membuat Momen Istimewa?',
  subtitle = 'Bergabung dengan ribuan pengguna yang telah mengirimkan kartu ucapan digital yang berkesan',
  buttonText = 'Mulai Gratis Sekarang',
  features = ['Gratis selamanya', 'Tanpa kartu kredit', 'Setup instan'],
  className = '' 
}: CTASectionProps) {
  return (
    <section className={`py-24 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 gradient-romantic opacity-10" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-6">
            {title}
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <Link href="/auth/register">
            <Button 
              size="lg" 
              leftIcon={<Heart className="w-6 h-6" />}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="px-10 py-5 text-lg"
            >
              {buttonText}
            </Button>
          </Link>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-text-tertiary flex-wrap">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
