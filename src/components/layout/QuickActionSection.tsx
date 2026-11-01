import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Palette,
  MessageSquareHeart,
  Camera,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface QuickActionCard {
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
  illustration: React.ReactNode;
}

export const QuickActionSection: React.FC = () => {
  const { loc } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const QUICK_ACTIONS: QuickActionCard[] = [
    {
      id: 'action-create-greeting',
      route: '/greeting-cards',
      badgeEn: '100+ Designer Templates',
      badgeHi: '१००+ सुंदर डिजाइन्स',
      badgeHinglish: '100+ Ready Templates',
      titleEn: 'Create Greeting',
      titleHi: 'ग्रीटिंग कार्ड बनाएं',
      titleHinglish: 'Greeting Card Banayein',
      descEn: 'Design bespoke festival greeting cards with personalized names, sacred shlokas, and instant downloads.',
      descHi: 'अपना नाम, संदेश और पावन श्लोक जोड़कर सुंदर डिजिटल त्योहार ग्रीटिंग कार्ड तैयार करें।',
      descHinglish: 'Apne naam aur dil se likhe message ke sath khoobsurat festive greeting card banayein.',
      ctaEn: 'Open Studio',
      ctaHi: 'कार्ड बनाएं',
      ctaHinglish: 'Design Card',
      gradient: 'from-[#24113D] via-[#311452] to-[#1C0930]',
      accentBorder: 'border-brand-gold/40 hover:border-brand-gold',
      iconBg: 'bg-brand-gold/15 text-[#F2D98B]',
      icon: <Palette className="w-6 h-6 text-[#F2D98B]" />,
      illustration: (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12 text-[#F2D98B] opacity-80">
          <rect x="8" y="10" width="44" height="40" rx="8" stroke="#F2D98B" strokeWidth="2" />
          <path d="M16 22H36" stroke="#FAF7F0" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 30H44" stroke="#FAF7F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M16 38H30" stroke="#F2D98B" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="44" cy="22" r="3" fill="#D4AF37" />
        </svg>
      ),
    },
    {
      id: 'action-send-wishes',
      route: '/wishes',
      badgeEn: '500+ Curated Wishes',
      badgeHi: '५००+ पावन संदेश',
      badgeHinglish: '500+ Festival Quotes',
      titleEn: 'Send Wishes',
      titleHi: 'शुभकामनाएं भेजें',
      titleHinglish: 'Wishes Bhejein',
      descEn: 'Find heartfelt festival wishes, poetic shayari, and Sanskrit blessings ready for WhatsApp & Instagram.',
      descHi: 'परिवार, मित्रों और बड़ों के लिए चुने हुए भक्ति, स्नेह व सम्मान से भरे पावन संदेश और शायरी।',
      descHinglish: 'Family, friends aur groups ke liye best festive wishes, poetry aur WhatsApp quotes payein.',
      ctaEn: 'Browse Wishes',
      ctaHi: 'संदेश देखें',
      ctaHinglish: 'Explore Wishes',
      gradient: 'from-[#2C0E28] via-[#3D1438] to-[#1F081C]',
      accentBorder: 'border-rose-400/40 hover:border-rose-400',
      iconBg: 'bg-rose-500/15 text-rose-300',
      icon: <MessageSquareHeart className="w-6 h-6 text-rose-300" />,
      illustration: (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12 text-rose-300 opacity-80">
          <path
            d="M12 16C12 12.6863 14.6863 10 18 10H42C45.3137 10 48 12.6863 48 16V36C48 39.3137 45.3137 42 42 42H22L12 50V16Z"
            stroke="#F472B6"
            strokeWidth="2"
          />
          <path
            d="M30 31L26.5 27.5C24.5 25.5 24.5 22.5 26.5 20.5C28.5 18.5 31.5 18.5 33.5 20.5L30 24L26.5 20.5"
            stroke="#F2D98B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: 'action-photo-studio',
      route: '/greeting-cards?mode=photo',
      badgeEn: 'Personal Photo Cards',
      badgeHi: 'अपनी फोटो जोड़ें',
      badgeHinglish: '100% Client-Side Privacy',
      titleEn: 'Create with My Photo',
      titleHi: 'अपनी फोटो से बनाएं',
      titleHinglish: 'Apni Photo Se Banayein',
      descEn: 'Insert portrait, couple, or family photos into ornate gold frames with client-side privacy guaranteed.',
      descHi: 'शाही मंदिर मेहराब या ओवल फ्रेम में अपनी और परिवार की तस्वीर जोड़कर अविस्मरणीय कार्ड बनाएं।',
      descHinglish: 'Apni ya parivar ki photo traditional gold frames mein lagakar bespoke card banayein.',
      ctaEn: 'Add Your Photo',
      ctaHi: 'फोटो कार्ड बनाएं',
      ctaHinglish: 'Open Photo Studio',
      gradient: 'from-[#14261C] via-[#1D3B2B] to-[#0D1C13]',
      accentBorder: 'border-emerald-400/40 hover:border-emerald-400',
      iconBg: 'bg-emerald-500/15 text-emerald-300',
      icon: <Camera className="w-6 h-6 text-emerald-300" />,
      illustration: (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12 text-emerald-300 opacity-80">
          <rect x="10" y="14" width="40" height="34" rx="7" stroke="#34D399" strokeWidth="2" />
          <circle cx="30" cy="31" r="10" stroke="#F2D98B" strokeWidth="2" />
          <circle cx="42" cy="20" r="2.5" fill="#34D399" />
          <path d="M22 14V11C22 9.89543 22.8954 9 24 9H36C37.1046 9 38 9.89543 38 11V14" stroke="#34D399" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'action-explore-festivals',
      route: '/festivals',
      badgeEn: 'Dates, Traditions & Decor',
      badgeHi: 'रीति-रिवाज व तिथियां',
      badgeHinglish: 'Traditions & Guides',
      titleEn: 'Explore Festivals',
      titleHi: 'त्योहार जानें',
      titleHinglish: 'Festivals Janein',
      descEn: 'Discover pan-Indian festival dates, authentic puja rituals, rangoli guides, and decoration ideas.',
      descHi: 'दिवाली, होली, छठ, रक्षाबंधन और सभी प्रमुख भारतीय त्योहारों के सांस्कृतिक महत्व व परंपराओं को समझें।',
      descHinglish: 'Diwali, Holi, Rakhi aur sabhi Indian festivals ki verified dates, traditions aur rituals janein.',
      ctaEn: 'Discover All',
      ctaHi: 'सभी त्योहार देखें',
      ctaHinglish: 'Explore Hub',
      gradient: 'from-[#161C33] via-[#212C54] to-[#0E1324]',
      accentBorder: 'border-sky-400/40 hover:border-sky-400',
      iconBg: 'bg-sky-500/15 text-sky-300',
      icon: <Compass className="w-6 h-6 text-sky-300" />,
      illustration: (
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12 text-sky-300 opacity-80">
          <circle cx="30" cy="30" r="20" stroke="#38BDF8" strokeWidth="2" />
          <polygon points="30,17 35,27 30,43 25,27" fill="#F2D98B" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="30" cy="30" r="3" fill="#161C33" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="quick-actions"
      className="py-12 sm:py-16 bg-[#FAF7F0] text-brand-dark relative overflow-hidden"
      aria-labelledby="quick-actions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep text-[#F2D98B] border border-brand-gold/40 shadow-sm">
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>{loc('Instant Experience', 'तुरंत शुरू करें', 'Quick Action')}</span>
          </div>

          <h2
            id="quick-actions-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24113D] tracking-tight"
          >
            {loc(
              'How would you like to celebrate?',
              'आप कैसे त्योहार मनाना चाहेंगे?',
              'Aap kaise celebrate karna chahenge?'
            )}
          </h2>

          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {loc(
              'Choose an experience to begin creating, wishing, or discovering',
              'ग्रीटिंग बनाने, शुभकामनाएं भेजने या त्योहारों को जानने के लिए कोई एक विकल्प चुनें',
              'Greeting banane, wishes bhejne ya festivals explore karne ke liye chunein'
            )}
          </p>
        </div>

        {/* 4 Prominent Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {QUICK_ACTIONS.map((card, index) => {
            const badge = loc(card.badgeEn, card.badgeHi, card.badgeHinglish);
            const title = loc(card.titleEn, card.titleHi, card.titleHinglish);
            const desc = loc(card.descEn, card.descHi, card.descHinglish);
            const cta = loc(card.ctaEn, card.ctaHi, card.ctaHinglish);

            return (
              <motion.div
                key={card.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Link
                  to={card.route}
                  className={`group relative h-full flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-b ${card.gradient} text-[#FAF7F0] border-2 ${card.accentBorder} shadow-lg hover:shadow-2xl transition-all duration-300 block overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F2D98B]`}
                >
                  {/* Subtle Background Glow Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />

                  {/* Card Content Top */}
                  <div className="space-y-4 relative z-10">
                    {/* Header Row: Icon + Illustration */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl ${card.iconBg} border border-white/15 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}
                      >
                        {card.icon}
                      </div>
                      <div className="group-hover:scale-105 transition-transform duration-300">
                        {card.illustration}
                      </div>
                    </div>

                    {/* Badge */}
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold tracking-wide bg-white/10 text-[#F2D98B] border border-white/15">
                        {badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F0] group-hover:text-[#F2D98B] transition-colors leading-tight">
                      {title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed font-sans">
                      {desc}
                    </p>
                  </div>

                  {/* Card Footer CTA Button */}
                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                    <span className="text-xs sm:text-sm font-bold text-[#F2D98B] group-hover:text-white transition-colors flex items-center gap-1.5">
                      <span>{cta}</span>
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform text-[#F2D98B]"
                      />
                    </span>

                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#F2D98B] group-hover:text-[#24113D] text-[#FAF7F0] flex items-center justify-center transition-all duration-300 shadow-sm">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
