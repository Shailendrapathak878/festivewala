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

  const seoTitle = isDhanteras
    ? (isHindi ? 'धनतेरस २०२६ की १०० सर्वश्रेष्ठ शुभकामनाएं, बधाई संदेश व कोट्स | फेस्टिववाला' : '100 Best Dhanteras 2026 Wishes, Quotes & Greetings in English & Hindi | FestiveWala')
    : (isHindi ? STATIC_ROUTE_SEO.wishes.hi.title : STATIC_ROUTE_SEO.wishes.en.title);

  const seoDesc = isDhanteras
    ? (isHindi ? 'परिवार, मित्रों, व्यापार व सोशल मीडिया के लिए १०० मौलिक धनतेरस शुभकामनाएं। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत कॉपी व शेयर करें।' : 'Curated collection of 100 Dhanteras wishes across 9 categories: family, friends, health, wealth, traditional, corporate & captions. Free one-click copy & share.')
    : (isHindi ? STATIC_ROUTE_SEO.wishes.hi.description : STATIC_ROUTE_SEO.wishes.en.description);

  return (
    <div className="pt-4 pb-12">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={isDhanteras ? 'Dhanteras wishes 2026, Shubh Dhanteras quotes, Dhanteras greetings Hindi English, Dhanvantari wishes' : (isHindi ? STATIC_ROUTE_SEO.wishes.hi.keywords : STATIC_ROUTE_SEO.wishes.en.keywords)}
        canonicalUrl={isDhanteras ? 'https://festivewala.in/wishes/dhanteras' : 'https://festivewala.in/wishes'}
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />
      <WishesShowcase routeFestivalId={festivalId} />
    </div>
  );
};

export default WishesPreviewPage;
