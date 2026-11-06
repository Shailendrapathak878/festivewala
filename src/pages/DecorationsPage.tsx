import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerContainer';
import {
  DECORATION_CATEGORIES,
  DECORATIONS_DATA,
  type DecorationIdea,
} from '../data/decorations/decorationsData';
import { useDecorationFavorites } from '../features/decorations/hooks/useDecorationFavorites';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import {
  Search,
  X,
  Heart,
  Clock,
  Flame,
  Check,
  Eye,
  Layers,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

export const DecorationsPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const { favoriteIds, toggleFavorite, isFavorite } = useDecorationFavorites();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [activeModalDecor, setActiveModalDecor] = useState<DecorationIdea | null>(null);

  const filteredDecorations = useMemo(() => {
    return DECORATIONS_DATA.filter((decor) => {
      // Favorites filter
      if (showOnlyFavorites && !favoriteIds.includes(decor.id)) {
        return false;
      }

      // Category filter
      if (activeCategory !== 'all' && decor.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mEn = decor.titleEn.toLowerCase().includes(q) || decor.descEn.toLowerCase().includes(q) || decor.overviewEn.toLowerCase().includes(q);
        const mHi = decor.titleHi.toLowerCase().includes(q) || decor.descHi.toLowerCase().includes(q) || decor.overviewHi.toLowerCase().includes(q);
        if (!mEn && !mHi) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, showOnlyFavorites, favoriteIds]);

  const seoConfig = isHindi ? STATIC_ROUTE_SEO.decorations.hi : STATIC_ROUTE_SEO.decorations.en;

  const decorFaqs = isHindi
    ? [
        {
          q: 'दिवाली पर बालकनी और घर की सजावट कैसे करें?',
          a: 'बालकनी की रेलिंग पर वार्म व्हाइट फेयरी लाइट्स, प्रवेश द्वार पर गेंदे के फूलों और आम के पत्तों का तोरण, और सेंटर टेबल पर पीतल की उरली में तैरते दीये सबसे आकर्षक लगते हैं।',
        },
        {
          q: 'पर्यावरण-अनुकूल (Eco-friendly) त्योहार सजावट के क्या उपाय हैं?',
          a: 'मिट्टी के प्राकृतिक दीये, सरसों का तेल, ताजे फूल, सूती कपड़े के तोरण और रीसाइकिल्ड पेपर कंदील प्लास्टिक प्रदूषण से बचाते हैं और घर को पावन सौंदर्य देते हैं।',
        },
      ]
    : [
        {
          q: 'How can I decorate my balcony and living room for Diwali?',
          a: 'Drape warm-white LED fairy lights along balcony railings, hang fresh marigold torans at the entrance, and float tea-light diyas in a brass urli with rose petals.',
        },
        {
          q: 'What are the best eco-friendly festival decoration ideas?',
          a: 'Clay terracotta diyas, natural mustard or sesame oil, real marigold garlands, handcrafted cloth torans, and recycled paper lanterns are sustainable and authentically beautiful.',
        },
      ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: isHindi ? 'त्योहार गृह सज्जा विचार संग्रह' : 'Festive Home Decoration Ideas Collection',
      url: seoConfig.canonicalUrl,
      description: seoConfig.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: decorFaqs.map((faq) => ({
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
            <span>{isHindi ? 'गृह सज्जा विचार' : 'Festive Home Decor Ideas'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep leading-tight">
            {isHindi ? 'त्योहार गृह सज्जा विचार — दीये, लाइट्स व इको-फ्रेंडली DIY' : 'Festive Home Decoration Ideas — Diyas & Eco-Friendly DIY'}
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {isHindi
              ? 'मुख्य द्वार, बालकनी, लिविंग रूम और पूजा स्थल के लिए ताजे फूलों, दीयों और कागजी शिल्प के व्यावहारिक विचार।'
              : 'Practical, budget-friendly DIY and sustainable decoration guides tailored for Diwali, Navratri, and festive home celebrations.'}
          </p>
        </div>

        {/* Search & Favorites Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="decorations-search-input"
              name="decorationsSearch"
              aria-label="Search festival decoration ideas"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'सजावट खोजें (उदा: तोरण, उरली, बालकनी, कंदील)...' : 'Search ideas (e.g. toran, urli, balcony, lights)...'}
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

          <button
            type="button"
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all self-end sm:self-auto min-h-[42px] ${
              showOnlyFavorites
                ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                : 'bg-white text-brand-dark border-brand-gold/30 hover:border-brand-gold'
            }`}
          >
            <Heart size={14} className={showOnlyFavorites ? 'fill-current' : 'text-rose-500'} />
            <span>{isHindi ? 'सहेजे गए विचार' : 'Saved Ideas'}</span>
            {favoriteIds.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/10 font-bold ml-0.5">
                {favoriteIds.length}
              </span>
            )}
          </button>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {DECORATION_CATEGORIES.map((cat) => {
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
            ? `${filteredDecorations.length} सजावट विचार प्रदर्शित`
            : `Showing ${filteredDecorations.length} decoration ideas`}
        </div>

        {/* Decorations Grid */}
        {filteredDecorations.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white border border-brand-gold/30 space-y-3">
            <Flame className="w-10 h-10 text-brand-gold mx-auto opacity-50" />
            <h4 className="font-serif text-lg font-bold text-brand-dark">
              {isHindi ? 'कोई सजावट विचार नहीं मिला' : 'No Decoration Ideas Found'}
            </h4>
            <p className="text-xs text-brand-dark/60 max-w-sm mx-auto">
              {isHindi ? 'कृपया कोई अन्य शब्द खोजें या फ़िल्टर रीसेट करें।' : 'Try adjusting your search or reset filters.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setShowOnlyFavorites(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#24113D] text-[#F2D98B] text-xs font-bold"
            >
              {isHindi ? 'सभी फ़िल्टर साफ़ करें' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDecorations.map((decor) => {
              const isFav = isFavorite(decor.id);

              return (
                <StaggerItem key={decor.id} className="h-full">
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="h-full rounded-3xl bg-white border border-brand-gold/35 hover:border-brand-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-light text-brand-royal border border-brand-gold/30">
                          {isHindi ? decor.categoryLabelHi : decor.categoryLabelEn}
                        </span>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.88 }}
                          onClick={() => toggleFavorite(decor.id)}
                          className={`p-1.5 rounded-xl border transition-all ${
                            isFav
                              ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-sm'
                              : 'bg-black/5 border-current/15 text-current/60 hover:text-current'
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
                      </div>

                      {/* Title & Icon */}
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl mt-0.5">{decor.icon}</span>
                        <h3
                          onClick={() => setActiveModalDecor(decor)}
                          className="font-serif text-lg font-bold text-brand-deep cursor-pointer hover:text-brand-royal transition-colors"
                        >
                          {isHindi ? decor.titleHi : decor.titleEn}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans line-clamp-3">
                        {isHindi ? decor.descHi : decor.descEn}
                      </p>

                      {/* Metadata tags */}
                      <div className="flex items-center gap-2 pt-2 border-t border-brand-gold/15 text-[11px] text-brand-muted font-sans">
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-brand-gold" />
                          <span>{isHindi ? decor.timeEstimateHi : decor.timeEstimateEn}</span>
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-700">
                          {isHindi ? decor.budgetCategoryHi : decor.budgetCategory}
                        </span>
                      </div>
                    </div>

                    {/* View Details Action */}
                    <button
                      type="button"
                      onClick={() => setActiveModalDecor(decor)}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-light hover:bg-[#24113D] text-brand-dark hover:text-[#F2D98B] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 min-h-[40px]"
                    >
                      <Eye size={14} />
                      <span>{isHindi ? 'सजावट विधि व सामग्री' : 'View Instructions & Materials'}</span>
                    </button>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {activeModalDecor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-brand-gold/40 flex flex-col overflow-hidden text-brand-dark"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gold/20 bg-[#FAF7F0]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeModalDecor.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#24113D] text-[#F2D98B]">
                    {isHindi ? activeModalDecor.categoryLabelHi : activeModalDecor.categoryLabelEn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(activeModalDecor.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isFavorite(activeModalDecor.id)
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white text-brand-dark/70 border-brand-gold/30 hover:text-brand-dark'
                    }`}
                  >
                    <Heart size={15} className={isFavorite(activeModalDecor.id) ? 'fill-current' : ''} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalDecor(null)}
                    className="p-2 rounded-xl bg-white border border-brand-gold/30 text-brand-dark/70 hover:text-brand-dark"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-deep">
                    {isHindi ? activeModalDecor.titleHi : activeModalDecor.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-dark/80 mt-1 leading-relaxed font-sans">
                    {isHindi ? activeModalDecor.overviewHi : activeModalDecor.overviewEn}
                  </p>
                </div>

                {/* Materials & Tips Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Materials */}
                  <div className="p-4 rounded-2xl bg-brand-light/60 border border-brand-gold/20 space-y-2">
                    <span className="text-xs font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={13} className="text-brand-gold" />
                      <span>{isHindi ? 'आवश्यक सामग्री:' : 'Required Materials:'}</span>
                    </span>
                    <ul className="space-y-1 text-xs text-brand-dark/80 font-sans">
                      {(isHindi ? activeModalDecor.materialsHi : activeModalDecor.materialsEn).map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check size={12} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Helpful Tip */}
                  <div className="p-4 rounded-2xl bg-[#24113D]/5 border border-brand-gold/25 space-y-2">
                    <span className="text-xs font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb size={13} className="text-brand-gold" />
                      <span>{isHindi ? 'विशेष सुझाव:' : 'Expert Tip:'}</span>
                    </span>
                    <ul className="space-y-1 text-xs text-brand-dark/80 font-sans">
                      {(isHindi ? activeModalDecor.tipsHi : activeModalDecor.tipsEn).map((t, i) => (
                        <li key={i} className="leading-relaxed">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step by Step Guide */}
                <div className="space-y-2.5 pt-2 border-t border-brand-gold/20">
                  <span className="text-xs font-bold text-brand-royal uppercase tracking-wider block">
                    {isHindi ? 'चरणबद्ध सज्जा विधि:' : 'Step-by-Step Instructions:'}
                  </span>
                  <ol className="space-y-2 text-xs sm:text-sm text-brand-dark/85 font-sans">
                    {(isHindi ? activeModalDecor.stepsHi : activeModalDecor.stepsEn).map((st, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Associated Festivals */}
                <div className="pt-3 border-t border-brand-gold/15 flex items-center gap-2 text-xs text-brand-muted">
                  <span className="font-semibold text-brand-deep">
                    {isHindi ? 'प्रासंगिक उत्सव:' : 'Associated Festivals:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeModalDecor.festivalAssociation.map((fest, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-brand-light text-brand-royal text-[11px] font-semibold"
                      >
                        {fest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Educational Guide & FAQs */}
      <section className="mt-20 border-t border-brand-gold/20 pt-16">
        <div className="max-w-4xl mx-auto space-y-12 px-4 sm:px-6">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'दिवाली व त्योहार गृह सज्जा के आवश्यक सुझाव' : 'Festive Home Styling: Safety, Elegance & Eco-Consciousness'}
            </h2>
            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'घर की सज्जा में रोशनी और सुगंध का विशेष महत्व होता है। तेल के दीयों को कभी भी पर्दों या ज्वलनशील वस्तुओं के पास न रखें और बालकनी में सुरक्षित रूप से रखें।'
                : 'Festive decor elevates the celebratory ambiance of the entire home. Always position lit oil diyas on stable heat-resistant surfaces away from curtains, and use high-grade insulated wiring for outdoor lighting.'}
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
            </h2>
            <div className="space-y-3">
              {decorFaqs.map((faq, idx) => (
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
              {isHindi ? 'संबंधित उत्सव विचार' : 'Related Festival Resources'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="/rangoli" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दिवाली के लिए रंगोली डिजाइन' : 'Rangoli Designs for Diwali'}
              </a>
              <a href="/festivals/diwali" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दीपावली २०२६ संपूर्ण गाइड' : 'Diwali Wishes and Greetings'}
              </a>
              <a href="/gift-ideas" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दिवाली उपहार विचार' : 'Diwali Gift Ideas'}
              </a>
              <a href="/greeting-cards" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर' : 'Free Online Greeting Card Maker'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
