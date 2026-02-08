'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Key } from 'lucide-react';

interface TreasureChestTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

interface KeyItem {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  rotation: number;
}

export function TreasureChestTemplate({ recipientName, accentColor, onOpen }: TreasureChestTemplateProps) {
  const [keys, setKeys] = useState<KeyItem[]>([
    { id: 1, x: 10, y: 20, collected: false, rotation: -30 },
    { id: 2, x: 75, y: 35, collected: false, rotation: 45 },
    { id: 3, x: 15, y: 70, collected: false, rotation: 15 },
    { id: 4, x: 80, y: 75, collected: false, rotation: -20 },
  ]);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const collectKey = (id: number) => {
    const key = keys.find(k => k.id === id);
    if (!key || key.collected) return;

    // Create sparkle at key position
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: key.x,
      y: key.y,
    }));
    setSparkles(prev => [...prev, ...newSparkles]);

    setKeys(prev => prev.map(k => 
      k.id === id ? { ...k, collected: true } : k
    ));
  };

  useEffect(() => {
    const allCollected = keys.every(k => k.collected);
    if (allCollected && !isUnlocking) {
      setIsUnlocking(true);
      setTimeout(() => setIsOpening(true), 1000);
      setTimeout(onOpen, 2500);
    }
  }, [keys, isUnlocking, onOpen]);

  const collectedCount = keys.filter(k => k.collected).length;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="relative w-96 h-[420px]"
    >
      {/* Floating Sparkles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
              y: -50
            }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => 
              setSparkles(prev => prev.filter(sp => sp.id !== s.id))
            }
          >
            <span className="text-2xl">✨</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        className="text-center mb-6"
        animate={{ opacity: isUnlocking ? 0 : 1 }}
      >
        <p className="text-lg font-display font-semibold text-amber-800">
          Temukan semua kunci! 🔑
        </p>
        <p className="text-sm text-amber-600">
          {collectedCount}/4 kunci terkumpul
        </p>
        {/* Progress Bar */}
        <div className="mt-2 mx-auto w-48 h-2 bg-amber-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400"
            initial={{ width: 0 }}
            animate={{ width: `${(collectedCount / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Keys scattered around */}
      {keys.map((key) => (
        <AnimatePresence key={key.id}>
          {!key.collected && (
            <motion.div
              className="absolute cursor-pointer z-10"
              style={{ left: `${key.x}%`, top: `${key.y}%` }}
              initial={{ scale: 0, rotate: key.rotation }}
              animate={{ 
                scale: 1, 
                rotate: key.rotation,
                y: [0, -5, 0]
              }}
              exit={{ scale: 0, rotate: key.rotation + 180 }}
              transition={{ 
                y: { duration: 2, repeat: Infinity },
                scale: { duration: 0.3 }
              }}
              whileHover={{ scale: 1.3, rotate: 0 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => collectKey(key.id)}
            >
              <div className="relative">
                <Key className="w-10 h-10 text-yellow-500 drop-shadow-lg" />
                <motion.div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ backgroundColor: '#ffd700' }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Treasure Chest */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="relative">
          {/* Chest Lid */}
          <motion.div
            className="relative w-48 h-20 rounded-t-3xl origin-bottom"
            style={{ 
              background: 'linear-gradient(135deg, #8B4513, #654321)',
              transformStyle: 'preserve-3d',
              perspective: '500px'
            }}
            animate={isOpening ? { 
              rotateX: -110,
              y: -30
            } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Lid Decorations */}
            <div className="absolute inset-2 rounded-t-2xl border-2 border-yellow-600/50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Lock */}
              <motion.div
                animate={isUnlocking ? { 
                  scale: [1, 1.2, 0],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <Lock className="w-8 h-8 text-yellow-500 drop-shadow-lg" />
              </motion.div>
            </div>
            {/* Metal Bands */}
            <div className="absolute top-3 left-0 right-0 h-2 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700" />
            <div className="absolute bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700" />
          </motion.div>

          {/* Chest Body */}
          <div 
            className="relative w-48 h-24 rounded-b-lg"
            style={{ background: 'linear-gradient(135deg, #654321, #8B4513)' }}
          >
            {/* Body Decorations */}
            <div className="absolute inset-2 rounded-b border-2 border-yellow-600/30" />
            <div className="absolute top-2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700" />
            
            {/* Glow when opening */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  className="absolute -inset-4 rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1, repeat: 2 }}
                  style={{ 
                    background: `radial-gradient(circle, ${accentColor}80, transparent 70%)` 
                  }}
                />
              )}
            </AnimatePresence>

            {/* Hearts coming out */}
            <AnimatePresence>
              {isOpening && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2"
                      initial={{ y: 0, x: 0, opacity: 1, scale: 0 }}
                      animate={{ 
                        y: -100 - i * 20,
                        x: (i % 2 === 0 ? 1 : -1) * (20 + i * 10),
                        opacity: [1, 1, 0],
                        scale: [0, 1, 0.5],
                        rotate: i * 45
                      }}
                      transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                    >
                      <Heart 
                        className="w-6 h-6" 
                        style={{ color: accentColor, fill: accentColor }} 
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Collected Keys Display */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
            {keys.map((key) => (
              <motion.div
                key={key.id}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: key.collected ? '#ffd700' : '#d4d4d4',
                  opacity: key.collected ? 1 : 0.5
                }}
                animate={key.collected ? { scale: [1, 1.2, 1] } : {}}
              >
                <Key className="w-3 h-3 text-amber-800" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Name Tag */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
        animate={{ opacity: isOpening ? 0 : 1 }}
      >
        <p className="text-sm text-amber-700">Untuk:</p>
        <p className="text-lg font-display font-semibold" style={{ color: accentColor }}>
          {recipientName}
        </p>
      </motion.div>
    </motion.div>
  );
}
