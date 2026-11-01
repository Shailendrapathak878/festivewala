import React from 'react';
import type { OutputFormat } from '../types/template';
import { FORMAT_DIMENSIONS } from '../types/template';
import { Smartphone, Square, Image, Monitor } from 'lucide-react';

interface FormatSelectorProps {
  currentFormat: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
  isHindi: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  currentFormat,
  onFormatChange,
  isHindi,
}) => {
  const formats: { id: OutputFormat; icon: React.ReactNode }[] = [
    { id: 'square', icon: <Square className="w-4 h-4" /> },
    { id: 'story', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'portrait', icon: <Image className="w-4 h-4" /> },
    { id: 'landscape', icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#24113D]/90 border border-[#F2D98B]/20 backdrop-blur-md overflow-x-auto no-scrollbar">
      {formats.map(({ id, icon }) => {
        const info = FORMAT_DIMENSIONS[id];
        const isActive = currentFormat === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onFormatChange(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 min-h-[44px] ${
              isActive
                ? 'bg-[#F2D98B] text-[#24113D] shadow-md shadow-[#F2D98B]/20'
                : 'text-[#FAF7F0]/80 hover:text-[#FAF7F0] hover:bg-white/5'
            }`}
          >
            {icon}
            <span>{isHindi ? info.labelHi : info.label}</span>
          </button>
        );
      })}
    </div>
  );
};

