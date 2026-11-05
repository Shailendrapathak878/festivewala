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
  const isDiwali = festivalId === 'diwali';
  const isPhotoMode = defaultMode === 'photo';

  let seoTitle = isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.title : STATIC_ROUTE_SEO.greetingCards.en.title;
  let seoDesc = isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.description : STATIC_ROUTE_SEO.greetingCards.en.description;
  let keywords = isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.keywords : STATIC_ROUTE_SEO.greetingCards.en.keywords;

  let canonicalUrl = 'https://festivewala.in/greeting-cards';
  if (festivalId) {
    if (isPhotoMode) {
      canonicalUrl = `https://festivewala.in/photo-greetings/${festivalId}`;
    } else {
      canonicalUrl = `https://festivewala.in/greetings/${festivalId}`;
    }
  }

  if (isDhanteras) {
    seoTitle = isPhotoMode
      ? (isHindi ? 'धनतेरस २०२६ फोटो ग्रीटिंग कार्ड मेकर — फोटो फ्रेम व नाम जोड़ें | फेस्टिववाला' : 'Free Dhanteras 2026 Photo Greeting Card Maker — Photo Frame & Name | FestiveWala')
      : (isHindi ? 'धनतेरस २०२६ ग्रीटिंग कार्ड मेकर — २५ खास डिज़ाइन व फोटो स्टूडियो | फेस्टिववाला' : 'Free Dhanteras 2026 Greeting Card Maker — 25 Designs & Photo Studio | FestiveWala');
    seoDesc = isHindi
      ? 'धनतेरस के लिए २५ शाही ग्रीटिंग कार्ड और १० फोटो फ्रेम्स बनाएं। नाम जोड़ें, कस्टमाइज करें और एचडी पीएनजी डाउनलोड करें।'
      : 'Design 25 exclusive Dhanteras greeting cards & 10 personalized photo frames. Add your name, customize wishes, and download in full 1080p+ HD PNG.';
    keywords = 'Dhanteras greeting card, Dhanteras photo frame, Shubh Dhanteras maker, free Dhanteras wishes card';
  } else if (isDiwali) {
    seoTitle = isPhotoMode
      ? (isHindi ? 'दीपावली २०२६ फोटो ग्रीटिंग कार्ड मेकर — अपनी तस्वीर जोड़ें | फेस्टिववाला' : 'Free Diwali 2026 Photo Greeting Card Maker — Add Your Photo | FestiveWala')
      : (isHindi ? 'दीपावली २०२६ ग्रीटिंग कार्ड्स — १००+ शाही डिज़ाइन्स व मुफ्त डाउनलोड | फेस्टिववाला' : 'Free Diwali 2026 Greeting Card Maker — 100+ Luxury Designs | FestiveWala');
    seoDesc = isHindi
      ? 'दीपावली के लिए अपनी व परिवार की तस्वीर के साथ खूबसूरत ग्रीटिंग कार्ड बनाएं। १००% सुरक्षित क्लाइंट-साइड निर्माण, तुरंत मुफ्त डाउनलोड।'
      : 'Create customized Diwali greeting cards with your photos and name. 100% private, client-side rendering with instant high-resolution PNG download.';
    keywords = 'Diwali greeting card maker, Diwali photo wishes, Deepavali customized card, free festive card download';
  }

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />
      <GreetingStudio defaultFestivalId={festivalId} defaultGreetingMode={defaultMode} />
    </>
  );
};

export default GreetingCardsPreviewPage;
