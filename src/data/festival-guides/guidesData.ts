import { CHHATH_PUJA_GUIDES } from './chhathPujaGuides';

export interface GuideSection {
  headingEn: string;
  headingHi: string;
  contentEn: string;
  contentHi: string;
  practicalTipsEn?: string[];
  practicalTipsHi?: string[];
}

export interface FestivalGuide {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  category:
    | 'history'
    | 'traditions'
    | 'preparation'
    | 'food'
    | 'decoration'
    | 'celebration'
    | 'eco-friendly'
    | 'safety';
  categoryLabelEn: string;
  categoryLabelHi: string;
  readTimeEn: string;
  readTimeHi: string;
  introEn: string;
  introHi: string;
  sections: GuideSection[];
  relatedFestivalId?: string;
  badgeEn: string;
  badgeHi: string;
  icon: string;
}

export const GUIDE_CATEGORIES = [
  { id: 'all', labelEn: 'All Guides', labelHi: 'सभी मार्गदर्शिकाएं' },
  { id: 'history', labelEn: 'History & Significance', labelHi: 'इतिहास व महत्व' },
  { id: 'traditions', labelEn: 'Traditions & Rituals', labelHi: 'रीति-रिवाज व परंपराएं' },
  { id: 'preparation', labelEn: 'Festival Preparation', labelHi: 'त्योहार की पूर्व तैयारी' },
  { id: 'food', labelEn: 'Food & Recipes', labelHi: 'खानपान व पकवान' },
  { id: 'decoration', labelEn: 'Decoration Guides', labelHi: 'सजावट गाइड' },
  { id: 'celebration', labelEn: 'Celebration Ideas', labelHi: 'उत्सव मनाने के विचार' },
  { id: 'eco-friendly', labelEn: 'Eco-Friendly Practices', labelHi: 'पर्यावरण-अनुकूल उत्सव' },
  { id: 'safety', labelEn: 'Safety & Responsibility', labelHi: 'सुरक्षा व सावधानी' },
];

export const FESTIVAL_GUIDES: FestivalGuide[] = [
  {
    id: 'diwali-five-days-significance',
    slug: 'diwali-five-days-significance',
    titleEn: 'The Complete 5-Day Journey of Diwali: Rituals & Significance',
    titleHi: 'दीपावली के पांच पावन दिवस: परंपरा, कथा व संपूर्ण पूजन विधि',
    category: 'traditions',
    categoryLabelEn: 'Traditions & Rituals',
    categoryLabelHi: 'रीति-रिवाज व परंपराएं',
    readTimeEn: '5 Mins Read',
    readTimeHi: '५ मिनट पठन',
    badgeEn: 'Essential Guide',
    badgeHi: 'अनिवार्य मार्गदर्शिका',
    icon: '🪔',
    relatedFestivalId: 'diwali',
    introEn:
      'Diwali is not merely a single night of illumination, but an expansive spiritual tapestry spanning five consecrated days. Each day carries its own philosophical meaning, sacred deity, and timeless household customs.',
    introHi:
      'दीपावली केवल एक रात का दीपोत्सव नहीं, अपितु पांच पावन दिनों का एक दिव्य पर्व-क्रम है। प्रत्येक दिन का अपना आध्यात्मिक महत्व, देवता और गृह-परंपराएं हैं जो जीवन में संतुलन और समृद्धि लाती हैं।',
    sections: [
      {
        headingEn: 'Day 1: Dhanteras — Celebrating Health & Auspicious Beginnings',
        headingHi: 'पहला दिन: धनतेरस — आरोग्य, धन्वंतरि व श्री समृद्धि',
        contentEn:
          'Dhanteras honors Bhagwan Dhanvantari, the physician of the gods who emerged during the churning of the cosmic ocean (Samudra Manthan) carrying the pot of Amrita (immortality). It is a day dedicated to physical wellness, purchasing auspicious metals like brass, copper, silver, or gold, and lighting the southern-facing Yama Deepam to protect family health.',
        contentHi:
          'धनतेरस के दिन समुद्र मंथन से आयुर्वेद के प्रवर्तक भगवान धन्वंतरि का प्राकट्य हुआ था। यह दिन उत्तम स्वास्थ्य और मंगल की कामना का दिन है। इस दिन पीतल, तांबा, चांदी या सोना खरीदना अत्यंत शुभ माना जाता है। संध्या के समय परिवार की रक्षा हेतु दक्षिण दिशा में यम दीप प्रज्वलित किया जाता है।',
        practicalTipsEn: [
          'Purchase durable metals (brass urli or silver coin) rather than fragile disposables.',
          'Light a four-wicked flour or clay lamp facing south with mustard oil at twilight.',
        ],
        practicalTipsHi: [
          'प्लास्टिक की जगह पीतल या चांदी जैसी टिकाऊ धातुएं खरीदें।',
          'गोधूलि वेला में सरसों के तेल का चौमुखा दीया दक्षिण दिशा की ओर मुंह करके जलाएं।',
        ],
      },
      {
        headingEn: 'Day 2: Naraka Chaturdashi (Chhoti Diwali) — Cleansing & Illumination',
        headingHi: 'दूसरा दिन: नरक चतुर्दशी (छोटी दीवाली) — अंतर्मन व गृह शुद्धि',
        contentEn:
          'Commemorating the liberation of 16,000 souls and the defeat of the tyrannical demon Narakasura by Bhagwan Krishna and Satyabhama. Families traditionally rise before sunrise for an Abhyanga Snan (ritual bath with fragrant herbal ubtan and sesame oil) symbolizing the washing away of inertia and despair.',
        contentHi:
          'भगवान श्रीकृष्ण द्वारा नरकासुर के वध और हजारों बंदियों की मुक्ति का यह दिन है। इस दिन ब्रह्ममुहूर्त में उबटन और तिल के तेल से "अभ्यंग स्नान" करने का विधान है, जो शरीर और मन की समस्त सुस्ती और नकारात्मकता को समाप्त करता है।',
        practicalTipsEn: [
          'Use natural gram flour (besan), turmeric, and rose water for an authentic ubtan paste.',
          'Light 14 clay diyas along borders and balconies at dusk.',
        ],
        practicalTipsHi: [
          'बेसन, हल्दी और गुलाब जल का प्राकृतिक उबटन बनाकर स्नान करें।',
          'संध्या के समय घर की मुंडेरों पर १४ दीप प्रज्वलित करें।',
        ],
      },
      {
        headingEn: 'Day 3: Lakshmi Puja — Invoking Divine Grace & Abundance',
        headingHi: 'तीसरा दिन: महालक्ष्मी पूजन — अंधकार पर प्रकाश की विजय',
        contentEn:
          'The pinnacle of the festival on the dark Amavasya night. Homes are transformed into luminous sanctuaries with marigolds and oil lamps. The family gathers in traditional silk attire for the Lakshmi-Ganesha puja, seeking wisdom before wealth and righteousness in all conduct.',
        contentHi:
          'दीपावली का मुख्य दिन जब अमावस्या की रात्रि में करोड़ों दीयों से अंधकार को परास्त किया जाता है। शुभ मुहूर्त में घर के सभी सदस्य एकत्र होकर भगवान गणेश, माता महालक्ष्मी और मां सरस्वती का पूजन करते हैं।',
        practicalTipsEn: [
          'Place idols on a clean red or yellow silk cloth; never place idols directly on bare floor.',
          'Offer puffed rice (kheel) and sugar batashas alongside fresh lotus flowers.',
        ],
        practicalTipsHi: [
          'मूर्तियों को लाल या पीले रेशमी आसन पर स्थापित करें, सीधे फर्श पर न रखें।',
          'कमल के फूल, खील और बताशों का सात्विक भोग लगाएं।',
        ],
      },
      {
        headingEn: 'Day 4: Govardhan Puja & Annakut — Reverence for Nature',
        headingHi: 'चौथा दिन: गोवर्धन पूजा व अन्नकूट — प्रकृति के प्रति कृतज्ञता',
        contentEn:
          'Commemorates Krishna lifting the sacred Govardhan hill on his little finger to shield villagers from tempestuous rain, preaching that honoring nature and mountains is the true divine worship. Communities prepare Annakut (mountains of diverse vegetarian preparations) in gratitude for harvest bounty.',
        contentHi:
          'श्रीकृष्ण द्वारा इंद्र के कोप से गोकुलवासियों की रक्षा हेतु गोवर्धन पर्वत उठाने की पावन स्मृति। यह दिन प्रकृति, पर्यावरण और अन्नदाता के प्रति कृतज्ञता व्यक्त करने का महापर्व है। इस दिन ५६ भोग या अन्नकूट का विशाल प्रसाद बनाया जाता है।',
      },
      {
        headingEn: 'Day 5: Bhai Dooj — Enduring Sibling Vows',
        headingHi: 'पांचवां दिन: भाई दूज (यम द्वितीया) — भाई-बहन का अमर स्नेह',
        contentEn:
          'The festive conclusion honors the brother-sister bond. Sisters welcome brothers into their homes, apply the protective vermilion tilak, and share a festive meal, echoing the mythological visit of Yamaraj to his sister Yami (the Yamuna river).',
        contentHi:
          'यमराज और उनकी बहन यमुना के अमर प्रेम का प्रतीक। बहनें भाइयों को अपने घर आमंत्रित करती हैं, स्नेहपूर्वक भोजन कराती हैं और मस्तक पर मंगल तिलक लगाकर उनकी दीर्घायु की कामना करती हैं।',
      },
    ],
  },
  {
    id: 'eco-friendly-festival-guide',
    slug: 'eco-friendly-festival-guide',
    titleEn: 'The Conscious Celebrator: Guide to Green & Zero-Waste Festivals',
    titleHi: 'जागरूक उत्सव: पर्यावरण-अनुकूल व कचरा-मुक्त त्योहार मनाने की संपूर्ण मार्गदर्शिका',
    category: 'eco-friendly',
    categoryLabelEn: 'Eco-Friendly Practices',
    categoryLabelHi: 'पर्यावरण-अनुकूल उत्सव',
    readTimeEn: '4 Mins Read',
    readTimeHi: '४ मिनट पठन',
    badgeEn: 'Sustainability',
    badgeHi: 'सतत जीवनशैली',
    icon: '🌱',
    relatedFestivalId: 'diwali',
    introEn:
      'Indian traditions were originally born in harmony with nature’s seasonal rhythms. This guide explores practical, beautiful ways to celebrate with zero guilt, zero toxic plastic, and 100% cultural reverence.',
    introHi:
      'हमारी प्राचीन भारतीय परंपराएं मूलतः प्रकृति के संरक्षण और ऋतु-चक्र के सम्मान से जुड़ी हैं। यह मार्गदर्शिका आपको बिना प्लास्टिक कचरे और प्रदूषण के त्योहारों की मूल सुंदरता और भव्यता का आनंद लेने के व्यावहारिक उपाय बताती है।',
    sections: [
      {
        headingEn: '1. Say Goodbye to Chemical Colors & Toxic Glitters',
        headingHi: '१. रासायनिक रंगों व प्लास्टिक ग्लिटर का त्याग',
        contentEn:
          'Traditional Rangolis were made from coarse rice flour that fed morning ants and birds. Synthetic colored powders often contain lead oxide, copper sulphate, and microplastics that wash into water bodies. Replace them with ground rice flour, turmeric, beetroot powder, coffee powder, and fresh flower petals.',
        contentHi:
          'प्राचीन काल में रंगोली चावल के आटे से बनाई जाती थी जो चींटियों और पक्षियों का आहार बनती थी। सिंथेटिक रंगों में मौजूद हानिकारक रसायनों की जगह हल्दी, चुकंदर, कॉफी और गेंदे की पंखुड़ियों जैसे प्राकृतिक विकल्पों का प्रयोग करें।',
      },
      {
        headingEn: '2. Support Local Terracotta Potters Over Plastic Lights',
        headingHi: '२. चीनी प्लास्टिक लाइट्स की जगह स्थानीय कुम्हारों के दीये',
        contentEn:
          'Earthen diyas made from river clay decompose back into the earth seamlessly. Purchasing from street potters directly channels festive wealth into artisan homes, reviving the noble craft of Indian pottery.',
        contentHi:
          'मिट्टी के दीये पर्यावरण को कोई नुकसान नहीं पहुंचाते और पूरी तरह घुलनशील होते हैं। स्थानीय कुम्हारों से दीये खरीदकर त्योहार का धन सीधे जरूरतमंद कारीगरों तक पहुंचता है।',
        practicalTipsEn: [
          'Soak diyas in water for a few hours before use to prevent excess oil absorption.',
          'Reuse unpainted terracotta diyas year after year by giving them a quick sun bath.',
        ],
        practicalTipsHi: [
          'उपयोग से पहले दीयों को पानी में भिगोएं ताकि वे कम तेल सोखें।',
          'बिना पेंट वाले दीयों को धूप में सुखाकर हर साल दोबारा इस्तेमाल किया जा सकता है।',
        ],
      },
      {
        headingEn: '3. Mindful Festive Gifting Without Plastic Packaging',
        headingHi: '३. प्लास्टिक-मुक्त और विचारशील उपहार चयन',
        contentEn:
          'Avoid glossy plastic wrapping sheets that cannot be recycled. Wrap gifts in cloth bags (Furoshiki style), handmade Lokta or banana-fiber paper, or reusable jute tote bags tied with cotton ribbon.',
        contentHi:
          'चमकीले प्लास्टिक रैपर्स की जगह सूती कपड़े, जूट की थैलियों या केले के रेशे से बने प्राकृतिक कागजों में उपहार पैक करें जो देखने में भी अत्यंत सुरुचिपूर्ण लगते हैं।',
      },
    ],
  },
  {
    id: 'holi-herbal-colors-safety',
    slug: 'holi-herbal-colors-safety',
    titleEn: 'Safe & Vibrant Holi: Making Kitchen Gulal & Skin Care Tips',
    titleHi: 'सुरक्षित व आनंदमय होली: घर पर प्राकृतिक रंग बनाने की विधि व त्वचा सुरक्षा',
    category: 'safety',
    categoryLabelEn: 'Safety & Responsibility',
    categoryLabelHi: 'सुरक्षा व सावधानी',
    readTimeEn: '4 Mins Read',
    readTimeHi: '४ मिनट पठन',
    badgeEn: 'Safety First',
    badgeHi: 'सुरक्षा सर्वोपरि',
    icon: '🎨',
    relatedFestivalId: 'holi',
    introEn:
      'Celebrate Holi with boundless energy while protecting your skin, eyes, and pets from toxic chemical dyes. Learn how to prepare velvety organic gulal right from kitchen pantry staples.',
    introHi:
      'केमिकल वाले रंगों से अपनी त्वचा, आंखों और बेजुबान पशुओं की रक्षा करते हुए होली का भरपूर आनंद लें। जानिए कैसे घर की रसोई में ही सुंदर और सुरक्षित हर्बल गुलाल तैयार किया जा सकता है।',
    sections: [
      {
        headingEn: 'How to Make 100% Organic Gulal at Home',
        headingHi: 'घर पर १००% प्राकृतिक हर्बल गुलाल बनाने की आसान विधि',
        contentEn:
          'Mix cornstarch or arrowroot powder with natural plant juices to create silk-soft, scented powders that wash off with plain water.',
        contentHi:
          'अरारोट या कॉर्नस्टार्च में प्राकृतिक वनस्पति रस मिलाकर मखमली और खुशबूदार गुलाल तैयार करें जो एक बार धोने पर ही आसानी से छूट जाता है।',
        practicalTipsEn: [
          'Yellow Gulal: Mix 2 cups cornstarch with 2 tbsp pure kitchen turmeric and dried marigold petals.',
          'Pink Gulal: Grate 1 fresh beetroot, boil in half a cup of water, strain and knead into cornstarch; sun dry.',
          'Green Gulal: Blend fresh spinach or neem leaves into a fine paste and mix with arrowroot powder.',
        ],
        practicalTipsHi: [
          'पीला गुलाल: २ कप अरारोट में २ चम्मच हल्दी और पिसे गेंदे के फूल मिलाएं।',
          'गुलाबी गुलाल: १ चुकंदर को उबालकर उसका रस कॉर्नस्टार्च में मिलाएं और धूप में सुखा लें।',
          'हरा गुलाल: पालक या नीम के पत्तों के रस को अरारोट में मिलाकर सुखाएं।',
        ],
      },
      {
        headingEn: 'Essential Pre-Holi Skin & Hair Shielding',
        headingHi: 'होली खेलने से पूर्व त्वचा व बालों की सुरक्षा उपाय',
        contentEn:
          'Apply a generous layer of pure coconut or almond oil across your scalp, arms, face, and behind the ears 30 minutes before stepping out. Oil creates a protective lipid barrier preventing color pigments from penetrating pores.',
        contentHi:
          'रंग खेलने से आधा घंटा पहले पूरे शरीर और बालों में शुद्ध नारियल या सरसों का तेल लगाएं। तेल त्वचा के ऊपर एक सुरक्षा परत बना देता है जिससे रंग गहराई तक नहीं पहुंचता।',
      },
    ],
  },
  {
    id: 'festival-home-cleaning-declutter',
    slug: 'festival-home-cleaning-declutter',
    titleEn: 'Mindful Festival Cleaning: The Art of Festive Decluttering',
    titleHi: 'त्योहार से पूर्व गृह शुद्धि: तनाव-मुक्त सफाई व सकारात्मक ऊर्जा का संचार',
    category: 'preparation',
    categoryLabelEn: 'Festival Preparation',
    categoryLabelHi: 'त्योहार की पूर्व तैयारी',
    readTimeEn: '5 Mins Read',
    readTimeHi: '५ मिनट पठन',
    badgeEn: 'Home Organization',
    badgeHi: 'गृह व्यवस्था',
    icon: '🧹',
    relatedFestivalId: 'diwali',
    introEn:
      'In Vedic philosophy, Lakshmi resides only where there is cleanliness (Swachhta), order, and stillness. Transforming your home should not be an exhausting chore, but a joyful ritual of renewal.',
    introHi:
      'शास्त्रों में कहा गया है — "स्वच्छता में ही ईश्वर का वास है।" त्योहार से पहले घर की सफाई कोई बोझ नहीं, बल्कि घर से पुरानी अप्रयुक्त वस्तुओं को हटाकर नई सकारात्मक ऊर्जा का स्वागत करने का पावन अनुष्ठान है।',
    sections: [
      {
        headingEn: 'The 3-Box Rule for Room by Room Decluttering',
        headingHi: 'कमरे दर कमरे सफाई का सरल ३-बॉक्स नियम',
        contentEn:
          'Tackle one room a day rather than creating chaos everywhere. Carry three boxes labeled: Donate, Repair, and Discard. If you haven’t used an item in the past 12 months, bless it and pass it to someone who needs it.',
        contentHi:
          'एक दिन में एक ही कमरे पर ध्यान दें। तीन पेटियां रखें — दान, मरम्मत, और विसर्जन। यदि कोई वस्तु पिछले एक वर्ष से उपयोग में नहीं आई है, तो उसे जरूरतमंदों को दान कर दें।',
      },
      {
        headingEn: 'Purifying Negative Corners with Salt & Camphor',
        headingHi: 'नमक व कपूर से घर के कोनों की नकारात्मकता दूर करना',
        contentEn:
          'Add a handful of rock salt (Sendha Namak) to your floor mopping water once a week before festivals. Burn a small tablet of pure Bhimseni camphor in a brass diffuser every evening to eliminate stale moisture and indoor bacteria.',
        contentHi:
          'सप्ताह में एक बार पोछे के पानी में सेंधा नमक मिलाएं। संध्या के समय घर में शुद्ध भीमसेनी कपूर जलाएं, जो घर के कीटाणुओं को नष्ट कर अत्यंत सुखद खुशबू फैलाता है।',
      },
    ],
  },
  ...CHHATH_PUJA_GUIDES,
];

