import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { PrimaryButton } from '../common/PrimaryButton';
import { BrandLogo } from '../common/BrandLogo';
import { X, Sparkles, ChevronRight } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const { t, isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // 1. Lock background scrolling while open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // 2. Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    { key: 'home', path: '/', label: t.nav.home, num: '01' },
    { key: 'festivals', path: '/festivals', label: t.nav.festivals, num: '02' },
    { key: 'rangoli', path: '/rangoli', label: t.nav.rangoli, num: '03' },
    { key: 'decorations', path: '/decoration-ideas', label: t.nav.decorations, num: '04' },
    { key: 'gifts', path: '/gift-ideas', label: t.nav.gifts, num: '05' },
    { key: 'guides', path: '/festival-guides', label: t.nav.guides, num: '06' },
    { key: 'greetingCards', path: '/greeting-cards', label: t.nav.greetingCards, num: '07' },
    { key: 'wishes', path: '/wishes', label: t.nav.wishes, num: '08' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuOpen}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-brand-deep text-brand-white flex flex-col justify-between overflow-y-auto"
        >
          {/* Subtle Background Mandala Texture */}
          <div
            className="absolute inset-0 bg-mandala opacity-[0.05] pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Bar with Brand Logo and Close Button */}
          <div className="relative z-10 px-5 py-4 border-b border-brand-gold/20 flex items-center justify-between">
            <BrandLogo variant="light" size="sm" showTagline={false} linkToHome={false} />

            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-brand-white/10 text-brand-champagne hover:bg-brand-white/20 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label={t.nav.menuClose}
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Links (Editorial Scale, Touch-Optimized) */}
          <div className="relative z-10 px-6 py-6 flex-grow flex flex-col justify-center space-y-2">
            <span className="text-[10px] uppercase tracking-widest-luxury font-bold text-brand-gold/70 px-2 pb-1 block">
              {isHindi ? 'मेन्यू नेविगेशन' : 'Navigation Menu'}
            </span>

            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation Menu">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between min-h-[52px] px-4 py-3 rounded-2xl transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? 'bg-brand-royal text-brand-champagne font-bold border border-brand-gold/30 shadow-royal'
                        : 'text-brand-white/85 hover:bg-brand-white/5 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-brand-gold/60">{item.num}</span>
                        <span className="font-display text-lg sm:text-xl tracking-wide">{item.label}</span>
                      </div>

                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-brand-gold shadow-gold-glow" aria-hidden="true" />
                      ) : (
                        <ChevronRight size={18} className="text-brand-gold/40 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Action Footer */}
          <div className="relative z-10 px-6 py-6 border-t border-brand-gold/20 bg-brand-deep/90 space-y-4">
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-sans text-brand-champagne/80 font-medium">
                {t.nav.switchLanguage}
              </span>
              <LanguageSwitcher variant="dark" />
            </div>

            <PrimaryButton
              to="/greeting-cards"
              onClick={onClose}
              fullWidth
              size="lg"
              variant="gold"
              icon={<Sparkles size={18} className="text-brand-deep" />}
            >
              {t.nav.createGreeting}
            </PrimaryButton>

            <p className="text-center text-[10px] tracking-widest-luxury uppercase text-brand-champagne/50 pt-1">
              {t.brand.tagline}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
