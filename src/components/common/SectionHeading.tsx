import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightText,
  subtitle,
  align = 'center',
  className = '',
  light = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-2 sm:space-y-3 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-xl'} ${className}`}>
      {/* Eyebrow Label */}
      {badge && (
        <div className={`inline-flex items-center gap-1.5 sm:gap-2 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="w-4 sm:w-6 h-[1px] bg-brand-gold/60" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest-luxury font-bold text-brand-gold">
            {badge}
          </span>
          <span className="w-4 sm:w-6 h-[1px] bg-brand-gold/60" aria-hidden="true" />
        </div>
      )}

      {/* Main Heading */}
      <h2
        className={`font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2] ${
          light ? 'text-brand-white' : 'text-brand-deep'
        }`}
      >
        {title}{' '}
        {highlightText && (
          <span className="text-gold-gradient font-serif italic font-normal">
            {highlightText}
          </span>
        )}
      </h2>

      {/* Elegant Subtitle */}
      {subtitle && (
        <p
          className={`font-sans text-xs sm:text-sm md:text-base leading-relaxed ${
            light ? 'text-brand-champagne/80' : 'text-brand-dark/75'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}

      {/* Subtle Motif Flourish Divider */}
      <div className={`pt-1 sm:pt-2 flex items-center gap-2 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
        <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-brand-gold opacity-70">
          <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="8" cy="8" r="2" fill="#D4AF37" />
        </svg>
        <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      </div>
    </div>
  );
};
