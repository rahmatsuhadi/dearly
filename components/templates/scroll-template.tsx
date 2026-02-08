'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

export function ScrollTemplate({ recipientName, accentColor, onOpen }: ScrollTemplateProps) {
  const [isUnrolling, setIsUnrolling] = useState(false);

  const handleClick = () => {
    if (!isUnrolling) {
      setIsUnrolling(true);
      setTimeout(onOpen, 2000);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-80 h-96 flex items-center justify-center">
        {/* Scroll Container */}
        <div className="relative">
          {/* Top Roll */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
            animate={isUnrolling ? { y: -150, opacity: 0 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div 
              className="w-72 h-12 rounded-full shadow-lg"
              style={{ 
                background: `linear-gradient(180deg, #8B4513 0%, #654321 50%, #8B4513 100%)`,
              }}
            />
            {/* Roll ends */}
            <div 
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-14 rounded-full"
              style={{ backgroundColor: '#5D3A1A' }}
            />
            <div 
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-14 rounded-full"
              style={{ backgroundColor: '#5D3A1A' }}
            />
          </motion.div>

          {/* Scroll Paper */}
          <motion.div
            className="relative w-64 overflow-hidden rounded-lg shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #f5e6d3 0%, #ede0d4 50%, #e6d5c3 100%)',
              height: isUnrolling ? 'auto' : '60px'
            }}
            animate={isUnrolling ? { height: 350 } : { height: 60 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            {/* Decorative Border */}
            <div 
              className="absolute inset-2 rounded border-2 pointer-events-none"
              style={{ borderColor: `${accentColor}40` }}
            />

            {/* Wax Seal */}
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
              animate={isUnrolling ? { 
                scale: [1, 1.2, 0],
                rotate: [0, 180, 360],
                y: [0, -20, -50]
              } : {}}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                <span className="text-white text-2xl">♥</span>
              </div>
              {/* Wax drips */}
              <div 
                className="absolute -bottom-2 left-2 w-3 h-4 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <div 
                className="absolute -bottom-1 right-3 w-2 h-3 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </motion.div>

            {/* Content (revealed when unrolling) */}
            <motion.div
              className="pt-24 pb-8 px-6 text-center"
              initial={{ opacity: 0 }}
              animate={isUnrolling ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-amber-800/60 text-sm italic mb-2">Kepada yang terhormat</p>
              <p 
                className="text-xl font-display font-semibold mb-4"
                style={{ color: accentColor }}
              >
                {recipientName}
              </p>
              
              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-2 my-4">
                <div className="w-12 h-px bg-amber-800/30" />
                <span style={{ color: accentColor }}>✦</span>
                <div className="w-12 h-px bg-amber-800/30" />
              </div>

              <p className="text-amber-800/70 text-sm leading-relaxed">
                Sebuah pesan spesial telah disiapkan untukmu...
              </p>

              {/* Quill decoration */}
              <motion.div
                className="absolute bottom-4 right-4 text-2xl"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🪶
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Roll */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
            animate={isUnrolling ? { y: 150, opacity: 0 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div 
              className="w-72 h-12 rounded-full shadow-lg"
              style={{ 
                background: `linear-gradient(180deg, #8B4513 0%, #654321 50%, #8B4513 100%)`,
              }}
            />
            <div 
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-14 rounded-full"
              style={{ backgroundColor: '#5D3A1A' }}
            />
            <div 
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-14 rounded-full"
              style={{ backgroundColor: '#5D3A1A' }}
            />
          </motion.div>
        </div>

        {/* Hint */}
        {!isUnrolling && (
          <motion.p
            className="absolute -bottom-8 left-0 right-0 text-center text-sm text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap untuk membuka gulungan 📜
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
