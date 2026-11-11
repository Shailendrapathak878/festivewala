import React from 'react';
import { Globe, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { SupportedLanguage } from '../../i18n/types';

const LANGUAGE_OPTIONS: ReadonlyArray<{
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
}> = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'hinglish', label: 'Hinglish', nativeLabel: 'Hinglish' },
];

/**
 * Compact, non-blocking inline language preference banner displayed directly below
 * the site header on a visitor's first visit before any language preference or dismissal
 * is stored. Main page content, links, and navigation remain immediately accessible.
 */
export const FirstVisitLanguageBanner: React.FC = () => {
  const {
    showLanguageBanner,
    confirmInitialLanguage,
    dismissLanguageBanner,
    language,
    loc,
  } = useLanguage();

  if (!showLanguageBanner) {
    return null;
  }

  return (
    <section
      role="region"
      aria-label={loc(
        'Language preference banner',
        'भाषा चयन पट्टी',
        'Language preference banner'
      )}
      data-testid="first-visit-language-banner"
      className="w-full bg-gradient-to-r from-[#2D1446] via-[#3A1B59] to-[#2D1446] border-b border-brand-gold/30 text-brand-ivory shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <Globe className="w-4 h-4 text-brand-gold flex-shrink-0" aria-hidden="true" />
          <p className="text-xs sm:text-sm font-medium text-brand-ivory/95 truncate sm:whitespace-normal">
            {loc(
              'Celebrate in your preferred language:',
              'अपनी पसंदीदा भाषा चुनें:',
              'Apni pasandida language chunein:'
            )}
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <div
            role="group"
            aria-label={loc('Choose language', 'भाषा चुनें', 'Language chunein')}
            className="flex items-center gap-1.5"
          >
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => confirmInitialLanguage(opt.code)}
                  aria-pressed={isSelected}
                  data-testid={`language-banner-option-${opt.code}`}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer ${
                    isSelected
                      ? 'bg-brand-gold text-[#241134] shadow-sm'
                      : 'bg-white/10 text-brand-ivory hover:bg-white/20 border border-white/15'
                  }`}
                >
                  {opt.nativeLabel}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={dismissLanguageBanner}
            aria-label={loc(
              'Dismiss language banner',
              'भाषा पट्टी बंद करें',
              'Language banner band karein'
            )}
            data-testid="language-banner-dismiss"
            className="p-1.5 rounded-full text-brand-ivory/80 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Backwards-compatible named export for existing imports
export const FirstVisitLanguageModal = FirstVisitLanguageBanner;
