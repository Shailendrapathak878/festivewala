import React from 'react';
import { FESTIVALS_LIST } from '../data/templates';
import { Sparkles, Calendar } from 'lucide-react';

interface FestivalSelectorProps {
  selectedFestivalId: string;
  onSelectFestival: (festivalId: string) => void;
  isHindi: boolean;
}

export const FestivalSelector: React.FC<FestivalSelectorProps> = ({
  selectedFestivalId,
  onSelectFestival,
  isHindi,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 max-w-full">
      {FESTIVALS_LIST.map((fest) => {
        const isSelected = selectedFestivalId === fest.id;
        const isAvailable = fest.status === 'available';

        return (
          <button
            key={fest.id}
            type="button"
            disabled={!isAvailable}
            onClick={() => isAvailable && onSelectFestival(fest.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border min-h-[44px] ${
              isSelected
                ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] shadow-md shadow-[#F2D98B]/20 font-bold'
                : isAvailable
                ? 'bg-[#24113D]/70 text-[#FAF7F0] border-[#F2D98B]/30 hover:border-[#F2D98B]'
                : 'bg-[#160B26]/60 text-[#FAF7F0]/40 border-white/5 cursor-not-allowed opacity-60'
            }`}
          >
            {isAvailable ? (
              <Sparkles className="w-3.5 h-3.5 text-[#F2D98B]" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-white/30" />
            )}
            <span>{isHindi ? fest.nameHi : fest.name}</span>
            {!isAvailable && (
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                {isHindi ? 'शीघ्र' : 'Soon'}
              </span>
            )}
            {isAvailable && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#24113D] text-[#F2D98B] font-bold">
                {fest.templateCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

