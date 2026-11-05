import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Sun,
  Heart,
  ShieldCheck,
  Calendar,
  Compass,
  Palette,
  Utensils,
  Leaf,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import type { FestivalDetail } from '../../data/festivals/types';
import { TrilingualFAQSection } from '../common/TrilingualFAQSection';
import { MonetagAdSlot } from '../ads/MonetagAdSlot';

interface DiwaliGuideArticleProps {
  festival: FestivalDetail;
  isHindi: boolean;
  isHinglish?: boolean;
}

export const DiwaliGuideArticle: React.FC<DiwaliGuideArticleProps> = ({
  festival,
  isHindi,
  isHinglish = false,
}) => {
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [activeRegionTab, setActiveRegionTab] = useState<string>('ayodhya');

  // Quick navigation items
  const navItems = isHindi
    ? [
        { id: 'what-is-diwali', label: '१. दीपावली क्या है?' },
        { id: 'why-celebrate', label: '२. उत्सव का पावन कारण' },
        { id: 'significance-traditions', label: '३. विभिन्न परंपराएं' },
        { id: 'five-days-timeline', label: '४. पांच पावन दिन' },
        { id: 'how-celebrated', label: '५. उत्सव की रीतियां' },
        { id: 'regional-celebrations', label: '६. क्षेत्रीय विविधता' },
        { id: 'spiritual-meaning', label: '७. आध्यात्मिक संदेश' },
        { id: 'festive-sweets', label: '८. पारंपरिक पकवान' },
        { id: 'eco-friendly', label: '९. पर्यावरण-अनुकूल दीवाली' },
        { id: 'family-celebration', label: '१०. अपनों संग उत्सव' },
        { id: 'fascinating-facts', label: '११. रोचक व प्रामाणिक तथ्य' },
        { id: 'diwali-faqs', label: '१२. प्रश्नोत्तरी' },
      ]
    : [
        { id: 'what-is-diwali', label: '1. What is Diwali?' },
        { id: 'why-celebrate', label: '2. Why We Celebrate' },
        { id: 'significance-traditions', label: '3. Diverse Traditions' },
        { id: 'five-days-timeline', label: '4. 5 Days Timeline' },
        { id: 'how-celebrated', label: '5. How It Is Celebrated' },
        { id: 'regional-celebrations', label: '6. Regional Flavors' },
        { id: 'spiritual-meaning', label: '7. Spiritual Meaning' },
        { id: 'festive-sweets', label: '8. Sweets & Foods' },
        { id: 'eco-friendly', label: '9. Eco-Friendly Tips' },
        { id: 'family-celebration', label: '10. Family & Friends' },
        { id: 'fascinating-facts', label: '11. 10 Verified Facts' },
        { id: 'diwali-faqs', label: '12. Essential FAQs' },
      ];

  const fiveDaysData = [
    {
      dayNumber: 1,
      titleEn: 'Day 1: Dhanteras (Dhanatrayodashi)',
      titleHi: 'पहला दिन: धनतेरस (धनत्रयोदशी)',
      tithiEn: 'Kartik Krishna Trayodashi',
      tithiHi: 'कार्तिक कृष्ण त्रयोदशी',
      themeEn: 'Health, Healing & Auspicious Prosperity',
      themeHi: 'आरोग्य, धन्वंतरि प्राकट्य व श्री समृद्धि',
      icon: '🪙',
      whatItIsEn:
        'Dhanteras marks the auspicious beginning of the five-day Diwali festivities. The word derives from "Dhana" (wealth) and "Teras" (the thirteenth lunar day of the dark fortnight). On this day, Bhagwan Dhanvantari, the celestial physician and avatar of Lord Vishnu, emerged during the historic churning of the cosmic ocean (Samudra Manthan) carrying the golden vessel of Amrita (the elixir of immortality) and sacred Ayurvedic knowledge.',
      whatItIsHi:
        'धनतेरस पांच दिवसीय दीपोत्सव का मंगलकारी शुभारंभ है। यह शब्द "धन" और "तेरस" (कार्तिक कृष्ण पक्ष की त्रयोदशी तिथि) से मिलकर बना है। शास्त्रों के अनुसार इसी पावन तिथि पर समुद्र मंथन के दौरान भगवान धन्वंतरि अमृत कलश और आयुर्वेद का ज्ञान लेकर प्रकट हुए थे। यह दिन केवल भौतिक संपत्ति का नहीं, बल्कि उत्तम स्वास्थ्य और दीर्घायु की प्रार्थना का महापर्व है।',
      ritualsEn: [
        'Purchasing auspicious metal utensils or decor (brass, copper, bronze, silver, or gold) rather than disposables.',
        'Lighting the sacred four-wicked "Yama Deepam" facing south at dusk to invoke protection against untimely illness.',
        'Worshipping Devi Lakshmi, Bhagwan Dhanvantari, and Lord Kuber (treasurer of celestial wealth).',
      ],
      ritualsHi: [
        'पीतल, तांबा, कांसा या चांदी जैसी शुभ धातुओं के बर्तन व आभूषण खरीदना।',
        'संध्या वेला में परिवार के स्वास्थ्य व दीर्घायु की कामना से दक्षिण दिशा में चार मुखी "यम दीप" जलाना।',
        'आरोग्य के देव भगवान धन्वंतरि, माता लक्ष्मी और कुबेर देव का वैदिक विधि से पूजन।',
      ],
      spiritualSignificanceEn:
        'True wealth begins with physical and mental wellness. Dhanteras reminds us that without good health and righteous intent, material riches hold little value.',
      spiritualSignificanceHi:
        'पहला सुख निरोगी काया है। धनतेरस हमें स्मरण कराता है कि नैतिक आचरण और उत्तम स्वास्थ्य ही मनुष्य की सबसे अमूल्य पूंजी है।',
    },
    {
      dayNumber: 2,
      titleEn: 'Day 2: Naraka Chaturdashi (Choti Diwali / Roop Chaudas)',
      titleHi: 'दूसरा दिन: नरक चतुर्दशी (छोटी दिवाली / रूप चौदस)',
      tithiEn: 'Kartik Krishna Chaturdashi',
      tithiHi: 'कार्तिक कृष्ण चतुर्दशी',
      themeEn: 'Inner Purification & Liberation from Fear',
      themeHi: 'अंतःकरण शुद्धि, अभ्यंग स्नान व अभयदान',
      icon: '✨',
      whatItIsEn:
        'Celebrated on the fourteenth lunar day, Naraka Chaturdashi commemorates the triumph of Bhagwan Shri Krishna and Queen Satyabhama over the tyrannical demon king Narakasura. The demon had imprisoned 16,000 women and created terror across realms. Following the battle, Krishna restored dignity to the liberated souls and washed away the battlefield dust, establishing the sacred pre-dawn ritual bath.',
      whatItIsHi:
        'कार्तिक कृष्ण चतुर्दशी को छोटी दिवाली अथवा रूप चौदस कहा जाता है। यह दिन भगवान श्रीकृष्ण और देवी सत्यभामा द्वारा अत्याचारी असुर नरकासुर के वध और उसके बंदीगृह से १६,००० कन्याओं की ससम्मान मुक्ति की स्मृति में मनाया जाता है। असत्य और भय पर सत्य की विजय के उपरांत भगवान श्रीकृष्ण ने उबटन से स्नान कर विजयोत्सव मनाया था।',
      ritualsEn: [
        'Waking before dawn for the Ayurvedic "Abhyanga Snan" — massaging fragrant sesame oil and herbal ubtan (gram flour, turmeric, rose water) onto the skin.',
        'Lighting 14 terracotta diyas along window sills, doorsteps, and courtyard boundaries in the evening.',
        'Discarding broken, accumulated clutter to purify household vibrations before Lakshmi Puja.',
      ],
      ritualsHi: [
        'ब्रह्ममुहूर्त में तिल के तेल और बेसन, हल्दी व गुलाब जल के सुगंधित उबटन से "अभ्यंग स्नान" करना।',
        'संध्या समय घर की चौखट, मुंडेरों और देहरी पर १४ मिट्टी के दीप प्रज्वलित करना।',
        'घर से अनुपयोगी और टूटी-फूटी वस्तुओं को हटाकर गृह-ऊर्जा को पूरी तरह सकारात्मक बनाना।',
      ],
      spiritualSignificanceEn:
        'Slaying Narakasura metaphorically represents vanquishing the inner demons of lethargy (Tamas), self-doubt, and ego, cleansing the mind before welcoming the light of Amavasya.',
      spiritualSignificanceHi:
        'नरकासुर का वध वस्तुतः अंतर्मन के आलस्य, अहंकार और हीन भावनाओं के विनाश का प्रतीक है, जिससे हृदय में ज्ञान का प्रकाश प्रतिष्ठित हो सके।',
    },
    {
      dayNumber: 3,
      titleEn: 'Day 3: Lakshmi Puja (Main Diwali / Deepavali)',
      titleHi: 'तीसरा दिन: श्री महालक्ष्मी पूजन (बड़ी दिवाली / महापर्व)',
      tithiEn: 'Kartik Amavasya (New Moon)',
      tithiHi: 'कार्तिक अमावस्या (घोर तिमिर निशा)',
      themeEn: 'Divine Illumination, Abundance & Spiritual Wisdom',
      themeHi: 'महालक्ष्मी कृपा, आत्म-ज्ञान व सर्वत्र आलोक',
      icon: '🪔',
      whatItIsEn:
        'The centerpiece and pinnacle night of the entire festival. Falling on the pitch-black night of Kartik Amavasya, homes across India become dazzling seas of golden light. This sacred night celebrates Bhagwan Shri Rama, Mata Sita, and Lakshmana returning home to Ayodhya after 14 years of exile and the conquest over Ravana. It also marks the night Goddess Lakshmi, bestower of spiritual and material abundance, visits purified homes that radiate warmth, peace, and righteous devotion.',
      whatItIsHi:
        'दीपावली का सबसे मुख्य और पावन दिवस, जो कार्तिक अमावस्या की गहन रात्रि में मनाया जाता है। करोड़ों दीपकों के आलोक से अमावस्या की रात पूर्णिमा से भी अधिक प्रकाशवान हो उठती है। इस पावन निशा पर प्रभु श्री राम लंका-विजय के उपरांत माता सीता और लक्ष्मण सहित १४ वर्ष बाद अयोध्या लौटे थे, जिनके स्वागत में अयोध्यावासियों ने घी के दीप जलाए थे। इसी रात माता महालक्ष्मी और विघ्नहर्ता श्री गणेश का महापूजन होता है।',
      ritualsEn: [
        'Performing the sacred Lakshmi-Ganesha-Saraswati Puja during the auspicious Pradosh Kaal and Sthir Lagna.',
        'Reciting the sacred Shri Suktam, Kanakadhara Stotram, and Lakshmi Aarti with lotus flowers, batashas, and kheer.',
        'Illuminating every corner of the house with earthen ghee and mustard-oil diyas, accompanied by colorful floral rangolis at thresholds.',
        'Conducting Chopda Puja (Bahi-Khata Pujan) — opening new account ledgers inscribed with "Shubh Labh" for an ethical business year.',
      ],
      ritualsHi: [
        'शुभ प्रदोष काल एवं स्थिर लग्न में भगवान श्री गणेश, माता महालक्ष्मी और मां सरस्वती का षोडशोपचार पूजन।',
        'कमल पुष्प, खील-बताशे और खीर का नैवेद्य अर्पित कर श्री सूक्त व महालक्ष्मी चालीसा का सस्वर पाठ।',
        'द्वार, देहरी, आंगन और छत पर शुद्ध तेल व घी के दीये सजाना और चावल के आटे व फूलों से मंगल रंगोली बनाना।',
        'व्यापारियों द्वारा नवीन बही-खातों पर रोली से स्वस्तिक व "शुभ-लाभ" लिखकर बही-खाता पूजन (चोपड़ा पूजन) करना।',
      ],
      spiritualSignificanceEn:
        'Worshipping Lakshmi (wealth) alongside Ganesha (wisdom) imparts the timeless truth that material prosperity must always be steered by intellect, moral integrity, and humility.',
      spiritualSignificanceHi:
        'लक्ष्मी जी के साथ गणेश जी का पूजन यह सिखाता है कि बिना सद्बुद्धि और विवेक के धन का सदुपयोग असंभव है। ज्ञान ही वैभव को मंगलकारी बनाता है।',
    },
    {
      dayNumber: 4,
      titleEn: 'Day 4: Govardhan Puja & Annakut (Bestu Varas / Bali Pratipada)',
      titleHi: 'चौथा दिन: गोवर्धन पूजा व अन्नकूट (गुजराती नववर्ष / बलि प्रतिपदा)',
      tithiEn: 'Kartik Shukla Pratipada',
      tithiHi: 'कार्तिक शुक्ल प्रतिपदा',
      themeEn: 'Ecological Gratitude, Humility & Interdependence',
      themeHi: 'प्रकृति वंदना, अन्नकूट समर्पण व अहंकार-मुक्ति',
      icon: '🏔️',
      whatItIsEn:
        'Falling on the first day of the waxing moon (Shukla Paksha), Govardhan Puja commemorates Lord Krishna lifting Mount Govardhan on his little finger for seven days to shelter the cowherds, villagers, and cattle of Braj from catastrophic rains unleashed by Indra. By deflating Indra’s pride, Krishna demonstrated that humans must revere nature, cows, and the physical earth that nourishes them. In Gujarat, this day marks the joyful commencement of the New Year (Bestu Varas). In Maharashtra, it is celebrated as Bali Pratipada honoring King Mahabali’s generosity.',
      whatItIsHi:
        'कार्तिक शुक्ल प्रतिपदा का यह दिन प्रकृति के प्रति कृतज्ञता ज्ञापन का महान पर्व है। भगवान श्रीकृष्ण ने ब्रजवासियों को इंद्र के प्रकोप और मूसलाधार वर्षा से बचाने हेतु विशाल गोवर्धन पर्वत को अपनी कनिष्ठिका अंगुली पर उठा लिया था। उन्होंने सिखाया कि कर्मकांड के अहंकार से ऊपर उठकर हमें जीवन देने वाले पर्वत, वन, नदियां और गो-माता की रक्षा व पूजा करनी चाहिए। गुजरात में यह दिन "बेस्तू वरस" (नवीन वर्ष) तथा महाराष्ट्र में "बलि प्रतिपदा" के रूप में मनाया जाता है।',
      ritualsEn: [
        'Building miniature Govardhan mounds using clean cow dung or clay, adorned with flowers, sugarcane, and grass.',
        'Preparing the "Annakut" — literally a mountain of vegetarian delicacies (traditionally 56 distinct items or Chhappan Bhog) offered in gratitude to the Divine.',
        'Gau Puja: Bathing cows, painting their horns with turmeric and vermilion, draping them with garlands, and feeding them fresh jaggery and green fodder.',
      ],
      ritualsHi: [
        'आंगन में गाय के पवित्र गोबर से गोवर्धन पर्वत की सुंदर आकृति बनाकर पुष्पों, ईख और दीपों से पूजन करना।',
        'भगवान को ५६ भोग अथवा विभिन्न ऋतु-सब्जियों और अनाजों से निर्मित विशाल "अन्नकूट" का महाभोग अर्पित करना।',
        'गो-पूजा: गायों और बछड़ों को नहलाकर उनके सींगों को रंगना, फूलों की माला पहनाना और गुड़-रोटी खिलाकर परिक्रमा करना।',
      ],
      spiritualSignificanceEn:
        'Govardhan Puja is ancient India’s foundational lesson in environmental stewardship. It teaches that humanity must live in respectful harmony with ecosystems rather than exploiting them.',
      spiritualSignificanceHi:
        'गोवर्धन पूजा पर्यावरण संरक्षण और प्रकृति प्रेम का अनुपम संदेश देती है कि मनुष्य और प्रकृति का संबंध अटूट और परस्पर पूरक है।',
    },
    {
      dayNumber: 5,
      titleEn: 'Day 5: Bhai Dooj (Yama Dwitiya / Bhau Beej / Bhai Phota)',
      titleHi: 'पांचवां दिन: भाई दूज (यम द्वितीया / भाऊ बीज / भाई फोटा)',
      tithiEn: 'Kartik Shukla Dwitiya',
      tithiHi: 'कार्तिक शुक्ल द्वितीया',
      themeEn: 'Sacred Sibling Love, Respect & Lifelong Protection',
      themeHi: 'भाई-बहन का पावन स्नेह, दीर्घायु आशीष व सम्मान',
      icon: '🤝',
      whatItIsEn:
        'The grand finale of Diwali celebrates the unconditional, affectionate bond between brothers and sisters. Legend holds that Lord Yama (the deity of justice and the afterlife) visited his sister Yami (the sacred Yamuna river) on this day after a long absence. Overjoyed, Yami applied an auspicious tilak to his forehead, prepared a lavish banquet, and prayed for his eternal well-being. Deeply touched, Yama granted her a boon: any brother who receives a sister’s tilak and hospitality on this day shall be shielded from premature distress.',
      whatItIsHi:
        'दीपावली महापर्व का समापन भाई-बहन के पवित्र और आत्मीय रिश्ते के उत्सव के साथ होता है। पौराणिक मान्यता है कि इस दिन यमराज अपनी बहन यमुना से मिलने उनके घर पहुंचे थे। यमुना ने प्रेमपूर्वक अपने भाई का स्वागत किया, माथे पर तिलक लगाया और स्वादिष्ट भोजन कराया। यमराज ने प्रसन्न होकर वरदान दिया कि जो भाई आज के दिन अपनी बहन के हाथ का भोजन करेगा और तिलक लगवाएगा, उसे अकाल मृत्यु और कष्टों का भय नहीं रहेगा।',
      ritualsEn: [
        'Brothers visit their sisters’ homes; sisters apply an auspicious vermilion, rice (Akshat), and sandalwood paste tilak.',
        'Performing aarti with a lit ghee diya and offering homemade sweets such as laddoos, gujiyas, or kheer.',
        'Exchanging loving blessings and thoughtful gifts; brothers pledge lifelong respect, protection, and companionship.',
      ],
      ritualsHi: [
        'भाई अपनी बहनों के घर जाते हैं; बहनें भाई के मस्तक पर रोली, चंदन और अक्षत का मांगलिक तिलक लगाती हैं।',
        'घी के दीपक से भाई की आरती उतारकर दीर्घायु, यश और मंगलमय जीवन की प्रार्थना करती हैं।',
        'बहनें भाई को अपने हाथ से बनी मिठाई खिलाती हैं और भाई स्नेहपूर्वक उपहार व सदैव साथ निभाने का वचन देते हैं।',
      ],
      spiritualSignificanceEn:
        'Bhai Dooj reaffirms that relationships grounded in mutual care, gratitude, and emotional shelter are the true foundation of a thriving society.',
      spiritualSignificanceHi:
        'भाई दूज पारिवारिक रिश्तों की मिठास और भाई-बहन के परस्पर स्नेह व सुरक्षा के संकल्प को सुदृढ़ करने का पावन दिन है।',
    },
  ];

  const regionalData = [
    {
      id: 'ayodhya',
      nameEn: 'Ayodhya & Uttar Pradesh',
      nameHi: 'अयोध्या एवं उत्तर प्रदेश',
      badgeEn: 'The Epic Homecoming',
      badgeHi: 'श्री राम का पावन आगमन',
      descEn:
        'In Ayodhya, Diwali is an awe-inspiring spectacle. The historic banks of the sacred Sarayu River host the world-renowned "Deepotsav", where millions of handcrafted clay diyas are simultaneously lit, setting global records. The entire city resounds with Ramcharitmanas recitations, tableaux depicting Rama’s victory over Lanka, and evening aartis illuminating temple spires.',
      descHi:
        'अयोध्या में दीपावली का दृश्य अलौकिक होता है। सरयू नदी के पावन तट पर आयोजित होने वाले "दीपोत्सव" में लाखों मिट्टी के दीये एक साथ जलाए जाते हैं। समूची अयोध्या नगरी "जय श्री राम" के उद्घोष, रामचरितमानस की चौपाइयों और भव्य झांकियों से गूंज उठती है। मंदिरों के शिखरों से लेकर हर घर की मुंडेर दीप-पंक्तियों से जगमगा उठती है।',
      specialtyEn: 'Deepotsav along Sarayu Ghats, Ramkatha enactments, Peda and Gujiya offerings.',
      specialtyHi: 'सरयू घाटों पर विश्व प्रसिद्ध दीपोत्सव, रामलीला मंचन और पारंपरिक पेड़ा-गुजिया का भोग।',
    },
    {
      id: 'rajasthan',
      nameEn: 'Rajasthan & Marwar',
      nameHi: 'राजस्थान एवं मारवाड़',
      badgeEn: 'Golden Heritage & Mandana Art',
      badgeHi: 'स्वर्ण आभा एवं मांडणा लोककला',
      descEn:
        'In Rajasthan, royal palaces, historic forts, and bustling bazaars in Jaipur, Jodhpur, and Udaipur are bathed in warm golden illumination. Courtyards and thresholds are painted with intricate "Mandana" floor art made of chalk paste and red ochre (geru). Markets compete in decoration contests, and families gather for special feasts featuring Mawa Kachori and Ghevar.',
      descHi:
        'राजस्थान में जयपुर, जोधपुर और उदयपुर के ऐतिहासिक किले, हवेलियां और बाजार सुनहरी रोशनी में नहा उठते हैं। घरों के आंगनों में गेरू और खड़िया की सहायता से पारंपरिक "मांडणा" लोककला उकेरी जाती है। बाजारों की भव्य सजावट देखते ही बनती है और परिवार मावा कचौरी, घेवर और दाल-बाटी-चूरमा के साथ उत्सव का आनंद लेते हैं।',
      specialtyEn: 'Mandana floor paintings, Johari Bazaar lighting competitions, Mawa Kachori.',
      specialtyHi: 'गेरू से सजे मांडणा चित्र, जौहरी बाजार की जगमगाहट और प्रसिद्ध मावा कचौरी।',
    },
    {
      id: 'gujarat',
      nameEn: 'Gujarat & Western India',
      nameHi: 'गुजरात एवं पश्चिम भारत',
      badgeEn: 'Chopda Puja & Bestu Varas',
      badgeHi: 'चोपड़ा पूजन व नूतन वर्ष',
      descEn:
        'For Gujaratis, Diwali night marks the conclusion of the commercial year with "Chopda Puja" (worshipping new account ledgers inscribed with Saraswati Vandana and Swastika). The next morning ushers in "Bestu Varas" (New Year), marked by greeting everyone with "Saal Mubarak", touching elders’ feet, and sharing crisp festive snacks like Mathiya, Chorafali, and Ghari.',
      descHi:
        'गुजरात में दीपावली व्यापारिक और आध्यात्मिक दृष्टि से अत्यंत महत्वपूर्ण है। दीपावली की शाम व्यापारी व गृहस्थ "चोपड़ा पूजन" करते हैं, जिसमें नए बही-खातों पर स्वास्तिक बनाकर मां शारदा की स्तुति की जाती है। अगले दिन "बेस्तू वरस" (गुजराती नववर्ष) पर सब "साल मुबारक" कहकर गले मिलते हैं और मठिया, चोराफली व मिठाई बांटते हैं।',
      specialtyEn: 'Chopda Pujan, Bestu Varas (New Year), Mathiya, Chorafali and Ghari sweets.',
      specialtyHi: 'नवीन बही-खाता पूजन, नववर्ष मंगल मिलन, मठिया, चोराफली और सूरत की प्रसिद्ध घारी।',
    },
    {
      id: 'maharashtra',
      nameEn: 'Maharashtra & Konkan',
      nameHi: 'महाराष्ट्र एवं कोंकण',
      badgeEn: 'Diwali Pahar & Traditional Faral',
      badgeHi: 'दीवाली पहाट व स्वादिष्ट फराल',
      descEn:
        'Celebrations in Maharashtra begin before dawn with "Abhyanga Snan" with fragrant Utane paste, followed immediately by "Diwali Pahar" — community classical music and vocal concerts held at sunrise in public parks and auditoriums. Children lovingly construct miniature mud forts (kille) decorated with toy soldiers to honor Chhatrapati Shivaji Maharaj. Families share an elaborate savory-sweet platter called "Faral" (Chakli, Karanji, Shankarpali, and Poha Chivda).',
      descHi:
        'महाराष्ट्र में उत्सव का आरंभ ब्रह्ममुहूर्त में उटणे और सुगंधित तेल से स्नान के साथ होता है। सूर्योदय के समय पार्कों और सभागारों में "दीवाली पहाट" के अंतर्गत शास्त्रीय संगीत की सुमधुर महफिलें सजती हैं। बच्चे छत्रपति शिवाजी महाराज के पराक्रम को नमन करते हुए मिट्टी के छोटे किले (किल्ले) बनाते हैं। घर-घर में चकली, करंजी, शंकरपाळे और चिवड़ा युक्त "फराल" की थाली सजाई जाती है।',
      specialtyEn: 'Diwali Pahar musical concerts, mud fort (kille) building by children, Diwali Faral.',
      specialtyHi: 'सूर्योदय पर दीवाली पहाट संगीत सभाएं, बालकों द्वारा मिट्टी के किल्ले बनाना व स्वादिष्ट फराल।',
    },
    {
      id: 'bengal',
      nameEn: 'West Bengal & Eastern India',
      nameHi: 'पश्चिम बंगाल एवं पूर्वोत्तर भारत',
      badgeEn: 'Fierce Divine Grace — Shyama Puja',
      badgeHi: 'मां श्यामा (काली) का भव्य पूजन',
      descEn:
        'While much of India worships Goddess Lakshmi, West Bengal, Assam, and Odisha venerate Mother Kali on Diwali night (known as Shyama Puja or Kali Puja). Dedicated pandals and homes stay awake all night to worship the cosmic mother who eradicates evil, negative ego, and ignorance. Offerings include deep red hibiscus garlands, sweets, and illuminated terracotta lamps.',
      descHi:
        'बंगाल, असम और ओडिशा में दीपावली की पावन रात मां काली (श्यामा पूजा) को समर्पित होती है। रात भर चलने वाले इस पावन अनुष्ठान में मां काली के उग्र एवं करुणामयी स्वरूप की आराधना की जाती है, जो आसुरी प्रवृत्तियों और अंधकार का नाश करती हैं। मां को गहरे लाल गुड़हल (जबा) के फूलों की माला, मिष्ठान और दीप अर्पित किए जाते हैं।',
      specialtyEn: 'Kali Puja pandals, red hibiscus flower garlands, Sandesh and Rosogolla.',
      specialtyHi: 'श्यामा पूजा के भव्य पंडाल, लाल गुड़हल पुष्प, दीप-मालाएं और प्रसिद्ध संदेश व रसगुल्ले।',
    },
    {
      id: 'south',
      nameEn: 'South India (Tamil Nadu, Karnataka, Andhra)',
      nameHi: 'दक्षिण भारत (तमिलनाडु, कर्नाटक, आंध्र)',
      badgeEn: 'Ganga Snanam & Deepavali Marundu',
      badgeHi: 'गंगा स्नानम् व औषधीय दीवाली मरुन्दु',
      descEn:
        'In the South, celebrations peak on Naraka Chaturdashi. Families wake at 4 AM for "Ganga Snanam" (ritual oil bath sanctified as taking bath in the holy river Ganga). Immediately after, they consume a spoonful of "Deepavali Marundu" (an Ayurvedic medicinal paste made of ginger, pepper, honey, and jaggery to aid digestion before feasting), burst celebratory morning sparklers, and wear brand new festive pattu silk garments.',
      descHi:
        'दक्षिण भारत में दीपावली का मुख्य उत्सव नरक चतुर्दशी के दिन ब्रह्ममुहूर्त में ही शुरू हो जाता है। सुबह ४ बजे तिल के तेल से "गंगा स्नानम्" किया जाता है। इसके पश्चात पाचन और स्वास्थ्य हेतु औषधीय गुणों से भरपूर "दीवाली मरुन्दु" (अदरक, काली मिर्च व शहद का पाचक लेह्यम) खाया जाता है। इसके बाद नए रेशमी वस्त्र पहनकर दीप जलाए जाते हैं और मुरुक्कू व अधिरसम का आनंद लिया जाता है।',
      specialtyEn: 'Pre-dawn Ganga Snanam, Deepavali Marundu digestive paste, Murukku and Athirasam.',
      specialtyHi: 'भोर का पवित्र गंगा स्नानम्, औषधीय दीवाली मरुन्दु, खस्ता मुरुक्कू व पारंपरिक अधिरसम।',
    },
    {
      id: 'punjab',
      nameEn: 'Punjab & Northern Plains',
      nameHi: 'पंजाब एवं उत्तरी भारत',
      badgeEn: 'Bandi Chhor Divas & Harmandir Sahib',
      badgeHi: 'बंदी छोड़ दिवस व स्वर्ण मंदिर आलोक',
      descEn:
        'In Punjab and across Sikh communities globally, Diwali coincides with "Bandi Chhor Divas" (Day of Liberation). In 1619, the sixth Sikh Guru, Guru Hargobind Sahib Ji, was released from Gwalior Fort and secured the unconditional freedom of 52 innocent Hindu kings. Sri Harmandir Sahib (the Golden Temple) in Amritsar is resplendently illuminated with thousands of oil lamps, reflecting on the sacred Sarovar alongside soul-stirring Gurbani kirtan, Gatka martial displays, and communal langar.',
      descHi:
        'पंजाब और समूचे सिख समाज में यह दिन "बंदी छोड़ दिवस" के रूप में अपार श्रद्धा से मनाया जाता है। १६१९ ईस्वी में छठे सिख गुरु श्री हरगोबिंद साहिब जी ने ग्वालियर के किले से ५२ निर्दोष हिंदू राजाओं को स्वतंत्र कराकर अमृतसर की पावन धरा पर वापसी की थी। अमृतसर के सचखंड श्री हरमंदिर साहिब (स्वर्ण मंदिर) को दीपों से सजाया जाता है, जिसकी अलौकिक छवि अमृत सरोवर में दिखाई देती है।',
      specialtyEn: 'Illumination of the Golden Temple, soul-stirring Gurbani, Gatka martial art, community Langar.',
      specialtyHi: 'स्वर्ण मंदिर का दिव्य दीपदान, गुरबाणी कीर्तन, गतका प्रदर्शन और विशाल लंगर सेवा।',
    },
  ];

  const factsData = [
    {
      number: '01',
      titleEn: 'Ancient Sanskrit Etymology',
      titleHi: 'संस्कृत व्युत्पत्ति: दीप + आवलि',
      descEn:
        'The name "Deepavali" is a classical Sanskrit compound word composed of "Dīpa" (दीप, meaning lamp or radiant flame) and "Āvali" (आवलि, meaning row, line, or continuous series). Literally translating to "a continuous garland of illuminated lamps", it accurately reflects the ancient practice of lining thresholds with oil lamps.',
      descHi:
        '"दीपावली" शब्द शुद्ध संस्कृत के दो शब्दों "दीप" (दीपक) और "आवलि" (कतार या माला) से मिलकर बना है। इसका शाब्दिक अर्थ है "दीपकों की अनवरत पंक्ति", जो हर देहरी पर सजे मिट्टी के दीयों के दृश्य को व्यक्त करता है।',
    },
    {
      number: '02',
      titleEn: 'Celebrated on the Darkest Moonless Night',
      titleHi: 'कार्तिक अमावस्या — घोर अंधकार में प्रकाश की विजय',
      descEn:
        'While most major Indian festivals (such as Holi, Raksha Bandhan, and Guru Nanak Jayanti) are celebrated on full-moon nights (Purnima), Diwali uniquely falls on Amavasya — the darkest new moon night of the autumn month of Kartik. This emphasizes the philosophical truth that spiritual illumination shines brightest when confronting absolute darkness.',
      descHi:
        'अधिकांश भारतीय पर्व पूर्णिमा के दिन मनाए जाते हैं, किंतु दीपावली वर्ष की सबसे घनी अंधेरी रात (कार्तिक अमावस्या) को मनाई जाती है। यह इस गहन दार्शनिक सत्य को स्थापित करती है कि सच्चा आत्म-प्रकाश घोर अंधकार में ही सबसे प्रखर होकर चमकता है।',
    },
    {
      number: '03',
      titleEn: 'Convergence of Three Great World Faiths',
      titleHi: 'तीन महान धर्मों का पावन संगम',
      descEn:
        'Diwali is concurrently celebrated with profound religious devotion across three distinct Indian traditions: Hindus celebrate Rama’s homecoming and Lakshmi Puja; Jains celebrate the Nirvana (final liberation) of their 24th Tirthankara, Bhagwan Mahavira, at Pavapuri in 527 BCE; and Sikhs celebrate Bandi Chhor Divas honoring Guru Hargobind Sahib Ji’s righteous liberation of 52 kings in 1619.',
      descHi:
        'दीपावली तीन प्रमुख परंपराओं का संगम है: सनातन धर्म में यह श्री राम के आगमन व महालक्ष्मी कृपा का उत्सव है; जैन धर्म में भगवान महावीर के निर्वाण (मोक्ष) का पावन दिवस है; और सिख धर्म में यह छठे गुरु हरगोबिंद साहिब जी का "बंदी छोड़ दिवस" है।',
    },
    {
      number: '04',
      titleEn: 'Sustaining India’s Potter Heritage (Kumhars)',
      titleHi: 'पारंपरिक कुम्हारों और ग्रामीण अर्थव्यवस्था का संबल',
      descEn:
        'Over one billion handmade terracotta diyas are crafted across Indian villages each Diwali season. This sustains the livelihood of traditional hereditary potters (Kumhars), keeping a 5,000-year-old terracotta handicraft tradition alive that traces directly back to the Indus Valley Civilization.',
      descHi:
        'प्रत्येक दीपावली पर भारत भर में एक अरब से अधिक मिट्टी के दीये हस्तनिर्मित किए जाते हैं। यह प्राचीन कुम्हार समाज की आजीविका को सीधा संबल देता है और सिंधु घाटी सभ्यता से चली आ रही ५,००० वर्ष पुरानी मृदा-शिल्प परंपरा को जीवंत बनाए रखता है।',
    },
    {
      number: '05',
      titleEn: 'Chopda Puja & Closing the Fiscal Year',
      titleHi: 'चोपड़ा पूजन — व्यापारिक बही-खातों का पावन आरंभ',
      descEn:
        'In Gujarat and commercial centers across India, Diwali night marks the official closing of the previous financial year and the commencement of the new commercial calendar. Merchants conduct "Chopda Puja", sanctifying fresh account ledgers with vermilion Swastikas and writing "Shubh Labh" (Auspiciousness & Righteous Profit).',
      descHi:
        'व्यापारिक समाज में दीपावली की रात पुराने वित्तीय वर्ष के समापन और नवीन बही-खातों के पूजन का समय होता है। "चोपड़ा पूजन" में कलम-दवात और बही-खातों पर सिंदूर से ॐ और स्वास्तिक अंकित कर वर्ष भर के नैतिक व्यापार का संकल्प लिया जाता है।',
    },
    {
      number: '06',
      titleEn: 'Official Public Holiday in Over 10 Nations',
      titleHi: '१० से अधिक देशों में आधिकारिक राष्ट्रीय अवकाश',
      descEn:
        'Far beyond the borders of India, Diwali is celebrated as an official public national holiday in more than 10 sovereign nations with historic Indian diaspora communities, including Nepal (as Tihar), Fiji, Mauritius, Trinidad and Tobago, Guyana, Suriname, Singapore, Malaysia, and Sri Lanka.',
      descHi:
        'भारत के अतिरिक्त दीपावली नेपाल (तिहार), फिजी, मॉरीशस, त्रिनिदाद और टोबैगो, गुयाना, सूरीनाम, सिंगापुर, मलेशिया और श्रीलंका सहित विश्व के १० से अधिक देशों में आधिकारिक राष्ट्रीय सार्वजनिक अवकाश के रूप में मनाई जाती है।',
    },
    {
      number: '07',
      titleEn: 'Commemorated in International Parliaments',
      titleHi: 'विश्व संसद व ह्वाइट हाउस में दीपोत्सव',
      descEn:
        'Diwali is officially marked with ceremonial diya lighting in prestigious global institutions worldwide, including the United States White House (inaugurated in 2003), the British Houses of Parliament in Westminster, and the federal Parliament of Australia in Canberra.',
      descHi:
        'दीपावली का सम्मान विश्व स्तर पर स्थापित है। अमेरिकी राष्ट्रपति भवन (ह्वाइट हाउस), ब्रिटिश संसद और ऑस्ट्रेलियाई संसद में प्रतिवर्ष वैदिक मंत्रोच्चार और मिट्टी के दीये जलाकर दीपावली का आधिकारिक उत्सव आयोजित किया जाता है।',
    },
    {
      number: '08',
      titleEn: 'Reverence for Cows & Agriculture (Gau Puja)',
      titleHi: 'गोवर्धन पर गो-माता व कृषि का सम्मान',
      descEn:
        'On Day 4 (Govardhan Puja), agrarian households across India bathe, garland, and apply sacred turmeric paste to cows and bullocks. Known as Gau Puja, this practice honors cattle not merely as domestic livestock, but as sacred providers of nourishment, soil fertility, and rural sustenance.',
      descHi:
        'गोवर्धन पूजा के दिन ग्रामीण भारत में गो-माता और बैलों का भव्य पूजन किया जाता है। उन्हें नहलाकर सींगों पर हल्दी लगाई जाती है और माला पहनाई जाती है, जो भारतीय समाज में पशुधन और कृषि के प्रति अपार कृतज्ञता का प्रमाण है।',
    },
    {
      number: '09',
      titleEn: 'Ayurvedic Wisdom of Abhyanga Snan',
      titleHi: 'अभ्यंग स्नान का प्राचीन आयुर्वेदिक विज्ञान',
      descEn:
        'The dawn herbal bath on Naraka Chaturdashi is not just a ritual, but an ancient Ayurvedic health transition practice. Massaging sesame oil and herbal ubtan into the body counters seasonal dryness, stimulates blood circulation, and prepares the human physiology for the onset of winter.',
      descHi:
        'नरक चतुर्दशी की भोर में किया जाने वाला "अभ्यंग स्नान" केवल धार्मिक रीत नहीं, बल्कि गहन आयुर्वेदिक विज्ञान है। तिल के तेल और जड़ी-बूटी युक्त उबटन से त्वचा की मालिश वर्षा के बाद आने वाले शीतकाल में शरीर को नव-ऊर्जा और स्निग्धता प्रदान करती है।',
    },
    {
      number: '10',
      titleEn: 'Illumination of the Golden Temple in 1619',
      titleHi: '१६१९ ईस्वी: स्वर्ण मंदिर में दीपों का अलौकिक दृश्य',
      descEn:
        'When the sixth Sikh Guru, Guru Hargobind Sahib Ji, was released from wrongful confinement in Gwalior Fort after successfully securing the liberty of 52 fellow captive Rajput kings, he arrived at Amritsar on Diwali day. The citizens illuminated Sri Harmandir Sahib with thousands of earthen lamps, initiating the Bandi Chhor Divas tradition.',
      descHi:
        'जब सिखों के छठे गुरु श्री हरगोबिंद साहिब जी ५२ निर्दोष हिंदू राजाओं को ग्वालियर किले से मुक्त कराकर अमृतसर पहुंचे, तो वह दीपावली का ही पावन दिन था। अमृतसर वासियों ने उनके स्वागत में सचखंड हरमंदिर साहिब को दीपों से सजाकर इस दिन को "बंदी छोड़ दिवस" बना दिया।',
    },
  ];

  return (
    <article className="w-full space-y-16 py-8">
      {/* 0. JUMP NAVIGATION PILLS */}
      <nav
        aria-label={isHindi ? 'दीपावली लेख अनुभाग' : 'Diwali Guide Sections'}
        className="sticky top-16 z-30 bg-[#24113D]/95 backdrop-blur-md border-y border-[#F2D98B]/30 py-3 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-semibold whitespace-nowrap pb-1">
            <span className="text-[#F2D98B] flex items-center gap-1 pr-2 border-r border-white/20">
              <Compass size={14} />
              <span>{isHindi ? 'अनुभाग:' : 'Jump to:'}</span>
            </span>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#F2D98B] hover:text-[#24113D] text-[#FAF7F0] border border-white/15 transition-all text-[11px] sm:text-xs"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* SECTION 1: WHAT IS DIWALI? */}
      <section
        id="what-is-diwali"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Flame size={14} className="text-brand-gold" />
            <span>{isHindi ? 'प्रथम अनुभाग • परिचय एवं अर्थ' : 'Section 1 • Origin & Meaning'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'दीपावली (दिवाली) क्या है? शाब्दिक अर्थ, ज्योति का प्रतीक व दर्शन'
              : 'What is Diwali? The Meaning of Deepavali, Light Symbolism & Core Philosophy'}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-md space-y-6 text-brand-dark/90 leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg font-medium text-brand-deep">
            {isHindi
              ? 'दीपावली (या दिवाली) केवल एक रात का दीपोत्सव नहीं है, अपितु भारतीय सनातन संस्कृति और दर्शन का सबसे पवित्र, विराट और व्यापक प्रकाश महापर्व है। यह अंधकार पर ज्योति, अज्ञान पर आत्म-ज्ञान और बुराई पर अच्छाई की शाश्वत विजय का जीवंत उद्घोष है।'
              : 'Diwali, also reverently called Deepavali, is India’s foremost festival of lights. Spanning five consecrated days in the autumn month of Kartik, it stands as an enduring global celebration of the spiritual victory of light over darkness, knowledge over ignorance, and righteousness over malevolence.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-brand-gold/30 space-y-3">
              <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
                <Sun size={18} className="text-brand-gold" />
                <span>{isHindi ? 'शाब्दिक अर्थ व संस्कृत व्युत्पत्ति' : 'Etymology & Sanskrit Roots'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80">
                {isHindi
                  ? 'शब्द "दीपावली" मूल संस्कृत के दो शब्दों के मेल से बना है: "दीप" (Dīpa = मिट्टी का दिया, प्रकाश) और "आवलि" (Āvali = कतार, पंक्ति या निरंतर शृंखला)। इसका शाब्दिक अर्थ है "दीपकों की निरंतर पंक्ति"। समय के साथ प्राकृत व अपभ्रंश से होते हुए उत्तर भारत में इसका तद्भव रूप "दिवाली" लोकप्रिय हुआ, जबकि दक्षिण भारत व शास्त्रीय संदर्भों में इसे आज भी "दीपावली" ही कहा जाता है।'
                  : 'Linguistically, "Deepavali" originates from two ancient Sanskrit roots: "Dīpa" (दीप, meaning an earthen lamp or radiant light) and "Āvali" (आवलि, meaning a continuous line, row, or garland). Literally translated, Deepavali means "a continuous garland of illuminated lamps". In modern Indo-Aryan languages, it colloquially evolved into "Diwali", though both terms describe the identical sacred festival.'}
              </p>
            </div>

            <div className="bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-brand-gold/30 space-y-3">
              <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
                <Sparkles size={18} className="text-brand-gold" />
                <span>{isHindi ? 'भारतीय संस्कृति में प्रकाश का प्रतीक' : 'What Light Symbolizes in Indian Thought'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80">
                {isHindi
                  ? 'भारतीय दर्शन में प्रकाश केवल भौतिक उजाला नहीं है। प्रकाश सत्य (Satya), ज्ञान (Jnana), चैतन्य और नैतिक धर्म का प्रतीक है। जिस प्रकार एक छोटा सा दीया घने तिमिर को चीरकर पथ आलोकित कर देता है, उसी प्रकार मनुष्य के भीतर का आत्म-ज्ञान समस्त अज्ञान, भय, ईर्ष्या और संशय को भस्म कर देता है।'
                  : 'In Indian philosophy, light is far more than physical illumination. Light personifies Satya (absolute truth), Jnana (pure wisdom), moral consciousness (Dharma), and the eternal inner spark (Atman). A tiny clay diya fearlessly pierces the thickest midnight gloom, reminding us that no degree of external ignorance can conquer internal awareness.'}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#24113D] to-[#45216B] text-[#FAF7F0] space-y-2 border border-[#F2D98B]/30">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2D98B] block">
              {isHindi ? 'उपनिषद का शाश्वत संदेश' : 'The Core Upanishadic Aspiration'}
            </span>
            <p className="font-serif text-base sm:text-xl italic text-white">
              &quot;असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय॥&quot;
            </p>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/85 font-light">
              {isHindi
                ? 'वृहदारण्यक उपनिषद का यह पावन मंत्र दीपावली का सार है: "हे प्रभु! हमें असत्य से सत्य की ओर, अंधकार से प्रकाश की ओर और मृत्यु से अमरत्व की ओर ले चलो।" दीपावली हमें अपने भीतर के अहंकार को त्यागकर आत्म-प्रकाश जगाने का संदेश देती है।'
                : 'From the Brihadaranyaka Upanishad: "Lead us from untruth to truth, from darkness unto light, from mortality to immortality." This foundational prayer is the beating heart of Diwali: dispelling internal lethargy and awakening compassion for every living being.'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><MonetagAdSlot variant="in-content" /></div>

      {/* SECTION 2: WHY DO WE CELEBRATE DIWALI? */}
      <section
        id="why-celebrate"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <BookOpen size={14} className="text-brand-gold" />
            <span>{isHindi ? 'द्वितीय अनुभाग • पावन कथाएं व पृष्ठभूमि' : 'Section 2 • Sacred Lore & Origins'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'हम दिवाली क्यों मनाते हैं? धार्मिक, सांस्कृतिक व पौराणिक कथाएं'
              : 'Why Do We Celebrate Diwali? Major Sacred Stories & Regional Interpretations'}
          </h2>
        </div>

        {/* Multi-faith nuance alert */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <ShieldCheck size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            {isHindi
              ? 'महत्वपूर्ण तथ्य: दीपावली की कोई एक अकेली कथा या कारण नहीं है। भारत के विभिन्न क्षेत्रों, संप्रदायों और धर्मों में इस पर्व को अलग-अलग पावन घटनाओं की स्मृति में मनाया जाता है। ये सभी धाराएं सत्य, प्रेम, करुणा और प्रकाश के एक ही मूल विचार में विलीन होती हैं।'
              : 'Essential Note: Diwali is not rooted in a single monocultural legend. Across India’s vast geography and multiple spiritual traditions, different communities commemorate distinct sacred events on this day. Each tradition weaves its own profound thread into the shared tapestry of light, hope, and ethical living.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rama Homecoming */}
          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold text-xl">
                🏹
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep">
                {isHindi ? 'भगवान श्री राम का अयोध्या आगमन' : 'Bhagwan Shri Rama’s Return to Ayodhya'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi
                  ? 'रामायण के अनुसार, मर्यादा पुरुषोत्तम प्रभु श्री राम ने लंकापति रावण का संहार कर धर्म की पुनः स्थापना की थी। जब वे १४ वर्षों के वनवास के पश्चात माता सीता, लक्ष्मण और हनुमान जी के साथ अयोध्या लौटे, तो वह कार्तिक मास की अंधेरी अमावस्या थी। अयोध्या के प्रजाजनों ने अपने प्रिय राजा के स्वागत में संपूर्ण नगरी को मिट्टी के घी के दीयों से जगमगा दिया था। तभी से कार्तिक अमावस्या को दीपदान की यह परंपरा चली आ रही है।'
                  : 'According to the Ramayana, Bhagwan Shri Rama triumphed over the demon king Ravana, restoring cosmic Dharma. When Rama, accompanied by Devi Sita, Lakshmana, and Hanuman, returned to Ayodhya after 14 years of forest exile, it was the pitch-black night of Kartik Amavasya. Overjoyed citizens illuminated every courtyard, rooftop, and street with rows of earthen ghee lamps (diyas) to guide and welcome their righteous king home.'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-brand-light/60 border border-brand-gold/20 text-[11px] text-brand-dark/75">
              <span className="font-bold text-brand-deep block">
                {isHindi ? 'प्रतीकात्मक अर्थ:' : 'Spiritual Meaning:'}
              </span>
              {isHindi
                ? 'हृदय रूपी अयोध्या में जब सद्गुणों (श्री राम) की पुनः प्रतिष्ठा होती है, तो अंतःकरण में स्वतः आनंद के दीप जल उठते हैं।'
                : 'When righteousness and truth are re-enthroned in the heart, inner peace naturally radiates to the world.'}
            </div>
          </div>

          {/* Lakshmi-Ganesha Worship */}
          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold text-xl">
                🪙
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep">
                {isHindi ? 'माता लक्ष्मी व भगवान गणेश का संयुक्त पूजन' : 'The Significance of Lakshmi & Ganesha Worship'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi
                  ? 'दीपावली की शाम को धन की देवी महालक्ष्मी और बुद्धि के देव श्री गणेश का एक साथ पूजन होता है। पौराणिक कथा के अनुसार क्षीर सागर के मंथन से इसी पावन रात्रि को माता लक्ष्मी का प्राकट्य हुआ था। दोनों का संयुक्त पूजन इसलिए किया जाता है क्योंकि विवेक (बुद्धि) के बिना धन केवल अहंकार और विनाश लाता है। जब बुद्धि और धन एक साथ मिलते हैं, तभी घर में वास्तविक सुख, शांति और समृद्धि आती है।'
                  : 'On Diwali evening, families worship Goddess Lakshmi (bestower of abundance and spiritual fortune) alongside Lord Ganesha (patron of intellect, discernment, and remover of obstacles). Ancient texts recount that Devi Lakshmi emerged from the churning of the cosmic ocean (Samudra Manthan) on this night. Worshipping them together reflects the profound truth that wealth without wisdom breeds arrogance and ruin; only when guided by intellect does prosperity bear noble fruit.'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-brand-light/60 border border-brand-gold/20 text-[11px] text-brand-dark/75">
              <span className="font-bold text-brand-deep block">
                {isHindi ? 'ज्ञान व वैभव का संतुलन:' : 'Wisdom & Wealth Harmony:'}
              </span>
              {isHindi
                ? 'गणेश जी ज्ञान प्रदान करते हैं और लक्ष्मी जी वैभव। दोनों का संगम ही सच्चा ऐश्वर्य है।'
                : 'Ganesha grants discernment, while Lakshmi grants abundance. True prosperity is ethical and wise.'}
            </div>
          </div>

          {/* Krishna & Narakasura */}
          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold text-xl">
                🦚
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep">
                {isHindi ? 'श्रीकृष्ण द्वारा नरकासुर वध (नरक चतुर्दशी)' : 'Lord Krishna Defeating Narakasura'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi
                  ? 'द्वापर युग में प्राग्ज्योतिषपुर का असुर राजा नरकासुर अत्यंत क्रूर हो गया था। उसने देवों और मनुष्यों पर अत्याचार किए और १६,००० स्त्रियों को बंदी बना लिया था। नरक चतुर्दशी के दिन भगवान श्रीकृष्ण ने देवी सत्यभामा के साथ मिलकर नरकासुर का वध किया और सभी बंदियों को सम्मानपूर्वक मुक्त कराया। इसी विजय के उल्लास में दक्षिण और पश्चिम भारत में दीप प्रज्वलित कर प्रभात स्नान किया जाता है।'
                  : 'In the Dvapara Yuga, the demon king Narakasura wreaked havoc across worlds, stealing celestial treasures and imprisoning 16,000 women. On Naraka Chaturdashi (the day before main Diwali), Lord Krishna and his consort Satyabhama vanquished Narakasura and liberated the captives, restoring their dignity and freedom. In South and West India, this triumph is celebrated with pre-dawn oil baths and joyful sparklers.'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-brand-light/60 border border-brand-gold/20 text-[11px] text-brand-dark/75">
              <span className="font-bold text-brand-deep block">
                {isHindi ? 'सामाजिक संदेश:' : 'Social Imperative:'}
              </span>
              {isHindi
                ? 'नारी सम्मान की रक्षा और निर्बलों को अत्याचार से मुक्ति दिलाना ही धर्म का सर्वोच्च रूप है।'
                : 'Upholding human dignity and liberating the vulnerable from oppression is the highest duty of Dharma.'}
            </div>
          </div>

          {/* Govardhan & Bhai Dooj */}
          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold text-xl">
                🏔️
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep">
                {isHindi ? 'गोवर्धन पूजा और भाई दूज का महत्व' : 'Govardhan Puja & Bhai Dooj Traditions'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi
                  ? 'दीवाली के अगले दिन गोवर्धन पूजा पर भगवान श्रीकृष्ण द्वारा इंद्र के मान-मर्दन और गोवर्धन पर्वत उठाने की कथा स्मरण की जाती है, जो हमें पर्यावरण और गो-माता के संरक्षण की सीख देती है। इसके बाद पांचवें दिन "भाई दूज" (यम द्वितीया) पर यमराज और उनकी बहन यमुना के अमर प्रेम का स्मरण किया जाता है, जहां बहनें भाई को तिलक लगाकर उनकी सुरक्षा और दीर्घायु की प्रार्थना करती हैं।'
                  : 'On the fourth day, Govardhan Puja honors Lord Krishna lifting Mount Govardhan to shield Vrindavan’s cowherds and fauna from destructive deluges, shifting human worship toward living nature and cows. On the fifth day, Bhai Dooj (Yama Dwitiya) honors the legendary visit of Lord Yama to his sister Yami (the Yamuna river), where sibling devotion, mutual hospitality, and protection are celebrated with heartfelt blessings.'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-brand-light/60 border border-brand-gold/20 text-[11px] text-brand-dark/75">
              <span className="font-bold text-brand-deep block">
                {isHindi ? 'पारिवारिक व प्राकृतिक मूल्य:' : 'Family & Environmental Values:'}
              </span>
              {isHindi
                ? 'प्रकृति के प्रति विनम्रता और पारिवारिक संबंधों में निस्वार्थ प्रेम ही जीवन का संबल हैं।'
                : 'Living in harmony with nature and cherishing unshakeable family bonds sustain human well-being.'}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HISTORICAL & RELIGIOUS SIGNIFICANCE ACROSS TRADITIONS */}
      <section
        id="significance-traditions"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Layers size={14} className="text-brand-gold" />
            <span>{isHindi ? 'तृतीय अनुभाग • ऐतिहासिक व बहु-धार्मिक महत्व' : 'Section 3 • Significance Across Faiths'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'विभिन्न भारतीय परंपराओं में दीपावली का विशिष्ट महत्व'
              : 'Historical & Religious Significance: Hindu, Jain & Sikh Traditions'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/75">
            {isHindi
              ? 'दीपावली केवल एक समुदाय का पर्व नहीं है। यह भारत के अनेक आध्यात्मिक दर्शनों का गौरवशाली मिलन बिंदु है।'
              : 'Diwali represents a harmonious convergence of distinct Indian traditions, each preserving its own revered history and sacred practices.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hindu Tradition */}
          <div className="bg-white rounded-3xl p-6 border-2 border-brand-gold/40 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-300 inline-block">
                {isHindi ? 'सनातन / हिंदू परंपरा' : 'Hindu Tradition'}
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-deep">
                {isHindi ? 'आध्यात्मिक नवजीवन व श्री लक्ष्मी कृपा' : 'Spiritual Renewal & Lakshmi’s Grace'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi
                  ? 'हिंदू परंपरा में दीपावली शरद ऋतु की फसल कटने के बाद समृद्धि का आभार व्यक्त करने का समय है। यह पर्व घर की शुद्धि, नए संकल्प, बही-खाता पूजन, और प्रभु श्री राम के धर्म-राज्य की स्थापना का प्रतीक है। पद्म पुराण और स्कंद पुराण में दीयों की अग्नि को सूर्य का प्रतिनिधि मानकर तिमिर-नाशक बताया गया है।'
                  : 'For Hindus, Diwali is the season of Thanksgiving following the autumn harvest. It marks the sanctification of the household, the closing of old business ledgers, the homecoming of Lord Rama, and the invocation of Goddess Lakshmi for ethical abundance, family harmony, and the victory of virtue over vice.'}
              </p>
            </div>
            <div className="pt-3 border-t border-brand-gold/20 text-xs font-semibold text-brand-royal">
              {isHindi ? 'मुख्य आराध्य: श्री राम, महालक्ष्मी, श्री गणेश' : 'Core Focus: Shri Rama, Mahalakshmi, Ganesha'}
            </div>
          </div>

          {/* Jain Tradition */}
          <div className="bg-white rounded-3xl p-6 border-2 border-brand-gold/40 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 inline-block">
                {isHindi ? 'जैन परंपरा' : 'Jain Tradition'}
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-deep">
                {isHindi ? 'भगवान महावीर का पावन निर्वाण दिवस' : 'Bhagwan Mahavira’s Nirvana'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi
                  ? 'जैन धर्म में दीपावली अत्यंत पावन और ऐतिहासिक दिवस है। ५२७ ईसा पूर्व में कार्तिक अमावस्या के दिन ही २४वें तीर्थंकर भगवान महावीर स्वामी ने पावापुरी (बिहार) में कैवल्य ज्ञान प्राप्त कर महापरिनिर्वाण (मोक्ष) प्राप्त किया था। जैन धर्मग्रंथ कल्पसूत्र के अनुसार, जब भगवान का भौतिक शरीर शांत हुआ, तो देवताओं और राजाओं ने कहा: "ज्ञान का प्रकाश चला गया, अब हम द्रव्य दीप जलाकर ज्ञान की ज्योति को अमर रखेंगे।"'
                  : 'In Jainism, Diwali marks one of the most sacred dates in history: the Nirvana (final liberation from the cycle of rebirth) of the 24th Tirthankara, Bhagwan Mahavira, at Pavapuri in 527 BCE. According to the Jain text Kalpasutra, when Mahavira attained Moksha, gods and 16 kings illuminated the dark night with clay lamps, declaring: "Since the light of supreme wisdom is gone, let us keep it alive through physical lamps."'}
              </p>
            </div>
            <div className="pt-3 border-t border-brand-gold/20 text-xs font-semibold text-brand-royal">
              {isHindi ? 'मुख्य आराध्य: भगवान महावीर (अहिंसा व मोक्ष)' : 'Core Focus: Bhagwan Mahavira (Ahimsa & Moksha)'}
            </div>
          </div>

          {/* Sikh Tradition */}
          <div className="bg-white rounded-3xl p-6 border-2 border-brand-gold/40 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-950 border border-yellow-300 inline-block">
                {isHindi ? 'सिख परंपरा' : 'Sikh Tradition'}
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-deep">
                {isHindi ? 'बंदी छोड़ दिवस — स्वतंत्रता व न्याय का पर्व' : 'Bandi Chhor Divas — Day of Liberation'}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi
                  ? 'सिख इतिहास में दीपावली को "बंदी छोड़ दिवस" (मुक्ति का दिवस) के रूप में श्रद्धा से मनाया जाता है। १६१९ ईस्वी में छठे सिख गुरु श्री हरगोबिंद साहिब जी को मुगल बादशाह जहांगीर ने ग्वालियर किले से रिहा करने का आदेश दिया। गुरु जी ने अकेले मुक्त होने से मना कर दिया और शर्त रखी कि उनके साथ अन्यायपूर्वक बंदी बनाए गए ५२ निर्दोष हिंदू राजाओं को भी रिहा किया जाए। गुरु जी ने ५२ कलियों वाला विशेष चोगा सिलवाया, जिसकी एक-एक कली पकड़कर सभी राजा सुरक्षित बाहर आए।'
                  : 'In Sikhism, Diwali is revered as Bandi Chhor Divas ("Day of Liberation"). In 1619, the sixth Sikh Guru, Guru Hargobind Sahib Ji, was released from wrongful imprisonment at Gwalior Fort by Emperor Jahangir. Refusing to leave alone, the Guru negotiated the unconditional freedom of 52 innocent Hindu kings imprisoned with him, having a cloak stitched with 52 tassels so each king could hold one and walk out to liberty.'}
              </p>
            </div>
            <div className="pt-3 border-t border-brand-gold/20 text-xs font-semibold text-brand-royal">
              {isHindi ? 'मुख्य आराध्य: गुरु हरगोबिंद साहिब जी (मानव अधिकार)' : 'Core Focus: Guru Hargobind Sahib Ji & Freedom'}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE FIVE DAYS OF DIWALI - VISUAL TIMELINE */}
      <span id="traditions" className="block -mt-28 pt-28 pointer-events-none" />
      <section
        id="five-days-timeline"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Calendar size={14} className="text-brand-gold" />
            <span>{isHindi ? 'चतुर्थ अनुभाग • पांच पावन दिवस' : 'Section 4 • Five Sacred Days Timeline'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'दीपावली के पांच पावन दिवस: तिथि, परंपरा, अनुष्ठान व आध्यात्मिक महत्व'
              : 'The Five Days of Diwali: Chronological Journey, Rituals & Meaning'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/75">
            {isHindi
              ? 'धनतेरस से भाई दूज तक — प्रत्येक दिन का एक विशिष्ट आध्यात्मिक उद्देश्य और गृह-परंपरा है।'
              : 'From Dhanteras to Bhai Dooj — each consecutive day carries distinct sacred duties, customs, and blessings.'}
          </p>
        </div>

        {/* Interactive / Visual Timeline Tabs */}
        <div className="bg-white rounded-3xl border border-brand-gold/30 shadow-lg p-6 sm:p-8 space-y-8">
          {/* Day Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {fiveDaysData.map((d) => (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => setActiveDayTab(d.dayNumber)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  activeDayTab === d.dayNumber
                    ? 'bg-[#24113D] text-[#FAF7F0] border-[#F2D98B] shadow-md scale-[1.02]'
                    : 'bg-[#FAF7F0] text-brand-dark border-brand-gold/30 hover:border-brand-gold'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{d.icon}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeDayTab === d.dayNumber ? 'bg-white/20 text-[#F2D98B]' : 'bg-brand-royal/10 text-brand-royal'
                    }`}
                  >
                    Day {d.dayNumber}
                  </span>
                </div>
                <div className="text-xs font-bold truncate">
                  {isHindi
                    ? d.dayNumber === 1
                      ? 'धनतेरस'
                      : d.dayNumber === 2
                        ? 'नरक चतुर्दशी'
                        : d.dayNumber === 3
                          ? 'लक्ष्मी पूजन'
                          : d.dayNumber === 4
                            ? 'गोवर्धन पूजा'
                            : 'भाई दूज'
                    : d.dayNumber === 1
                      ? 'Dhanteras'
                      : d.dayNumber === 2
                        ? 'Choti Diwali'
                        : d.dayNumber === 3
                          ? 'Lakshmi Puja'
                          : d.dayNumber === 4
                            ? 'Govardhan'
                            : 'Bhai Dooj'}
                </div>
              </button>
            ))}
          </div>

          {/* Active Day Detail Display */}
          {(() => {
            const cur = fiveDaysData.find((d) => d.dayNumber === activeDayTab) || fiveDaysData[0];
            return (
              <div className="space-y-6 pt-4 border-t border-brand-gold/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-royal">
                      {isHindi ? cur.tithiHi : cur.tithiEn}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep mt-0.5">
                      {isHindi ? cur.titleHi : cur.titleEn}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-xs font-bold text-brand-deep self-start sm:self-auto">
                    <Sparkles size={14} className="text-brand-gold" />
                    <span>{isHindi ? cur.themeHi : cur.themeEn}</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark/70">
                    {isHindi ? 'पर्व का परिचय व पृष्ठभूमि:' : 'What This Day Represents & History:'}
                  </h4>
                  <p className="text-sm sm:text-base text-brand-dark/85 leading-relaxed font-sans">
                    {isHindi ? cur.whatItIsHi : cur.whatItIsEn}
                  </p>
                </div>

                {/* Important Rituals */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-royal flex items-center gap-2">
                    <Flame size={15} className="text-brand-gold" />
                    <span>{isHindi ? 'प्रमुख परंपराएं व गृह-विधान:' : 'Important Rituals & Family Customs:'}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-brand-dark/85">
                    {(isHindi ? cur.ritualsHi : cur.ritualsEn).map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spiritual Meaning */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#24113D]/5 border border-brand-gold/30 flex items-start gap-3 text-xs sm:text-sm text-brand-deep">
                  <Award size={18} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">
                      {isHindi ? 'आध्यात्मिक सीख:' : 'Philosophical & Spiritual Insight:'}
                    </span>
                    <span>{isHindi ? cur.spiritualSignificanceHi : cur.spiritualSignificanceEn}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Note on Calendar Variations */}
        <p className="text-[11px] sm:text-xs text-brand-dark/60 italic text-center">
          {isHindi
            ? 'सूचना: तिथि वृद्धि व क्षय के कारण पंचांग भेद से कुछ क्षेत्रों में नरक चतुर्दशी और लक्ष्मी पूजन एक ही दिन अथवा तिथियों में एक दिन का अंतर हो सकता है।'
            : 'Regional Calendar Note: Due to lunar tithi timings and sunrise alignments, certain regional calendars may observe Naraka Chaturdashi and Lakshmi Puja on the same calendar date.'}
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><MonetagAdSlot variant="banner" /></div>

      {/* SECTION 5: HOW IS DIWALI CELEBRATED IN INDIA? */}
      <section
        id="how-celebrated"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Flame size={14} className="text-brand-gold" />
            <span>{isHindi ? 'पंचम अनुभाग • भारतीय उत्सव शैली' : 'Section 5 • How India Celebrates'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'भारत में दीपावली कैसे मनाई जाती है? सफाई, दीपदान, रंगोली व उत्सव'
              : 'How Is Diwali Celebrated in India? Traditions, Preparations & Practices'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/75">
            {isHindi
              ? 'सप्ताह भर पहले की सफाई से लेकर दीयों की कतारों और आत्मीय मिलन तक — उत्सव के मुख्य चरण।'
              : 'From meticulous home sanitization to the warmth of family dinners and radiant diyas — step-by-step celebrations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center text-xl font-bold">
              🧹
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {isHindi ? '१. गृह स्वच्छता व नवीनीकरण' : '1. Deep Cleaning, Painting & Decluttering'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
              {isHindi
                ? 'दिवाली से कई सप्ताह पूर्व घरों में गहरी सफाई, पुताई और अनुपयोगी वस्तुओं को हटाने का कार्य आरंभ होता है। वर्षा ऋतु के उपरांत यह अभ्यास घर को कीटाणुमुक्त और स्वच्छ बनाता है। शास्त्रों के अनुसार देवी लक्ष्मी उसी घर में प्रवेश करती हैं जो स्वच्छ, शांत और व्यवस्थित हो।'
                : 'Weeks before Diwali, households undertake rigorous decluttering, repairs, and fresh whitewashing. Originating as a post-monsoon hygiene practice to clear dampness and pests, this reflects the belief that Goddess Lakshmi blesses serene, radiant, and well-organized sanctums.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center text-xl font-bold">
              🪔
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {isHindi ? '२. मिट्टी के दीयों से आलोक' : '2. Terracotta Diyas & Warm Illumination'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
              {isHindi
                ? 'कार्तिक अमावस्या की गोधूलि वेला में घर की प्रत्येक मुंडेर, खिड़की, सीढ़ी और तुलसी चौबारे पर सरसों अथवा तिल के तेल से भरे मिट्टी के दीये जलाए जाते हैं। मिट्टी के दीयों की सौंधी खुशबू और लौ की धीमी चमक घर में अलौकिक सकारात्मक ऊर्जा का संचार करती है।'
                : 'As twilight falls on Amavasya, every parapet, balcony railing, doorstep, and sacred Tulsi plant is adorned with natural earthen diyas filled with mustard or sesame oil. The soft golden flickering of clay lamps creates an ethereal atmosphere that artificial bulbs cannot replicate.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center text-xl font-bold">
              🌸
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {isHindi ? '३. रंगोली व ताजे फूलों का तोरण' : '3. Floral Torans & Welcoming Rangoli Art'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
              {isHindi
                ? 'मुख्य देहरी पर ताजे पीले व नारंगी गेंदे के फूलों और आम के पत्तों का तोरण बांधा जाता है। प्रवेश द्वार पर चावल के आटे, सिंदूर, हल्दी और फूलों की पंखुड़ियों से कमल व मयूर की रंगोली बनाई जाती है, जो देवी महालक्ष्मी के श्री चरणों के स्वागत का प्रतीक है।'
                : 'Thresholds are framed with fresh golden marigold garlands and vibrant mango-leaf torans. Intricate rangoli patterns depicting lotuses, peacocks, and geometric mandalas are drawn at entrances using rice flour, natural minerals, and fresh flower petals to welcome good fortune.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center text-xl font-bold">
              🎁
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {isHindi ? '४. उपहार, मिष्ठान व सामाजिक सौहार्द' : '4. Joyful Gifting, Sweets & Generosity'}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
              {isHindi
                ? 'दिवाली पारस्परिक प्रेम और सामाजिक समरसता का पर्व है। लोग नए पारंपरिक परिधान पहनते हैं, बड़ों के चरण स्पर्श कर आशीर्वाद लेते हैं, और पड़ोसियों, मित्रों व घरेलू सहायकों को काजू कतली, बेसन के लड्डू व सूखे मेवे भेंट करते हैं।'
                : 'Families dress in traditional silk attire, touch the feet of elders to seek lifelong blessings, and visit neighbors and friends. Boxes of handmade sweets, nuts, and thoughtful gift hampers are distributed to community workers and relatives to reinforce social harmony.'}
            </p>
          </div>
        </div>

        {/* Cross-Link Callout Pill to Rangoli & Decoration Pages */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#24113D] to-[#3A185B] text-[#FAF7F0] border border-[#F2D98B]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F2D98B]">
              {isHindi ? 'फेस्टिववाला सज्जा संग्रह' : 'Explore FestiveWala Design Hub'}
            </span>
            <h4 className="font-serif text-lg sm:text-xl font-bold">
              {isHindi ? 'घर की सजावट और रंगोली डिजाइनों की संपूर्ण गैलरी' : 'Discover 100+ Rangoli Patterns & Decor Inspirations'}
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/rangoli"
              className="px-4 py-2 rounded-xl bg-[#F2D98B] hover:bg-[#FFE082] text-[#24113D] font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Palette size={14} />
              <span>{isHindi ? 'रंगोली गैलरी देखें' : 'View Rangoli'}</span>
            </Link>
            <Link
              to="/decoration-ideas"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-[#FAF7F0] font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>{isHindi ? 'सजावट विचार' : 'Decor Ideas'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: REGIONAL DIWALI CELEBRATIONS ACROSS INDIA */}
      <section
        id="regional-celebrations"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Compass size={14} className="text-brand-gold" />
            <span>{isHindi ? 'षष्ठ अनुभाग • क्षेत्रीय विविधता' : 'Section 6 • Regional Celebrations'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'भारत के विभिन्न राज्यों में दीपावली: विविधता में एकता का दर्शन'
              : 'Regional Diwali Celebrations: How Different States Celebrate the Festival of Lights'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/75">
            {isHindi
              ? 'अयोध्या के सरयू दीपोत्सव से लेकर महाराष्ट्र के किल्ले, बंगाल की काली पूजा और दक्षिण के गंगा स्नानम् तक।'
              : 'From Ayodhya’s riverfront Deepotsav to Maharashtra’s mud forts, Bengal’s Kali Puja, and South India’s Ganga Snanam.'}
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {regionalData.map((reg) => (
            <button
              key={reg.id}
              type="button"
              onClick={() => setActiveRegionTab(reg.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeRegionTab === reg.id
                  ? 'bg-[#24113D] text-[#F2D98B] border-[#F2D98B] shadow-md'
                  : 'bg-white text-brand-dark border-brand-gold/30 hover:border-brand-gold'
              }`}
            >
              {isHindi ? reg.nameHi : reg.nameEn}
            </button>
          ))}
        </div>

        {/* Active Region Display Card */}
        {(() => {
          const curReg = regionalData.find((r) => r.id === activeRegionTab) || regionalData[0];
          return (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-gold/30 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-gold/20 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-light text-brand-royal border border-brand-gold/25 inline-block mb-1">
                    {isHindi ? curReg.badgeHi : curReg.badgeEn}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-deep">
                    {isHindi ? curReg.nameHi : curReg.nameEn}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-brand-dark/85 leading-relaxed font-sans">
                {isHindi ? curReg.descHi : curReg.descEn}
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 text-xs sm:text-sm text-brand-deep">
                <span className="font-bold text-brand-royal block mb-1">
                  🌟 {isHindi ? 'प्रमुख क्षेत्रीय पहचान व स्वाद:' : 'Signature Custom & Delicacy:'}
                </span>
                <span>{isHindi ? curReg.specialtyHi : curReg.specialtyEn}</span>
              </div>
            </div>
          );
        })()}
      </section>

      {/* SECTION 7: SPIRITUAL AND CULTURAL SIGNIFICANCE */}
      <section
        id="spiritual-meaning"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Heart size={14} className="text-brand-gold" />
            <span>{isHindi ? 'सप्तम अनुभाग • आध्यात्मिक व मानवीय संदेश' : 'Section 7 • Spiritual & Cultural Significance'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'दीपावली का गहरा आध्यात्मिक संदेश: आशा, क्षमा, समरसता व दान'
              : 'The Deeper Spiritual Significance: Hope, Family Unity & Compassionate Living'}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-md space-y-6 text-brand-dark/90 leading-relaxed text-sm sm:text-base">
          <p>
            {isHindi
              ? 'दीपावली बाह्य चकाचौंध से कहीं अधिक अंतर्मन की शुद्धि और सामाजिक संवेदना का पर्व है। यह पर्व हमें सिखाता है कि प्रत्येक व्यक्ति के भीतर परमात्मा का अंश (आत्म-ज्योति) विद्यमान है, जिसे अज्ञान और अहंकार के पर्दे से मुक्त करना ही जीवन का सर्वोच्च लक्ष्य है।'
              : 'Beyond sparkling firecrackers and decorative lamps, Diwali’s core message is profoundly introspective and humanistic. It reminds us that every individual carries a divine inner flame (Atman), and the true celebration lies in clearing away the dust of ego, resentment, and greed.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 space-y-2">
              <span className="text-2xl">🌱</span>
              <h3 className="font-serif text-base font-bold text-brand-deep">
                {isHindi ? 'सत्य व आशा की पुनः स्थापना' : 'Triumph of Hope & Truth'}
              </h3>
              <p className="text-xs text-brand-dark/80">
                {isHindi
                  ? 'चाहे परिस्थिति कितनी भी विकट हो, अधर्म और असत्य का अंत निश्चित है। एक नन्हा दीपक भी गहनतम तिमिर को पराजित करने का सामर्थ्य रखता है।'
                  : 'No matter how dense the prevailing gloom, truth and virtue inevitably prevail. Even a modest flame has the inherent power to dissolve darkness.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 space-y-2">
              <span className="text-2xl">🏡</span>
              <h3 className="font-serif text-base font-bold text-brand-deep">
                {isHindi ? 'पारिवारिक प्रेम व क्षमा' : 'Family Solidarity & Forgiveness'}
              </h3>
              <p className="text-xs text-brand-dark/80">
                {isHindi
                  ? 'दीपावली पुराने मनमुटाव, कटुता और दूरियों को मिटाकर एक-दूसरे को गले लगाने और नए सिरे से प्रेम के संबंध स्थापित करने का अवसर है।'
                  : 'Diwali provides a sacred pause to heal old grievances, seek forgiveness, bridge generational divides, and reaffirm loyalty to loved ones.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 space-y-2">
              <span className="text-2xl">🤝</span>
              <h3 className="font-serif text-base font-bold text-brand-deep">
                {isHindi ? 'दान, सेवा व सह-अस्तित्व' : 'Dana (Generosity) & Seva'}
              </h3>
              <p className="text-xs text-brand-dark/80">
                {isHindi
                  ? 'असली दिवाली वही है जो किसी निर्धन के मुख पर मुस्कान ला सके। अपने आनंद में समाज के वंचित वर्ग, सफाईकर्मियों और जरूरतमंदों को सहभागी बनाएं।'
                  : 'True festive abundance is verified only when shared. Extending food, warm clothing, and respect to domestic workers and needy families ennobles the celebration.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TRADITIONAL DIWALI FOOD AND SWEETS */}
      <span id="recipes" className="block -mt-28 pt-28 pointer-events-none" />
      <section
        id="festive-sweets"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Utensils size={14} className="text-brand-gold" />
            <span>{isHindi ? 'अष्टम अनुभाग • पारंपरिक स्वाद व व्यंजन' : 'Section 8 • Festive Sweets & Savories'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'दिवाली के पारंपरिक पकवान व मिष्ठान: लड्डू, काजू कतली, गुजिया व चकली'
              : 'Traditional Diwali Sweets & Delicacies: Laddoo, Kaju Katli, Gujiya, Jalebi & Chakli'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/75">
            {isHindi
              ? 'शुद्ध देसी घी, मेवे और केसर से तैयार पारंपरिक व्यंजन जो हर घर में उत्सव की मिठास घोलते हैं।'
              : 'Authentic festive delicacies prepared with pure cow ghee, aromatic cardamom, saffron, and nuts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festival.recipes.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-md space-y-4 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-brand-gold/15 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-royal px-2.5 py-0.5 rounded-full bg-brand-light">
                    {isHindi ? rec.typeHi : rec.typeEn}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-gold-dark">
                    <Clock size={12} />
                    <span>{isHindi ? rec.timeHi : rec.timeEn}</span>
                  </div>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-deep">
                  {isHindi ? rec.nameHi : rec.nameEn}
                </h3>

                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                  {isHindi ? rec.descHi : rec.descEn}
                </p>

                {/* Key ingredients pill list */}
                <div className="p-3 rounded-2xl bg-brand-light/50 border border-brand-gold/20 space-y-1.5">
                  <span className="text-[11px] font-bold text-brand-royal uppercase tracking-wider block">
                    {isHindi ? 'मुख्य सामग्री:' : 'Key Ingredients:'}
                  </span>
                  <ul className="text-xs text-brand-dark/75 space-y-1">
                    {rec.ingredients.slice(0, 3).map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-brand-gold font-bold">•</span>
                        <span>{isHindi ? ing.hi : ing.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-brand-gold/15 text-[11px] text-brand-dark/60 font-medium">
                <span>{isHindi ? 'विधि व संपूर्ण सामग्री ऊपर उपलब्ध है' : 'Full step-by-step recipe detailed above'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: ECO-FRIENDLY DIWALI */}
      <section
        id="eco-friendly"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Leaf size={14} className="text-emerald-700" />
            <span>{isHindi ? 'नवम अनुभाग • पर्यावरण-अनुकूल दीवाली' : 'Section 9 • Eco-Friendly & Mindful Diwali'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'पर्यावरण-अनुकूल (ईको-फ्रेंडली) दीवाली कैसे मनाएं? प्रकृति व जीवों के प्रति संवेदना'
              : 'How to Celebrate an Eco-Friendly Diwali: Sustainable Choices, Clean Air & Compassion'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/75">
            {isHindi
              ? 'प्रकाश पर्व की मूल भावना पर्यावरण की रक्षा और सभी प्राणियों के प्रति दयाभाव में निहित है।'
              : 'Honoring the authentic spirit of light by preserving nature, air quality, and animal welfare.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-md space-y-6 text-brand-dark/90 leading-relaxed text-sm sm:text-base">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <h3 className="font-serif text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
                <span>🪔</span>
                <span>{isHindi ? 'मिट्टी के पारंपरिक दीये बनाम प्लास्टिक/मोम' : 'Traditional Clay Diyas over Plastic & Paraffin'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950/85">
                {isHindi
                  ? 'सस्ते प्लास्टिक के दीयों या पेट्रोलियम पैराफिन मोमबत्तियों के बजाय स्थानीय कुम्हारों द्वारा हस्तनिर्मित मिट्टी के दीये खरीदें। मिट्टी प्राकृतिक रूप से विघटित हो जाती है और सरसों का तेल वातावरण को शुद्ध करता है।'
                  : 'Choose handmade unglazed clay diyas from local potters over single-use plastic tea-lights or petroleum-based paraffin candles. Clay dissolves harmlessly back into earth, and burning mustard oil naturally cleanses post-monsoon airborne microbes.'}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <h3 className="font-serif text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
                <span>🎨</span>
                <span>{isHindi ? 'प्राकृतिक व जैविक रंगोली' : 'Chemical-Free Organic Rangolis'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950/85">
                {isHindi
                  ? 'हानिकारक रासायनिक रंगों के स्थान पर चावल का सूखा आटा, हल्दी, रोली और ताजे गेंदे व गुलाब की पंखुड़ियों का प्रयोग करें। उत्सव के बाद ये फूल और आटा पक्षियों और चींटियों का भोजन बनकर प्रकृति में समा जाते हैं।'
                  : 'Avoid toxic synthetic chemical powders. Use dry rice flour, turmeric, vermilion, cinnamon, and fresh marigold and rose petals. After the festival, floral and grain rangolis degrade naturally and nourish garden soil or small birds.'}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <h3 className="font-serif text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
                <span>🔇</span>
                <span>{isHindi ? 'ध्वनि व वायु प्रदूषण से मुक्ति' : 'Noise-Free Celebrations & Clean Air'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950/85">
                {isHindi
                  ? 'तेज आवाज और जहरीले धुएं वाले पटाखों से बचें। इनकी जगह दीपों की रोशनी, गर्म फेयरी लाइट्स और परिजनों संग संगीत की महफिल सजाएं। यह वायु गुणवत्ता को बनाए रखता है और सांस के रोगियों को राहत देता है।'
                  : 'Replace deafening chemical firecrackers with ambient warm LED strings, musical gatherings, and storytelling. This shields high-risk asthma patients, seniors, and young infants from respiratory distress.'}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <h3 className="font-serif text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
                <span>🐕</span>
                <span>{isHindi ? 'मूक पशु-पक्षियों के प्रति संवेदनशीलता' : 'Caring for Stray Animals, Pets & Birds'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950/85">
                {isHindi
                  ? 'कुत्तों और बिल्लियों की सुनने की क्षमता मनुष्यों से चार गुना अधिक होती है। पटाखों की तेज आवाज से वे भयभीत और आघातग्रस्त हो जाते हैं। अपने क्षेत्र के मूक प्राणियों को सुरक्षित आश्रय और पीने का ताजा जल प्रदान करें।'
                  : 'Canines and felines hear frequencies four times higher than humans; sudden sonic bursts cause acute disorientation and terror. Keep pets indoors, place fresh water bowls for street animals, and celebrate quietly.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: HOW TO CELEBRATE WITH FAMILY AND FRIENDS */}
      <section
        id="family-celebration"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Users size={14} className="text-brand-gold" />
            <span>{isHindi ? 'दशम अनुभाग • आत्मीय मिलन' : 'Section 10 • Celebrate with Family & Friends'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'परिवार और मित्रों संग दीपावली कैसे मनाएं? रीति-रिवाज, शुभकामनाएं व ग्रीटिंग्स'
              : 'How to Celebrate Diwali with Family & Friends: Rituals, Greeting Cards & Meaningful Giving'}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-md space-y-6 text-brand-dark/90 leading-relaxed text-sm sm:text-base">
          <p>
            {isHindi
              ? 'दीपावली का असली आनंद अपनों के साथ समय बिताने, पुरानी यादें ताजा करने और प्रेम के छोटे-छोटे उपहार साझा करने में है।'
              : 'The true radiance of Diwali flourishes in heartfelt conversations, multi-generational laughter, joint prayer, and thoughtful gestures of affection.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 space-y-2">
              <h3 className="font-serif text-base font-bold text-brand-deep flex items-center gap-2">
                <span>🪔</span>
                <span>{isHindi ? 'साथ मिलकर पहला दीया जलाएं' : 'Light the First Diya Together'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80">
                {isHindi
                  ? 'पूजा के बाद घर के सबसे छोटे बच्चे और बुजुर्ग साथ मिलकर देहरी पर पहला दीपक स्थापित करें। यह पीढ़ियों के बीच संस्कार और स्नेह का सेतु बनता है।'
                  : 'Invite the youngest children and oldest grandparents to place the first consecrated ghee lamp at the entrance threshold together.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 space-y-2">
              <h3 className="font-serif text-base font-bold text-brand-deep flex items-center gap-2">
                <span>💌</span>
                <span>{isHindi ? 'व्यक्तिगत ग्रीटिंग कार्ड व संदेश' : 'Design Bespoke Festive Cards'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80">
                {isHindi
                  ? 'केवल फॉरवर्ड किए हुए संदेशों की जगह अपने परिजनों को व्यक्तिगत फोटो और भावपूर्ण पंक्तियों युक्त ग्रीटिंग कार्ड भेजें।'
                  : 'Move beyond generic forwarded texts by designing custom photo cards and writing personalized verses for distant family members.'}
              </p>
            </div>
          </div>

          {/* Interactive Internal CTAs to Greeting Studio and Wishes */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#24113D] via-[#351759] to-[#120524] text-[#FAF7F0] border border-[#F2D98B]/35 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F2D98B]">
                {isHindi ? 'फेस्टिववाला ग्रीटिंग स्टूडियो' : 'FestiveWala Greeting Studio'}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold">
                {isHindi ? 'अपनों के लिए बनाएं व्यक्तिगत दिवाली कार्ड व ५००+ शुभकामनाएं' : 'Create Custom Diwali Photo Cards & Explore 500+ Wishes'}
              </h4>
              <p className="text-xs text-[#FAF7F0]/80">
                {isHindi
                  ? 'रिश्ता, भाव और भाषा चुनकर तुरंत सुंदर ग्रीटिंग कार्ड डाउनलोड करें अथवा व्हाट्सएप पर साझा करें।'
                  : 'Select your preferred relationship, tone, and language to generate heartwarming blessings instantly.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/greeting-cards"
                className="px-5 py-2.5 rounded-xl bg-[#F2D98B] hover:bg-[#FFE082] text-[#24113D] font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2 min-h-[44px]"
              >
                <Palette size={15} />
                <span>{isHindi ? 'कार्ड बनाएं' : 'Open Card Studio'}</span>
              </Link>
              <Link
                to="/wishes"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-[#FAF7F0] font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px]"
              >
                <BookOpen size={15} />
                <span>{isHindi ? 'शुभकामनाएं खोजें' : 'Wishes Library'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: INTERESTING FACTS ABOUT DIWALI */}
      <section
        id="fascinating-facts"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Award size={14} className="text-brand-gold" />
            <span>{isHindi ? 'एकादश अनुभाग • रोचक व प्रामाणिक तथ्य' : 'Section 11 • 10 Verified Historical Facts'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'दीपावली से जुड़े १० रोचक एवं प्रामाणिक सांस्कृतिक तथ्य'
              : '10 Fascinating & Historically Accurate Facts About Diwali'}
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/75">
            {isHindi
              ? 'प्राचीन संस्कृत व्याकरण से लेकर वैश्विक संसदों और इतिहास तक — प्रामाणिक जानकारी।'
              : 'Researched cultural and historical insights grounded in classical literature, tradition, and global history.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {factsData.map((fact) => (
            <div
              key={fact.number}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-gold/30 shadow-sm hover:shadow-md transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-brand-gold">{fact.number}</span>
                <Sparkles size={14} className="text-brand-gold" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-brand-deep">
                {isHindi ? fact.titleHi : fact.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-sans">
                {isHindi ? fact.descHi : fact.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><MonetagAdSlot variant="in-content" /></div>

      {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
      <section
        id="diwali-faqs"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-28"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={14} className="text-brand-gold" />
            <span>{isHindi ? 'द्वादश अनुभाग • प्रश्नोत्तरी' : 'Section 12 • Frequently Asked Questions'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-deep leading-tight">
            {isHindi
              ? 'दीपावली से जुड़े प्रमुख प्रश्न और उनके प्रामाणिक उत्तर'
              : 'Frequently Asked Questions About Diwali: Meanings, Dates & Traditions'}
          </h2>
        </div>

        {festival.faqs && festival.faqs.length > 0 && (
          <TrilingualFAQSection
            faqs={festival.faqs}
            festivalNameEn={festival.nameEn}
            festivalNameHi={festival.nameHi}
            initialLang={isHindi ? 'hi' : isHinglish ? 'hinglish' : 'en'}
          />
        )}
      </section>

      {/* INTERNAL NAVIGATION CROSS-LINKING HUB */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="border-t border-brand-gold/30 pt-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-royal">
            {isHindi ? 'संबंधित उत्सव अनुभव' : 'Explore FestiveWala Discoveries'}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-deep">
            {isHindi ? 'रंगोली, सजावट, ग्रीटिंग कार्ड्स व उत्सव मार्गदर्शिकाएं' : 'Rangoli Gallery, Decoration Guides & Greeting Studio'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/greeting-cards"
            className="group p-5 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold mb-2">
                🎨
              </div>
              <h4 className="font-serif text-sm font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                {isHindi ? 'ग्रीटिंग स्टूडियो' : 'Greeting Studio'}
              </h4>
              <p className="text-[11px] text-brand-dark/70 font-sans mt-1">
                {isHindi ? 'फोटो अपलोड कर सुंदर व्यक्तिगत कार्ड बनाएं' : 'Design personalized custom cards with family photos'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-royal group-hover:translate-x-1 transition-transform">
              <span>{isHindi ? 'कार्ड बनाएं' : 'Create Card'}</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          <Link
            to="/wishes"
            className="group p-5 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold mb-2">
                ✍️
              </div>
              <h4 className="font-serif text-sm font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                {isHindi ? 'शुभकामना संदेश संग्रह' : 'Wishes Generator'}
              </h4>
              <p className="text-[11px] text-brand-dark/70 font-sans mt-1">
                {isHindi ? '५००+ तैयार संदेश, शायरी व वैदिक श्लोक' : '500+ curated festive messages, poetry & blessings'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-royal group-hover:translate-x-1 transition-transform">
              <span>{isHindi ? 'संदेश देखें' : 'Browse Wishes'}</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          <Link
            to="/rangoli"
            className="group p-5 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold mb-2">
                🌸
              </div>
              <h4 className="font-serif text-sm font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                {isHindi ? 'रंगोली आर्ट गैलरी' : 'Rangoli Art Gallery'}
              </h4>
              <p className="text-[11px] text-brand-dark/70 font-sans mt-1">
                {isHindi ? 'मयूर, पुष्प व पारंपरिक मांडणा डिजाइन' : 'Peacock, floral & geometric doorstep patterns'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-royal group-hover:translate-x-1 transition-transform">
              <span>{isHindi ? 'गैलरी देखें' : 'View Gallery'}</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          <Link
            to="/decoration-ideas"
            className="group p-5 rounded-2xl bg-white border border-brand-gold/30 hover:border-brand-gold shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#24113D] text-[#F2D98B] flex items-center justify-center font-bold mb-2">
                💡
              </div>
              <h4 className="font-serif text-sm font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                {isHindi ? 'सजावट के विचार' : 'Decoration Inspiration'}
              </h4>
              <p className="text-[11px] text-brand-dark/70 font-sans mt-1">
                {isHindi ? 'द्वार तोरण, फ्लोटिंग दीये व बालकनी सज्जा' : 'Entrance torans, floating diyas & living room ideas'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-royal group-hover:translate-x-1 transition-transform">
              <span>{isHindi ? 'सजावट देखें' : 'View Decor'}</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
};
