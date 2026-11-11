import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, MessageSquareHeart, ArrowRight, ShieldCheck, Heart, Palette, Wand2 } from 'lucide-react';

export const HomeHeroSection: React.FC = () => {
  const { isHindi, loc } = useLanguage();

  return (
    <section
      id="home-hero"
      aria-label={isHindi ? 'मुख्य परिचय' : 'Homepage Hero'}
      className="relative w-full overflow-hidden bg-brand-deep text-brand-white pt-10 sm:pt-14 pb-14 sm:pb-20 border-b border-brand-gold/30"
    >
      {/* 1. Atmospheric Celebration Gradients */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1C0930] via-[#24113D] to-[#2E124D] opacity-95 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Subtle Decorative Mandala & Radial Glow */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[650px] h-96 sm:h-[450px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Tagline Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest-luxury bg-brand-royal/90 text-brand-champagne border border-brand-gold/40 shadow-gold-glow mb-6 sm:mb-8">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>{loc('Celebrate • Create • Share', 'उत्सव • सृजन • आनंद', 'Celebrate • Create • Share')}</span>
        </div>

        {/* Main Single H1 Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF7F0] tracking-tight leading-[1.18] sm:leading-[1.15] max-w-4xl mx-auto">
          {loc(
            'Celebrate Every Moment, Create Something Beautiful.',
            'हर पल का उत्सव मनाएं, कुछ सुंदर रचें।',
            'Celebrate Every Moment, Create Something Beautiful.'
          )}
        </h1>

        {/* Supporting Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-brand-champagne/90 max-w-2xl sm:max-w-3xl mx-auto font-sans leading-relaxed">
          {loc(
            'Discover beautiful greetings, heartfelt wishes, creative designs and inspiration for every occasion.',
            'सुंदर ग्रीटिंग कार्ड, हृदयस्पर्शी शुभकामनाएं, कलात्मक रंगोली और हर अवसर के लिए सांस्कृतिक प्रेरणा पाएं।',
            'Discover beautiful greetings, heartfelt wishes, creative designs aur har occasion ke liye inspiration.'
          )}
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Link
            to="/greeting-cards/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-brand-champagne via-brand-gold to-brand-gold text-brand-deep font-bold text-sm sm:text-base shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[50px]"
          >
            <Wand2 className="w-5 h-5 text-brand-deep" />
            <span>{loc('Start Creating', 'कार्ड बनाना शुरू करें', 'Start Creating')}</span>
            <ArrowRight className="w-4 h-4 ml-0.5 text-brand-deep" />
          </Link>

          <Link
            to="/wishes/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-[#FAF7F0] border border-brand-gold/30 hover:border-brand-gold/60 font-semibold text-sm sm:text-base backdrop-blur-sm active:scale-[0.98] transition-all min-h-[50px]"
          >
            <MessageSquareHeart className="w-5 h-5 text-brand-champagne" />
            <span>{loc('Explore Wishes', 'शुभकामनाएं देखें', 'Explore Wishes')}</span>
          </Link>
        </div>

        {/* Trust & Quality Indicators Strip */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-brand-gold/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-brand-gold/15">
            <div className="w-9 h-9 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0 text-brand-gold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#FAF7F0]">100% Free</p>
              <p className="text-[11px] text-brand-champagne/70">{loc('No Sign-up Required', 'बिना लॉगिन तुरंत शुरू', 'No Account Needed')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-brand-gold/15">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#FAF7F0]">Privacy First</p>
              <p className="text-[11px] text-brand-champagne/70">{loc('Client-Side Processing', 'तस्वीरें डिवाइस में सुरक्षित', '100% On-Device')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-brand-gold/15">
            <div className="w-9 h-9 rounded-lg bg-rose-500/15 flex items-center justify-center flex-shrink-0 text-rose-300">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#FAF7F0]">1,300 Wishes</p>
              <p className="text-[11px] text-brand-champagne/70">{loc('Hindi, English & Hinglish', 'हिंदी, अंग्रेजी व हिंगलिश', 'Curated Messages')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-brand-gold/15">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 text-amber-300">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#FAF7F0]">Artisan Decor</p>
              <p className="text-[11px] text-brand-champagne/70">{loc('Rangoli & Gift Guides', 'रंगोली व उपहार विचार', 'Festive Traditions')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

