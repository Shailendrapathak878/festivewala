import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FestivalAtmosphereProps {
  festivalId: string;
  className?: string;
}

export const FestivalAtmosphere: React.FC<FestivalAtmosphereProps> = ({ festivalId, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  switch (festivalId) {
    case 'diwali':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
          {/* Subtle Ambient Diya Light Halo (Pulsing warm aura) */}
          <motion.div
            animate={{
              opacity: [0.18, 0.32, 0.18],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 to-[#E65100]/25 blur-3xl"
          />

          <motion.div
            animate={{
              opacity: [0.12, 0.24, 0.12],
              scale: [1.02, 0.98, 1.02],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute bottom-10 left-1/4 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-[#F2D98B]/20 blur-3xl"
          />

          {/* Delicate Shimmering Sparkles (Subtle, non-distracting) */}
          <motion.div
            animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 right-1/3 w-2 h-2 rounded-full bg-[#F2D98B] shadow-gold-glow"
          />
          <motion.div
            animate={{ opacity: [0.15, 0.75, 0.15], scale: [0.7, 1.15, 0.7] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="absolute bottom-20 right-1/5 w-1.5 h-1.5 rounded-full bg-[#F2D98B] shadow-gold-glow"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.85, 1.25, 0.85] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute top-1/2 left-16 w-2 h-2 rounded-full bg-[#F2D98B] shadow-gold-glow"
          />
        </div>
      );

    case 'holi':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
          {/* Controlled Subtle Gulal Pigment Clouds (Soft blurred watercolors) */}
          <motion.div
            animate={{
              y: [-6, 6, -6],
              x: [-4, 4, -4],
              opacity: [0.2, 0.32, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500/25 to-rose-400/20 blur-3xl"
          />
          <motion.div
            animate={{
              y: [6, -6, 6],
              x: [4, -4, 4],
              opacity: [0.18, 0.3, 0.18],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-4 left-8 w-64 h-64 rounded-full bg-gradient-to-tr from-amber-400/20 to-orange-400/20 blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/3 left-1/3 w-60 h-60 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/15 blur-3xl"
          />
        </div>
      );

    case 'raksha-bandhan':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
          {/* Subtle Sacred Thread & Auspicious Aura */}
          <motion.div
            animate={{
              opacity: [0.15, 0.28, 0.15],
              scale: [0.98, 1.03, 0.98],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-red-500/20 via-amber-400/20 to-brand-gold/25 blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-amber-200 shadow-sm"
          />
        </div>
      );

    case 'christmas':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
          {/* Soft Winter Aura */}
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-sky-200/10 blur-3xl" />

          {/* Lightweight CSS Falling Snowflakes (Pure hardware-accelerated CSS) */}
          <div className="snow-container absolute inset-0">
            {[
              { id: 1, left: '8%', delay: '0s', duration: '7s', size: '5px' },
              { id: 2, left: '18%', delay: '2s', duration: '9s', size: '3px' },
              { id: 3, left: '28%', delay: '4s', duration: '8s', size: '4px' },
              { id: 4, left: '38%', delay: '1s', duration: '10s', size: '3px' },
              { id: 5, left: '48%', delay: '3s', duration: '7.5s', size: '5px' },
              { id: 6, left: '58%', delay: '5s', duration: '9.5s', size: '4px' },
              { id: 7, left: '68%', delay: '2.5s', duration: '8s', size: '3px' },
              { id: 8, left: '78%', delay: '0.5s', duration: '11s', size: '4px' },
              { id: 9, left: '88%', delay: '3.5s', duration: '7s', size: '5px' },
              { id: 10, left: '94%', delay: '1.5s', duration: '9s', size: '3px' },
            ].map((flake) => (
              <span
                key={flake.id}
                className="absolute rounded-full bg-white/70 shadow-sm animate-snowfall"
                style={{
                  left: flake.left,
                  top: '-10px',
                  width: flake.size,
                  height: flake.size,
                  animationDelay: flake.delay,
                  animationDuration: flake.duration,
                }}
              />
            ))}
          </div>
        </div>
      );

    case 'new-year':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
          {/* Celebratory Golden Dawn Glow */}
          <motion.div
            animate={{
              opacity: [0.18, 0.32, 0.18],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 to-[#8B5CF6]/25 blur-3xl"
          />

          {/* Celebratory Starlight Shimmers */}
          <motion.div
            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.3, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="absolute top-24 left-1/4 w-2 h-2 rounded-full bg-[#F2D98B] shadow-gold-glow"
          />
          <motion.div
            animate={{ opacity: [0, 0.95, 0], scale: [0.5, 1.4, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-amber-100 shadow-gold-glow"
          />
          <motion.div
            animate={{ opacity: [0, 0.85, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
            className="absolute bottom-24 right-1/4 w-2 h-2 rounded-full bg-[#F2D98B] shadow-gold-glow"
          />
        </div>
      );

    default:
      return null;
  }
};

