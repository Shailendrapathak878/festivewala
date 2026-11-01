import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Compass,
  Palette,
  Heart,
  Flame,
  Gift,
  PartyPopper,
  Pause,
  Play,
} from 'lucide-react';

interface FestivalSlide {
  id: string;
  festivalId: string;
  nameEn: string;
  nameHi: string;
  nameHinglish: string;
  taglineEn: string;
  taglineHi: string;
  taglineHinglish: string;
  descEn: string;
  descHi: string;
  descHinglish: string;
  dateEn: string;
  dateHi: string;
  dateHinglish: string;
  tagEn: string;
  tagHi: string;
  tagHinglish: string;
  primaryCtaTextEn: string;
  primaryCtaTextHi: string;
  primaryCtaTextHinglish: string;
  primaryCtaLink: string;
  secondaryCtaTextEn: string;
  secondaryCtaTextHi: string;
  secondaryCtaTextHinglish: string;
  secondaryCtaLink: string;
  accentColor: string;
  secondaryColor: string;
  bgGradient: string;
  cardTheme: string;
  icon: React.ReactNode;
}

const FESTIVAL_SLIDES: FestivalSlide[] = [
  {
    id: 'slide-diwali',
    festivalId: 'diwali',
    nameEn: 'Diwali',
    nameHi: 'दीपावली',
    nameHinglish: 'Diwali',
    taglineEn: 'Celebrate the Festival of Lights',
    taglineHi: 'दीपोत्सव का पावन महापर्व मनाएं',
    taglineHinglish: 'Diwali — Roshni aur khushiyon ka mahaparv',
    descEn: 'Light earthen diyas, craft radiant rangoli, and share royal golden greetings with family and friends.',
    descHi: 'दीपों की जगमगाहट, पावन रंगोली और अपनों के लिए खूबसूरत सुनहरी ग्रीटिंग्स के साथ खुशियां बांटें।',
    descHinglish: 'Mitti ke diye jalayein, sundar rangoli banayein aur apno ke sath royal greetings share karein.',
    dateEn: 'Kartik Amavasya 2026 • Nov 8, 2026',
    dateHi: 'कार्तिक अमावस्या २०२६ • ८ नवंबर २०२६',
    dateHinglish: 'Kartik Amavasya 2026 • 8 Nov 2026',
    tagEn: 'Festival of Lights',
    tagHi: 'दीपोत्सव',
    tagHinglish: 'Lights Festival',
    primaryCtaTextEn: 'Explore Diwali',
    primaryCtaTextHi: 'दीपावली जानें',
    primaryCtaTextHinglish: 'Explore Diwali',
    primaryCtaLink: '/festivals/diwali',
    secondaryCtaTextEn: 'Create Greeting',
    secondaryCtaTextHi: 'ग्रीटिंग बनाएं',
    secondaryCtaTextHinglish: 'Card Banayein',
    secondaryCtaLink: '/greeting-cards?template=photo-royal-portrait',
    accentColor: '#D4AF37',
    secondaryColor: '#E65100',
    bgGradient: 'from-[#24113D] via-[#351759] to-[#120524]',
    cardTheme: 'from-[#1E0B36] to-[#2B104C]',
    icon: <Flame className="w-5 h-5 text-[#F2D98B]" />,
  },
  {
    id: 'slide-holi',
    festivalId: 'holi',
    nameEn: 'Holi',
    nameHi: 'होली',
    nameHinglish: 'Holi',
    taglineEn: 'Add Colours to Every Connection',
    taglineHi: 'हर रिश्ते में खुशियों के रंग भरें',
    taglineHinglish: 'Har rishte mein rang aur khushiyan bharein',
    descEn: 'Celebrate spring renewal, play with fragrant herbal gulal, and send joyous festive wishes across miles.',
    descHi: 'वसंत का उल्लास, अबीर-गुलाल की खुशबू और दूर बैठे अपनों को प्रेम भरे शुभकामना संदेश भेजें।',
    descHinglish: 'Vasant ka welcome karein, herbal gulal lagayein aur apno ko pyari wishes bhejein.',
    dateEn: 'Phalguna Purnima 2027 • Mar 22, 2027',
    dateHi: 'फाल्गुन पूर्णिमा २०२७ • २२ मार्च २०२७',
    dateHinglish: 'Phalguna Purnima 2027 • 22 March 2027',
    tagEn: 'Festival of Colors',
    tagHi: 'रंगोत्सव',
    tagHinglish: 'Colors Festival',
    primaryCtaTextEn: 'Explore Holi',
    primaryCtaTextHi: 'होली जानें',
    primaryCtaTextHinglish: 'Explore Holi',
    primaryCtaLink: '/festivals/holi',
    secondaryCtaTextEn: 'Send Wishes',
    secondaryCtaTextHi: 'शुभकामनाएं भेजें',
    secondaryCtaTextHinglish: 'Wishes Bhejein',
    secondaryCtaLink: '/wishes',
    accentColor: '#E91E63',
    secondaryColor: '#FF6F00',
    bgGradient: 'from-[#2A081C] via-[#481132] to-[#160410]',
    cardTheme: 'from-[#260B1C] to-[#3B112D]',
    icon: <Palette className="w-5 h-5 text-rose-400" />,
  },
  {
    id: 'slide-raksha-bandhan',
    festivalId: 'raksha-bandhan',
    nameEn: 'Raksha Bandhan',
    nameHi: 'रक्षाबंधन',
    nameHinglish: 'Raksha Bandhan',
    taglineEn: 'Celebrate the Bond That Lasts Forever',
    taglineHi: 'भाई-बहन के अटूट स्नेह का उत्सव',
    taglineHinglish: 'Bhai-behen ke anmol pyaar ka celebration',
    descEn: 'Tie the sacred thread of affection, exchange heartfelt sibling promises, and design custom photo greetings.',
    descHi: 'पवित्र रेशमी राखी का धागा, रक्षा का पावन संकल्प और यादों से सजे व्यक्तिगत फोटो कार्ड्स बनाएं।',
    descHinglish: 'Pavitra rakhi ka dhaaga, affection ke promises aur photo memory cards ke sath celebrate karein.',
    dateEn: 'Shravana Purnima 2027 • Aug 28, 2027',
    dateHi: 'श्रावण पूर्णिमा २०२७ • २८ अगस्त २०२७',
    dateHinglish: 'Shravana Purnima 2027 • 28 Aug 2027',
    tagEn: 'Bond of Protection',
    tagHi: 'स्नेह बंधन',
    tagHinglish: 'Sibling Bond',
    primaryCtaTextEn: 'Explore Rakhi',
    primaryCtaTextHi: 'रक्षाबंधन जानें',
    primaryCtaTextHinglish: 'Explore Rakhi',
    primaryCtaLink: '/festivals/raksha-bandhan',
    secondaryCtaTextEn: 'Create Greeting',
    secondaryCtaTextHi: 'ग्रीटिंग बनाएं',
    secondaryCtaTextHinglish: 'Card Banayein',
    secondaryCtaLink: '/greeting-cards',
    accentColor: '#D81B60',
    secondaryColor: '#F2D98B',
    bgGradient: 'from-[#240A1F] via-[#3E1136] to-[#140512]',
    cardTheme: 'from-[#220B1D] to-[#36132F]',
    icon: <Heart className="w-5 h-5 text-pink-400" />,
  },
  {
    id: 'slide-christmas',
    festivalId: 'christmas',
    nameEn: 'Christmas',
    nameHi: 'क्रिसमस',
    nameHinglish: 'Christmas',
    taglineEn: 'Share the Joy of Togetherness',
    taglineHi: 'अपनों संग खुशियां और शांति बांटें',
    taglineHinglish: 'Apno ke saath peace aur happiness share karein',
    descEn: 'Embrace the warmth of winter carols, evergreen wreaths, thoughtful holiday gifts, and heartfelt wishes.',
    descHi: 'शांति और उल्लास का पावन पर्व — मधुर कैरल्स, प्रार्थनाएं, खूबसूरत उपहार और शुभकामनाएं साझा करें।',
    descHinglish: 'Winter carols, festive gifts aur apno ke sath heartfelt blessings share karne ka season.',
    dateEn: 'December 25, 2026',
    dateHi: '२५ दिसम्बर २०२६',
    dateHinglish: '25 December 2026',
    tagEn: 'Season of Peace',
    tagHi: 'प्रेम व शांति',
    tagHinglish: 'Peace & Joy',
    primaryCtaTextEn: 'Explore Christmas',
    primaryCtaTextHi: 'क्रिसमस जानें',
    primaryCtaTextHinglish: 'Explore Christmas',
    primaryCtaLink: '/festivals/christmas',
    secondaryCtaTextEn: 'Send Wishes',
    secondaryCtaTextHi: 'शुभकामनाएं भेजें',
    secondaryCtaTextHinglish: 'Wishes Bhejein',
    secondaryCtaLink: '/wishes',
    accentColor: '#10B981',
    secondaryColor: '#F2D98B',
    bgGradient: 'from-[#102318] via-[#1A3827] to-[#0A160F]',
    cardTheme: 'from-[#122319] to-[#1C3A2A]',
    icon: <Gift className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'slide-new-year',
    festivalId: 'new-year',
    nameEn: 'New Year',
    nameHi: 'नव वर्ष',
    nameHinglish: 'New Year',
    taglineEn: 'Welcome New Beginnings',
    taglineHi: 'नवीन आशाओं और अवसरों का स्वागत',
    taglineHinglish: 'Nayi umeedon aur naye shuruat ka welcome karein',
    descEn: 'Step into fresh horizons with radiant optimism, inspiring resolutions, and celebratory digital cards.',
    descHi: 'नई उमंगों, स्वर्णिम संकल्पों और सकारात्मक ऊर्जा के साथ नव वर्ष के शुभागमन का अभिनंदन करें।',
    descHinglish: 'Naye saal ki shuruat positive energy, inspiring resolutions aur beautiful cards ke sath karein.',
    dateEn: 'January 1, 2027',
    dateHi: '१ जनवरी २०२७',
    dateHinglish: '1 January 2027',
    tagEn: 'New Horizons 2027',
    tagHi: 'नवीन आरंभ',
    tagHinglish: 'New Beginnings',
    primaryCtaTextEn: 'Explore New Year',
    primaryCtaTextHi: 'नव वर्ष जानें',
    primaryCtaTextHinglish: 'Explore New Year',
    primaryCtaLink: '/festivals/new-year',
    secondaryCtaTextEn: 'Create Greeting',
    secondaryCtaTextHi: 'ग्रीटिंग बनाएं',
    secondaryCtaTextHinglish: 'Card Banayein',
    secondaryCtaLink: '/greeting-cards',
    accentColor: '#F2D98B',
    secondaryColor: '#60A5FA',
    bgGradient: 'from-[#10162B] via-[#1A2649] to-[#0A0D1B]',
    cardTheme: 'from-[#121932] to-[#1E2E5C]',
    icon: <PartyPopper className="w-5 h-5 text-[#F2D98B]" />,
  },
];

export const HeroFestivalCarousel: React.FC = () => {
  const { isHindi, loc } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch Swipe coordinates
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeSlide = FESTIVAL_SLIDES[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % FESTIVAL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + FESTIVAL_SLIDES.length) % FESTIVAL_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Automatic Carousel Transition (5.5s interval)
  useEffect(() => {
    if (isPaused || userPaused || shouldReduceMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, userPaused, shouldReduceMotion, nextSlide]);

  // Pause carousel when browser tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 45; // Minimum drag distance to trigger slide
    if (diffX > threshold) {
      nextSlide();
    } else if (diffX < -threshold) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Localized getters
  const getSlideName = (s: FestivalSlide) => loc(s.nameEn, s.nameHi, s.nameHinglish);
  const getSlideTagline = (s: FestivalSlide) => loc(s.taglineEn, s.taglineHi, s.taglineHinglish);
  const getSlideDesc = (s: FestivalSlide) => loc(s.descEn, s.descHi, s.descHinglish);
  const getSlideDate = (s: FestivalSlide) => loc(s.dateEn, s.dateHi, s.dateHinglish);
  const getSlideTag = (s: FestivalSlide) => loc(s.tagEn, s.tagHi, s.tagHinglish);
  const getPrimaryCta = (s: FestivalSlide) => loc(s.primaryCtaTextEn, s.primaryCtaTextHi, s.primaryCtaTextHinglish);
  const getSecondaryCta = (s: FestivalSlide) => loc(s.secondaryCtaTextEn, s.secondaryCtaTextHi, s.secondaryCtaTextHinglish);

  return (
    <div
      className="relative w-full overflow-hidden transition-colors duration-700 bg-brand-deep"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label={isHindi ? 'त्योहार उत्सव कैरोसेल' : 'Featured Festival Showcase Carousel'}
    >
      {/* Dynamic Background Atmosphere Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${activeSlide.bgGradient} opacity-95 transition-all duration-700 pointer-events-none`}
      />

      {/* Subtle Ambient Mandala Watermark */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Carousel Frame Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Content Column (7 cols desktop) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
              {/* Badge & Date Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold/20 text-[#F2D98B] border border-brand-gold/35 shadow-sm">
                  {activeSlide.icon}
                  <span>{getSlideTag(activeSlide)}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-[#FAF7F0]/85 border border-white/10 backdrop-blur-sm">
                  <Calendar size={13} className="text-[#F2D98B]" />
                  <span>{getSlideDate(activeSlide)}</span>
                </span>
              </div>

              {/* Slide Title */}
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F2D98B]/90 block">
                  {getSlideName(activeSlide)} • {isHindi ? 'विशेष उत्सव' : 'Signature Celebration'}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF7F0] tracking-tight leading-[1.15]">
                  {getSlideTagline(activeSlide)}
                </h1>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-[#FAF7F0]/80 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
                {getSlideDesc(activeSlide)}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to={activeSlide.primaryCtaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#F2D98B] via-[#D4AF37] to-[#F2D98B] text-[#24113D] font-bold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.98] transition-all min-h-[48px]"
                >
                  <Compass size={18} className="text-[#24113D]" />
                  <span>{getPrimaryCta(activeSlide)}</span>
                  <ArrowRight size={16} className="text-[#24113D]" />
                </Link>

                <Link
                  to={activeSlide.secondaryCtaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-[#FAF7F0] border border-brand-gold/35 font-semibold text-sm sm:text-base backdrop-blur-md active:scale-[0.98] transition-all min-h-[48px]"
                >
                  <Sparkles size={17} className="text-[#F2D98B]" />
                  <span>{getSecondaryCta(activeSlide)}</span>
                </Link>
              </div>

              {/* Beginner Friendly Micro-Pill Assurance */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-4 text-xs text-[#FAF7F0]/65">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {isHindi ? '१००% निःशुल्क' : '100% Free to Use'}
                </span>
                <span>•</span>
                <span>{isHindi ? 'कोई लॉगिन जरूरी नहीं' : 'No Account Needed'}</span>
                <span>•</span>
                <span>{isHindi ? 'तुरंत शेयर करें' : 'Instant WhatsApp Share'}</span>
              </div>
            </div>

            {/* Right Showcase Visual Card (5 cols desktop) */}
            <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
              <div
                className={`relative w-full max-w-[320px] sm:max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-b ${activeSlide.cardTheme} p-2 shadow-2xl border-2 border-[#F2D98B]/50 overflow-hidden transform hover:scale-[1.01] transition-transform`}
              >
                {/* Inner Border Frame */}
                <div className="w-full h-full rounded-2xl border border-brand-gold/30 p-5 flex flex-col justify-between relative overflow-hidden bg-brand-deep/80">
                  {/* Decorative Corner Filigrees */}
                  <svg viewBox="0 0 36 36" fill="none" className="absolute top-2 left-2 w-6 h-6 text-brand-gold opacity-60">
                    <path d="M2 34V2H34" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="2" cy="2" r="2.5" fill="#F2D98B" />
                  </svg>
                  <svg viewBox="0 0 36 36" fill="none" className="absolute top-2 right-2 w-6 h-6 text-brand-gold opacity-60">
                    <path d="M34 34V2H2" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="34" cy="2" r="2.5" fill="#F2D98B" />
                  </svg>
                  <svg viewBox="0 0 36 36" fill="none" className="absolute bottom-2 left-2 w-6 h-6 text-brand-gold opacity-60">
                    <path d="M2 2V34H34" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="2" cy="34" r="2.5" fill="#F2D98B" />
                  </svg>
                  <svg viewBox="0 0 36 36" fill="none" className="absolute bottom-2 right-2 w-6 h-6 text-brand-gold opacity-60">
                    <path d="M34 2V34H2" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="34" cy="34" r="2.5" fill="#F2D98B" />
                  </svg>

                  {/* Card Header Badge */}
                  <div className="text-center pt-1">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest bg-brand-gold/15 text-[#F2D98B] border border-brand-gold/35">
                      {getSlideName(activeSlide)} Edition
                    </span>
                  </div>

                  {/* Card Center Artwork Visual */}
                  <div className="relative my-auto flex flex-col items-center justify-center text-center">
                    {/* Glowing Aura */}
                    <div
                      className="absolute inset-0 rounded-full blur-2xl opacity-40 pointer-events-none"
                      style={{ backgroundColor: activeSlide.accentColor }}
                    />

                    {/* Cultural Artwork SVGs by Festival */}
                    {activeSlide.festivalId === 'diwali' && (
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
                          <circle cx="80" cy="80" r="70" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                          <circle cx="80" cy="80" r="52" stroke="#F2D98B" strokeWidth="0.75" opacity="0.5" />
                          {/* Clay Diya */}
                          <path
                            d="M40 95C40 120 58 128 80 128C102 128 120 120 120 95C120 92 116 90 114 90C96 93 64 93 46 90C44 90 40 92 40 95Z"
                            fill="url(#diwaliGoldGrad)"
                          />
                          <ellipse cx="80" cy="92" rx="38" ry="4" fill="#B8860B" opacity="0.8" />
                          {/* Flame */}
                          <path
                            d="M80 34C80 34 64 56 64 74C64 83 71.2 90 80 90C88.8 90 96 83 96 74C96 56 80 34 80 34Z"
                            fill="url(#diwaliFlameGrad)"
                          />
                          <circle cx="80" cy="74" r="6" fill="#FFFFFF" opacity="0.9" />
                          <defs>
                            <linearGradient id="diwaliGoldGrad" x1="40" y1="90" x2="120" y2="128" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#F2D98B" />
                              <stop offset="0.5" stopColor="#D4AF37" />
                              <stop offset="1" stopColor="#996515" />
                            </linearGradient>
                            <linearGradient id="diwaliFlameGrad" x1="64" y1="34" x2="96" y2="90" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FFFFFF" />
                              <stop offset="0.3" stopColor="#F2D98B" />
                              <stop offset="0.7" stopColor="#D4AF37" />
                              <stop offset="1" stopColor="#E65100" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    )}

                    {activeSlide.festivalId === 'holi' && (
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
                          <circle cx="80" cy="80" r="68" stroke="#E91E63" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                          {/* Gulal Thali Bowl */}
                          <ellipse cx="80" cy="115" rx="55" ry="16" fill="#D4AF37" />
                          <ellipse cx="80" cy="112" rx="50" ry="13" fill="#3D0A24" />
                          {/* Colored Powders */}
                          <circle cx="60" cy="100" r="18" fill="#E91E63" opacity="0.9" />
                          <circle cx="100" cy="100" r="18" fill="#FFB300" opacity="0.9" />
                          <circle cx="80" cy="88" r="22" fill="#10B981" opacity="0.95" />
                          {/* Color Splashes / Gulal Clouds */}
                          <path d="M80 30 Q70 60 50 65 Q70 70 80 85 Q90 70 110 65 Q90 60 80 30Z" fill="url(#holiSplashGrad)" />
                          <circle cx="45" cy="50" r="6" fill="#E91E63" opacity="0.8" />
                          <circle cx="115" cy="50" r="6" fill="#FFB300" opacity="0.8" />
                          <circle cx="80" cy="22" r="4" fill="#06B6D4" opacity="0.8" />
                          <defs>
                            <linearGradient id="holiSplashGrad" x1="50" y1="30" x2="110" y2="85" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E91E63" />
                              <stop offset="0.5" stopColor="#FFB300" />
                              <stop offset="1" stopColor="#10B981" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    )}

                    {activeSlide.festivalId === 'raksha-bandhan' && (
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
                          <circle cx="80" cy="80" r="68" stroke="#D81B60" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                          {/* Rakhi Sacred Thread Horizontal */}
                          <path d="M10 80 Q80 75 150 80" stroke="#F2D98B" strokeWidth="3" />
                          <path d="M10 80 Q80 85 150 80" stroke="#DC2626" strokeWidth="2" strokeDasharray="6 4" />
                          {/* Rakhi Center Floral Motif */}
                          <circle cx="80" cy="80" r="32" fill="#240A1F" stroke="#D4AF37" strokeWidth="2" />
                          <circle cx="80" cy="80" r="24" fill="#DC2626" />
                          {/* Gold Petals */}
                          {Array.from({ length: 8 }).map((_, i) => {
                            const angle = (i * 45 * Math.PI) / 180;
                            const px = 80 + Math.cos(angle) * 18;
                            const py = 80 + Math.sin(angle) * 18;
                            return <circle key={i} cx={px} cy={py} r="4" fill="#F2D98B" />;
                          })}
                          <circle cx="80" cy="80" r="8" fill="#F2D98B" />
                          <circle cx="80" cy="80" r="4" fill="#FFFFFF" />
                        </svg>
                      </div>
                    )}

                    {activeSlide.festivalId === 'christmas' && (
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
                          <circle cx="80" cy="80" r="68" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                          {/* Christmas Pine Tree */}
                          <path d="M80 25 L98 55 H88 L104 85 H92 L110 115 H50 L68 85 H56 L72 55 H62 Z" fill="url(#xmasTreeGrad)" />
                          {/* Trunk */}
                          <rect x="74" y="115" width="12" height="15" fill="#8B5A2B" rx="2" />
                          {/* Star on top */}
                          <polygon points="80,14 83,23 92,23 85,28 87,37 80,31 73,37 75,28 68,23 77,23" fill="#F2D98B" />
                          {/* Baubles */}
                          <circle cx="70" cy="70" r="4" fill="#E11D48" />
                          <circle cx="90" cy="75" r="4" fill="#F2D98B" />
                          <circle cx="65" cy="100" r="5" fill="#F2D98B" />
                          <circle cx="85" cy="98" r="5" fill="#E11D48" />
                          <circle cx="100" cy="104" r="4" fill="#38BDF8" />
                          <defs>
                            <linearGradient id="xmasTreeGrad" x1="80" y1="25" x2="80" y2="115" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#34D399" />
                              <stop offset="0.6" stopColor="#059669" />
                              <stop offset="1" stopColor="#064E3B" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    )}

                    {activeSlide.festivalId === 'new-year' && (
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
                          <circle cx="80" cy="80" r="68" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                          {/* Clock Face at 12 */}
                          <circle cx="80" cy="80" r="44" fill="#181E36" stroke="#F2D98B" strokeWidth="2.5" />
                          {/* Clock hands pointing to 12 */}
                          <line x1="80" y1="80" x2="80" y2="48" stroke="#F2D98B" strokeWidth="3" strokeLinecap="round" />
                          <line x1="80" y1="80" x2="80" y2="56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="80" cy="80" r="4" fill="#F2D98B" />
                          {/* Roman Markers */}
                          <circle cx="80" cy="42" r="2.5" fill="#F2D98B" />
                          <circle cx="118" cy="80" r="2" fill="#F2D98B" opacity="0.7" />
                          <circle cx="80" cy="118" r="2" fill="#F2D98B" opacity="0.7" />
                          <circle cx="42" cy="80" r="2" fill="#F2D98B" opacity="0.7" />
                          {/* Celebration Sparkler bursts */}
                          <path d="M25 35 L35 45 M135 35 L125 45 M30 125 L40 115 M130 125 L120 115" stroke="#F2D98B" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="30" cy="40" r="2" fill="#FFFFFF" />
                          <circle cx="130" cy="40" r="2" fill="#FFFFFF" />
                        </svg>
                      </div>
                    )}

                    {/* Card Title & Sanskrit/Festive Mantra */}
                    <div className="mt-3 space-y-1">
                      <h3 className="font-serif text-lg font-bold text-[#F2D98B] tracking-wide">
                        {getSlideName(activeSlide)}
                      </h3>
                      <p className="text-[11px] text-[#FAF7F0]/75 italic font-serif">
                        {activeSlide.festivalId === 'diwali' && '"Tamaso Mā Jyotirgamaya"'}
                        {activeSlide.festivalId === 'holi' && '"Ullās & Rangotsav"'}
                        {activeSlide.festivalId === 'raksha-bandhan' && '"Yen Baddho Bali Rājā"'}
                        {activeSlide.festivalId === 'christmas' && '"Peace on Earth, Goodwill to All"'}
                        {activeSlide.festivalId === 'new-year' && '"New Horizons, Endless Light"'}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Bar Link */}
                  <div className="pt-2 border-t border-brand-gold/25 flex items-center justify-between text-xs">
                    <span className="text-[#FAF7F0]/60 text-[10px] font-sans">
                      FestiveWala Studio
                    </span>
                    <Link
                      to={activeSlide.primaryCtaLink}
                      className="text-[#F2D98B] hover:underline font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>{isHindi ? 'विवरण' : 'Explore'}</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Bar (Bottom Controls) */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slide selectors">
            {FESTIVAL_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.nameEn}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#F2D98B] shadow-md shadow-amber-500/20'
                      : 'w-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Festival Name Preview / Progress */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-serif text-[#F2D98B]">
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>
              {currentIndex + 1} / {FESTIVAL_SLIDES.length} • {getSlideName(activeSlide)}
            </span>
          </div>

          {/* Previous / Next / Pause Manual Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUserPaused(!userPaused)}
              aria-label={userPaused ? 'Resume autoplay' : 'Pause autoplay'}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[#FAF7F0] border border-white/15 flex items-center justify-center transition-all cursor-pointer"
            >
              {userPaused ? <Play size={15} /> : <Pause size={15} />}
            </button>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous festival slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[#FAF7F0] border border-white/15 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next festival slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[#FAF7F0] border border-white/15 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
