import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { WishesShowcase } from '../components/layout/WishesShowcase';
import { SEOHead } from '../components/common/SEOHead';
import { Custom404 } from '../components/common/Custom404';
import { useLanguage } from '../hooks/useLanguage';
import { WISHES_CATEGORIES_SEO_DATA } from '../data/seo/wishesCategoryData';

const SUPPORTED_WISHES_FESTIVAL_HUBS = new Set(['dhanteras', 'diwali', 'chhath-puja']);
const INDEXED_WISHES_CATEGORIES = new Set([
  'birthday',
  'anniversary',
  'love',
  'friendship',
  'good-morning',
  'good-night',
]);

export const WishesPreviewPage: React.FC = () => {
  const { festivalId } = useParams<{ festivalId?: string }>();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category')?.toLowerCase();
  const { isHindi, isHinglish } = useLanguage();

  const isUnsupportedFestivalHub = Boolean(
    festivalId && !SUPPORTED_WISHES_FESTIVAL_HUBS.has(festivalId)
  );
  const isDhanteras = festivalId === 'dhanteras';
  const isDiwali = festivalId === 'diwali';
  const isChhath = festivalId === 'chhath-puja';

  const isOccasionCategory = Boolean(
    categoryParam && INDEXED_WISHES_CATEGORIES.has(categoryParam)
  );

  // Determine active content definition
  const activeContent = useMemo(() => {
    if (isChhath) return WISHES_CATEGORIES_SEO_DATA['chhath-puja'];
    if (isDhanteras) return WISHES_CATEGORIES_SEO_DATA.dhanteras;
    if (isDiwali) return WISHES_CATEGORIES_SEO_DATA.diwali;
    if (categoryParam && WISHES_CATEGORIES_SEO_DATA[categoryParam]) {
      return WISHES_CATEGORIES_SEO_DATA[categoryParam];
    }
    return WISHES_CATEGORIES_SEO_DATA.festival;
  }, [isChhath, isDhanteras, isDiwali, categoryParam]);

  if (isUnsupportedFestivalHub) {
    return <Custom404 />;
  }

  const canonicalUrl = festivalId
    ? `https://festivewala.in/wishes/${festivalId}/`
    : isOccasionCategory && categoryParam
    ? `https://festivewala.in/wishes/?category=${categoryParam}`
    : 'https://festivewala.in/wishes/';

  const seoTitle = isHindi ? activeContent.seoTitle.hi : activeContent.seoTitle.en;
  const seoDesc = isHindi ? activeContent.seoDesc.hi : activeContent.seoDesc.en;
  const keywords = isHindi ? activeContent.keywords.hi : activeContent.keywords.en;
  const pageH1 = isHindi ? activeContent.pageH1.hi : activeContent.pageH1.en;
  const pageSubtitle = isHindi ? activeContent.pageSubtitle.hi : activeContent.pageSubtitle.en;
  const editorialIntro = isHindi
    ? activeContent.editorialIntro.hi
    : isHinglish
    ? activeContent.editorialIntro.hinglish
    : activeContent.editorialIntro.en;
  const guideTitle = isHindi ? activeContent.guideTitle.hi : activeContent.guideTitle.en;
  const guideBody = isHindi ? activeContent.guideBody.hi : activeContent.guideBody.en;

  const wishesFaqs = isHindi
    ? [
        {
          q: 'क्या मैं इन शुभकामना संदेशों को सीधे व्हाट्सएप पर भेज सकता हूँ?',
          a: 'हाँ, प्रत्येक संदेश के नीचे एक-क्लिक कॉपी और व्हाट्सएप शेयर बटन दिया गया है जिससे आप तुरंत अपने परिवार और मित्रों को भेज सकते हैं।',
        },
        {
          q: 'क्या यहां हिंदी, अंग्रेजी और हिंग्लिश तीनों भाषाओं में संदेश उपलब्ध हैं?',
          a: 'हाँ, फेस्टिववाला पर १,३०० संकलित संदेश हिंदी, अंग्रेजी और हिंग्लिश तीनों प्रारूपों में उपलब्ध हैं। साथ ही पारंपरिक संस्कृत श्लोक भी अर्थ सहित संकलित हैं।',
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

  const collectionPageName = (() => {
    if (categoryParam === 'birthday') {
      return isHindi ? 'जन्मदिन शुभकामनाएं संग्रह' : 'Birthday Wishes and Greetings Collection';
    }
    if (categoryParam === 'anniversary') {
      return isHindi ? 'विवाह वर्षगांठ शुभकामनाएं संग्रह' : 'Anniversary Wishes Collection';
    }
    if (categoryParam === 'love') {
      return isHindi ? 'प्रेम संदेश व रोमांटिक शायरी संग्रह' : 'Love Messages and Romantic Quotes Collection';
    }
    if (categoryParam === 'friendship') {
      return isHindi ? 'सच्ची मित्रता संदेश व शायरी संग्रह' : 'Friendship Messages and Quotes Collection';
    }
    if (categoryParam === 'good-morning') {
      return isHindi ? 'सुप्रभात संदेश व सुविचार संग्रह' : 'Good Morning Wishes and Blessings Collection';
    }
    if (categoryParam === 'good-night') {
      return isHindi ? 'शुभ रात्रि संदेश व प्रार्थनाएं संग्रह' : 'Good Night Wishes and Blessings Collection';
    }
    if (isChhath) {
      return isHindi ? 'छठ पूजा शुभकामनाएं और बधाई संग्रह' : 'Chhath Puja Wishes and Greetings Collection';
    }
    if (isDhanteras) {
      return isHindi ? 'धनतेरस शुभकामनाएं और बधाई संग्रह' : 'Dhanteras Wishes and Greetings Collection';
    }
    if (isDiwali) {
      return isHindi ? 'दीपावली शुभकामनाएं और शायरी संग्रह' : 'Diwali Wishes and Greetings Collection';
    }
    return isHindi ? 'पावन त्योहार शुभकामनाएं संग्रह' : 'Festival Wishes in Hindi and English Collection';
  })();

  const jsonLd: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: collectionPageName,
      url: canonicalUrl,
      description: seoDesc,
    },
    ...(!isOccasionCategory
      ? [
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
        ]
      : []),
  ];

  return (
    <div className="pt-4 pb-12">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogType="website"
        ogImage="https://festivewala.in/assets/brand/og-wishes.png"
        jsonLd={jsonLd}
        lang={isHindi ? 'hi' : 'en'}
      />

      {/* Prominent Page Header with H1 & Editorial Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep leading-tight">
          {pageH1}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-brand-dark/75 max-w-2xl mx-auto">
          {pageSubtitle}
        </p>

        {/* Category-Specific Editorial Introduction */}
        <div className="mt-4 max-w-3xl mx-auto text-center">
          <p
            data-testid="wishes-editorial-intro"
            className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed bg-brand-gold/10 border border-brand-gold/25 rounded-2xl p-4 sm:p-5 shadow-xs"
          >
            {editorialIntro}
          </p>
        </div>
      </div>

      <WishesShowcase routeFestivalId={festivalId} />

      {/* Category-Specific Explanatory Guide & Contextual Links Section */}
      <section className="mt-16 bg-brand-cream/60 border-t border-brand-gold/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {guideTitle}
            </h2>
            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed">
              {guideBody}
            </p>
          </div>

          {/* Render FAQs only on festival/default routes where wishesFaqs match 1-to-1 */}
          {!isOccasionCategory && (
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
          )}

          {/* Contextual Internal Links specific to this category */}
          <div className="pt-6 border-t border-brand-gold/20">
            <h3 className="font-serif text-lg font-bold text-brand-deep mb-3">
              {isHindi ? 'संबंधित उत्सव व रचनात्मक अनुभव' : 'Related Celebrations & Creative Experiences'}
            </h3>
            <div data-testid="wishes-contextual-links" className="flex flex-wrap gap-3">
              {activeContent.internalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium shadow-xs"
                >
                  {isHindi ? link.labelHi : link.labelEn}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WishesPreviewPage;
