import { LucideIcon, Gift, Mail, Sparkles, Heart, Scroll, PartyPopper, Cake, Key, Flower2, Star } from 'lucide-react';

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  previewColor: string;
  category: 'classic' | 'playful' | 'romantic' | 'celebration';
  interactions: number; // Number of interactions required
}

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'birthday-cake',
    name: 'Kue Ulang Tahun',
    description: 'Tiup 5 lilin satu per satu untuk membuka kartu! Lengkap dengan efek asap dan confetti.',
    icon: Cake,
    previewColor: '#f59e0b',
    category: 'celebration',
    interactions: 5,
  },
  {
    id: 'treasure-chest',
    name: 'Peti Harta Karun',
    description: 'Temukan dan kumpulkan 4 kunci tersembunyi untuk membuka peti harta karun!',
    icon: Key,
    previewColor: '#d97706',
    category: 'playful',
    interactions: 4,
  },
  {
    id: 'flower-bouquet',
    name: 'Buket Bunga',
    description: 'Petik 8 kelopak bunga satu per satu dengan pesan "sayang, sayang tidak"!',
    icon: Flower2,
    previewColor: '#ec4899',
    category: 'romantic',
    interactions: 8,
  },
  {
    id: 'star-collector',
    name: 'Kolektor Bintang',
    description: 'Kumpulkan 6 bintang di langit malam dengan efek shooting star!',
    icon: Star,
    previewColor: '#8b5cf6',
    category: 'playful',
    interactions: 6,
  },
  {
    id: 'gift-box',
    name: 'Kotak Kado',
    description: 'Kotak kado dengan pita emas yang terurai dan efek magical sparkles.',
    icon: Gift,
    previewColor: '#10b981',
    category: 'celebration',
    interactions: 1,
  },
  {
    id: 'balloon-pop',
    name: 'Balon Surprise',
    description: 'Pecahkan 5 balon warna-warni satu per satu untuk reveal pesan spesial!',
    icon: PartyPopper,
    previewColor: '#f43f5e',
    category: 'celebration',
    interactions: 5,
  },
  {
    id: 'magic-card',
    name: 'Kartu Ajaib',
    description: 'Kartu dengan efek sparkle magis yang mengikuti gerakan mouse.',
    icon: Sparkles,
    previewColor: '#8b5cf6',
    category: 'playful',
    interactions: 1,
  },
  {
    id: 'heart-box',
    name: 'Kotak Hati',
    description: 'Kotak berbentuk hati yang berdenyut dengan floating hearts animation.',
    icon: Heart,
    previewColor: '#ec4899',
    category: 'romantic',
    interactions: 1,
  },
  {
    id: 'scroll',
    name: 'Gulungan Surat',
    description: 'Gulungan kertas kuno dengan segel lilin yang terbuka dramatis.',
    icon: Scroll,
    previewColor: '#d97706',
    category: 'classic',
    interactions: 1,
  },
  {
    id: 'envelope',
    name: 'Amplop Klasik',
    description: 'Amplop elegan klasik dengan animasi pembukaan yang smooth.',
    icon: Mail,
    previewColor: '#6366f1',
    category: 'classic',
    interactions: 1,
  },
];

export const getTemplateById = (id: string): CardTemplate | undefined => {
  return CARD_TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: CardTemplate['category']): CardTemplate[] => {
  return CARD_TEMPLATES.filter(t => t.category === category);
};

export const TEMPLATE_CATEGORIES = [
  { id: 'celebration', name: 'Perayaan', description: 'Untuk momen spesial' },
  { id: 'romantic', name: 'Romantis', description: 'Untuk orang tersayang' },
  { id: 'playful', name: 'Seru & Interaktif', description: 'Dengan banyak interaksi' },
  { id: 'classic', name: 'Klasik', description: 'Elegan dan timeless' },
] as const;
