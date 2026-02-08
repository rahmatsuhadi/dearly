import { 
  Gift, 
  Sparkles, 
  Mail, 
  Zap, 
  Users, 
  Star,
  Heart,
  Cake,
  GraduationCap,
  Gem,
  Moon,
  TreePine,
  PartyPopper,
  HandHeart,
  LucideIcon
} from 'lucide-react';

// Category data with icons
export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  gradient: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'valentine', name: 'Valentine', icon: Heart, gradient: 'from-rose-400 to-pink-500', color: '#f43f5e' },
  { id: 'birthday', name: 'Ulang Tahun', icon: Cake, gradient: 'from-amber-400 to-orange-500', color: '#f59e0b' },
  { id: 'graduation', name: 'Wisuda', icon: GraduationCap, gradient: 'from-indigo-400 to-purple-500', color: '#8b5cf6' },
  { id: 'anniversary', name: 'Anniversary', icon: Gem, gradient: 'from-pink-400 to-rose-500', color: '#ec4899' },
  { id: 'eid', name: 'Lebaran', icon: Moon, gradient: 'from-emerald-400 to-teal-500', color: '#10b981' },
  { id: 'christmas', name: 'Natal', icon: TreePine, gradient: 'from-red-400 to-green-500', color: '#22c55e' },
  { id: 'newyear', name: 'Tahun Baru', icon: PartyPopper, gradient: 'from-violet-400 to-purple-500', color: '#a855f7' },
  { id: 'thankyou', name: 'Thank You', icon: HandHeart, gradient: 'from-sky-400 to-blue-500', color: '#0ea5e9' },
];

// Get category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(c => c.id === id);
};

// Template options
export const TEMPLATES = [
  { id: 'classic', name: 'Classic', icon: Mail, description: 'Elegan dan timeless' },
  { id: 'modern', name: 'Modern', icon: Sparkles, description: 'Minimalis dan clean' },
  { id: 'romantic', name: 'Romantic', icon: Heart, description: 'Penuh kasih sayang' },
  { id: 'playful', name: 'Playful', icon: PartyPopper, description: 'Ceria dan menyenangkan' },
] as const;

// Font options
export const FONTS = [
  { id: 'default', name: 'Default', family: 'var(--font-sans)' },
  { id: 'display', name: 'Display', family: 'var(--font-display)' },
  { id: 'handwriting', name: 'Handwriting', family: 'var(--font-handwriting)' },
  { id: 'serif', name: 'Serif', family: 'var(--font-serif)' },
] as const;

// Color options
export const ACCENT_COLORS = [
  { id: 'rose', name: 'Rose', value: '#f43f5e' },
  { id: 'pink', name: 'Pink', value: '#ec4899' },
  { id: 'purple', name: 'Purple', value: '#a855f7' },
  { id: 'blue', name: 'Blue', value: '#3b82f6' },
  { id: 'sky', name: 'Sky', value: '#0ea5e9' },
  { id: 'teal', name: 'Teal', value: '#14b8a6' },
  { id: 'orange', name: 'Orange', value: '#f97316' },
  { id: 'amber', name: 'Amber', value: '#f59e0b' },
] as const;

// Envelope style options
export const ENVELOPE_STYLES = [
  { id: 'kraft', name: 'Kraft', color: '#d4a574' },
  { id: 'white', name: 'Putih', color: '#ffffff' },
  { id: 'pink', name: 'Pink', color: '#ffc0cb' },
  { id: 'red', name: 'Merah', color: '#e53e3e' },
] as const;

// Feature data for landing page
export const FEATURES = [
  {
    icon: Gift,
    title: 'Pilihan Template',
    description: 'Tersedia berbagai template untuk momen seperti ulang tahun, valentine, dan lainnya.',
    color: 'bg-accent-rose',
  },
  {
    icon: Sparkles,
    title: 'Kustomisasi',
    description: 'Sesuaikan teks, warna, dan font sesuai keinginanmu.',
    color: 'bg-accent-lavender',
  },
  {
    icon: Mail,
    title: 'Animasi',
    description: 'Dilengkapi animasi pembukaan amplop yang interaktif.',
    color: 'bg-accent-sky',
  },
  {
    icon: Zap,
    title: 'Cepat & Mudah',
    description: 'Buat kartu dalam waktu singkat langsung dari browser.',
    color: 'bg-accent-mint',
  },
  {
    icon: Users,
    title: 'Dashboard',
    description: 'Simpan dan kelola kartu yang sudah kamu buat.',
    color: 'bg-accent-peach',
  },
  {
    icon: Star,
    title: 'Bagikan',
    description: 'Kirim kartu menggunakan link unik ke penerima.',
    color: 'bg-primary-400',
  },
] as const;

// How it works steps
export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Pilih Template',
    description: 'Pilih template yang sesuai dengan momen spesialmu dari berbagai kategori.',
  },
  {
    step: '02',
    title: 'Kustomisasi',
    description: 'Edit teks, warna, font, dan tambahkan sentuhan personal seperti foto atau stiker.',
  },
  {
    step: '03',
    title: 'Bagikan',
    description: 'Publish dan dapatkan link unik untuk dibagikan ke orang tersayang.',
  },
] as const;

// Quick action categories for dashboard
export const QUICK_CATEGORIES = [
  { name: 'Valentine', icon: Heart, gradient: 'from-rose-400 to-pink-500' },
  { name: 'Ulang Tahun', icon: Cake, gradient: 'from-amber-400 to-orange-500' },
  { name: 'Wisuda', icon: GraduationCap, gradient: 'from-indigo-400 to-purple-500' },
  { name: 'Terima Kasih', icon: HandHeart, gradient: 'from-sky-400 to-blue-500' },
] as const;

// Confetti colors
export const CONFETTI_COLORS = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#f59e0b', '#10b981'];
