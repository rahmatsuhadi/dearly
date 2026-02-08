'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Grid3X3, List, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button, Input } from '@/components/ui';
import { PageHeader, EmptyState } from '@/components/shared';
import { CardGridItem, CardListItem, CardData } from '@/components/cards';
import { getCategoryById } from '@/lib/constants';

// Mock data - will be replaced with API data
const mockCards: CardData[] = [
  { 
    id: '1', 
    title: 'Happy Birthday Sayang!', 
    message: 'Selamat ulang tahun! Semoga panjang umur...',
    category: 'birthday', 
    status: 'published',
    viewCount: 45,
    shareLink: 'abc123',
    createdAt: '2024-02-05',
  },
  { 
    id: '2', 
    title: 'Valentine untuk Kamu', 
    message: 'Untuk yang terkasih, di hari valentine...',
    category: 'valentine', 
    status: 'published',
    viewCount: 128,
    shareLink: 'xyz789',
    createdAt: '2024-02-01',
  },
  { 
    id: '3', 
    title: 'Selamat Wisuda!', 
    message: 'Congratulations! Kamu hebat...',
    category: 'graduation', 
    status: 'draft',
    viewCount: 0,
    shareLink: 'grd456',
    createdAt: '2024-01-28',
  },
];

type ViewMode = 'grid' | 'list';
type FilterStatus = 'all' | 'published' | 'draft';

export default function CardsPage() {
  const [cards] = useState<CardData[]>(mockCards);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || card.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCopyLink = (shareLink: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/card/${shareLink}`);
    toast.success('Link berhasil disalin!');
  };

  const handleDelete = (id: string) => {
    toast.success('Kartu berhasil dihapus!');
    // Will implement actual delete logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Kartu Saya"
        subtitle={`${cards.length} kartu total`}
        action={
          <Link href="/dashboard/cards/create">
            <Button leftIcon={<Plus className="w-5 h-5" />}>
              Buat Kartu Baru
            </Button>
          </Link>
        }
      />

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Cari kartu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-surface rounded-xl border border-border p-1">
            {[
              { value: 'all', label: 'Semua' },
              { value: 'published', label: 'Terkirim' },
              { value: 'draft', label: 'Draft' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterStatus(option.value as FilterStatus)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filterStatus === option.value
                    ? 'bg-primary-500 text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface rounded-xl border border-border p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Display */}
      {filteredCards.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Belum ada kartu"
          description="Mulai buat kartu ucapan pertamamu sekarang!"
          action={
            <Link href="/dashboard/cards/create">
              <Button leftIcon={<Plus className="w-5 h-5" />}>
                Buat Kartu
              </Button>
            </Link>
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, index) => {
            const category = getCategoryById(card.category);
            return (
              <CardGridItem
                key={card.id}
                card={card}
                index={index}
                categoryIcon={category?.icon}
                categoryColor={category?.color}
                onCopyLink={handleCopyLink}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-tertiary">Kartu</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-tertiary hidden sm:table-cell">Kategori</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-tertiary hidden md:table-cell">Views</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-tertiary">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-tertiary">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCards.map((card) => {
                const category = getCategoryById(card.category);
                return (
                  <CardListItem
                    key={card.id}
                    card={card}
                    categoryIcon={category?.icon}
                    categoryColor={category?.color}
                    onDelete={handleDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
