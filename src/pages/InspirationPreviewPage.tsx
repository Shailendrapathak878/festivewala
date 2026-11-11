import React from 'react';
import { Link } from 'react-router-dom';
import { EditorialSection } from '../components/layout/EditorialSection';
import { SEOHead } from '../components/common/SEOHead';
import { STATIC_ROUTE_SEO } from '../data/seo/seoMetadata';
import { useLanguage } from '../hooks/useLanguage';
import { Palette, Sparkles, Gift, BookOpen, ChevronRight } from 'lucide-react';

export const InspirationPreviewPage: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const seoConfig = isHindi ? STATIC_ROUTE_SEO.inspiration.hi : STATIC_ROUTE_SEO.inspiration.en;

  const inspirationCards = [
    {
      titleEn: 'Rangoli Art Gallery',
      titleHi: 'रंगोली कला गैलरी',
      descEn: 'Curated traditional, floral, and geometric step-by-step vector Rangoli designs with free downloads.',
      descHi: 'पारंपरिक, पुष्प व ज्यामितीय रंगोली पैटर्न और मुफ्त वेक्टर डाउनलोड।',
      path: '/rangoli',
      icon: <Palette className="w-6 h-6 text-amber-500" />,
      color: 'from-amber-500/10 to-transparent',
    },
    {
      titleEn: 'Festive Home Decor',
      titleHi: 'उत्सव गृह सज्जा',
      descEn: 'DIY lighting, natural flower torans, and sustainable balcony decoration guides.',
      descHi: 'दीये, तोरण और पर्यावरण-अनुकूल घर की सुरुचिपूर्ण सजावट।',
      path: '/decoration-ideas',
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      color: 'from-emerald-500/10 to-transparent',
    },
    {
      titleEn: 'Thoughtful Gifting',
      titleHi: 'विचारशील उपहार मार्गदर्शिका',
      descEn: 'Traditional and modern gift inspirations organized across 5 price tiers and 10 relationships.',
      descHi: '१० रिश्तों और ५ बजट श्रेणियों के अनुसार सुंदर उपहार सुझाव।',
      path: '/gift-ideas',
      icon: <Gift className="w-6 h-6 text-rose-500" />,
      color: 'from-rose-500/10 to-transparent',
    },
    {
      titleEn: 'Cultural Guides',
      titleHi: 'त्योहार ज्ञान व गाइड्स',
      descEn: 'Deep-dive cultural essays, Vedic puja vidhis, and authentic festive lore.',
      descHi: 'विस्तृत सांस्कृतिक लेख, वैदिक पूजा विधि और उत्सव की पौराणिक कथाएं।',
      path: '/festival-guides',
      icon: <BookOpen className="w-6 h-6 text-sky-500" />,
      color: 'from-sky-500/10 to-transparent',
    },
  ];

  const inspirationSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isHindi ? 'भारतीय सांस्कृतिक प्रेरणा व उत्सव संदर्शिका' : 'Indian Festive Inspiration & Cultural Heritage Hub',
    url: seoConfig.canonicalUrl,
    description: seoConfig.description,
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonicalUrl={seoConfig.canonicalUrl}
        ogType="website"
        jsonLd={inspirationSchema}
        lang={isHindi ? 'hi' : 'en'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-10">
        {/* Prominent Page H1 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold text-brand-deep">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{t.nav.inspiration}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep leading-tight">
            {isHindi ? 'भारतीय सांस्कृतिक प्रेरणा व उत्सव संदर्शिका' : 'Indian Festive Inspiration & Cultural Heritage Hub'}
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {isHindi
              ? 'भारतीय उत्सवों की समृद्ध परंपराओं, कला रूपों और आत्मीय विचारों का प्रेरणादायी संगम।'
              : 'Discover timeless Indian festive inspiration: handcrafted Rangoli patterns, eco-friendly home styling, meaningful gifts, and cultural essays.'}
          </p>
        </div>

        {/* Curated Inspiration Hub Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inspirationCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className={`group p-6 rounded-3xl bg-white border border-brand-gold/25 shadow-sm hover:shadow-md hover:border-brand-gold transition-all duration-300 flex flex-col justify-between bg-gradient-to-b ${card.color}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-brand-gold/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                    {isHindi ? card.titleHi : card.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-dark/70 font-sans mt-1.5 leading-relaxed">
                    {isHindi ? card.descHi : card.descEn}
                  </p>
                </div>
              </div>

              <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-brand-gold group-hover:text-brand-deep transition-colors">
                <span>{isHindi ? 'विस्तार से देखें' : 'Explore Gallery'}</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <EditorialSection />
    </div>
  );
};

export default InspirationPreviewPage;

