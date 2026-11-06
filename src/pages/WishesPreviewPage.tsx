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

  const wishesFaqs = isHindi
    ? [
        {
          q: 'क्या मैं इन शुभकामना संदेशों को सीधे व्हाट्सएप पर भेज सकता हूँ?',
          a: 'हाँ, प्रत्येक संदेश के नीचे एक-क्लिक कॉपी और व्हाट्सएप शेयर बटन दिया गया है जिससे आप तुरंत अपने परिवार और मित्रों को भेज सकते हैं।',
        },
        {
          q: 'क्या यहां हिंदी, अंग्रेजी और हिंग्लिश तीनों भाषाओं में संदेश उपलब्ध हैं?',
          a: 'हाँ, फेस्टिववाला पर ६००+ संदेश हिंदी, अंग्रेजी और हिंग्लिश तीनों प्रारूपों में उपलब्ध हैं। साथ ही पारंपरिक संस्कृत श्लोक भी अर्थ सहित संकलित हैं।',
        },
        {
          q: 'क्या परिवार और व्यावसायिक संपर्कों के लिए अलग-अलग श्रेणियां हैं?',
          a: 'हाँ, आप रिश्ते (परिवार, मित्र, सहकर्मी/बॉस, अग्रज) और भाव (पारंपरिक, अनौपचारिक, प्रेरणादायक, काव्यात्मक) के आधार पर संदेश फिल्टर कर सकते हैं।',
        },
      ]
    : [
        {
          q: 'How do I copy and share these festival wishes?',
          a: 'Every wish card features a 1-click "Copy" button and a direct "WhatsApp Share" button for seamless, instant sharing.',
        },
        {
          q: 'Are festival wishes available in Hindi, English, and Hinglish?',
          a: 'Yes, FestiveWala offers over 600 handpicked wishes across English, pure Hindi (Devanagari), Hinglish conversational phrasing, and authentic Sanskrit Shlokas with translations.',
        },
        {
          q: 'Can I find wishes tailored specifically for family or corporate contacts?',
          a: 'Yes. You can filter by recipient (Family, Friends, Elders, Boss/Corporate) and emotional tone (Sacred & Traditional, Poetic Shayari, Casual, or Short Status).',
        },
      ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: isDhanteras
        ? (isHindi ? 'धनतेरस शुभकामनाएं और बधाई संग्रह' : 'Dhanteras Wishes and Greetings Collection')
        : isDiwali
        ? (isHindi ? 'दीपावली शुभकामनाएं और शायरी संग्रह' : 'Diwali Wishes and Greetings Collection')
        : (isHindi ? 'पावन त्योहार शुभकामनाएं संग्रह' : 'Festival Wishes in Hindi and English Collection'),
      url: canonicalUrl,
      description: seoDesc,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: wishesFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  const pageH1 = isDhanteras
    ? (isHindi ? 'धनतेरस शुभकामनाएं और बधाई संदेश २०२६' : 'Dhanteras Wishes and Greetings (100+ Best Messages)')
    : isDiwali
    ? (isHindi ? 'दीपावली शुभकामनाएं, बधाई संदेश व शायरी २०२६' : 'Diwali Wishes and Greetings (Hindi & English)')
    : (isHindi ? 'त्योहार शुभकामनाएं हिंदी व अंग्रेजी में (६००+ श्रेष्ठ संदेश)' : 'Festival Wishes in Hindi and English (600+ Heartfelt Quotes)');

  const pageSubtitle = isDhanteras
    ? (isHindi
        ? 'परिवार, मित्रों और व्यापारिक सहयोगियों के लिए १०० मौलिक धनतेरस शुभकामनाएं। तुरंत कॉपी व शेयर करें।'
        : 'Curated Dhanteras wishes for family, friends, and business associates. Free 1-click copy & instant WhatsApp share.')
    : isDiwali
    ? (isHindi
        ? 'दीपावली के पावन अवसर पर अपनों को भेजें मंगलमय शुभकामनाएं, सुंदर शायरी और कोट्स।'
        : 'Authentic Diwali wishes, inspiring quotes, and WhatsApp status messages for friends and loved ones.')
    : (isHindi
        ? 'भारतीय त्योहारों के लिए ६००+ सुंदर संदेश: परिवार, मित्रों व अग्रजों के लिए हिंदी और अंग्रेजी में।'
        : 'Festival wishes for family and friends. Filter by relationship, emotional tone, and language.');

  return (
    <div className="pt-4 pb-12">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogType="website"
        jsonLd={jsonLd}
        lang={isHindi ? 'hi' : 'en'}
      />

      {/* Prominent Page Header with H1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep leading-tight">
          {pageH1}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-brand-dark/75 max-w-2xl mx-auto">
          {pageSubtitle}
        </p>
      </div>

      <WishesShowcase routeFestivalId={festivalId} />

      {/* Explanatory Guide & FAQs Section */}
      <section className="mt-16 bg-brand-cream/60 border-t border-brand-gold/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'अपनों के लिए सही त्योहार शुभकामना कैसे चुनें?' : 'How to Choose the Perfect Festival Wish for Family & Friends'}
            </h2>
            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'त्योहारों पर भेजा गया संदेश आत्मीयता का प्रतीक होता है। बुजुर्गों के लिए पारंपरिक संस्कृत श्लोक व आदरणीय शब्द उपयुक्त होते हैं, वहीं मित्रों के लिए अनौपचारिक या हिंग्लिश संदेश श्रेष्ठ रहते हैं।'
                : 'A meaningful festive greeting strengthens relationships. For elders, traditional blessings and Sanskrit shlokas convey reverence; for colleagues, professional appreciation suits best; and for close friends, lively Hinglish and warm shayari bring instant joy.'}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
            </h2>
            <div className="space-y-3">
              {wishesFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-brand-gold/20 shadow-sm">
                  <h3 className="font-serif font-bold text-base text-brand-deep mb-2">{faq.q}</h3>
                  <p className="text-sm text-brand-dark/80 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-brand-gold/20">
            <h3 className="font-serif text-lg font-bold text-brand-deep mb-3">
              {isHindi ? 'संबंधित उत्सव अनुभव' : 'Turn Wishes Into Beautiful Greeting Cards'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="/greeting-cards" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर' : 'Free Online Greeting Card Maker'}
              </a>
              <a href="/festivals/dhanteras" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'धनतेरस २०२६ पूजन व परंपराएं' : 'Dhanteras Wishes and Greetings'}
              </a>
              <a href="/festivals/diwali" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दीपावली २०२६ पूजन व मुहूर्त' : 'Diwali Wishes and Greetings'}
              </a>
              <a href="/rangoli" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'रंगोली डिजाइन गैलरी' : 'Rangoli Designs for Diwali'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WishesPreviewPage;
