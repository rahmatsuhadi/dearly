'use client';

import { motion } from 'framer-motion';

interface Step {
  step: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HowItWorksSection({ 
  steps,
  title = 'Semudah 1, 2, 3',
  subtitle = 'Buat kartu ucapan digital dalam hitungan menit',
  className = '' 
}: HowItWorksSectionProps) {
  return (
    <section className={`py-24 bg-surface-secondary ${className}`}>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-8 rounded-2xl bg-surface text-center"
            >
              <div className="text-6xl font-display font-bold text-primary-100 absolute top-6 left-1/2 -translate-x-1/2">
                {item.step}
              </div>
              <div className="relative pt-12">
                <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
