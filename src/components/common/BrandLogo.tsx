import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  linkToHome?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = '',
  linkToHome = true,
}) => {
  const { t, isHindi } = useLanguage();

  const sizeClasses = {
    sm: {
      icon: 'w-7 h-7',
      text: 'text-lg',
      tagline: 'text-[9px]',
    },
    md: {
      icon: 'w-8 h-8 sm:w-9 sm:h-9',
      text: 'text-xl sm:text-2xl',
      tagline: 'text-[10px]',
    },
    lg: {
      icon: 'w-10 h-10 sm:w-12 sm:h-12',
      text: 'text-2xl sm:text-3xl',
      tagline: 'text-xs',
    },
  }[size];

  const textColorClass = {
    dark: 'text-brand-deep',
    light: 'text-brand-white',
    gold: 'text-gold-gradient',
  }[variant];

  const taglineColorClass = {
    dark: 'text-brand-muted',
    light: 'text-brand-champagne/80',
    gold: 'text-brand-champagne',
  }[variant];

  const content = (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Handcrafted Diya & Lotus SVG Icon */}
      <div className={`relative flex-shrink-0 ${sizeClasses.icon}`}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
          <circle cx="24" cy="24" r="22" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <path
            d="M10 28C10 35 16 38 24 38C32 38 38 35 38 28C38 27 37 26.5 36 26.5C30 27.5 18 27.5 12 26.5C11 26.5 10 27 10 28Z"
            fill="url(#brandLogoGold)"
          />
          <ellipse cx="24" cy="27" rx="13" ry="2" fill="#B8860B" opacity="0.6" />
          <path
            d="M24 7C24 7 19 15 19 20C19 22.8 21.2 25 24 25C26.8 25 29 22.8 29 20C29 15 24 7 24 7Z"
            fill="url(#brandFlameGold)"
          />
          <circle cx="24" cy="20" r="2.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="24" cy="5" r="1.5" fill="#F2D98B" />

          <defs>
            <linearGradient id="brandLogoGold" x1="10" y1="26" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F2D98B" />
              <stop offset="0.5" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#A67C00" />
            </linearGradient>
            <linearGradient id="brandFlameGold" x1="19" y1="7" x2="29" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.3" stopColor="#F2D98B" />
              <stop offset="0.8" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col">
        <span
          className={`font-display font-bold tracking-tight ${sizeClasses.text} ${textColorClass} transition-colors duration-200 leading-none`}
        >
          {isHindi ? 'फेस्टिववाला' : 'FestiveWala'}
        </span>
        {showTagline && (
          <span
            className={`hidden sm:block font-sans tracking-widest-luxury uppercase font-medium ${sizeClasses.tagline} ${taglineColorClass} mt-0.5`}
          >
            {t.brand.tagline}
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg py-1 px-0.5"
        aria-label="FestiveWala Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
