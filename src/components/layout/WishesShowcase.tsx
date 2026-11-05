import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { toastNotificationVariants } from '../animation/motionVariants';
import { WISHES_DATA } from '../../data/wishes';
import { useLanguage } from '../../hooks/useLanguage';
import { MonetagAdSlot } from '../ads/MonetagAdSlot';
import {
  Copy,
  Check,
  Share2,
  BookOpen,
  Coins,
  Leaf,
  Sparkles,
  Heart,
  Users,
  Briefcase,
  Flame,
  MessageCircle,
  Hash,
  Smile,
  Feather,
  Building2,
  Search,
  X,
  Send,
  Palette,
  RotateCcw,
  Filter,
} from 'lucide-react';
import type { WishMessage } from '../../data/types';
import { SmartWishesGenerator } from '../../features/wishes/components/SmartWishesGenerator';
import { WishesFavorites } from '../../features/wishes/components/WishesFavorites';
import { useSavedWishes } from '../../features/wishes/hooks/useSavedWishes';
import { getUpcomingFestivals } from '../../services/festivalPriorityEngine';
import {
  getWhatsAppShareUrl,
  copyTextToClipboard,
} from '../../features/wishes/services/wishGeneratorService';

export function ensureCleanUnicode(str?: string): string {
  if (!str) return '';
  if (!str.includes('\\u')) return str;
  return str.replace(/\\u([dD][89abAB][0-9a-fA-F]{2})\\u([dD][c-fC-F][0-9a-fA-F]{2})/g, (_, high, low) => {
    return String.fromCharCode(parseInt(high, 16), parseInt(low, 16));
  }).replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

type ViewMode = 'library' | 'generator' | 'favorites';

interface WishesShowcaseProps {
  routeFestivalId?: string;
  showInGridAds?: boolean;
}

export const WishesShowcase: React.FC<WishesShowcaseProps> = ({
  routeFestivalId,
  showInGridAds = true,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFestival = routeFestivalId || searchParams.get('festival') || 'all';
  const { isHindi, isHinglish, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const { savedIds, isFavorite, toggleFavorite } = useSavedWishes();

  // Primary Navigation View Mode: Readymade Wishes ('library') is default
  const [activeMode, setActiveMode] = useState<ViewMode>('library');

  // Library State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('all');
  const [selectedFestival, setSelectedFestival] = useState<string>(initialFestival);

  useEffect(() => {
    const fest = routeFestivalId || searchParams.get('festival');
    if (fest && fest !== selectedFestival) {
      setSelectedFestival(fest);
    }
  }, [routeFestivalId, searchParams, selectedFestival]);
  const [sortBy, setSortBy] = useState<'relevance' | 'shortest' | 'longest' | 'newest'>('relevance');
  const [visibleCount, setVisibleCount] = useState<number>(18);

  // UI Toast State
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const getWishText = (wish: WishMessage) => {
    if (language === 'hi') return wish.textHi;
    if (language === 'hinglish') return wish.textHinglish || wish.textHi || wish.textEn;
    return wish.textEn;
  };

  const getWishHeadline = (wish: WishMessage) => {
    if (language === 'hi') return wish.headlineHi || '';
    if (language === 'hinglish') return wish.headlineHinglish || wish.headlineHi || wish.headlineEn || '';
    return wish.headlineEn || '';
  };

  const activeDataset = useMemo(() => {
    if (selectedFestival !== 'all') {
      return WISHES_DATA.filter((w) => {
        const festIds = w.festivalIds || [w.festivalId];
        return festIds.includes(selectedFestival);
      });
    }

    // Default view: Strict festival prioritization (nearest upcoming first, following next)
    const upcoming = getUpcomingFestivals();
    const p1 = upcoming[0]?.festival.id || 'dhanteras';
    const p2 = upcoming[1]?.festival.id || 'diwali';

    return [...WISHES_DATA].sort((a, b) => {
      const aIds = a.festivalIds || [a.festivalId];
      const bIds = b.festivalIds || [b.festivalId];

      const aIsP1 = aIds.includes(p1);
      const bIsP1 = bIds.includes(p1);
      if (aIsP1 && !bIsP1) return -1;
      if (!aIsP1 && bIsP1) return 1;

      const aIsP2 = aIds.includes(p2);
      const bIsP2 = bIds.includes(p2);
      if (aIsP2 && !bIsP2) return -1;
      if (!aIsP2 && bIsP2) return 1;

      return 0;
    });
  }, [selectedFestival]);

  const categories = useMemo(() => {
    const isDhanteras = selectedFestival === 'dhanteras';
    const totalLabelEn = isDhanteras ? 'All 100 Dhanteras Wishes' : `All ${activeDataset.length} Wishes`;
    const totalLabelHi = isDhanteras ? 'सभी १०० धनतेरस संदेश' : `सभी ${activeDataset.length} संदेश`;
    const totalLabelHinglish = isDhanteras ? 'All 100 Dhanteras Wishes' : `All ${activeDataset.length} Wishes`;

    return [
      { id: 'all', labelEn: totalLabelEn, labelHi: totalLabelHi, labelHinglish: totalLabelHinglish, icon: <BookOpen className="w-3.5 h-3.5" />, count: activeDataset.length },
      { id: 'family', labelEn: 'Family & Elders', labelHi: 'परिवार व अग्रज', labelHinglish: 'Family & Elders', icon: <Users className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'family').length },
      { id: 'friends', labelEn: 'Friends', labelHi: 'मित्र व साथी', labelHinglish: 'Friends & Dosti', icon: <Sparkles className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'friends').length },
      { id: 'health-happiness', labelEn: 'Health & Arogya', labelHi: 'आरोग्य व सुख', labelHinglish: 'Health & Happiness', icon: <Leaf className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'health-happiness').length },
      { id: 'wealth-prosperity', labelEn: 'Wealth & Prosperity', labelHi: 'धन व वैभव', labelHinglish: 'Wealth & Prosperity', icon: <Coins className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'wealth-prosperity').length },
      { id: 'short', labelEn: 'Short & Sweet', labelHi: 'संक्षिप्त व मधुर', labelHinglish: 'Short & Sweet', icon: <MessageCircle className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'short').length },
      { id: 'traditional', labelEn: 'Traditional', labelHi: 'पारंपरिक वंदना', labelHinglish: 'Traditional Blessings', icon: <Flame className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'traditional').length },
      { id: 'love', labelEn: 'Love & Romance', labelHi: 'प्रेम व आत्मीयता', labelHinglish: 'Love & Romance', icon: <Heart className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'love').length },
      { id: 'emotional', labelEn: 'Heartfelt', labelHi: 'भावुक व आत्मीय', labelHinglish: 'Heartfelt & Emotional', icon: <Feather className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'emotional').length },
      { id: 'professional', labelEn: 'Executive', labelHi: 'कॉरपोरेट', labelHinglish: 'Executive & Corporate', icon: <Briefcase className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'professional').length },
      { id: 'funny', labelEn: 'Funny & Fun', labelHi: 'हास्य व मस्ती', labelHinglish: 'Fun & Masti', icon: <Smile className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'funny').length },
      { id: 'captions', labelEn: 'Social Captions', labelHi: 'सोशल कैप्शन', labelHinglish: 'Social Captions', icon: <Hash className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'captions').length },
      { id: 'business', labelEn: 'Business & Clients', labelHi: 'व्यापार व ग्राहक', labelHinglish: 'Business & Clients', icon: <Building2 className="w-3.5 h-3.5" />, count: activeDataset.filter((w) => w.category === 'business').length },
    ].filter(cat => cat.id === 'all' || cat.count > 0);
  }, [activeDataset, selectedFestival]);

  const tonesList = [
    { id: 'all', labelEn: 'All Tones', labelHi: 'सभी भाव' },
    { id: 'heartwarming', labelEn: 'Heartwarming', labelHi: 'हृदयस्पर्शी' },
    { id: 'emotional', labelEn: 'Emotional', labelHi: 'भावुक' },
    { id: 'romantic', labelEn: 'Romantic', labelHi: 'प्रेमपूर्ण' },
    { id: 'funny', labelEn: 'Funny', labelHi: 'हास्य' },
    { id: 'traditional', labelEn: 'Traditional', labelHi: 'पारंपरिक' },
    { id: 'professional', labelEn: 'Professional', labelHi: 'व्यावसायिक' },
    { id: 'respectful', labelEn: 'Respectful', labelHi: 'आदरपूर्ण' },
    { id: 'inspirational', labelEn: 'Inspirational', labelHi: 'प्रेरणादायी' },
    { id: 'cute', labelEn: 'Cute', labelHi: 'मधुर' },
    { id: 'simple', labelEn: 'Simple', labelHi: 'सरल' },
  ];

  const recipientsList = [
    { id: 'all', labelEn: 'All Recipients', labelHi: 'सभी के लिए' },
    { id: 'family', labelEn: 'Family', labelHi: 'परिवार' },
    { id: 'mother', labelEn: 'Mother', labelHi: 'माँ' },
    { id: 'father', labelEn: 'Father', labelHi: 'पिताजी' },
    { id: 'brother', labelEn: 'Brother', labelHi: 'भाई' },
    { id: 'sister', labelEn: 'Sister', labelHi: 'बहन' },
    { id: 'friends', labelEn: 'Friends', labelHi: 'मित्र' },
    { id: 'partner', labelEn: 'Partner / Spouse', labelHi: 'जीवनसाथी' },
    { id: 'colleagues', labelEn: 'Colleagues', labelHi: 'सहकर्मी' },
    { id: 'customers', labelEn: 'Clients', labelHi: 'ग्राहक' },
    { id: 'teachers', labelEn: 'Teachers', labelHi: 'शिक्षक' },
  ];

  const festivalsList = [
    { id: 'all', labelEn: '🌟 Upcoming Priority (Auto)', labelHi: '🌟 आगामी पर्व (प्राथमिकता)' },
    { id: 'dhanteras', labelEn: '🪙 Dhanteras (100 Wishes)', labelHi: '🪙 धनतेरस (१०० संदेश)' },
    { id: 'diwali', labelEn: '🪔 Diwali (500 Wishes)', labelHi: '🪔 दीपावली (५०० संदेश)' },
    { id: 'bhai-dooj', labelEn: 'Bhai Dooj', labelHi: 'भाई दूज' },
    { id: 'govardhan-puja', labelEn: 'Govardhan Puja', labelHi: 'गोवर्धन पूजा' },
    { id: 'chath-puja', labelEn: 'Chhath Puja', labelHi: 'छठ पूजा' },
    { id: 'new-year', labelEn: 'New Year', labelHi: 'नव वर्ष' },
  ];

  // Filtering & Sorting Pipeline
  const filteredWishes = useMemo(() => {
    let list = activeDataset.filter((w) => {
      // Category filter
      if (activeCategory !== 'all' && w.category !== activeCategory) return false;

      // Tone filter
      if (selectedTone !== 'all' && w.tone !== selectedTone) return false;

      // Recipient filter
      if (selectedRecipient !== 'all') {
        const recTypes = w.recipientTypes || ['general'];
        if (!recTypes.includes(selectedRecipient) && !recTypes.includes('general')) return false;
      }

      // Festival filter
      if (selectedFestival !== 'all') {
        const festIds = w.festivalIds || [w.festivalId];
        if (!festIds.includes(selectedFestival)) return false;
      }

      // Keyword search (EN & HI)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mHead =
          (w.headlineEn && w.headlineEn.toLowerCase().includes(q)) ||
          (w.headlineHi && w.headlineHi.toLowerCase().includes(q)) ||
          (w.headlineHinglish && w.headlineHinglish.toLowerCase().includes(q));
        const mText =
          w.textEn.toLowerCase().includes(q) ||
          w.textHi.toLowerCase().includes(q) ||
          (w.textHinglish && w.textHinglish.toLowerCase().includes(q));
        const mTags = w.tags && w.tags.some((t) => t.toLowerCase().includes(q));
        const mAuthor =
          (w.authorOrSourceEn && w.authorOrSourceEn.toLowerCase().includes(q)) ||
          (w.authorOrSourceHi && w.authorOrSourceHi.toLowerCase().includes(q));
        const mShloka = w.shloka && w.shloka.toLowerCase().includes(q);
        if (!mHead && !mText && !mTags && !mAuthor && !mShloka) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'shortest') {
      list = [...list].sort((a, b) => a.textEn.length - b.textEn.length);
    } else if (sortBy === 'longest') {
      list = [...list].sort((a, b) => b.textEn.length - a.textEn.length);
    } else if (sortBy === 'newest') {
      list = [...list].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));
    }

    return list;
  }, [activeCategory, selectedTone, selectedRecipient, selectedFestival, searchQuery, sortBy]);

  const displayedWishes = useMemo(() => {
    return filteredWishes.slice(0, visibleCount);
  }, [filteredWishes, visibleCount]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedTone('all');
    setSelectedRecipient('all');
    setSelectedFestival('all');
    setSearchQuery('');
    setSortBy('relevance');
    setVisibleCount(18);
  };

  const formatWishForSharing = (wish: WishMessage) => {
    const headline = ensureCleanUnicode(getWishHeadline(wish));
    const messageBody = ensureCleanUnicode(getWishText(wish));
    const title = headline || (isHindi ? 'शुभ दीपावली' : isHinglish ? 'Shubh Deepawali' : 'Happy Diwali');
    const lines: string[] = [];

    if (headline) {
      lines.push(`🪔✨ ${headline} ✨🪔`);
    } else {
      lines.push(isHindi ? '🪔✨ शुभ दीपावली ✨🪔' : isHinglish ? '🪔✨ Shubh Deepawali! ✨🪔' : '🪔✨ Happy Diwali! ✨🪔');
    }

    if (wish.shloka) {
      lines.push(ensureCleanUnicode(wish.shloka));
      const meaning = ensureCleanUnicode(
        isHindi ? wish.meaningHi : isHinglish ? wish.meaningHinglish || wish.meaningHi : wish.meaningEn
      );
      if (meaning) {
        lines.push(isHindi ? `भावार्थ: ${meaning}` : isHinglish ? `Bhavarth: ${meaning}` : `Meaning: ${meaning}`);
      }
      const author = ensureCleanUnicode(isHindi ? wish.authorOrSourceHi || wish.authorOrSourceEn : wish.authorOrSourceEn);
      if (author) {
        lines.push(`— ${author}`);
      }
    }

    lines.push(messageBody);

    if (wish.category === 'captions' && wish.tags && wish.tags.length > 0) {
      const missingTags = wish.tags.map(t => ensureCleanUnicode(t)).filter((t) => !messageBody.includes(t));
      if (missingTags.length > 0) {
        lines.push(missingTags.join(' '));
      }
    }

    lines.push(isHindi ? '— फेस्टिववाला (उत्सव • सृजन • आनंद)' : '— FestiveWala (Celebrate. Create. Share.)');

    return {
      title,
      fullFormattedText: lines.join('\n\n'),
    };
  };

  const handleCopy = async (wish: WishMessage) => {
    const { fullFormattedText } = formatWishForSharing(wish);
    const ok = await copyTextToClipboard(fullFormattedText);
    if (ok) {
      setCopiedId(wish.id);
      setToastMessage(isHindi ? 'संदेश क्लिपबोर्ड में कॉपी हो गया!' : isHinglish ? 'Wish clipboard mein copy ho gaya!' : 'Wish copied to clipboard!');
      setTimeout(() => {
        setCopiedId(null);
        setToastMessage(null);
      }, 2500);
    }
  };

  const handleWhatsApp = (wish: WishMessage) => {
    const { fullFormattedText } = formatWishForSharing(wish);
    const url = getWhatsAppShareUrl(fullFormattedText);
    window.open(url, '_blank');
  };

  const handleShare = async (wish: WishMessage) => {
    if (isSharing) return;
    setIsSharing(true);
    const { title, fullFormattedText } = formatWishForSharing(wish);

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: fullFormattedText,
          url: window.location.href,
        });
      } catch (err) {
        handleWhatsApp(wish);
      } finally {
        setIsSharing(false);
      }
    } else {
      handleWhatsApp(wish);
      setIsSharing(false);
    }
  };

  const handleSendToStudio = (wish: WishMessage) => {
    const title = ensureCleanUnicode(getWishHeadline(wish) || (isHindi ? 'शुभ दीपावली' : isHinglish ? 'Shubh Deepawali' : 'Happy Diwali'));
    const message = ensureCleanUnicode(getWishText(wish));
    navigate(`/greeting-cards?title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}`);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden" id="wishes">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="wishes-toast"
            role="status"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={toastNotificationVariants}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#24113D] text-[#F2D98B] font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2.5 border border-[#F2D98B]/50 backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-[#F2D98B]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeading
          badge={isHindi ? 'पावन शुभकामना केंद्र • ५०० संदेश' : 'Smart Wishes Hub • 500 Curated Messages'}
          title={isHindi ? '५०० पावन संदेश संग्रह एवं कस्टम विश जनरेटर' : 'Readymade Wishes & Custom Wishes Generator'}
          subtitle={
            isHindi
              ? '५०० तैयार शुभकामनाओं में खोजें, रिश्ता और भाव चुनकर व्यक्तिगत संदेश बनाएं, या पसंदीदा सहेजें।'
              : 'Browse 500 readymade festival wishes, generate custom personalized messages, or save your favorites.'
          }
        />

        {/* Primary View Mode Tabs: 1. Readymade Wishes (Library) | 2. Custom Wishes (Generator) | 3. Favorites */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#24113D] border border-[#F2D98B]/35 shadow-xl max-w-full overflow-x-auto">
            {/* TAB 1: READYMADE WISHES (Default) */}
            <button
              type="button"
              onClick={() => setActiveMode('library')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                activeMode === 'library'
                  ? 'bg-[#F2D98B] text-[#24113D] shadow-md shadow-[#F2D98B]/20 scale-[1.02]'
                  : 'text-[#FAF7F0]/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <span>{isHindi ? 'तैयार संदेश संग्रह 📖' : 'Readymade Wishes 📖'}</span>
            </button>

            {/* TAB 2: CUSTOM WISHES (Generator) */}
            <button
              type="button"
              onClick={() => setActiveMode('generator')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                activeMode === 'generator'
                  ? 'bg-[#F2D98B] text-[#24113D] shadow-md shadow-[#F2D98B]/20 scale-[1.02]'
                  : 'text-[#FAF7F0]/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 fill-current flex-shrink-0" />
              <span>{isHindi ? 'कस्टम संदेश ✨' : 'Custom Wishes ✨'}</span>
            </button>

            {/* TAB 3: FAVORITES */}
            <button
              type="button"
              onClick={() => setActiveMode('favorites')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                activeMode === 'favorites'
                  ? 'bg-[#F2D98B] text-[#24113D] shadow-md shadow-[#F2D98B]/20 scale-[1.02]'
                  : 'text-[#FAF7F0]/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className="w-4 h-4 fill-current text-rose-400 flex-shrink-0" />
              <span>{isHindi ? 'पसंदीदा ❤️' : 'Favorites ❤️'}</span>
              {savedIds.length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-rose-500 text-white font-bold ml-1">
                  {savedIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MODE 1: READYMADE WISHES (Default View) */}
        {activeMode === 'library' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Search and Secondary Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-grow max-w-xl">
                <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="wishes-search-input"
                  name="wishesSearch"
                  aria-label="Search wishes and festival quotes"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isHindi
                      ? '५०० संदेशों में खोजें (उदा: परिवार, माँ, दीया, व्यापार, मस्ती)...'
                      : 'Search across 500 wishes (e.g. family, mother, diya, startup, laughter)...'
                  }
                  className="w-full pl-10 pr-9 py-2.5 rounded-2xl text-xs sm:text-sm bg-white border border-brand-gold/30 text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:border-brand-royal focus:ring-1 focus:ring-brand-royal shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark"
                    aria-label={isHindi ? 'खोज हटाएं' : 'Clear search'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                {/* Advanced Filter Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all min-h-[42px] ${
                    showFilters || selectedTone !== 'all' || selectedRecipient !== 'all' || selectedFestival !== 'all'
                      ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D]'
                      : 'bg-white text-brand-dark border-brand-gold/30 hover:border-brand-gold'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'फ़िल्टर' : 'Filter by Tone / Recipient'}</span>
                  {(selectedTone !== 'all' || selectedRecipient !== 'all' || selectedFestival !== 'all') && (
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  )}
                </button>

                {/* Sort Dropdown */}
                <select
                  id="wishes-sort-select"
                  name="wishesSort"
                  aria-label={isHindi ? 'क्रमबद्ध करें' : 'Sort wishes'}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2.5 rounded-xl bg-white border border-brand-gold/30 text-xs font-semibold text-brand-dark outline-none focus:border-brand-royal min-h-[42px] shadow-sm"
                >
                  <option value="relevance">{isHindi ? 'क्रम: प्रासंगिक' : 'Sort: Relevance'}</option>
                  <option value="shortest">{isHindi ? 'क्रम: सबसे संक्षिप्त' : 'Sort: Shortest First'}</option>
                  <option value="longest">{isHindi ? 'क्रम: सबसे विस्तृत' : 'Sort: Longest First'}</option>
                  <option value="newest">{isHindi ? 'क्रम: हाल ही में जोड़े गए' : 'Sort: Recently Added'}</option>
                </select>

                {(searchQuery || activeCategory !== 'all' || selectedTone !== 'all' || selectedRecipient !== 'all' || selectedFestival !== 'all') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="p-2.5 rounded-xl bg-brand-light text-brand-dark hover:bg-brand-gold/20 text-xs transition-colors"
                    title={isHindi ? 'सभी फ़िल्टर हटाएं' : 'Reset All Filters'}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters Expandable Drawer */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-gold/30 shadow-md space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Tone Filter */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-royal block mb-1.5">
                      {isHindi ? 'संदेश का भाव (Tone)' : 'Tone'}
                    </label>
                    <select
                      id="wishes-tone-select"
                      name="wishesTone"
                      aria-label="Filter wishes by tone"
                      value={selectedTone}
                      onChange={(e) => setSelectedTone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-brand-light/50 border border-brand-gold/30 text-xs text-brand-dark outline-none"
                    >
                      {tonesList.map((t) => (
                        <option key={t.id} value={t.id}>
                          {isHindi ? t.labelHi : t.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Recipient Filter */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-royal block mb-1.5">
                      {isHindi ? 'प्राप्तकर्ता (Recipient)' : 'Recipient'}
                    </label>
                    <select
                      id="wishes-recipient-select"
                      name="wishesRecipient"
                      aria-label="Filter wishes by recipient"
                      value={selectedRecipient}
                      onChange={(e) => setSelectedRecipient(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-brand-light/50 border border-brand-gold/30 text-xs text-brand-dark outline-none"
                    >
                      {recipientsList.map((r) => (
                        <option key={r.id} value={r.id}>
                          {isHindi ? r.labelHi : r.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Festival Filter */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-royal block mb-1.5">
                      {isHindi ? 'त्योहार (Festival)' : 'Festival'}
                    </label>
                    <select
                      id="wishes-festival-select"
                      name="wishesFestival"
                      aria-label="Filter wishes by festival"
                      value={selectedFestival}
                      onChange={(e) => setSelectedFestival(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-brand-light/50 border border-brand-gold/30 text-xs text-brand-dark outline-none"
                    >
                      {festivalsList.map((f) => (
                        <option key={f.id} value={f.id}>
                          {isHindi ? f.labelHi : f.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Festival Selection Bar */}
            <div data-testid="wishes-festival-quick-bar" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-royal shrink-0 mr-1">
                {isHindi ? 'पर्व चयन:' : 'Select Festival:'}
              </span>
              <button
                type="button"
                data-testid="wishes-fest-btn-all"
                onClick={() => {
                  setSelectedFestival('all');
                  setActiveCategory('all');
                  setVisibleCount(18);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border min-h-[38px] cursor-pointer ${
                  selectedFestival === 'all'
                    ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm font-bold'
                    : 'bg-white text-brand-dark/80 border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                {isHindi ? '🌟 आगामी पर्व (प्राथमिकता)' : '🌟 Upcoming Priority (Auto)'}
              </button>
              <button
                type="button"
                data-testid="wishes-fest-btn-dhanteras"
                onClick={() => {
                  setSelectedFestival('dhanteras');
                  setActiveCategory('all');
                  setVisibleCount(18);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border min-h-[38px] cursor-pointer ${
                  selectedFestival === 'dhanteras'
                    ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm font-bold'
                    : 'bg-white text-brand-dark/80 border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                {isHindi ? '🪙 धनतेरस (१००)' : '🪙 Dhanteras (100)'}
              </button>
              <button
                type="button"
                data-testid="wishes-fest-btn-diwali"
                onClick={() => {
                  setSelectedFestival('diwali');
                  setActiveCategory('all');
                  setVisibleCount(18);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border min-h-[38px] cursor-pointer ${
                  selectedFestival === 'diwali'
                    ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-sm font-bold'
                    : 'bg-white text-brand-dark/80 border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                {isHindi ? '🪔 दीपावली (५००)' : '🪔 Diwali (500)'}
              </button>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setVisibleCount(18);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border min-h-[42px] ${
                      isActive
                        ? 'bg-[#24113D] text-[#F2D98B] border-[#24113D] shadow-md shadow-[#24113D]/20 font-bold scale-[1.02]'
                        : 'bg-white text-brand-dark/80 border-brand-gold/30 hover:border-brand-gold hover:bg-brand-light/50'
                    }`}
                  >
                    <span className={isActive ? 'text-[#F2D98B]' : 'text-brand-gold'}>{cat.icon}</span>
                    <span>{isHindi ? cat.labelHi : isHinglish ? cat.labelHinglish : cat.labelEn}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-[#F2D98B] text-[#24113D] font-bold' : 'bg-brand-light text-brand-royal'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results Count & Empty State */}
            <div className="flex items-center justify-between text-xs text-brand-dark/60 font-mono px-1">
              <span>
                {isHindi
                  ? `${filteredWishes.length} में से ${displayedWishes.length} संदेश प्रदर्शित`
                  : `Showing ${displayedWishes.length} of ${filteredWishes.length} wishes`}
              </span>
            </div>

            {filteredWishes.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-white/70 border border-brand-gold/30 space-y-3">
                <BookOpen className="w-8 h-8 text-brand-gold mx-auto opacity-60" />
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  {isHindi ? 'कोई संदेश नहीं मिला' : 'No matching wishes found'}
                </h4>
                <p className="text-xs text-brand-dark/60 max-w-sm mx-auto">
                  {isHindi
                    ? 'कृपया कोई अन्य शब्द खोजें या फ़िल्टर रीसेट करें।'
                    : 'Try adjusting your search terms or reset the filters.'}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-[#24113D] text-[#F2D98B] text-xs font-bold shadow-md hover:shadow-lg"
                >
                  {isHindi ? 'सभी फ़िल्टर साफ़ करें' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              /* Wishes Cards Grid (500-Item Repository) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedWishes.map((wish, index) => {
                  const isCopied = copiedId === wish.id;
                  const isFav = isFavorite(wish.id);
                  const isDarkCard = wish.category === 'traditional';
                  const isGoldCard = wish.category === 'family' || wish.category === 'love';
                  const isCaption = wish.category === 'captions';

                  let cardClasses =
                    'rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg relative group ';

                  if (isDarkCard) {
                    cardClasses += 'bg-[#1C0B30] text-[#FAF7F0] border-2 border-[#F2D98B]/40 hover:border-[#F2D98B] hover:shadow-2xl';
                  } else if (isGoldCard) {
                    cardClasses += 'bg-gradient-to-br from-[#FFFDF9] to-[#FEF3C7] text-brand-dark border-2 border-[#D4AF37] hover:shadow-2xl';
                  } else if (isCaption) {
                    cardClasses += 'bg-gradient-to-br from-[#FFFDF9] to-[#F3ECFA] text-brand-dark border-2 border-dashed border-brand-royal/40 hover:border-brand-royal hover:shadow-2xl';
                  } else {
                    cardClasses += 'bg-white text-brand-dark border border-brand-gold/35 hover:border-brand-gold/80 hover:shadow-2xl';
                  }

                  return (
                    <React.Fragment key={wish.id}>
                      <motion.div
                        data-testid="wish-card"
                      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                      transition={{ duration: 0.2 }}
                      className={cardClasses}
                    >
                      {/* Top Header of Card */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-current/15">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isDarkCard
                                ? 'bg-white/10 text-[#F2D98B] border border-[#F2D98B]/30'
                                : 'bg-brand-light text-brand-royal border border-brand-gold/30'
                            }`}
                          >
                            <Sparkles className="w-3 h-3 text-brand-gold" />
                            <span>{isHindi ? wish.categoryLabelHi : isHinglish ? wish.categoryLabelHinglish || wish.categoryLabelEn : wish.categoryLabelEn}</span>
                          </span>

                          <motion.button
                            type="button"
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
                            onClick={() => toggleFavorite(wish.id)}
                            className={`p-1.5 rounded-xl border transition-all ${
                              isFav
                                ? 'bg-rose-500/20 border-rose-500 text-rose-500 shadow-sm'
                                : 'bg-black/10 border-current/15 text-current/60 hover:text-current hover:bg-black/15'
                            }`}
                            title={isFav ? (isHindi ? 'पसंदीदा से हटाएं' : 'Remove Favorite') : (isHindi ? 'पसंदीदा में जोड़ें' : 'Save Favorite')}
                            aria-label={isFav ? 'Remove Favorite' : 'Save Favorite'}
                          >
                            <motion.div
                              animate={isFav && !shouldReduceMotion ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                              transition={{ duration: 0.28, ease: 'easeOut' }}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                            </motion.div>
                          </motion.button>
                        </div>

                        {/* Headline */}
                        {(wish.headlineEn || wish.headlineHi || wish.headlineHinglish) && (
                          <h3
                            className={`font-serif text-base sm:text-lg font-bold mb-2.5 break-words ${
                              isDarkCard ? 'text-[#FAF7F0]' : 'text-brand-deep'
                            }`}
                          >
                            {ensureCleanUnicode(getWishHeadline(wish))}
                          </h3>
                        )}

                        {/* Sacred Sanskrit Shloka Box */}
                        {wish.shloka && (
                          <div className="p-3.5 rounded-2xl bg-black/25 border border-[#F2D98B]/40 mb-3 shadow-inner">
                            <p className="font-devanagari text-sm sm:text-base font-bold text-[#F2D98B] leading-relaxed text-center break-words">
                              {ensureCleanUnicode(wish.shloka)}
                            </p>
                            {wish.meaningEn && (
                              <p className="mt-2 text-xs text-[#FAF7F0]/80 font-serif italic text-center leading-relaxed border-t border-white/10 pt-1.5 break-words">
                                "{ensureCleanUnicode(isHindi ? wish.meaningHi : isHinglish ? wish.meaningHinglish || wish.meaningHi : wish.meaningEn)}"
                              </p>
                            )}
                            {(wish.authorOrSourceEn || wish.authorOrSourceHi) && (
                              <p className="mt-1.5 text-[11px] text-[#F2D98B]/90 font-mono text-center tracking-wide break-words border-t border-white/10 pt-1.5">
                                — {ensureCleanUnicode(isHindi ? wish.authorOrSourceHi || wish.authorOrSourceEn : isHinglish ? wish.authorOrSourceHinglish || wish.authorOrSourceEn : wish.authorOrSourceEn)}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Main Wish Text */}
                        <p
                          className={`text-sm sm:text-[15px] leading-relaxed break-words ${
                            isDarkCard
                              ? 'text-[#FAF7F0]/90 font-light'
                              : 'text-brand-dark/90 font-normal'
                          } ${isHindi ? 'font-devanagari' : 'font-sans'}`}
                        >
                          {ensureCleanUnicode(getWishText(wish))}
                        </p>

                        {/* Social Media Tags */}
                        {wish.tags && wish.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {wish.tags.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-brand-gold/15 text-brand-royal font-semibold"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="mt-5 pt-3.5 border-t border-current/15 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {/* Copy Button */}
                          <button
                            type="button"
                            onClick={() => handleCopy(wish)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] ${
                              isCopied
                                ? 'bg-emerald-500 text-white shadow-md'
                                : isDarkCard
                                ? 'bg-[#24113D] text-[#F2D98B] border border-[#F2D98B]/30 hover:bg-[#321752]'
                                : 'bg-white text-brand-dark border border-brand-gold/40 hover:border-brand-gold shadow-sm'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>{isHindi ? 'कॉपी' : 'Copied'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>{isHindi ? 'कॉपी' : 'Copy'}</span>
                              </>
                            )}
                          </button>

                          {/* WhatsApp Share Button */}
                          <button
                            type="button"
                            onClick={() => handleWhatsApp(wish)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all min-h-[38px]"
                            title="Share on WhatsApp"
                          >
                            <Send className="w-3.5 h-3.5 fill-current" />
                            <span>WA</span>
                          </button>

                          {/* Native Web Share */}
                          <button
                            type="button"
                            onClick={() => handleShare(wish)}
                            className={`p-2 rounded-xl text-xs font-semibold transition-all min-h-[38px] min-w-[38px] flex items-center justify-center ${
                              isDarkCard
                                ? 'bg-[#24113D] text-[#FAF7F0] border border-white/10 hover:border-white/30'
                                : 'bg-white text-brand-dark border border-brand-gold/40 hover:border-brand-gold'
                            }`}
                            title={isHindi ? 'शेयर करें' : 'Share'}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Send to Greeting Studio Button */}
                        <button
                          type="button"
                          onClick={() => handleSendToStudio(wish)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F2D98B] text-[#24113D] hover:bg-[#FFE082] shadow-sm transition-all min-h-[38px]"
                          title={isHindi ? 'कार्ड में उपयोग करें' : 'Design card in Studio'}
                        >
                          <Palette className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{isHindi ? 'कार्ड' : 'Card'}</span>
                        </button>
                      </div>
                    </motion.div>
                    {showInGridAds && index === 5 && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 py-2">
                        <MonetagAdSlot variant="banner" />
                      </div>
                    )}
                    {showInGridAds && index === 13 && displayedWishes.length > 15 && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 py-2">
                        <MonetagAdSlot variant="banner" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              </div>
            )}

            {/* Pagination / Load More Button */}
            {visibleCount < filteredWishes.length && (
              <div className="mt-10 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredWishes.length))}
                  className="px-8 py-3 rounded-2xl bg-[#24113D] hover:bg-[#341857] text-[#F2D98B] border border-[#F2D98B]/40 font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
                >
                  {isHindi
                    ? `और संदेश देखें (+${Math.min(24, filteredWishes.length - visibleCount)})`
                    : `Load More Wishes (+${Math.min(24, filteredWishes.length - visibleCount)})`}
                </button>
                <span className="text-[11px] text-brand-dark/50 font-mono">
                  {isHindi
                    ? `${filteredWishes.length} में से ${displayedWishes.length} प्रदर्शित`
                    : `Showing ${displayedWishes.length} of ${filteredWishes.length}`}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* MODE 2: CUSTOM WISHES GENERATOR */}
        {activeMode === 'generator' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SmartWishesGenerator isHindi={isHindi} />
          </motion.div>
        )}

        {/* MODE 3: FAVORITES VIEW */}
        {activeMode === 'favorites' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <WishesFavorites
              isHindi={isHindi}
              onExploreLibrary={() => setActiveMode('library')}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};
