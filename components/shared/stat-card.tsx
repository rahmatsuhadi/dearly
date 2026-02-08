'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, iconColor, className = '' }: StatCardProps) {
  return (
    <div className={`bg-surface rounded-xl p-5 border border-border ${className}`}>
      <div className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-display font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-tertiary">{label}</p>
    </div>
  );
}

interface StatGridProps {
  children: ReactNode;
  className?: string;
}

export function StatGrid({ children, className = '' }: StatGridProps) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  );
}
