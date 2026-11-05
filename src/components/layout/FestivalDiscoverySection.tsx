import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { PrimaryButton } from '../common/PrimaryButton';
import { FESTIVALS_DATA } from '../../data/festivals';
import { getUpcomingFestivals } from '../../services/festivalPriorityEngine';
import { formatDateInIST } from '../../utils/festivalDateUtils';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, Calendar, ArrowRight, Flame, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FestivalDiscoverySection: React.FC = () => {
  const { loc } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming'>('all');

  const upcomingList = useMemo(() => getUpcomingFestivals(FESTIVALS_DATA, new Date(), 10), []);
  const featuredUpcoming = upcomingList[0];
  const featuredFestival = featuredUpcoming ? featuredUpcoming.festival : FESTIVALS_DATA[0];

  const supportingFestivals = useMemo(() => {
    const others = FESTIVALS_DATA.filter((f) => f.id !== featuredFestival.id);
    if (activeFilter === 'upcoming') {
      return [...others].sort((a, b) => {
        const idxA = upcomingList.findIndex((u) => u.festival.id === a.id);
        const idxB = upcomingList.findIndex((u) => u.festival.id === b.id);
        return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
      });
    }
    return others;
  }, [featuredFestival.id, activeFilter, upcomingList]);

  const getFestivalUrl = (id: string) => {
    const dedicatedFestivals = ['dhanteras', 'diwali', 'holi', 'raksha-bandhan', 'christmas', 'new-year'];
    return dedicatedFestivals.includes(id) ? `/festivals/${id}` : `/festivals#${id}`;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-brand-ivory relative overflow-hidden" id="festivals-discovery">
      {/* Background Mandala Accent */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={loc('Festival Calendar & Heritage', 'सांस्कृतिक पंचांग व उत्सव', 'Festival Calendar & Dates')}
          title={loc('Discover the Tapestry of Sacred Festivals', 'भारत के पावन उत्सवों की यात्रा', 'Indian Festivals ki Beautiful Journey')}
          subtitle={loc(
            'Immerse in the timeless lore, auspicious tithis, and heartfelt traditions across the Indian cultural calendar',
            'ऋतुओं, परंपराओं और उल्लास से सजे भारतीय पर्वों का अद्भुत संग्रह — प्रत्येक उत्सव की कथा, तिथि और भावना',
            'Har festival ki authentic story, dates, puja vidhi aur celebration ideas explore karein'
          )}
        />

        {/* Filter Pills */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-brand-royal text-brand-champagne shadow-royal'
                : 'bg-white text-brand-dark/70 border border-brand-gold/30 hover:bg-brand-light'
            }`}
          >
            {loc('All Celebrations', 'सभी प्रमुख पर्व', 'All Festivals')}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('upcoming')}
            className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer ${
              activeFilter === 'upcoming'
                ? 'bg-brand-royal text-brand-champagne shadow-royal'
                : 'bg-white text-brand-dark/70 border border-brand-gold/30 hover:bg-brand-light'
            }`}
          >
            {loc('Upcoming First', 'आगामी पर्व', 'Upcoming Festivals')}
          </button>
        </div>

        {/* 1. Large Featured Festival Hero Card (Diwali) */}
        <div className="mt-8 sm:mt-12">
          <div className="rounded-3xl bg-royal-gradient p-1 shadow-royal border border-brand-gold/40 overflow-hidden">
            <div className="rounded-[22px] bg-brand-deep/95 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-mandala opacity-[0.06] pointer-events-none"
                aria-hidden="true"
              />

              {/* Left Details */}
              <div className="relative z-10 space-y-4 max-w-xl text-center lg:text-left">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest-luxury font-bold bg-brand-gold/20 text-brand-champagne border border-brand-gold/40">
                    <Flame size={12} className="text-brand-gold" />
                    <span>{loc('Spotlight Heritage', 'विशेष प्रकाशित पर्व', 'Featured Celebration')}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-[#F2D98B] border border-amber-500/30">
                    <Clock size={11} className="text-[#F2D98B]" />
                    <span>
                      {featuredUpcoming?.daysRemaining === 0
                        ? loc('Today / Ongoing', 'आज / जारी है', 'Today')
                        : `${formatDateInIST(featuredUpcoming?.startDateIso || featuredFestival.dateIso, 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${featuredUpcoming?.daysRemaining ?? 0} ${loc('Days Left', 'दिन शेष', 'Days Left')}`}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-bold text-brand-white leading-tight">
                  {loc(featuredFestival.nameEn, featuredFestival.nameHi, featuredFestival.nameEn)}
                </h3>

                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-brand-champagne/80 font-sans">
                  <Calendar size={14} className="text-brand-gold" />
                  <span>{loc(featuredFestival.tithiEn, featuredFestival.tithiHi, featuredFestival.tithiEn)}</span>
                </div>

                <p className="font-sans text-xs sm:text-base text-brand-champagne/85 leading-relaxed">
                  {loc(featuredFestival.descEn, featuredFestival.descHi, featuredFestival.descEn)}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <PrimaryButton
                    to={getFestivalUrl(featuredFestival.id)}
                    size="md"
                    variant="gold"
                    icon={<ArrowRight size={16} className="text-brand-deep" />}
                    className="w-full sm:w-auto"
                  >
                    {loc('Explore Festival Details', 'उत्सव विवरण देखें', 'Explore Festival')}
                  </PrimaryButton>
                  <PrimaryButton
                    to="/greeting-cards?template=photo-royal-portrait"
                    size="md"
                    variant="royal"
                    icon={<Sparkles size={16} className="text-brand-gold" />}
                    className="w-full sm:w-auto"
                  >
                    {loc('Create Greeting', 'कार्ड तैयार करें', 'Design Card')}
                  </PrimaryButton>
                </div>
              </div>

              {/* Right Decorative Emblem Motif */}
              <div className="relative z-10 w-44 sm:w-56 h-44 sm:h-56 flex-shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-brand-gold/15 blur-2xl pointer-events-none" />
                <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl text-brand-gold">
                  <circle cx="80" cy="80" r="74" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="80" cy="80" r="58" stroke="#F2D98B" strokeWidth="0.75" opacity="0.5" />
                  {/* Diya Base */}
                  <path
                    d="M40 95C40 120 58 128 80 128C102 128 120 120 120 95C120 92 116 90 114 90C96 93 64 93 46 90C44 90 40 92 40 95Z"
                    fill="url(#diwaliHeroGold2)"
                  />
                  <ellipse cx="80" cy="92" rx="38" ry="4" fill="#B8860B" opacity="0.8" />
                  {/* Sacred Flame */}
                  <path
                    d="M80 34C80 34 64 56 64 74C64 83 71.2 90 80 90C88.8 90 96 83 96 74C96 56 80 34 80 34Z"
                    fill="url(#diwaliHeroFlame2)"
                  />
                  <circle cx="80" cy="74" r="6" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="80" cy="28" r="3" fill="#F2D98B" />
                  <defs>
                    <linearGradient id="diwaliHeroGold2" x1="40" y1="90" x2="120" y2="128" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F2D98B" />
                      <stop offset="0.5" stopColor="#D4AF37" />
                      <stop offset="1" stopColor="#996515" />
                    </linearGradient>
                    <linearGradient id="diwaliHeroFlame2" x1="64" y1="34" x2="96" y2="90" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" />
                      <stop offset="0.25" stopColor="#F2D98B" />
                      <stop offset="0.75" stopColor="#D4AF37" />
                      <stop offset="1" stopColor="#E65100" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Grid / Swipeable Cards of Supporting Festivals */}
        <div className="mt-8 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          {supportingFestivals.map((fest) => (
            <motion.div
              key={fest.id}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="group min-w-[280px] sm:min-w-0 snap-start h-full"
            >
              <Link
                to={getFestivalUrl(fest.id)}
                className="block h-full rounded-2xl bg-white p-5 sm:p-6 border border-brand-gold/25 shadow-card-luxury hover:shadow-card-luxury-hover hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-sans uppercase tracking-widest-luxury font-bold bg-brand-light text-brand-royal border border-brand-gold/30">
                      {loc(fest.tagEn, fest.tagHi, fest.tagHi)}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: fest.accentColor }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title & Tithi */}
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                      {loc(fest.nameEn, fest.nameHi, fest.nameEn)}
                    </h4>
                    <p className="font-sans text-[11px] text-brand-muted flex items-center gap-1.5 mt-0.5">
                      <Calendar size={12} className="text-brand-gold" />
                      <span>{loc(fest.tithiEn, fest.tithiHi, fest.tithiEn)}</span>
                    </p>
                  </div>

                  {/* Short Excerpt */}
                  <p className="font-sans text-xs text-brand-dark/75 leading-relaxed line-clamp-2">
                    {loc(fest.descEn, fest.descHi, fest.descEn)}
                  </p>
                </div>

                {/* Bottom Action Indicator */}
                <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-xs font-semibold text-brand-gold group-hover:text-brand-deep transition-colors">
                  <span>{loc('View Celebration', 'विवरण देखें', 'Explore')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
