'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = '' 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-center py-16 ${className}`}
    >
      <Icon className="w-16 h-16 text-text-muted mx-auto mb-4" />
      <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
      <p className="text-text-tertiary mb-6">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
}
