'use client';

import { motion } from 'framer-motion';

interface Category {
  name: string;
  emoji: string;
  gradient: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function CategoriesSection({ 
  categories,
  title = 'Untuk Setiap Momen Spesial',
  subtitle = 'Template kartu untuk semua kesempatan',
  className = '',
  id
}: CategoriesSectionProps) {
  return (
    <section id={id} className={`py-24 ${className}`}>
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`relative aspect-square rounded-2xl bg-gradient-to-br ${category.gradient} p-6 flex flex-col items-center justify-center cursor-pointer overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <span className="text-4xl sm:text-5xl mb-2">{category.emoji}</span>
              <span className="text-white font-medium text-sm sm:text-base">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
