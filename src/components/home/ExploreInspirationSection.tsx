import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Palette,
  Sparkles,
  Gift,
  BookOpen,
  Compass,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ExploreCategory {
  id: string;
  route: string;
  badgeEn: string;
  badgeHi: string;
  badgeHinglish: string;
  titleEn: string;
  titleHi: string;
  titleHinglish: string;
  descEn: string;
  descHi: string;
  descHinglish: string;
  ctaEn: string;
  ctaHi: string;
  ctaHinglish: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ReactNode;
  highlights: Array<{ en: string; hi: string; hinglish: string }>;
}

export const ExploreInspirationSection: React.FC = () => {
  const { loc } = useLanguage();

  const CATEGORIES: ExploreCategory[] = [
    {
      id: 'explore-rangoli',
      route: '/rangoli/',
      badgeEn: '8 Curated Patterns',
      badgeHi: '८ सुंदर रंगोली',
      badgeHinglish: '8 Floor Art Designs',
      titleEn: 'Rangoli Designs',
      titleHi: 'रंगोली डिजाइन्स',
      titleHinglish: 'Rangoli Designs',
      descEn: 'Step-by-step sacred floor art patterns categorized by difficulty, colors, and festival occasions.',
      descHi: 'दीपावली, पोंगल व उत्सवों के लिए आसान, मध्यम और पारंपरिक रंगोली डिजाइनों का प्रामाणिक संग्रह।',
      descHinglish: 'Diwali aur festivals ke liye step-by-step sundar rangoli designs, colors aur tips dekhein.',
      ctaEn: 'Explore Rangoli',
      ctaHi: 'रंगोली देखें',
      ctaHinglish: 'View Rangoli',
      accentColor: '#F59E0B',
      bgGradient: 'from-[#2A1608] via-[#3D200B] to-[#1C0E05]',
      icon: <Palette className="w-5 h-5 text-amber-400" />,
      highlights: [
        { en: 'Diya Mandala Floor Art', hi: 'दीपक मंडल रंगोली', hinglish: 'Diya Mandala' },
        { en: 'Floral Petal Marigold', hi: 'गेंदा पुष्प पंखुड़ी', hinglish: 'Flower Petal' },
        { en: 'Traditional Peacock Motif', hi: 'पारंपरिक मयूर रंगोली', hinglish: 'Peacock Rangoli' },
      ],
    },
    {
      id: 'explore-decor',
      route: '/decoration-ideas/',
      badgeEn: '8 Home Styling Ideas',
      badgeHi: '८ सजावट विचार',
      badgeHinglish: '8 Home Decor Tips',
      titleEn: 'Decoration Ideas',
      titleHi: 'सजावट के विचार',
      titleHinglish: 'Decoration Ideas',
      descEn: 'Eco-friendly earthen diyas, fairy light glass jars, marigold floral torans, and puja altar styling.',
      descHi: 'मिट्टी के दीप, तोरण, परी बत्तियां और पूजा कक्ष की सुरुचिपूर्ण व पर्यावरण-अनुकूल सजावट के विचार।',
      descHinglish: 'Ghar ke entrance, mandir aur balconies ke liye eco-friendly diya aur lighting ideas.',
      ctaEn: 'Explore Decor',
      ctaHi: 'सजावट देखें',
      ctaHinglish: 'View Decor Ideas',
      accentColor: '#10B981',
      bgGradient: 'from-[#0C2417] via-[#153825] to-[#08180F]',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      highlights: [
        { en: 'Earthen Diya Layouts', hi: 'मिट्टी के दीप विन्यास', hinglish: 'Clay Diya Layouts' },
        { en: 'Marigold Floral Torans', hi: 'प्राकृतिक गेंदा तोरण', hinglish: 'Marigold Torans' },
        { en: 'Floating Candle Bowls', hi: 'जल-पात्र पुष्प मोमबत्ती', hinglish: 'Floating Candle Bowls' },
      ],
    },
    {
      id: 'explore-gifts',
      route: '/gift-ideas/',
      badgeEn: '25 Curated Gifts',
      badgeHi: '२५ उपहार सुझाव',
      badgeHinglish: '25 Curated Gifts',
      titleEn: 'Gift Ideas',
      titleHi: 'उपहार के विचार',
      titleHinglish: 'Gift Ideas',
      descEn: 'Curated traditional sweets, artisanal dry fruit hampers, brass deity idols, and custom gifts.',
      descHi: 'परिवार, बड़ों, कॉर्पोरेट मित्रों और बच्चों के लिए प्रेम, सम्मान व मंगल कामनाओं से परिपूर्ण उपहार।',
      descHinglish: 'Family, friends aur corporate colleagues ke liye thoughtful gifts aur festive hampers.',
      ctaEn: 'Explore Gifts',
      ctaHi: 'उपहार देखें',
      ctaHinglish: 'View Gifts',
      accentColor: '#EC4899',
      bgGradient: 'from-[#280B1F] via-[#3D1230] to-[#1A0714]',
      icon: <Gift className="w-5 h-5 text-pink-400" />,
      highlights: [
        { en: 'Handcrafted Brass Idols', hi: 'पीतल की मूर्तियां', hinglish: 'Brass Deity Idols' },
        { en: 'Gourmet Dry Fruit Hampers', hi: 'सात्विक मेवा उपहार', hinglish: 'Dry Fruit Hampers' },
        { en: 'Herbal Scented Candles', hi: 'प्राकृतिक मोमबत्तियां', hinglish: 'Scented Candles' },
      ],
    },
    {
      id: 'explore-guides',
      route: '/festival-guides/',
      badgeEn: '14 Cultural Guides',
      badgeHi: '१४ विस्तृत गाइड्स',
      badgeHinglish: '14 Rituals & Puja Guides',
      titleEn: 'Festival Guides',
      titleHi: 'त्योहार गाइड्स व विधि',
      titleHinglish: 'Festival Guides',
      descEn: 'In-depth cultural stories, auspicious muhurat timings, traditional recipes, and authentic puja vidhi.',
      descHi: 'दीपोत्सव व प्रमुख पर्वों की प्रामाणिक पूजा विधि, शुभ मुहूर्त, पौराणिक कथाएं और सांस्कृतिक महत्व।',
      descHinglish: 'Festivals ki complete puja vidhi, shubh muhurat, traditional dishes aur spiritual stories.',
      ctaEn: 'Read Guides',
      ctaHi: 'गाइड पढ़ें',
      ctaHinglish: 'Read Guides',
      accentColor: '#38BDF8',
      bgGradient: 'from-[#0D1C2E] via-[#152B47] to-[#08121E]',
      icon: <BookOpen className="w-5 h-5 text-sky-400" />,
      highlights: [
        { en: '5-Day Diwali Puja Vidhi', hi: 'पंचदिवसीय पूजन विधि', hinglish: '5-Day Diwali Puja' },
        { en: 'Auspicious Muhurat Timings', hi: 'शुभ मुहूर्त व चौघड़िया', hinglish: 'Shubh Muhurat' },
        { en: 'Traditional Festive Dishes', hi: 'पारंपरिक पकवान', hinglish: 'Traditional Recipes' },
      ],
    },
    {
      id: 'explore-inspiration',
      route: '/inspiration/',
      badgeEn: 'Cultural Journal',
      badgeHi: 'सांस्कृतिक पत्रिका',
      badgeHinglish: 'Cultural Lore',
      titleEn: 'Creative Inspiration',
      titleHi: 'रचनात्मक प्रेरणा',
      titleHinglish: 'Creative Inspiration',
      descEn: 'Thoughtful essays on ritual symbolism, threshold geometries, and the enduring beauty of celebration.',
      descHi: 'उत्सव दर्शन, चौखट की मांगलिक ज्यामिति और भारतीय संस्कृति की चिरंतन गरिमा पर विशेष लेख।',
      descHinglish: 'Ritual symbolism, sacred geometries aur celebration traditions par thoughtful essays.',
      ctaEn: 'Explore Inspiration',
      ctaHi: 'प्रेरणा पढ़ें',
      ctaHinglish: 'Explore Lore',
      accentColor: '#A855F7',
      bgGradient: 'from-[#1E0B36] via-[#2F1352] to-[#140625]',
      icon: <Compass className="w-5 h-5 text-purple-400" />,
      highlights: [
        { en: 'Sacred Threshold Geometry', hi: 'चौखट की पावन ज्यामिति', hinglish: 'Sacred Geometry' },
        { en: 'Generational Bonds', hi: 'पीढ़ियों को जोड़ती परंपरा', hinglish: 'Family Connections' },
        { en: 'Philosophy of Festivals', hi: 'उत्सवों का दार्शनिक रहस्य', hinglish: 'Festive Philosophy' },
      ],
    },
  ];

  return (
    <section
      id="explore-and-get-inspired"
      aria-labelledby="explore-section-heading"
      className="py-14 sm:py-20 bg-brand-ivory text-brand-dark border-b border-brand-gold/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep text-[#F2D98B] border border-brand-gold/40 shadow-sm">
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>{loc('Holistic Celebration', 'सम्पूर्ण उत्सव अनुभव', 'Complete Celebration')}</span>
          </div>

          <h2
            id="explore-section-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24113D] tracking-tight"
          >
            {loc(
              'Explore & Get Inspired',
              'संस्कृति, कला व उत्सव प्रेरणा',
              'Explore & Get Inspired'
            )}
          </h2>

          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {loc(
              'From sacred floor art and luminous home decor to thoughtful gifting, authentic rituals, and cultural lore.',
              'रंगोली डिजाइन्स, घर की सजावट, उपहार सुझाव, प्रामाणिक पूजा विधियों और सांस्कृतिक दर्शन का सम्पूर्ण संगम।',
              'Rangoli designs, home decor, gifting ideas, authentic rituals aur cultural inspiration.'
            )}
          </p>
        </div>

        {/* 5 Content Categories Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => {
            const badge = loc(cat.badgeEn, cat.badgeHi, cat.badgeHinglish);
            const title = loc(cat.titleEn, cat.titleHi, cat.titleHinglish);
            const desc = loc(cat.descEn, cat.descHi, cat.descHinglish);
            const cta = loc(cat.ctaEn, cat.ctaHi, cat.ctaHinglish);

            return (
              <div
                key={cat.id}
                className={`flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-b ${cat.bgGradient} text-[#FAF7F0] border-2 border-brand-gold/30 hover:border-brand-gold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden`}
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-brand-champagne border border-white/15">
                      {badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#FAF7F0] group-hover:text-brand-champagne transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs text-[#FAF7F0]/80 font-sans leading-relaxed">
                    {desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {cat.highlights.map((hl, idx) => {
                      const hlText = loc(hl.en, hl.hi, hl.hinglish);
                      return (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#FAF7F0]/90">
                          <Check size={12} className="text-brand-gold flex-shrink-0" />
                          <span className="truncate">{hlText}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                  <Link
                    to={cat.route}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-brand-champagne group-hover:text-white transition-colors py-1"
                  >
                    <span>{cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-brand-gold" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
