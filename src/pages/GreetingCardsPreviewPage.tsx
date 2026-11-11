import React from 'react';
import { useParams } from 'react-router-dom';
import { GreetingStudio } from '../features/greeting-studio/components/GreetingStudio';
import { SEOHead } from '../components/common/SEOHead';
import { Custom404 } from '../components/common/Custom404';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';

const SUPPORTED_GREETING_FESTIVAL_HUBS = new Set(['dhanteras', 'diwali', 'chhath-puja']);

interface GreetingCardsPreviewPageProps {
  defaultMode?: 'simple' | 'photo';
}

export const GreetingCardsPreviewPage: React.FC<GreetingCardsPreviewPageProps> = ({ defaultMode }) => {
  const { festivalId } = useParams<{ festivalId?: string }>();
  const { isHindi } = useLanguage();

  if (festivalId && !SUPPORTED_GREETING_FESTIVAL_HUBS.has(festivalId)) {
    return <Custom404 />;
  }
  const isDhanteras = festivalId === 'dhanteras';
  const isDiwali = festivalId === 'diwali';
  const isChhath = festivalId === 'chhath-puja';
  const isPhotoMode = defaultMode === 'photo';

  let seoTitle = isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.title : STATIC_ROUTE_SEO.greetingCards.en.title;
  let seoDesc = isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.description : STATIC_ROUTE_SEO.greetingCards.en.description;
  let keywords = isHindi ? STATIC_ROUTE_SEO.greetingCards.hi.keywords : STATIC_ROUTE_SEO.greetingCards.en.keywords;

  let canonicalUrl = 'https://festivewala.in/greeting-cards/';
  if (festivalId) {
    if (isPhotoMode) {
      canonicalUrl = `https://festivewala.in/photo-greetings/${festivalId}/`;
    } else {
      canonicalUrl = `https://festivewala.in/greetings/${festivalId}/`;
    }
  }

  if (isDhanteras) {
    seoTitle = isPhotoMode
      ? (isHindi ? 'धनतेरस २०२६ फोटो ग्रीटिंग कार्ड मेकर — फोटो फ्रेम व नाम जोड़ें | फेस्टिववाला' : 'Free Dhanteras 2026 Photo Greeting Card Maker — Photo Frame & Name | FestiveWala')
      : (isHindi ? 'धनतेरस २०२६ ग्रीटिंग कार्ड मेकर — २५ खास डिज़ाइन व फोटो स्टूडियो | फेस्टिववाला' : 'Free Dhanteras 2026 Greeting Card Maker — 25 Designs & Photo Studio | FestiveWala');
    seoDesc = isPhotoMode
      ? (isHindi
          ? 'धनतेरस २०२६ के लिए अपनी फोटो और परिवार का नाम जोड़कर १० खास पावन फोटो फ्रेम्स तैयार करें। १००% प्राइवेट व मुफ्त 1080p डाउनलोड।'
          : 'Upload your photo into 10 sacred Dhanteras 2026 greeting frames, add your family name, and export full 1080p+ HD PNG cards free in your browser.')
      : (isHindi
          ? 'धनतेरस के लिए २५ शाही ग्रीटिंग कार्ड और १० फोटो फ्रेम्स बनाएं। नाम जोड़ें, कस्टमाइज करें और एचडी पीएनजी डाउनलोड करें।'
          : 'Design 25 exclusive Dhanteras greeting cards & 10 personalized photo frames. Add your name, customize wishes, and download in full 1080p+ HD PNG.');
    keywords = isPhotoMode
      ? 'Dhanteras photo greeting card, Dhanteras photo frame maker, add photo Dhanteras wishes card, free Dhanteras card'
      : 'Dhanteras greeting card, Dhanteras photo frame, Shubh Dhanteras maker, free Dhanteras wishes card';
  } else if (isChhath) {
    seoTitle = isPhotoMode
      ? (isHindi
          ? 'छठ पूजा २०२६ फोटो ग्रीटिंग कार्ड मेकर — घाट फोटो फ्रेम व नाम जोड़ें | फेस्टिववाला'
          : 'Free Chhath Puja 2026 Photo Greeting Card Maker — Photo Frame & Name | FestiveWala')
      : (isHindi
          ? 'छठ पूजा २०२६ ग्रीटिंग कार्ड मेकर — २५ पावन डिज़ाइन व फोटो स्टूडियो | फेस्टिववाला'
          : 'Free Chhath Puja 2026 Greeting Card Maker — 25 Designs & Photo Studio | FestiveWala');
    seoDesc = isPhotoMode
      ? (isHindi
          ? 'छठ महापर्व २०२६ के लिए अपनी व परिवार की फोटो जोड़कर १० खास सूर्य अर्घ्य व घाट फोटो फ्रेम कार्ड तैयार करें। १००% प्राइवेट व मुफ्त 1080p डाउनलोड।'
          : 'Add your family Chhath ghat photo to 10 bespoke Surya Dev & Arghya frames, customize in English, Hindi or Hinglish, and download free 1080p+ HD PNG cards.')
      : (isHindi
          ? 'छठ महापर्व के लिए २५ विशेष सूर्य अर्घ्य, बांस सूप व ठेकुआ ग्रीटिंग कार्ड और १० फोटो फ्रेम बनाएं। नाम जोड़ें और एचडी डाउनलोड करें।'
          : 'Create 25 bespoke Chhath Puja greeting cards & 10 family photo frames featuring Surya Dev, bamboo soop, and river ghats. Free 1080p+ HD PNG download.');
    keywords = isPhotoMode
      ? 'Chhath Puja photo greeting card, Chhath photo frame maker, Surya Arghya photo card, Happy Chhath Puja photo wishes'
      : 'Chhath Puja greeting card, Happy Chhath Puja card maker, Chhathi Maiya wishes card, free Chhath greeting download';
  } else if (isDiwali) {
    seoTitle = isPhotoMode
      ? (isHindi ? 'दीपावली २०२६ फोटो ग्रीटिंग कार्ड मेकर — अपनी तस्वीर जोड़ें | फेस्टिववाला' : 'Free Diwali 2026 Photo Greeting Card Maker — Add Your Photo | FestiveWala')
      : (isHindi ? 'दीपावली २०२६ ग्रीटिंग कार्ड्स — १००+ शाही डिज़ाइन्स व मुफ्त डाउनलोड | फेस्टिववाला' : 'Free Diwali 2026 Greeting Card Maker — 100+ Luxury Designs | FestiveWala');
    seoDesc = isPhotoMode
      ? (isHindi
          ? 'दीपावली २०२६ पर अपनी व परिवार की फोटो के साथ पावन दीप फोटो फ्रेम कार्ड बनाएं। बिना सर्वर अपलोड किए सुरक्षित मुफ्त एचडी डाउनलोड।'
          : 'Personalize Diwali 2026 photo greeting cards with your family picture and custom Shubhkamnayein. Local-first browser rendering with free HD download.')
      : (isHindi
          ? 'दीपावली के लिए अपनी व परिवार की तस्वीर के साथ खूबसूरत ग्रीटिंग कार्ड बनाएं। १००% सुरक्षित क्लाइंट-साइड निर्माण, तुरंत मुफ्त डाउनलोड।'
          : 'Create customized Diwali greeting cards with your photos and name. 100% private, client-side rendering with instant high-resolution PNG download.');
    keywords = isPhotoMode
      ? 'Diwali photo greeting card maker, Diwali photo frame with name, Deepavali family photo card, free photo card download'
      : 'Diwali greeting card maker, Diwali photo wishes, Deepavali customized card, free festive card download';
  }

  const studioFaqs = isHindi
    ? [
        {
          q: 'क्या फेस्टिववाला ग्रीटिंग कार्ड मेकर पूरी तरह मुफ्त है?',
          a: 'हाँ, फेस्टिववाला का ऑनलाइन ग्रीटिंग कार्ड मेकर १००% निःशुल्क है। इसके लिए किसी सब्सक्रिप्शन या अकाउंट लॉगिन की आवश्यकता नहीं है।',
        },
        {
          q: 'क्या मेरी फोटो सर्वर पर अपलोड होती है?',
          a: 'बिल्कुल नहीं। फेस्टिववाला अत्याधुनिक क्लाइंट-साइड HTML5 कैनवस तकनीक पर कार्य करता है। आपकी फोटो आपके ब्राउज़र में ही प्रोसेस होती है और कभी किसी सर्वर पर नहीं भेजी जाती।',
        },
        {
          q: 'कार्ड किन फॉर्मेट्स में डाउनलोड कर सकते हैं?',
          a: 'आप व्हाट्सएप स्टेटस (9:16 पोर्ट्रेट), इंस्टाग्राम/फेसबुक (1:1 स्क्वायर) और एचडी लैंडस्केप में उच्च-रेज़ोल्यूशन (1080p+) पीएनजी डाउनलोड कर सकते हैं।',
        },
        {
          q: 'क्या मैं अपना नाम और कस्टम बधाई संदेश जोड़ सकता हूँ?',
          a: 'हाँ, आप अपना नाम, परिवार का नाम, और अपनी पसंद का कोई भी पावन संदेश या शायरी जोड़कर तुरंत कस्टमाइज कर सकते हैं।',
        },
      ]
    : [
        {
          q: 'Is FestiveWala Greeting Card Maker completely free?',
          a: 'Yes, FestiveWala Free Online Greeting Card Maker is 100% free with no hidden charges, watermarks, or account registration required.',
        },
        {
          q: 'Are my uploaded photos sent to any server?',
          a: 'No. FestiveWala uses 100% client-side HTML5 canvas rendering. Your photos are processed exclusively inside your local web browser and never transmitted to any external server.',
        },
        {
          q: 'What download formats and sizes are available?',
          a: 'You can export high-resolution (1080p+) PNG images optimized for WhatsApp Status (9:16 Portrait), Instagram/Facebook Posts (1:1 Square), and classic greeting dimensions.',
        },
        {
          q: 'Can I add my name and personalized wishes to the card?',
          a: 'Yes. You can enter your full name or family signature, pick from 700 curated festival wishes in Hindi and English, and adjust text layout instantly.',
        },
      ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: isHindi ? 'फेस्टिववाला फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर' : 'FestiveWala Free Online Greeting Card Maker',
      url: canonicalUrl,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Modern Web Browsers',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      description: seoDesc,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: studioFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogType="website"
        ogImage="https://festivewala.in/assets/brand/og-studio.png"
        jsonLd={jsonLd}
        lang={isHindi ? 'hi' : 'en'}
      />
      <GreetingStudio defaultFestivalId={festivalId} defaultGreetingMode={defaultMode} />

      {/* Crawlable On-Page SEO & User Guide Section */}
      <section className="bg-brand-cream/60 border-t border-brand-gold/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1: How It Works */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'ऑनलाइन त्योहार ग्रीटिंग कार्ड कैसे बनाएं (३ सरल चरण)' : 'How to Create Greeting Cards Online in 3 Simple Steps'}
            </h2>
            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'फेस्टिववाला के साथ व्यक्तिगत त्योहार ग्रीटिंग कार्ड बनाना बेहद आसान है। बिना किसी तकनीकी कौशल के कुछ ही सेकंडों में सुंदर कार्ड तैयार करें:'
                : 'FestiveWala makes it effortless to create personalized festival greeting cards. Follow these three quick steps to design a studio-quality festival card:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="bg-white p-5 rounded-xl border border-brand-gold/30 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-deep font-bold flex items-center justify-center mb-3">1</div>
                <h3 className="font-serif font-bold text-brand-deep mb-1">
                  {isHindi ? 'टेम्प्लेट व त्योहार चुनें' : '1. Choose Template'}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70">
                  {isHindi
                    ? 'दिवाली, धनतेरस, होली या नव वर्ष के लिए पारंपरिक, आधुनिक या फोटो फ्रेम चुनें।'
                    : 'Select from 184 luxury card and photo templates tailored for Diwali, Dhanteras, Chhath Puja, and sacred festivals.'}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-brand-gold/30 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-deep font-bold flex items-center justify-center mb-3">2</div>
                <h3 className="font-serif font-bold text-brand-deep mb-1">
                  {isHindi ? 'फोटो व नाम जोड़ें' : '2. Add Photo & Name'}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70">
                  {isHindi
                    ? 'अपनी पारिवारिक तस्वीर जोड़ें, नाम लिखें और सुंदर हिंदी या अंग्रेजी शुभकामना चुनें।'
                    : 'Personalize with your portrait or family photo, type your name, and select heartfelt wishes.'}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-brand-gold/30 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-deep font-bold flex items-center justify-center mb-3">3</div>
                <h3 className="font-serif font-bold text-brand-deep mb-1">
                  {isHindi ? 'एचडी डाउनलोड व शेयर' : '3. Instant HD Download'}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/70">
                  {isHindi
                    ? 'एक क्लिक में उच्च-गुणवत्ता पीएनजी डाउनलोड करें या सीधे व्हाट्सएप पर शेयर करें।'
                    : 'Download crystal-clear 1080p+ PNG files ready for WhatsApp status and social media.'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Personalization & Formats */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'व्यक्तिगत ग्रीटिंग कार्ड और फोटो फ्रेम की विशेषताएं' : 'Personalized Festival Greeting Cards with Photo & Name'}
            </h2>
            <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'चाहे आपको परिवार के लिए स्नेहपूर्ण संदेश भेजना हो या व्यापारिक ग्राहकों के लिए औपचारिक बधाई, फेस्टिववाला का फ्री ऑनलाइन फेस्टिवल कार्ड क्रिएटर हर अवसर के लिए सुंदर विकल्प प्रदान करता है।'
                : 'Whether you need an auspicious Diwali greeting for elders, a warm Dhanteras wish for clients, or a WhatsApp story for friends, FestiveWala provides complete creative freedom with zero watermarks.'}
            </p>
          </div>

          {/* Section 3: FAQ Section */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
            </h2>
            <div className="space-y-3">
              {studioFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-brand-gold/20 shadow-sm">
                  <h3 className="font-serif font-bold text-base text-brand-deep mb-2">{faq.q}</h3>
                  <p className="text-sm text-brand-dark/80 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Contextual Internal Linking */}
          <div className="pt-6 border-t border-brand-gold/20">
            <h3 className="font-serif text-lg font-bold text-brand-deep mb-3">
              {isHindi ? 'संबंधित उत्सव संसाधन' : 'Explore Related Celebration Resources'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="/wishes/" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? '७०० त्योहार शुभकामनाएं (हिंदी व अंग्रेजी)' : 'Festival Wishes in Hindi and English'}
              </a>
              <a href="/festivals/dhanteras/" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'धनतेरस २०२६ संपूर्ण गाइड' : 'Dhanteras Wishes and Greetings'}
              </a>
              <a href="/festivals/diwali/" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दीपावली २०२६ संपूर्ण गाइड' : 'Diwali Wishes and Greetings'}
              </a>
              <a href="/rangoli/" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दिवाली के लिए रंगोली डिजाइन' : 'Rangoli Designs for Diwali'}
              </a>
              <a href="/gift-ideas" className="px-4 py-2 bg-white text-brand-deep rounded-full text-xs sm:text-sm border border-brand-gold/40 hover:bg-brand-gold/10 transition-colors font-medium">
                {isHindi ? 'दिवाली उपहार विचार' : 'Diwali Gift Ideas'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GreetingCardsPreviewPage;
