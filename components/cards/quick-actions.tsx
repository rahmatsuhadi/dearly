'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { QUICK_CATEGORIES } from '@/lib/constants';

interface QuickCategoryProps {
  name: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
}

export function QuickCategory({ name, icon: Icon, gradient, href }: QuickCategoryProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${gradient} text-white hover:opacity-90 transition-opacity`}
    >
      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium">{name}</span>
    </Link>
  );
}

interface QuickActionsProps {
  categories?: Array<{
    name: string;
    icon: LucideIcon;
    gradient: string;
  }>;
}

export function QuickActions({ categories = [...QUICK_CATEGORIES] }: QuickActionsProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
        Buat Cepat
      </h3>
      
      <div className="space-y-3">
        {categories.map((category) => (
          <QuickCategory
            key={category.name}
            name={category.name}
            icon={category.icon}
            gradient={category.gradient}
            href={`/dashboard/cards/create?category=${category.name.toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  );
}
