'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, LucideIcon, Sparkles, Star } from 'lucide-react';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  color: string;
  rotation: number;
}

interface EnvelopeProps {
  color?: string;
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

export function Envelope({ color = '#d4a574', recipientName, accentColor, onOpen }: EnvelopeProps) {
  const textColor = color === '#f8f9fa' ? '#495057' : 'white';
  const darkTextColor = color === '#f8f9fa' ? '#212529' : 'white';
  const flapColor = color === '#f8f9fa' ? '#dee2e6' : `${color}dd`;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        scale: 0.8, 
        opacity: 0,
        rotateX: -180,
        y: -100
      }}
      transition={{ duration: 0.6 }}
      className="cursor-pointer"
      onClick={onOpen}
    >
      <div 
        className="relative w-80 h-56 rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {/* Envelope Back */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(180deg, ${color} 0%, ${
              color === '#f8f9fa' ? '#e9ecef' : `${color}cc`
            } 100%)` 
          }}
        />
        
        {/* Envelope Flap */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-28"
          style={{
            background: `linear-gradient(180deg, ${flapColor} 0%, ${color} 100%)`,
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transformOrigin: 'top center',
          }}
          animate={{ rotateX: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Heart Seal */}
        <motion.div 
          className="absolute top-16 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: accentColor }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-6 h-6 text-white fill-white" />
        </motion.div>

        {/* Recipient Name */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-sm opacity-70" style={{ color: textColor }}>Untuk:</p>
          <p className="text-lg font-handwriting font-medium" style={{ color: darkTextColor }}>
            {recipientName}
          </p>
        </div>

        {/* Tap Hint */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <motion.p 
            className="text-sm text-text-tertiary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap untuk membuka
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

interface CardContentDisplayProps {
  title: string;
  message: string;
  recipientName: string;
  senderName: string;
  categoryIcon?: LucideIcon;
  accentColor: string;
  fontFamily?: string;
  onShare?: () => void;
}

export function CardContentDisplay({
  title,
  message,
  recipientName,
  senderName,
  categoryIcon: CategoryIcon,
  accentColor,
  fontFamily = 'var(--font-handwriting)',
  onShare,
}: CardContentDisplayProps) {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSparkles(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative max-w-md w-full"
    >
      {/* Floating Decorations */}
      <AnimatePresence>
        {showSparkles && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 180,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 180 - 100,
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                style={{ 
                  top: '50%', 
                  left: '50%',
                }}
              >
                {i % 2 === 0 ? (
                  <Star className="w-4 h-4" style={{ color: accentColor, fill: accentColor }} />
                ) : (
                  <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                )}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Decorative Corner Patterns */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-10"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${accentColor}, transparent 70%)`,
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-32 h-32 opacity-10"
          style={{
            background: `radial-gradient(circle at 0% 100%, ${accentColor}, transparent 70%)`,
          }}
        />

        {/* Header with Gradient */}
        <div 
          className="relative h-44 flex items-center justify-center overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc, ${accentColor}99)` 
          }}
        >
          {/* Animated Background Shapes */}
          <motion.div
            className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20"
            style={{ backgroundColor: 'white' }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
              y: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -right-10 w-48 h-48 rounded-full opacity-10"
            style={{ backgroundColor: 'white' }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-10 right-10 w-20 h-20 rounded-full opacity-15"
            style={{ backgroundColor: 'white' }}
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Icon with Glow Effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
            className="relative z-10"
          >
            <div 
              className="absolute inset-0 rounded-3xl blur-xl opacity-50"
              style={{ backgroundColor: 'white' }}
            />
            <div className="relative w-24 h-24 rounded-3xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30">
              {CategoryIcon ? (
                <CategoryIcon className="w-12 h-12 text-white drop-shadow-lg" />
              ) : (
                <Heart className="w-12 h-12 text-white fill-white drop-shadow-lg" />
              )}
            </div>
          </motion.div>

          {/* Sparkle Decorations */}
          <motion.div
            className="absolute top-6 left-8"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-white/50" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8"
            animate={{ rotate: -360, opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-5 h-5 text-white/50 fill-white/30" />
          </motion.div>
        </div>

        {/* Body Content */}
        <div className="relative px-8 py-10">
          {/* Decorative Divider */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <motion.div 
              className="w-12 h-0.5 rounded-full"
              style={{ backgroundColor: accentColor }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <Heart className="w-4 h-4" style={{ color: accentColor, fill: accentColor }} />
            </motion.div>
            <motion.div 
              className="w-12 h-0.5 rounded-full"
              style={{ backgroundColor: accentColor }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </div>

          {/* Recipient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-6"
          >
            <span className="text-sm text-gray-400 tracking-wider uppercase">Untuk yang tersayang</span>
            <p 
              className="text-xl font-display font-semibold mt-1"
              style={{ color: accentColor }}
            >
              {recipientName}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center text-3xl font-bold mb-8 leading-tight"
            style={{ fontFamily, color: '#1a1a2e' }}
          >
            {title}
          </motion.h1>
          
          {/* Message */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative"
          >
            {/* Quote Mark */}
            <div 
              className="absolute -top-4 -left-2 text-6xl font-serif opacity-10"
              style={{ color: accentColor }}
            >
              "
            </div>
            <p 
              className="text-gray-600 whitespace-pre-wrap leading-relaxed text-center text-lg px-4"
              style={{ fontFamily }}
            >
              {message}
            </p>
            <div 
              className="absolute -bottom-6 -right-2 text-6xl font-serif opacity-10 rotate-180"
              style={{ color: accentColor }}
            >
              "
            </div>
          </motion.div>
          
          {/* Sender Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-12 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-px bg-gray-200" />
              <Heart className="w-3 h-3" style={{ color: accentColor, fill: accentColor }} />
              <div className="w-8 h-px bg-gray-200" />
            </div>
            <span className="text-gray-400 text-sm">Dengan penuh cinta,</span>
            <p 
              className="text-xl font-display font-semibold mt-1"
              style={{ color: accentColor, fontFamily }}
            >
              {senderName}
            </p>
          </motion.div>
        </div>

        {/* Actions */}
        {onShare && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="px-8 pb-6 flex justify-center gap-3"
          >
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{ 
                backgroundColor: `${accentColor}15`,
                color: accentColor
              }}
            >
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Bagikan Kartu</span>
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="px-8 py-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-100"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 fill-current" style={{ color: accentColor }} />
            </motion.div>
            <p className="text-sm text-gray-400">
              Dibuat dengan cinta di{' '}
              <span className="font-semibold" style={{ color: accentColor }}>Dearly</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ConfettiEffectProps {
  show: boolean;
  colors?: string[];
  count?: number;
}

export function ConfettiEffect({ 
  show, 
  colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#f59e0b', '#10b981'],
  count = 50
}: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show) {
      const newPieces = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);
    }
  }, [show, colors, count]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ 
                y: -20, 
                x: `${piece.x}vw`, 
                opacity: 1,
                rotate: piece.rotation 
              }}
              animate={{ 
                y: '110vh',
                rotate: piece.rotation + 720,
                opacity: [1, 1, 0] 
              }}
              transition={{ 
                duration: 3,
                delay: piece.delay,
                ease: 'linear'
              }}
              className="absolute w-3 h-3 rounded"
              style={{ backgroundColor: piece.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

interface FloatingHeartsProps {
  color: string;
  count?: number;
}

export function FloatingHearts({ color, count = 6 }: FloatingHeartsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', x: `${10 + i * 15}vw`, opacity: 0.3 }}
          animate={{ y: '-10vh', opacity: [0.3, 0.6, 0.3] }}
          transition={{ 
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear'
          }}
        >
          <Heart 
            className="w-6 h-6"
            style={{ color, fill: color }}
          />
        </motion.div>
      ))}
    </div>
  );
}
