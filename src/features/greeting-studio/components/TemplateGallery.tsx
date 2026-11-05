import React, { useState, useMemo } from 'react';
import type { GreetingTemplate, TemplateCategory } from '../types/template';
import { TemplateThumbnailPreview } from './TemplateThumbnailPreview';
import { Sparkles, ArrowRight, Check, Palette, Search, X, Camera, Heart, Crown } from 'lucide-react';
import { RELATIONSHIPS, prioritizeTemplatesByRelationship } from '../data/relationshipConfig';

interface TemplateGalleryProps {
  greetingMode: 'simple' | 'photo';
  onGreetingModeChange: (mode: 'simple' | 'photo') => void;
  simpleTemplates: GreetingTemplate[];
  photoTemplates: GreetingTemplate[];
  selectedTemplateId: string;
  onSelectTemplate: (template: GreetingTemplate, relationshipId?: string) => void;
  isHindi: boolean;
  isHinglish?: boolean;
  language?: 'en' | 'hi' | 'hinglish';
  selectedRelationship?: string;
  onRelationshipChange?: (relId: string) => void;
}

const SIMPLE_CATEGORY_CONFIG: { id: 'all' | TemplateCategory; labelEn: string; labelHi: string; labelHinglish?: string }[] = [
  { id: 'all', labelEn: 'All Designs', labelHi: 'सभी विन्यास', labelHinglish: 'All Designs' },
  { id: 'premium-purple-gold', labelEn: 'Purple & Gold', labelHi: 'शाही बैंगनी', labelHinglish: 'Purple & Gold' },
  { id: 'traditional-indian', labelEn: 'Traditional Indian', labelHi: 'पारंपरिक धरोहर', labelHinglish: 'Traditional' },
  { id: 'modern-minimal', labelEn: 'Modern Minimal', labelHi: 'सुरुचिपूर्ण', labelHinglish: 'Modern Minimal' },
  { id: 'floral-rangoli', labelEn: 'Floral & Rangoli', labelHi: 'पुष्प व रंगोली', labelHinglish: 'Floral Rangoli' },
  { id: 'cute-creative', labelEn: 'Cute & Creative', labelHi: 'रचनात्मक', labelHinglish: 'Cute & Creative' },
  { id: 'corporate-professional', labelEn: 'Corporate', labelHi: 'कॉरपोरेट', labelHinglish: 'Corporate' },
  { id: 'family-friends', labelEn: 'Family & Friends', labelHi: 'परिवार व मित्र', labelHinglish: 'Family & Friends' },
  { id: 'story-special', labelEn: 'Story Special', labelHi: 'स्टोरी स्पेशल', labelHinglish: 'Story Special' },
];

const PHOTO_LAYOUT_CONFIG = [
  { id: 'all', labelEn: 'All Photo Layouts', labelHi: 'सभी फोटो लेआउट्स', labelHinglish: 'All Photo Layouts', matchIds: [] },
  { id: 'portrait', labelEn: 'Single Portrait', labelHi: 'सिंगल फोटो', labelHinglish: 'Single Photo', matchIds: ['photo-royal-portrait', 'photo-gilded-heritage'] },
  { id: 'couple', labelEn: 'Couple Celebration', labelHi: 'कपल फोटो', labelHinglish: 'Couple Photo', matchIds: ['photo-eternal-flame-couple', 'photo-starlight-romance'] },
  { id: 'family', labelEn: 'Family Moments', labelHi: 'परिवार फोटो', labelHinglish: 'Family Photo', matchIds: ['photo-parivar-panoramic', 'photo-hearth-and-home'] },
  { id: 'friends', labelEn: 'Friends Forever', labelHi: 'दोस्त व गैंग', labelHinglish: 'Friends & Gang', matchIds: ['photo-yaari-sparklers', 'photo-rooftop-gang'] },
  { id: 'collage', labelEn: 'Multi-Photo Collages', labelHi: 'कोलाज (२-४ फोटो)', labelHinglish: 'Collage (2-4 Photos)', matchIds: ['photo-festive-duet-collage', 'photo-quad-memories-collage'] },
  { id: 'full', labelEn: 'Full Photo Canvas', labelHi: 'फुल बैकग्राउंड', labelHinglish: 'Full Photo Canvas', matchIds: ['photo-cinematic-scrim', 'photo-golden-hour-full'] },
  { id: 'arch-split', labelEn: 'Arch & Split', labelHi: 'झरोखा व स्प्लिट', labelHinglish: 'Jharokha & Split', matchIds: ['photo-modern-split-duo', 'photo-traditional-jharokha'] },
];

const POPULAR_RELATION_IDS = [
  'mother',
  'father',
  'brother',
  'sister',
  'best-friend',
  'partner',
  'teacher',
  'colleague',
  'customer',
  'family',
];

const INITIAL_BATCH_SIZE = 12;
const BATCH_INCREMENT = 12;

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  greetingMode,
  onGreetingModeChange,
  simpleTemplates,
  photoTemplates,
  selectedTemplateId,
  onSelectTemplate,
  isHindi,
  isHinglish = false,
  language,
  selectedRelationship = 'none',
  onRelationshipChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [activeRel, setActiveRel] = useState<string>(selectedRelationship);

  // Active pool of templates strictly filtered by greetingMode
  const activePool = useMemo(() => {
    return greetingMode === 'simple' ? simpleTemplates : photoTemplates;
  }, [greetingMode, simpleTemplates, photoTemplates]);

  const handleModeSwitch = (mode: 'simple' | 'photo') => {
    onGreetingModeChange(mode);
    setSelectedCategory('all');
    setSearchQuery('');
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const handleRelChange = (newRel: string) => {
    setActiveRel(newRel);
    onRelationshipChange?.(newRel);
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  // Re-order templates when relationship is selected (strictly within active pool)
  const orderedTemplates = useMemo(() => {
    if (!activeRel || activeRel === 'none' || activeRel === 'everyone') {
      return activePool;
    }
    const { recommended, others } = prioritizeTemplatesByRelationship(activePool, activeRel);
    return [...recommended, ...others];
  }, [activePool, activeRel]);

  // Set of recommended template IDs for the active relationship
  const recommendedIds = useMemo(() => {
    if (!activeRel || activeRel === 'none' || activeRel === 'everyone') {
      return new Set<string>();
    }
    const { recommended } = prioritizeTemplatesByRelationship(activePool, activeRel);
    return new Set<string>(recommended.map((t) => t.id));
  }, [activePool, activeRel]);

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    if (greetingMode === 'simple') {
      const counts: Record<string, number> = { all: orderedTemplates.length };
      for (const t of orderedTemplates) {
        counts[t.category] = (counts[t.category] || 0) + 1;
      }
      return counts;
    } else {
      const counts: Record<string, number> = { all: orderedTemplates.length };
      for (const cat of PHOTO_LAYOUT_CONFIG) {
        if (cat.id === 'all') continue;
        counts[cat.id] = orderedTemplates.filter((t) => cat.matchIds.includes(t.id)).length;
      }
      return counts;
    }
  }, [orderedTemplates, greetingMode]);

  // Filter templates based on category and search query
  const filteredTemplates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return orderedTemplates.filter((tpl) => {
      let matchesCategory = true;
      if (greetingMode === 'simple') {
        matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
      } else {
        if (selectedCategory !== 'all') {
          const catObj = PHOTO_LAYOUT_CONFIG.find((c) => c.id === selectedCategory);
          matchesCategory = Boolean(catObj?.matchIds.includes(tpl.id));
        }
      }
      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        tpl.name.toLowerCase().includes(query) ||
        tpl.nameHi.toLowerCase().includes(query) ||
        (tpl.nameHinglish && tpl.nameHinglish.toLowerCase().includes(query)) ||
        tpl.description.toLowerCase().includes(query) ||
        tpl.descriptionHi.toLowerCase().includes(query) ||
        (tpl.descriptionHinglish && tpl.descriptionHinglish.toLowerCase().includes(query)) ||
        (tpl.badge && tpl.badge.toLowerCase().includes(query)) ||
        (tpl.badgeHi && tpl.badgeHi.toLowerCase().includes(query)) ||
        (tpl.badgeHinglish && tpl.badgeHinglish.toLowerCase().includes(query)) ||
        tpl.categoryLabelEn.toLowerCase().includes(query) ||
        tpl.categoryLabelHi.toLowerCase().includes(query) ||
        (tpl.categoryLabelHinglish && tpl.categoryLabelHinglish.toLowerCase().includes(query))
      );
    });
  }, [orderedTemplates, selectedCategory, searchQuery, greetingMode]);

  // Split filtered into featured (Signature) and regular — only for simple mode
  const featuredTemplates = useMemo(() => {
    if (greetingMode !== 'simple') return [];
    return filteredTemplates.filter((t) => t.isFeatured === true);
  }, [filteredTemplates, greetingMode]);

  const regularTemplates = useMemo(() => {
    if (greetingMode !== 'simple') return filteredTemplates;
    return filteredTemplates.filter((t) => t.isFeatured !== true);
  }, [filteredTemplates, greetingMode]);

  // Visible sliced batch — only from regular (non-featured) templates
  const displayedTemplates = useMemo(() => {
    return regularTemplates.slice(0, visibleCount);
  }, [regularTemplates, visibleCount]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, regularTemplates.length));
  };

  const currentRelObj = RELATIONSHIPS.find((r) => r.id === activeRel);

  return (
    <div className="space-y-6">
      {/* 1. SEPARATE BOTH GREETING EXPERIENCES (Two Distinct Entry Options) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OPTION A — Simple Greetings */}
        <button
          type="button"
          onClick={() => handleModeSwitch('simple')}
          className={`relative p-5 sm:p-6 rounded-3xl border-2 text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
            greetingMode === 'simple'
              ? 'bg-gradient-to-br from-[#2E1254] via-[#220D3E] to-[#140626] border-[#F2D98B] shadow-2xl shadow-[#F2D98B]/20 ring-2 ring-[#F2D98B]/40'
              : 'bg-[#180A2D]/80 border-[#F2D98B]/25 hover:border-[#F2D98B]/60 hover:bg-[#200D3B]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F2D98B]/15 border border-[#F2D98B]/40 flex items-center justify-center text-[#F2D98B] group-hover:scale-110 transition-transform shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono border ${
                  greetingMode === 'simple'
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B]'
                    : 'bg-[#24113D] text-[#F2D98B] border-[#F2D98B]/30'
                }`}
              >
                {isHindi ? '१०० डिज़ाइन्स' : isHinglish ? '100 Designs' : '100 Designs'}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF7F0] group-hover:text-[#F2D98B] transition-colors">
              {isHindi ? 'Simple Greeting' : 'Simple Greetings'}
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80 mt-1.5 leading-relaxed">
              {isHindi
                ? 'Apni pasand ka greeting design chunein, naam aur message add karein aur share karein.'
                : isHinglish
                ? 'Apni pasand ka greeting design chunein, naam aur message add karein aur share karein.'
                : 'Choose a beautiful greeting design, personalize the text and share it.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F2D98B]/15 flex items-center justify-between text-xs font-semibold text-[#F2D98B]">
            <span>{isHindi ? 'पारंपरिक कला व शुभकामना' : isHinglish ? 'Traditional Art aur Wishes' : 'Artistic Motifs & Wishes'}</span>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>{isHindi ? 'डिज़ाइन देखें' : isHinglish ? 'Simple Designs Dekhein' : 'Browse Simple'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </button>

        {/* OPTION B — Photo Greetings */}
        <button
          type="button"
          onClick={() => handleModeSwitch('photo')}
          className={`relative p-5 sm:p-6 rounded-3xl border-2 text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
            greetingMode === 'photo'
              ? 'bg-gradient-to-br from-[#2E1254] via-[#220D3E] to-[#140626] border-[#F2D98B] shadow-2xl shadow-[#F2D98B]/20 ring-2 ring-[#F2D98B]/40'
              : 'bg-[#180A2D]/80 border-[#F2D98B]/25 hover:border-[#F2D98B]/60 hover:bg-[#200D3B]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F2D98B] to-[#D4AF37] text-[#24113D] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#F2D98B]/20">
                <Camera className="w-6 h-6" />
              </div>
              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono border ${
                  greetingMode === 'photo'
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B]'
                    : 'bg-[#24113D] text-[#F2D98B] border-[#F2D98B]/30'
                }`}
              >
                {isHindi ? '१४ फोटो लेआउट्स' : isHinglish ? '14 Photo Layouts' : '14 Photo Layouts'}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF7F0] group-hover:text-[#F2D98B] transition-colors">
              {isHindi ? 'Apni Photo Se Greeting Banayein' : isHinglish ? 'Apni Photo Se Greeting Banayein' : 'Create with Your Photo'}
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80 mt-1.5 leading-relaxed">
              {isHindi
                ? 'Apni photo lagayein, frame mein sahi se set karein aur apna greeting banayein.'
                : isHinglish
                ? 'Apni photo lagayein, frame mein sahi se set karein aur apna greeting banayein.'
                : 'Add your favourite photo, adjust it inside a frame and create a personalized greeting.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F2D98B]/15 flex items-center justify-between text-xs font-semibold text-[#F2D98B]">
            <span>Portrait, Couple, Family, Collage</span>
            <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>{isHindi ? 'फोटो लेआउट देखें' : isHinglish ? 'Photo Layout Dekhein' : 'Browse Photo'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </button>
      </div>

      {/* 2. Relationship Selection Bar ("Who is this greeting for?" / "Greeting kiske liye hai?") */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#24113D] via-[#1D0A35] to-[#120524] border border-[#F2D98B]/35 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F2D98B]/20 border border-[#F2D98B]/40 flex items-center justify-center text-[#F2D98B] flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#F2D98B] flex items-center gap-2">
                <span>{isHindi ? 'Greeting kiske liye hai?' : isHinglish ? 'Greeting kiske liye hai?' : 'Who is this greeting for?'}</span>
                {currentRelObj && currentRelObj.id !== 'none' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2D98B] text-[#24113D] font-bold">
                    {currentRelObj.icon} {isHindi ? currentRelObj.labelHi : isHinglish ? currentRelObj.labelHi : currentRelObj.labelEn}
                  </span>
                )}
              </h3>
              <p className="text-xs text-[#FAF7F0]/75 mt-0.5">
                {isHindi
                  ? `${greetingMode === 'simple' ? 'Simple Greetings' : 'Photo Greetings'} mein relation ke anuroop designs sabse pehle dikhenge`
                  : isHinglish
                  ? `${greetingMode === 'simple' ? 'Simple Greetings' : 'Photo Greetings'} mein relationship ke matching designs sabse pehle dikhenge`
                  : `Prioritizing ${greetingMode === 'simple' ? 'simple' : 'photo'} designs matching your relationship`}
              </p>
            </div>
          </div>

          {/* Dropdown Selector */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <select
              id="template-gallery-rel-select"
              name="templateGalleryRelationship"
              aria-label="Filter templates by relationship"
              value={activeRel}
              onChange={(e) => handleRelChange(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#160826] border border-[#F2D98B]/40 text-[#FAF7F0] text-xs font-semibold focus:outline-none focus:border-[#F2D98B] cursor-pointer min-h-[40px]"
            >
              <option value="none">
                {isHindi ? '— Sabhi ke liye (Skip) —' : isHinglish ? '— Sabhi ke liye (Skip) —' : '— All Relations (Skip) —'}
              </option>
              {RELATIONSHIPS.filter((r) => r.id !== 'none').map((rel) => (
                <option key={rel.id} value={rel.id}>
                  {rel.icon} {isHindi ? rel.labelHi : isHinglish ? rel.labelHi : rel.labelEn}
                </option>
              ))}
            </select>

            {activeRel !== 'none' && (
              <button
                type="button"
                onClick={() => handleRelChange('none')}
                className="px-3 py-2 rounded-xl bg-[#24113D] hover:bg-[#321752] border border-[#F2D98B]/25 text-[#FAF7F0]/80 text-xs hover:text-white"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Quick Relationship Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {POPULAR_RELATION_IDS.map((rId) => {
            const rel = RELATIONSHIPS.find((item) => item.id === rId);
            if (!rel) return null;
            const isSelected = activeRel === rId;

            return (
              <button
                key={rId}
                type="button"
                onClick={() => handleRelChange(isSelected ? 'none' : rId)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-1.5 min-h-[36px] ${
                  isSelected
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold shadow-md scale-105'
                    : 'bg-[#180A2D]/80 text-[#FAF7F0]/85 border-[#F2D98B]/20 hover:border-[#F2D98B]/50'
                }`}
              >
                <span>{rel.icon}</span>
                <span>{isHindi ? rel.labelHi : isHinglish ? rel.labelHi : rel.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Search and Category Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-[#F2D98B]/60" />
            <input
              id="template-search-input"
              name="templateSearch"
              aria-label={isHindi ? 'Design khojein' : isHinglish ? 'Design khojein' : 'Search templates'}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={
                greetingMode === 'simple'
                  ? isHindi
                    ? '१०० Simple Greetings में नाम या शैली खोजें...'
                    : isHinglish
                    ? '100 Simple Greetings mein naam ya style search karein...'
                    : 'Search across 100 Simple Greetings by name or style...'
                  : isHindi
                  ? '१४ Photo Greetings में लेआउट खोजें (Portrait, Couple, Family)...'
                  : isHinglish
                  ? '14 Photo Greetings mein layout khojein (Portrait, Couple, Family)...'
                  : 'Search across 14 Photo Greetings (Portrait, Couple, Family, Collage)...'
              }
              className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-[#1A0E2E]/90 border border-[#F2D98B]/25 focus:border-[#F2D98B] focus:ring-1 focus:ring-[#F2D98B] text-xs sm:text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/40 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 p-1 rounded-full text-[#FAF7F0]/60 hover:text-[#FAF7F0] hover:bg-white/10"
                aria-label={isHindi ? 'खोज साफ़ करें' : 'Clear search'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
          {(greetingMode === 'simple' ? SIMPLE_CATEGORY_CONFIG : PHOTO_LAYOUT_CONFIG).map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border min-h-[44px] ${
                  isActive
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] shadow-lg shadow-[#F2D98B]/20 font-bold scale-[1.02]'
                    : 'bg-[#1E0E33]/90 text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/60 hover:bg-[#281345]'
                }`}
              >
                <span>{isHindi ? cat.labelHi : isHinglish ? (cat.labelHinglish || cat.labelEn) : cat.labelEn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-[#24113D] text-[#F2D98B]'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Count & Recommended indicator */}
      <div className="flex items-center justify-between text-xs text-[#FAF7F0]/60 px-1">
        <div className="flex items-center gap-2">
          <span>
            {isHindi
              ? `${greetingMode === 'simple' ? 'Simple Greetings' : 'Photo Greetings'}: ${featuredTemplates.length + regularTemplates.length} में से ${featuredTemplates.length + displayedTemplates.length} प्रदर्शित`
              : isHinglish
              ? `${greetingMode === 'simple' ? 'Simple Greetings' : 'Photo Greetings'}: ${featuredTemplates.length + regularTemplates.length} mein se ${featuredTemplates.length + displayedTemplates.length} dikh rahe hain`
              : `Showing ${featuredTemplates.length + displayedTemplates.length} of ${featuredTemplates.length + regularTemplates.length} ${greetingMode === 'simple' ? 'Simple' : 'Photo'} Designs`}
          </span>
          {activeRel !== 'none' && currentRelObj && (
            <span className="text-[#F2D98B] font-semibold hidden sm:inline">
              • {isHindi ? `${currentRelObj.labelHi} ke liye recommendations` : isHinglish ? `${currentRelObj.labelHi} ke liye recommended` : `Recommended for ${currentRelObj.labelEn}`}
            </span>
          )}
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-[#F2D98B] hover:underline"
          >
            {isHindi ? 'सभी देखें' : isHinglish ? 'Reset Karein' : 'Reset filter'}
          </button>
        )}
      </div>

      {/* SIGNATURE GREETINGS FEATURED SECTION */}
      {greetingMode === 'simple' && featuredTemplates.length > 0 && (
        <div className="space-y-5 pb-2">
          {/* Section Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F2D98B] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#F2D98B]/20 flex-shrink-0">
                <Crown className="w-5 h-5 text-[#24113D]" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-serif font-bold text-[#F2D98B] leading-tight">
                  {isHindi ? 'सिग्नेचर ग्रीटिंग्स' : isHinglish ? 'Signature Greetings' : 'Signature Greetings'}
                </h3>
                <p className="text-[11px] text-[#FAF7F0]/55 mt-0.5 leading-snug">
                  {isHindi
                    ? 'हर उत्सव को विशेष बनाने के लिए चुने गए बेहतरीन डिज़ाइन'
                    : isHinglish
                    ? 'Har celebration ko special banane ke liye handpicked designs'
                    : 'Handpicked designs to make every celebration special'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F2D98B]/10 text-[#F2D98B] border border-[#F2D98B]/25 font-mono tracking-wider whitespace-nowrap flex-shrink-0">
              {featuredTemplates.length} {isHindi ? 'डिज़ाइन' : isHinglish ? 'Designs' : 'Designs'}
            </span>
          </div>

          {/* Featured Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredTemplates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              const isRecommended = recommendedIds.has(tpl.id);
              return (
                <div
                  key={tpl.id}
                  data-testid="template-card"
                  onClick={() => onSelectTemplate(tpl, activeRel)}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#F2D98B] ring-2 ring-[#F2D98B] shadow-2xl shadow-[#F2D98B]/25 bg-[#1F0E35]'
                      : 'border-[#F2D98B]/50 hover:border-[#F2D98B] bg-[#1A0C2E]/95 hover:bg-[#220F3D] shadow-xl hover:shadow-2xl hover:-translate-y-1.5 ring-1 ring-[#F2D98B]/15'
                  }`}
                >
                  {/* Signature Crown Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#C8A84B] to-[#F2D98B] text-[#1A0830] text-[9px] font-bold shadow-lg tracking-wider">
                    ♛ {isHindi ? 'सिग्नेचर' : isHinglish ? 'Signature' : 'Signature'}
                  </div>

                  {/* Top Meta Bar */}
                  <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-[#F2D98B]/15 bg-[#1A0E2E]/60 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#24113D] text-[#F2D98B] border border-[#F2D98B]/30 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#F2D98B]" />
                        <span>{isHindi ? tpl.badgeHi || tpl.badge : isHinglish ? tpl.badgeHinglish || tpl.badge : tpl.badge}</span>
                      </span>
                      {isRecommended && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F2D98B] text-[#24113D] shadow-sm">
                          ★ {isHindi ? 'अनुशंसित' : 'Recommended'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#FAF7F0]/60 uppercase tracking-wider">
                        {isHindi ? tpl.categoryLabelHi : isHinglish ? tpl.categoryLabelHinglish || tpl.categoryLabelEn : tpl.categoryLabelEn}
                      </span>
                      {isSelected && (
                        <span className="w-6 h-6 rounded-full bg-[#F2D98B] text-[#24113D] flex items-center justify-center font-bold shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Artwork Container */}
                  <div className="relative aspect-square w-full p-3 sm:p-4 bg-gradient-to-b from-[#11071F] to-[#1E0E33] flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[#F2D98B]/40 group-hover:border-[#F2D98B]/80 transition-colors">
                      <TemplateThumbnailPreview
                        template={tpl}
                        isHindi={isHindi}
                        isHinglish={isHinglish}
                        language={language}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#24113D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <span className="px-4 py-2 rounded-xl bg-[#F2D98B] text-[#24113D] font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Palette className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'Design Chunein' : isHinglish ? 'Design Select Karein' : 'Choose Design'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3 bg-[#160B26]/80 border-t border-[#F2D98B]/15">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#FAF7F0] group-hover:text-[#F2D98B] transition-colors leading-snug">
                        {isHindi ? tpl.nameHi : isHinglish ? tpl.nameHinglish || tpl.name : tpl.name}
                      </h3>
                      <p className="text-xs text-[#FAF7F0]/70 mt-1.5 line-clamp-2 leading-relaxed">
                        {isHindi ? tpl.descriptionHi : isHinglish ? tpl.descriptionHinglish || tpl.description : tpl.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F2D98B]/15 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-[#FAF7F0]/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{isHindi ? '४ प्रारूप उपलब्ध' : isHinglish ? '4 Formats Available' : '4 Output Formats'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#F2D98B] group-hover:translate-x-1 transition-transform">
                        <span>{isHindi ? 'Design Chunein' : isHinglish ? 'Design Select Karein' : 'Choose Design'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual divider before regular collection */}
          {regularTemplates.length > 0 && (
            <div className="flex items-center gap-4 pt-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#F2D98B]/25 to-transparent" />
              <span className="text-[10px] font-mono text-[#FAF7F0]/35 uppercase tracking-widest whitespace-nowrap px-2">
                {isHindi ? 'सभी ग्रीटिंग्स' : isHinglish ? 'Full Collection' : 'Full Collection'}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#F2D98B]/25 to-transparent" />
            </div>
          )}
        </div>
      )}

      {/* 4. Templates Grid strictly showing only selected mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedTemplates.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;
          const isRecommended = recommendedIds.has(tpl.id);

          return (
            <React.Fragment key={tpl.id}>
              <div
                data-testid="template-card"
                onClick={() => onSelectTemplate(tpl, activeRel)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#F2D98B] ring-2 ring-[#F2D98B] shadow-2xl shadow-[#F2D98B]/20 bg-[#1F0E35]'
                    : isRecommended
                    ? 'border-[#F2D98B]/50 hover:border-[#F2D98B] bg-[#1A0C2E]/95 hover:bg-[#220F3D] shadow-xl hover:shadow-2xl hover:-translate-y-1.5 ring-1 ring-[#F2D98B]/30'
                    : 'border-[#F2D98B]/25 hover:border-[#F2D98B]/70 bg-[#160B26]/90 hover:bg-[#1E0E33] shadow-xl hover:shadow-2xl hover:-translate-y-1.5'
                }`}
              >
                {/* Top Meta Bar */}
                <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-[#F2D98B]/15 bg-[#1A0E2E]/60 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#24113D] text-[#F2D98B] border border-[#F2D98B]/30 shadow-sm">
                      {greetingMode === 'photo' ? <Camera className="w-3 h-3 text-[#F2D98B]" /> : <Sparkles className="w-3 h-3 text-[#F2D98B]" />}
                      <span>{isHindi ? tpl.badgeHi || tpl.badge : isHinglish ? tpl.badgeHinglish || tpl.badge : tpl.badge}</span>
                    </span>
                    {isRecommended && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F2D98B] text-[#24113D] shadow-sm">
                        ★ {isHindi ? 'अनुशंसित' : 'Recommended'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#FAF7F0]/60 uppercase tracking-wider">
                      {isHindi ? tpl.categoryLabelHi : isHinglish ? tpl.categoryLabelHinglish || tpl.categoryLabelEn : tpl.categoryLabelEn}
                    </span>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-[#F2D98B] text-[#24113D] flex items-center justify-center font-bold shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Artwork Container */}
                <div className="relative aspect-square w-full p-3 sm:p-4 bg-gradient-to-b from-[#11071F] to-[#1E0E33] flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[#F2D98B]/30 group-hover:border-[#F2D98B]/60 transition-colors">
                    <TemplateThumbnailPreview
                      template={tpl}
                      isHindi={isHindi}
                      isHinglish={isHinglish}
                      language={language}
                      className="w-full h-full"
                    />

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24113D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <span className="px-4 py-2 rounded-xl bg-[#F2D98B] text-[#24113D] font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        {greetingMode === 'photo' ? <Camera className="w-3.5 h-3.5" /> : <Palette className="w-3.5 h-3.5" />}
                        <span>{isHindi ? 'Design Chunein' : isHinglish ? 'Design Select Karein' : 'Choose Design'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Meta Content & Action Button */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3 bg-[#160B26]/80 border-t border-[#F2D98B]/15">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#FAF7F0] group-hover:text-[#F2D98B] transition-colors leading-snug">
                        {isHindi ? tpl.nameHi : isHinglish ? tpl.nameHinglish || tpl.name : tpl.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#FAF7F0]/70 mt-1.5 line-clamp-2 leading-relaxed">
                      {isHindi ? tpl.descriptionHi : isHinglish ? tpl.descriptionHinglish || tpl.description : tpl.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2D98B]/15 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] text-[#FAF7F0]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{isHindi ? '४ प्रारूप उपलब्ध' : isHinglish ? '4 Formats Available' : '4 Output Formats'}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-[#F2D98B] group-hover:translate-x-1 transition-transform">
                      <span>{isHindi ? 'Design Chunein' : isHinglish ? 'Design Select Karein' : 'Choose Design'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Load More Pagination Button */}
      {displayedTemplates.length < regularTemplates.length && (
        <div className="text-center pt-8 pb-4">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#24113D] hover:bg-[#321752] border border-[#F2D98B]/40 hover:border-[#F2D98B] text-[#F2D98B] font-bold text-sm shadow-xl hover:shadow-[#F2D98B]/10 transition-all duration-300 min-h-[48px]"
          >
            <span>
              {isHindi
                ? `और टेम्पलेट्स लोड करें (+${Math.min(BATCH_INCREMENT, regularTemplates.length - displayedTemplates.length)})`
                : `Load More Templates (+${Math.min(BATCH_INCREMENT, regularTemplates.length - displayedTemplates.length)})`}
            </span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16 px-4 bg-[#160B26]/60 rounded-3xl border border-[#F2D98B]/20">
          <p className="text-[#FAF7F0]/70 text-sm mb-4">
            {isHindi
              ? `"${searchQuery}" से मेल खाता कोई टेम्पलेट नहीं मिला।`
              : `No templates matched "${searchQuery}".`}
          </p>
          <button
            type="button"
            onClick={clearSearch}
            className="px-6 py-2.5 rounded-xl bg-[#F2D98B] text-[#24113D] font-bold text-xs shadow-md"
          >
            {isHindi ? 'खोज साफ़ करें' : 'Clear search'}
          </button>
        </div>
      )}
    </div>
  );
};
