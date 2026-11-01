import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import type { SupportedLanguage } from '../../i18n/types';
import { Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'light',
}) => {
  const { language, setLanguage, t } = useLanguage();

  const isDark = variant === 'dark';

  const LANGUAGES: Array<{ id: SupportedLanguage; label: string }> = [
    { id: 'en', label: 'EN' },
    { id: 'hi', label: 'हिन्दी' },
    { id: 'hinglish', label: 'Hinglish' },
  ];

  const getPillLeft = () => {
    if (language === 'en') return '0%';
    if (language === 'hi') return '33.333%';
    return '66.666%';
  };

  return (
    <div
      role="group"
      aria-label={t.nav.switchLanguage}
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-full border transition-all duration-300 ${
        isDark
          ? 'bg-brand-deep/80 border-brand-gold/30'
          : 'bg-white/90 border-brand-gold/25 shadow-sm'
      } ${className}`}
    >
      <div className="hidden xs:flex items-center pl-1.5 pr-1 text-brand-gold">
        <Languages size={13} className="opacity-80" aria-hidden="true" />
      </div>

      <div className="relative flex items-center">
        {LANGUAGES.map((item) => {
          const isActive = language === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setLanguage(item.id)}
              className={`relative z-10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold min-h-[28px] sm:min-h-[30px] flex items-center justify-center ${
                isActive
                  ? 'text-brand-deep font-bold'
                  : isDark
                  ? 'text-brand-champagne/60 hover:text-brand-champagne'
                  : 'text-brand-muted hover:text-brand-dark'
              }`}
              aria-pressed={isActive}
            >
              {item.label}
            </button>
          );
        })}

        {/* Sliding Gold Background Pill */}
        <motion.div
          className="absolute top-0 bottom-0 bg-gradient-to-r from-brand-champagne to-brand-gold rounded-full shadow-sm pointer-events-none"
          layout
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          style={{
            width: '33.333%',
            left: getPillLeft(),
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
