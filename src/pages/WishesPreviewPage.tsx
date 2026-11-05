import React from 'react';
import { useParams } from 'react-router-dom';
import { WishesShowcase } from '../components/layout/WishesShowcase';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';

export const WishesPreviewPage: React.FC = () => {
  const { festivalId } = useParams<{ festivalId?: string }>();
  const { isHindi } = useLanguage();
  const isDhanteras = festivalId === 'dhanteras';
  const isDiwali = festivalId === 'diwali';

  let seoTitle = isHindi ? STATIC_ROUTE_SEO.wishes.hi.title : STATIC_ROUTE_SEO.wishes.en.title;
  let seoDesc = isHindi ? STATIC_ROUTE_SEO.wishes.hi.description : STATIC_ROUTE_SEO.wishes.en.description;
  let keywords = isHindi ? STATIC_ROUTE_SEO.wishes.hi.keywords : STATIC_ROUTE_SEO.wishes.en.keywords;
  const canonicalUrl = festivalId ? `https://festivewala.in/wishes/${festivalId}` : 'https://festivewala.in/wishes';

  if (isDhanteras) {
    seoTitle = isHindi
      ? 'धनतेरस २०२६ की १०० सर्वश्रेष्ठ शुभकामनाएं, बधाई संदेश व कोट्स | फेस्टिववाला'
      : '100 Best Dhanteras 2026 Wishes, Quotes & Greetings in English & Hindi | FestiveWala';
    seoDesc = isHindi
      ? 'परिवार, मित्रों, व्यापार व सोशल मीडिया के लिए १०० मौलिक धनतेरस शुभकामनाएं। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत कॉपी व शेयर करें।'
      : 'Curated collection of 100 Dhanteras wishes across 9 categories: family, friends, health, wealth, traditional, corporate & captions. Free one-click copy & share.';
    keywords = 'Dhanteras wishes 2026, Shubh Dhanteras quotes, Dhanteras greetings Hindi English, Dhanvantari wishes';
  } else if (isDiwali) {
    seoTitle = isHindi
      ? 'दीपावली २०२६ की सर्वश्रेष्ठ शुभकामनाएं, बधाई संदेश व शायरी | फेस्टिववाला'
      : 'Diwali 2026 Best Wishes, Quotes, Status & Greetings in Hindi & English | FestiveWala';
    seoDesc = isHindi
      ? 'दीपावली पर्व पर अपनों को भेजें मंगलमय शुभकामनाएं। परिवार, मित्रों व व्यावसायिक संपर्कों के लिए तैयार सुंदर संदेश, एक क्लिक में कॉपी व शेयर करें।'
      : 'Curated Diwali wishes, shayari, and status messages for family, friends, and business associates. Free one-click copy and instant WhatsApp sharing.';
    keywords = 'Diwali wishes 2026, Deepavali greetings in Hindi, Diwali quotes English, Shubh Deepavali shayari, WhatsApp festival status';
  }

  return (
    <div className="pt-4 pb-12">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />
      <WishesShowcase routeFestivalId={festivalId} />
    </div>
  );
};

export default WishesPreviewPage;
