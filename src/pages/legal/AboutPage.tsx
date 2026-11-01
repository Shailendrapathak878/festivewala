import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../../components/common/SEOHead';
import { Sparkles, Heart, Shield, Palette, BookOpen, Compass, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { isHindi } = useLanguage();

  const seoTitle = isHindi
    ? 'हमारे बारे में — फेस्टिववाला | भारतीय त्योहार उत्सव व संस्कृति मंच'
    : 'About Us — FestiveWala | Indian Festival Celebration & Heritage Platform';

  const seoDescription = isHindi
    ? 'फेस्टिववाला के मिशन, संस्कृति दर्शन और भारतीय त्योहारों को डिजिटल युग में जीवंत बनाए रखने की हमारी यात्रा के बारे में जानें।'
    : 'Discover the mission, cultural philosophy, and craftsmanship behind FestiveWala — celebrating Indian festivals through art, wishes, and digital tools.';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FestiveWala',
    url: 'https://festivewala.in',
    logo: 'https://festivewala.in/assets/brand/favicon.svg',
    description: seoDescription,
    foundingDate: '2026',
    sameAs: [],
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl="https://festivewala.in/about"
        ogType="website"
        jsonLd={organizationSchema}
        lang={isHindi ? 'hi' : 'en'}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-brand-gold-dark" />
            <span>{isHindi ? 'हमारा दर्शन व उद्देश्य' : 'Our Heritage & Mission'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'भारतीय पर्वों की गरिमा और आधुनिक उत्सव का संगम'
              : 'Celebrating Sacred Traditions with Modern Digital Elegance'}
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/75 font-sans leading-relaxed">
            {isHindi
              ? 'फेस्टिववाला का जन्म भारतीय परिवारों को उनके सांस्कृतिक जड़ों, पावन परंपराओं और आत्मीय रिश्तों से जोड़ने के संकल्प के साथ हुआ है।'
              : 'FestiveWala is a digital celebration sanctuary crafted to preserve cultural authenticity, foster genuine family togetherness, and make festival preparation joyful and accessible.'}
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-deep text-brand-gold flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {isHindi ? '१००% निजी व सुरक्षित' : 'Privacy-First Architecture'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
              {isHindi
                ? 'आपकी व्यक्तिगत तस्वीरें कभी हमारे सर्वर पर अपलोड नहीं होतीं। सभी कार्ड संपादन व फोटो फ्रेमिंग आपके ब्राउज़र में सुरक्षित रूप से होती है।'
                : 'Your family photos are processed 100% locally in your browser memory. We never store, transmit, or harvest personal user imagery on remote servers.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-deep text-brand-gold flex items-center justify-center">
              <Palette size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {isHindi ? 'सांस्कृतिक प्रामाणिकता' : 'Artistic & Cultural Authenticity'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
              {isHindi
                ? '१०० विशिष्ट ग्रीटिंग टेम्प्लेट्स, शुद्ध हिंदी व अंग्रेजी में ३००+ हार्दिक संदेश, और पारंपरिक वैदिक पंचांग आधारित पर्व विवरण।'
                : 'Over 100 handcrafted greeting designs, 500 heartfelt bilingual messages, and verified Vedic astronomical calendar references.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-deep text-brand-gold flex items-center justify-center">
              <Heart size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {isHindi ? 'निःशुल्क व सुलभ' : 'Accessible & Free for All'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
              {isHindi
                ? 'सभी ग्रीटिंग कार्ड्स, संदेश और रंगोली डिजाइन्स बिना किसी अनिवार्य लॉगिन या वॉटरमार्क के मुफ्त डाउनलोड किए जा सकते हैं।'
                : 'Every card template, wish, and vector Rangoli download is freely accessible without forced account signups, paywalls, or watermarks.'}
            </p>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="rounded-3xl bg-white border border-brand-gold/30 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {isHindi ? 'फेस्टिववाला क्या प्रदान करता है?' : 'What FestiveWala Offers'}
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/70 font-sans mt-2">
              {isHindi
                ? 'त्योहार की योजना बनाने से लेकर अपनों संग खुशियां बांटने तक का संपूर्ण समाधान:'
                : 'A comprehensive suite designed for every dimension of Indian celebration:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-sans text-brand-dark/85">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-ivory/60 border border-brand-gold/20">
              <Compass size={18} className="text-brand-gold-dark mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-brand-deep block mb-0.5">
                  {isHindi ? 'पर्व संदर्शिका (Festival Experiences):' : 'Dedicated Festival Hubs:'}
                </strong>
                <span>
                  {isHindi
                    ? 'दीपावली, होली, रक्षाबंधन, क्रिसमस और नव वर्ष के संपूर्ण सांस्कृतिक, पूजा व पकवान विवरण।'
                    : 'Deep-dive pages for Diwali, Holi, Raksha Bandhan, Christmas, and New Year covering rituals, recipes, and lore.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-ivory/60 border border-brand-gold/20">
              <Palette size={18} className="text-brand-gold-dark mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-brand-deep block mb-0.5">
                  {isHindi ? 'ग्रीटिंग व फोटो स्टूडियो:' : 'Greeting & Photo Wishes Studio:'}
                </strong>
                <span>
                  {isHindi
                    ? '१०० प्रीमियम टेम्प्लेट्स, १४ रिश्तों के अनुकूल संदेश, और निजी फोटो कार्ड निर्माण।'
                    : '100 luxury templates, 14 relationship presets, and personal photo card generation with zero server uploads.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-ivory/60 border border-brand-gold/20">
              <BookOpen size={18} className="text-brand-gold-dark mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-brand-deep block mb-0.5">
                  {isHindi ? '५०० शुभकामना संदेश (Wishes Hub):' : '500-Message Wishes Library:'}
                </strong>
                <span>
                  {isHindi
                    ? '१० श्रेणियों में तैयार भावपूर्ण संदेश, स्मार्ट जनरेटर, और एक क्लिक में व्हाट्सएप शेयर।'
                    : 'Curated across 10 emotional and social themes with one-click copy and instant WhatsApp sharing.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-ivory/60 border border-brand-gold/20">
              <Award size={18} className="text-brand-gold-dark mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-brand-deep block mb-0.5">
                  {isHindi ? 'रंगोली, सजावट व उपहार:' : 'Rangoli, Decor & Gift Guides:'}
                </strong>
                <span>
                  {isHindi
                    ? '८ वेक्टर रंगोली आर्ट, १० गृह सज्जा शैलियां, और ५ बजट श्रेणियों में उपहार प्रेरणा।'
                    : 'Procedural vector Rangoli downloads, budget DIY decor playbooks, and thoughtful gifts under 5 price tiers.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Standards Note */}
        <div className="p-6 rounded-2xl bg-brand-ivory border border-brand-gold/30 text-center max-w-2xl mx-auto space-y-2">
          <h4 className="font-serif text-base font-bold text-brand-deep">
            {isHindi ? 'संपादकीय सत्यनिष्ठा व संपर्क' : 'Editorial Integrity & Feedback'}
          </h4>
          <p className="text-xs text-brand-dark/70 font-sans leading-relaxed">
            {isHindi
              ? 'हमारे सभी सांस्कृतिक तथ्य, व्रत नियम और पंचांग संदर्भ प्रामाणिक स्रोतों से सत्यापित किए जाते हैं। यदि आपके पास कोई सुझाव है, तो कृपया '
              : 'Our cultural explanations, recipes, and calendar calculations are reviewed for authenticity. For editorial inquiries or suggestions, please visit our '}
            <Link to="/contact" className="text-brand-royal font-bold hover:underline">
              {isHindi ? 'संपर्क पृष्ठ' : 'Contact Us page'}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

