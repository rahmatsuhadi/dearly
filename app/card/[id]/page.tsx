'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Mail, Loader2 } from 'lucide-react';

import { TemplateRenderer } from '@/components/templates/template-renderer';
import { CardContentDisplay, ConfettiEffect, FloatingHearts } from '@/components/cards';
import { getCategoryById, ENVELOPE_STYLES, CONFETTI_COLORS } from '@/lib/constants';

interface CardData {
  id: string;
  title: string;
  message: string;
  recipientName: string;
  senderName: string;
  category: string;
  template: string;
  accentColor: string;
  font: string;
  envelopeStyle: string;
}

export default function PublicCardPage() {
  const params = useParams();
  const [card, setCard] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/cards/public/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setCard(data);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching card:', error);
      }

      // Demo data - remove when API is ready
      setTimeout(() => {
        setCard({
          id: params.id as string,
          title: 'Happy Valentine! 💕',
          message: 'Terima kasih sudah hadir dalam hidupku.\nKamu adalah kebahagiaan terindah yang pernah aku miliki.\n\nSelamat Hari Valentine sayang! ❤️',
          recipientName: 'Sayang',
          senderName: 'Someone Special',
          category: 'valentine',
          template: 'gift-box', // Can be: gift-box, magic-card, heart-box, scroll, balloon-pop, envelope
          accentColor: '#f43f5e',
          font: 'handwriting',
          envelopeStyle: 'kraft',
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchCard();
  }, [params.id]);

  const handleOpenCard = () => {
    setIsOpened(true);
    setTimeout(() => setShowConfetti(true), 300);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: card?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Memuat kartu...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="text-center">
          <Mail className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-text-primary mb-2">
            Kartu Tidak Ditemukan
          </h1>
          <p className="text-text-secondary">
            Kartu yang kamu cari tidak ada atau sudah dihapus.
          </p>
        </div>
      </div>
    );
  }

  const envelopeStyle = ENVELOPE_STYLES.find(s => s.id === card.envelopeStyle);
  const envelopeColor = envelopeStyle?.color || '#d4a574';
  const category = getCategoryById(card.category);
  const CategoryIcon = category?.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4 overflow-hidden">
      {/* Confetti Effect */}
      <ConfettiEffect show={showConfetti} colors={CONFETTI_COLORS} />

      {/* Floating Hearts */}
      <FloatingHearts color={card.accentColor} />

      <div className="relative">
        {/* Template (before opening) */}
        <AnimatePresence mode="wait">
          {!isOpened && (
            <TemplateRenderer
              templateId={card.template}
              recipientName={card.recipientName}
              accentColor={card.accentColor}
              envelopeColor={envelopeColor}
              onOpen={handleOpenCard}
            />
          )}
        </AnimatePresence>

        {/* Card Content (after opening) */}
        <AnimatePresence>
          {isOpened && (
            <CardContentDisplay
              title={card.title}
              message={card.message}
              recipientName={card.recipientName}
              senderName={card.senderName}
              categoryIcon={CategoryIcon}
              accentColor={card.accentColor}
              fontFamily="var(--font-handwriting)"
              onShare={handleShare}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
