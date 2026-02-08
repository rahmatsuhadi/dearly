'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

interface StarCollectorTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

interface StarItem {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  size: number;
  delay: number;
}

export function StarCollectorTemplate({ recipientName, accentColor, onOpen }: StarCollectorTemplateProps) {
  const [stars, setStars] = useState<StarItem[]>([
    { id: 1, x: 15, y: 15, collected: false, size: 1.2, delay: 0 },
    { id: 2, x: 75, y: 20, collected: false, size: 1, delay: 0.2 },
    { id: 3, x: 45, y: 8, collected: false, size: 0.9, delay: 0.4 },
    { id: 4, x: 25, y: 45, collected: false, size: 1.1, delay: 0.1 },
    { id: 5, x: 70, y: 50, collected: false, size: 1, delay: 0.3 },
    { id: 6, x: 50, y: 35, collected: false, size: 1.3, delay: 0.5 },
  ]);
  const [collectedStars, setCollectedStars] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ id: number }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showMagic, setShowMagic] = useState(false);

  const collectStar = useCallback((star: StarItem) => {
    if (star.collected) return;

    // Add to collected animation
    setCollectedStars(prev => [...prev, { id: Date.now(), x: star.x, y: star.y }]);

    // Create shooting star effect
    setShootingStars(prev => [...prev, { id: Date.now() }]);

    setStars(prev => prev.map(s => 
      s.id === star.id ? { ...s, collected: true } : s
    ));
  }, []);

  useEffect(() => {
    const allCollected = stars.every(s => s.collected);
    if (allCollected && !isComplete) {
      setIsComplete(true);
      setTimeout(() => setShowMagic(true), 500);
      setTimeout(onOpen, 2500);
    }
  }, [stars, isComplete, onOpen]);

  const collectedCount = stars.filter(s => s.collected).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-96 h-[450px] overflow-hidden"
    >
      {/* Starry Background */}
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        }}
      >
        {/* Background stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Shooting Stars Effect */}
      <AnimatePresence>
        {shootingStars.map((ss) => (
          <motion.div
            key={ss.id}
            className="absolute w-1 h-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, white, transparent)',
              left: `${20 + Math.random() * 60}%`,
              top: 0,
              rotate: 45,
            }}
            initial={{ y: -50, opacity: 1 }}
            animate={{ y: 500, opacity: 0 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => 
              setShootingStars(prev => prev.filter(s => s.id !== ss.id))
            }
          />
        ))}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        className="relative text-center pt-6 z-10"
        animate={{ opacity: isComplete ? 0 : 1 }}
      >
        <p className="text-lg font-display font-semibold text-white">
          Kumpulkan semua bintang! ⭐
        </p>
        <p className="text-sm text-white/70">
          {collectedCount}/{stars.length} bintang terkumpul
        </p>
        
        {/* Star Progress */}
        <div className="flex justify-center gap-2 mt-3">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="w-4 h-4"
              animate={star.collected ? { scale: [1, 1.3, 1] } : {}}
            >
              <Star 
                className="w-full h-full"
                style={{ 
                  color: star.collected ? '#ffd700' : '#555',
                  fill: star.collected ? '#ffd700' : 'transparent'
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Collectible Stars */}
      {stars.map((star) => (
        <AnimatePresence key={star.id}>
          {!star.collected && (
            <motion.div
              className="absolute cursor-pointer z-10"
              style={{ 
                left: `${star.x}%`, 
                top: `${star.y + 20}%`,
                scale: star.size
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: star.size,
                rotate: 0,
                y: [0, -10, 0]
              }}
              exit={{ 
                scale: 0,
                y: -50,
                opacity: 0
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, delay: star.delay },
                scale: { duration: 0.3 }
              }}
              whileHover={{ scale: star.size * 1.3 }}
              whileTap={{ scale: star.size * 0.8 }}
              onClick={() => collectStar(star)}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Star 
                  className="w-12 h-12 text-yellow-300 drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }}
                  fill="#ffd700"
                />
              </motion.div>
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl -z-10"
                style={{ backgroundColor: '#ffd700' }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Collected Star Animations */}
      <AnimatePresence>
        {collectedStars.map((cs) => (
          <motion.div
            key={cs.id}
            className="absolute pointer-events-none z-20"
            style={{ left: `${cs.x}%`, top: `${cs.y + 20}%` }}
            initial={{ scale: 1 }}
            animate={{ 
              scale: 0,
              y: -100,
              x: 0,
              opacity: 0
            }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => 
              setCollectedStars(prev => prev.filter(c => c.id !== cs.id))
            }
          >
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Magic Reveal */}
      <AnimatePresence>
        {showMagic && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <Sparkles className="w-16 h-16 mx-auto text-yellow-300" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' }} />
              </motion.div>
              <motion.p
                className="text-2xl font-display font-bold text-white"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ✨ Kamu mendapatkan pesan spesial! ✨
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moon Decoration */}
      <motion.div
        className="absolute top-20 right-8 w-16 h-16 rounded-full z-0"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fffde7, #ffd54f)',
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Name Tag */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10"
        animate={{ opacity: isComplete ? 0 : 1 }}
      >
        <p className="text-sm text-white/70">Untuk:</p>
        <p className="text-xl font-display font-semibold text-white">
          {recipientName}
        </p>
      </motion.div>
    </motion.div>
  );
}
