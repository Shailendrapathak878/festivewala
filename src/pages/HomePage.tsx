import React from 'react';
import { HomeHeroSection } from '../components/home/HomeHeroSection';
import { TodaysInspirationSection } from '../components/home/TodaysInspirationSection';
import { CreateSomethingBeautifulSection } from '../components/home/CreateSomethingBeautifulSection';
import { WishesMessagesSection } from '../components/home/WishesMessagesSection';
import { UpcomingCelebrationsSection } from '../components/home/UpcomingCelebrationsSection';
import { PopularTemplatesSection } from '../components/home/PopularTemplatesSection';
import { ExploreInspirationSection } from '../components/home/ExploreInspirationSection';
import { FinalCtaSection } from '../components/layout/FinalCtaSection';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';

export const HomePage: React.FC = () => {
  const { isHindi, isHinglish } = useLanguage();
  const seoConfig = isHindi ? STATIC_ROUTE_SEO.home.hi : STATIC_ROUTE_SEO.home.en;
  const activeSchemaLang: 'en' | 'hi' | 'hi-Latn' = isHindi ? 'hi' : isHinglish ? 'hi-Latn' : 'en';

  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://festivewala.in/#webpage',
    url: seoConfig.canonicalUrl,
    name: seoConfig.title,
    description: seoConfig.description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://festivewala.in/#website',
      name: 'FestiveWala',
      url: 'https://festivewala.in/',
    },
    inLanguage: activeSchemaLang,
  };

  return (
    <div className="w-full">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        jsonLd={homePageSchema}
        lang={activeSchemaLang}
      />

      {/* 1. Hero Section: "Celebrate Every Moment, Create Something Beautiful." */}
      <HomeHeroSection />

      {/* 2. Today's Inspiration: Quote of the Day & Thought of the Day */}
      <TodaysInspirationSection />

      {/* 3. Create Something Beautiful: 4 Creation Features */}
      <CreateSomethingBeautifulSection />

      {/* 4. Wishes & Messages: 6 Categories with 1-Click Copy & Share */}
      <WishesMessagesSection />

      {/* 5. Upcoming Celebrations: Dynamic Priority Festivals Engine */}
      <UpcomingCelebrationsSection />

      {/* 6. Popular Templates: Curated Greeting Editions & Create Action */}
      <PopularTemplatesSection />

      {/* 7. Explore & Get Inspired: 5 Content Categories */}
      <ExploreInspirationSection />

      {/* 8. Final Call to Action: Timeless Celebrations */}
      <FinalCtaSection />
    </div>
  );
};
