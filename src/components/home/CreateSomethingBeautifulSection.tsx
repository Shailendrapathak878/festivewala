import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Palette, Camera, Sparkles, LayoutTemplate, ArrowRight } from 'lucide-react';

interface FeatureCard {
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
  gradient: string;
  accentBorder: string;
  iconBg: string;
  icon: React.ReactNode;
}

export const CreateSomethingBeautifulSection: React.FC = () => {
  const { loc } = useLanguage();

  const CREATION_FEATURES: FeatureCard[] = [
    {
      id: 'feature-greeting-cards',
      route: '/greeting-cards/',
      badgeEn: '184 Templates',
      badgeHi: '१८४ सुंदर डिजाइन्स',
      badgeHinglish: '184 Templates',
      titleEn: 'Greeting Cards',
      titleHi: 'ग्रीटिंग कार्ड्स',
      titleHinglish: 'Greeting Cards',
      descEn: 'Design bespoke festival greeting cards with personalized names, sacred shlokas, and instant downloads.',
      descHi: 'अपना नाम, संदेश और पावन श्लोक जोड़कर सुंदर डिजिटल त्योहार ग्रीटिंग कार्ड तैयार करें।',
      descHinglish: 'Apne naam aur dil se likhe message ke sath khoobsurat festive greeting card banayein.',
      ctaEn: 'Design Card',
      ctaHi: 'कार्ड बनाएं',
      ctaHinglish: 'Design Card',
      gradient: 'from-[#24113D] via-[#311452] to-[#1C0930]',
      accentBorder: 'border-brand-gold/40 hover:border-brand-gold',
      iconBg: 'bg-brand-gold/15 text-[#F2D98B]',
      icon: <Palette className="w-6 h-6 text-[#F2D98B]" />,
    },
    {
      id: 'feature-photo-greetings',
      route: '/greeting-cards/?mode=photo',
      badgeEn: '100% Private',
      badgeHi: 'गोपनीय व सुरक्षित',
      badgeHinglish: '100% On-Device',
      titleEn: 'Photo Greetings',
      titleHi: 'फोटो ग्रीटिंग्स',
      titleHinglish: 'Photo Greetings',
      descEn: 'Insert family portraits into ornate royal gold frames with guaranteed client-side privacy.',
      descHi: 'शाही मंदिर मेहराब या ओवल फ्रेम में अपनी और परिवार की तस्वीर जोड़कर अविस्मरणीय कार्ड बनाएं।',
      descHinglish: 'Apni ya parivar ki photo traditional gold frames mein lagakar bespoke card banayein.',
      ctaEn: 'Add Your Photo',
      ctaHi: 'फोटो जोड़ें',
      ctaHinglish: 'Add Photo',
      gradient: 'from-[#14261C] via-[#1D3B2B] to-[#0D1C13]',
      accentBorder: 'border-emerald-400/40 hover:border-emerald-400',
      iconBg: 'bg-emerald-500/15 text-emerald-300',
      icon: <Camera className="w-6 h-6 text-emerald-300" />,
    },
    {
      id: 'feature-festival-greetings',
      route: '/greeting-cards/',
      badgeEn: 'Every Occasion',
      badgeHi: 'प्रत्येक पर्व',
      badgeHinglish: 'All Festivals',
      titleEn: 'Festival Greetings',
      titleHi: 'त्योहार ग्रीटिंग्स',
      titleHinglish: 'Festival Greetings',
      descEn: 'Curated designs for Diwali, Dhanteras, Chhath, Christmas, New Year, and Indian cultural festivals.',
      descHi: 'दीपावली, धनतेरस, छठ, क्रिसमस, नव वर्ष और सभी पर्वों के लिए तैयार विशेष सांस्कृतिक डिज़ाइन्स।',
      descHinglish: 'Diwali, Dhanteras, Chhath, Christmas aur sabhi festivals ke liye ready designs.',
      ctaEn: 'Choose Festival',
      ctaHi: 'पर्व चुनें',
      ctaHinglish: 'Choose Festival',
      gradient: 'from-[#2A1608] via-[#3E200C] to-[#1D0F06]',
      accentBorder: 'border-amber-400/40 hover:border-amber-400',
      iconBg: 'bg-amber-500/15 text-amber-300',
      icon: <Sparkles className="w-6 h-6 text-amber-300" />,
    },
    {
      id: 'feature-creative-studio',
      route: '/greeting-cards/',
      badgeEn: 'Full Studio',
      badgeHi: 'सम्पूर्ण स्टूडियो',
      badgeHinglish: 'Custom Canvas',
      titleEn: 'Creative Studio',
      titleHi: 'क्रिएटिव स्टूडियो',
      titleHinglish: 'Creative Studio',
      descEn: 'Customize typography, Sanskrit verses, colors, backgrounds, and download watermark-free images.',
      descHi: 'फॉन्ट्स, वैदिक श्लोक, रंग और लेआउट बदलकर अपनी पसंद का मनचाहा कार्ड तैयार करें।',
      descHinglish: 'Fonts, shlokas, colors aur backgrounds customize karke perfect card banayein.',
      ctaEn: 'Launch Studio',
      ctaHi: 'स्टूडियो खोलें',
      ctaHinglish: 'Launch Studio',
      gradient: 'from-[#1B1233] via-[#2A1D4E] to-[#130C24]',
      accentBorder: 'border-purple-400/40 hover:border-purple-400',
      iconBg: 'bg-purple-500/15 text-purple-300',
      icon: <LayoutTemplate className="w-6 h-6 text-purple-300" />,
    },
  ];

  return (
    <section
      id="create-something-beautiful"
      aria-labelledby="create-section-heading"
      className="py-14 sm:py-20 bg-brand-ivory text-brand-dark border-b border-brand-gold/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep text-[#F2D98B] border border-brand-gold/40 shadow-sm">
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>{loc('Creations & Tools', 'सृजन उपकरण', 'Creation Studio')}</span>
          </div>

          <h2
            id="create-section-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24113D] tracking-tight"
          >
            {loc(
              'Create Something Beautiful',
              'कुछ सुंदर रचें',
              'Create Something Beautiful'
            )}
          </h2>

          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {loc(
              'Explore our easy-to-use celebration creation suite — personalized cards, custom photo frames, and heartfelt designs.',
              'अपनों के लिए सुंदर ग्रीटिंग कार्ड बनाएं, तस्वीरें जोड़ें और व्यक्तिगत संदेशों के साथ हर उत्सव को खास बनाएं।',
              'Personalized cards, photo frames aur heartfelt designs create karein aasani se.'
            )}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {CREATION_FEATURES.map((card) => {
            const badge = loc(card.badgeEn, card.badgeHi, card.badgeHinglish);
            const title = loc(card.titleEn, card.titleHi, card.titleHinglish);
            const desc = loc(card.descEn, card.descHi, card.descHinglish);
            const cta = loc(card.ctaEn, card.ctaHi, card.ctaHinglish);

            return (
              <div
                key={card.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-b ${card.gradient} text-[#FAF7F0] border-2 ${card.accentBorder} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden`}
              >
                {/* Decorative Top Accent */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center`}>
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-brand-champagne border border-white/15">
                      {badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F0] group-hover:text-brand-champagne transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FAF7F0]/80 font-sans leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                  <Link
                    to={card.route}
                    className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold text-brand-champagne group-hover:text-white transition-colors py-1"
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

