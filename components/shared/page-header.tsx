'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  animate?: boolean;
  className?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  action, 
  animate = true,
  className = '' 
}: PageHeaderProps) {
  const content = (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      <div>
        <h2 className="text-2xl font-display font-bold text-text-primary">{title}</h2>
        {subtitle && <p className="text-text-tertiary">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
