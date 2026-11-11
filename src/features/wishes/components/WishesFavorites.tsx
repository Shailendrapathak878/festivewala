import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Heart,
  Search,
  X,
  Trash2,
  Copy,
  Check,
  Send,
  Palette,
  BookOpen,
} from 'lucide-react';
import { ALL_WISHES_DATA } from '../../../data/wishes';
import type { WishMessage } from '../../../data/types';
import { useSavedWishes } from '../hooks/useSavedWishes';
import {
  getWhatsAppShareUrl,
  copyTextToClipboard,
} from '../services/wishGeneratorService';
import { ensureCleanUnicode } from '../../../components/layout/WishesShowcase';

interface WishesFavoritesProps {
  isHindi: boolean;
  onExploreLibrary?: () => void;
}

export const WishesFavorites: React.FC<WishesFavoritesProps> = ({
  isHindi,
  onExploreLibrary,
}) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { savedIds, removeFavorite, clearAllFavorites } = useSavedWishes();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Retrieve saved wish objects
  const savedWishes = useMemo(() => {
    return ALL_WISHES_DATA.filter((w) => savedIds.includes(w.id));
  }, [savedIds]);

  // Categories present in saved wishes
  const categoriesPresent = useMemo(() => {
    const cats = new Set(savedWishes.map((w) => w.category));
    return Array.from(cats);
  }, [savedWishes]);

  // Filtered saved wishes
  const filteredWishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return savedWishes.filter((w) => {
      const matchCat = selectedCategory === 'all' || w.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;

      const enText = w.textEn.toLowerCase();
      const hiText = w.textHi.toLowerCase();
      const enHead = (w.headlineEn || '').toLowerCase();
      const hiHead = (w.headlineHi || '').toLowerCase();
      return enText.includes(q) || hiText.includes(q) || enHead.includes(q) || hiHead.includes(q);
    });
  }, [savedWishes, selectedCategory, searchQuery]);

  const handleCopy = async (wish: WishMessage) => {
    const rawText = isHindi ? `${wish.headlineHi ? `🪔✨ ${wish.headlineHi} ✨🪔\n\n` : ''}${wish.textHi}\n\n— FestiveWala` : `${wish.headlineEn ? `🪔✨ ${wish.headlineEn} ✨🪔\n\n` : ''}${wish.textEn}\n\n— FestiveWala`;
    const text = ensureCleanUnicode(rawText);
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedId(wish.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleWhatsApp = (wish: WishMessage) => {
    const rawText = isHindi ? `${wish.headlineHi ? `🪔✨ ${wish.headlineHi} ✨🪔\n\n` : ''}${wish.textHi}\n\n— FestiveWala` : `${wish.headlineEn ? `🪔✨ ${wish.headlineEn} ✨🪔\n\n` : ''}${wish.textEn}\n\n— FestiveWala`;
    const text = ensureCleanUnicode(rawText);
    const url = getWhatsAppShareUrl(text);
    window.open(url, '_blank');
  };

  const handleSendToStudio = (wish: WishMessage) => {
    let fallbackTitle = isHindi ? 'शुभकामनाएं' : 'Best Wishes';
    if (wish.category === 'birthday') fallbackTitle = isHindi ? 'जन्मदिन की शुभकामनाएं' : 'Happy Birthday';
    else if (wish.category === 'anniversary') fallbackTitle = isHindi ? 'विवाह वर्षगांठ बधाई' : 'Happy Anniversary';
    else if (wish.category === 'love') fallbackTitle = isHindi ? 'प्रेम संदेश' : 'Love Message';
    else if (wish.category === 'friendship') fallbackTitle = isHindi ? 'मित्रता संदेश' : 'Friendship Message';
    else if (wish.category === 'good-morning') fallbackTitle = isHindi ? 'सुप्रभात' : 'Good Morning';
    else if (wish.category === 'good-night') fallbackTitle = isHindi ? 'शुभ रात्रि' : 'Good Night';
    else fallbackTitle = isHindi ? 'शुभ दीपावली' : 'Happy Diwali';

    const title = ensureCleanUnicode(isHindi ? wish.headlineHi || fallbackTitle : wish.headlineEn || fallbackTitle);
    const message = ensureCleanUnicode(isHindi ? wish.textHi : wish.textEn);
    navigate(`/greeting-cards?title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#1A0E2E]/80 border border-[#F2D98B]/20">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#FAF7F0]">
              {isHindi ? 'सहेजे गए पसंदीदा संदेश' : 'My Saved Festive Favorites'}
            </h3>
            <span className="text-xs text-[#FAF7F0]/60">
              {isHindi
                ? `${savedWishes.length} संदेश आपकी डिवाइस में सुरक्षित सहेजे गए हैं`
                : `${savedWishes.length} wishes saved locally on this browser`}
            </span>
          </div>
        </div>

        {savedWishes.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(isHindi ? 'क्या आप सभी सहेजे गए संदेश हटाना चाहते हैं?' : 'Remove all saved favorites?')) {
                clearAllFavorites();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-900/50 transition-colors self-start sm:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isHindi ? 'सभी हटाएं' : 'Clear All'}</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {savedWishes.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#170A28]/60 border border-[#F2D98B]/15 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#24113D] border border-[#F2D98B]/30 flex items-center justify-center mx-auto text-[#F2D98B]">
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="font-serif text-lg font-bold text-[#FAF7F0]">
              {isHindi ? 'अभी कोई संदेश सहेजा नहीं गया है' : 'No Saved Wishes Yet'}
            </h4>
            <p className="text-xs text-[#FAF7F0]/60 leading-relaxed">
              {isHindi
                ? 'स्मार्ट जनरेटर या ५०० संदेशों के संग्रह में किसी भी शुभकामना पर दिल ❤️ के निशान पर टैप करें।'
                : 'Tap the heart ❤️ icon on any wish or smart generator output to save it here for instant sharing!'}
            </p>
          </div>
          {onExploreLibrary && (
            <button
              type="button"
              onClick={onExploreLibrary}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F2D98B] text-[#24113D] font-bold text-xs shadow-lg hover:shadow-xl transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isHindi ? '५०० संदेश संग्रह देखें' : 'Explore 500 Wishes'}</span>
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#F2D98B]/60" />
              <input
                id="wishes-favorites-search-input"
                name="favoritesSearch"
                aria-label="Search within saved favorite wishes"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'सहेजे गए संदेशों में खोजें...' : 'Search within saved favorites...'}
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#1A0E2E] border border-[#F2D98B]/25 text-xs text-[#FAF7F0] placeholder-[#FAF7F0]/40 outline-none focus:border-[#F2D98B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#FAF7F0]/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {categoriesPresent.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B]'
                      : 'bg-[#180A2B] text-[#FAF7F0]/70 border-white/5'
                  }`}
                >
                  {isHindi ? 'सभी' : 'All'}
                </button>
                {categoriesPresent.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCategory(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border capitalize transition-all ${
                      selectedCategory === c
                        ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B]'
                        : 'bg-[#180A2B] text-[#FAF7F0]/70 border-white/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWishes.map((wish) => (
              <div
                key={wish.id}
                className="rounded-2xl bg-[#1A0E2E]/90 border border-[#F2D98B]/25 hover:border-[#F2D98B]/60 p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-xl transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#24113D] text-[#F2D98B] border border-[#F2D98B]/30">
                      {isHindi ? wish.categoryLabelHi : wish.categoryLabelEn}
                    </span>

                    <motion.button
                      type="button"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.15 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }}
                      onClick={() => removeFavorite(wish.id)}
                      className="p-1 rounded-lg text-rose-400 hover:text-rose-300 transition-colors"
                      title={isHindi ? 'पसंदीदा से हटाएं' : 'Remove from Favorites'}
                      aria-label="Remove from Favorites"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </motion.button>
                  </div>

                  {((isHindi ? wish.headlineHi : wish.headlineEn) || wish.headlineEn) && (
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#FAF7F0] break-words">
                      {ensureCleanUnicode(isHindi ? wish.headlineHi || wish.headlineEn : wish.headlineEn)}
                    </h4>
                  )}

                  <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed font-sans break-words">
                    {ensureCleanUnicode(isHindi ? wish.textHi : wish.textEn)}
                  </p>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#F2D98B]/15">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(wish)}
                      className="p-2 rounded-xl bg-[#24113D] border border-[#F2D98B]/20 hover:border-[#F2D98B] text-[#FAF7F0] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId === wish.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px] text-emerald-300">{isHindi ? 'कॉपी' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#F2D98B]" />
                          <span className="text-[11px]">{isHindi ? 'कॉपी' : 'Copy'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsApp(wish)}
                      className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[11px]">WhatsApp</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSendToStudio(wish)}
                    className="p-2 rounded-xl bg-[#F2D98B] text-[#24113D] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isHindi ? 'कार्ड' : 'Card 🎨'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
