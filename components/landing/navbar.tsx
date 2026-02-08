'use client';

import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/shared';
import { Button } from '@/components/ui';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = '' }: NavbarProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 glass ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="md" />
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Fitur
            </Link>
            <Link href="#templates" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Template
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Harga
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Masuk
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Mulai Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`py-12 border-t border-border bg-surface-secondary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />
          
          <div className="flex items-center gap-6 text-sm text-text-tertiary">
            <Link href="#" className="hover:text-text-primary transition-colors">Tentang</Link>
            <Link href="#" className="hover:text-text-primary transition-colors">Kontak</Link>
            <Link href="#" className="hover:text-text-primary transition-colors">Privasi</Link>
            <Link href="#" className="hover:text-text-primary transition-colors">Syarat</Link>
          </div>
          
          <p className="text-sm text-text-muted">
            © 2026 Dearly. Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
