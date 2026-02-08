'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface GiftBoxTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

export function GiftBoxTemplate({ recipientName, accentColor, onOpen }: GiftBoxTemplateProps) {
  const [isUntying, setIsUntying] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (!isUntying && !isOpening) {
      setIsUntying(true);
      setTimeout(() => {
        setIsOpening(true);
        setTimeout(onOpen, 800);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0, y: -100 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-72 h-72">
        {/* Box Base */}
        <motion.div
          className="absolute bottom-0 w-full h-48 rounded-lg shadow-2xl"
          style={{ backgroundColor: accentColor }}
          animate={isOpening ? { scale: [1, 1.05, 0.9], opacity: [1, 1, 0] } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Box Decoration */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full"
              style={{ backgroundColor: `${accentColor}dd` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-8"
              style={{ backgroundColor: `${accentColor}dd` }}
            />
          </div>
        </motion.div>

        {/* Box Lid */}
        <motion.div
          className="absolute top-12 w-full h-16 rounded-t-lg shadow-lg"
          style={{ 
            backgroundColor: accentColor,
            transformOrigin: 'top center',
            perspective: '1000px'
          }}
          animate={isOpening ? { 
            rotateX: -120,
            y: -50,
            opacity: 0
          } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-full rounded-t-lg"
            style={{ backgroundColor: `${accentColor}dd` }}
          />
        </motion.div>

        {/* Ribbon Bow */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          animate={isUntying ? { 
            scale: [1, 1.2, 0],
            rotate: [0, 180, 360],
            y: [0, -30, -60]
          } : {}}
          transition={{ duration: 1 }}
        >
          {/* Bow Loops */}
          <div className="relative">
            <motion.div
              className="absolute -left-10 top-2 w-12 h-8 rounded-full"
              style={{ backgroundColor: '#ffd700' }}
              animate={isUntying ? { x: -20, opacity: 0 } : {}}
            />
            <motion.div
              className="absolute -right-10 top-2 w-12 h-8 rounded-full"
              style={{ backgroundColor: '#ffd700' }}
              animate={isUntying ? { x: 20, opacity: 0 } : {}}
            />
            {/* Bow Center */}
            <div 
              className="relative w-8 h-8 rounded-full z-10"
              style={{ backgroundColor: '#ffc800' }}
            />
            {/* Ribbon Tails */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-6 w-4 h-16"
              style={{ backgroundColor: '#ffd700' }}
              animate={isUntying ? { height: 0, opacity: 0 } : {}}
            />
          </div>
        </motion.div>

        {/* Tag */}
        <motion.div
          className="absolute -right-4 top-20 bg-white rounded-lg shadow-lg p-3 rotate-12"
          animate={isOpening ? { opacity: 0, x: 20 } : {}}
        >
          <p className="text-xs text-gray-500">Untuk:</p>
          <p className="text-sm font-medium text-gray-800">{recipientName}</p>
        </motion.div>

        {/* Sparkles when opening */}
        <AnimatePresence>
          {isOpening && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{ backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'][i % 4] }}
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{
                    x: Math.cos((i * 45 * Math.PI) / 180) * 100,
                    y: Math.sin((i * 45 * Math.PI) / 180) * 100 - 50,
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!isUntying && (
          <motion.p
            className="absolute -bottom-10 left-0 right-0 text-center text-sm text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap untuk membuka kado 🎁
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
