import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-deep text-brand-champagne/90 pt-10 sm:pt-14 pb-8 sm:pb-12 overflow-hidden border-t border-brand-gold/30">
      {/* Decorative subtle mandala background texture */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient gold glow in top center */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-36 sm:h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-8 sm:pb-10 border-b border-brand-gold/20">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-3 pr-0 lg:pr-6">
            <BrandLogo variant="light" size="md" />
            <p className="font-sans text-xs sm:text-sm text-brand-white/80 leading-relaxed max-w-sm pt-1">
              {t.footer.aboutDesc}
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] sm:text-xs text-brand-gold tracking-widest-luxury uppercase font-semibold">
              <Sparkles size={13} className="text-brand-gold-light" />
              <span>{t.brand.tagline}</span>
            </div>
          </div>

          {/* Col 3: Celebrations (Festivals) */}
          <div className="space-y-2.5">
            <h3 className="font-display text-xs sm:text-sm font-bold text-brand-white uppercase tracking-widest-luxury border-b border-brand-gold/20 pb-1.5">
              {isHindi ? 'पर्व व त्योहार' : 'Festivals'}
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-brand-white/75 font-sans">
              <li>
                <Link to="/festivals/diwali" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'दीपावली (Diwali)' : 'Diwali Experience'}
                </Link>
              </li>
              <li>
                <Link to="/festivals/holi" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'होली (Holi)' : 'Holi Experience'}
                </Link>
              </li>
              <li>
                <Link to="/festivals/raksha-bandhan" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'रक्षाबंधन' : 'Raksha Bandhan'}
                </Link>
              </li>
              <li>
                <Link to="/festivals/christmas" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'क्रिसमस' : 'Christmas'}
                </Link>
              </li>
              <li>
                <Link to="/festivals/new-year" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'नव वर्ष' : 'New Year'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Experiences & Inspirations */}
          <div className="space-y-2.5">
            <h3 className="font-display text-xs sm:text-sm font-bold text-brand-white uppercase tracking-widest-luxury border-b border-brand-gold/20 pb-1.5">
              {isHindi ? 'उत्सव अनुभव' : 'Experiences'}
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-brand-white/75 font-sans">
              <li>
                <Link to="/rangoli" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'रंगोली गैलरी' : 'Rangoli Gallery'}
                </Link>
              </li>
              <li>
                <Link to="/decoration-ideas" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'सजावट के विचार' : 'Decoration Ideas'}
                </Link>
              </li>
              <li>
                <Link to="/gift-ideas" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'त्योहार उपहार मार्गदर्शिका' : 'Festival Gift Ideas'}
                </Link>
              </li>
              <li>
                <Link to="/festival-guides" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'उत्सव मार्गदर्शिकाएं' : 'Festival Guides'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Trust & Company */}
          <div className="space-y-2.5">
            <h3 className="font-display text-xs sm:text-sm font-bold text-brand-white uppercase tracking-widest-luxury border-b border-brand-gold/20 pb-1.5">
              {isHindi ? 'कंपनी व नीतियां' : 'Trust & Policies'}
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-brand-white/75 font-sans">
              <li>
                <Link to="/about" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'हमारे बारे में' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'संपर्क करें' : 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'नियम व शर्तें' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="py-1 inline-block hover:text-brand-champagne transition-colors">
                  {isHindi ? 'अस्वीकरण' : 'Disclaimer'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Dynamic Copyright, Trust Links & Cultural Craftsmanship */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-brand-champagne/70 font-sans text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              © {currentYear} FestiveWala.{' '}
              {isHindi
                ? 'सर्वाधिकार सुरक्षित।'
                : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-3 text-brand-champagne/60 text-[10px] sm:text-[11px]">
              <Link to="/privacy-policy" className="hover:text-brand-champagne transition-colors underline-offset-2 hover:underline">
                {isHindi ? 'गोपनीयता' : 'Privacy'}
              </Link>
              <span>•</span>
              <Link to="/terms-of-service" className="hover:text-brand-champagne transition-colors underline-offset-2 hover:underline">
                {isHindi ? 'नियम' : 'Terms'}
              </Link>
              <span>•</span>
              <Link to="/disclaimer" className="hover:text-brand-champagne transition-colors underline-offset-2 hover:underline">
                {isHindi ? 'अस्वीकरण' : 'Disclaimer'}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-brand-white/70">
            <span>Crafted with</span>
            <Heart size={11} className="text-[#D4AF37] fill-[#D4AF37]" aria-label="love" />
            <span>for timeless celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
