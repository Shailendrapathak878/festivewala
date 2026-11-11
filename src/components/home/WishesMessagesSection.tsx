import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import {
  MessageSquareHeart,
  Cake,
  Heart,
  Users,
  Sun,
  Moon,
  Flame,
  Copy,
  Check,
  Share2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { WISHES_DATA } from '../../data/wishes';
import type { WishMessage } from '../../data/types';

interface WishCategoryItem {
  id: string;
  labelEn: string;
  labelHi: string;
  labelHinglish: string;
  route: string;
  icon: React.ReactNode;
  accent: string;
  sampleWishes: WishMessage[];
}

export const WishesMessagesSection: React.FC = () => {
  const { isHindi, isHinglish, loc } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('festival');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Helper to extract clean wish text
  const getWishText = (wish: WishMessage) => {
    if (isHindi) return wish.textHi;
    if (isHinglish) return wish.textHinglish || wish.textHi || wish.textEn;
    return wish.textEn;
  };

  const getWishHeadline = (wish: WishMessage) => {
    if (isHindi) return wish.headlineHi || 'शुभकामना संदेश';
    if (isHinglish) return wish.headlineHinglish || wish.headlineEn || 'Warm Wish';
    return wish.headlineEn || 'Heartfelt Blessing';
  };

  // Curated samples from verified WISHES_DATA for the 6 requested categories
  const CATEGORIES: WishCategoryItem[] = [
    {
      id: 'birthday',
      labelEn: 'Birthday Wishes',
      labelHi: 'जन्मदिन शुभकामनाएं',
      labelHinglish: 'Birthday Wishes',
      route: '/wishes/?category=birthday',
      icon: <Cake className="w-4 h-4" />,
      accent: 'border-pink-400 text-pink-600 bg-pink-50',
      sampleWishes: [
        {
          id: 'bday-1',
          textEn: 'May your special day be blessed with boundless joy, radiant good health, and the fulfillment of every cherished dream.',
          textHi: 'ईश्वर आपको दीर्घायु, उत्तम स्वास्थ्य और जीवन में अपार खुशियां प्रदान करें। जन्मदिन की हार्दिक शुभकामनाएं!',
          textHinglish: 'Aapko janmadin ki dheron shubhkaamnayein! Har din khushiyon aur safalta se bhara rahe.',
          category: 'family',
          categoryLabelEn: 'Family & Elders',
          categoryLabelHi: 'परिवार व अग्रज',
          festivalId: 'birthday',
          tone: 'heartwarming',
          headlineEn: 'Boundless Joy & Blessings',
          headlineHi: 'दीर्घायु व अनंत सुख',
        },
        {
          id: 'bday-2',
          textEn: 'Wishing you a magnificent year ahead filled with cherished laughter, exciting milestones, and true happiness.',
          textHi: 'यह नया वर्ष आपके जीवन में सुख, शांति, समृद्धि और सफलता के नए द्वार खोले। शुभ जन्मदिन!',
          textHinglish: 'Yeh saal aapke liye khoob saari tarakki aur muskurahat lekar aaye. Happy Birthday!',
          category: 'friends',
          categoryLabelEn: 'Friends',
          categoryLabelHi: 'मित्र व साथी',
          festivalId: 'birthday',
          tone: 'inspirational',
          headlineEn: 'Joyful Milestone Ahead',
          headlineHi: 'सफलता व नव उमंग',
        },
      ],
    },
    {
      id: 'anniversary',
      labelEn: 'Anniversary Wishes',
      labelHi: 'वैवाहिक वर्षगांठ',
      labelHinglish: 'Anniversary Wishes',
      route: '/wishes/?category=anniversary',
      icon: <Heart className="w-4 h-4" />,
      accent: 'border-rose-400 text-rose-600 bg-rose-50',
      sampleWishes: [
        {
          id: 'anniv-1',
          textEn: 'May your bond of sacred companionship and mutual devotion grow sweeter, stronger, and more luminous with every passing sunrise.',
          textHi: 'विश्वास, सम्मान और प्रेम का यह पवित्र बंधन जन्मों-जन्मों तक यूं ही महकता रहे। विवाह वर्षगांठ की हार्दिक बधाई!',
          textHinglish: 'Aap dono ki jodi sada salamat rahe aur prem hamesha badhta rahe. Happy Wedding Anniversary!',
          category: 'love',
          categoryLabelEn: 'Love & Romance',
          categoryLabelHi: 'प्रेम व आत्मीयता',
          festivalId: 'anniversary',
          tone: 'romantic',
          headlineEn: 'Timeless Companionship',
          headlineHi: 'अटूट प्रेम व विश्वास',
        },
        {
          id: 'anniv-2',
          textEn: 'Celebrating two beautiful souls walking the path of life together with grace, laughter, and unbreakable harmony.',
          textHi: 'आप दोनों का साथ जीवन की बगिया को सदा खुशियों से महकाए रखे। शादी की सालगिरह की मंगल कामनाएं!',
          textHinglish: 'Saath chalne ka yeh safar hamesha khoobsurat aur khushgawar rahe. Best Anniversary Wishes!',
          category: 'love',
          categoryLabelEn: 'Love & Romance',
          categoryLabelHi: 'प्रेम व आत्मीयता',
          festivalId: 'anniversary',
          tone: 'heartwarming',
          headlineEn: 'Grace & Harmony Together',
          headlineHi: 'सदा सलामत रहे जोड़ी',
        },
      ],
    },
    {
      id: 'love-friendship',
      labelEn: 'Love & Friendship',
      labelHi: 'प्रेम व मित्रता',
      labelHinglish: 'Love & Friendship',
      route: '/wishes/?category=friendship',
      icon: <Users className="w-4 h-4" />,
      accent: 'border-amber-400 text-amber-600 bg-amber-50',
      sampleWishes: WISHES_DATA.filter((w) => w.category === 'friends').slice(0, 2),
    },
    {
      id: 'good-morning',
      labelEn: 'Good Morning',
      labelHi: 'शुभ प्रभात',
      labelHinglish: 'Good Morning',
      route: '/wishes/?category=good-morning',
      icon: <Sun className="w-4 h-4" />,
      accent: 'border-amber-400 text-amber-600 bg-amber-50',
      sampleWishes: [
        {
          id: 'gm-1',
          textEn: 'May the gentle morning sunlight illuminate your mind with peaceful clarity, renewed enthusiasm, and positive energy.',
          textHi: 'उषा की पहली किरण आपके दिन को सकारात्मक ऊर्जा, सफलता और शांति से भर दे। शुभ प्रभात!',
          textHinglish: 'Subah ki nayi kiran aapke jeevan mein nayi umeed aur khushiyan laye. Shubh Prabhat!',
          category: 'short',
          categoryLabelEn: 'Short & Sweet',
          categoryLabelHi: 'संक्षिप्त व मधुर',
          festivalId: 'daily',
          tone: 'inspirational',
          headlineEn: 'Golden Dawn Radiance',
          headlineHi: 'सकारात्मक नव प्रभात',
        },
        {
          id: 'gm-2',
          textEn: 'Awaken with gratitude in your heart and determination in your stride. Have a blessed and productive day!',
          textHi: 'प्रसन्न मन और कृतज्ञ हृदय के साथ दिन का स्वागत करें। आपका हर पल मंगलमय हो। शुभ प्रभात!',
          textHinglish: 'Asha aur muskurahat ke sath naye din ki shuruaat karein. Have a wonderful morning!',
          category: 'short',
          categoryLabelEn: 'Short & Sweet',
          categoryLabelHi: 'संक्षिप्त व मधुर',
          festivalId: 'daily',
          tone: 'heartwarming',
          headlineEn: 'Gratitude & Grace',
          headlineHi: 'मंगलमय दिवस',
        },
      ],
    },
    {
      id: 'good-night',
      labelEn: 'Good Night',
      labelHi: 'शुभ रात्रि',
      labelHinglish: 'Good Night',
      route: '/wishes/?category=good-night',
      icon: <Moon className="w-4 h-4" />,
      accent: 'border-indigo-400 text-indigo-600 bg-indigo-50',
      sampleWishes: [
        {
          id: 'gn-1',
          textEn: 'May the serene silence of the night bring gentle rest to your soul and sweet dreams for a brighter tomorrow. Good night.',
          textHi: 'रात की यह शांत बेला आपके मन को गहरी शांति और मीठे सपने प्रदान करे। शुभ रात्रि, सुखद निद्रा!',
          textHinglish: 'Raat ki shanti aapke man ko sukoon de aur aane wala kal behtar ho. Shubh Ratri!',
          category: 'short',
          categoryLabelEn: 'Short & Sweet',
          categoryLabelHi: 'संक्षिप्त व मधुर',
          festivalId: 'daily',
          tone: 'heartwarming',
          headlineEn: 'Peaceful Night Rest',
          headlineHi: 'शांत व सुखद निद्रा',
        },
        {
          id: 'gn-2',
          textEn: 'Let go of the day’s worries and let the starlit sky wrap you in comforting stillness. Rest well and wake renewed.',
          textHi: 'दिनभर की थकान भुलाकर ईश्वर का स्मरण करें और शांति से विश्राम करें। शुभ रात्रि!',
          textHinglish: 'Sari chintayein chhod kar aaram karein. Shubh Ratri aur sweet dreams!',
          category: 'short',
          categoryLabelEn: 'Short & Sweet',
          categoryLabelHi: 'संक्षिप्त व मधुर',
          festivalId: 'daily',
          tone: 'heartwarming',
          headlineEn: 'Quiet Starlight Serenity',
          headlineHi: 'ईश्वर स्मरण व शांति',
        },
      ],
    },
    {
      id: 'festival',
      labelEn: 'Festival Wishes',
      labelHi: 'त्योहार शुभकामनाएं',
      labelHinglish: 'Festival Wishes',
      route: '/wishes/?category=festival',
      icon: <Flame className="w-4 h-4" />,
      accent: 'border-purple-400 text-purple-600 bg-purple-50',
      sampleWishes: WISHES_DATA.filter((w) => w.category === 'traditional').slice(0, 2),
    },
  ];

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  const handleCopy = async (wish: WishMessage) => {
    const text = getWishText(wish);
    const fullText = `${text}\n\nVia FestiveWala: https://festivewala.in/wishes`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedId(wish.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {}
  };

  const handleShare = (wish: WishMessage) => {
    const text = getWishText(wish);
    const fullText = `${text}\n\nVia FestiveWala: https://festivewala.in/wishes`;
    if (navigator.share) {
      navigator.share({
        title: 'Festival Wish — FestiveWala',
        text: fullText,
        url: 'https://festivewala.in/wishes',
      }).catch(() => {});
      return;
    }
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="wishes-and-messages"
      aria-labelledby="wishes-section-heading"
      className="py-14 sm:py-20 bg-[#FAF7F0] text-brand-dark border-b border-brand-gold/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep text-[#F2D98B] border border-brand-gold/40 shadow-sm">
            <MessageSquareHeart size={13} className="text-[#F2D98B]" />
            <span>{loc('Heartfelt Words', 'आत्मीय संदेश', 'Wishes & Greetings')}</span>
          </div>

          <h2
            id="wishes-section-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24113D] tracking-tight"
          >
            {loc(
              'Wishes & Messages for Every Occasion',
              'हर अवसर के लिए पावन संदेश व शुभकामनाएं',
              'Wishes & Messages for Every Occasion'
            )}
          </h2>

          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {loc(
              'Browse poetic blessings, traditional verses, and everyday greetings ready to copy and share on WhatsApp.',
              'जन्मदिन, वर्षगांठ, त्योहार और दैनिक जीवन के लिए चुने हुए भक्ति, स्नेह व सम्मान से भरे पावन संदेश।',
              'Birthday, anniversary, festivals aur everyday moments ke liye curated heartfelt wishes.'
            )}
          </p>
        </div>

        {/* 6 Category Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const label = loc(cat.labelEn, cat.labelHi, cat.labelHinglish);
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer min-h-[42px] ${
                  isActive
                    ? 'bg-brand-deep text-brand-champagne shadow-md border border-brand-gold/50 scale-[1.02]'
                    : 'bg-white text-brand-dark/80 border border-brand-gold/25 hover:bg-brand-light'
                }`}
              >
                <span className={isActive ? 'text-brand-gold' : 'text-brand-muted'}>
                  {cat.icon}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Wishes Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {currentCategory.sampleWishes.map((wish) => {
            const headline = getWishHeadline(wish);
            const text = getWishText(wish);
            const isCopied = copiedId === wish.id;

            return (
              <div
                key={wish.id}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-brand-gold/30 shadow-card-luxury hover:border-brand-gold hover:shadow-card-luxury-hover transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-brand-gold/15 pb-2.5">
                    <span className="text-xs font-bold text-brand-royal uppercase tracking-wide">
                      {headline}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-brand-gold px-2 py-0.5 rounded-full bg-brand-light">
                      {loc('Ready to Share', 'साझा करने हेतु तैयार', 'Instant Share')}
                    </span>
                  </div>

                  <p className="font-serif italic text-sm sm:text-base text-[#24113D] leading-relaxed">
                    "{text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-gold/15 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(wish)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-light text-brand-deep hover:bg-brand-gold/20 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold cursor-pointer min-h-[38px]"
                    aria-label={loc('Copy Wish', 'संदेश कॉपी करें', 'Copy Wish')}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">{loc('Copied!', 'कॉपी हुआ!', 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-brand-gold" />
                        <span>{loc('Copy', 'कॉपी', 'Copy')}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShare(wish)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-deep text-brand-champagne hover:bg-brand-royal text-xs font-semibold transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold cursor-pointer min-h-[38px]"
                    aria-label={loc('Share Wish', 'संदेश साझा करें', 'Share Wish')}
                  >
                    <Share2 className="w-4 h-4 text-brand-gold" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Destination Link & Full Hub Button */}
        <div className="text-center space-y-3">
          <Link
            to={currentCategory.route}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-brand-royal text-brand-champagne hover:bg-brand-deep font-bold text-xs sm:text-sm border border-brand-gold/30 shadow-sm transition-all"
          >
            <span>{loc(`Explore All ${currentCategory.labelEn}`, `सभी ${currentCategory.labelHi} देखें`, `Explore All ${currentCategory.labelEn}`)}</span>
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </Link>

          <div>
            <Link
              to="/wishes/"
              className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-deep font-semibold underline-offset-4 hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{loc('Browse All 1,300 Festival & Occasion Wishes in Wishes Hub', 'विशेस हब में सभी १,३०० पावन संदेश ब्राउज़ करें', 'Browse 1,300 Wishes in Hub')} →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
