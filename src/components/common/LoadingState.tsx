import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message, className = '' }) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const displayMessage = message || t.common.loading;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-12 text-center select-none ${className}`}
    >
      <div className="relative w-16 h-16 mb-4">
        {/* Outer glowing ring */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-brand-gold/40"
        />

        {/* Central Luminous Diya Flame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.svg
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.12, 1],
                    opacity: [0.8, 1, 0.8],
                  }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            viewBox="0 0 32 32"
            fill="none"
            className="w-8 h-8 text-brand-gold drop-shadow-sm"
          >
            {/* Diya Base */}
            <path
              d="M7 20C7 24.5 11 26.5 16 26.5C21 26.5 25 24.5 25 20C25 19.5 24.5 19 24 19C20 19.8 12 19.8 8 19C7.5 19 7 19.5 7 20Z"
              fill="#D4AF37"
            />
            {/* Flame */}
            <path
              d="M16 6C16 6 12.5 12 12.5 15C12.5 16.9 14.1 18.5 16 18.5C17.9 18.5 19.5 16.9 19.5 15C19.5 12 16 6 16 6Z"
              fill="#F2D98B"
            />
          </motion.svg>
        </div>
      </div>

      <p className="font-display text-sm tracking-widest-luxury uppercase text-brand-deep font-semibold">
        {displayMessage}
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
};

