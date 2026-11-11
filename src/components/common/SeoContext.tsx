import React, { createContext, useContext } from 'react';
import type { MetaTagsConfig } from '../../data/seo/types';

export interface CollectedSeoData extends MetaTagsConfig {
  lang?: 'en' | 'hi' | 'hi-Latn' | 'hinglish';
  noindex?: boolean;
}

type SeoCollector = (data: CollectedSeoData) => void;

const SeoContext = createContext<SeoCollector | null>(null);

export const SeoProvider: React.FC<{
  onCollect: SeoCollector;
  children: React.ReactNode;
}> = ({ onCollect, children }) => {
  return <SeoContext.Provider value={onCollect}>{children}</SeoContext.Provider>;
};

export const useSeoCollector = (): SeoCollector | null => useContext(SeoContext);

