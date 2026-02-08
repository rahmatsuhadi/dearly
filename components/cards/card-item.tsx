'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Edit3, ExternalLink, MoreHorizontal, Trash2, Copy, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';

export interface CardData {
  id: string;
  title: string;
  message: string;
  category: string;
  status: 'published' | 'draft';
  viewCount: number;
  shareLink: string;
  createdAt: string;
}

interface CardGridItemProps {
  card: CardData;
  index?: number;
  categoryIcon?: LucideIcon;
  categoryColor?: string;
  onCopyLink?: (shareLink: string) => void;
  onDelete?: (id: string) => void;
}

export function CardGridItem({ 
  card, 
  index = 0, 
  categoryIcon: CategoryIcon,
  categoryColor = '#f43f5e',
  onCopyLink,
  onDelete 
}: CardGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-surface rounded-xl border border-border overflow-hidden card-hover"
    >
      {/* Preview Area */}
      <div 
        className="aspect-video flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}40)` }}
      >
        {CategoryIcon && (
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${categoryColor}30` }}
          >
            <CategoryIcon className="w-8 h-8" style={{ color: categoryColor }} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <Link
            href={`/dashboard/cards/${card.id}/edit`}
            className="p-3 rounded-full bg-white text-text-primary hover:bg-primary-500 hover:text-white transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </Link>
          <Link
            href={`/card/${card.shareLink}`}
            target="_blank"
            className="p-3 rounded-full bg-white text-text-primary hover:bg-primary-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-text-primary line-clamp-1">{card.title}</h3>
          <Dropdown 
            trigger={
              <button className="p-1 rounded-lg hover:bg-surface-secondary transition-colors">
                <MoreHorizontal className="w-5 h-5 text-text-tertiary" />
              </button>
            }
          >
            <DropdownItem 
              icon={<Edit3 className="w-4 h-4" />}
              onClick={() => {}}
            >
              Edit
            </DropdownItem>
            <DropdownItem 
              icon={<Copy className="w-4 h-4" />}
              onClick={() => onCopyLink?.(card.shareLink)}
            >
              Salin Link
            </DropdownItem>
            <DropdownItem 
              icon={<Trash2 className="w-4 h-4" />}
              danger
              onClick={() => onDelete?.(card.id)}
            >
              Hapus
            </DropdownItem>
          </Dropdown>
        </div>
        
        <p className="text-sm text-text-tertiary line-clamp-2 mb-3">{card.message}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Eye className="w-4 h-4" />
            {card.viewCount}
          </div>
          <Badge variant={card.status === 'published' ? 'success' : 'warning'}>
            {card.status === 'published' ? 'Terkirim' : 'Draft'}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}

interface CardListItemProps {
  card: CardData;
  categoryIcon?: LucideIcon;
  categoryColor?: string;
  onDelete?: (id: string) => void;
}

export function CardListItem({ 
  card, 
  categoryIcon: CategoryIcon,
  categoryColor = '#f43f5e',
  onDelete 
}: CardListItemProps) {
  return (
    <tr className="hover:bg-surface-secondary transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            {CategoryIcon && <CategoryIcon className="w-5 h-5" style={{ color: categoryColor }} />}
          </div>
          <div>
            <p className="font-medium text-text-primary">{card.title}</p>
            <p className="text-sm text-text-tertiary line-clamp-1">{card.message}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary hidden sm:table-cell">
        {card.category}
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <div className="flex items-center gap-1 text-sm text-text-secondary">
          <Eye className="w-4 h-4" />
          {card.viewCount}
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={card.status === 'published' ? 'success' : 'warning'}>
          {card.status === 'published' ? 'Terkirim' : 'Draft'}
        </Badge>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/dashboard/cards/${card.id}/edit`}
            className="p-2 rounded-lg hover:bg-primary-100 text-text-tertiary hover:text-primary-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <Link
            href={`/card/${card.shareLink}`}
            target="_blank"
            className="p-2 rounded-lg hover:bg-primary-100 text-text-tertiary hover:text-primary-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button 
            onClick={() => onDelete?.(card.id)}
            className="p-2 rounded-lg hover:bg-red-100 text-text-tertiary hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
