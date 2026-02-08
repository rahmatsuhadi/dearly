'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

interface BirthdayCakeTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

interface Candle {
  id: number;
  x: number;
  isLit: boolean;
  height: number;
}

export function BirthdayCakeTemplate({ recipientName, accentColor, onOpen }: BirthdayCakeTemplateProps) {
  const [candles, setCandles] = useState<Candle[]>([
    { id: 1, x: 20, isLit: true, height: 35 },
    { id: 2, x: 35, isLit: true, height: 40 },
    { id: 3, x: 50, isLit: true, height: 45 },
    { id: 4, x: 65, isLit: true, height: 40 },
    { id: 5, x: 80, isLit: true, height: 35 },
  ]);
  const [showSmoke, setShowSmoke] = useState<number[]>([]);
  const [allBlown, setAllBlown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  const blowCandle = (id: number) => {
    const candle = candles.find(c => c.id === id);
    if (!candle?.isLit) return;

    // Show smoke effect
    setShowSmoke(prev => [...prev, id]);
    setTimeout(() => setShowSmoke(prev => prev.filter(s => s !== id)), 1500);

    // Blow out candle
    setCandles(prev => prev.map(c => 
      c.id === id ? { ...c, isLit: false } : c
    ));
  };

  useEffect(() => {
    const litCandles = candles.filter(c => c.isLit).length;
    if (litCandles === 0 && !allBlown) {
      setAllBlown(true);
      // Create confetti
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.5,
      }));
      setConfetti(newConfetti);
      
      setTimeout(() => setShowCelebration(true), 500);
      setTimeout(onOpen, 2500);
    }
  }, [candles, allBlown, onOpen]);

  const litCount = candles.filter(c => c.isLit).length;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: -100 }}
      className="relative"
    >
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm pointer-events-none"
            style={{ backgroundColor: piece.color, left: `${piece.x}%`, top: 0 }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: 400, opacity: 0, rotate: 720 }}
            transition={{ duration: 2, delay: piece.delay }}
          />
        ))}
      </AnimatePresence>

      <div className="relative w-80">
        {/* Instructions */}
        <motion.div
          className="text-center mb-4"
          animate={{ opacity: allBlown ? 0 : 1 }}
        >
          <p className="text-lg font-display font-semibold text-gray-700">
            Tiup lilinnya! 🎂
          </p>
          <p className="text-sm text-gray-500">
            Klik setiap lilin ({litCount} tersisa)
          </p>
        </motion.div>

        {/* Celebration Text */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-16 left-0 right-0 text-center z-20"
            >
              <motion.p
                className="text-3xl font-display font-bold"
                style={{ color: accentColor }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                🎉 Happy Birthday! 🎉
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake Container */}
        <div className="relative">
          {/* Candles */}
          <div className="absolute -top-16 left-0 right-0 flex justify-center">
            {candles.map((candle) => (
              <motion.div
                key={candle.id}
                className="relative cursor-pointer mx-2"
                style={{ left: `${candle.x - 50}%` }}
                onClick={() => blowCandle(candle.id)}
                whileHover={candle.isLit ? { scale: 1.1 } : {}}
                whileTap={candle.isLit ? { scale: 0.9 } : {}}
              >
                {/* Candle Stick */}
                <div 
                  className="w-3 rounded-t-sm mx-auto"
                  style={{ 
                    height: candle.height,
                    background: 'linear-gradient(to right, #ffd93d, #ffb347, #ffd93d)',
                  }}
                />
                
                {/* Flame */}
                <AnimatePresence>
                  {candle.isLit && (
                    <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [-5, 5, -5],
                      }}
                      exit={{ scale: 0, y: -10, opacity: 0 }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    >
                      <Flame className="w-5 h-5 text-orange-500 fill-yellow-400 drop-shadow-lg" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smoke */}
                <AnimatePresence>
                  {showSmoke.includes(candle.id) && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute -top-8 left-1/2 w-2 h-2 rounded-full bg-gray-300"
                          initial={{ y: 0, x: 0, opacity: 0.8, scale: 0.5 }}
                          animate={{ 
                            y: -30 - i * 10, 
                            x: (i - 1) * 10,
                            opacity: 0,
                            scale: 1.5
                          }}
                          transition={{ duration: 1, delay: i * 0.15 }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="relative pt-8">
            {/* Top Layer - Frosting */}
            <motion.div
              className="relative mx-auto w-48 h-8 rounded-t-3xl"
              style={{ backgroundColor: '#ffc0cb' }}
              animate={allBlown ? { y: -20 } : {}}
              transition={{ delay: 0.3 }}
            >
              {/* Frosting Drips */}
              <div className="absolute -bottom-3 left-4 w-4 h-6 rounded-b-full" style={{ backgroundColor: '#ffc0cb' }} />
              <div className="absolute -bottom-4 left-12 w-3 h-7 rounded-b-full" style={{ backgroundColor: '#ffc0cb' }} />
              <div className="absolute -bottom-2 right-8 w-4 h-5 rounded-b-full" style={{ backgroundColor: '#ffc0cb' }} />
              <div className="absolute -bottom-3 right-16 w-3 h-6 rounded-b-full" style={{ backgroundColor: '#ffc0cb' }} />
            </motion.div>

            {/* Top Cake Layer */}
            <motion.div
              className="relative mx-auto w-52 h-16 -mt-2"
              style={{ backgroundColor: '#deb887' }}
              animate={allBlown ? { y: -15 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-x-2 top-2 bottom-2 rounded" style={{ backgroundColor: '#d2b48c' }} />
            </motion.div>

            {/* Middle Frosting */}
            <motion.div
              className="relative mx-auto w-60 h-4 -mt-1"
              style={{ backgroundColor: '#fff5e6' }}
              animate={allBlown ? { y: -10 } : {}}
              transition={{ delay: 0.5 }}
            />

            {/* Bottom Cake Layer */}
            <motion.div
              className="relative mx-auto w-64 h-20 rounded-b-lg"
              style={{ backgroundColor: '#deb887' }}
              animate={allBlown ? { y: -5 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute inset-x-2 top-2 bottom-2 rounded-b" style={{ backgroundColor: '#d2b48c' }} />
              {/* Decorations */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
                {['🍓', '🍫', '🍓', '🍫', '🍓'].map((emoji, i) => (
                  <span key={i} className="text-lg">{emoji}</span>
                ))}
              </div>
            </motion.div>

            {/* Cake Plate */}
            <div className="mx-auto w-72 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-lg shadow-lg" />
          </div>
        </div>

        {/* Name Tag */}
        <motion.div
          className="mt-6 text-center"
          animate={{ opacity: allBlown ? 0 : 1 }}
        >
          <p className="text-sm text-gray-500">Untuk:</p>
          <p className="text-xl font-display font-semibold" style={{ color: accentColor }}>
            {recipientName}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
