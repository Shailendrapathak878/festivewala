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

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check whether a valid language preference is already saved
  const [hasValidPreference, setHasValidPreference] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      return saved === 'en' || saved === 'hi' || saved === 'hinglish';
    } catch {
      return false;
    }
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved === 'hi') return 'hi';
      if (saved === 'hinglish') return 'hinglish';
      return 'en';
    } catch {
      return 'en';
    }
  });

  // Modal displays if first visit and no valid preference saved yet
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(!hasValidPreference);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem(LEGACY_STORAGE_KEY, lang);
      setHasValidPreference(true);
    } catch {
      // LocalStorage unavailable in private mode
    }
  };

  const confirmInitialLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setShowLanguageModal(false);
  };

  const toggleLanguage = () => {
    if (language === 'en') setLanguage('hi');
    else if (language === 'hi') setLanguage('hinglish');
    else setLanguage('en');
  };

  useEffect(() => {
    // Set appropriate document language attribute
    if (language === 'hi') {
      document.documentElement.lang = 'hi';
      document.body.classList.add('font-devanagari');
    } else if (language === 'hinglish') {
      // Use en-IN for Hinglish (Latin script Indian English/Hindi blend)
      document.documentElement.lang = 'en-IN';
      document.body.classList.remove('font-devanagari');
    } else {
      document.documentElement.lang = 'en';
      document.body.classList.remove('font-devanagari');
    }
  }, [language]);

  /**
   * Helper function to return the correct localized string/value.
   * If language is 'hi', returns hiVal.
   * If language is 'hinglish', returns hinglishVal || hiVal || enVal.
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
    showLanguageModal,
    setShowLanguageModal,
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
