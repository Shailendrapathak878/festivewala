import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export type MonetagAdVariant = 'banner' | 'in-content' | 'grid-card';

interface MonetagAdSlotProps {
  zoneId?: number | string;
  variant?: MonetagAdVariant;
  className?: string;
  slotLabel?: string;
}

/**
 * FestiveWala Monetag Ad Placement Slot
 * 
 * Complies with:
 * - Local-First Privacy (No user image, face, or personal data transmitted)
 * - CLS Prevention (Strictly reserved minimum heights)
 * - Clear Ad Distinction (Visible "ADVERTISEMENT" badge)
 * - Protected Area Policy (Strictly excluded from Greeting Studio editing/rendering)
 */
export const MonetagAdSlot: React.FC<MonetagAdSlotProps> = ({
  zoneId = '12199537',
  variant = 'banner',
  className = '',
  slotLabel,
}) => {
  const { isHindi } = useLanguage();

  const label = slotLabel || (isHindi ? 'प्रायोजित / विज्ञापन' : 'SPONSORED / ADVERTISEMENT');

  // Variant-specific reserved dimensions to prevent Cumulative Layout Shift (CLS)
  const variantStyles = {
    banner: 'w-full min-h-[100px] sm:min-h-[120px] md:min-h-[130px] my-6 sm:my-8',
    'in-content': 'w-full min-h-[90px] sm:min-h-[110px] my-6 sm:my-8',
    'grid-card': 'w-full min-h-[220px] sm:min-h-[260px] h-full',
  }[variant];

  return (
    <aside
      role="region"
      aria-label={isHindi ? 'विज्ञापन' : 'Advertisement'}
      data-testid="monetag-ad-slot"
      data-zone-id={zoneId}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-dashed border-brand-gold/35 bg-gradient-to-b from-[#FAF7F0]/90 to-[#F5EFE1]/70 p-4 transition-all duration-300 flex flex-col items-center justify-center text-center ${variantStyles} ${className}`}
    >
      {/* Discreet Ad Notice Badge */}
      <div className="absolute top-2.5 left-3 sm:left-4 flex items-center gap-1.5 pointer-events-none">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-dark/50">
          {label}
        </span>
      </div>

      {/* Ad Tag Container for Monetag Zone */}
      <div
        id={`monetag-slot-${zoneId}`}
        className="w-full h-full flex flex-col items-center justify-center py-2 z-10"
      >
        {/* Subtle, luxury fallback display while ad script loads or when adblock is active */}
        <div className="flex flex-col items-center justify-center px-4 py-2 text-brand-dark/60">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-sans uppercase tracking-widest-luxury font-semibold text-brand-gold">
              FestiveWala Partner Network
            </span>
          </div>
          <p className="text-xs text-brand-dark/55 max-w-md font-sans">
            {isHindi
              ? 'उत्सव व सांस्कृतिक सहयोग द्वारा समर्थित'
              : 'Supporting free festival greetings, wishes, and cultural experiences'}
          </p>
        </div>
      </div>

      {/* Subtle corner ornament */}
      <div className="absolute bottom-2 right-3 pointer-events-none text-brand-gold/25 text-[10px] font-serif">
        FW-AD-12199537
      </div>
    </aside>
  );
};
