import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WISHES_DATA } from '../../../data/wishes';
import type { WishMessage } from '../../../data/types';
import { Search, X, Check, BookOpen, Sparkles, Heart, Users, Briefcase, Flame, MessageCircle, Hash, Smile, Feather, Building2 } from 'lucide-react';
import { ensureCleanUnicode } from '../../../components/layout/WishesShowcase';

interface PhotoWishSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWish: (wish: { title: string; message: string }) => void;
  isHindi: boolean;
}

const CATEGORIES = [
  { id: 'all', labelEn: 'All Wishes', labelHi: 'सभी संदेश', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'family', labelEn: 'Family & Elders', labelHi: 'परिवार व अग्रज', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'friends', labelEn: 'Friends', labelHi: 'मित्र व साथी', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'love', labelEn: 'Love & Romance', labelHi: 'प्रेम व आत्मीयता', icon: <Heart className="w-3.5 h-3.5" /> },
  { id: 'traditional', labelEn: 'Traditional', labelHi: 'पारंपरिक वंदना', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'emotional', labelEn: 'Heartfelt', labelHi: 'भावुक व आत्मीय', icon: <Feather className="w-3.5 h-3.5" /> },
  { id: 'short', labelEn: 'Short & Sweet', labelHi: 'संक्षिप्त व मधुर', icon: <MessageCircle className="w-3.5 h-3.5" /> },
  { id: 'funny', labelEn: 'Funny & Fun', labelHi: 'हास्य व मस्ती', icon: <Smile className="w-3.5 h-3.5" /> },
  { id: 'professional', labelEn: 'Executive', labelHi: 'कॉरपोरेट', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'captions', labelEn: 'Captions', labelHi: 'सोशल कैप्शन', icon: <Hash className="w-3.5 h-3.5" /> },
  { id: 'business', labelEn: 'Business & Clients', labelHi: 'व्यापार व ग्राहक', icon: <Building2 className="w-3.5 h-3.5" /> },
];

export const PhotoWishSelectorModal: React.FC<PhotoWishSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectWish,
  isHindi: defaultHindi,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [useHindi, setUseHindi] = useState<boolean>(defaultHindi);
  const [selectedWishId, setSelectedWishId] = useState<string | null>(null);

  const filteredWishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return WISHES_DATA.filter((w) => {
      const matchCat = selectedCategory === 'all' || w.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;

      const enText = w.textEn.toLowerCase();
      const hiText = w.textHi.toLowerCase();
      const enHead = (w.headlineEn || '').toLowerCase();
      const hiHead = (w.headlineHi || '').toLowerCase();
      return enText.includes(q) || hiText.includes(q) || enHead.includes(q) || hiHead.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleApply = (w: WishMessage) => {
    const rawTitle = useHindi
      ? (w.headlineHi || 'शुभ दीपावली')
      : (w.headlineEn || 'Shubh Deepavali');
    const rawMessage = useHindi ? w.textHi : w.textEn;
    onSelectWish({
      title: ensureCleanUnicode(rawTitle),
      message: ensureCleanUnicode(rawMessage),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-[#160B26] border border-[#F2D98B]/30 shadow-2xl overflow-hidden text-[#FAF7F0]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F2D98B]/20 bg-[#1D0E33]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#F2D98B]/15 text-[#F2D98B]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#F2D98B]">
                  {useHindi ? '५०० पावन संदेश संग्रह से चुनें' : 'Choose from 500 Festive Wishes'}
                </h3>
                <p className="text-xs text-[#FAF7F0]/70">
                  {useHindi ? 'अपनी तस्वीर के लिए सबसे सुंदर शुभकामना चुनें' : 'Select a heartfelt message for your photo card'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center rounded-lg bg-[#24113D] border border-[#F2D98B]/20 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setUseHindi(false)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${!useHindi ? 'bg-[#F2D98B] text-[#24113D] font-bold' : 'text-[#FAF7F0]/70'}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setUseHindi(true)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${useHindi ? 'bg-[#F2D98B] text-[#24113D] font-bold' : 'text-[#FAF7F0]/70'}`}
                >
                  हिन्दी
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#FAF7F0]/70 hover:text-[#FAF7F0] hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-[#F2D98B]/15 bg-[#160B26]/80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F2D98B]/60" />
              <input
                id="photo-wish-search-input"
                name="photoWishSearch"
                aria-label="Search wishes for photo greeting card"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={useHindi ? 'संदेश, कीवर्ड या भावना खोजें...' : 'Search wishes, emotions, keywords...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#24113D]/90 border border-[#F2D98B]/25 text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/40 focus:outline-none focus:border-[#F2D98B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FAF7F0]/60 hover:text-[#FAF7F0]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#F2D98B] text-[#24113D] font-bold shadow-md'
                      : 'bg-[#24113D] text-[#FAF7F0]/80 hover:bg-[#2E164D] border border-[#F2D98B]/15'
                  }`}
                >
                  {cat.icon}
                  <span>{useHindi ? cat.labelHi : cat.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wishes List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredWishes.length === 0 ? (
              <div className="text-center py-12 text-[#FAF7F0]/50 text-sm">
                {useHindi ? 'कोई संदेश नहीं मिला। कृपया दूसरा शब्द खोजें।' : 'No wishes found matching your search.'}
              </div>
            ) : (
              filteredWishes.map((w) => {
                const isSelected = selectedWishId === w.id;
                const text = ensureCleanUnicode(useHindi ? w.textHi : w.textEn);
                const head = ensureCleanUnicode(useHindi ? w.headlineHi : w.headlineEn);

                return (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWishId(w.id)}
                    className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#24113D] border-[#F2D98B] shadow-lg shadow-[#F2D98B]/10'
                        : 'bg-[#1D0E33]/60 border-[#F2D98B]/15 hover:border-[#F2D98B]/40 hover:bg-[#24113D]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F2D98B]/15 text-[#F2D98B] border border-[#F2D98B]/30">
                            {useHindi ? w.categoryLabelHi : w.categoryLabelEn}
                          </span>
                          {head && (
                            <span className="text-xs font-semibold text-[#FAF7F0]/90 break-words">
                              {head}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#FAF7F0]/90 leading-relaxed font-normal break-words">
                          {text}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(w);
                        }}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2D98B] text-[#24113D] font-bold text-xs hover:bg-[#FFE082] transition-transform active:scale-95 shadow-md"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{useHindi ? 'चुनें' : 'Use'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Note */}
          <div className="px-5 py-3 border-t border-[#F2D98B]/15 bg-[#1D0E33] flex items-center justify-between text-xs text-[#FAF7F0]/60">
            <span>{filteredWishes.length} {useHindi ? 'संदेश उपलब्ध' : 'wishes available'}</span>
            <span>{useHindi ? 'चयन के बाद आप संदेश को संपादित भी कर सकते हैं' : 'You can edit the message anytime after selecting'}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

