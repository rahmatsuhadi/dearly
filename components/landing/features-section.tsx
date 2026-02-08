'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function FeaturesSection({ 
  features, 
  title = 'Fitur Utama',
  subtitle = 'Buat kartu ucapan digital dengan berbagai fitur menarik.',
  className = '',
  id
}: FeaturesSectionProps) {
  return (
    <section id={id} className={`py-24 bg-surface-secondary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-4">
            {title}
          </h2>
          <p className="text-lg text-text-secondary">{subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-surface card-hover"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
