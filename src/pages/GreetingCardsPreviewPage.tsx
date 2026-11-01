import React from 'react';
import { GreetingStudio } from '../features/greeting-studio/components/GreetingStudio';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';

export const GreetingCardsPreviewPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const seoConfig = isHindi ? STATIC_ROUTE_SEO.greetingCards.hi : STATIC_ROUTE_SEO.greetingCards.en;

  return (
    <>
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />
      <GreetingStudio />
    </>
  );
};

export default GreetingCardsPreviewPage;
