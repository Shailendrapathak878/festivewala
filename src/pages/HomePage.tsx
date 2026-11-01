import React from 'react';
import { HeroSection } from '../components/layout/HeroSection';
import { QuickActionSection } from '../components/layout/QuickActionSection';
import { CountdownSection } from '../components/layout/CountdownSection';
import { FestivalDiscoverySection } from '../components/layout/FestivalDiscoverySection';
import { GreetingCardShowcase } from '../components/layout/GreetingCardShowcase';
import { WishesShowcase } from '../components/layout/WishesShowcase';
import { DiscoverMoreSection } from '../components/layout/DiscoverMoreSection';
import { EditorialSection } from '../components/layout/EditorialSection';
import { FinalCtaSection } from '../components/layout/FinalCtaSection';
import { AnimatedSection } from '../components/animation/AnimatedSection';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';

export const HomePage: React.FC = () => {
  const { isHindi } = useLanguage();
  const seoConfig = isHindi ? STATIC_ROUTE_SEO.home.hi : STATIC_ROUTE_SEO.home.en;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FestiveWala',
    alternateName: ['फेस्टिववाला', 'Festive Wala'],
    url: 'https://festivewala.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://festivewala.in/festivals?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="w-full">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        jsonLd={websiteSchema}
        lang={isHindi ? 'hi' : 'en'}
      />

      {/* 1. Hero Section: Animated Festival Showcase Carousel */}
      <HeroSection />

      {/* 2. Quick Actions: "How would you like to celebrate?" (Beginner-Friendly Discovery) */}
      <QuickActionSection />

      {/* 3. Upcoming Festival Countdown Section */}
      <AnimatedSection id="countdown">
        <CountdownSection />
      </AnimatedSection>

      {/* 4. Festival Discovery Section (Pan-Indian Cultural Calendar) */}
      <AnimatedSection id="festivals">
        <FestivalDiscoverySection />
      </AnimatedSection>

      {/* 5. Greeting Card Showcase (Curated Studio Preview) */}
      <AnimatedSection id="greeting-showcase">
        <GreetingCardShowcase />
      </AnimatedSection>

      {/* 6. Wishes & Poetry Showcase (With Working Copy & Share) */}
      <AnimatedSection id="wishes-showcase">
        <WishesShowcase />
      </AnimatedSection>

      {/* 7. Discover More Section (Rangoli, Decor, Gifts, Guides) */}
      <AnimatedSection id="discover-more">
        <DiscoverMoreSection />
      </AnimatedSection>

      {/* 8. Festive Inspiration / Editorial Section */}
      <AnimatedSection id="editorial">
        <EditorialSection />
      </AnimatedSection>

      {/* 9. Final Call-to-Action Section */}
      <AnimatedSection id="final-cta">
        <FinalCtaSection />
      </AnimatedSection>
    </div>
  );
};
