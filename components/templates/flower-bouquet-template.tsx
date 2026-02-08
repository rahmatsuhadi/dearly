'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FlowerBouquetTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

interface Petal {
  id: number;
  angle: number;
  picked: boolean;
}

export function FlowerBouquetTemplate({ recipientName, accentColor, onOpen }: FlowerBouquetTemplateProps) {
  const [petals, setPetals] = useState<Petal[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: i * 45,
      picked: false,
    }))
  );
  const [fallingPetals, setFallingPetals] = useState<Array<{ id: number; x: number; rotation: number }>>([]);
  const [message, setMessage] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const messages = [
    'Sayang... 💕',
    'Sayang tidak? 🤔',
    'Sayang... 💕',
    'Sayang tidak? 🤔',
    'Sayang... 💕',
    'Sayang tidak? 🤔',
    'Sayang... 💕',
    'SANGAT SAYANG! 💖',
  ];

  const pickPetal = useCallback((id: number) => {
    const petal = petals.find(p => p.id === id);
    if (!petal || petal.picked) return;

    const pickedCount = petals.filter(p => p.picked).length;
    setMessage(messages[pickedCount]);

    // Add falling petal animation
    setFallingPetals(prev => [...prev, {
      id: Date.now(),
      x: Math.random() * 60 + 20,
      rotation: Math.random() * 360,
    }]);

    setPetals(prev => prev.map(p => 
      p.id === id ? { ...p, picked: true } : p
    ));
  }, [petals, messages]);

  useEffect(() => {
    const allPicked = petals.every(p => p.picked);
    if (allPicked && !isComplete) {
      setIsComplete(true);
      setTimeout(() => setShowHeart(true), 500);
      setTimeout(onOpen, 2500);
    }
  }, [petals, isComplete, onOpen]);

  const remainingPetals = petals.filter(p => !p.picked).length;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="relative w-80 h-[450px]"
    >
      {/* Falling Petals */}
      <AnimatePresence>
        {fallingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute pointer-events-none"
            style={{ left: `${petal.x}%`, top: '40%' }}
            initial={{ y: 0, rotate: 0, opacity: 1 }}
            animate={{ 
              y: 200,
              rotate: petal.rotation,
              x: [0, 20, -20, 10, 0],
              opacity: 0
            }}
            transition={{ duration: 2, ease: 'easeIn' }}
            onAnimationComplete={() => 
              setFallingPetals(prev => prev.filter(p => p.id !== petal.id))
            }
          >
            <div 
              className="w-8 h-10 rounded-full"
              style={{ 
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        className="text-center mb-4"
        animate={{ opacity: isComplete ? 0 : 1 }}
      >
        <p className="text-lg font-display font-semibold text-pink-700">
          Petik kelopak bunganya! 🌸
        </p>
        <p className="text-sm text-pink-500">
          {remainingPetals} kelopak tersisa
        </p>
      </motion.div>

      {/* Message Display */}
      <motion.div
        className="text-center h-12 mb-4"
        animate={{ scale: message ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xl font-display font-bold text-pink-600">
          {message}
        </p>
      </motion.div>

      {/* Flower */}
      <div className="relative flex justify-center">
        <div className="relative w-48 h-48">
          {/* Petals */}
          {petals.map((petal) => (
            <AnimatePresence key={petal.id}>
              {!petal.picked && (
                <motion.div
                  className="absolute top-1/2 left-1/2 origin-bottom cursor-pointer"
                  style={{ 
                    rotate: petal.angle,
                    translateX: '-50%',
                    translateY: '-100%',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ 
                    scale: 0,
                    y: -20,
                    opacity: 0,
                    rotate: petal.angle + 45
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => pickPetal(petal.id)}
                >
                  <motion.div
                    className="w-12 h-20 rounded-full"
                    style={{ 
                      background: `linear-gradient(to top, ${accentColor}dd, ${accentColor})`,
                      boxShadow: `0 4px 15px ${accentColor}40`
                    }}
                    animate={{ 
                      y: [0, -2, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      delay: petal.id * 0.1,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {/* Center of flower */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full z-10"
            style={{ 
              background: 'linear-gradient(135deg, #ffd700, #ffb347)',
              boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
            }}
            animate={isComplete ? { scale: [1, 1.2, 0] } : { scale: [1, 1.05, 1] }}
            transition={{ duration: isComplete ? 0.5 : 2, repeat: isComplete ? 0 : Infinity }}
          >
            <div className="absolute inset-2 rounded-full bg-yellow-400/50" />
          </motion.div>

          {/* Heart appears when complete */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Heart 
                    className="w-20 h-20" 
                    style={{ color: accentColor, fill: accentColor }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stem */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-32 rounded-b-full bg-gradient-to-b from-green-500 to-green-700" />
        
        {/* Leaves */}
        <motion.div
          className="absolute top-[60%] left-1/2 -translate-x-[120%] w-12 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 origin-right"
          style={{ rotate: -30 }}
          animate={{ rotate: [-30, -25, -30] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[70%] left-1/2 translate-x-[20%] w-10 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 origin-left"
          style={{ rotate: 25 }}
          animate={{ rotate: [25, 30, 25] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Name Tag */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg"
        animate={{ opacity: isComplete ? 0 : 1 }}
      >
        <p className="text-sm text-pink-500">Untuk:</p>
        <p className="text-lg font-display font-semibold" style={{ color: accentColor }}>
          {recipientName}
        </p>
      </motion.div>
    </motion.div>
  );
}
