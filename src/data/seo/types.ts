export type SearchIntent = 'Informational' | 'Inspirational' | 'Commercial' | 'Navigational';

export type LanguageFormat = 'English' | 'Hindi' | 'Hinglish';

export type KeywordPriority = 'Primary' | 'Secondary';

export type ContentStatus = 'Live & Verified' | 'Optimized' | 'Planned';

export interface KeywordItem {
  id: string;
  keyword: string;
  language: LanguageFormat;
  searchIntent: SearchIntent;
  relatedFestival: string;
  targetUrl: string;
  priority: KeywordPriority;
  contentStatus: ContentStatus;
  searchConsolePerformance?: {
    impressions: number | null;
    clicks: number | null;
    ctr: number | null;
    avgPosition: number | null;
    status: 'pending_verification' | 'active_monitoring';
  };
}

export interface MetaTagsConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface TrilingualFAQItem {
  id: string;
  questionEn: string;
  questionHi: string;
  questionHinglish: string;
  answerEn: string;
  answerHi: string;
  answerHinglish: string;
  category?: 'timing' | 'rituals' | 'decoration' | 'food' | 'gifting' | 'general';
}

