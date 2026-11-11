import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { DesktopNavigation } from '../navigation/DesktopNavigation';
import { MobileNavigation } from '../navigation/MobileNavigation';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { PrimaryButton } from '../common/PrimaryButton';
import { useLanguage } from '../../hooks/useLanguage';
import { Menu, Sparkles, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, isHindi, isHinglish } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Open mobile menu from bottom nav "More" event
  useEffect(() => {
    const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
    window.addEventListener('open-mobile-menu', handleOpenMobileMenu);
    return () => window.removeEventListener('open-mobile-menu', handleOpenMobileMenu);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full overflow-x-clip transition-all duration-300">
      {/* 1. Ultra-Compact Mobile-First Announcement Bar */}
      <div className="bg-brand-deep text-brand-champagne border-b border-brand-gold/30 px-3 py-1.5 text-[11px] sm:text-xs font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2">
          <Link
            to="/festivals/"
            className="flex items-center gap-2 truncate group focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded"
          >
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-deep flex-shrink-0">
              {isHindi ? 'दीपावली २०२६' : 'Diwali 2026'}
            </span>
            <span className="text-brand-white/90 truncate font-normal">
              {isHindi
                ? 'शाही स्वर्ण पत्र ग्रीटिंग्स व मंगल कामनाएं उपलब्ध हैं'
                : 'Curated royal gold greetings & celebratory wishes are live'}
            </span>
            <ChevronRight size={13} className="text-brand-gold opacity-75 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* 2. Main Mobile-First Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-ivory/95 backdrop-blur-md shadow-royal border-b border-brand-gold/25 py-2.5 sm:py-3'
            : 'bg-brand-ivory/85 backdrop-blur-sm border-b border-brand-gold/15 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo (Adapts for mobile & desktop) */}
          <BrandLogo variant="dark" size="md" />

          {/* Desktop Navigation Links */}
          <DesktopNavigation />

          {/* Desktop Right Actions */}
          <div className="hidden xl:flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />

            <PrimaryButton
              to="/greeting-cards/"
              size="sm"
              variant="royal"
              icon={<Sparkles size={14} className="text-brand-gold" />}
            >
              {isHindi ? 'कार्ड बनाएं' : isHinglish ? 'Create Card' : 'Start Creating'}
            </PrimaryButton>
          </div>

          {/* Mobile Right Actions: Create CTA (on tablet/phablet) + Compact Language Switcher + Hamburger */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2">
            <Link
              to="/greeting-cards/"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-royal text-brand-champagne border border-brand-gold/30 text-xs font-bold active:scale-95 transition-all shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
              aria-label={isHindi ? 'कार्ड बनाएं' : 'Create Card'}
            >
              <Sparkles size={13} className="text-brand-gold" />
              <span>{isHindi ? 'कार्ड बनाएं' : 'Create'}</span>
            </Link>

            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-brand-deep bg-brand-white/80 border border-brand-gold/30 hover:bg-brand-light active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-all"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={t.nav.menuOpen}
            >
              <Menu size={20} className="text-brand-deep" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Full-Screen Elegant Purple Mobile Menu */}
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};
