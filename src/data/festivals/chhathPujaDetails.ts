import type { FestivalDetail } from './types';

export interface ChhathDaySchedule {
  id: 'nahay-khay' | 'kharna' | 'sandhya-arghya' | 'usha-arghya';
  dayNumber: number;
  dateStr: string;
  startIso: string;
  endIso: string;
  tithiEn: string;
  tithiHi: string;
  titleEn: string;
  titleHi: string;
  titleHinglish: string;
  subtitleEn: string;
  subtitleHi: string;
  timingNoteEn: string;
  timingNoteHi: string;
  descEn: string;
  descHi: string;
  highlights: Array<{ en: string; hi: string }>;
  icon: string;
}

export const CHHATH_FOUR_DAY_SCHEDULE: ChhathDaySchedule[] = [
  {
    id: 'nahay-khay',
    dayNumber: 1,
    dateStr: '2026-11-13',
    startIso: '2026-11-13T00:00:00+05:30',
    endIso: '2026-11-13T23:59:59+05:30',
    tithiEn: 'Kartik Shukla Chaturthi • Nov 13, 2026',
    tithiHi: 'कार्तिक शुक्ल चतुर्थी • १३ नवम्बर २०२६',
    titleEn: 'Day 1: Nahay Khay',
    titleHi: 'प्रथम दिवस: नहाय-खाय',
    titleHinglish: 'Day 1: Nahay Khay',
    subtitleEn: 'Ceremonial Cleansing & First Satvik Meal',
    subtitleHi: 'पावन स्नान व सात्विक आहार से महाव्रत का शुभारंभ',
    timingNoteEn: 'Observed on Friday, Nov 13, 2026 (morning sacred bath followed by midday Satvik prasad).',
    timingNoteHi: 'शुक्रवार, १३ नवम्बर २०२६ को प्रातः पवित्र स्नान के पश्चात मध्याह्न में सात्विक भोजन ग्रहण।',
    descEn:
      'Chhath begins with thorough purification of the home and body. Vratis (devotees taking the vow) bathe in a holy river or clean water early in the morning, wear fresh garments, and prepare a strictly Satvik meal of bottle gourd (lauki/kadu), Bengal gram dal (chana dal), and arva rice cooked using rock salt (sendha namak) and pure ghee — with zero onion or garlic.',
    descHi:
      'चार दिवसीय छठ महापर्व का शुभारंभ नहाय-खाय के साथ होता है। प्रातः सूर्योदय काल में व्रती पवित्र नदी या स्वच्छ जल में स्नान कर घर की विशेष शुद्धि करते हैं। इसके पश्चात शुद्ध घी और सेंधा नमक से कद्दू (लौकी), चने की दाल व अरवा चावल का बिना लहसुन-प्याज का सात्विक भोजन बनाकर सर्वप्रथम सूर्य देव को भोग लगाकर ग्रहण किया जाता है।',
    highlights: [
      { en: 'Deep purification of house, kitchen & brassware', hi: 'घर, रसोई व पीतल-मिट्टी के बर्तनों की विशेष स्वच्छता' },
      { en: 'Preparing Lauki-Bhat & Chana Dal with Sendha Namak', hi: 'सेंधा नमक व शुद्ध घी में कद्दू-भात और चना दाल का प्रसाद' },
      { en: 'Buying raw bamboo Soop, Daura & fresh seasonal fruits', hi: 'बांस के नए सूप, दउरा और ताजे ऋतु फलों की खरीदारी' },
    ],
    icon: '🌿',
  },
  {
    id: 'kharna',
    dayNumber: 2,
    dateStr: '2026-11-14',
    startIso: '2026-11-14T00:00:00+05:30',
    endIso: '2026-11-14T23:59:59+05:30',
    tithiEn: 'Kartik Shukla Panchami • Nov 14, 2026',
    tithiHi: 'कार्तिक शुक्ल पंचमी • १४ नवम्बर २०२६',
    titleEn: 'Day 2: Kharna (Lohanda)',
    titleHi: 'द्वितीय दिवस: खरना (लोहंडा)',
    titleHinglish: 'Day 2: Kharna / Lohanda',
    subtitleEn: 'Evening Gur Kheer Prasad & Start of 36-Hour Nirjala Vrat',
    subtitleHi: 'गुड़ की खीर-रोटी का महाप्रसाद व ३६ घंटे के निर्जला व्रत का आरंभ',
    timingNoteEn: 'Observed on Saturday, Nov 14, 2026 (daylong fast until evening moon/sun prayer and prasad).',
    timingNoteHi: 'शनिवार, १४ नवम्बर २०२६ को दिनभर उपवास एवं सायंकाल मिट्टी के नए चूल्हे पर प्रसाद पूजन।',
    descEn:
      'On Panchami, the Vrati observes a silent fast without water throughout the day. In absolute quiet at sunset, sweet jaggery rice kheer (Rasiyaw), whole-wheat chapatis brushed with ghee, and bananas are cooked over an earthen stove fueled by mango wood. After Chhathi Maiya is worshipped indoors, this prasad is shared among family and neighbors — inaugurating the 36-hour unbroken Nirjala fast.',
    descHi:
      'कार्तिक शुक्ल पंचमी को व्रती दिन भर जल ग्रहण किए बिना शांत उपवास रखते हैं। संध्या समय एकांत में आम की लकड़ी और मिट्टी के नए चूल्हे पर गुड़-चावल की खीर (रसियाव), घी लगी रोटी और केला का प्रसाद तैयार होता है। छठी मैया को भोग अर्पित करने के बाद व्रती स्वयं प्रसाद ग्रहण कर परिवार व पड़ोसियों में बांटते हैं — यहीं से ३६ घंटे का कठिन निर्जला व्रत प्रारंभ होता है।',
    highlights: [
      { en: 'Cooking Rasiyaw kheer on earthen chulha with mango wood', hi: 'आम की लकड़ी व नए मिट्टी के चूल्हे पर गुड़ की खीर बनाना' },
      { en: 'Quiet indoor evening worship before distributing prasad', hi: 'शांत वातावरण में छठी मैया की आराधना व महाप्रसाद वितरण' },
      { en: 'Entering the 36-hour waterless Nirjala meditation', hi: 'उषा अर्घ्य तक चलने वाले ३६ घंटे के निर्जला महाव्रत का संकल्प' },
    ],
    icon: '🥣',
  },
  {
    id: 'sandhya-arghya',
    dayNumber: 3,
    dateStr: '2026-11-15',
    startIso: '2026-11-15T00:00:00+05:30',
    endIso: '2026-11-15T23:59:59+05:30',
    tithiEn: 'Kartik Shukla Shashthi • Nov 15, 2026 (Main Day)',
    tithiHi: 'कार्तिक शुक्ल षष्ठी • १५ नवम्बर २०२६ (मुख्य दिवस)',
    titleEn: 'Day 3: Sandhya Arghya',
    titleHi: 'तृतीय दिवस: संध्या अर्घ्य',
    titleHinglish: 'Day 3: Sandhya Arghya (Main Day)',
    subtitleEn: 'Evening Arghya to the Setting Sun Along Sacred River Ghats',
    subtitleHi: 'पावन घाट पर अस्ताचलगामी सूर्य देव को प्रथम अर्घ्य समर्पण',
    timingNoteEn:
      'Observed Sunday, Nov 15, 2026. Exact sunset Arghya timing varies by city & longitude — verify local sunset time for your city.',
    timingNoteHi:
      'रविवार, १५ नवम्बर २०२६ को मुख्य संध्या अर्घ्य। सूर्यास्त का सटीक समय हर शहर व देशांतर के अनुसार भिन्न होता है — कृपया स्थानीय सूर्यास्त देखें।',
    descEn:
      'Families prepare woven bamboo Daura baskets filled with hand-stamped Thekua, rice laddu (Kasar), sugarcane stalks with leafy tops, whole coconut, pomelo (Dabh nimbu), radish, ginger, and turmeric plants. Carrying the heavy Daura barefoot atop their heads while singing timeless folk songs, devotees gather at rivers, ponds, or neighborhood tanks. Standing knee-deep in water facing west, they offer milk and river water to the setting sun.',
    descHi:
      'संध्या अर्घ्य के दिन सूप व बांस के दउरे में ठेकुआ, कसार, पत्तेदार गन्ना, नारियल, डाभ नींबू, सुथनी, हल्दी-अदरक के पौधे व मौसमी फल सजाए जाते हैं। पुरुष सिर पर दउरा रखकर नंगे पांव व महिलाएं मंगल छठ गीत गाते हुए नदी, तालाब या कुंड पर पहुंचती हैं। पश्चिम दिशा में डूबते सूर्य देव को दूध व पावन जल से अर्घ्य समर्पित किया जाता है, व अनेक परिवार रात्रि में कोसी भराई करते हैं।',
    highlights: [
      { en: 'Thekua preparation and arranging bamboo Soop & Daura', hi: 'घी-गुड़ के ठेकुआ बनाना व बांस के सूप-दउरे में फल सजाना' },
      { en: 'Offering Arghya in waist-deep water before sunset', hi: 'सूर्यास्त से पूर्व जल में खड़े होकर भगवान भास्कर को अर्घ्य' },
      { en: 'Overnight Kosi Bharai lamp rituals under sugarcane canopy', hi: 'रात्रि में गन्ने के मंडप के नीचे कोसी भराई व दीपदान' },
    ],
    icon: '🌇',
  },
  {
    id: 'usha-arghya',
    dayNumber: 4,
    dateStr: '2026-11-16',
    startIso: '2026-11-16T00:00:00+05:30',
    endIso: '2026-11-16T23:59:59+05:30',
    tithiEn: 'Kartik Shukla Saptami • Nov 16, 2026',
    tithiHi: 'कार्तिक शुक्ल सप्तमी • १६ नवम्बर २०२६',
    titleEn: 'Day 4: Usha Arghya & Parana',
    titleHi: 'चतुर्थ दिवस: उषा अर्घ्य व पारण',
    titleHinglish: 'Day 4: Usha Arghya & Parana',
    subtitleEn: 'Dawn Arghya to the Rising Sun, Sindoor-Tika & Breaking the Fast',
    subtitleHi: 'उगते सूर्य को प्रातः अर्घ्य, मंगल आशीष व पावन पारण समापन',
    timingNoteEn:
      'Observed Monday, Nov 16, 2026. Exact sunrise Arghya timing varies by city & longitude — verify local sunrise time for your city.',
    timingNoteHi:
      'सोमवार, १६ नवम्बर २०२६ को प्रातः उषा अर्घ्य व पारण। सूर्योदय का सटीक समय अपने शहर के पंचांग अनुसार देखें।',
    descEn:
      'Long before first light, families return to the riverbanks singing dawn hymns. As golden rays touch the eastern horizon, Vratis stand in cold morning water to offer final Usha Arghya with cow’s milk and sacred water. Returning home after bowing at the river shore temple (Sirsopta), the Vrati breaks their 36-hour fast with a piece of fresh ginger, jaggery, and sharbat (Parana), distributing Thekua prasad universally.',
    descHi:
      'प्रातः सूर्योदय से काफी पहले ही परिवार पुनः घाट पर एकत्र होकर गीत गाते हैं। पूर्व क्षितिज पर लालिमा छाते ही व्रती शीतल जल में खड़े होकर उगते भगवान भास्कर को अंतिम उषा अर्घ्य समर्पित करते हैं। घाट की छठ माता वेदी (सिरसोपता) पर पूजन व परस्पर सिंदूर-टीका के बाद घर लौटकर व्रती अदरक, गुड़ व शर्बत ग्रहण कर ३६ घंटे के महाव्रत का पारण करते हैं तथा ठेकुआ प्रसाद सबमें बांटा जाता है।',
    highlights: [
      { en: 'Pre-dawn arrival & final Arghya facing east at sunrise', hi: 'भोर में पूर्व दिशा की ओर उगते सूर्य देव को अंतिम अर्घ्य' },
      { en: 'Traditional Sirsopta worship & married women’s Sindoor blessing', hi: 'घाट पर सिरसोपता पूजन एवं अखंड सौभाग्य हेतु सिंदूर दान' },
      { en: 'Completing 36-hour fast (Parana) with ginger & sharing prasad', hi: 'अदरक-गुड़ से पारण संपन्न कर सर्वजन में ठेकुआ प्रसाद वितरण' },
    ],
    icon: '🌅',
  },
];

export interface ChhathPhaseStatus {
  phase: 'upcoming' | 'day-1' | 'day-2' | 'day-3' | 'day-4' | 'concluded';
  activeDayNumber: number | null;
  activeSchedule: ChhathDaySchedule | null;
  nextSchedule: ChhathDaySchedule | null;
  targetTimestamp: number;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
  labelEn: string;
  labelHi: string;
  subEn: string;
  subHi: string;
}

export function getChhathPhaseStatus(now: Date = new Date()): ChhathPhaseStatus {
  const nowMs = now.getTime();
  const d1Start = new Date(CHHATH_FOUR_DAY_SCHEDULE[0].startIso).getTime();
  const d4End = new Date(CHHATH_FOUR_DAY_SCHEDULE[3].endIso).getTime();

  const computeDelta = (targetMs: number) => {
    const diff = Math.max(0, targetMs - nowMs);
    return {
      daysLeft: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hoursLeft: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutesLeft: Math.floor((diff / 1000 / 60) % 60),
      secondsLeft: Math.floor((diff / 1000) % 60),
    };
  };

  if (nowMs < d1Start) {
    const delta = computeDelta(d1Start);
    return {
      phase: 'upcoming',
      activeDayNumber: null,
      activeSchedule: null,
      nextSchedule: CHHATH_FOUR_DAY_SCHEDULE[0],
      targetTimestamp: d1Start,
      ...delta,
      labelEn: 'Upcoming 4-Day Mahaparv — Begins with Nahay Khay (Nov 13, 2026)',
      labelHi: 'आगामी चार दिवसीय महापर्व — शुभारंभ नहाय-खाय (१३ नवम्बर २०२६)',
      subEn: 'Countdown to Day 1 (Nahay Khay start in IST):',
      subHi: 'प्रथम दिवस (नहाय-खाय) प्रारंभ होने में शेष समय:',
    };
  }

  for (let i = 0; i < CHHATH_FOUR_DAY_SCHEDULE.length; i++) {
    const day = CHHATH_FOUR_DAY_SCHEDULE[i];
    const startMs = new Date(day.startIso).getTime();
    const endMs = new Date(day.endIso).getTime();
    if (nowMs >= startMs && nowMs <= endMs) {
      const nextDay = CHHATH_FOUR_DAY_SCHEDULE[i + 1] || null;
      const targetMs = nextDay ? new Date(nextDay.startIso).getTime() : endMs;
      const delta = computeDelta(targetMs);
      const phaseKeys: Array<ChhathPhaseStatus['phase']> = ['day-1', 'day-2', 'day-3', 'day-4'];
      return {
        phase: phaseKeys[i],
        activeDayNumber: day.dayNumber,
        activeSchedule: day,
        nextSchedule: nextDay,
        targetTimestamp: targetMs,
        ...delta,
        labelEn: `Live Today — ${day.titleEn} (${day.tithiEn})`,
        labelHi: `आज का पावन दिवस — ${day.titleHi} (${day.tithiHi})`,
        subEn: nextDay
          ? `Time until ${nextDay.titleEn} begins:`
          : 'Usha Arghya & Parana — Final Sacred Day Today',
        subHi: nextDay
          ? `आगामी ${nextDay.titleHi} आरंभ होने में शेष:`
          : 'उषा अर्घ्य एवं पारण — चार दिवसीय महापर्व का समापन दिवस',
      };
    }
  }

  return {
    phase: 'concluded',
    activeDayNumber: null,
    activeSchedule: null,
    nextSchedule: null,
    targetTimestamp: d4End,
    daysLeft: 0,
    hoursLeft: 0,
    minutesLeft: 0,
    secondsLeft: 0,
    labelEn: 'Chhath Puja 2026 (Nov 13–16) Has Concluded',
    labelHi: 'छठ महापर्व २०२६ (१३–१६ नवम्बर) संपन्न हुआ',
    subEn: 'Kartik Shukla Chhath dates shift yearly with the Vedic lunar calendar.',
    subHi: 'वैदिक चंद्र पंचांग के अनुसार आगामी वर्ष की तिथियाँ कार्तिक शुक्ल पक्ष में घोषित होंगी।',
  };
}

export const CHHATH_PUJA_DETAIL: FestivalDetail = {
  id: 'chhath-puja',
  nameEn: 'Chhath Puja',
  nameHi: 'छठ पूजा (महापर्व)',
  regionalAliases: ['Chhath Mahaparv', 'Surya Shashthi', 'Dala Chhath', 'Chhath Parv'],
  tithiEn: 'Kartik Shukla Shashthi • Nov 13 – Nov 16, 2026',
  tithiHi: 'कार्तिक शुक्ल षष्ठी • १३ – १६ नवम्बर २०२६',
  taglineEn:
    'Four sacred days of purity, self-discipline, folk melodies, and timeless gratitude to Surya Bhagwan and Chhathi Maiya.',
  taglineHi:
    'भगवान सूर्य देव और षष्ठी मैया की पावन उपासना, लोक आस्था, पवित्रता व प्रकृति-वंदना का चार दिवसीय महापर्व।',
  hinglishTagline: '4 Pawan Din — Nahay Khay, Kharna, Sandhya Arghya aur Usha Arghya • Surya Dev & Chhathi Maiya',
  accentColor: '#F97316',
  secondaryColor: '#EA580C',
  bgGradient: 'from-[#2A0E05] via-[#5C2008] to-[#17091C]',
  heroMotif: 'chhath-arghya',

  about: {
    summaryEn:
      'Chhath Puja is an ancient four-day Vedic festival celebrated predominantly across Bihar, Jharkhand, Eastern Uttar Pradesh, Nepal’s Terai region, and vibrant Indian diaspora communities worldwide. Unlike rituals focused inside ornate temples, Chhath takes place outdoors under open skies — by flowing rivers, sacred ponds, and sunlit terraces — honoring Lord Surya (the Sun God, sustainer of all life) and his sister Chhathi Maiya (Mata Shashthi, protector of children, family health, and cosmic balance).',
    summaryHi:
      'छठ पूजा सनातन संस्कृति के प्राचीनतम सूर्य-उपासना महापर्वों में से एक है, जो मुख्यतः बिहार, झारखंड, पूर्वी उत्तर प्रदेश, नेपाल के तराई क्षेत्र व विश्व भर में बसे प्रवासी भारतीयों द्वारा असीम श्रद्धा से मनाया जाता है। खुले आकाश के नीचे नदियों व सरोवरों के तट पर संपन्न होने वाला यह अनुपम चार दिवसीय पर्व जीवनदाता भगवान सूर्यदेव तथा उनकी मानस बहन षष्ठी मैया (संतान रक्षक व आरोग्य प्रदायिनी) को समर्पित है।',
    culturalSignificanceEn:
      'Chhath stands apart for three rare ethical pillars: absolute ecological purity (no single-use plastics — every offering uses woven bamboo, earthen clay, mango wood, and local fruits), deep social equality (worshippers stand barefoot side by side without caste barriers and share prasad freely with everyone), and rare philosophical gratitude — bowing to the setting sun during Sandhya Arghya before welcoming the rising sun on Usha Arghya.',
    culturalSignificanceHi:
      'छठ महापर्व तीन अद्भुत जीवन-मूल्यों के लिए अद्वितीय है: प्रथम, संपूर्ण पर्यावरण-मित्र शुद्धता (केवल बांस के सूप, मिट्टी के दीये व ताजे प्राकृतिक फल); द्वितीय, सामाजिक समरसता (बिना किसी भेदभाव या पुरोहित के सीधे प्रकृति के समक्ष वंदना व प्रसाद ग्रहण); और तृतीय, जीवन का गहरा दर्शन — जहां उगते सूर्य से पहले डूबते सूर्य को अर्घ्य देकर हर परिस्थिति के प्रति कृतज्ञता व्यक्त की जाती है।',
    historyEn:
      'Descriptions of solar worship appear prominently in Rigvedic hymns addressed to Savitr and Usha. In epic traditions, sage-warriors and queens performed Shashthi austerity: Angaraj Karna, legendary King of Anga (modern Bhagalpur/Munger region), stood waist-deep in the Ganga offering daily prayers to his father Lord Surya; Draupadi and the Pandavas observed Chhath for strength and restoration during exile; and in Munger’s heritage tradition, Maa Sita performed Surya Shashthi worship on the sacred rocks of the Ganga after returning from Lanka.',
    historyHi:
      'छठ की जड़ें ऋग्वेद के सूर्य व उषा सूक्तों में मिलती हैं। पौराणिक व ऐतिहासिक कथाओं के अनुसार अंग प्रदेश (आधुनिक मुंगेर व भागलपुर क्षेत्र) के राजा दानवीर कर्ण प्रतिदिन गंगा जल में कमर तक खड़े होकर सूर्य देव की उपासना करते थे। महाभारत काल में द्रौपदी ने पांडवों के कष्ट निवारण हेतु यह पावन व्रत रखा, तथा वाल्मीकि व लोक परंपरा के अनुसार लंका विजय के उपरांत मुंगेर स्थित सीता चरण मंदिर के तट पर माता सीता ने भी कार्तिक छठ पूजा संपन्न की थी।',
    keyThemes: [
      { en: 'Absolute Purity & Zero Waste', hi: 'पूर्ण सात्विकता व पर्यावरण शुद्धता', icon: '🌿' },
      { en: '36-Hour Nirjala Discipline', hi: '३६ घंटे का अखंड निर्जला महाव्रत', icon: '🙏' },
      { en: 'Gratitude to Setting & Rising Sun', hi: 'अस्ताचल व उदयाचल सूर्य की समान वंदना', icon: '🌅' },
      { en: 'Community Service & Equality', hi: 'साझा घाट सज्जा व सर्वजन प्रसाद', icon: '🤝' },
    ],
  },

  traditions: [
    {
      id: 'samagri-bamboo-daura',
      titleEn: 'Preparing the Sacred Bamboo Daura & Soop',
      titleHi: 'बांस के दउरे और सूप की पवित्र सज्जा',
      descEn:
        'A week before Kartik Shukla Chaturthi, families purchase brand-new handwoven bamboo baskets (Daura/Dala) and winnowing trays (Soop), brass kalash, sugarcane stalks with green leaves attached, coconuts, oranges, apples, whole turmeric/ginger stems, suthni (sweet roots), and Dabh Nimbu (giant pomelo citrus).',
      descHi:
        'छठ से सप्ताह भर पूर्व परिवार बांस से बुने नए दउरा व सूप, पीतल का अर्घ्य पात्र, जड़ व पत्तों सहित लंबा गन्ना, जटा वाला नारियल, डाभ नींबू (बड़ा चकोतरा), सुथनी, कच्ची हल्दी-अदरक के पौधे, सिंघाड़ा व मौसमी फल संकलित करते हैं।',
      customs: [
        { en: 'Even wheat for Thekua is washed clean, sun-dried on clean cloth, and stone-milled exclusively for Chhath.', hi: 'ठेकुआ का गेहूं भी शुद्ध जल से धोकर, खुले आंगन में स्वच्छ कपड़े पर सुखाकर अलग से पिसवाया जाता है।' },
        { en: 'Whole clusters of yellow and green bananas stand as emblems of prosperity and continuity.', hi: 'केले का पूरा घौद (गुच्छा) वंश वृद्धि व समृद्धि के प्रतीक के रूप में अर्पित किया जाता है।' },
      ],
      icon: '🧺',
    },
    {
      id: 'folk-songs-tradition',
      titleEn: 'Soulful Chhath Folk Songs Across Generations',
      titleHi: 'पीढ़ियों से गूंजते छठ के पावन लोकगीत',
      descEn:
        'Chhath does not rely on loud DJ music or firecrackers. Instead, women gather in courtyards and walk calmly to the ghat singing hauntingly tender Bhojpuri, Maithili, Magahi, and Angika folk hymns — pleading tenderly with Chhathi Maiya and Surya Dev without ritual formality.',
      descHi:
        'छठ महापर्व में शोर-शराबे या आतिशबाजी के स्थान पर स्त्रियों के मधुर कंठ से निकली लोकगीतों की सरिता बहती है। गेहूं सुखाने से लेकर दउरा ले जाने व अर्घ्य देने तक मैथिली, भोजपुरी, मगही व अंगिका के पारंपरिक गीत वातावरण को दिव्य बना देते हैं।',
      customs: [
        { en: 'Classic songs include "Kaanch Hi Baans Ke Bahangiya" and "Kelwa Ke Paat Par Ugalan Suraj Mal".', hi: '"कांच ही बांस के बहंगिया" और "केलवा के पात पर उगलन सूरज मल" जैसे गीत हर घर में गाए जाते हैं।' },
        { en: 'Folk legends like Sharda Sinha Ji made these rural melodies cherished globally across Indian homes.', hi: 'पद्मभूषण शारदा सिन्हा जी के स्वरों ने इन लोकगीतों को विश्व भर में हर भारतीय घर की आत्मा से जोड़ा।' },
      ],
      icon: '🎶',
    },
    {
      id: 'kosi-bharai-ceremony',
      titleEn: 'Kosi Bharai Ceremony Under Sugarcane Canopy',
      titleHi: 'संध्या अर्घ्य पश्चात पावन कोसी भराई अनुष्ठान',
      descEn:
        'Families fulfilling special vows perform Kosi Bharai on Sandhya Arghya night. Four or more tall leafy sugarcane stalks are tied at the top into a pyramid canopy; a multi-spout earthen pot (Kosi) filled with sweet offerings and lighted diyas rests beside water at dawn and dusk while devotional songs continue.',
      descHi:
        'विशिष्ट मनौती पूरी होने पर श्रद्धालु संध्या अर्घ्य की रात कोसी भराई करते हैं। ४ से ७ लंबे पत्तेदार गन्नों को ऊपर से बांधकर मंडप बनाया जाता है, जिसके मध्य मिट्टी के बड़े कोसी पात्र में ठेकुआ, फल व अनेक दीये सजाकर पूरी रात जगराता व भजन किया जाता है।',
      customs: [
        { en: 'Also repeated near the riverbed in pre-dawn darkness before Usha Arghya begins.', hi: 'प्रातः उषा अर्घ्य से ठीक पहले घाट की रेत पर पुनः कोसी के दीप प्रज्वलित किए जाते हैं।' },
      ],
      icon: '🎋',
    },
    {
      id: 'ghat-sanitation-seva',
      titleEn: 'Voluntary Street Sweeping & Ghat Hospitality',
      titleHi: 'स्वच्छ पथ सेवा व निःस्वार्थ घाट व्यवस्था',
      descEn:
        'For two days ahead of Sandhya Arghya, youth groups, neighbors, and families sweep lanes clean with brooms, sprinkle water, line paths with bright rangoli or flower petals, and build smooth earthen ramps down to rivers and neighborhood rooftop pools so bare-footed Vratis walk comfortably.',
      descHi:
        'नहाय-खाय से ही मोहल्ले के युवा, पड़ोसी व परिवार जन मिलकर सड़कों व घाट की सीढ़ियों की स्वतः सफाई करते हैं, पानी का छिड़काव करते हैं और मार्ग में तोरण व प्रकाश सजाते हैं ताकि नंगे पांव जाने वाले व्रतियों को किसी प्रकार का कष्ट न हो।',
      customs: [
        { en: 'Free stalls offering hot water, camphor, milk for Arghya, and first-aid support spring up at public ghats.', hi: 'सार्वजनिक घाटों पर सेवा समितियां निःशुल्क गाय का दूध, गंगाजल, चिकित्सा व प्रकाश की व्यवस्था करती हैं।' },
      ],
      icon: '🧹',
    },
  ],

  decorations: [
    {
      id: 'chhath-sugarcane-mandap',
      titleEn: 'Courtyard & Terrace Kund Sugarcane Canopy',
      titleHi: 'आंगन या छत पर गन्ने का पावन मंडप व कुंड सज्जा',
      descEn:
        'For families performing Chhath from apartment terraces or courtyards, create a clean water pool framed with banana stems, upright leafy sugarcane bundles, marigold garlands, and clay diyas safely spaced along the rim.',
      descHi:
        'शहरों में घर की छत या आंगन में स्वच्छ जल कुंड तैयार कर उसके चारों ओर केले के खंभे, पत्तों सहित सीधे गन्ने, गेंदे के ताजे फूलों की माला व किनारों पर मिट्टी के दीये सजाएं।',
      tipEn: 'Place a bright rice-flour (aripan) or marigold rangoli facing east right beside the Arghya stand.',
      tipHi: 'अर्घ्य देने के स्थान के ठीक बगल में पूर्व दिशा की ओर चावल के आटे (अरिपन) या गेंदे के फूलों की रंगोली सजाएं।',
      tagEn: 'Ghat & Terrace',
      tagHi: 'घाट व छत सज्जा',
    },
    {
      id: 'chhath-aripan-floor-art',
      titleEn: 'Traditional Rice-Paste Aripan (Alpana)',
      titleHi: 'चावल के घोल से पारंपरिक अरिपन व स्वास्तिक सज्जा',
      descEn:
        'In Bihar and Mithila homes, courtyards and ghat altars (Sirsopta) are decorated with white rice-flour paste (Pithar) dipped in fingers to draw cosmic sun circles, lotus petals, and auspicious doorways.',
      descHi:
        'बिहार व मिथिला परंपरा में पूजा वेदी व घाट के चबूतरे (सिरसोपता) को भिंगोए हुए अरवा चावल के सफेद घोल (पिठार) से बनी अष्टदल कमल व सूर्य किरणों की अरिपन कला से सजाया जाता है।',
      tipEn: 'Always prefer soaked raw rice paste, haldi, and fresh marigold petals near riverbanks instead of chemical dyes.',
      tipHi: 'नदी व तालाब किनारे रासायनिक रंगों के बजाय शुद्ध चावल का घोल, हल्दी व पुष्प पंखुड़ियां ही प्रयोग करें।',
      tagEn: 'Eco Folk Art',
      tagHi: 'सात्विक लोक कला',
    },
    {
      id: 'chhath-diya-path',
      titleEn: 'Earthen Diya Pathway & Brass Kalash Altar',
      titleHi: 'मिट्टी के दीपकों का पथ व ताम्र-पीतल कलश वेदी',
      descEn:
        'Line the household entrance and balcony rails with steady mustard-oil earthen diyas during Sandhya and dawn hours to welcome Surya Bhagwan with pure natural glow.',
      descHi:
        'संध्या अर्घ्य और भोर के समय घर के मुख्य द्वार व आंगन में सरसों या शुद्ध घी के मिट्टी के दीये कतार में प्रज्वलित कर भगवान भास्कर का स्वागत करें।',
      tipEn: 'Ensure open cotton wicks and diyas stay away from dry mango leaves or sugarcane curtains.',
      tipHi: 'दीयों को सूखे गन्ने के पत्तों या पर्दों से सुरक्षित दूरी पर मिट्टी अथवा पीतल की थाली में रखें।',
      tagEn: 'Sacred Lighting',
      tagHi: 'पावन दीपदान',
    },
  ],

  recipes: [
    {
      id: 'chhath-thekua',
      nameEn: 'Crisp Whole-Wheat Jaggery Thekua (Mahaprasad)',
      nameHi: 'खस्ता गुड़ व शुद्ध घी का महाप्रसाद ठेकुआ',
      typeEn: 'Signature Chhath Mahaprasad',
      typeHi: 'छठ महापर्व का प्रमुख प्रसाद',
      timeEn: '35 Mins Prep • 25 Mins Fry',
      timeHi: '३५ मिनट तैयारी • २५ मिनट तलना',
      descEn:
        'Crisp on the outside and tender-crumbly within, stamped whole-wheat biscuits sweetened purely with melted organic jaggery (gur), fennel seeds, dry grated coconut, and green cardamom.',
      descHi:
        'सौंफ, कसा हुआ सूखा नारियल, इलायची व शुद्ध गुड़ के घोल से गूंथे मोटे गेहूं के आटे से सांचे पर उकेरा गया, देसी घी में धीमी आंच पर तला हुआ पारंपरिक ठेकुआ।',
      ingredients: [
        { en: '2 cups Whole Wheat Flour (washed & sun-dried)', hi: '२ कप शुद्ध धुला हुआ गेहूं का आटा' },
        { en: '3/4 cup Crushed Jaggery (Gur) melted in 1/3 cup water', hi: 'तीन चौथाई कप शुद्ध गुड़ (गुनगुने पानी में घुला)' },
        { en: '4 tbsp Pure Cow Ghee (for moyan + frying ghee)', hi: '४ बड़े चम्मच शुद्ध गाय का घी (मोयन व तलने हेतु)' },
        { en: '2 tbsp Dry Coconut chips, 1 tbsp Fennel & Cardamom', hi: '२ चम्मच सूखे नारियल टुकड़े, सौंफ व कुटी इलायची' },
      ],
      steps: [
        {
          en: 'Rub ghee thoroughly into wheat flour, fennel seeds, crushed cardamom, and thin coconut pieces until crumbly.',
          hi: 'आटे में मोयन का शुद्ध घी, सौंफ, इलायची व नारियल की कतरन डालकर मुट्ठी बंधने तक मसलें।',
        },
        {
          en: 'Bind gradually using strained jaggery water into a very tight, dry-stiff dough; shape small ovals and press onto wooden Thekua molds (Sancho).',
          hi: 'छने हुए गुड़ के पानी से थोड़ा-थोड़ा करते हुए सख्त आटा बांधें; लोइयां बनाकर लकड़ी के सांचे (ठेकुआ ठप्पा) पर दबाकर सुंदर आकृति उभारें।',
        },
        {
          en: 'Deep-fry slowly in medium-warm pure ghee on low flame until rich mahogany golden and cool completely before placing in Daura.',
          hi: 'धीमी आंच पर शुद्ध घी में सुनहरा-भूरा व खस्ता होने तक तलें; ठंडा होने के बाद सूप-दउरे में सजाएं।',
        },
      ],
    },
    {
      id: 'chhath-rasiyaw',
      nameEn: 'Kharna Rasiyaw (Aromatic Gur Kheer)',
      nameHi: 'खरना का पारंपरिक रसियाव (गुड़ की खीर)',
      typeEn: 'Day 2 Sacred Fast Prasad',
      typeHi: 'खरना संध्या महाप्रसाद',
      timeEn: '40 Mins Slow Simmer',
      timeHi: '४० मिनट धीमी आंच पाक',
      descEn:
        'Velvety rice pudding simmered in fresh whole milk using aromatic Saathi (short-grain red/new harvest) rice and stirred with pure dark jaggery after removing from heat so the milk stays silky without curdling.',
      descHi:
        'नए साठी या छोटे चावल को गाढ़े दूध में धीमी आंच पर पकाकर, आंच से उतारने के पश्चात शुद्ध गुड़ व इलायची मिलाकर तैयार किया गया सुगंधित खरना रसियाव।',
      ingredients: [
        { en: '1 liter Full-Cream Fresh Cow Milk', hi: '१ लीटर शुद्ध गाय का फुल-क्रीम दूध' },
        { en: '1/2 cup Washed Saathi or short-grain raw rice', hi: 'आधा कप धुले साठी या छोटे अरवा चावल' },
        { en: '3/4 cup Finely grated pure sugarcane jaggery (Gur)', hi: 'तीन चौथाई कप कद्दूकस किया शुद्ध देसी गुड़' },
        { en: '1/2 tsp Green Cardamom & roasted cashews-raisins', hi: 'आधा छोटा चम्मच इलायची पाउडर व मेवे' },
      ],
      steps: [
        {
          en: 'Bring milk to a gentle boil, add soaked rice, and simmer slowly stirring continuously until grains become tender and creamy.',
          hi: 'दूध में उबाल आने पर भीगे चावल डालें और धीमी आंच पर लगातार चलाते हुए गाढ़ा व मलाईदार होने तक पकाएं।',
        },
        {
          en: 'Turn off heat completely, let milk cool slightly for 3-4 minutes (crucial step to prevent curdling!), then fold in grated jaggery & cardamom.',
          hi: 'चूल्हे से नीचे उतारकर ३-४ मिनट हल्का ठंडा होने दें (ताकि दूध फटे नहीं!), फिर गुड़ व इलायची अच्छी तरह मिला दें।',
        },
        {
          en: 'Serve beside soft ghee-brushed wheat rotis as Kharna prasad.',
          hi: 'शुद्ध घी लगी नरम गेहूं की रोटी व पके केले के साथ छठी मैया को भोग लगाकर परोसें।',
        },
      ],
    },
    {
      id: 'chhath-kadu-bhat',
      nameEn: 'Nahay Khay Lauki (Kadu-Bhat) & Chana Dal',
      nameHi: 'नहाय-खाय का सात्विक कद्दू-भात व चना दाल',
      typeEn: 'Day 1 Cleansing Meal',
      typeHi: 'प्रथम दिवस सात्विक भोजन',
      timeEn: '30 Mins Cook',
      timeHi: '३० मिनट पाक विधि',
      descEn:
        'Light, soothing bottle gourd curry tempered only with cumin, ghee, green chilli, and rock salt (Sendha Namak), served alongside boiled Bengal gram dal and fragrant arva rice.',
      descHi:
        'शुद्ध देसी घी, जीरा, हरी मिर्च और सेंधा नमक से बनी हल्की सुपाच्य लौकी की सब्जी, चने की दाल व ताजे अरवा चावल का पावन नहाय-खाय भोग।',
      ingredients: [
        { en: '500g Fresh tender Bottle Gourd (Lauki/Kadu), cubed', hi: '५०० ग्राम ताजी मुलायम लौकी (छिलकर कटी)' },
        { en: '1/2 cup Soaked Chana Dal + 1 tbsp Ghee & Cumin', hi: 'आधा कप भीगी चना दाल, १ बड़ा चम्मच घी व जीरा' },
        { en: 'Rock Salt (Sendha Namak) & turmeric powder only', hi: 'केवल शुद्ध सेंधा नमक, हल्दी व हरी मिर्च' },
        { en: '1.5 cups Steamed clean Arva rice', hi: 'डेढ़ कप साफ अरवा चावल भात' },
      ],
      steps: [
        {
          en: 'Heat ghee in an earthen or clean brass/steel pan; temper cumin seeds and mild green chillies.',
          hi: 'स्वच्छ कड़ाही में शुद्ध घी गर्म कर जीरा और हरी मिर्च चटकाएं।',
        },
        {
          en: 'Add bottle gourd cubes, soaked chana dal, turmeric, and Sendha Namak; cover and slow-cook in natural moisture until tender.',
          hi: 'कटी लौकी, चना दाल, हल्दी व सेंधा नमक डालकर ढक दें और धीमी आंच पर लौकी के अपने जल में गलने तक पकाएं।',
        },
        {
          en: 'Offer first to Lord Surya before serving hot with steamed Arva rice.',
          hi: 'भगवान भास्कर को नैवेद्य अर्पित कर गरमा-गरम अरवा भात के साथ सपरिवार ग्रहण करें।',
        },
      ],
    },
    {
      id: 'chhath-kasar-laddoo',
      nameEn: 'Aromatic Rice-Flour Kasar Laddoo',
      nameHi: 'सुगंधित चावल-आटा कसार लड्डू',
      typeEn: 'Traditional Parana Sweet',
      typeHi: 'अर्घ्य व पारण मिष्ठान',
      timeEn: '25 Mins Cook',
      timeHi: '२५ मिनट विधि',
      descEn:
        'Traditional sweet-spiced laddoos made by gently roasting clean rice flour in pure cow ghee with jaggery, fennel seeds, and ginger powder — cherished inside the Arghya Soop and at Parana.',
      descHi:
        'चावल के आटे को धीमी आंच पर घी में भूनकर गुड़, सौंफ और हल्की सोंठ मिलाकर बने पारंपरिक कसार लड्डू जो सूप में रखे जाते हैं व पारण पर खाए जाते हैं।',
      ingredients: [
        { en: '2 cups Clean raw rice flour (dry roasted lightly)', hi: '२ कप अरवा चावल का आटा' },
        { en: '1 cup Crushed Jaggery + 4 tbsp Desi Ghee', hi: '१ कप देसी गुड़ व ४ चम्मच शुद्ध घी' },
        { en: '1 tbsp Roasted Fennel seeds & pinch Dry Ginger (Sonth)', hi: '१ चम्मच सौंफ व एक चुटकी सोंठ पाउडर' },
      ],
      steps: [
        {
          en: 'Dry-roast rice flour gently on low flame until aromatic without browning too dark; fold in melted ghee.',
          hi: 'चावल के आटे को धीमी आंच पर हल्की खुशबू आने तक भूनें (रंग बहुत काला न करें) और घी मिलाएं।',
        },
        {
          en: 'Mix finely crumbled jaggery, fennel, and ginger into warm flour and roll gently with damp palms into soft spheres.',
          hi: 'हल्के गुनगुने मिश्रण में बारीक गुड़, सौंफ और सोंठ मिलाकर हाथ से गोल-गोल कसार लड्डू बांध लें।',
        },
      ],
    },
  ],

  gifts: [
    {
      id: 'gift-brass-arghya-kalash',
      titleEn: 'Engraved Copper & Brass Surya Arghya Vessel Set',
      titleHi: 'शुद्ध तांबे व पीतल का सूर्य अर्घ्य कलश व सूप थाली',
      recipientTypeEn: 'Elders & Devotees',
      recipientTypeHi: 'वरिष्ठजन व व्रती',
      descEn:
        'Handcrafted solid brass or copper Arghya lota paired with an etched Puja thali — used every morning for lifelong Surya Jal offerings even beyond Chhath.',
      descHi:
        'नक्काशीदार तांबे व पीतल का अर्घ्य लोटा और पूजन थाली, जो न केवल छठ बल्कि प्रतिदिन सूर्योदय अर्घ्य व गृह पूजन में जीवन भर काम आती है।',
      budgetRange: '₹500 – ₹1,800',
    },
    {
      id: 'gift-vrati-cotton-silk-vastra',
      titleEn: 'Handloom Kosa Silk / Unstitched Cotton Sari & Dhoti',
      titleHi: 'हैंडलूम पीली-लाल सूती/कोसा साड़ी व शुद्ध धोती जोड़ा',
      recipientTypeEn: 'Vratis & Parents',
      recipientTypeHi: 'व्रती माताएं व अभिभावक',
      descEn:
        'On Chhath, Vratis wear brand-new traditional yellow, saffron, or vermilion saris and pure cotton dhotis; gifting pure handloom textiles carries immense heartfelt honor.',
      descHi:
        'छठ व्रत में व्रती नवीन पीली, केसरिया या लाल रंग की सूती-सिल्क साड़ी व धोती धारण करते हैं; परिजनों द्वारा नूतन वस्त्र भेंट अत्यंत शुभ माना जाता है।',
      budgetRange: '₹800 – ₹3,500',
    },
    {
      id: 'gift-dryfruit-thekua-hamper',
      titleEn: 'Home-Baked Thekua, Pure Ghee & Organic Jaggery Hamper',
      titleHi: 'शुद्ध देसी घी, देसी गुड़ व मेवा ठेकुआ उपहार टोकरी',
      recipientTypeEn: 'Neighbors & Friends',
      recipientTypeHi: 'पड़ोसी व मित्रगण',
      descEn:
        'Artisanal cow ghee, chemical-free palm/sugarcane jaggery, and dry-fruit hampers shared among friends and families preparing prasad boxes.',
      descHi:
        'मित्रों व रिश्तेदारों के घर प्रसाद निर्माण हेतु शुद्ध ए२ घी, रसायन-मुक्त ताजा गुड़ व काजू-पिस्ता जैसी सात्विक भेंट।',
      budgetRange: '₹400 – ₹1,500',
    },
    {
      id: 'gift-silver-surya-medallion',
      titleEn: 'Pure Silver Surya Narayan Coin / Medallion',
      titleHi: 'शुद्ध चांदी का सूर्य देव व छठ स्मृति सिक्का',
      recipientTypeEn: 'Newborn & First-Time Vratis',
      recipientTypeHi: 'नवजात शिशु व प्रथम व्रती',
      descEn:
        'Hallmarked silver coin engraved with Sun rays — a radiant heirloom gift for newborn grandchildren or first-time Chhath Vratis.',
      descHi:
        'सूर्य रश्मियों से अंकित शुद्ध चांदी का सिक्का — घर के नन्हे बच्चों या प्रथम बार छठ व्रत करने वालों के लिए अमूल्य आशीष स्मृति।',
      budgetRange: '₹1,000 – ₹2,500+',
    },
  ],

  faqs: [
    {
      id: 'chhath-faq-01',
      questionEn: 'What are the exact dates for Chhath Puja 2026 in India?',
      questionHi: '२०२६ में छठ पूजा (नहाय-खाय से उषा अर्घ्य तक) की सटीक तिथियाँ क्या हैं?',
      questionHinglish: '2026 mein Chhath Puja kab se kab tak hai? (All 4 dates)',
      answerEn:
        'Chhath Puja 2026 spans four sacred days from Friday, November 13 to Monday, November 16, 2026: Day 1 Nahay Khay on Nov 13; Day 2 Kharna on Nov 14; Day 3 main Sandhya Arghya (Kartik Shukla Shashthi) on Nov 15; and Day 4 Usha Arghya & Parana on Nov 16, 2026.',
      answerHi:
        '२०२६ में छठ महापर्व १३ नवम्बर से १६ नवम्बर २०२६ तक चार दिन मनाया जाएगा: १३ नवम्बर (शुक्रवार) को नहाय-खाय, १४ नवम्बर (शनिवार) को खरना, १५ नवम्बर (रविवार) को मुख्य संध्या अर्घ्य व १६ नवम्बर (सोमवार) को प्रातः उषा अर्घ्य व पारण संपन्न होगा।',
      answerHinglish:
        '2026 mein Chhath Puja 4 din chalegi: 13 Nov (Nahay Khay), 14 Nov (Kharna), 15 Nov (Sandhya Arghya main day) aur 16 Nov (Usha Arghya & Parana).',
      category: 'timing',
    },
    {
      id: 'chhath-faq-02',
      questionEn: 'Why is the setting sun worshipped first on Sandhya Arghya during Chhath Puja?',
      questionHi: 'छठ पूजा में उगते सूर्य से पहले डूबते सूर्य को अर्घ्य क्यों दिया जाता है?',
      questionHinglish: 'Chhath mein ugte Suraj se pehle doobte Suraj ko Arghya kyun dete hain?',
      answerEn:
        'Chhath Puja stands out globally for honoring both the setting and rising Sun. Offering Sandhya Arghya first teaches gratitude for the day’s completed light and reminds devotees to respect elders, humility, and cycles of life — knowing that every setting sun prepares tomorrow’s golden dawn.',
      answerHi:
        'संध्या अर्घ्य के माध्यम से डूबते सूर्य को नमन करना भारतीय दर्शन की अनूठी कृतज्ञता सिखाता है — अर्थात जो अस्त हो रहा है (बड़ों का जीवन-अनुभव या दिनभर की तपस्या) उसका भी उतना ही सम्मान हो, क्योंकि आज का सूर्यास्त ही कल के उज्ज्वल सूर्योदय का आधार है।',
      answerHinglish:
        'Doobte Suraj ko pehle Arghya dena sikhata hai ki jo dhal raha hai uska bhi utna hi samman karo — har sunset kal ke naye sunrise ki shuruaat hota hai.',
      category: 'rituals',
    },
    {
      id: 'chhath-faq-03',
      questionEn: 'Who is Chhathi Maiya and how is she connected to Lord Surya?',
      questionHi: 'छठी मैया कौन हैं और भगवान सूर्य देव से उनका क्या संबंध है?',
      questionHinglish: 'Chhathi Maiya kaun hain aur Surya Dev se unka kya rishta hai?',
      answerEn:
        'According to Devi Bhagavatam and Brahma Vaivarta Purana, Chhathi Maiya is Mata Shashthi — born from Prakriti Devi (the sixth celestial portion), sister to Lord Surya, and revered as the divine protector of newborns, children’s wellbeing, and household harmony.',
      answerHi:
        'देवी भागवत और ब्रह्मवैवर्त पुराण के अनुसार छठी मैया प्रकृति के छठे अंश से प्रकट हुईं षष्ठी देवी (माता कात्यायनी स्वरूप) हैं। लोक मान्यता में उन्हें भगवान सूर्य देव की मानस बहन व बच्चों की रक्षा, स्वास्थ्य व वंश-कल्याण की अधिष्ठात्री माना गया है।',
      answerHinglish:
        'Puranon ke anusaar Chhathi Maiya (Mata Shashthi) Prakriti Devi ka roop aur Surya Dev ki behen hain, jo bachon ki raksha aur parivar ki acchi sehat ka aashirwad deti hain.',
      category: 'general',
    },
    {
      id: 'chhath-faq-04',
      questionEn: 'What are the exact sunrise and sunset Arghya timings for Nov 15 & Nov 16?',
      questionHi: '१५ नवम्बर संध्या अर्घ्य और १६ नवम्बर उषा अर्घ्य का सटीक समय क्या है?',
      questionHinglish: 'Sandhya Arghya aur Usha Arghya ka exact sunrise/sunset time kya hai?',
      answerEn:
        'Arghya is offered directly at local sunset (Nov 15) and local sunrise (Nov 16), which differ by 20–50 minutes across India from Kolkata/Patna in the east to Delhi/Mumbai in the west. Check your city’s official daily meteorological sunrise/sunset timing rather than using a single country-wide clock.',
      answerHi:
        'चूंकि छठ अर्घ्य प्रत्यक्ष सूर्यास्त (१५ नवम्बर) व सूर्योदय (१६ नवम्बर) के दर्शन पर दिया जाता है और भारत के पूर्वी शहरों (पटना, कोलकाता) व पश्चिमी शहरों (दिल्ली, मुंबई) के समय में २० से ५० मिनट का अंतर होता है, इसलिए अपने नगर के स्थानीय सूर्यास्त/सूर्योदय समय का ही पालन करें।',
      answerHinglish:
        'Sunrise aur sunset har city ke longitude ke hisaab se alag hota hai (Patna, Delhi, Mumbai mein 20–50 min farak). Isliye apne shehar ka local sunset/sunrise time zaroor check karein.',
      category: 'timing',
    },
    {
      id: 'chhath-faq-05',
      questionEn: 'What essential items go into the Chhath Puja bamboo Soop and Daura?',
      questionHi: 'छठ पूजा के बांस के सूप और दउरे में कौन-कौन सी मुख्य सामग्री रखी जाती है?',
      questionHinglish: 'Chhath Puja ke Soop aur Daura mein kya-kya samagri rakhi jaati hai?',
      answerEn:
        'A traditional Chhath Daura includes hand-stamped Thekua, Kasar rice laddoos, leafy sugarcane (Ganna), whole coconut with husk, Dabh Nimbu (pomelo citrus), banana bunches, Suthni (tuber root), water chestnut (Singhara), raw turmeric and ginger plants, betel leaves, kumkum, and clay diyas.',
      answerHi:
        'पारंपरिक छठ दउरे व सूप में ठप्पा लगा ठेकुआ, चावल के कसार लड्डू, पत्तों सहित लंबा गन्ना, जटा वाला नारियल, बड़ा डाभ नींबू, केला का घौद, सुथनी, सिंघाड़ा, कच्ची हल्दी व अदरक के पत्तेदार पौधे, पान-सुपारी, सिंदूर व मिट्टी के दीये सजाए जाते हैं।',
      answerHinglish:
        'Daura aur Soop mein Thekua, Kasar laddoo, patte wala ganna, nariyal, dabh nimbu, kela, suthni, singhara, kacchi haldi-adrak aur mitti ke diye rakhe jaate hain.',
      category: 'rituals',
    },
    {
      id: 'chhath-faq-06',
      questionEn: 'Can someone celebrate Chhath Puja at home if there is no river ghat nearby?',
      questionHi: 'यदि आस-पास नदी या तालाब का घाट न हो, तो क्या घर या छत पर छठ पूजा की जा सकती है?',
      questionHinglish: 'Agar aas-paas ghat na ho toh kya ghar ya terrace par Chhath Puja kar sakte hain?',
      answerEn:
        'Yes. Millions of families in urban apartments and overseas diaspora build a spotless clean-water tub or makeshift terrace pool lined with mango leaves, sugarcane stalks, and diyas. Pure intention and strict hygiene are what sanctify the Arghya spot.',
      answerHi:
        'हाँ, बिल्कुल। महानगरों व विदेशों में रहने वाले लाखों परिवार घर की छत या आंगन में स्वच्छ नया हौज या टब स्थापित कर आम के पत्ते, गन्ना व दीयों से उसे सजाकर पूरे विधि-विधान से सूर्य देव को अर्घ्य देते हैं। सच्ची निष्ठा व स्वच्छता ही प्रधान है।',
      answerHinglish:
        'Haan bilkul! Metros aur abroad mein log terrace ya balcony mein clean water tub/kund banakar sugarcane aur diyon se sajate hain aur Surya Dev ko Arghya dete hain.',
      category: 'decoration',
    },
    {
      id: 'chhath-faq-07',
      questionEn: 'Why is onion, garlic, or regular table salt prohibited during Chhath?',
      questionHi: 'छठ के चारों दिनों में प्याज, लहसुन व साधारण नमक का प्रयोग वर्जित क्यों होता है?',
      questionHinglish: 'Chhath mein pyaaz, lehsun aur normal namak kyun nahi khaya jaata?',
      answerEn:
        'Chhath revolves around bodily and mental Satvikta (purity). Devotees avoid Tamasic foods like onion and garlic and replace refined salt with natural Sendha Namak (rock salt) starting Nahay Khay so digestion stays light and focused before the demanding 36-hour Nirjala fast.',
      answerHi:
        'छठ में शारीरिक और मानसिक शुद्धता (सात्विकता) सर्वोपरि मानी जाती है। प्याज व लहसुन तामसिक श्रेणी में आते हैं, जबकि सेंधा नमक खनिज-संपन्न प्राकृतिक लवण है जो ३६ घंटे के निर्जला उपवास से पहले शरीर को हल्का व संतुलित रखता है।',
      answerHinglish:
        'Chhath mein Satvikta sabse important hoti hai. Pyaaz-lehsun avoid karke Sendha Namak (rock salt) use karne se 36 ghante ke Nirjala fast se pehle body light aur healthy rehti hai.',
      category: 'food',
    },
    {
      id: 'chhath-faq-08',
      questionEn: 'Where can I create Chhath Puja greeting cards and copy Chhath wishes in Hindi, English & Hinglish?',
      questionHi: 'मैं छठ पूजा २०२६ के ग्रीटिंग कार्ड्स और हिंदी, अंग्रेजी व हिंग्लिश शुभकामनाएं कहाँ से पा सकता हूँ?',
      questionHinglish: 'Chhath Puja ke cards aur Hindi-English-Hinglish wishes kahan se banayein aur copy karein?',
      answerEn:
        'Explore FestiveWala’s Chhath Puja Greeting Studio for 25 original Sun & River Ghat cards plus 10 family photo frames, and browse 100 ready-to-share Chhath wishes in English, Hindi, and Hinglish — all 100% free with instant WhatsApp sharing.',
      answerHi:
        'फेस्टिववाला के छठ ग्रीटिंग स्टूडियो में आप २५ खास सूर्य व घाट डिज़ाइन कार्ड और १० पारिवारिक फोटो फ्रेम्स बना सकते हैं, तथा १०० से अधिक हिंदी, अंग्रेजी व हिंग्लिश शुभकामनाएं एक क्लिक में व्हाट्सएप पर शेयर कर सकते हैं।',
      answerHinglish:
        'FestiveWala ke Chhath Greeting Studio mein 25 custom cards, 10 family photo frames aur 100 unique Chhath wishes English, Hindi aur Hinglish mein bilkul free available hain!',
      category: 'gifting',
    },
  ],

  greetingsCategoryKey: 'traditional-indian',
  relatedRangoliCategories: ['floral', 'traditional'],
  relatedDecorationCategories: ['lighting-diyas', 'puja-altar'],
};
