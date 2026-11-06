import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import {
  RANGOLI_CATEGORIES,
  RANGOLI_DESIGNS,
  type RangoliDesign,
} from '../data/rangoli/rangoliData';
import { RangoliArtwork } from '../features/rangoli/components/RangoliArtwork';
import { useRangoliFavorites } from '../features/rangoli/hooks/useRangoliFavorites';
import {
  downloadRangoliSvg,
  downloadRangoliPng,
} from '../features/rangoli/services/rangoliDownloadService';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import {
  Search,
  X,
  Heart,
  Download,
  Eye,
  Clock,
  Sparkles,
  Check,
  Layers,
  Palette,
} from 'lucide-react';

export const RangoliPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const { favoriteIds, toggleFavorite, isFavorite } = useRangoliFavorites();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [activeModalDesign, setActiveModalDesign] = useState<RangoliDesign | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const filteredDesigns = useMemo(() => {
    return RANGOLI_DESIGNS.filter((design) => {
      // Favorites filter
      if (showOnlyFavorites && !favoriteIds.includes(design.id)) {
        return false;
      }

      // Category filter
      if (activeCategory !== 'all' && design.category !== activeCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && design.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mEn = design.titleEn.toLowerCase().includes(q) || design.descEn.toLowerCase().includes(q) || design.conceptEn.toLowerCase().includes(q);
        const mHi = design.titleHi.toLowerCase().includes(q) || design.descHi.toLowerCase().includes(q) || design.conceptHi.toLowerCase().includes(q);
        if (!mEn && !mHi) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, selectedDifficulty, showOnlyFavorites, favoriteIds]);

  const handleDownloadSvg = async () => {
    if (!activeModalDesign) return;
    const svgEl = document.querySelector('#rangoli-modal-artwork svg') as SVGSVGElement | null;
    if (svgEl) {
      setIsDownloading(true);
      await downloadRangoliSvg(svgEl, `FestiveWala-Rangoli-${activeModalDesign.id}`);
      setIsDownloading(false);
    }
  };

  const handleDownloadPng = async () => {
    if (!activeModalDesign) return;
    const svgEl = document.querySelector('#rangoli-modal-artwork svg') as SVGSVGElement | null;
    if (svgEl) {
      setIsDownloading(true);
      await downloadRangoliPng(svgEl, `FestiveWala-Rangoli-${activeModalDesign.id}`, 1200, 1200);
      setIsDownloading(false);
    }
  };

  const seoConfig = isHindi ? STATIC_ROUTE_SEO.rangoli.hi : STATIC_ROUTE_SEO.rangoli.en;

  const rangoliFaqs = isHindi
    ? [
        {
          q: 'शुरुआती लोगों के लिए सबसे सरल रंगोली डिजाइन कौन से हैं?',
          a: 'शुरुआती लोगों के लिए बिंदू वाली रंगोली (Chukki Kolam) और फूलों की पंखुड़ियों (Marigold/Rose petals) से बनी रंगोली सबसे आसान और सुंदर होती है।',
        },
        {
          q: 'रंगोली बनाने के लिए किन पारंपरिक सामग्रियों का उपयोग किया जाता है?',
          a: 'पारंपरिक रूप से सूखे चावल का आटा, सफेद पत्थर का चूर्ण, प्राकृतिक गुलाल, हल्दी, कुमकुम और ताजे फूलों का उपयोग किया जाता है।',
        },
        {
          q: 'क्या मैं इन रंगोली डिजाइनों को मुफ्त डाउनलोड कर सकता हूँ?',
          a: 'हाँ, फेस्टिववाला पर सभी रंगोली डिजाइनों के लिए वेक्टर एसवीजी (SVG) और हाई-डेफिनिशन पीएनजी (HD PNG) मुफ्त डाउनलोड उपलब्ध है।',
        },
      ]
    : [
        {
          q: 'Which rangoli designs are easiest for beginners to draw at home?',
          a: 'Dot-grid patterns (Chukki Rangoli) and floral petal mandalas with marigolds and rose petals are the easiest, most forgiving designs for beginners.',
        },
        {
          q: 'What traditional materials are best for Diwali rangoli?',
          a: 'Traditionally, coarse white rice flour, powdered quartz, natural dry colors, turmeric, kumkum, and fresh flower petals are used to invite positive energy and prosperity.',
        },
        {
          q: 'Can I download these Rangoli patterns for free?',
          a: 'Yes, every design on FestiveWala can be freely downloaded as scalable vector SVG files and high-resolution PNG images for offline reference.',
        },
      ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: isHindi ? 'दिवाली के लिए रंगोली डिजाइन संग्रह' : 'Rangoli Designs for Diwali Collection',
      url: seoConfig.canonicalUrl,
      description: seoConfig.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: rangoliFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        jsonLd={jsonLd}
        lang={isHindi ? 'hi' : 'en'}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Prominent Page H1 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold text-brand-deep">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{isHindi ? 'रंगोली कला वीथिका' : 'Rangoli Art Gallery'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep leading-tight">
            {isHindi ? 'दिवाली के लिए रंगोली डिजाइन — सरल व सुंदर पैटर्न' : 'Rangoli Designs for Diwali — Simple & Easy Patterns'}
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {isHindi
              ? 'घर के लिए सरल रंगोली डिजाइन, पारंपरिक कोलम, पुष्प मांडना और निःशुल्क एचडी डाउनलोड।'
              : 'Explore simple rangoli designs for home, Diwali rangoli patterns, flower kolams, and free HD SVG/PNG downloads.'}
          </p>
        </div>

        {/* View Mode & Favorites Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="rangoli-search-input"
              name="rangoliSearch"
              aria-label="Search Rangoli designs"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'रंगोली खोजें (उदा: मयूर, दीप, कोलम, कमल)...' : 'Search designs (e.g. peacock, diya, kolam, lotus)...'}
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

          {/* Difficulty & Favorites Filter */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <select
              id="rangoli-difficulty-select"
              name="rangoliDifficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              aria-label={isHindi ? 'कठिनाई स्तर चुनें' : 'Select Difficulty'}
              className="px-3 py-2 rounded-xl bg-white border border-brand-gold/30 text-xs font-semibold text-brand-dark outline-none focus:border-brand-royal min-h-[42px] shadow-sm"
            >
              <option value="all">{isHindi ? 'सभी स्तर' : 'All Difficulties'}</option>
              <option value="Beginner">{isHindi ? 'सरल (Beginner)' : 'Beginner Friendly'}</option>
              <option value="Intermediate">{isHindi ? 'मध्यम (Intermediate)' : 'Intermediate'}</option>
              <option value="Advanced">{isHindi ? 'विस्तृत (Advanced)' : 'Advanced'}</option>
            </select>

            <button
              type="button"
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all min-h-[42px] ${
                showOnlyFavorites
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-white text-brand-dark border-brand-gold/30 hover:border-brand-gold'
              }`}
            >
              <Heart size={14} className={showOnlyFavorites ? 'fill-current' : 'text-rose-500'} />
              <span>{isHindi ? 'सहेजे गए' : 'Saved'}</span>
              {favoriteIds.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 font-bold ml-0.5">
                  {favoriteIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {RANGOLI_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowOnlyFavorites(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border min-h-[40px] ${
                  isActive && !showOnlyFavorites
                    ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm scale-[1.02]'
                    : 'bg-white text-brand-dark/75 border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                {isHindi ? cat.labelHi : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="text-xs text-brand-dark/60 font-mono px-1">
          {isHindi
            ? `${filteredDesigns.length} रंगोली डिजाइन प्रदर्शित`
            : `Showing ${filteredDesigns.length} rangoli designs`}
        </div>

        {/* Designs Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white border border-brand-gold/30 space-y-3">
            <Palette className="w-10 h-10 text-brand-gold mx-auto opacity-50" />
            <h4 className="font-serif text-lg font-bold text-brand-dark">
              {isHindi ? 'कोई रंगोली डिजाइन नहीं मिला' : 'No Rangoli Designs Found'}
            </h4>
            <p className="text-xs text-brand-dark/60 max-w-sm mx-auto">
              {isHindi
                ? 'कृपया कोई अन्य शब्द खोजें या फ़िल्टर रीसेट करें।'
                : 'Try adjusting your search criteria or reset the filters.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSelectedDifficulty('all');
                setShowOnlyFavorites(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#24113D] text-[#F2D98B] text-xs font-bold"
            >
              {isHindi ? 'सभी फ़िल्टर साफ़ करें' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDesigns.map((design) => {
              const isFav = isFavorite(design.id);

              return (
                <motion.div
                  key={design.id}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-white border border-brand-gold/35 hover:border-brand-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Artwork Preview Box */}
                  <div
                    onClick={() => setActiveModalDesign(design)}
                    className="relative aspect-square w-full bg-[#1A0E2E] p-4 cursor-pointer overflow-hidden flex items-center justify-center"
                  >
                    <RangoliArtwork type={design.svgType} className="w-full h-full drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                    
                    {/* Favorite Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.88 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(design.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                        isFav
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-black/40 text-white/80 hover:text-white'
                      }`}
                      title={isFav ? (isHindi ? 'पसंदीदा से हटाएं' : 'Remove Favorite') : (isHindi ? 'पसंदीदा में जोड़ें' : 'Save Favorite')}
                      aria-label="Toggle favorite"
                    >
                      <motion.div
                        animate={isFav && !shouldReduceMotion ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        <Heart size={14} className={isFav ? 'fill-current' : ''} />
                      </motion.div>
                    </motion.button>

                    {/* Difficulty Badge */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#F2D98B] border border-[#F2D98B]/30 backdrop-blur-md">
                      {isHindi ? design.difficultyHi : design.difficulty}
                    </span>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-brand-muted font-sans">
                        <span className="font-semibold text-brand-royal">
                          {isHindi ? design.categoryLabelHi : design.categoryLabelEn}
                        </span>
                        <span className="flex items-center gap-1 text-[10px]">
                          <Clock size={11} className="text-brand-gold" />
                          <span>{isHindi ? design.timeEstimateHi : design.timeEstimateEn}</span>
                        </span>
                      </div>

                      <h3
                        onClick={() => setActiveModalDesign(design)}
                        className="font-serif text-base sm:text-lg font-bold text-brand-deep cursor-pointer group-hover:text-brand-royal transition-colors"
                      >
                        {isHindi ? design.titleHi : design.titleEn}
                      </h3>

                      <p className="text-xs text-brand-dark/75 leading-relaxed font-sans line-clamp-2">
                        {isHindi ? design.descHi : design.descEn}
                      </p>
                    </div>

                    {/* View Design CTA Button */}
                    <button
                      type="button"
                      onClick={() => setActiveModalDesign(design)}
                      className="w-full mt-3 py-2 px-3 rounded-xl bg-brand-light hover:bg-[#24113D] text-brand-dark hover:text-[#F2D98B] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 min-h-[38px]"
                    >
                      <Eye size={14} />
                      <span>{isHindi ? 'डिजाइन विवरण व विधि' : 'View Pattern & Guide'}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* RANGOLI DESIGN DETAIL MODAL */}
      <AnimatePresence>
        {activeModalDesign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-brand-gold/40 flex flex-col overflow-hidden text-brand-dark"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gold/20 bg-[#FAF7F0]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#24113D] text-[#F2D98B]">
                    {isHindi ? activeModalDesign.categoryLabelHi : activeModalDesign.categoryLabelEn}
                  </span>
                  <span className="text-xs text-brand-muted font-sans">
                    • {isHindi ? activeModalDesign.timeEstimateHi : activeModalDesign.timeEstimateEn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(activeModalDesign.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isFavorite(activeModalDesign.id)
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white text-brand-dark/70 border-brand-gold/30 hover:text-brand-dark'
                    }`}
                    title="Toggle Favorite"
                  >
                    <Heart size={15} className={isFavorite(activeModalDesign.id) ? 'fill-current' : ''} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModalDesign(null)}
                    className="p-2 rounded-xl bg-white border border-brand-gold/30 text-brand-dark/70 hover:text-brand-dark"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 space-y-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Large High-Res Artwork */}
                  <div
                    id="rangoli-modal-artwork"
                    className="md:col-span-5 rounded-2xl bg-[#1A0E2E] p-6 shadow-inner flex items-center justify-center"
                  >
                    <RangoliArtwork type={activeModalDesign.svgType} className="w-64 h-64 sm:w-72 sm:h-72" />
                  </div>

                  {/* Right: Concept & Info */}
                  <div className="md:col-span-7 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-brand-deep">
                      {isHindi ? activeModalDesign.titleHi : activeModalDesign.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                      {isHindi ? activeModalDesign.descHi : activeModalDesign.descEn}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-brand-light/60 border border-brand-gold/25 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-royal block">
                        {isHindi ? 'कलात्मक संकल्पना व महत्व:' : 'Design Concept & Significance:'}
                      </span>
                      <p className="text-xs text-brand-dark/80 leading-relaxed font-sans">
                        {isHindi ? activeModalDesign.conceptHi : activeModalDesign.conceptEn}
                      </p>
                    </div>

                    {/* Download Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadSvg}
                        disabled={isDownloading}
                        className="px-4 py-2 rounded-xl bg-[#24113D] hover:bg-[#341857] text-[#F2D98B] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Download size={14} />
                        <span>{isHindi ? 'SVG डाउनलोड करें' : 'Download SVG'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadPng}
                        disabled={isDownloading}
                        className="px-4 py-2 rounded-xl bg-white border border-brand-gold/40 hover:border-brand-gold text-brand-dark font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <Download size={14} />
                        <span>{isHindi ? 'PNG इमेज डाउनलोड' : 'Download PNG'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Materials & Instructions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-gold/20">
                  {/* Required Materials */}
                  <div className="space-y-3 bg-[#FAF7F0] p-5 rounded-2xl border border-brand-gold/25">
                    <span className="text-xs font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={14} className="text-brand-gold" />
                      <span>{isHindi ? 'आवश्यक सामग्री:' : 'Required Materials:'}</span>
                    </span>
                    <ul className="space-y-1.5 text-xs text-brand-dark/85 font-sans">
                      {(isHindi ? activeModalDesign.materialsHi : activeModalDesign.materialsEn).map((mat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Step by Step Creation Guide */}
                  <div className="space-y-3 bg-[#FAF7F0] p-5 rounded-2xl border border-brand-gold/25">
                    <span className="text-xs font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={14} className="text-brand-gold" />
                      <span>{isHindi ? 'निर्माण के चरणबद्ध निर्देश:' : 'Step-by-Step Creation Guide:'}</span>
                    </span>
                    <ol className="space-y-2 text-xs text-brand-dark/85 font-sans">
                      {(isHindi ? activeModalDesign.stepsHi : activeModalDesign.stepsEn).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Educational Guide, Materials Checklist & FAQs */}
      <section className="mt-20 border-t border-brand-gold/20 pt-16">
        <div className="max-w-4xl mx-auto space-y-12 px-4 sm:px-6">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'घर पर सुंदर रंगोली बनाने के पारंपरिक तरीके व सामग्रियां' : 'Traditional Rangoli Designs for Home & Diwali: Techniques & Materials'}
            </h2>
            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'भारतीय संस्कृति में रंगोली केवल एक कला नहीं, बल्कि घर में सकारात्मक ऊर्जा, सुख और माँ लक्ष्मी के स्वागत का पावन माध्यम है। दीवाली, ओणम और पोंगल जैसे महापर्वों पर घर के मुख्य द्वार पर रंगोली बनाना अत्यंत शुभ माना जाता है।'
                : 'In Indian cultural traditions, Rangoli is a sacred art form designed to welcome deities, channel positive cosmic energy, and bring good fortune. During Diwali, Dhanteras, and festive seasons, drawing a beautiful Rangoli at the home entrance is an auspicious ritual.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="bg-white p-5 rounded-xl border border-brand-gold/30 shadow-sm">
                <h3 className="font-serif font-bold text-brand-deep mb-2">
                  {isHindi ? '१. चावल का आटा व प्राकृतिक रंग' : '1. Organic Rice Flour & Quartz'}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70">
                  {isHindi
                    ? 'पारंपरिक रूप से सूखे चावल के आटे का उपयोग चींटियों व पक्षियों के आहार और शुभता के लिए किया जाता है।'
                    : 'White quartz powder and coarse rice flour provide sharp lines while honoring ancient traditions.'}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-brand-gold/30 shadow-sm">
                <h3 className="font-serif font-bold text-brand-deep mb-2">
                  {isHindi ? '२. फूलों की रंगोली (Flower Kolam)' : '2. Fresh Flower Petals'}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70">
                  {isHindi
                    ? 'गेंदे के फूल, गुलाब की पंखुड़ियां और आम के पत्ते पर्यावरण-अनुकूल व सुगंधित रंगोली बनाते हैं।'
                    : 'Marigold and rose petals combined with brass diyas create fragrant, eco-friendly centerpieces.'}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-brand-gold/30 shadow-sm">
                <h3 className="font-serif font-bold text-brand-deep mb-2">
                  {isHindi ? '३. बिंदू वाली आसान रंगोली' : '3. Simple Dot Grids (Chukki)'}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70">
                  {isHindi
                    ? 'शुरुआती लोग ३x३ या ५x५ बिंदुओं के ग्रिड से शुरुआत कर अत्यंत सममित पैटर्न बना सकते हैं।'
                    : 'Beginners can easily construct symmetrical geometric patterns using dot grids from 3x3 to 7x7.'}
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
            </h2>
            <div className="space-y-3">
              {rangoliFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-brand-gold/20 shadow-sm">
                  <h3 className="font-serif font-bold text-base text-brand-deep mb-2">{faq.q}</h3>
                  <p className="text-sm text-brand-dark/80 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual Links */}
          <div className="pt-6 border-t border-brand-gold/20">
            <h3 className="font-serif text-lg font-bold text-brand-deep mb-3">
              {isHindi ? 'संबंधित उत्सव प्रेरणा' : 'Related Diwali Celebration Guides & Tools'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="/festivals/diwali" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दीपावली २०२६ संपूर्ण गाइड' : 'Diwali Wishes and Greetings'}
              </a>
              <a href="/decoration-ideas" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'त्योहार गृह सज्जा विचार' : 'Festive Home Decoration Ideas'}
              </a>
              <a href="/greeting-cards" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर' : 'Free Online Greeting Card Maker'}
              </a>
              <a href="/gift-ideas" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दिवाली उपहार विचार' : 'Diwali Gift Ideas'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
