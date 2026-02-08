'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BalloonTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const BALLOON_COLORS = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

export function BalloonTemplate({ recipientName, accentColor, onOpen }: BalloonTemplateProps) {
  const [balloons, setBalloons] = useState<Balloon[]>([
    { id: 0, x: -80, color: BALLOON_COLORS[0], delay: 0, size: 1 },
    { id: 1, x: -40, color: BALLOON_COLORS[1], delay: 0.1, size: 0.9 },
    { id: 2, x: 0, color: accentColor, delay: 0.05, size: 1.1 },
    { id: 3, x: 40, color: BALLOON_COLORS[3], delay: 0.15, size: 0.95 },
    { id: 4, x: 80, color: BALLOON_COLORS[4], delay: 0.08, size: 1 },
  ]);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  const popBalloon = (id: number, x: number) => {
    if (poppedBalloons.includes(id)) return;
    
    setPoppedBalloons(prev => [...prev, id]);
    
    // Create confetti at balloon position
    const newConfetti = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 50,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    }));
    setConfetti(prev => [...prev, ...newConfetti]);

    // Check if all balloons are popped
    if (poppedBalloons.length + 1 === balloons.length) {
      setShowMessage(true);
      setTimeout(onOpen, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-96 h-[450px]"
    >
      {/* Background Card */}
      <motion.div
        className="absolute inset-x-8 top-32 bottom-8 rounded-2xl shadow-xl overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
          border: `2px dashed ${accentColor}40`
        }}
      >
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <AnimatePresence>
            {showMessage ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="text-5xl mb-4"
                >
                  🎉
                </motion.div>
                <p className="text-lg font-display font-semibold" style={{ color: accentColor }}>
                  Selamat {recipientName}!
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Pesanmu sudah siap...
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 text-sm">
                  Pop semua balon! 🎈
                </p>
                <p className="text-gray-300 text-xs mt-2">
                  ({balloons.length - poppedBalloons.length} tersisa)
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Balloons */}
      {balloons.map((balloon) => (
        <AnimatePresence key={balloon.id}>
          {!poppedBalloons.includes(balloon.id) && (
            <motion.div
              className="absolute top-20 left-1/2 cursor-pointer"
              style={{ x: balloon.x }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: [0, -10, 0],
                opacity: 1,
              }}
              exit={{ 
                scale: [1, 1.3, 0],
                opacity: 0,
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, delay: balloon.delay },
                opacity: { duration: 0.3 },
              }}
              onClick={() => popBalloon(balloon.id, balloon.x)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Balloon */}
              <motion.div
                className="relative"
                style={{ transform: `scale(${balloon.size})` }}
              >
                {/* Balloon body */}
                <div 
                  className="w-16 h-20 rounded-full shadow-lg relative"
                  style={{ 
                    background: `radial-gradient(circle at 30% 30%, ${balloon.color}dd, ${balloon.color})`,
                  }}
                >
                  {/* Shine */}
                  <div className="absolute top-3 left-3 w-4 h-6 bg-white/40 rounded-full blur-sm" />
                </div>
                
                {/* Balloon knot */}
                <div 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                  style={{ backgroundColor: balloon.color }}
                />
                
                {/* String */}
                <motion.div
                  className="absolute top-full left-1/2 w-0.5 h-20 bg-gray-300"
                  style={{ transformOrigin: 'top' }}
                  animate={{ rotateZ: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute top-32 left-1/2 w-2 h-2 rounded-full pointer-events-none"
            style={{ backgroundColor: piece.color }}
            initial={{ x: piece.x, y: piece.y, scale: 1 }}
            animate={{
              y: piece.y + 200,
              x: piece.x + (Math.random() - 0.5) * 100,
              rotate: Math.random() * 720,
              opacity: 0,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Name Tag */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-2 shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-600">
          Untuk <span className="font-semibold" style={{ color: accentColor }}>{recipientName}</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
