import React, { useState } from 'react';
import type { CardCustomization } from '../types/editor';
import { AlignLeft, AlignCenter, AlignRight, Sparkles, BookOpen, Heart } from 'lucide-react';
import { PhotoWishSelectorModal } from './PhotoWishSelectorModal';
import { RELATIONSHIPS } from '../data/relationshipConfig';

interface TextControlsProps {
  customization: CardCustomization;
  onChange: (updates: Partial<CardCustomization>, immediate?: boolean) => void;
  isHindi: boolean;
}

const COLOR_SWATCHES = [
  { hex: '#F2D98B', name: 'Champagne Gold' },
  { hex: '#FBBF24', name: 'Vibrant Gold' },
  { hex: '#FAF7F0', name: 'Warm Ivory' },
  { hex: '#FFFFFF', name: 'Pure White' },
  { hex: '#F59E0B', name: 'Warm Amber' },
  { hex: '#DC2626', name: 'Festival Crimson' },
  { hex: '#24113D', name: 'Deep Purple' },
];

export const TextControls: React.FC<TextControlsProps> = ({
  customization,
  onChange,
  isHindi,
}) => {
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);

  // Selected relationship object
  const currentRelId = customization.relationship || 'none';
  const selectedRel = RELATIONSHIPS.find((r) => r.id === currentRelId);

  const handleRelationshipChange = (relId: string) => {
    const rel = RELATIONSHIPS.find((r) => r.id === relId);
    if (!rel || relId === 'none') {
      onChange({ relationship: 'none' }, true);
      return;
    }

    // Auto-suggest first title/message if current fields are empty or default
    const updates: Partial<CardCustomization> = {
      relationship: relId,
    };

    onChange(updates, true);
  };

  return (
    <div className="space-y-5 text-sm">
      {/* 1. RELATIONSHIP SELECTION */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#24113D] to-[#1A0B2E] border border-[#F2D98B]/30 shadow-lg">
        <label
          htmlFor="relationship-select"
          className="flex items-center gap-1.5 text-xs font-bold text-[#F2D98B] uppercase tracking-wider mb-2"
        >
          <Heart className="w-4 h-4 text-[#F2D98B]" />
          <span>{isHindi ? 'Greeting kiske liye hai?' : 'Who is this greeting for?'}</span>
        </label>

        <div className="relative">
          <select
            id="relationship-select"
            name="relationship"
            aria-label="Select greeting relationship"
            value={currentRelId}
            onChange={(e) => handleRelationshipChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#160826] border border-[#F2D98B]/35 text-[#FAF7F0] focus:outline-none focus:border-[#F2D98B] transition-colors appearance-none cursor-pointer font-medium text-xs sm:text-sm min-h-[44px]"
          >
            <option value="none">
              {isHindi ? '— Relation chunein (Skip) —' : '— Select a relationship (Skip) —'}
            </option>
            {RELATIONSHIPS.map((rel) => {
              if (rel.id === 'none') return null;
              return (
                <option key={rel.id} value={rel.id}>
                  {rel.icon} {isHindi ? rel.labelHi : rel.labelEn}
                  {rel.labelEn !== rel.labelHi ? ` (${isHindi ? rel.labelEn : rel.labelHi})` : ''}
                </option>
              );
            })}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#F2D98B]">
            ▼
          </div>
        </div>

        {/* Custom relation input when "Other" is selected */}
        {currentRelId === 'other' && (
          <div className="mt-3">
            <label htmlFor="custom-relationship-input" className="block text-[11px] font-semibold text-[#FAF7F0]/80 mb-1">
              {isHindi ? 'Apna relation likhein' : 'Custom Relationship'}
            </label>
            <input
              id="custom-relationship-input"
              name="customRelationship"
              type="text"
              value={customization.customRelationship || ''}
              onChange={(e) => onChange({ customRelationship: e.target.value })}
              placeholder={isHindi ? 'Relationship likhein (jaise Mentor, Padosi)' : 'Enter relationship (e.g. Mentor, Neighbor)'}
              className="w-full px-3 py-2 rounded-xl bg-[#120520] border border-[#F2D98B]/30 text-[#FAF7F0] placeholder-[#FAF7F0]/40 text-xs focus:outline-none focus:border-[#F2D98B] min-h-[40px]"
              maxLength={30}
            />
          </div>
        )}

        {/* Dynamic Content Suggestions for Selected Relationship */}
        {selectedRel && selectedRel.id !== 'none' && (
          <div className="mt-3 pt-3 border-t border-[#F2D98B]/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#F2D98B] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#F2D98B]" />
                {isHindi ? `${selectedRel.labelHi} ke liye suggestions:` : `Quick Suggestions for ${selectedRel.labelEn}:`}
              </span>
              <span className="text-[10px] text-[#FAF7F0]/60">
                {isHindi ? '1-Click me lagayein' : 'Click to apply'}
              </span>
            </div>

            {/* Suggested Titles */}
            {selectedRel.suggestedTitles && selectedRel.suggestedTitles.length > 0 && (
              <div>
                <span className="text-[10px] font-semibold text-[#FAF7F0]/70 block mb-1">
                  {isHindi ? 'Suggested Titles:' : 'Suggested Titles:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRel.suggestedTitles.map((st, sIdx) => {
                    const titleText = isHindi ? st.hi : st.en;
                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => onChange({ title: titleText }, true)}
                        className="px-2.5 py-1 rounded-lg bg-[#2E144E] hover:bg-[#F2D98B] hover:text-[#24113D] border border-[#F2D98B]/30 text-[11px] text-[#FAF7F0] font-medium transition-colors text-left"
                      >
                        {titleText}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Suggested Messages */}
            {selectedRel.suggestedMessages && selectedRel.suggestedMessages.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-[#FAF7F0]/70 block">
                  {isHindi ? 'Suggested Messages:' : 'Suggested Messages:'}
                </span>
                {selectedRel.suggestedMessages.map((sm, mIdx) => {
                  const title = isHindi ? sm.titleHi : sm.titleEn;
                  const text = isHindi ? sm.textHi : sm.textEn;
                  return (
                    <div
                      key={mIdx}
                      className="p-2.5 rounded-xl bg-[#1A0B2E]/90 border border-[#F2D98B]/20 flex items-start justify-between gap-2 hover:border-[#F2D98B]/40 transition-colors"
                    >
                      <div className="flex-1 pr-1">
                        <div className="text-[11px] font-bold text-[#F2D98B]">{title}</div>
                        <p className="text-[11px] text-[#FAF7F0]/85 line-clamp-2 mt-0.5 leading-relaxed">
                          {text}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onChange({ title, message: text }, true)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#F2D98B] text-[#24113D] font-bold text-[10px] hover:bg-[#FFE082] transition-transform active:scale-95 shadow-sm whitespace-nowrap flex-shrink-0"
                      >
                        {isHindi ? 'Yeh use karein' : 'Use this'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 500 Wishes Library Inserter Button */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#2A1147] to-[#1C0B30] border border-[#F2D98B]/35 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F2D98B]/15 border border-[#F2D98B]/30 flex items-center justify-center text-[#F2D98B] flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#F2D98B] block">
                {isHindi ? '५०० पावन संदेश संग्रह' : '500 Curated Festive Wishes'}
              </span>
              <span className="text-[10px] text-[#FAF7F0]/70 block">
                {isHindi ? 'परिवार, मित्र, प्रेम, पारंपरिक व अन्य' : 'Family, Friends, Romantic, Traditional & more'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsWishModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-[#F2D98B] text-[#24113D] font-bold text-xs hover:bg-[#FFE082] transition-transform active:scale-95 shadow-md flex-shrink-0 min-h-[38px] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHindi ? 'खोजें' : 'Browse'}</span>
          </button>
        </div>
      </div>

      {/* Recipient Field: Their Name / Unka Naam */}
      <div>
        <label htmlFor="recipient-input" className="block text-xs font-semibold text-[#FAF7F0]/80 mb-1.5">
          {isHindi ? 'Unka Naam' : 'Their Name'}
        </label>
        <div className="relative">
          <input
            id="recipient-input"
            name="recipient"
            type="text"
            value={customization.recipient}
            onChange={(e) => onChange({ recipient: e.target.value })}
            placeholder={isHindi ? 'Naam likhein' : 'Enter their name'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E2E] border border-[#F2D98B]/25 text-[#FAF7F0] placeholder-[#FAF7F0]/40 focus:outline-none focus:border-[#F2D98B] transition-colors min-h-[44px]"
            maxLength={40}
          />
        </div>
      </div>

      {/* Greeting Title: Greeting ka Title / Greeting Title */}
      <div>
        <label htmlFor="title-input" className="block text-xs font-semibold text-[#FAF7F0]/80 mb-1.5">
          {isHindi ? 'Greeting ka Title' : 'Greeting Title'}
        </label>
        <input
          id="title-input"
          name="title"
          type="text"
          value={customization.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder={isHindi ? 'Chhota sa title likhein' : 'Write a short title'}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E2E] border border-[#F2D98B]/25 text-[#FAF7F0] placeholder-[#FAF7F0]/40 focus:outline-none focus:border-[#F2D98B] transition-colors font-medium min-h-[44px]"
          maxLength={35}
        />
      </div>

      {/* Subtitle: Chhoti Line / Shloka / Tagline / Short Line */}
      <div>
        <label htmlFor="subtitle-input" className="block text-xs font-semibold text-[#FAF7F0]/80 mb-1.5">
          {isHindi ? 'Chhoti Line / Shloka' : 'Tagline / Short Line'}
        </label>
        <input
          id="subtitle-input"
          name="subtitle"
          type="text"
          value={customization.subtitle}
          onChange={(e) => onChange({ subtitle: e.target.value })}
          placeholder={isHindi ? 'Chhoti festive line' : 'Short festive line'}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E2E] border border-[#F2D98B]/25 text-[#FAF7F0] placeholder-[#FAF7F0]/40 focus:outline-none focus:border-[#F2D98B] transition-colors min-h-[44px]"
          maxLength={50}
        />
      </div>

      {/* Greeting Message Body: Aapka Message / Your Message */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="message-textarea" className="block text-xs font-semibold text-[#FAF7F0]/80">
            {isHindi ? 'Aapka Message' : 'Your Message'}
          </label>
          <span className="text-[10px] text-[#FAF7F0]/60">
            {customization.message.length}/240
          </span>
        </div>
        <textarea
          id="message-textarea"
          name="message"
          rows={3}
          value={customization.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder={isHindi ? 'Apna message likhein' : 'Write your message here'}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E2E] border border-[#F2D98B]/25 text-[#FAF7F0] placeholder-[#FAF7F0]/40 focus:outline-none focus:border-[#F2D98B] transition-colors resize-none text-xs leading-relaxed"
          maxLength={240}
        />
      </div>

      {/* Sender Name: Aapka Naam / Your Name */}
      <div>
        <label htmlFor="sender-input" className="block text-xs font-semibold text-[#FAF7F0]/80 mb-1.5">
          {isHindi ? 'Aapka Naam' : 'Your Name'}
        </label>
        <input
          id="sender-input"
          name="sender"
          type="text"
          value={customization.sender}
          onChange={(e) => onChange({ sender: e.target.value })}
          placeholder={isHindi ? 'Apna naam likhein' : 'Enter your name'}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E2E] border border-[#F2D98B]/25 text-[#FAF7F0] placeholder-[#FAF7F0]/40 focus:outline-none focus:border-[#F2D98B] transition-colors min-h-[44px]"
          maxLength={45}
        />
      </div>

      {/* Font & Alignment Styling */}
      <div className="pt-3 border-t border-[#F2D98B]/15 space-y-4">
        {/* Text Style */}
        <div>
          <label className="block text-xs font-semibold text-[#F2D98B] mb-2">
            {isHindi ? 'Text ka Style' : 'Text Style'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Cinzel', label: 'Cinzel (Royal)' },
              { id: 'Playfair Display', label: 'Playfair (Serif)' },
              { id: 'Plus Jakarta Sans', label: 'Jakarta (Sans)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ fontFamily: f.id }, true)}
                className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-all min-h-[44px] ${
                  customization.fontFamily === f.id
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold'
                    : 'bg-[#1A0E2E] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Size */}
        <div>
          <label className="block text-xs font-semibold text-[#F2D98B] mb-2">
            {isHindi ? 'Text ka Size' : 'Text Size'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'small', labelEn: 'Compact', labelHi: 'Chhota', titleScale: 0.85, bodyScale: 0.88 },
              { id: 'normal', labelEn: 'Standard', labelHi: 'Medium', titleScale: 1.0, bodyScale: 1.0 },
              { id: 'large', labelEn: 'Prominent', labelHi: 'Bada', titleScale: 1.18, bodyScale: 1.15 },
            ].map((s) => {
              const isActive = (customization.titleFontSize && customization.titleFontSize > 55 && s.id === 'large') ||
                               (!customization.titleFontSize && s.id === 'normal') ||
                               (customization.titleFontSize && customization.titleFontSize < 45 && s.id === 'small') ||
                               (customization.titleFontSize && customization.titleFontSize >= 45 && customization.titleFontSize <= 55 && s.id === 'normal');

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    const baseTitle = 48;
                    const baseBody = 24;
                    onChange({
                      titleFontSize: Math.round(baseTitle * s.titleScale),
                      bodyFontSize: Math.round(baseBody * s.bodyScale),
                    }, true);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-all min-h-[40px] ${
                    isActive
                      ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold'
                      : 'bg-[#1A0E2E] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/50'
                  }`}
                >
                  {isHindi ? s.labelHi : s.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Position & Text Shadow */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#FAF7F0]/80 mb-1.5">
              {isHindi ? 'Text ki Position' : 'Text Position'}
            </label>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#1A0E2E] border border-[#F2D98B]/20">
              {[
                { align: 'left' as const, icon: <AlignLeft className="w-4 h-4" /> },
                { align: 'center' as const, icon: <AlignCenter className="w-4 h-4" /> },
                { align: 'right' as const, icon: <AlignRight className="w-4 h-4" /> },
              ].map(({ align, icon }) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => onChange({ textAlign: align }, true)}
                  className={`p-2 rounded-md transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
                    customization.textAlign === align
                      ? 'bg-[#F2D98B] text-[#24113D]'
                      : 'text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#FAF7F0]/80 mb-1.5">
              {isHindi ? 'Text Shadow' : 'Text Shadow'}
            </label>
            <button
              type="button"
              onClick={() => onChange({ hasTextShadow: !customization.hasTextShadow }, true)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors min-h-[44px] ${
                customization.hasTextShadow
                  ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B]'
                  : 'bg-[#1A0E2E] text-[#FAF7F0]/70 border-[#F2D98B]/20'
              }`}
            >
              {customization.hasTextShadow ? (isHindi ? 'Chalu' : 'Enabled') : (isHindi ? 'Band' : 'Disabled')}
            </button>
          </div>
        </div>

        {/* Text Color Swatches: Text ka Color / Text Color */}
        <div>
          <label className="block text-xs font-semibold text-[#FAF7F0]/80 mb-2">
            {isHindi ? 'Text ka Color' : 'Text Color'}
          </label>
          <div className="flex items-center gap-2.5 flex-wrap">
            {COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                title={swatch.name}
                onClick={() => onChange({ textColor: swatch.hex }, true)}
                className={`w-8 h-8 rounded-full border-2 transition-transform min-w-[36px] min-h-[36px] ${
                  customization.textColor === swatch.hex
                    ? 'scale-110 border-white shadow-lg ring-2 ring-[#F2D98B]'
                    : 'border-white/30 hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.hex }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 500 Wishes Modal */}
      <PhotoWishSelectorModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        onSelectWish={(wish) => {
          onChange({
            title: wish.title,
            message: wish.message,
          }, true);
        }}
        isHindi={isHindi}
      />
    </div>
  );
};
