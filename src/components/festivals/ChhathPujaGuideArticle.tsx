import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  Sparkles,
  Heart,
  Calendar,
  BookOpen,
  Utensils,
  ArrowRight,
  Clock,
  ShieldCheck,
  Gift,
  Leaf,
  CheckCircle2,
  Camera,
  Music,
  Waves,
  MapPin,
} from 'lucide-react';
import type { FestivalDetail } from '../../data/festivals/types';
import {
  CHHATH_FOUR_DAY_SCHEDULE,
  getChhathPhaseStatus,
  type ChhathPhaseStatus,
} from '../../data/festivals/chhathPujaDetails';
import { TrilingualFAQSection } from '../common/TrilingualFAQSection';

interface ChhathPujaGuideArticleProps {
  festival: FestivalDetail;
  isHindi: boolean;
  isHinglish?: boolean;
}

export const ChhathPujaGuideArticle: React.FC<ChhathPujaGuideArticleProps> = ({
  festival,
  isHindi,
  isHinglish = false,
}) => {
  const [phaseStatus, setPhaseStatus] = useState<ChhathPhaseStatus>(() => getChhathPhaseStatus());
  const [activeDayTab, setActiveDayTab] = useState<string>(() => {
    const initial = getChhathPhaseStatus();
    return initial.activeSchedule?.id || 'nahay-khay';
  });
  const [activeRegionTab, setActiveRegionTab] = useState<string>('bihar-mithila');

  // Tick every 1 second to keep IST 4-day phase tracker accurate during live dates
  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseStatus(getChhathPhaseStatus());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedDay =
    CHHATH_FOUR_DAY_SCHEDULE.find((d) => d.id === activeDayTab) || CHHATH_FOUR_DAY_SCHEDULE[0];

  const navItems = isHindi
    ? [
        { id: 'sec-chhath-schedule', label: '१. २०२६ की चार दिवसीय समय-सारणी' },
        { id: 'sec-what-is-chhath', label: '२. छठ पूजा क्या है? परिचय व महत्व' },
        { id: 'sec-chhath-history', label: '३. वैदिक उत्पत्ति व पौराणिक कथाएं' },
        { id: 'sec-four-day-rituals', label: '४. चार दिनों की संपूर्ण पूजन विधि' },
        { id: 'sec-samagri-checklist', label: '५. छठ पूजा सामग्री संपूर्ण सूची' },
        { id: 'sec-vrat-niyam', label: '६. ३६ घंटे निर्जला व्रत नियम व सावधानियां' },
        { id: 'sec-folk-songs', label: '७. छठ के मधुर लोकगीतों की विरासत' },
        { id: 'sec-chhath-recipes', label: '८. ठेकुआ, रसियाव व कसार प्रसाद विधियां' },
        { id: 'sec-regional-chhath', label: '९. क्षेत्रीय विविधता व वैश्विक उत्सव' },
        { id: 'sec-eco-ghat-guide', label: '१०. पर्यावरण-अनुकूल घाट व छत कुंड विधि' },
        { id: 'sec-chhath-facts', label: '११. रोचक एवं प्रामाणिक तथ्य' },
        { id: 'sec-chhath-faqs', label: '१२. प्रश्नोत्तरी (FAQs)' },
      ]
    : [
        { id: 'sec-chhath-schedule', label: '1. 2026 Four-Day Schedule & Phase Tracker' },
        { id: 'sec-what-is-chhath', label: '2. What is Chhath Puja & Significance' },
        { id: 'sec-chhath-history', label: '3. Vedic Origins, Legends & Folk History' },
        { id: 'sec-four-day-rituals', label: '4. Step-by-Step 4-Day Ritual Guide' },
        { id: 'sec-samagri-checklist', label: '5. Complete Chhath Samagri Checklist' },
        { id: 'sec-vrat-niyam', label: '6. 36-Hour Nirjala Vrat Rules & Care' },
        { id: 'sec-folk-songs', label: '7. Chhath Folk Songs Heritage' },
        { id: 'sec-chhath-recipes', label: '8. Traditional Thekua, Rasiyaw & Kasar Recipes' },
        { id: 'sec-regional-chhath', label: '9. Regional & Global Celebrations' },
        { id: 'sec-eco-ghat-guide', label: '10. Eco-Friendly Ghat & Terrace Kund Guide' },
        { id: 'sec-chhath-facts', label: '11. Verified Heritage Facts' },
        { id: 'sec-chhath-faqs', label: '12. Frequently Asked Questions' },
      ];

  const regionalData = [
    {
      id: 'bihar-mithila',
      nameEn: 'Bihar (Patna, Gaya, Mithila & Munger)',
      nameHi: 'बिहार (पटना, गया, मिथिला व मुंगेर)',
      badgeEn: 'Heartland of Chhath Mahaparv',
      badgeHi: 'छठ महापर्व की पावन जन्मभूमि',
      descEn:
        'Across Patna’s Ganga Ghats (Digha, Gandhi Ghat, Collectorate Ghat), Gaya’s Suryakund, Aurangabad’s historic Deo Sun Temple, and Munger’s Sita Charan rocks, millions gather in breathtaking discipline. Households draw intricate rice-paste Aripan patterns, roast hand-milled wheat, and echo centuries-old Maithili and Magahi hymns at dusk and dawn.',
      descHi:
        'पटना के दीघा-गांधी घाट, औरंगाबाद के प्राचीन देव सूर्य मंदिर, गया के सूर्यकुंड और मुंगेर के सीता चरण मंदिर में लाखों श्रद्धालुओं का अपूर्व अनुशासन देखते ही बनता है। घरों में चावल के घोल से सुंदर अरिपन सजाए जाते हैं और गंगा तट मैथिली व मगही लोकगीतों से गूंज उठते हैं।',
      specialtyEn: 'Deo Sun Temple gatherings, Aripan rice-paste art, Munger Ganga rock heritage.',
      specialtyHi: 'देव सूर्य मंदिर मेला, मिथिला अरिपन लोक कला व मुंगेर कष्टहरणी-सीता चरण परंपरा।',
    },
    {
      id: 'purvanchal-up',
      nameEn: 'Eastern UP & Varanasi / Ayodhya',
      nameHi: 'पूर्वांचल, वाराणसी व अयोध्या',
      badgeEn: 'Kashi & Sarayu Riverfront Devotion',
      badgeHi: 'काशी व सरयू तट की पावन आभा',
      descEn:
        'Along Varanasi’s Assi and Dashashwamedh Ghats, Gorakhpur, Ballia, Azamgarh, and Ayodhya’s Saryu banks, Dala Chhath illuminates stone steps with countless clay lamps and sugarcane canopies. Families recite devotional Bhajans through the night after Kosi Bharai rituals.',
      descHi:
        'वाराणसी के अस्सी व दशाश्वमेध घाट, अयोध्या में सरयू तट, बलिया व गोरखपुर में डाला छठ पर सीढ़ियां दीपों व गन्ने के मंडप से जगमगा उठती हैं। रात्रि में कोसी भराई के पश्चात भजन-कीर्तन के साथ पूरा परिवार जागरण करता है।',
      specialtyEn: 'Stone ghat lamp rows, Sugarcane Kosi canopy, vibrant Bhojpuri melodies.',
      specialtyHi: 'पत्थर के घाटों पर दीप-मालिका, गन्ने का कोसी मंडप व मधुर भोजपुरी छठ गीत।',
    },
    {
      id: 'jharkhand-bengal',
      nameEn: 'Jharkhand & West Bengal',
      nameHi: 'झारखंड व पश्चिम बंगाल',
      badgeEn: 'Damodar & Subarnarekha Banks',
      badgeHi: 'दामोदर व स्वर्णरेखा नदी उत्सव',
      descEn:
        'Ranchi’s Kanke Dam, Jamshedpur’s Subarnarekha riverfronts, Dhanbad ponds, and Kolkata’s Babughat and Prinsep Ghat transform into gleaming sanctuaries of devotion. Local neighborhoods collaborate seamlessly to build smooth ramps and provide hot tea, ginger, and pure cow milk at ghats.',
      descHi:
        'रांची के कांके डैम, जमशेदपुर की स्वर्णरेखा नदी, धनबाद व कोलकाता के बाबूघाट-प्रिंसेप घाट पर विशाल आयोजन होते हैं। स्थानीय समाज निःस्वार्थ भाव से घाट निर्माण, स्वच्छता, अदरक-शर्बत व गाय के दूध की सेवा प्रदान करता है।',
      specialtyEn: 'Multi-community ghat seva stalls, Babughat illumination, fresh hill turmeric & ginger.',
      specialtyHi: 'सामुदायिक घाट सेवा शिविर, कोलकाता बाबूघाट दीपोत्सव व ताजी हल्दी-अदरक भेंट।',
    },
    {
      id: 'nepal-terai',
      nameEn: 'Nepal Terai & Kathmandu',
      nameHi: 'नेपाल (मिथिला-तराई व काठमांडू)',
      badgeEn: 'Janakpur’s Radiant Ganga Sagar',
      badgeHi: 'जनकपुरधाम गंगासागर महासंगम',
      descEn:
        'In Janakpurdham, Birgunj, Biratnagar, and Kathmandu’s Rani Pokhari and Bagmati banks, Chhath stands among Nepal’s grandest public festivals — recognized as a national cultural celebration where historic temple ponds glow with floating lotus lamps and Maithil folk hymns.',
      descHi:
        'जनकपुरधाम के ऐतिहासिक गंगासागर व धनुषसागर तालाबों, बीरगंज, विराटनगर और काठमांडू में रानीपोखरी-बागमती तट पर छठ पर्व नेपाल के प्रमुख राष्ट्रीय उत्सवों के रूप में अपार श्रद्धा से मनाया जाता है।',
      specialtyEn: 'Janakpur Ganga Sagar pond illuminations, royal Maithili folk heritage.',
      specialtyHi: 'जनकपुर गंगासागर का दिव्य दृश्य और प्राचीन मैथिली सांस्कृतिक वैभव।',
    },
    {
      id: 'metros-diaspora',
      nameEn: 'Delhi, Mumbai & Global Diaspora',
      nameHi: 'दिल्ली, मुंबई व प्रवासी भारतीय समुदाय',
      badgeEn: 'Terrace Pools & Overseas Lakesides',
      badgeHi: 'महानगरीय कुंड व वैश्विक आस्था',
      descEn:
        'From Delhi-NCR Yamuna & municipal pools, Mumbai’s Juhu and Powai banks, and Bengaluru lakes to organized Indian cultural associations in London, Toronto, New Jersey, Singapore, and Sydney — working families adapt gracefully with neighborhood ponds or courtyard clean-water kunds, carrying every ritual intact across oceans.',
      descHi:
        'दिल्ली-एनसीआर, मुंबई के जुहू-पवई तट, बेंगलुरु व पुणे से लेकर लंदन, टोरंटो, न्यू जर्सी और सिडनी तक — प्रवासी परिवार स्थानीय पार्कों, झीलों या घर की छतों पर पवित्र कुंड बनाकर उतनी ही शुद्धता से सूर्य देव को अर्घ्य देते हैं।',
      specialtyEn: 'Rooftop courtyard kunds, lakeside community permits, couriered homemade Thekua.',
      specialtyHi: 'छत पर स्वच्छ जल कुंड, प्रवासी सांस्कृतिक घाट व घर से भेजे ठेकुआ की मिठास।',
    },
  ];

  const samagriColumns = [
    {
      titleEn: 'Bamboo & Sacred Vessels',
      titleHi: 'बांस व पूजा पात्र सामग्री',
      items: [
        { en: 'New handwoven Bamboo Daura (Dala) & 2–4 Soops', hi: 'नया बांस का दउरा (डाला) व २ से ४ बांस के सूप' },
        { en: 'Brass or Copper Arghya Lota + Panchpatra spoon', hi: 'पीतल या तांबे का अर्घ्य कलश व लोटा' },
        { en: 'Fresh Earthen Diya set, Kosi pot (optional) & cotton wicks', hi: 'मिट्टी के दीये, बत्ती, और कोसी हेतु मिट्टी का कलश' },
        { en: 'Pure Cow Milk & Gangajal bottle for pouring Arghya', hi: 'अर्घ्य हेतु कच्चा गाय का दूध व पावन गंगाजल' },
      ],
    },
    {
      titleEn: 'Fresh Fruits & Harvest Roots',
      titleHi: 'प्राकृतिक फल, गन्ना व कंद-मूल',
      items: [
        { en: 'Sugarcane stalks with intact green top leaves (3–5+)', hi: 'जड़ व हरे पत्तों सहित लंबे गन्ने (ईख)' },
        { en: 'Whole green/brown coconut with husk & banana bunch', hi: 'जटा वाला साबुत नारियल व केले का घौद' },
        { en: 'Dabh Nimbu (pomelo citrus), Suthni, Water chestnut (Singhara)', hi: 'बड़ा डाभ नींबू (चकोतरा), सुथनी व सिंघाड़ा' },
        { en: 'Whole raw turmeric & ginger plants with green shoots', hi: 'पत्ते व जड़ सहित कच्ची हल्दी और अदरक के पौधे' },
      ],
    },
    {
      titleEn: 'Offerings, Clothing & Sacred Marks',
      titleHi: 'नैवेद्य, वस्त्र एवं सौभाग्य सामग्री',
      items: [
        { en: 'Fresh Thekua, Kasar rice laddoo & soaked Chana/Kheer offerings', hi: 'ताजे बने ठेकुआ, कसार लड्डू व गुड़-सामान' },
        { en: 'Orange Bhakra Vermilion (Chhath Sindoor) & Roli-Akshat', hi: 'नारंगी भखरा सिंदूर, रोली, हल्दी व अक्षत' },
        { en: 'Pan leaves, whole supari, Kapoor (camphor) & mango twigs', hi: 'पान के पत्ते, साबुत सुपारी, कपूर व आम की लकड़ी' },
        { en: 'New unstitched cotton/yellow-vermilion Sari & Dhoti for Vrati', hi: 'व्रती के लिए नवीन सूती/पीली-लाल साड़ी व धोती' },
      ],
    },
  ];

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-[#24113D]">
      {/* Editorial Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A1400] text-[#FDE047] border border-[#F97316]/40 shadow-sm text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <Sun size={15} className="text-[#FDE047]" />
          <span>{isHindi ? 'संपूर्ण छठ महापर्व संदर्शिका • ४ पावन दिन' : 'Complete Chhath Mahaparv Guide • 4 Sacred Days'}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#24113D] leading-[1.2] max-w-4xl mx-auto">
          {isHindi
            ? 'छठ पूजा २०२६: नहाय-खाय, खरना, संध्या व उषा अर्घ्य विधि, सामग्री, ठेकुआ प्रसाद व इतिहास'
            : 'Chhath Puja 2026: Complete 4-Day Schedule, Rituals, Samagri Checklist, Prasad Recipes & Heritage Guide'}
        </h2>

        <p className="font-sans text-sm sm:text-base md:text-lg text-[#24113D]/80 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
          {isHindi
            ? 'भगवान सूर्यदेव व षष्ठी मैया की पावन आराधना का चार दिवसीय अनुष्ठान — वैदिक परंपरा, सात्विक व्रत नियम, लोकगीत व संपूर्ण मार्गदर्शन।'
            : 'An authoritative, respectful guide to India’s purest four-day solar festival: uniting ecological reverence, 36-hour discipline, homemade prasad, and multigenerational kinship.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#45216B]/85 font-medium mt-6 pt-4 border-t border-[#F2D98B]/50">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#EA580C]" />
            <span>{isHindi ? '१३ – १६ नवम्बर २०२६ (कार्तिक शुक्ल पक्ष)' : 'Nov 13 – Nov 16, 2026 (Kartik Shukla Paksha)'}</span>
          </span>
          <span className="hidden sm:inline text-[#D4AF37]">•</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#EA580C]" />
            <span>{isHindi ? '१२ मिनट संपूर्ण पठन' : '12 Min Comprehensive Read'}</span>
          </span>
          <span className="hidden sm:inline text-[#D4AF37]">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>{isHindi ? 'वैदिक व लोक परंपरा अनुरूप' : 'Authentic Vedic & Folk Guide'}</span>
          </span>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-8 sm:my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#2B1004] via-[#451A03] to-[#1A0A02] text-[#FAF7F0] border-2 border-[#F59E0B]/40 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
          <BookOpen className="w-5 h-5 text-[#FDE047]" />
          <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#FDE047]">
            {isHindi ? 'विषय-सूची (Table of Contents)' : 'Guide Contents — Jump to Section'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#FDE047]/60 text-xs sm:text-sm font-medium text-[#FAF7F0] transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FDE047] flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-12 sm:space-y-16 text-[#24113D]/90 leading-relaxed text-sm sm:text-base font-sans">
        {/* SECTION 1: LIVE 4-DAY CHHATH SCHEDULE & PHASE TRACKER */}
        <section id="sec-chhath-schedule" className="scroll-mt-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-xs font-bold text-[#7C2D12] uppercase">
            <span>{isHindi ? 'अनुभाग १ • २०२६ कैलेंडर व अवस्था' : 'Section 1 • Verified 2026 Schedule'}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi
              ? '१. छठ पूजा २०२६ की चार दिवसीय समय-सारणी व लाइव चरण ट्रैकर'
              : '1. Chhath Puja 2026 Four-Day Schedule & Live Ritual Phase Tracker'}
          </h2>

          {/* Dynamic Date-Aware IST Status Banner */}
          <div
            data-testid="chhath-phase-tracker"
            className="rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[#2B1004] via-[#4D1C06] to-[#1A0D2E] text-[#FAF7F0] border-2 border-[#F59E0B]/50 shadow-xl space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400/20 text-[#FDE047] border border-amber-400/40">
                  <Sun size={13} className="text-[#FDE047]" />
                  <span>{isHindi ? 'भारतीय मानक समय (IST)' : 'India Standard Time (Asia/Kolkata)'}</span>
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-white pt-1">
                  {isHindi ? phaseStatus.labelHi : phaseStatus.labelEn}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/80">
                  {isHindi ? phaseStatus.subHi : phaseStatus.subEn}
                </p>
              </div>

              {phaseStatus.phase !== 'concluded' && phaseStatus.phase !== 'day-4' && (
                <div className="flex items-center gap-2 sm:gap-3" data-testid="chhath-phase-countdown">
                  {[
                    { val: phaseStatus.daysLeft, label: isHindi ? 'दिन' : 'Days' },
                    { val: phaseStatus.hoursLeft, label: isHindi ? 'घंटे' : 'Hrs' },
                    { val: phaseStatus.minutesLeft, label: isHindi ? 'मिनट' : 'Min' },
                    { val: phaseStatus.secondsLeft, label: isHindi ? 'सेकंड' : 'Sec' },
                  ].map((box, i) => (
                    <div
                      key={i}
                      className="min-w-[54px] sm:min-w-[64px] py-2 px-2.5 rounded-2xl bg-black/40 border border-amber-400/35 text-center"
                    >
                      <div className="font-mono text-lg sm:text-2xl font-bold text-[#FDE047] leading-none">
                        {String(box.val).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-amber-100/75 mt-1">
                        {box.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4-Day Interactive Milestone Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
              {CHHATH_FOUR_DAY_SCHEDULE.map((day) => {
                const isCurrent = phaseStatus.activeDayNumber === day.dayNumber;
                const isSelected = activeDayTab === day.id;
                return (
                  <button
                    key={day.id}
                    type="button"
                    data-testid={`chhath-day-tab-${day.id}`}
                    onClick={() => setActiveDayTab(day.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-[#FDE047] text-[#2B1004] border-[#FDE047] shadow-md'
                        : isCurrent
                        ? 'bg-amber-500/25 text-white border-amber-300'
                        : 'bg-white/10 text-amber-50 border-white/15 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 text-[11px] font-bold uppercase tracking-wider">
                      <span>{day.icon} {isHindi ? `दिवस ${day.dayNumber}` : `Day ${day.dayNumber}`}</span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-bold">
                          {isHindi ? 'आज' : 'TODAY'}
                        </span>
                      )}
                    </div>
                    <div className="font-serif font-bold text-sm mt-1">
                      {isHindi ? day.titleHi.replace(/^.*?:\s*/, '') : day.titleEn.replace(/^.*?:\s*/, '')}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#2B1004]/80 font-semibold' : 'text-amber-200/80'}`}>
                      {isHindi ? day.tithiHi.split('•')[1]?.trim() : day.tithiEn.split('•')[1]?.trim()}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Card Detail */}
            <div
              data-testid="chhath-selected-day-detail"
              className="p-4 sm:p-5 rounded-2xl bg-black/30 border border-amber-400/25 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-serif text-base sm:text-xl font-bold text-[#FDE047]">
                  {selectedDay.icon} {isHindi ? selectedDay.titleHi : isHinglish ? selectedDay.titleHinglish : selectedDay.titleEn}
                </h4>
                <span className="text-xs font-semibold text-amber-200">
                  {isHindi ? selectedDay.tithiHi : selectedDay.tithiEn}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed">
                {isHindi ? selectedDay.descHi : selectedDay.descEn}
              </p>
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-400/20 text-xs text-amber-200">
                <strong className="text-[#FDE047]">{isHindi ? 'समय निर्देश: ' : 'Timing Note: '}</strong>
                {isHindi ? selectedDay.timingNoteHi : selectedDay.timingNoteEn}
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                {selectedDay.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-amber-100/90 bg-white/5 p-2.5 rounded-xl">
                    <CheckCircle2 size={14} className="text-[#FDE047] flex-shrink-0 mt-0.5" />
                    <span>{isHindi ? h.hi : h.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-[#451A03] flex items-start gap-3">
            <MapPin size={18} className="text-[#EA580C] flex-shrink-0 mt-0.5" />
            <div>
              <strong>{isHindi ? 'शहर-अनुसार सूर्यास्त व सूर्योदय समय सूचना: ' : 'City-Wise Sunrise & Sunset Note: '}</strong>
              {isHindi
                ? 'संध्या अर्घ्य (१५ नवम्बर) स्थानीय सूर्यास्त पर और उषा अर्घ्य (१६ नवम्बर) स्थानीय सूर्योदय पर दिया जाता है। पटना, रांची, वाराणसी, दिल्ली, कोलकाता और मुंबई के सूर्योदय-सूर्यास्त समय में देशांतर के अनुसार २० से ५० मिनट का अंतर होता है — अतः अपने नगर का स्थानीय पंचांग व मौसम सूर्यास्त समय अवश्य देखें।'
                : 'Sandhya Arghya (Nov 15) and Usha Arghya (Nov 16) are observed directly at local sunset and local sunrise. Because sunset and sunrise vary by 20–50 minutes from eastern cities like Patna/Kolkata to Delhi/Mumbai and overseas diaspora cities, always follow your city’s official daily sunrise/sunset bulletin rather than one single national clock.'}
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT IS CHHATH PUJA */}
        <section id="sec-what-is-chhath" className="scroll-mt-24 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '२. छठ पूजा क्या है? अर्थ, नामकरण व सांस्कृतिक महत्व' : '2. What is Chhath Puja? Etymology & Cultural Significance'}
          </h2>
          <p>{isHindi ? festival.about.summaryHi : festival.about.summaryEn}</p>
          <p>{isHindi ? festival.about.culturalSignificanceHi : festival.about.culturalSignificanceEn}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {festival.about.keyThemes.map((theme, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-orange-200 shadow-sm space-y-1.5 text-center"
              >
                <div className="text-2xl">{theme.icon}</div>
                <div className="font-serif font-bold text-sm text-[#431407]">
                  {isHindi ? theme.hi : theme.en}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: VEDIC ORIGINS & LEGENDS */}
        <section id="sec-chhath-history" className="scroll-mt-24 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '३. वैदिक उत्पत्ति, पौराणिक कथाएं एवं ऐतिहासिक परंपरा' : '3. Vedic Origins, Mythological Legends & Folk History'}
          </h2>
          <p>{isHindi ? festival.about.historyHi : festival.about.historyEn}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
              <h3 className="font-serif font-bold text-lg text-[#7C2D12]">
                {isHindi ? 'अंगराज कर्ण व राजा प्रियव्रत की कथा' : 'Legend of King Priyavrata & Mata Shashthi'}
              </h3>
              <p className="text-xs sm:text-sm text-[#24113D]/80 leading-relaxed">
                {isHindi
                  ? 'ब्रह्मवैवर्त पुराण के अनुसार निःसंतान राजा प्रियव्रत ने महर्षि कश्यप के मार्गदर्शन में पुत्रेष्टि यज्ञ किया, किंतु शिशु मृत जन्मा। तब आकाश से प्रकट हुईं षष्ठी देवी (छठी मैया) ने स्पर्श कर बालक को जीवनदान दिया और कार्तिक व चैत्र शुक्ल षष्ठी को अपनी आराधना का उपदेश दिया।'
                  : 'Brahma Vaivarta Purana narrates that childless King Priyavrata performed a sacred yajna on Sage Kashyapa’s counsel, only to see his infant born lifeless. Goddess Shashthi (Chhathi Maiya) manifested in radiant grace, restored life to the child, and instructed families to offer Kartik & Chaitra Shukla Shashthi gratitude for children’s protection.'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
              <h3 className="font-serif font-bold text-lg text-[#7C2D12]">
                {isHindi ? 'ऋग्वेद व आरोग्य विज्ञान से जुड़ाव' : 'Rigvedic Hymns & Solar Wellness Philosophy'}
              </h3>
              <p className="text-xs sm:text-sm text-[#24113D]/80 leading-relaxed">
                {isHindi
                  ? 'प्राचीन ऋषि प्रातः-सायं नदी में खड़े होकर गायत्री व सूर्य मंत्रों से सौर ऊर्जा अवशोषित करते थे। जल, खुला शरीर और सुबह-शाम की कोमल यूवी-किरणें शरीर में विटामिन-डी व शांत मानसिक संतुलन प्रदान करने वाली मानी जाती हैं।'
                  : 'Vedic sages stood beside clear water chanting Gayatri and Savitr hymns while gently absorbing dawn and dusk solar rays without harsh midday glare — harmonizing light, water reflections, and seasonal autumn immunity ahead of winter.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: FOUR-DAY STEP-BY-STEP RITUALS */}
        <section id="sec-four-day-rituals" className="scroll-mt-24 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '४. छठ के चारों दिनों की विस्तृत विधि व परंपराएं' : '4. Step-by-Step Guide to All Four Days of Chhath Puja'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHHATH_FOUR_DAY_SCHEDULE.map((day) => (
              <div
                key={day.id}
                className="p-6 rounded-3xl bg-white border border-[#F59E0B]/30 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-[#9A3412] text-xs font-bold">
                    {isHindi ? `दिवस ${day.dayNumber}` : `Day ${day.dayNumber}`}
                  </span>
                  <span className="text-xs font-semibold text-[#7C2D12]">
                    {isHindi ? day.tithiHi : day.tithiEn}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#24113D]">
                  {day.icon} {isHindi ? day.titleHi : day.titleEn}
                </h3>
                <p className="text-xs font-semibold text-[#EA580C]">
                  {isHindi ? day.subtitleHi : day.subtitleEn}
                </p>
                <p className="text-xs sm:text-sm text-[#24113D]/80 leading-relaxed">
                  {isHindi ? day.descHi : day.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: COMPLETE SAMAGRI CHECKLIST */}
        <section id="sec-samagri-checklist" className="scroll-mt-24 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '५. छठ पूजा संपूर्ण सामग्री सूची (Chhath Samagri Checklist)' : '5. Complete Chhath Puja Samagri Checklist'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samagriColumns.map((col, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4"
              >
                <h3 className="font-serif font-bold text-lg text-[#7C2D12] border-b border-amber-100 pb-2">
                  {isHindi ? col.titleHi : col.titleEn}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#24113D]/85">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{isHindi ? item.hi : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: VRAT NIYAM & HEALTH PRECAUTIONS */}
        <section id="sec-vrat-niyam" className="scroll-mt-24 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '६. ३६ घंटे निर्जला व्रत नियम, शुद्धता व स्वास्थ्य सावधानियां' : '6. 36-Hour Nirjala Vrat Rules, Purity & Compassionate Care'}
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#24113D]/85">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-bold">1.</span>
                <span>
                  {isHindi
                    ? 'चारों दिन प्याज, लहसुन व मांसाहार पूर्णतः वर्जित रहता है; भोजन में केवल सेंधा नमक प्रयुक्त होता है।'
                    : 'Onion, garlic, and refined table salt are avoided across all 4 days; households cook solely with Sendha Namak and pure ghee.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-bold">2.</span>
                <span>
                  {isHindi
                    ? 'व्रती चटाई या भूमि पर स्वच्छ सूती वस्त्र बिछाकर शयन करते हैं और सदैव मधुर व सत्य वाणी बोलते हैं।'
                    : 'Vratis sleep on clean woven mats on the floor, bathe daily before cooking, and maintain calm speech and patience.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-bold">3.</span>
                <span>
                  {isHindi
                    ? 'प्रसादम तैयार करते समय स्वच्छता सर्वोच्च होती है — बच्चों व बड़े सब हाथ-पैर धोकर ही प्रसाद सामग्री स्पर्श करते हैं।'
                    : 'Strict kitchen hygiene is guarded: everyone washes thoroughly before touching washed wheat, fruits, or bamboo Soop baskets.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-bold">4.</span>
                <span>
                  {isHindi
                    ? 'स्वास्थ्य व करुणा सर्वोपरि: मधुमेह, गर्भवती महिलाओं या वरिष्ठ जनों को चिकित्सक के परामर्श के अनुसार फलाहार या जल ग्रहण कर ही व्रत करना चाहिए।'
                    : 'Health & Compassion First: Elderly, pregnant, or diabetic devotees should prioritize medical advice — resting warmly or taking fruits/water instead of strict waterless fasting when needed.'}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 7: FOLK SONGS HERITAGE */}
        <section id="sec-folk-songs" className="scroll-mt-24 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D] flex items-center gap-2">
            <Music size={24} className="text-[#EA580C]" />
            <span>{isHindi ? '७. छठ के पावन लोकगीतों की अमूल्य परंपरा' : '7. Heritage of Soulful Chhath Puja Folk Songs'}</span>
          </h2>
          <p>
            {isHindi
              ? 'छठ के लोकगीत किसी वाद्ययंत्र के बिना केवल सामूहिक स्वर में गाए जाते हैं। इनमें "कांच ही बांस के बहंगिया", "केलवा के पात पर उगलन सूरज मल", और "उग हे सूरज देव भेल भिनसरवा" जैसे गीत प्रत्येक भारतीय के हृदय में बचपन की आस्था जगा देते हैं।'
              : 'Sung acapella by women walking barefoot in courtyards and along riverbanks, Chhath folk melodies avoid loud beats in favor of tender conversations with Chhathi Maiya. Classics like "Kaanch Hi Baans Ke Bahangiya", "Kelwa Ke Paat Par Ugalan Suraj Mal", and "Uga He Suraj Dev Bhela Bhinsarwa" remain immortalized across Bhojpuri, Maithili, Magahi, and Angika homes.'}
          </p>
        </section>

        {/* SECTION 8: RECIPES */}
        <section id="sec-chhath-recipes" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D] flex items-center gap-2">
              <Utensils size={24} className="text-[#EA580C]" />
              <span>{isHindi ? '८. पारंपरिक छठ प्रसाद व व्यंजन विधियां' : '8. Traditional Chhath Prasad & Authentic Recipes'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {festival.recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-3xl p-6 border border-[#F59E0B]/30 shadow-md space-y-4"
              >
                <div className="flex items-start justify-between gap-2 border-b border-amber-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-[#9A3412]">
                      {isHindi ? recipe.typeHi : recipe.typeEn}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#24113D] mt-1">
                      {isHindi ? recipe.nameHi : recipe.nameEn}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[#7C2D12] bg-amber-100 px-2.5 py-1 rounded-xl whitespace-nowrap">
                    {isHindi ? recipe.timeHi : recipe.timeEn}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#24113D]/80 leading-relaxed">
                  {isHindi ? recipe.descHi : recipe.descEn}
                </p>
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412] block">
                    {isHindi ? 'मुख्य सामग्री:' : 'Ingredients:'}
                  </span>
                  <ul className="space-y-1 text-xs text-[#24113D]/85">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>• {isHindi ? ing.hi : ing.en}</li>
                    ))}
                  </ul>
                </div>
                <ol className="space-y-1.5 text-xs text-[#24113D]/80 list-decimal pl-4">
                  {recipe.steps.map((st, idx) => (
                    <li key={idx}>{isHindi ? st.hi : st.en}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9: REGIONAL TRADITIONS */}
        <section id="sec-regional-chhath" className="scroll-mt-24 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '९. क्षेत्रीय परंपराएं व वैश्विक छठ उत्सव' : '9. Regional Celebrations & Global Indian Diaspora Traditions'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {regionalData.map((reg) => (
              <button
                key={reg.id}
                type="button"
                onClick={() => setActiveRegionTab(reg.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer min-h-[44px] ${
                  activeRegionTab === reg.id
                    ? 'bg-[#3A1400] text-[#FDE047] border-[#3A1400] shadow-md'
                    : 'bg-white text-[#24113D] border-amber-300 hover:border-orange-500'
                }`}
              >
                {isHindi ? reg.nameHi : reg.nameEn}
              </button>
            ))}
          </div>

          {(() => {
            const activeReg = regionalData.find((r) => r.id === activeRegionTab) || regionalData[0];
            return (
              <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-md space-y-3">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-[#9A3412] text-xs font-bold inline-block">
                  {isHindi ? activeReg.badgeHi : activeReg.badgeEn}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#24113D]">
                  {isHindi ? activeReg.nameHi : activeReg.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#24113D]/85 leading-relaxed">
                  {isHindi ? activeReg.descHi : activeReg.descEn}
                </p>
                <div className="text-xs font-semibold text-[#7C2D12] bg-amber-50 p-3 rounded-xl border border-amber-200">
                  ✨ {isHindi ? 'प्रमुख विशेषता: ' : 'Regional Highlight: '}
                  {isHindi ? activeReg.specialtyHi : activeReg.specialtyEn}
                </div>
              </div>
            );
          })()}
        </section>

        {/* SECTION 10: ECO-FRIENDLY GHAT & TERRACE KUND */}
        <section id="sec-eco-ghat-guide" className="scroll-mt-24 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D] flex items-center gap-2">
            <Waves size={24} className="text-sky-700" />
            <span>{isHindi ? '१०. पर्यावरण-संरक्षण, सुरक्षित घाट व छत कुंड मार्गदर्शन' : '10. Eco-Friendly River Stewardship & Home Terrace Kund Guide'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="font-serif font-bold text-base text-emerald-900 flex items-center gap-2">
                <Leaf size={18} className="text-emerald-700" />
                <span>{isHindi ? 'नदी तट स्वच्छता व जीरो-प्लास्टिक संकल्प' : 'Zero-Plastic River Stewardship'}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950/85 leading-relaxed">
                {isHindi
                  ? 'छठ मूलतः शून्य-प्लास्टिक उत्सव है। नदी में केवल दूध, जल, पुष्प पंखुड़ियां व बायो-डिग्रेडेबल वस्तुएं ही प्रवाहित करें; पॉलिथीन व थर्माकोल प्लेट कदापि न छोड़ें।'
                  : 'Chhath is inherently zero-plastic: bamboo baskets, clay lamps, and cloth carry zero waste. Never leave polythene bags, foam trays, or synthetic colors inside rivers or pond banks.'}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="font-serif font-bold text-base text-amber-950">
                {isHindi ? 'शहर की छत व आंगन में स्वच्छ अर्घ्य कुंड विधि' : 'Setting Up a Spotless Home Terrace Arghya Kund'}
              </div>
              <p className="text-xs sm:text-sm text-amber-950/85 leading-relaxed">
                {isHindi
                  ? 'यदि आस-पास सुरक्षित नदी न हो तो बालकनी या छत पर नया स्वच्छ टब या छोटा ईंट-टाइल कुंड बनाएं, गन्ना व आम के पत्ते बांधें, और प्रयोग के पश्चात शुद्ध जल पौधों की सिंचाई में उपयोग करें।'
                  : 'Fill a brand-new stainless tub or clean waterproof pool on a clean terrace, frame its corners with upright sugarcane stalks and marigold garlands, and repurpose the sacred Arghya water to nourish home garden plants afterward.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: FASCINATING VERIFIED FACTS */}
        <section id="sec-chhath-facts" className="scroll-mt-24 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '११. छठ महापर्व के रोचक व प्रामाणिक तथ्य' : '11. Fascinating Cultural & Historical Facts About Chhath Puja'}
          </h2>
          <div className="space-y-3">
            {[
              {
                titleEn: '1. Worshipped Twice Daily Without Intercessory Priests',
                titleHi: '१. बिना पुरोहित के सीधा प्रकृति-सूर्य पूजन',
                descEn: 'Every Vrati steps directly before nature reciting heartfelt prayers without needing specialized priests or costly temple rituals.',
                descHi: 'छठ ही ऐसा दुर्लभ वैदिक महापर्व है जिसमें किसी पुरोहित या जटिल मंत्रोच्चार की अनिवार्यता नहीं — भक्त सीधे जल व सूर्य के समक्ष आराधना करते हैं।',
              },
              {
                titleEn: '2. Honoring Both Sunsets and Sunrises Equally',
                titleHi: '२. अस्ताचल और उदयाचल सूर्य की समान वंदना',
                descEn: 'By offering Sandhya Arghya first, Chhath teaches universal gratitude for work accomplished as well as future beginnings.',
                descHi: 'पहले डूबते सूर्य को अर्घ्य देना विश्व संस्कृति को यह अनमोल संदेश देता है कि अस्त होता तेज भी उतना ही वंदनीय है जितना उगता हुआ।',
              },
              {
                titleEn: '3. Celebrated Twice Yearly (Kartiki & Chaiti Chhath)',
                titleHi: '३. वर्ष में दो बार — कार्तिकी एवं चैती छठ',
                descEn: 'Besides November’s Kartik Shukla Shashthi, devout households also observe Chaiti Chhath during spring (March/April) in alignment with both harvest transitions.',
                descHi: 'कार्तिक मास की शारदीय छठ के अतिरिक्त, अनेक श्रद्धालु चैत्र शुक्ल षष्ठी (मार्च-अप्रैल) को चैती छठ का भी कठोर पालन करते हैं।',
              },
              {
                titleEn: '4. Prasad Accepted Universally Regardless of Status',
                titleHi: '४. छठ प्रसाद मांगकर ग्रहण करने की समरसता',
                descEn: 'Humbly asking for Thekua prasad from neighbors — rich or humble alike — dissolves social ego across communities.',
                descHi: 'सुपरिचितों व पड़ोसियों से छठ का ठेकुआ प्रसाद हाथ पसार कर स्वीकार करने की परंपरा समाज में अहंकार मिटाकर बंधुत्व जगाती है।',
              },
            ].map((fact, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
                <span className="font-bold text-[#7C2D12] text-xs sm:text-sm block">
                  {isHindi ? fact.titleHi : fact.titleEn}
                </span>
                <p className="text-xs sm:text-sm text-[#24113D]/80 leading-relaxed">
                  {isHindi ? fact.descHi : fact.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 12: FAQ SECTION */}
        <section id="sec-chhath-faqs" className="scroll-mt-24 pt-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D] mb-6">
            {isHindi ? '१२. छठ पूजा २०२६ से जुड़े महत्वपूर्ण प्रश्नोत्तरी (FAQs)' : '12. Frequently Asked Questions About Chhath Puja 2026'}
          </h2>
          {festival.faqs && festival.faqs.length > 0 && (
            <TrilingualFAQSection
              faqs={festival.faqs}
              festivalNameEn={festival.nameEn}
              festivalNameHi={festival.nameHi}
              initialLang={isHindi ? 'hi' : isHinglish ? 'hinglish' : 'en'}
            />
          )}
        </section>
      </div>

      {/* Internal Discovery Hub & CTAs */}
      <div className="mt-14 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#2B1004] via-[#4D1C06] to-[#1A0D2E] text-[#FAF7F0] border-2 border-[#F59E0B]/40 shadow-2xl text-center space-y-5">
        <Sparkles size={28} className="text-[#FDE047] mx-auto animate-pulse" />
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDE047]">
          {isHindi ? 'छठ महापर्व २०२६ की पावन शुभकामनाएं भेजें' : 'Share Chhath Puja 2026 Greetings, Photo Cards & Wishes'}
        </h3>
        <p className="text-xs sm:text-sm text-amber-100/85 max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? '२५ खास सूर्य अर्घ्य व बांस सूप ग्रीटिंग कार्ड्स बनाएं, अपने परिवार की घाट फोटो को १० खास फ्रेम्स में सजाएं और १०० हिंदी-अंग्रेजी-हिंग्लिश संदेश तुरंत शेयर करें।'
            : 'Personalize 25 original Surya & River Ghat greeting cards, upload ghat portraits into 10 Chhath photo frames, and browse 100 trilingual Chhath wishes free in your browser.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/greetings/chhath-puja"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FDE047] to-[#F59E0B] text-[#2B1004] font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all min-h-[44px] flex items-center gap-2"
          >
            <Sun size={16} />
            <span>{isHindi ? '२५ छठ ग्रीटिंग कार्ड्स बनाएं' : 'Create Chhath Greeting Cards'}</span>
          </Link>
          <Link
            to="/photo-greetings/chhath-puja"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-[#FDE047]/40 font-semibold text-xs sm:text-sm transition-all min-h-[44px] flex items-center gap-2"
          >
            <Camera size={16} className="text-[#FDE047]" />
            <span>{isHindi ? '१० छठ फोटो फ्रेम कार्ड्स' : '10 Chhath Photo Frames'}</span>
          </Link>
          <Link
            to="/wishes/chhath-puja"
            className="px-5 py-3 rounded-xl bg-[#45216B] hover:bg-[#5C2B8F] text-[#FAF7F0] border border-[#FDE047]/40 font-semibold text-xs sm:text-sm shadow-md transition-all min-h-[44px] flex items-center gap-2"
          >
            <Heart size={16} className="text-[#FDE047]" />
            <span>{isHindi ? '१०० छठ शुभकामनाएं पढ़ें' : '100 Chhath Puja Wishes'}</span>
          </Link>
          <Link
            to="/festival-guides"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/25 font-semibold text-xs sm:text-sm transition-all min-h-[44px] flex items-center gap-2"
          >
            <Gift size={16} className="text-[#FDE047]" />
            <span>{isHindi ? 'सभी छठ लेख व गाइड्स' : 'All Chhath Ritual Articles'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};

