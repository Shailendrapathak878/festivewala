import React from 'react';
import type { CardCustomization } from '../types/editor';

interface DesignControlsProps {
  customization: CardCustomization;
  onChange: (updates: Partial<CardCustomization>, immediate?: boolean) => void;
  isHindi: boolean;
}

const ACCENT_COLORS = [
  { hex: '#D4AF37', name: 'Metallic Gold' },
  { hex: '#F2D98B', name: 'Champagne Gold' },
  { hex: '#F59E0B', name: 'Saffron Amber' },
  { hex: '#E11D48', name: 'Royal Crimson' },
  { hex: '#059669', name: 'Emerald Jade' },
  { hex: '#EC4899', name: 'Festive Magenta' },
];

const DesignControlsComponent: React.FC<DesignControlsProps> = ({
  customization,
  onChange,
  isHindi,
}) => {
  return (
    <div className="space-y-5 text-sm">
      {/* Background Variant */}
      <div>
        <label className="block text-xs font-semibold text-[#F2D98B] uppercase tracking-wider mb-2">
          {isHindi ? 'Background Theme' : 'Background Theme'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'default' as const, labelEn: 'Royal Gradient', labelHi: 'Royal Gradient' },
            { id: 'dark' as const, labelEn: 'Midnight Velvet', labelHi: 'Dark Velvet' },
            { id: 'minimal' as const, labelEn: 'Warm Ivory', labelHi: 'Warm Ivory' },
            { id: 'vibrant' as const, labelEn: 'Vibrant Festival', labelHi: 'Vibrant Festive' },
          ].map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange({ bgVariant: theme.id }, true)}
              className={`p-2.5 rounded-xl border text-left transition-all min-h-[44px] ${
                customization.bgVariant === theme.id
                  ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold shadow-md'
                  : 'bg-[#1A0E2E] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/50'
              }`}
            >
              <div className="text-xs font-semibold">
                {isHindi ? theme.labelHi : theme.labelEn}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Border Options */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-[#F2D98B] uppercase tracking-wider">
            {isHindi ? 'Border' : 'Card Border'}
          </label>
          <button
            type="button"
            onClick={() => onChange({ showBorder: !customization.showBorder }, true)}
            className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors min-h-[36px] ${
              customization.showBorder
                ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B]'
                : 'bg-[#1A0E2E] text-[#FAF7F0]/70 border-[#F2D98B]/20'
            }`}
          >
            {customization.showBorder ? (isHindi ? 'Chalu' : 'Enabled') : (isHindi ? 'Band' : 'Disabled')}
          </button>
        </div>

        {customization.showBorder && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'royal-filigree' as const, labelEn: 'Royal Filigree', labelHi: 'शाही विन्यास' },
              { id: 'double-gold' as const, labelEn: 'Double Gold Line', labelHi: 'दोहरी स्वर्ण रेखा' },
              { id: 'rangoli-dots' as const, labelEn: 'Rangoli Rice Dots', labelHi: 'रंगोली बिंदी' },
              { id: 'minimal-hairline' as const, labelEn: 'Minimal Hairline', labelHi: 'बारीक सुरुचिपूर्ण' },
              { id: 'festive-toran' as const, labelEn: 'Festive Toran', labelHi: 'मंगल तोरण' },
              { id: 'brushed-brass' as const, labelEn: 'Brushed Brass', labelHi: 'ब्रश्ड पीतल' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onChange({ borderStyle: b.id }, true)}
                className={`p-2 rounded-lg text-xs font-medium border text-left transition-all min-h-[44px] ${
                  customization.borderStyle === b.id
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold'
                    : 'bg-[#1A0E2E] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/50'
                }`}
              >
                {isHindi ? b.labelHi : b.labelEn}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Decorative Ornaments & Sparkles */}
      <div className="pt-3 border-t border-[#F2D98B]/15">
        <label className="block text-xs font-semibold text-[#F2D98B] uppercase tracking-wider mb-2">
          {isHindi ? 'Sajawat (Accents)' : 'Decorative Accents'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChange({ showParticles: !customization.showParticles }, true)}
            className={`p-3 rounded-xl border text-left transition-all min-h-[44px] ${
              customization.showParticles
                ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold'
                : 'bg-[#1A0E2E] text-[#FAF7F0]/80 border-[#F2D98B]/20'
            }`}
          >
            <div className="text-xs font-semibold">
              {isHindi ? 'Sparkles' : 'Starlight Sparkles'}
            </div>
            <div className="text-[10px] opacity-80">
              {customization.showParticles ? (isHindi ? 'Chalu' : 'Active') : (isHindi ? 'Band' : 'Hidden')}
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ showOrnaments: !customization.showOrnaments }, true)}
            className={`p-3 rounded-xl border text-left transition-all min-h-[44px] ${
              customization.showOrnaments
                ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold'
                : 'bg-[#1A0E2E] text-[#FAF7F0]/80 border-[#F2D98B]/20'
            }`}
          >
            <div className="text-xs font-semibold">
              {isHindi ? 'Corner Designs' : 'Corner Flourishes'}
            </div>
            <div className="text-[10px] opacity-80">
              {customization.showOrnaments ? (isHindi ? 'Chalu' : 'Active') : (isHindi ? 'Band' : 'Hidden')}
            </div>
          </button>
        </div>
      </div>

      {/* Metallic Accent Color */}
      <div className="pt-3 border-t border-[#F2D98B]/15">
        <label className="block text-xs font-semibold text-[#FAF7F0]/80 mb-2">
          {isHindi ? 'Highlight Color' : 'Metallic Highlight Color'}
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          {ACCENT_COLORS.map((col) => (
            <button
              key={col.hex}
              type="button"
              title={col.name}
              onClick={() => onChange({ accentColor: col.hex }, true)}
              className={`w-9 h-9 rounded-full border-2 transition-transform min-w-[40px] min-h-[40px] ${
                customization.accentColor === col.hex
                  ? 'scale-110 border-white ring-2 ring-[#F2D98B]'
                  : 'border-white/30 hover:scale-105'
              }`}
              style={{ backgroundColor: col.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const DesignControls = React.memo(DesignControlsComponent);
