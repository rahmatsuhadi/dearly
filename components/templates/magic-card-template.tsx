'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

interface MagicCardTemplateProps {
  recipientName: string;
  accentColor: string;
  onOpen: () => void;
}

export function MagicCardTemplate({ recipientName, accentColor, onOpen }: MagicCardTemplateProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = () => {
    if (!isOpening) {
      // Create sparkle explosion
      const newSparkles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
      }));
      setSparkles(newSparkles);
      setIsOpening(true);
      setTimeout(onOpen, 1500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (Math.random() > 0.7 && isHovering) {
      setSparkles(prev => [...prev.slice(-10), { 
        id: Date.now(), 
        x: x - 150, 
        y: y - 100 
      }]);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      exit={{ scale: 0, opacity: 0, rotateY: -180 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="cursor-pointer perspective-1000"
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-72 h-96">
        {/* Magic Aura */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{ background: `radial-gradient(circle, ${accentColor}40, transparent)` }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Card */}
        <motion.div
          className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
          }}
          animate={isOpening ? {
            scale: [1, 1.1, 0],
            rotateY: [0, 180, 360],
            opacity: [1, 1, 0],
          } : {
            rotateY: isHovering ? 5 : 0,
            rotateX: isHovering ? -5 : 0,
          }}
          transition={isOpening ? { duration: 1.5 } : { duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Magical Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30l15-15v30L30 30zm0 0L15 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Stars decoration */}
          <motion.div
            className="absolute top-6 left-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-8 h-8 text-white/60 fill-white/30" />
          </motion.div>
          <motion.div
            className="absolute top-10 right-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-6 h-6 text-white/60 fill-white/30" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <Star className="w-5 h-5 text-white/60 fill-white/30" />
          </motion.div>

          {/* Center Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,255,255,0.3)',
                  '0 0 40px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          {/* Recipient Name */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white/70 text-sm mb-1">Untuk ✨</p>
            <p className="text-white text-xl font-display font-semibold">{recipientName}</p>
          </div>
        </motion.div>

        {/* Floating Sparkles */}
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: sparkle.x,
                y: sparkle.y,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hint */}
        {!isOpening && (
          <motion.p
            className="absolute -bottom-10 left-0 right-0 text-center text-sm text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap untuk keajaiban ✨
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
