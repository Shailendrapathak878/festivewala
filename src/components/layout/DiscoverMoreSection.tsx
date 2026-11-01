import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Palette,
  Sparkles,
  Gift,
  BookOpen,
  ChevronRight,
  Check,
} from 'lucide-react';

interface ExperienceCategory {
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

export const DiscoverMoreSection: React.FC = () => {
  const { loc } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const EXPERIENCES: ExperienceCategory[] = [
    {
      id: 'exp-rangoli',
      route: '/rangoli',
      badgeEn: '60+ Artisan Patterns',
      badgeHi: '६०+ सुंदर रंगोली',
      badgeHinglish: '60+ Floor Art Designs',
      titleEn: 'Rangoli Gallery',
      titleHi: 'रंगोली कला दीर्घा',
      titleHinglish: 'Rangoli Design Gallery',
      descEn: 'Explore step-by-step sacred floor art patterns categorized by difficulty, colors, and festival occasions.',
      descHi: 'दीपावली, पोंगल व उत्सवों के लिए आसान, मध्यम और पारंपरिक रंगोली डिजाइनों का प्रामाणिक संग्रह।',
      descHinglish: 'Diwali aur festivals ke liye step-by-step sundar rangoli designs, colors aur tips dekhein.',
      ctaEn: 'Explore Rangoli',
      ctaHi: 'रंगोली देखें',
      ctaHinglish: 'View Rangoli Designs',
      accentColor: '#F59E0B',
      bgGradient: 'from-[#2A1608] via-[#3D200B] to-[#1C0E05]',
      icon: <Palette className="w-5 h-5 text-amber-400" />,
      highlights: [
        { en: 'Diya Mandala Floor Art', hi: 'दीपक मंडल रंगोली', hinglish: 'Diya Mandala Design' },
        { en: 'Floral Petal Marigold Rangoli', hi: 'गेंदा पुष्प पंखुड़ी रंगोली', hinglish: 'Flower Petal Rangoli' },
        { en: 'Traditional Peacock Motif', hi: 'पारंपरिक मयूर रंगोली', hinglish: 'Peacock Rangoli' },
      ],
    },
    {
      id: 'exp-decor',
      route: '/decoration-ideas',
      badgeEn: '60+ Home Styling Ideas',
      badgeHi: '६०+ सजावट विचार',
      badgeHinglish: '60+ Home Decor Tips',
      titleEn: 'Decoration Ideas',
      titleHi: 'उत्सव गृह सज्जा',
      titleHinglish: 'Festive Decoration Ideas',
      descEn: 'Discover eco-friendly earthen diyas, fairy light glass jars, marigold torans, and puja altar styling.',
      descHi: 'मिट्टी के दीप, तोरण, परी बत्तियां और पूजा कक्ष की सुरुचिपूर्ण व पर्यावरण-अनुकूल सजावट के विचार।',
      descHinglish: 'Ghar ke entrance, mandir aur balconies ke liye eco-friendly diya aur lighting ideas.',
      ctaEn: 'Explore Decor',
      ctaHi: 'सजावट देखें',
      ctaHinglish: 'View Decor Ideas',
      accentColor: '#10B981',
      bgGradient: 'from-[#0C2417] via-[#153825] to-[#08180F]',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      highlights: [
        { en: 'Earthen Diya Arrangements', hi: 'मिट्टी के दीप विन्यास', hinglish: 'Clay Diya Layouts' },
        { en: 'Fresh Marigold Floral Torans', hi: 'प्राकृतिक गेंदा तोरण', hinglish: 'Marigold Toran Styling' },
        { en: 'Floating Candle Urli Bowls', hi: 'जल-पात्र पुष्प मोमबत्ती', hinglish: 'Floating Candle Bowls' },
      ],
    },
    {
      id: 'exp-gifts',
      route: '/gift-ideas',
      badgeEn: '60+ Curated Gift Guides',
      badgeHi: '६०+ उपहार सुझाव',
      badgeHinglish: '60+ Curated Gifts',
      titleEn: 'Festival Gift Ideas',
      titleHi: 'त्योहार उपहार मार्गदर्शिका',
      titleHinglish: 'Festival Gift Ideas',
      descEn: 'Curated traditional sweets, artisanal dry fruit hampers, brass deity idols, and custom gifts.',
      descHi: 'परिवार, बड़ों, कॉर्पोरेट मित्रों और बच्चों के लिए प्रेम, सम्मान व मंगल कामनाओं से परिपूर्ण उपहार।',
      descHinglish: 'Family, friends aur corporate colleagues ke liye thoughtful gifts aur festive hampers.',
      ctaEn: 'Explore Gifts',
      ctaHi: 'उपहार देखें',
      ctaHinglish: 'View Gift Ideas',
      accentColor: '#EC4899',
      bgGradient: 'from-[#280B1F] via-[#3D1230] to-[#1A0714]',
      icon: <Gift className="w-5 h-5 text-pink-400" />,
      highlights: [
        { en: 'Handcrafted Brass Deity Idols', hi: 'पीतल की कलात्मक मूर्तियां', hinglish: 'Brass Deity Idols' },
        { en: 'Gourmet Organic Dry Fruits', hi: 'सात्विक मेवा व मिष्ठान', hinglish: 'Dry Fruit Hampers' },
        { en: 'Aromatic Herbal Soy Candles', hi: 'प्राकृतिक सुगंधित मोमबत्तियां', hinglish: 'Herbal Scented Candles' },
      ],
    },
    {
      id: 'exp-guides',
      route: '/festival-guides',
      badgeEn: '6 Detailed Cultural Guides',
      badgeHi: '६ विस्तृत सांस्कृतिक गाइड्स',
      badgeHinglish: 'Rituals & Puja Vidhi',
      titleEn: 'Festival Guides & Rituals',
      titleHi: 'त्योहार विधि व कथाएं',
      titleHinglish: 'Festival Guides & Rituals',
      descEn: 'In-depth cultural stories, auspicious muhurat timings, traditional recipes, and authentic puja vidhi.',
      descHi: 'दीपोत्सव व प्रमुख पर्वों की प्रामाणिक पूजा विधि, शुभ मुहूर्त, पौराणिक कथाएं और सांस्कृतिक महत्व।',
      descHinglish: 'Festivals ki complete puja vidhi, shubh muhurat, traditional dishes aur spiritual stories.',
      ctaEn: 'Read Guides',
      ctaHi: 'गाइड पढ़ें',
      ctaHinglish: 'Read Festival Guides',
      accentColor: '#38BDF8',
      bgGradient: 'from-[#0D1C2E] via-[#152B47] to-[#08121E]',
      icon: <BookOpen className="w-5 h-5 text-sky-400" />,
      highlights: [
        { en: '5-Day Diwali Puja Vidhi', hi: 'पंचदिवसीय दीपावली पूजन विधि', hinglish: '5-Day Diwali Puja Vidhi' },
        { en: 'Auspicious Muhurat & Timings', hi: 'शुभ चौघड़िया व पूजन मुहूर्त', hinglish: 'Shubh Muhurat Timings' },
        { en: 'Traditional Festive Delicacies', hi: 'पारंपरिक प्रसाद व व्यंजन', hinglish: 'Traditional Recipes' },
      ],
    },
  ];

  return (
    <section
      id="discover-more"
      className="py-14 sm:py-20 bg-[#FAF7F0] border-t border-brand-gold/25 relative overflow-hidden"
      aria-labelledby="discover-more-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep text-[#F2D98B] border border-brand-gold/40 shadow-sm">
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>{loc('Holistic Celebration', 'सम्पूर्ण उत्सव अनुभव', 'Complete Celebration')}</span>
          </div>

          <h2
            id="discover-more-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24113D] tracking-tight"
          >
            {loc(
              'Discover Everything for Your Celebration',
              'उत्सव की सम्पूर्ण तैयारी, एक ही स्थान पर',
              'Festival celebration ki poori preparation, ek jagah'
            )}
          </h2>

          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {loc(
              'From sacred floor art and luminous home decor to thoughtful gifting and authentic rituals',
              'रंगोली डिजाइन्स, घर की सजावट, उपहार सुझाव और प्रामाणिक पूजा विधियों का सम्पूर्ण संग्रह',
              'Rangoli designs, home decor, gifting ideas aur authentic puja vidhi ka complete guide'
            )}
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES.map((exp, index) => {
            const badge = loc(exp.badgeEn, exp.badgeHi, exp.badgeHinglish);
            const title = loc(exp.titleEn, exp.titleHi, exp.titleHinglish);
            const desc = loc(exp.descEn, exp.descHi, exp.descHinglish);
            const cta = loc(exp.ctaEn, exp.ctaHi, exp.ctaHinglish);

            return (
              <motion.div
                key={exp.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <div
                  className={`h-full flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-b ${exp.bgGradient} text-[#FAF7F0] border-2 border-brand-gold/30 hover:border-brand-gold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative group`}
                >
                  <div className="space-y-4 relative z-10">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                        {exp.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-[#F2D98B] border border-white/15">
                        {badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl font-bold text-[#FAF7F0] group-hover:text-[#F2D98B] transition-colors">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#FAF7F0]/75 leading-relaxed font-sans">
                      {desc}
                    </p>

                    {/* Highlight Pips */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#FAF7F0]/85">
                          <Check size={12} className="text-[#F2D98B] flex-shrink-0" />
                          <span className="truncate">{loc(h.en, h.hi, h.hinglish)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className="pt-4 mt-4 border-t border-white/10 relative z-10">
                    <Link
                      to={exp.route}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#F2D98B] text-[#FAF7F0] hover:text-[#24113D] font-bold text-xs flex items-center justify-between transition-all group-hover:shadow-md"
                    >
                      <span>{cta}</span>
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
