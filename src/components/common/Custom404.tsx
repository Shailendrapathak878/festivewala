import React from 'react';
import { PrimaryButton } from './PrimaryButton';
import { useLanguage } from '../../hooks/useLanguage';
import { Home } from 'lucide-react';

export const Custom404: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        {/* Sacred Arch Motif */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-brand-gold">
            <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <path
              d="M25 65C25 40 36 24 50 16C64 24 75 40 75 65"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="50" r="8" fill="#F2D98B" opacity="0.8" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest-luxury font-bold text-brand-gold">
            404
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-deep">
            {t.common.pageNotFound}
          </h1>
          <p className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed">
            {t.common.pageNotFoundDesc}
          </p>
        </div>

        <div className="pt-2">
          <PrimaryButton to="/" size="md" variant="royal" icon={<Home size={16} />}>
            {t.common.backHome}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

