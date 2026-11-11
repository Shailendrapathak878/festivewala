import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage, TranslationDictionary } from './types';
import { enTranslations } from './translations/en';
import { hiTranslations } from './translations/hi';
import { hinglishTranslations } from './translations/hinglish';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
  isHindi: boolean;
  isHinglish: boolean;
  isEnglish: boolean;
  showLanguageBanner: boolean;
  dismissLanguageBanner: () => void;
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  confirmInitialLanguage: (lang: SupportedLanguage) => void;
  loc: <T>(enVal: T, hiVal: T, hinglishVal?: T) => T;
}

const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: enTranslations,
  hi: hiTranslations,
  hinglish: hinglishTranslations,
};

const STORAGE_KEY = 'festivewala_language';
const LEGACY_STORAGE_KEY = 'festivewala_lang';
const BANNER_DISMISSED_KEY = 'festivewala_language_banner_dismissed';

const isBrowser = (): boolean => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check whether a valid language preference is already saved
  const [hasValidPreference, setHasValidPreference] = useState<boolean>(() => {
    if (!isBrowser()) return false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      return saved === 'en' || saved === 'hi' || saved === 'hinglish';
    } catch {
      return false;
    }
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (!isBrowser()) return 'en';
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved === 'hi') return 'hi';
      if (saved === 'hinglish') return 'hinglish';
      return 'en';
    } catch {
      return 'en';
    }
  });

  // Non-blocking compact inline banner appears on first visit only when neither a language preference
  // nor a banner dismissal has been recorded. Never blocks first-paint content or navigation.
  const [showLanguageBanner, setShowLanguageBanner] = useState<boolean>(() => {
    if (!isBrowser()) return false;
    if (hasValidPreference) return false;
    try {
      return localStorage.getItem(BANNER_DISMISSED_KEY) !== '1';
    } catch {
      return true;
    }
  });

  const dismissLanguageBanner = () => {
    setShowLanguageBanner(false);
    if (!isBrowser()) return;
    try {
      localStorage.setItem(BANNER_DISMISSED_KEY, '1');
    } catch {
      // LocalStorage unavailable in private mode
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    setShowLanguageBanner(false);
    if (!isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem(LEGACY_STORAGE_KEY, lang);
      localStorage.setItem(BANNER_DISMISSED_KEY, '1');
      setHasValidPreference(true);
    } catch {
      // LocalStorage unavailable in private mode
    }
  };

  const confirmInitialLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  const toggleLanguage = () => {
    if (language === 'en') setLanguage('hi');
    else if (language === 'hi') setLanguage('hinglish');
    else setLanguage('en');
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    // Set appropriate document language attribute
    if (language === 'hi') {
      document.documentElement.lang = 'hi';
      document.body.classList.add('font-devanagari');
    } else if (language === 'hinglish') {
      // Use hi-Latn (BCP-47 Hindi in Latin script) matching SEOHead and JSON-LD inLanguage
      document.documentElement.lang = 'hi-Latn';
      document.body.classList.remove('font-devanagari');
    } else {
      document.documentElement.lang = 'en';
      document.body.classList.remove('font-devanagari');
    }
  }, [language]);

  /**
   * Helper function to return the correct localized string/value.
   * If language is 'hi', returns hiVal.
   * If language is 'hinglish', returns hinglishVal || enVal.
   * If language is 'en', returns enVal.
   */
  const loc = <T,>(enVal: T, hiVal: T, hinglishVal?: T): T => {
    if (language === 'hi') return hiVal;
    if (language === 'hinglish') return hinglishVal !== undefined ? hinglishVal : enVal;
    return enVal;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
    isHindi: language === 'hi',
    isHinglish: language === 'hinglish',
    isEnglish: language === 'en',
    showLanguageBanner,
    dismissLanguageBanner,
    showLanguageModal: false,
    setShowLanguageModal: (show: boolean) => {
      if (!show) dismissLanguageBanner();
      else setShowLanguageBanner(true);
    },
    confirmInitialLanguage,
    loc,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
