import type { FestivalItem } from './types';

export const FESTIVALS_DATA: FestivalItem[] = [
  {
    id: 'dhanteras',
    nameEn: 'Dhanteras',
    nameHi: 'धनतेरस',
    tithiEn: 'Kartik Krishna Trayodashi (6 November 2026)',
    tithiHi: 'कार्तिक कृष्ण त्रयोदशी (६ नवम्बर २०२६)',
    dateIso: '2026-11-06T00:00:00+05:30',
    descEn: 'The auspicious opening of Deepavali: celebrating radiant health, cosmic prosperity, and sacred new beginnings.',
    descHi: 'आरोग्य, समृद्धि और नव शुभारंभ का महापर्व — भगवान धन्वंतरि, मां लक्ष्मी और कुबेर देव का पावन उत्सव।',
    accentColor: '#D4AF37',
    bgGradient: 'from-[#1E0B36] via-[#2A1045] to-[#120524]',
    featured: true,
    significanceEn: 'Bhagwan Dhanvantari Jayanti, Lakshmi-Kuber Puja, Yamadeepdaan & Auspicious Metal Buying',
    significanceHi: 'भगवान धन्वंतरि जयंती, लक्ष्मी-कुबेर पूजन, यम दीपदान व धातु क्रय',
    tagEn: 'Health & Wealth',
    tagHi: 'आरोग्य व समृद्धि',
  },
  {
    id: 'diwali',
    nameEn: 'Diwali',
    nameHi: 'दीपावली',
    tithiEn: 'Kartik Amavasya 2026',
    tithiHi: 'कार्तिक अमावस्या २०२६',
    dateIso: '2026-11-08T18:30:00+05:30',
    descEn: 'The sovereign festival of lights, celebrating the triumph of luminous wisdom and celestial prosperity.',
    descHi: 'प्रकाश, वैभव और सद्भावना का महापर्व — अंधकार पर ज्ञान और धर्म की शाश्वत विजय का उत्सव।',
    accentColor: '#D4AF37',
    bgGradient: 'from-[#24113D] via-[#351759] to-[#45216B]',
    featured: true,
    significanceEn: 'Laksmi-Ganesha Puja, Sacred Diyas & Family Reunion',
    significanceHi: 'लक्ष्मी-गणेश पूजन, पावन दीपदान व पारिवारिक मिलन',
    tagEn: 'Festival of Lights',
    tagHi: 'दीपोत्सव',
  },
  {
    id: 'chhath-puja',
    nameEn: 'Chhath Puja',
    nameHi: 'छठ पूजा',
    tithiEn: 'Kartik Shukla Shashthi 2026',
    tithiHi: 'कार्तिक शुक्ल षष्ठी २०२६',
    dateIso: '2026-11-15T06:00:00+05:30',
    descEn: 'Ancient Vedic festival dedicated to Surya Bhagwan and Chhathi Maiya, honoring purity and cosmic energy.',
    descHi: 'भगवान सूर्य और षष्ठी मैया को समर्पित आस्था, संयम और प्रकृति के प्रति कृतज्ञता का पावन महापर्व।',
    accentColor: '#E65100',
    bgGradient: 'from-[#3A1400] via-[#5C2300] to-[#8C3A00]',
    featured: false,
    significanceEn: 'Solar Homage, Arghya & Riverbank Prayers',
    significanceHi: 'सूर्य वंदना, पवित्र अर्घ्य व सात्विक तपस्या',
    tagEn: 'Solar Devotion',
    tagHi: 'सूर्य उपासना',
  },
  {
    id: 'christmas',
    nameEn: 'Christmas',
    nameHi: 'क्रिसमस',
    tithiEn: 'December 25, 2026',
    tithiHi: '२५ दिसम्बर २०२६',
    dateIso: '2026-12-25T00:00:00+05:30',
    descEn: 'A joyful season of peace, goodwill, warm carols, and sharing festive gifts with loved ones.',
    descHi: 'शांति, प्रेम और आनंद का पावन पर्व — परिवार संग खुशियां, उपहार और प्रार्थनाएं बांटने का समय।',
    accentColor: '#C41E3A',
    bgGradient: 'from-[#1A2E20] via-[#24422E] to-[#143B22]',
    featured: false,
    significanceEn: 'Nativity Celebration, Caroling & Feasting',
    significanceHi: 'प्रार्थना सभा, कैरल्स व पारिवारिक स्नेह',
    tagEn: 'Season of Joy',
    tagHi: 'प्रेम व उल्लास',
  },
  {
    id: 'new-year',
    nameEn: 'New Year',
    nameHi: 'नव वर्ष',
    tithiEn: 'January 1, 2027',
    tithiHi: '१ जनवरी २०२७',
    dateIso: '2027-01-01T00:00:00+05:30',
    descEn: 'Welcoming new beginnings, fresh aspirations, and hopeful horizons with renewed purpose.',
    descHi: 'नई आशाओं, नवीन संकल्पों और स्वर्णिम अवसरों के साथ नव वर्ष के शुभागमन का अभिनंदन।',
    accentColor: '#F2D98B',
    bgGradient: 'from-[#181E36] via-[#202C54] to-[#2B3C73]',
    featured: false,
    significanceEn: 'New Beginnings, Hope & Global Solidarity',
    significanceHi: 'नवीन संकल्प, सौहार्द व मंगल कामनाएं',
    tagEn: 'New Beginnings',
    tagHi: 'नवीन आरंभ',
  },
  {
    id: 'makar-sankranti',
    nameEn: 'Makar Sankranti',
    nameHi: 'मकर संक्रांति',
    tithiEn: 'Magh Krishna Pratipada 2027',
    tithiHi: 'माघ कृष्ण प्रतिपदा २०२७',
    dateIso: '2027-01-14T08:00:00+05:30',
    descEn: 'Celebrating Uttarayan solar transition, harvest bounty, colourful kites, and sesame sweets.',
    descHi: 'सूर्य का मकर राशि में प्रवेश, उत्तरायण पर्व, पतंगोत्सव और तिल-गुड़ की मिठास से भरा पावन उत्सव।',
    accentColor: '#FFB300',
    bgGradient: 'from-[#3B1F00] via-[#5C3200] to-[#7E4500]',
    featured: false,
    significanceEn: 'Harvest Thanksgiving, Kite Flying & Holy Dip',
    significanceHi: 'पवित्र स्नान, दान-पुण्य व तिल-गुड़ प्रसाद',
    tagEn: 'Harvest & Sun',
    tagHi: 'सूर्य व अन्न उत्सव',
  },
  {
    id: 'maha-shivratri',
    nameEn: 'Maha Shivratri',
    nameHi: 'महाशिवरात्रि',
    tithiEn: 'Phalguna Krishna Chaturdashi 2027',
    tithiHi: 'फाल्गुन कृष्ण चतुर्दशी २०२७',
    dateIso: '2027-03-06T00:00:00+05:30',
    descEn: 'The great celestial night of Shiva, honoring inner stillness, spiritual awakening, and meditation.',
    descHi: 'भगवान शिव और माता पार्वती के दिव्य मिलन की पावन रात्रि — ध्यान, जागरण और आंतरिक शांति का पर्व।',
    accentColor: '#00ACC1',
    bgGradient: 'from-[#0D1F2D] via-[#133044] to-[#1E4866]',
    featured: false,
    significanceEn: 'Night Vigil, Sacred Bilva Leaves & Chanting',
    significanceHi: 'रात्रि जागरण, रुद्राभिषेक व शिव आराधना',
    tagEn: 'Spiritual Night',
    tagHi: 'शिव आराधना',
  },
  {
    id: 'holi',
    nameEn: 'Holi',
    nameHi: 'होली',
    tithiEn: 'Phalguna Purnima 2027',
    tithiHi: 'फाल्गुन पूर्णिमा २०२७',
    dateIso: '2027-03-22T08:00:00+05:30',
    descEn: 'The exuberant festival of spring colors, renewal, joyful camaraderie, and playful gulal.',
    descHi: 'रंग, उमंग और वसंत का उल्लास — गुलाल की खुशबू और मनमुटाव भुलाकर गले मिलने का रसोत्सव।',
    accentColor: '#E91E63',
    bgGradient: 'from-[#3D0A24] via-[#5C1137] to-[#7D194B]',
    featured: false,
    significanceEn: 'Holika Dahan, Herbal Gulal & Community Sweets',
    significanceHi: 'होलिका दहन, अबीर-गुलाल व आत्मीय मिलन',
    tagEn: 'Festival of Colors',
    tagHi: 'रंगोत्सव',
  },
  {
    id: 'raksha-bandhan',
    nameEn: 'Raksha Bandhan',
    nameHi: 'रक्षाबंधन',
    tithiEn: 'Shravana Purnima 2027',
    tithiHi: 'श्रावण पूर्णिमा २०२७',
    dateIso: '2027-08-28T09:00:00+05:30',
    descEn: 'The sacred thread of love, lifelong protection, and affectionate devotion between siblings.',
    descHi: 'भाई-बहन के अटूट स्नेह, रक्षा के संकल्प और पावन विश्वास का अनुपम भारतीय पर्व।',
    accentColor: '#D81B60',
    bgGradient: 'from-[#380E2B] via-[#591745] to-[#7B2060]',
    featured: false,
    significanceEn: 'Sacred Rakhi Thread, Sibling Vow & Sweets',
    significanceHi: 'राखी का पवित्र धागा, मंगल तिलक व आशीर्वाद',
    tagEn: 'Bond of Protection',
    tagHi: 'स्नेह बंधन',
  },
  {
    id: 'navratri',
    nameEn: 'Navratri & Durga Puja',
    nameHi: 'नवरात्रि व दुर्गा पूजा',
    tithiEn: 'Ashwin Shukla Pratipada 2027',
    tithiHi: 'आश्विन शुक्ल प्रतिपदा २०२७',
    dateIso: '2027-10-10T06:00:00+05:30',
    descEn: 'Nine sacred nights of the Divine Mother, cosmic Shakti, vibrant Garba, and divine grace.',
    descHi: 'आद्यशक्ति मां दुर्गा के नौ दिव्य स्वरूपों की आराधना, डांडिया-गरबा और नारी शक्ति का महापर्व।',
    accentColor: '#FF6F00',
    bgGradient: 'from-[#361300] via-[#562000] to-[#762D00]',
    featured: false,
    significanceEn: 'Navadurga Worship, Garba & Vijayadashami',
    significanceHi: 'नवदुर्गा पूजा, गरबा रास व विजय का संकल्प',
    tagEn: 'Nine Divine Nights',
    tagHi: 'शक्ति उपासना',
  },
];

/**
 * Returns the nearest upcoming festival based on the provided reference date.
 * If all dates have passed, it safely falls back to the first festival.
 */
export function getNextUpcomingFestival(referenceDate = new Date()): {
  festival: FestivalItem;
  targetDate: Date;
} {
  const refTime = referenceDate.getTime();
  
  // Find festivals in the future
  const upcoming = FESTIVALS_DATA
    .map((f) => ({ festival: f, targetDate: new Date(f.dateIso) }))
    .filter((item) => item.targetDate.getTime() > refTime)
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

  if (upcoming.length > 0) {
    return upcoming[0];
  }

  // Fallback if none in future: return first festival
  return {
    festival: FESTIVALS_DATA[0],
    targetDate: new Date(FESTIVALS_DATA[0].dateIso),
  };
}

