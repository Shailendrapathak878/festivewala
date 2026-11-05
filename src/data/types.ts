export interface FestivalItem {
  id: string;
  nameEn: string;
  nameHi: string;
  tithiEn: string;
  tithiHi: string;
  dateIso: string; // ISO format: YYYY-MM-DDTHH:mm:ss+05:30
  descEn: string;
  descHi: string;
  accentColor: string;
  bgGradient: string;
  featured?: boolean;
  significanceEn: string;
  significanceHi: string;
  tagEn: string;
  tagHi: string;
}

export interface GreetingEdition {
  id: string;
  titleEn: string;
  titleHi: string;
  editionEn: string;
  editionHi: string;
  blessingEn: string;
  blessingHi: string;
  categoryEn: string;
  categoryHi: string;
  accentColor: string;
  badgeEn: string;
  badgeHi: string;
  motifType: 'lotus' | 'diya' | 'rangoli' | 'peacock' | 'mandala' | 'festive';
}

export interface WishMessage {
  id: string;
  festivalId: string;
  category:
    | 'family'
    | 'friends'
    | 'love'
    | 'professional'
    | 'funny'
    | 'emotional'
    | 'short'
    | 'traditional'
    | 'captions'
    | 'business'
    | 'sacred'
    | 'health-happiness'
    | 'wealth-prosperity';
  categoryLabelEn: string;
  categoryLabelHi: string;
  categoryLabelHinglish?: string;
  textEn: string;
  textHi: string;
  textHinglish?: string;
  headlineEn?: string;
  headlineHi?: string;
  headlineHinglish?: string;
  shloka?: string;
  meaningEn?: string;
  meaningHi?: string;
  meaningHinglish?: string;
  authorOrSourceEn?: string;
  authorOrSourceHi?: string;
  authorOrSourceHinglish?: string;
  tags?: string[];
  festivalIds?: string[];
  recipientTypes?: string[];
  tone?: string;
  length?: 'short' | 'medium' | 'long';
  dateAdded?: string;
  englishText?: string;
  hindiText?: string;
}

export interface EditorialArticle {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  categoryEn: string;
  categoryHi: string;
  readTimeEn: string;
  readTimeHi: string;
  excerptEn: string;
  excerptHi: string;
  quoteEn?: string;
  quoteHi?: string;
  motif: string;
}

