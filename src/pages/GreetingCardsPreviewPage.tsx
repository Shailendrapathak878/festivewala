import React from 'react';
import { useParams } from 'react-router-dom';
import { GreetingStudio } from '../features/greeting-studio/components/GreetingStudio';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';

interface GreetingCardsPreviewPageProps {
  defaultMode?: 'simple' | 'photo';
}

export const GreetingCardsPreviewPage: React.FC<GreetingCardsPreviewPageProps> = ({ defaultMode }) => {
  const { festivalId } = useParams<{ festivalId?: string }>();
  const { isHindi } = useLanguage();
  const isDhanteras = festivalId === 'dhanteras';

  const seoTitle = isDhanteras
    ? (isHindi ? 'धनतेरस २०२६ ग्रीटिंग कार्ड मेकर — २५ खास डिज़ाइन व फोटो स्टूडियो | फेस्टिववाला' : 'Free Dhanteras 2026 Greeting Card Maker — 25 Designs & Photo Studio | FestiveWala')
    : (isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.title : STATIC_ROUTE_SEO.greetingCards.en.title);

  const seoDesc = isDhanteras
    ? (isHindi ? 'धनतेरस के लिए २५ शाही ग्रीटिंग कार्ड और १० फोटो फ्रेम्स बनाएं। नाम जोड़ें, कस्टमाइज करें और एचडी पीएनजी डाउनलोड करें।' : 'Design 25 exclusive Dhanteras greeting cards & 10 personalized photo frames. Add your name, customize wishes, and download in full 1080p+ HD PNG.')
    : (isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.description : STATIC_ROUTE_SEO.greetingCards.en.description);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={isDhanteras ? 'Dhanteras greeting card, Dhanteras photo frame, Shubh Dhanteras maker, free Dhanteras wishes card' : (isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.keywords : STATIC_ROUTE_SEO.greetingCards.en.keywords)}
        canonicalUrl={isDhanteras ? 'https://festivewala.in/greetings/dhanteras' : 'https://festivewala.in/greeting-cards'}
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />
      <GreetingStudio defaultFestivalId={festivalId} defaultGreetingMode={defaultMode} />
    </>
  );
};

export default GreetingCardsPreviewPage;
