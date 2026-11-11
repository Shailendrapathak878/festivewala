export interface FestivalFAQ {
  id: string;
  questionEn: string;
  questionHi: string;
  questionHinglish: string;
  answerEn: string;
  answerHi: string;
  answerHinglish: string;
  category: 'timing' | 'rituals' | 'decoration' | 'food' | 'gifting' | 'general';
}

export interface FestivalDetail {
  id: 'diwali' | 'dhanteras' | 'chhath-puja' | 'holi' | 'raksha-bandhan' | 'christmas' | 'new-year';
  nameEn: string;
  nameHi: string;
  regionalAliases?: string[];
  tithiEn: string;
  tithiHi: string;
  taglineEn: string;
  taglineHi: string;
  hinglishTagline?: string;
  accentColor: string;
  secondaryColor: string;
  bgGradient: string;
  heroMotif: 'diwali-diya' | 'dhanteras-kalash' | 'dhanteras-coins' | 'chhath-arghya' | 'holi-colors' | 'rakhi-thread' | 'christmas-tree' | 'newyear-sparkler';
  about: {
    summaryEn: string;
    summaryHi: string;
    culturalSignificanceEn: string;
    culturalSignificanceHi: string;
    historyEn: string;
    historyHi: string;
    keyThemes: Array<{ en: string; hi: string; icon: string }>;
  };
  traditions: Array<{
    id: string;
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
    customs: Array<{ en: string; hi: string }>;
    regionalVariations?: { en: string; hi: string };
    icon: string;
  }>;
  decorations: Array<{
    id: string;
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
    tipEn: string;
    tipHi: string;
    tagEn: string;
    tagHi: string;
  }>;
  recipes: Array<{
    id: string;
    nameEn: string;
    nameHi: string;
    typeEn: string;
    typeHi: string;
    timeEn: string;
    timeHi: string;
    descEn: string;
    descHi: string;
    ingredients: Array<{ en: string; hi: string }>;
    steps: Array<{ en: string; hi: string }>;
  }>;
  gifts: Array<{
    id: string;
    titleEn: string;
    titleHi: string;
    recipientTypeEn: string;
    recipientTypeHi: string;
    descEn: string;
    descHi: string;
    budgetRange: string;
  }>;
  faqs?: FestivalFAQ[];
  greetingsCategoryKey: string;
  relatedRangoliCategories: string[];
  relatedDecorationCategories: string[];
}

