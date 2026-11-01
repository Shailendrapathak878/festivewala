import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { SectionHeading } from '../components/common/SectionHeading';
import {
  GUIDE_CATEGORIES,
  FESTIVAL_GUIDES,
  type FestivalGuide,
} from '../data/festival-guides/guidesData';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import {
  Search,
  X,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Share2,
  Compass,
} from 'lucide-react';

export const FestivalGuidesPage: React.FC = () => {
  const { guideId } = useParams<{ guideId?: string }>();
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(guideId || null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync route param with state
  useEffect(() => {
    if (guideId) {
      setSelectedGuideId(guideId);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [guideId]);

  const activeGuide: FestivalGuide | null = useMemo(() => {
    if (!selectedGuideId) return null;
    return FESTIVAL_GUIDES.find((g) => g.id === selectedGuideId || g.slug === selectedGuideId) || null;
  }, [selectedGuideId]);

  const filteredGuides = useMemo(() => {
    return FESTIVAL_GUIDES.filter((guide) => {
      // Category filter
      if (activeCategory !== 'all' && guide.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mEn = guide.titleEn.toLowerCase().includes(q) || guide.introEn.toLowerCase().includes(q);
        const mHi = guide.titleHi.toLowerCase().includes(q) || guide.introHi.toLowerCase().includes(q);
        if (!mEn && !mHi) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleShareGuide = () => {
    if (navigator.share) {
      navigator.share({
        title: isHindi ? activeGuide?.titleHi : activeGuide?.titleEn,
        text: isHindi ? activeGuide?.introHi : activeGuide?.introEn,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const seoConfig = useMemo(() => {
    if (activeGuide) {
      return {
        title: isHindi
          ? `${activeGuide.titleHi} | फेस्टिववाला संदर्शिका`
          : `${activeGuide.titleEn} | FestiveWala Festival Guide`,
        description: isHindi ? activeGuide.introHi : activeGuide.introEn,
        keywords: `${activeGuide.titleEn}, ${activeGuide.titleHi}, festival guide, traditions, rituals, eco friendly celebration`,
        canonicalUrl: `https://festivewala.in/festival-guides/${activeGuide.slug}`,
        ogType: 'article' as const,
      };
    }
    const base = isHindi ? STATIC_ROUTE_SEO.guides.hi : STATIC_ROUTE_SEO.guides.en;
    return {
      title: base.title,
      description: base.description,
      keywords: base.keywords,
      canonicalUrl: base.canonicalUrl,
      ogType: 'article' as const,
    };
  }, [activeGuide, isHindi]);

  const guideSchema = useMemo(() => {
    if (!activeGuide) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: isHindi ? activeGuide.titleHi : activeGuide.titleEn,
      description: isHindi ? activeGuide.introHi : activeGuide.introEn,
      author: {
        '@type': 'Organization',
        name: 'FestiveWala Editorial Board',
        url: 'https://festivewala.in',
      },
      publisher: {
        '@type': 'Organization',
        name: 'FestiveWala',
        logo: {
          '@type': 'ImageObject',
          url: 'https://festivewala.in/assets/brand/favicon.svg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://festivewala.in/festival-guides/${activeGuide.slug}`,
      },
      datePublished: '2026-11-01',
      dateModified: '2026-11-01',
    };
  }, [activeGuide, isHindi]);

  // IF A GUIDE IS SELECTED: RENDER COMPREHENSIVE READING VIEW
  if (activeGuide) {
    return (
      <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
        <SEOHead
          title={seoConfig.title}
          description={seoConfig.description}
          keywords={seoConfig.keywords}
          canonicalUrl={seoConfig.canonicalUrl}
          ogType="article"
          jsonLd={guideSchema || undefined}
          lang={isHindi ? 'hi' : 'en'}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/festival-guides"
              onClick={() => setSelectedGuideId(null)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-royal hover:text-brand-deep transition-colors"
            >
              <ArrowLeft size={16} />
              <span>{isHindi ? 'सभी मार्गदर्शिकाओं पर लौटें' : 'Back to All Guides'}</span>
            </Link>

            <button
              type="button"
              onClick={handleShareGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-brand-gold/30 hover:border-brand-gold text-xs font-semibold text-brand-dark transition-all shadow-sm"
            >
              {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
              <span>{copiedLink ? (isHindi ? 'लिंक कॉपी हुआ!' : 'Link Copied!') : (isHindi ? 'शेयर करें' : 'Share')}</span>
            </button>
          </div>

          {/* Guide Article Container */}
          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-lg space-y-8">
            {/* Header */}
            <div className="space-y-3 border-b border-brand-gold/20 pb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-light text-brand-royal border border-brand-gold/30">
                  {isHindi ? activeGuide.categoryLabelHi : activeGuide.categoryLabelEn}
                </span>
                <span className="flex items-center gap-1 text-xs text-brand-muted font-sans">
                  <Clock size={13} className="text-brand-gold" />
                  <span>{isHindi ? activeGuide.readTimeHi : activeGuide.readTimeEn}</span>
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
                {isHindi ? activeGuide.titleHi : activeGuide.titleEn}
              </h1>

              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed font-sans italic border-l-4 border-brand-gold pl-4 py-1">
                {isHindi ? activeGuide.introHi : activeGuide.introEn}
              </p>
            </div>

            {/* Table of Contents for Multi-Section Guides */}
            {activeGuide.sections.length > 1 && (
              <div className="p-5 rounded-2xl bg-brand-light/60 border border-brand-gold/25 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-royal flex items-center gap-1.5">
                  <Compass size={14} className="text-brand-gold" />
                  <span>{isHindi ? 'विषय-सूची (Table of Contents):' : 'Table of Contents:'}</span>
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm font-sans">
                  {activeGuide.sections.map((sec, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="text-brand-dark/80 hover:text-brand-deep hover:underline flex items-start gap-2"
                      >
                        <span className="font-mono text-brand-gold font-bold">{idx + 1}.</span>
                        <span>{isHindi ? sec.headingHi : sec.headingEn}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Guide Body Sections */}
            <div className="space-y-8">
              {activeGuide.sections.map((sec, idx) => (
                <section key={idx} id={`section-${idx}`} className="space-y-3.5 scroll-mt-24">
                  <h2 className="font-serif text-lg sm:text-2xl font-bold text-brand-deep">
                    {isHindi ? sec.headingHi : sec.headingEn}
                  </h2>

                  <p className="text-sm sm:text-base text-brand-dark/85 leading-relaxed font-sans">
                    {isHindi ? sec.contentHi : sec.contentEn}
                  </p>

                  {/* Practical Tips if available */}
                  {sec.practicalTipsEn && sec.practicalTipsEn.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[#24113D]/5 border border-brand-gold/25 space-y-2">
                      <span className="text-xs font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={13} className="text-brand-gold" />
                        <span>{isHindi ? 'व्यावहारिक सुझाव:' : 'Actionable Tips:'}</span>
                      </span>
                      <ul className="space-y-1 text-xs sm:text-sm text-brand-dark/80 font-sans">
                        {(isHindi ? sec.practicalTipsHi || sec.practicalTipsEn : sec.practicalTipsEn).map(
                          (tip, tipIdx) => (
                            <li key={tipIdx} className="flex items-start gap-2">
                              <span className="text-brand-gold font-bold">✓</span>
                              <span>{tip}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Related Festival Link */}
            {activeGuide.relatedFestivalId && (
              <div className="pt-6 border-t border-brand-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-brand-dark/70">
                  {isHindi ? 'इस त्योहार के और अनुभव खोजें:' : 'Explore more about this celebration:'}
                </span>
                <Link
                  to={`/festivals/${activeGuide.relatedFestivalId}`}
                  className="px-5 py-2.5 rounded-xl bg-[#24113D] text-[#F2D98B] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>{isHindi ? 'त्योहार का मुख्य पृष्ठ देखें' : 'View Festival Page'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </article>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: GUIDES LISTING HUB
  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="article"
        lang={isHindi ? 'hi' : 'en'}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeading
          badge={isHindi ? 'उत्सव ज्ञानकोश व मार्गदर्शिकाएं' : 'Festival Guides & Knowledge'}
          title={isHindi ? 'परंपराओं, स्वच्छता व पकवानों की संपूर्ण मार्गदर्शिका' : 'Comprehensive Festival Guides & Cultural Lore'}
          subtitle={
            isHindi
              ? 'इतिहास, अनुष्ठानों की वैज्ञानिकता, पर्यावरण-अनुकूल त्योहार और पूर्व तैयारी पर प्रमाणित व सुरुचिपूर्ण लेख।'
              : 'Informative, accessible, and factually authentic articles on rituals, green celebrations, food lore, and safety.'
          }
        />

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="guides-search-input"
              name="guidesSearch"
              aria-label="Search festival and ritual guides"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'गाइड खोजें (उदा: दीवाली, होली, सफाई, पर्यावरण)...' : 'Search guides (e.g. diwali, holi, eco-friendly, declutter)...'}
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
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {GUIDE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border min-h-[40px] ${
                  isActive
                    ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm scale-[1.02]'
                    : 'bg-white text-brand-dark/75 border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                {isHindi ? cat.labelHi : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGuides.map((guide) => (
            <motion.div
              key={guide.id}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/festival-guides/${guide.slug}`}
                onClick={() => setSelectedGuideId(guide.slug)}
                className="h-full rounded-3xl bg-white border border-brand-gold/35 hover:border-brand-gold shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-4 cursor-pointer group block"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-light text-brand-royal border border-brand-gold/30">
                      {isHindi ? guide.categoryLabelHi : guide.categoryLabelEn}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-brand-muted font-sans">
                      <Clock size={12} className="text-brand-gold" />
                      <span>{isHindi ? guide.readTimeHi : guide.readTimeEn}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{guide.icon}</span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep group-hover:text-brand-royal transition-colors leading-snug">
                      {isHindi ? guide.titleHi : guide.titleEn}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans line-clamp-3">
                    {isHindi ? guide.introHi : guide.introEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-gold/15 flex items-center justify-between text-xs font-bold text-brand-royal group-hover:text-brand-deep transition-colors">
                  <span>{isHindi ? 'पूरा लेख पढ़ें' : 'Read Full Guide'}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
