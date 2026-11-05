import React, { useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { SectionHeading } from '../components/common/SectionHeading';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerContainer';
import {
  GIFT_CATEGORIES,
  BUDGET_TIERS,
  RECIPIENT_FILTERS,
  ALL_GIFTS_DATA,
  type GiftIdea,
} from '../data/gifts/giftsData';
import { useGiftFavorites } from '../features/gifts/hooks/useGiftFavorites';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import {
  Search,
  X,
  Heart,
  Gift,
  Eye,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

export const GiftIdeasPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const { favoriteIds, toggleFavorite, isFavorite } = useGiftFavorites();
  const { festivalId: routeFestivalId } = useParams<{ festivalId?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramFest = routeFestivalId || searchParams.get('festival') || 'all';
  const [selectedFestival, setSelectedFestival] = useState<string>(paramFest);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeBudgetTier, setActiveBudgetTier] = useState<string>('all');
  const [activeRecipient, setActiveRecipient] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [activeModalGift, setActiveModalGift] = useState<GiftIdea | null>(null);

  const filteredGifts = useMemo(() => {
    return ALL_GIFTS_DATA.filter((gift: GiftIdea) => {
      // Festival filter
      if (selectedFestival !== 'all') {
        const fest = gift.festivalId || 'diwali';
        if (fest !== selectedFestival) return false;
      }
      // Favorites filter
      if (showOnlyFavorites && !favoriteIds.includes(gift.id)) {
        return false;
      }

      // Category filter
      if (activeCategory !== 'all' && gift.category !== activeCategory) {
        return false;
      }

      // Budget filter
      if (activeBudgetTier !== 'all' && gift.budgetTier !== activeBudgetTier) {
        return false;
      }

      // Recipient filter
      if (activeRecipient !== 'all' && gift.recipientCategory !== activeRecipient) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mEn = gift.nameEn.toLowerCase().includes(q) || gift.descEn.toLowerCase().includes(q) || gift.whyGoodGiftEn.toLowerCase().includes(q);
        const mHi = gift.nameHi.toLowerCase().includes(q) || gift.descHi.toLowerCase().includes(q) || gift.whyGoodGiftHi.toLowerCase().includes(q);
        if (!mEn && !mHi) return false;
      }

      return true;
    });
  }, [selectedFestival, activeCategory, activeBudgetTier, activeRecipient, searchQuery, showOnlyFavorites, favoriteIds]);

  const seoConfig = isHindi ? STATIC_ROUTE_SEO.gifts.hi : STATIC_ROUTE_SEO.gifts.en;

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeading
          badge={isHindi ? 'त्योहार उपहार मार्गदर्शिका' : 'Thoughtful Festive Gifting'}
          title={isHindi ? 'रिश्तों व बजट के अनुसार पावन उपहार प्रेरणा' : 'Curated Festival Gift Inspiration for Loved Ones'}
          subtitle={
            isHindi
              ? 'माता-पिता, परिवार, जीवनसाथी और मित्रों के लिए विचारशील, सांस्कृतिक और विभिन्न बजट श्रेणियों में उपहारों के उत्तम सुझाव।'
              : 'Meaningful, practical, and eco-conscious gift suggestions categorized by relationship, budget tier, and festive occasion.'
          }
        />

        {/* Festival Selection Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', labelEn: 'All Festivals', labelHi: 'सभी पर्व' },
            { id: 'dhanteras', labelEn: 'Dhanteras 2026', labelHi: 'धनतेरस २०२६' },
            { id: 'diwali', labelEn: 'Diwali 2026', labelHi: 'दिवाली २०२६' },
          ].map((fest) => {
            const isSelected = selectedFestival === fest.id;
            return (
              <button
                key={fest.id}
                type="button"
                onClick={() => {
                  setSelectedFestival(fest.id);
                  setSearchParams({ festival: fest.id });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border min-h-[40px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-royal text-[#FAF7F0] border-brand-royal shadow-md'
                    : 'bg-white text-brand-dark border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-gold' : 'text-brand-royal'}`} />
                <span>{isHindi ? fest.labelHi : fest.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Filter Bar & Favorites */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="gifts-search-input"
              name="giftsSearch"
              aria-label="Search festival gift ideas"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'उपहार खोजें (उदा: चांदी, दीया, पौधा, मेवा)...' : 'Search gifts (e.g. silver, plant, dry fruit, candle)...'}
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

          <div className="flex items-center gap-2 flex-wrap self-end md:self-auto">
            {/* Budget Dropdown */}
            <select
              id="gifts-budget-select"
              name="giftsBudget"
              value={activeBudgetTier}
              onChange={(e) => setActiveBudgetTier(e.target.value)}
              aria-label={isHindi ? 'बजट श्रेणी चुनें' : 'Select Budget Tier'}
              className="px-3 py-2 rounded-xl bg-white border border-brand-gold/30 text-xs font-semibold text-brand-dark outline-none focus:border-brand-royal min-h-[42px] shadow-sm"
            >
              {BUDGET_TIERS.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {isHindi ? tier.labelHi : tier.labelEn}
                </option>
              ))}
            </select>

            {/* Recipient Dropdown */}
            <select
              id="gifts-recipient-select"
              name="giftsRecipient"
              value={activeRecipient}
              onChange={(e) => setActiveRecipient(e.target.value)}
              aria-label={isHindi ? 'प्राप्तकर्ता चुनें' : 'Select Recipient'}
              className="px-3 py-2 rounded-xl bg-white border border-brand-gold/30 text-xs font-semibold text-brand-dark outline-none focus:border-brand-royal min-h-[42px] shadow-sm"
            >
              {RECIPIENT_FILTERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {isHindi ? r.labelHi : r.labelEn}
                </option>
              ))}
            </select>

            {/* Favorites Toggle */}
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
          {GIFT_CATEGORIES.map((cat) => {
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
            ? `${filteredGifts.length} उपहार विचार प्रदर्शित`
            : `Showing ${filteredGifts.length} gift ideas`}
        </div>

        {/* Gifts Grid */}
        {filteredGifts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white border border-brand-gold/30 space-y-3">
            <Gift className="w-10 h-10 text-brand-gold mx-auto opacity-50" />
            <h4 className="font-serif text-lg font-bold text-brand-dark">
              {isHindi ? 'कोई उपहार विचार नहीं मिला' : 'No Gift Ideas Found'}
            </h4>
            <p className="text-xs text-brand-dark/60 max-w-sm mx-auto">
              {isHindi ? 'कृपया अन्य बजट या श्रेणी चुनकर देखें।' : 'Try changing your budget, recipient or search filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveBudgetTier('all');
                setActiveRecipient('all');
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
            {filteredGifts.map((gift: GiftIdea) => {
              const isFav = isFavorite(gift.id);

              return (
                <StaggerItem key={gift.id} className="h-full">
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="h-full rounded-3xl bg-white border border-brand-gold/35 hover:border-brand-gold shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-light text-brand-royal border border-brand-gold/30">
                          {isHindi ? gift.recipientLabelHi : gift.recipientLabelEn}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                            {gift.budgetDisplay}
                          </span>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.88 }}
                            onClick={() => toggleFavorite(gift.id)}
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
                      </div>

                      {/* Title & Icon */}
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl mt-0.5">{gift.icon}</span>
                        <h3
                          onClick={() => setActiveModalGift(gift)}
                          className="font-serif text-lg font-bold text-brand-deep cursor-pointer hover:text-brand-royal transition-colors"
                        >
                          {isHindi ? gift.nameHi : gift.nameEn}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans line-clamp-3">
                        {isHindi ? gift.descHi : gift.descEn}
                      </p>

                      <div className="p-3 rounded-xl bg-brand-light/50 border border-brand-gold/20 text-xs text-brand-dark/80 space-y-1">
                        <span className="font-bold text-brand-royal block text-[11px]">
                          💡 {isHindi ? 'यह उपहार क्यों खास है:' : 'Why It Makes a Good Gift:'}
                        </span>
                        <p className="text-[11px] leading-relaxed line-clamp-2">
                          {isHindi ? gift.whyGoodGiftHi : gift.whyGoodGiftEn}
                        </p>
                      </div>
                    </div>

                    {/* View Details Action */}
                    <button
                      type="button"
                      onClick={() => setActiveModalGift(gift)}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-light hover:bg-[#24113D] text-brand-dark hover:text-[#F2D98B] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 min-h-[40px]"
                    >
                      <Eye size={14} />
                      <span>{isHindi ? 'विवरण व सुझाव देखें' : 'View Details & Personal Touches'}</span>
                    </button>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>

      {/* GIFT DETAIL MODAL */}
      <AnimatePresence>
        {activeModalGift && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-brand-gold/40 flex flex-col overflow-hidden text-brand-dark"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gold/20 bg-[#FAF7F0]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeModalGift.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#24113D] text-[#F2D98B]">
                    {isHindi ? activeModalGift.recipientLabelHi : activeModalGift.recipientLabelEn}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {activeModalGift.budgetDisplay}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(activeModalGift.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isFavorite(activeModalGift.id)
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white text-brand-dark/70 border-brand-gold/30 hover:text-brand-dark'
                    }`}
                  >
                    <Heart size={15} className={isFavorite(activeModalGift.id) ? 'fill-current' : ''} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalGift(null)}
                    className="p-2 rounded-xl bg-white border border-brand-gold/30 text-brand-dark/70 hover:text-brand-dark"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-deep">
                    {isHindi ? activeModalGift.nameHi : activeModalGift.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-dark/80 mt-1.5 leading-relaxed font-sans">
                    {isHindi ? activeModalGift.descHi : activeModalGift.descEn}
                  </p>
                </div>

                {/* Why It Makes A Good Gift */}
                <div className="p-4 rounded-2xl bg-brand-light/60 border border-brand-gold/20 space-y-1.5">
                  <span className="text-xs font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-brand-gold" />
                    <span>{isHindi ? 'यह उपहार क्यों उपयुक्त है:' : 'Why It Makes a Good Gift:'}</span>
                  </span>
                  <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-sans">
                    {isHindi ? activeModalGift.whyGoodGiftHi : activeModalGift.whyGoodGiftEn}
                  </p>
                </div>

                {/* DIY & Personalization Suggestions */}
                <div className="p-4 rounded-2xl bg-[#24113D]/5 border border-brand-gold/25 space-y-1.5">
                  <span className="text-xs font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb size={14} className="text-brand-gold" />
                    <span>{isHindi ? 'व्यक्तिगत स्पर्श व DIY सुझाव:' : 'DIY & Personal Touch Ideas:'}</span>
                  </span>
                  <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-sans">
                    {isHindi ? activeModalGift.diyOrPersonalizationHi : activeModalGift.diyOrPersonalizationEn}
                  </p>
                </div>

                {/* Occasion association */}
                <div className="pt-2 border-t border-brand-gold/15 flex items-center justify-between text-xs text-brand-muted">
                  <span className="font-semibold text-brand-deep">
                    {isHindi ? 'अनुशंसित अवसर:' : 'Best Occasion:'}
                  </span>
                  <span className="font-sans font-medium text-brand-royal">
                    {activeModalGift.occasion}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
