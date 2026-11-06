import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { FESTIVAL_DETAILS } from '../data/festivals/festivalDetails';
import { SEOHead } from '../components/common/SEOHead';
import { TrilingualFAQSection } from '../components/common/TrilingualFAQSection';
import { FestivalAtmosphere } from '../components/animation/FestivalAtmosphere';
import { DiwaliGuideArticle } from '../components/festivals/DiwaliGuideArticle';
import { DhanterasGuideArticle } from '../components/festivals/DhanterasGuideArticle';
import { FestivalCountdown } from '../components/festivals/FestivalCountdown';
import {
  Calendar,
  Sparkles,
  Flame,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Utensils,
  Gift,
  Palette,
  Clock,
  Check,
  Share2,
} from 'lucide-react';

export const FestivalDetailPage: React.FC = () => {
  const { festivalId } = useParams<{ festivalId: string }>();
  const { isHindi, isHinglish } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on load or route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [festivalId]);

  const festival = festivalId ? FESTIVAL_DETAILS[festivalId] : null;

  const seoData = useMemo(() => {
    if (!festival) return null;
    const isDiwali = festival.id === 'diwali';
    const isDhanteras = festival.id === 'dhanteras';

    const pageTitle = isDiwali
      ? (isHindi
          ? 'दीपावली २०२६: पांच पावन दिन, पूजन विधि, शुभकामनाएं व गाइड | फेस्टिववाला'
          : 'Diwali 2026: 5 Days Significance, Rituals, Wishes & Guide | FestiveWala')
      : isDhanteras
      ? (isHindi
          ? 'धनतेरस २०२६: महत्व, पूजन विधि, शुभकामनाएं व गाइड | फेस्टिववाला'
          : 'Dhanteras 2026: Significance, Rituals, Wishes & Guide | FestiveWala')
      : (isHindi
          ? `${festival.nameHi} — मुहूर्त, परंपराएं, व्यंजन व शुभकामनाएं | फेस्टिववाला`
          : `${festival.nameEn} — Date, Rituals, Recipes, Decor & Wishes | FestiveWala`);

    const pageDescription = isDiwali
      ? (isHindi
          ? 'दीपावली २०२६ संपूर्ण मार्गदर्शिका: पांच पावन दिन, लक्ष्मी पूजन शुभ मुहूर्त, सांस्कृतिक महत्व, पारंपरिक पकवान और मंगलमय शुभकामनाएं।'
          : 'Complete Diwali 2026 celebration guide: 5-day timeline, Lakshmi Puja muhurat, cultural significance, festive recipes, wishes, and eco-friendly tips.')
      : isDhanteras
      ? (isHindi
          ? 'धनतेरस २०२६ की संपूर्ण मार्गदर्शिका: जानिए धनतेरस महत्व, धन्वंतरि जयंती, यम दीपदान विधि, धातु खरीद परंपरा, पकवान और पावन शुभकामनाएं।'
          : 'Complete Dhanteras 2026 celebration guide: discover festival significance, Dhanvantari Jayanti, Yamadeepdaan rituals, metal buying, wishes, and gift ideas.')
      : (isHindi
          ? `${festival.nameHi}: ${festival.about.summaryHi} जानिए शुभ मुहूर्त, पूजन विधि, गृह सज्जा और विशेष पकवान।`
          : `${festival.nameEn}: ${festival.about.summaryEn} Discover traditions, recipes, decoration ideas, and personalized greeting cards.`);

    const aliasesString = festival.regionalAliases ? festival.regionalAliases.join(', ') : '';
    const pageKeywords = isDiwali
      ? 'What is Diwali, Why is Diwali celebrated, Diwali festival in India, History and significance of Diwali, Five days of Diwali, Diwali traditions and celebrations, Diwali festival significance, How to celebrate Diwali, Deepavali, Lakshmi Puja, Dhanteras, Bhai Dooj'
      : isDhanteras
      ? 'What is Dhanteras, Why is Dhanteras celebrated, Dhanteras history and significance, Dhanteras puja and traditions, Dhanteras festival in India, Dhanteras wishes, Dhanteras gift ideas, Dhanteras greetings, Dhanvantari Jayanti, Yamadeepdaan, Dhanatrayodashi'
      : `${festival.nameEn}, ${festival.nameHi}, ${aliasesString}, festival celebration, rituals, recipes, wishes, greetings, decor ideas`;

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: isHindi ? festival.nameHi : festival.nameEn,
        description: isHindi ? festival.about.summaryHi : festival.about.summaryEn,
        startDate: '2026-11-08T18:00:00+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'India & Global Diaspora',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isHindi ? 'होम' : 'Home',
            item: 'https://festivewala.in/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isHindi ? 'त्योहार निर्देशिका' : 'Festivals',
            item: 'https://festivewala.in/festivals',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isHindi ? festival.nameHi : festival.nameEn,
            item: `https://festivewala.in/festivals/${festival.id}`,
          },
        ],
      },
      ...(isDhanteras
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: isHindi
                ? 'धनतेरस महापर्व संपूर्ण संदर्शिका — धन्वंतरि जयंती, यम दीपदान व परंपराएं'
                : 'Dhanteras Festival Guide — Significance, Dhanvantari, Yamadeepdaan & Rituals',
              description: pageDescription,
              author: {
                '@type': 'Organization',
                name: 'FestiveWala Editorial Board',
                url: 'https://festivewala.in',
              },
              publisher: {
                '@type': 'Organization',
                name: 'FestiveWala',
                url: 'https://festivewala.in',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://festivewala.in/assets/brand/festivewala-logo.svg',
                },
              },
              datePublished: '2026-10-01T08:00:00+05:30',
              dateModified: '2026-11-05T08:00:00+05:30',
              mainEntityOfPage: 'https://festivewala.in/festivals/dhanteras',
            },
          ]
        : []),
      ...(isDiwali
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: isHindi
                ? 'दीपावली महापर्व मार्गदर्शिका — इतिहास, ५ दिन, पूजन विधि व परंपराएं'
                : 'Diwali Festival Guide — 5 Days, History, Rituals, Food & Significance',
              description: pageDescription,
              author: {
                '@type': 'Organization',
                name: 'FestiveWala Editorial Board',
                url: 'https://festivewala.in',
              },
              publisher: {
                '@type': 'Organization',
                name: 'FestiveWala',
                url: 'https://festivewala.in',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://festivewala.in/assets/brand/festivewala-logo.svg',
                },
              },
              datePublished: '2026-10-01T08:00:00+05:30',
              dateModified: '2026-11-05T08:00:00+05:30',
              mainEntityOfPage: 'https://festivewala.in/festivals/diwali',
            },
          ]
        : []),
      ...(festival.faqs && festival.faqs.length > 0
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: festival.faqs.map((faq) => ({
                '@type': 'Question',
                name: isHindi ? faq.questionHi : faq.questionEn,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: isHindi ? faq.answerHi : faq.answerEn,
                },
              })),
            },
          ]
        : []),
    ];

    return { pageTitle, pageDescription, pageKeywords, jsonLd };
  }, [festival, isHindi]);

  if (!festival) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">
          {isHindi ? 'त्योहार विवरण उपलब्ध नहीं है' : 'Festival Not Found'}
        </h2>
        <p className="text-sm text-brand-dark/70 mb-6 max-w-md">
          {isHindi
            ? 'क्षमा करें, जिस त्योहार को आप खोज रहे हैं वह उपलब्ध नहीं है। कृपया हमारे मुख्य उत्सव पृष्ठ पर लौटें।'
            : 'The festival experience you are looking for does not exist or has been moved.'}
        </p>
        <Link
          to="/festivals"
          className="px-6 py-3 rounded-2xl bg-[#24113D] text-[#F2D98B] font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          {isHindi ? 'सभी त्योहार देखें' : 'Explore All Festivals'}
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isHindi ? festival.nameHi : festival.nameEn,
        text: isHindi ? festival.taglineHi : festival.taglineEn,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-brand-dark pb-20">
      {seoData && (
        <SEOHead
          title={seoData.pageTitle}
          description={seoData.pageDescription}
          keywords={seoData.pageKeywords}
          canonicalUrl={`https://festivewala.in/festivals/${festival.id}`}
          ogType="article"
          jsonLd={seoData.jsonLd}
          lang={isHindi ? 'hi' : 'en'}
        />
      )}

      {/* 1. HERO SECTION */}
      <section
        className={`relative pt-12 pb-16 sm:py-20 bg-gradient-to-b ${festival.bgGradient} text-[#FAF7F0] overflow-hidden border-b border-[#F2D98B]/30`}
      >
        <div className="absolute inset-0 bg-mandala opacity-[0.05] pointer-events-none" />
        <FestivalAtmosphere festivalId={festival.id} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/festivals"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#F2D98B] hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              <span>{isHindi ? 'वापस त्योहार सूची में जाएं' : 'Back to Festivals'}</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-[#FAF7F0] transition-all"
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span>{copiedLink ? (isHindi ? 'लिंक कॉपी हो गया!' : 'Link Copied!') : (isHindi ? 'शेयर करें' : 'Share')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest bg-white/10 text-[#F2D98B] border border-[#F2D98B]/40">
                <Sparkles size={13} className="text-[#F2D98B]" />
                <span>{isHindi ? 'पावन उत्सव अनुभव' : 'Sacred Celebration Experience'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                {isHindi ? festival.nameHi : festival.nameEn}
              </h1>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black/30 border border-white/15 text-xs sm:text-sm font-medium text-[#FAF7F0]/90">
                <Calendar size={15} className="text-[#F2D98B]" />
                <span>{isHindi ? festival.tithiHi : festival.tithiEn}</span>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-[#FAF7F0]/90 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {isHindi ? festival.taglineHi : festival.taglineEn}
              </p>

              <div className="pt-2">
                <FestivalCountdown festivalId={festival.id} showExploreLink={false} className="max-w-md mx-auto lg:mx-0 text-left" />
              </div>
              {/* Quick Jump Anchor CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <a
                  href="#traditions"
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#F2D98B] hover:bg-[#FFE082] text-[#24113D] font-bold text-xs sm:text-sm shadow-lg transition-transform active:scale-95 flex items-center gap-2 min-h-[44px]"
                >
                  <Flame size={16} />
                  <span>{isHindi ? 'परंपराएं व रीति-रिवाज' : 'Traditions & Customs'}</span>
                </a>
                <a
                  href="#recipes"
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-[#FAF7F0] font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <Utensils size={15} />
                  <span>{isHindi ? 'पारंपरिक व्यंजन' : 'Festive Recipes'}</span>
                </a>
                <Link
                  to={`/wishes`}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-[#FAF7F0] font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <BookOpen size={15} />
                  <span>{isHindi ? 'शुभकामनाएं' : 'Wishes Library'}</span>
                </Link>
              </div>
            </div>

            {/* Right Artwork Motif Frame */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-tr from-white/10 to-white/5 border-2 border-[#F2D98B]/40 p-4 shadow-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="absolute inset-0 rounded-3xl bg-[#F2D98B]/10 blur-xl pointer-events-none" />
                {festival.heroMotif === 'dhanteras-kalash' && (
                  <svg viewBox="0 0 200 200" className="w-56 h-56 text-[#F2D98B]">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="100" r="75" fill="none" stroke="#F2D98B" strokeWidth="0.75" />
                    <path d="M70 120 C70 160 85 170 100 170 C115 170 130 160 130 120 C130 114 125 110 120 110 L80 110 C75 110 70 114 70 120 Z" fill="#D4AF37" stroke="#F2D98B" strokeWidth="2" />
                    <ellipse cx="100" cy="110" rx="22" ry="5" fill="#B8860B" />
                    <path d="M85 110 C80 90 70 80 65 75 C75 80 90 92 92 108 Z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1" />
                    <path d="M115 110 C120 90 130 80 135 75 C125 80 110 92 108 108 Z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1" />
                    <path d="M100 108 C96 85 96 70 100 62 C104 70 104 85 100 108 Z" fill="#388E3C" stroke="#1B5E20" strokeWidth="1" />
                    <circle cx="100" cy="95" r="16" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" />
                    <circle cx="100" cy="138" r="6" fill="#F2D98B" />
                    <ellipse cx="62" cy="155" rx="10" ry="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1" transform="rotate(-15 62 155)" />
                    <ellipse cx="76" cy="165" rx="9" ry="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" transform="rotate(10 76 165)" />
                    <ellipse cx="138" cy="155" rx="10" ry="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1" transform="rotate(15 138 155)" />
                    <ellipse cx="124" cy="165" rx="9" ry="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" transform="rotate(-10 124 165)" />
                  </svg>
                )}
                {festival.heroMotif === 'diwali-diya' && (
                  <svg viewBox="0 0 200 200" className="w-56 h-56 text-[#F2D98B]">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="100" r="75" fill="none" stroke="#F2D98B" strokeWidth="0.75" />
                    <path d="M50 120 C50 150 72 160 100 160 C128 160 150 150 150 120 C150 116 145 114 142 114 C120 118 80 118 58 114 C55 114 50 116 50 120 Z" fill="#D4AF37" />
                    <ellipse cx="100" cy="116" rx="46" ry="6" fill="#B8860B" />
                    <path d="M100 45 C100 45 80 72 80 95 C80 106 89 115 100 115 C111 115 120 106 120 95 C120 72 100 45 100 45 Z" fill="#FFB300" />
                    <circle cx="100" cy="95" r="7" fill="#FFFFFF" />
                  </svg>
                )}
                {festival.heroMotif === 'holi-colors' && (
                  <svg viewBox="0 0 200 200" className="w-56 h-56">
                    <circle cx="70" cy="80" r="35" fill="#E91E63" opacity="0.85" />
                    <circle cx="130" cy="75" r="30" fill="#FFC107" opacity="0.85" />
                    <circle cx="95" cy="125" r="40" fill="#00BCD4" opacity="0.85" />
                    <circle cx="140" cy="130" r="25" fill="#4CAF50" opacity="0.8" />
                    <circle cx="100" cy="95" r="15" fill="#FFFFFF" opacity="0.9" />
                  </svg>
                )}
                {festival.heroMotif === 'rakhi-thread' && (
                  <svg viewBox="0 0 200 200" className="w-56 h-56">
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#FF5722" strokeWidth="4" strokeLinecap="round" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#FFD54F" strokeWidth="2" strokeDasharray="6 3" />
                    <circle cx="100" cy="100" r="36" fill="#D81B60" stroke="#FFD54F" strokeWidth="3" />
                    <circle cx="100" cy="100" r="24" fill="#FFB300" stroke="#FFF" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="10" fill="#D81B60" />
                  </svg>
                )}
                {festival.heroMotif === 'christmas-tree' && (
                  <svg viewBox="0 0 200 200" className="w-56 h-56">
                    <polygon points="100,35 70,80 130,80" fill="#2E7D32" />
                    <polygon points="100,65 60,115 140,115" fill="#1B5E20" />
                    <polygon points="100,95 50,150 150,150" fill="#0A3C13" />
                    <rect x="92" y="150" width="16" height="25" fill="#5D4037" />
                    <polygon points="100,22 104,32 114,32 106,38 109,48 100,42 91,48 94,38 86,32 96,32" fill="#FFD700" />
                  </svg>
                )}
                {festival.heroMotif === 'newyear-sparkler' && (
                  <svg viewBox="0 0 200 200" className="w-56 h-56">
                    <circle cx="100" cy="100" r="18" fill="#F2D98B" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                      <line
                        key={i}
                        x1="100"
                        y1="100"
                        x2={100 + 65 * Math.cos((deg * Math.PI) / 180)}
                        y2={100 + 65 * Math.sin((deg * Math.PI) / 180)}
                        stroke="#FFD54F"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    ))}
                    <circle cx="100" cy="100" r="6" fill="#FFF" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IF DIWALI: Render comprehensive 12-section enriched Diwali Guide Article */}
      {festival.id === 'diwali' ? (
        <DiwaliGuideArticle
          festival={festival}
          isHindi={isHindi}
          isHinglish={isHinglish}
        />
      ) : festival.id === 'dhanteras' ? (
        <DhanterasGuideArticle
          festival={festival}
          isHindi={isHindi}
          isHinglish={isHinglish}
        />
      ) : (
        <>
          {/* 2. ABOUT THE FESTIVAL */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-lg space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-brand-royal">
              {isHindi ? 'सांस्कृतिक पृष्ठभूमि व महत्व' : 'Cultural Lore & Significance'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep mt-1">
              {isHindi ? 'पर्व का परिचय और पावन इतिहास' : `About ${festival.nameEn}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-sm sm:text-base leading-relaxed text-brand-dark/85">
            <div className="space-y-4">
              <p>{isHindi ? festival.about.summaryHi : festival.about.summaryEn}</p>
              <p>{isHindi ? festival.about.culturalSignificanceHi : festival.about.culturalSignificanceEn}</p>
            </div>
            <div className="space-y-4 bg-brand-light/50 p-5 sm:p-6 rounded-2xl border border-brand-gold/25">
              <h3 className="font-serif text-base font-bold text-brand-deep flex items-center gap-2">
                <BookOpen size={16} className="text-brand-gold" />
                <span>{isHindi ? 'प्राचीन इतिहास व संदर्भ' : 'Historical & Traditional Origins'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi ? festival.about.historyHi : festival.about.historyEn}
              </p>
            </div>
          </div>

          {/* Key Themes Pillars */}
          <div className="pt-4 border-t border-brand-gold/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark/60 block mb-3">
              {isHindi ? 'प्रमुख मूल्य एवं प्रेरणा' : 'Core Festive Pillars'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {festival.about.keyThemes.map((theme, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-[#24113D]/5 border border-brand-gold/30 flex items-center gap-3"
                >
                  <span className="text-2xl">{theme.icon}</span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-brand-deep block">
                      {isHindi ? theme.hi : theme.en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRADITIONS & RITUALS */}
      <section id="traditions" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-brand-royal">
            {isHindi ? 'पावन रीति-रिवाज' : 'Customs & Practices'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep mt-1">
            {isHindi ? 'उत्सव की प्रमुख परंपराएं' : 'Traditional Rituals & Observances'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/70 mt-1">
            {isHindi
              ? 'पीढ़ियों से चली आ रही पवित्र प्रथाएं जो घर में शांति और आनंद का संचार करती हैं।'
              : 'Enduring sacred rituals handed down through centuries to bring blessings and togetherness.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festival.traditions.map((trad) => (
            <div
              key={trad.id}
              className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md flex flex-col justify-between space-y-4 hover:border-brand-gold transition-all"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center text-xl font-bold shadow-sm">
                  {trad.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-deep">
                  {isHindi ? trad.titleHi : trad.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                  {isHindi ? trad.descHi : trad.descEn}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-brand-gold/15">
                  <span className="text-[11px] font-bold text-brand-royal block">
                    {isHindi ? 'प्रमुख नियम व विधि:' : 'Key Customs:'}
                  </span>
                  {trad.customs.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-brand-dark/75">
                      <span className="text-brand-gold text-sm font-bold">•</span>
                      <span>{isHindi ? c.hi : c.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {trad.regionalVariations && (
                <div className="p-3 rounded-xl bg-brand-light/60 border border-brand-gold/20 text-[11px] text-brand-dark/80">
                  <span className="font-bold text-brand-deep block mb-0.5">
                    {isHindi ? 'क्षेत्रीय विशेषता:' : 'Regional Variation:'}
                  </span>
                  {isHindi ? trad.regionalVariations.hi : trad.regionalVariations.en}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. DECORATION INSPIRATION */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-brand-royal">
              {isHindi ? 'गृह सज्जा विचार' : 'Home Decor Ideas'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep mt-1">
              {isHindi ? 'उत्सव सज्जा एवं प्रेरणा' : 'Festival Decoration Inspiration'}
            </h2>
          </div>
          <Link
            to="/decoration-ideas"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-royal hover:text-brand-deep self-start sm:self-auto"
          >
            <span>{isHindi ? 'सभी सजावट विचार देखें' : 'Browse All Decor Ideas'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festival.decorations.map((dec) => (
            <div
              key={dec.id}
              className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3.5 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-light text-brand-royal border border-brand-gold/30">
                  {isHindi ? dec.tagHi : dec.tagEn}
                </span>
                <Palette size={16} className="text-brand-gold" />
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-brand-deep">
                {isHindi ? dec.titleHi : dec.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed">
                {isHindi ? dec.descHi : dec.descEn}
              </p>

              <div className="p-3 rounded-xl bg-[#24113D]/5 border border-brand-gold/25 text-xs text-brand-dark/80">
                <span className="font-bold text-brand-royal block mb-1">
                  💡 {isHindi ? 'विशेष सुझाव:' : 'Helpful Tip:'}
                </span>
                {isHindi ? dec.tipHi : dec.tipEn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOD & RECIPES */}
      <section id="recipes" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-brand-royal">
            {isHindi ? 'पारंपरिक स्वाद' : 'Culinary Heritage'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep mt-1">
            {isHindi ? 'उत्सव के विशेष पकवान व व्यंजन' : 'Traditional Festival Foods & Recipes'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {festival.recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-gold/30 shadow-md space-y-4 hover:border-brand-gold transition-all"
            >
              <div className="flex items-start justify-between gap-3 border-b border-brand-gold/20 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-light text-brand-royal">
                    {isHindi ? recipe.typeHi : recipe.typeEn}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep mt-1">
                    {isHindi ? recipe.nameHi : recipe.nameEn}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold-dark bg-brand-gold/15 px-2.5 py-1 rounded-xl">
                  <Clock size={13} />
                  <span>{isHindi ? recipe.timeHi : recipe.timeEn}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi ? recipe.descHi : recipe.descEn}
              </p>

              {/* Ingredients */}
              <div className="p-3.5 rounded-2xl bg-brand-light/50 border border-brand-gold/20 space-y-2">
                <span className="text-xs font-bold text-brand-royal uppercase tracking-wider block">
                  {isHindi ? 'आवश्यक सामग्री:' : 'Ingredients:'}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-brand-dark/80 font-sans">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-brand-gold font-bold">✓</span>
                      <span>{isHindi ? ing.hi : ing.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-royal uppercase tracking-wider block">
                  {isHindi ? 'बनाने की सरल विधि:' : 'Preparation Steps:'}
                </span>
                <ol className="space-y-1.5 text-xs text-brand-dark/80 font-sans">
                  {recipe.steps.map((st, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{isHindi ? st.hi : st.en}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GIFT INSPIRATION */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-brand-royal">
              {isHindi ? 'उपहार के विचार' : 'Thoughtful Gifting'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep mt-1">
              {isHindi ? 'स्नेह भरे उपहार व स्मृति चिन्ह' : 'Festive Gift Inspiration'}
            </h2>
          </div>
          <Link
            to="/gift-ideas"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-royal hover:text-brand-deep self-start sm:self-auto"
          >
            <span>{isHindi ? 'सम्पूर्ण उपहार गैलरी' : 'View Full Gift Guide'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festival.gifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md flex flex-col justify-between space-y-4 hover:shadow-xl transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-royal px-2.5 py-0.5 rounded-full bg-brand-light border border-brand-gold/30">
                    {isHindi ? gift.recipientTypeHi : gift.recipientTypeEn}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {gift.budgetRange}
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-deep">
                  {isHindi ? gift.titleHi : gift.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                  {isHindi ? gift.descHi : gift.descEn}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-gold/15 flex items-center justify-between text-xs text-brand-dark/60 font-medium">
                <span>{isHindi ? 'आत्मीय उपहार विचार' : 'Gift Suggestion'}</span>
                <Gift size={16} className="text-brand-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GREETINGS & WISHES CONNECT */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#24113D] via-[#351759] to-[#120524] text-[#FAF7F0] p-7 sm:p-12 border border-[#F2D98B]/35 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2D98B] block">
              {isHindi ? 'काव्यमय व हार्दिक संदेश' : 'Festival Wishes & Poetry'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              {isHindi
                ? `अपनों को भेजें ${festival.nameHi} की पावन शुभकामनाएं`
                : `Send Heartfelt Greetings for ${festival.nameEn}`}
            </h2>
            <p className="text-xs sm:text-base text-[#FAF7F0]/80 leading-relaxed font-light">
              {isHindi
                ? 'हमारे ५०० तैयार शुभकामना संदेशों में से चुनें या रिश्ता और भाव चुनकर व्यक्तिगत संदेश बनाएं।'
                : 'Browse our curated 500-message library, generate custom personalized wishes, or design bespoke greeting cards in Studio.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/wishes"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#F2D98B] hover:bg-[#FFE082] text-[#24113D] font-bold text-xs sm:text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 min-h-[46px]"
              >
                <BookOpen size={16} />
                <span>{isHindi ? '५०० संदेश संग्रह देखें' : 'Browse 500 Festival Wishes'}</span>
              </Link>
              <Link
                to="/greeting-cards"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-[#FAF7F0] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Palette size={16} />
                <span>{isHindi ? 'ग्रीटिंग स्टूडियो में कार्ड बनाएं' : 'Design Card in Studio'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 TRILINGUAL FAQ & SEARCH INSIGHTS */}
      {festival.faqs && festival.faqs.length > 0 && (
        <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrilingualFAQSection
            faqs={festival.faqs}
            festivalNameEn={festival.nameEn}
            festivalNameHi={festival.nameHi}
            initialLang={isHindi ? 'hi' : isHinglish ? 'hinglish' : 'en'}
          />
        </section>
      )}

      {/* 8. RELATED FESTIVAL EXPERIENCES */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-brand-royal">
            {isHindi ? 'संबंधित अनुभव' : 'Related Discoveries'}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-deep mt-1">
            {isHindi ? 'रंगोली, सजावट व उत्सव मार्गदर्शिकाएं' : 'Rangoli, Decor & Festival Guides'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Link
            to="/rangoli"
            className="group p-5 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-lg transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-brand-deep group-hover:text-brand-royal transition-colors block">
                {isHindi ? 'रंगोली गैलरी देखें' : 'Rangoli Art Gallery'}
              </span>
              <span className="text-[11px] text-brand-dark/60 font-sans block mt-0.5">
                {isHindi ? 'पारंपरिक, मयूर व पुष्प रंगोली' : 'Traditional & Floral Patterns'}
              </span>
            </div>
            <ArrowRight size={16} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/decoration-ideas"
            className="group p-5 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-lg transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-brand-deep group-hover:text-brand-royal transition-colors block">
                {isHindi ? 'सजावट के विचार' : 'Decoration Inspiration'}
              </span>
              <span className="text-[11px] text-brand-dark/60 font-sans block mt-0.5">
                {isHindi ? 'द्वार, बालकनी व लिविंग रूम' : 'DIY Entrance & Living Room'}
              </span>
            </div>
            <ArrowRight size={16} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/festival-guides"
            className="group p-5 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-lg transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-brand-deep group-hover:text-brand-royal transition-colors block">
                {isHindi ? 'उत्सव मार्गदर्शिकाएं' : 'Festival Guides & Lore'}
              </span>
              <span className="text-[11px] text-brand-dark/60 font-sans block mt-0.5">
                {isHindi ? 'इतिहास, परंपराएं व पर्यावरण' : 'Traditions & Conscious Celebrating'}
              </span>
            </div>
            <ArrowRight size={16} className="text-brand-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
        </>
      )}
    </div>
  );
};
