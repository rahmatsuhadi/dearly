'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const iconSizes = {
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
  lg: 'w-10 h-10',
};

const iconInnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
};

const textSizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <div className={`${iconSizes[size]} rounded-xl gradient-primary flex items-center justify-center`}>
        <Mail className={`${iconInnerSizes[size]} text-white`} />
      </div>
      {showText && (
        <span className={`font-display font-bold text-gradient ${textSizes[size]}`}>
          Dearly
        </span>
      )}
    </Link>
  );
}
