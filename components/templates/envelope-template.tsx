'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface EnvelopeTemplateProps {
  recipientName: string;
  accentColor: string;
  envelopeColor?: string;
  onOpen: () => void;
}

export function EnvelopeTemplate({ 
  recipientName, 
  accentColor, 
  envelopeColor = '#d4a574',
  onOpen 
}: EnvelopeTemplateProps) {
  const textColor = envelopeColor === '#ffffff' ? '#495057' : 'white';
  const flapColor = envelopeColor === '#ffffff' ? '#e9ecef' : `${envelopeColor}dd`;

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
        style={{ backgroundColor: envelopeColor }}
      >
        {/* Envelope Back */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(180deg, ${envelopeColor} 0%, ${
              envelopeColor === '#ffffff' ? '#f8f9fa' : `${envelopeColor}cc`
            } 100%)` 
          }}
        />
        
        {/* Envelope Flap */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-28"
          style={{
            background: `linear-gradient(180deg, ${flapColor} 0%, ${envelopeColor} 100%)`,
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transformOrigin: 'top center',
          }}
          animate={{ rotateX: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Heart Seal */}
        <motion.div 
          className="absolute top-16 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: accentColor }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-7 h-7 text-white fill-white" />
        </motion.div>

        {/* Decorative Lines */}
        <div className="absolute bottom-16 left-8 right-8 space-y-2 opacity-30">
          <div className="h-0.5 bg-current rounded" style={{ color: textColor }} />
          <div className="h-0.5 bg-current rounded w-3/4" style={{ color: textColor }} />
          <div className="h-0.5 bg-current rounded w-1/2" style={{ color: textColor }} />
        </div>

        {/* Recipient Name */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-sm opacity-70" style={{ color: textColor }}>Untuk:</p>
          <p className="text-lg font-handwriting font-medium" style={{ color: textColor }}>
            {recipientName}
          </p>
        </div>
      </div>

      {/* Hint */}
      <motion.p
        className="text-center text-sm text-gray-500 mt-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap untuk membuka surat
      </motion.p>
    </motion.div>
  );
}
