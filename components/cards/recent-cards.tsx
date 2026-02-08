'use client';

import Link from 'next/link';
import { Eye, LucideIcon } from 'lucide-react';

interface RecentCardData {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'draft';
  viewCount: number;
}

interface RecentCardItemProps {
  card: RecentCardData;
  categoryIcon?: LucideIcon;
  categoryColor?: string;
}

export function RecentCardItem({ card, categoryIcon: CategoryIcon, categoryColor = '#f43f5e' }: RecentCardItemProps) {
  return (
    <div className="p-5 flex items-center gap-4 hover:bg-surface-secondary transition-colors">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${categoryColor}20` }}
      >
        {CategoryIcon && <CategoryIcon className="w-6 h-6" style={{ color: categoryColor }} />}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text-primary truncate">{card.title}</h4>
        <p className="text-sm text-text-tertiary">{card.category}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 text-sm text-text-secondary mb-1">
          <Eye className="w-4 h-4" />
          {card.viewCount}
        </div>
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
          card.status === 'published' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {card.status === 'published' ? 'Terkirim' : 'Draft'}
        </span>
      </div>
    </div>
  );
}

interface RecentCardsListProps {
  cards: RecentCardData[];
  getCategoryInfo?: (category: string) => { icon: LucideIcon; color: string } | undefined;
}

export function RecentCardsList({ cards, getCategoryInfo }: RecentCardsListProps) {
  return (
    <div className="bg-surface rounded-xl border border-border">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="text-lg font-display font-semibold text-text-primary">
          Kartu Terbaru
        </h3>
        <Link href="/dashboard/cards" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Lihat Semua
        </Link>
      </div>
      
      <div className="divide-y divide-border">
        {cards.map((card) => {
          const catInfo = getCategoryInfo?.(card.category);
          return (
            <RecentCardItem 
              key={card.id} 
              card={card} 
              categoryIcon={catInfo?.icon}
              categoryColor={catInfo?.color}
            />
          );
        })}
      </div>
    </div>
  );
}
