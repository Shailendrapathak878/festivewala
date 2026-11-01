import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PrimaryButton } from '../common/PrimaryButton';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-14 sm:py-20 md:py-24 bg-brand-deep text-brand-white overflow-hidden border-t border-brand-gold/40">
      {/* Background Mandala Watermark */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* Atmospheric Gold Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[550px] h-80 sm:h-[550px] bg-brand-gold/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Handcrafted Diya Emblem in Crest */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
        >
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xl text-brand-gold">
            <circle cx="32" cy="32" r="30" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <path
              d="M16 38C16 46 22 50 32 50C42 50 48 46 48 38C48 37 46 36 44 36C36 37.5 28 37.5 20 36C18 36 16 37 16 38Z"
              fill="url(#finalCtaDiyaGold)"
            />
            <path
              d="M32 12C32 12 25 22 25 28C25 31.9 28.1 35 32 35C35.9 35 39 31.9 39 28C39 22 32 12 32 12Z"
              fill="url(#finalCtaFlameGold)"
            />
            <circle cx="32" cy="28" r="2.5" fill="#FFFFFF" />
            <defs>
              <linearGradient id="finalCtaDiyaGold" x1="16" y1="36" x2="48" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2D98B" />
                <stop offset="0.5" stopColor="#D4AF37" />
                <stop offset="1" stopColor="#B8860B" />
              </linearGradient>
              <linearGradient id="finalCtaFlameGold" x1="25" y1="12" x2="39" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.3" stopColor="#F2D98B" />
                <stop offset="0.8" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2">
          <span className="w-6 h-[1px] bg-brand-gold/60" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest-luxury font-bold text-brand-gold">
            {isHindi ? 'उत्सव • सृजन • आनंद' : 'Celebrate • Create • Share'}
          </span>
          <span className="w-6 h-[1px] bg-brand-gold/60" aria-hidden="true" />
        </div>

        {/* Main Headline */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white leading-tight">
          {isHindi ? (
            <>
              हर उत्सव को बनाएँ और भी{' '}
              <span className="text-gold-gradient font-serif italic font-normal block sm:inline">
                आत्मीय व यादगार
              </span>
            </>
          ) : (
            <>
              Make Every Celebration More{' '}
              <span className="text-gold-gradient font-serif italic font-normal block sm:inline">
                Personal & Timeless
              </span>
            </>
          )}
        </h2>

        {/* Supporting Message */}
        <p className="font-sans text-xs sm:text-base text-brand-champagne/85 max-w-xl mx-auto leading-relaxed">
          {isHindi
            ? 'अपनों के लिए सुंदर डिजिटल शुभकामना पत्र बनाएं, वैदिक श्लोक साझा करें और परंपराओं का अभिनंदन करें।'
            : 'Create something thoughtful, share a smile and celebrate the moments that bring us together across generations.'}
        </p>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <PrimaryButton
            to="/greeting-cards"
            size="lg"
            variant="gold"
            icon={<Sparkles size={18} className="text-brand-deep" />}
            className="w-full sm:w-auto"
          >
            {isHindi ? 'अपना ग्रीटिंग कार्ड बनाएँ' : 'Create Your Greeting'}
          </PrimaryButton>

          <PrimaryButton
            to="/festivals"
            size="lg"
            variant="royal"
            icon={<ArrowRight size={18} className="text-brand-gold" />}
            className="w-full sm:w-auto"
          >
            {isHindi ? 'पर्व निर्देशिका देखें' : 'Explore Festival Calendar'}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

