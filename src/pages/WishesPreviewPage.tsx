import React from 'react';
import { WishesShowcase } from '../components/layout/WishesShowcase';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';

export const WishesPreviewPage: React.FC = () => {
  const { isHindi } = useLanguage();
  const seoConfig = isHindi ? STATIC_ROUTE_SEO.wishes.hi : STATIC_ROUTE_SEO.wishes.en;

  return (
    <div className="pt-4 pb-12">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />
      <WishesShowcase />
    </div>
  );
};

export default WishesPreviewPage;
