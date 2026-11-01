export type SupportedLanguage = 'en' | 'hi' | 'hinglish';

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  languageSelection: {
    welcome: string;
    subtitle: string;
    optionEnTitle: string;
    optionEnSubtitle: string;
    optionHiTitle: string;
    optionHiSubtitle: string;
    optionHinglishTitle: string;
    optionHinglishSubtitle: string;
    continueBtn: string;
  };
  announcement: {
    badge: string;
    text: string;
    actionText: string;
  };
  nav: {
    home: string;
    festivals: string;
    rangoli: string;
    decorations: string;
    gifts: string;
    guides: string;
    greetingCards: string;
    wishes: string;
    inspiration: string;
    createGreeting: string;
    menuOpen: string;
    menuClose: string;
    switchLanguage: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustPillar1: string;
    trustPillar2: string;
    trustPillar3: string;
  };
  festivalFeature: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    cta: string;
    dateBadge: string;
  };
  templatePreview: {
    badge: string;
    title: string;
    subtitle: string;
    cardCategory: string;
    cardTitle: string;
    cardGreeting: string;
    personalizedFor: string;
    senderSample: string;
    cta: string;
    goldFoilTag: string;
  };
  editorial: {
    badge: string;
    title: string;
    subtitle: string;
    quote: string;
    quoteAuthor: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  footer: {
    aboutTitle: string;
    aboutDesc: string;
    festivalsTitle: string;
    festivalsList: string[];
    creationsTitle: string;
    creationsList: string[];
    heritageTitle: string;
    heritageList: string[];
    tagline: string;
    copyright: string;
    backToTop: string;
  };
  common: {
    loading: string;
    pageNotFound: string;
    pageNotFoundDesc: string;
    backHome: string;
    previewOnly: string;
    phase1Notice: string;
  };
}

