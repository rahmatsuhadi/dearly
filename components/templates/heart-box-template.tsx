'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartBoxTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

export function HeartBoxTemplate({ recipientName, accentColor, onOpen }: HeartBoxTemplateProps) {
  const [isPulsing, setIsPulsing] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);

  const handleClick = () => {
    if (!isOpening) {
      setIsPulsing(false);
      setIsOpening(true);
      // Create floating hearts
      setFloatingHearts(Array.from({ length: 15 }, (_, i) => i));
      setTimeout(onOpen, 2000);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Glowing Background */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}30` }}
          animate={isPulsing ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Heart Container */}
        <motion.div
          className="relative"
          animate={isPulsing ? {
            scale: [1, 1.05, 1],
          } : isOpening ? {
            scale: [1, 1.2, 0],
            rotate: [0, 0, 360],
          } : {}}
          transition={isPulsing ? { duration: 1, repeat: Infinity } : { duration: 2 }}
        >
          {/* Heart Shape using CSS */}
          <div 
            className="relative w-48 h-44"
            style={{ filter: `drop-shadow(0 10px 30px ${accentColor}60)` }}
          >
            {/* Left half of heart */}
            <motion.div
              className="absolute top-0 left-0 w-24 h-40 rounded-tl-full rounded-tr-full origin-bottom-right"
              style={{ 
                backgroundColor: accentColor,
                transform: 'rotate(-45deg) translateX(12px) translateY(-10px)',
              }}
              animate={isOpening ? { rotateZ: -90, x: -50, opacity: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            {/* Right half of heart */}
            <motion.div
              className="absolute top-0 right-0 w-24 h-40 rounded-tl-full rounded-tr-full origin-bottom-left"
              style={{ 
                backgroundColor: accentColor,
                transform: 'rotate(45deg) translateX(-12px) translateY(-10px)',
              }}
              animate={isOpening ? { rotateZ: 90, x: 50, opacity: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Inner Glow */}
            <div 
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-xl"
              style={{ backgroundColor: 'white', opacity: 0.3 }}
            />

            {/* Heart Icon in center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={isPulsing ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >
              <Heart className="w-12 h-12 text-white fill-white drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Hearts on Open */}
        <AnimatePresence>
          {floatingHearts.map((i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 1 
              }}
              animate={{
                x: (Math.random() - 0.5) * 300,
                y: -200 - Math.random() * 100,
                scale: [0, 1 + Math.random() * 0.5, 0],
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.08,
                ease: 'easeOut'
              }}
            >
              <Heart 
                className="w-6 h-6 fill-current"
                style={{ color: i % 2 === 0 ? accentColor : '#ff6b8a' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Name Tag */}
        <motion.div
          className="absolute -bottom-4 bg-white rounded-full px-6 py-2 shadow-lg"
          animate={isOpening ? { y: 20, opacity: 0 } : {}}
        >
          <p className="text-sm text-gray-600">
            Untuk <span className="font-semibold" style={{ color: accentColor }}>{recipientName}</span>
          </p>
        </motion.div>

        {/* Hint */}
        {!isOpening && (
          <motion.p
            className="absolute -bottom-16 left-0 right-0 text-center text-sm text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap untuk membuka hati 💕
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
