import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerContainer';
import { FESTIVALS_DATA } from '../data/festivals';
import { FESTIVAL_DETAILS } from '../data/festivals/festivalDetails';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import {
  Calendar,
  ArrowRight,
  Search,
  X,
  Flame,
  BookOpen,
  Palette,
  Gift,
  Sparkles,
} from 'lucide-react';

export const FestivalsPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<'all' | 'autumn-winter' | 'spring-summer'>('all');

  const seoConfig = isHindi ? STATIC_ROUTE_SEO.festivals.hi : STATIC_ROUTE_SEO.festivals.en;

  // Spotlight core festivals that have dedicated full experience pages
  const spotlightIds = ['dhanteras', 'diwali', 'chhath-puja', 'holi', 'raksha-bandhan', 'christmas', 'new-year'];

  const filteredFestivals = useMemo(() => {
    return FESTIVALS_DATA.filter((f) => {
      // Season filter
      if (seasonFilter === 'autumn-winter') {
        const awIds = ['dhanteras', 'diwali', 'chhath-puja', 'christmas', 'new-year', 'makar-sankranti'];
        if (!awIds.includes(f.id)) return false;
      } else if (seasonFilter === 'spring-summer') {
        const ssIds = ['holi', 'raksha-bandhan', 'maha-shivratri', 'navratri'];
        if (!ssIds.includes(f.id)) return false;
      }

      // Search query: matches English, Hindi, and Hinglish regional aliases
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mEn = f.nameEn.toLowerCase().includes(q) || f.descEn.toLowerCase().includes(q) || f.tithiEn.toLowerCase().includes(q);
        const mHi = f.nameHi.toLowerCase().includes(q) || f.descHi.toLowerCase().includes(q) || f.tithiHi.toLowerCase().includes(q);

        const detail = FESTIVAL_DETAILS[f.id];
        const mAliases = detail?.regionalAliases?.some((a) => a.toLowerCase().includes(q));
        const mHinglish = detail?.hinglishTagline?.toLowerCase().includes(q);

        if (!mEn && !mHi && !mAliases && !mHinglish) return false;
      }

      return true;
    });
  }, [seasonFilter, searchQuery]);

  const festivalsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isHindi ? 'भारतीय पावन पर्व व उत्सव निर्देशिका' : 'Indian Festivals Directory',
    url: seoConfig.canonicalUrl,
    description: seoConfig.description,
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        ogImage={seoConfig.ogImage}
        jsonLd={festivalsSchema}
        lang={isHindi ? 'hi' : 'en'}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Prominent Page H1 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold text-brand-deep">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{isHindi ? 'पावन उत्सव निर्देशिका' : 'Festival Experiences & Heritage'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep leading-tight">
            {isHindi ? 'भारतीय पावन पर्व व उत्सव निर्देशिका' : 'Indian Festivals Directory & Sacred Traditions'}
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {isHindi
              ? 'भारत के प्रमुख त्योहारों की पावन परंपराएं, शुभ मुहूर्त, पारंपरिक व्यंजन, गृह सज्जा और विशेष शुभकामनाओं का संपूर्ण संग्रह।'
              : 'Explore deep traditions, auspicious dates, culinary lore, decoration ideas, and bespoke greetings for every Indian festival.'}
          </p>
        </div>

        {/* Quick Hub Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            to="/rangoli"
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Palette size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-deep block group-hover:text-brand-royal transition-colors">
                {isHindi ? 'रंगोली गैलरी' : 'Rangoli Gallery'}
              </span>
              <span className="text-[10px] text-brand-dark/60 font-sans block">
                {isHindi ? '८ श्रेणियां' : '8 Categories'}
              </span>
            </div>
          </Link>

          <Link
            to="/decoration-ideas"
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Flame size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-deep block group-hover:text-brand-royal transition-colors">
                {isHindi ? 'सजावट विचार' : 'Decoration Ideas'}
              </span>
              <span className="text-[10px] text-brand-dark/60 font-sans block">
                {isHindi ? '१० श्रेणियां' : '10 Categories'}
              </span>
            </div>
          </Link>

          <Link
            to="/gift-ideas"
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Gift size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-deep block group-hover:text-brand-royal transition-colors">
                {isHindi ? 'उपहार के विचार' : 'Gift Ideas'}
              </span>
              <span className="text-[10px] text-brand-dark/60 font-sans block">
                {isHindi ? 'बजट व रिश्ते' : 'Budgets & Relations'}
              </span>
            </div>
          </Link>

          <Link
            to="/festival-guides"
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-deep block group-hover:text-brand-royal transition-colors">
                {isHindi ? 'उत्सव गाइड' : 'Festival Guides'}
              </span>
              <span className="text-[10px] text-brand-dark/60 font-sans block">
                {isHindi ? 'विस्तृत आलेख' : 'In-depth Guides'}
              </span>
            </div>
          </Link>
        </div>

        {/* Search & Season Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="festivals-search-input"
              name="festivalsSearch"
              aria-label="Search Indian festivals"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'त्योहार खोजें (उदा: दीपावली, होली, रक्षाबंधन)...' : 'Search festivals (e.g. Diwali, Holi, Raksha Bandhan)...'}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl text-xs sm:text-sm bg-white border border-brand-gold/30 text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:border-brand-royal shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Season Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSeasonFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border min-h-[40px] ${
                seasonFilter === 'all'
                  ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm'
                  : 'bg-white text-brand-dark/70 border-brand-gold/30 hover:border-brand-gold'
              }`}
            >
              {isHindi ? 'सभी उत्सव' : 'All Festivals'}
            </button>
            <button
              type="button"
              onClick={() => setSeasonFilter('autumn-winter')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border min-h-[40px] ${
                seasonFilter === 'autumn-winter'
                  ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm'
                  : 'bg-white text-brand-dark/70 border-brand-gold/30 hover:border-brand-gold'
              }`}
            >
              {isHindi ? 'शरद व शीतकालीन (दीवाली, क्रिसमस)' : 'Autumn & Winter'}
            </button>
            <button
              type="button"
              onClick={() => setSeasonFilter('spring-summer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border min-h-[40px] ${
                seasonFilter === 'spring-summer'
                  ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm'
                  : 'bg-white text-brand-dark/70 border-brand-gold/30 hover:border-brand-gold'
              }`}
            >
              {isHindi ? 'वसंत व ग्रीष्म (होली, राखी)' : 'Spring & Summer'}
            </button>
          </div>
        </div>

        {/* Festival Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFestivals.map((fest) => {
            const hasDedicatedPage = spotlightIds.includes(fest.id);
            const targetRoute = hasDedicatedPage ? `/festivals/${fest.id}` : `/festivals#${fest.id}`;

            return (
              <StaggerItem key={fest.id} className="h-full">
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group h-full"
                >
                  <div className="h-full rounded-3xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                    {/* Top Color Banner */}
                    <div
                      className={`h-24 bg-gradient-to-r ${fest.bgGradient} p-5 flex items-center justify-between relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-mandala opacity-[0.06] pointer-events-none" />
                      <span className="relative z-10 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-black/30 text-[#F2D98B] border border-[#F2D98B]/30 backdrop-blur-sm">
                        {isHindi ? fest.tagHi : fest.tagEn}
                      </span>
                      {hasDedicatedPage && (
                        <span className="relative z-10 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#F2D98B] text-[#24113D] shadow-sm">
                          {isHindi ? 'पूर्ण अनुभव' : 'Full Experience'}
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-brand-muted font-sans">
                          <Calendar size={13} className="text-brand-gold" />
                          <span>{isHindi ? fest.tithiHi : fest.tithiEn}</span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                          {isHindi ? fest.nameHi : fest.nameEn}
                        </h3>

                        <p className="text-xs sm:text-sm text-brand-dark/75 leading-relaxed font-sans line-clamp-3">
                          {isHindi ? fest.descHi : fest.descEn}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between">
                        {hasDedicatedPage ? (
                          <Link
                            to={targetRoute}
                            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#24113D] hover:bg-[#341857] text-[#F2D98B] font-bold text-xs shadow-sm transition-all"
                          >
                            <span>{isHindi ? 'उत्सव अनुभव देखें' : 'Explore Festival'}</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <Link
                            to="/greeting-cards"
                            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-brand-light hover:bg-brand-gold/20 text-brand-dark font-bold text-xs transition-colors"
                          >
                            <span>{isHindi ? 'ग्रीटिंग कार्ड बनाएं' : 'Design Card in Studio'}</span>
                            <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
};
