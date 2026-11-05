import type { FestivalDetail } from './types';

export const DHANTERAS_DETAIL: FestivalDetail = {
  id: 'dhanteras',
  nameEn: 'Dhanteras — Festival of Health, Wealth & Light',
  nameHi: 'धनतेरस — आरोग्य, ऐश्वर्य व प्रकाश का महापर्व',
  regionalAliases: ['Dhanatrayodashi', 'Dhantrayodashi', 'Dhanvantari Jayanti', 'Yama Deepam', 'Dhan Teras'],
  tithiEn: 'Kartik Krishna Trayodashi (Friday, 6 November 2026)',
  tithiHi: 'कार्तिक कृष्ण त्रयोदशी (शुक्रवार, ६ नवंबर २०२६)',
  taglineEn: 'The auspicious opening of Deepavali: celebrating radiant health, cosmic prosperity, and sacred new beginnings.',
  taglineHi: 'दीपावली का प्रथम पावन महापर्व: उत्तम आरोग्य, अखंड लक्ष्मी कृपा और नवीन संकल्पों का स्वर्णिम उत्सव।',
  hinglishTagline: 'Deepavali ka pehla pawan tyohar: acchi health, Maa Lakshmi ki kripa aur shubh shagun ka din.',
  accentColor: '#F2D98B',
  secondaryColor: '#45216B',
  bgGradient: 'from-[#24113D] via-[#3B155B] to-[#120524]',
  heroMotif: 'dhanteras-kalash',
  about: {
    summaryEn:
      'Dhanteras, also celebrated as Dhanatrayodashi, marks the luminous inaugural day of the five-day Diwali festival. Falling on the thirteenth lunar day of the Krishna Paksha in the month of Kartik, Dhanteras is dedicated to Bhagwan Dhanvantari—the divine physician who emerged from the cosmic Samudra Manthan carrying the pot of celestial nectar (Amrita)—as well as Goddess Mahalakshmi and Lord Kubera, the divine treasurer. It is a day when millions welcome new metals, auspicious utensils, and gold into their households to invoke enduring health, ethical wealth, and spiritual protection.',
    summaryHi:
      'धनतेरस (धनत्रयोदशी) पंचदिवसीय दीपोत्सव का प्रथम और अत्यंत पावन दिवस है। कार्तिक मास के कृष्ण पक्ष की त्रयोदशी को मनाया जाने वाला यह महापर्व आयुर्वेद के जनक भगवान धन्वंतरि, धन की देवी मां महालक्ष्मी और धनाधिपति भगवान कुबेर को समर्पित है। इस दिन समुद्र मंथन से अमृत कलश लेकर प्रकट हुए धन्वंतरि देव का पूजन कर उत्तम स्वास्थ्य की कामना की जाती है, तथा नवीन धातु, स्वर्ण-रजत और बर्तनों का क्रय कर अक्षय समृद्धि का आह्वान किया जाता है।',
    culturalSignificanceEn:
      'Culturally, Dhanteras embodies the timeless Indian understanding that true wealth (Dhan) begins with radiant health (Arogyam). The festival weaves together ancient Ayurvedic wisdom with the worship of prosperity and the sacred ritual of Yamadeepdaan—lighting lamps facing south to dispel the fear of untimely illness and mortality.',
    culturalSignificanceHi:
      'सांस्कृतिक दृष्टि से धनतेरस भारतीय दर्शन के उस शाश्वत सत्य को उजागर करता है कि "पहला सुख निरोगी काया" है। यह पर्व आयुर्वेद की चिकित्सा पद्धति, सात्विक समृद्धि और यम दीपदान की उस पवित्र परंपरा का संगम है जो परिवार को भय और व्याधियों से मुक्त कर सुरक्षा व शांति प्रदान करती है।',
    historyEn:
      'According to Vedic scriptures including the Vishnu Purana and Bhagavata Purana, Lord Dhanvantari manifested during the Samudra Manthan holding the golden pot of immortal nectar. Simultaneously, folklore narrates the legend of King Hima’s young son, whose destined early death on this day was averted by his clever bride, who piled gold ornaments and glowing lamps at their threshold, blinding the serpent of death with luminous brilliance.',
    historyHi:
      'विष्णु पुराण व श्रीमद्भागवत के अनुसार क्षीरसागर मंथन के चौदह रत्नों में से एक भगवान धन्वंतरि अमृत कलश लेकर प्रकट हुए थे। इसके अतिरिक्त राजा हिम के पुत्र की पौराणिक कथा के अनुसार उनकी नवविवाहिता वधू ने धनतेरस की रात्रि सोने-चांदी के आभूषणों और दीपों की जगमगाहट से यमदूतों को विमुख कर अपने पति के प्राणों की रक्षा की थी।',
    keyThemes: [
      { en: 'Vibrant Health (Arogya)', hi: 'उत्तम आरोग्य', icon: '🌿' },
      { en: 'Divine Abundance', hi: 'अक्षय लक्ष्मी कृपा', icon: '🪙' },
      { en: 'Sacred New Metals', hi: 'नवीन धातु शगुन', icon: '🏺' },
      { en: 'Fearless Light (Yamadeepdaan)', hi: 'अभय दीपदान', icon: '🪔' },
    ],
  },
  traditions: [
    {
      id: 'dhanvantari-puja',
      titleEn: 'Bhagwan Dhanvantari Worship & National Ayurveda Day',
      titleHi: 'भगवान धन्वंतरि पूजन व राष्ट्रीय आयुर्वेद दिवस',
      descEn:
        'Prayers offered to the celestial physician for immunity, holistic healing, and protection from chronic ailments.',
      descHi:
        'समस्त रोगों के निवारण, सात्विक जीवनशैली और दीर्घायु के लिए अमृत कलशधारी धन्वंतरि भगवान की धूप-दीप से स्तुति।',
      customs: [
        { en: 'Chanting Dhanvantari Maha Mantra', hi: 'धन्वंतरि महामंत्र का जाप' },
        { en: 'Offering holy basil (Tulsi) & fresh herbs', hi: 'तुलसी दल व औषधियों का अर्पण' },
        { en: 'Prayers for doctors and healers', hi: 'चिकित्सकों व आरोग्य कर्मियों का सम्मान' },
      ],
      regionalVariations: {
        en: 'Celebrated formally across Ayurvedic institutions and temples throughout Kerala, Gujarat, and Varanasi.',
        hi: 'केरल, गुजरात और वाराणसी के आयुर्वेद केंद्रों में विशेष अनुष्ठान व औषध वितरण।',
      },
      icon: '🌿',
    },
    {
      id: 'yamadeepdaan',
      titleEn: 'Yamadeepdaan — The Sacred Southern Lamp',
      titleHi: 'यम दीपदान — दक्षिण दिशा में पावन दीप',
      descEn:
        'Lighting a four-wicked wheat flour diya outside the house facing south to avert premature death and negative energies.',
      descHi:
        'घर के मुख्य द्वार के बाहर दक्षिण दिशा की ओर यमराज के निमित्त चार मुखी आटे का दीप प्रज्वलित कर अभय का संकल्प।',
      customs: [
        { en: 'Kneading wheat flour with turmeric and mustard oil', hi: 'हल्दी व सरसों तेल से चौमुखी आटे का दीया बनाना' },
        { en: 'Placing a cowrie shell or coin inside the lamp', hi: 'दीपक में सिक्का या कौड़ी रखकर प्रज्वलित करना' },
        { en: 'Not looking back after placing the lamp', hi: 'दीप रखने के उपरांत पीछे मुड़कर न देखना' },
      ],
      regionalVariations: {
        en: 'Universal across North and Central India, practiced meticulously by family elders at dusk.',
        hi: 'उत्तर व मध्य भारत में सायंकाल प्रदोष काल में घर के वरिष्ठ सदस्यों द्वारा संपन्न।',
      },
      icon: '🪔',
    },
    {
      id: 'buying-metals-utensils',
      titleEn: 'Auspicious Purchase of Gold, Silver, Brass & Kansa',
      titleHi: 'सोना, चांदी, पीतल व कांसे की मंगल खरीद',
      descEn:
        'Buying new metal items brings Lakshmi into the house, symbolizing resilience, purity, and financial discipline.',
      descHi:
        'धनतेरस के दिन नए धातु बर्तनों या स्वर्ण-रजत की खरीद से घर में बरकत और सकारात्मक ऊर्जा का स्थायी वास माना जाता है।',
      customs: [
        { en: 'Filling newly bought vessels with sweets or rice', hi: 'नए बर्तनों को कभी खाली न लाकर मिठाई या अक्षत से भरना' },
        { en: 'Purchasing whole dry coriander (Dhana) as shagun', hi: 'साबुत धनिया की खरीद कर पूजन में रखना' },
        { en: 'Buying a broom (Jhadu) to sweep away poverty', hi: 'दरिद्रता निवारण हेतु नई झाड़ू लाना' },
      ],
      icon: '🪙',
    },
    {
      id: 'lakshmi-kubera-puja',
      titleEn: 'Goddess Mahalakshmi & Lord Kubera Evening Puja',
      titleHi: 'मां महालक्ष्मी व धनाधिपति कुबेर सायंकालीन पूजन',
      descEn:
        'Evening prayers welcoming prosperity, cleaning accounting books, and seeking blessings for fair business commerce.',
      descHi:
        'सायंकाल प्रदोष वेला में लक्ष्मी जी और कुबेर जी का ध्यान, नए बही-खातों का पूजन और सुख-समृद्धि की प्रार्थना।',
      customs: [
        { en: 'Drawing rice-flour and vermilion footprints (Charan Paduka)', hi: 'दहलीज़ पर कुमकुम से लक्ष्मी जी के चरण बनाना' },
        { en: 'Offering sweet batashas, kheer, and lotus blooms', hi: 'कमल पुष्प, बताशे और खीर का नैवेद्य अर्पण' },
        { en: 'Worshipping vaults, safe lockers, and tools of trade', hi: 'तिजोरी, गल्ले और व्यापारिक उपकरणों की पूजा' },
      ],
      icon: '✨',
    },
  ],
  decorations: [
    {
      id: 'dhanteras-decor-footprints',
      titleEn: 'Lakshmi Charan Rangoli at Thresholds',
      titleHi: 'द्वार पर महालक्ष्मी के पावन चरण पादुका',
      descEn:
        'Creating inward-facing sacred footprints using rice powder, vermilion, and turmeric to welcome prosperity.',
      descHi:
        'कुमकुम, चावल के आटे और हल्दी से घर के अंदर आते हुए मां लक्ष्मी के सुंदर चरण अंकित करना।',
      tipEn: 'Always orient the footprints inward toward the living room and home temple, never pointing outside.',
      tipHi: 'चरण-चिह्न सदैव बाहर से अंदर मंदिर व बैठक की दिशा में होने चाहिए, बाहर जाते हुए नहीं।',
      tagEn: 'Sacred Entry',
      tagHi: 'पावन द्वार',
    },
    {
      id: 'dhanteras-decor-urli',
      titleEn: 'Brass Urli with Floating Marigolds & Lamps',
      titleHi: 'पीतल की उरुली में तैरते गेंदे के फूल व दीप',
      descEn:
        'A magnificent water-filled brass bowl placed in the foyer adorned with yellow marigold petals and fragrant floating tealights.',
      descHi:
        'घर की लॉबी या मुख्य द्वार पर स्वच्छ जल से भरी पीतल की उरुली, जिसमें गेंदे की पंखुड़ियां और तैरते दीपक जगमगाते हैं।',
      tipEn: 'Add a few drops of natural sandalwood or rose water into the urli for a refreshing festive fragrance.',
      tipHi: 'उरुली के जल में गुलाब जल या चंदन का अर्क मिलाने से पूरे घर में दिव्य सुगंध फैलती है।',
      tagEn: 'Fragrant Welcome',
      tagHi: 'सुगंधित स्वागत',
    },
    {
      id: 'dhanteras-decor-toran',
      titleEn: 'Fresh Mango Leaf & Marigold Toran',
      titleHi: 'ताजे आम के पत्तों और गेंदे के फूलों का तोरण',
      descEn:
        'Hanging traditional fresh green mango leaf and orange marigold garlands over the main entryway.',
      descHi:
        'मुख्य द्वार पर ताजे आम्रपल्लव और नारंगी गेंदे की मालाओं का तोरण बांधना, जो शुभता का सूचक है।',
      tipEn: 'Mango leaves absorb negative airborne toxins and signify spiritual rejuvenation.',
      tipHi: 'आम के पत्ते सकारात्मक प्राणवायु को बढ़ाते हैं और घर के वातावरण को शुद्ध रखते हैं।',
      tagEn: 'Threshold Guard',
      tagHi: 'तोरण सज्जा',
    },
  ],
  recipes: [
    {
      id: 'dhanteras-recipe-panchamrit',
      nameEn: 'Vedic Panchamrit & Naivedyam',
      nameHi: 'वैदिक पंचामृत व पावन नैवेद्य',
      typeEn: 'Sacred Offering / Prasad',
      typeHi: 'पावन प्रसाद / पेय',
      timeEn: '15 mins',
      timeHi: '१५ मिनट',
      descEn:
        'The five sacred nectars: milk, curd, ghee, honey, and jaggery/sugar mixed in precise Ayurvedic balance for Lord Dhanvantari.',
      descHi:
        'दूध, दही, गाय का घी, शहद और मिश्री का समिश्रण — भगवान धन्वंतरि और मां लक्ष्मी को अर्पित किया जाने वाला अमृत प्रसाद।',
      ingredients: [
        { en: 'Fresh unboiled cow milk (1 cup)', hi: 'गाय का ताजा कच्चा दूध (१ कप)' },
        { en: 'Fresh cow curd / yogurt (1/2 cup)', hi: 'ताजा दही (१/२ कप)' },
        { en: 'Desi cow ghee (1 tsp)', hi: 'देसी गाय का शुद्ध घी (१ चम्मच)' },
        { en: 'Wild raw honey (1 tbsp)', hi: 'शुद्ध प्राकृतिक शहद (१ बड़ा चम्मच)' },
        { en: 'Crushed rock sugar or mishri (1 tbsp)', hi: 'धागे वाली पिसी मिश्री (१ बड़ा चम्मच)' },
        { en: 'Holy basil (Tulsi) leaves (5-7 leaves)', hi: 'पावन तुलसी के पत्ते (५-७ पत्ते)' },
      ],
      steps: [
        { en: 'Combine milk, curd, and mishri in a clean silver or brass bowl.', hi: 'चांदी या कांसे के पात्र में दूध, दही और मिश्री को मिलाएं।' },
        { en: 'Whisk gently using a wooden churner until sugar dissolves.', hi: 'हल्के हाथ से मथें जब तक मिश्री पूरी तरह घुल न जाए।' },
        { en: 'Stir in desi ghee and pure honey.', hi: 'शुद्ध घी और शहद मिलाकर एकसार करें।' },
        { en: 'Garnish with freshly plucked holy basil leaves and offer to Lord Dhanvantari.', hi: 'धोकर रखे तुलसी दल ऊपर से डालकर भगवान को भोग लगाएं।' },
      ],
    },
    {
      id: 'dhanteras-recipe-kheer',
      nameEn: 'Auspicious Makhana & Rice Kheer',
      nameHi: 'मखाना व चावल की सुगंधित खीर',
      typeEn: 'Festive Dessert',
      typeHi: 'त्योहारी मिष्ठान',
      timeEn: '40 mins',
      timeHi: '४० मिनट',
      descEn:
        'Rich slow-simmered milk pudding enriched with foxnuts (makhana), fragrant saffron, crushed green cardamom, and slivered almonds.',
      descHi:
        'धीमी आंच पर पके मलाईदार दूध में मखाने, सुगंधित कश्मीरी केसर, छोटी इलायची और बादाम की कतरन से सजी पारंपरिक खीर।',
      ingredients: [
        { en: 'Full-cream milk (1 litre)', hi: 'फुल-क्रीम दूध (१ लीटर)' },
        { en: 'Basmati rice (1/4 cup, soaked)', hi: 'बासमती चावल (१/४ कप, भीगा हुआ)' },
        { en: 'Lotus seeds / Makhana (1 cup, toasted in ghee)', hi: 'घी में भुने मखाने (१ कप)' },
        { en: 'Crushed cardamom pods (1/2 tsp)', hi: 'कुटी हुई छोटी इलायची (१/२ चम्मच)' },
        { en: 'Kashmiri saffron steeped in warm milk (10-12 strands)', hi: 'गुनगुने दूध में भीगा केसर (१०-१२ रेशे)' },
        { en: 'Slivered pistachios and almonds (2 tbsp)', hi: 'पिस्ता व बादाम की कतरन (२ बड़े चम्मच)' },
        { en: 'Raw sugar or mishri (1/2 cup)', hi: 'मिश्री या देसी खांड (१/२ कप)' },
      ],
      steps: [
        { en: 'Bring milk to a gentle boil in a heavy-bottomed brass or steel vessel.', hi: 'भारी तले के बर्तन में दूध को मध्यम आंच पर उबालें।' },
        { en: 'Add the soaked rice and simmer on low flame, stirring occasionally to prevent sticking.', hi: 'चावल डालकर धीमी आंच पर गाढ़ा होने तक पकाएं।' },
        { en: 'Fold in the toasted makhana and steeped saffron milk, letting the color bloom into pale gold.', hi: 'भुने मखाने और केसर का दूध मिलाकर सुनहरा रंग आने दें।' },
        { en: 'Stir in mishri and cardamom powder; cook for another 5 minutes.', hi: 'मिश्री और इलायची पाउडर डालकर ५ मिनट और पकाएं।' },
        { en: 'Garnish generously with slivered nuts and serve warm or chilled as divine Prasad.', hi: 'मेवों की कतरन से सजाकर भगवान को अर्पित करें और प्रसाद बांटें।' },
      ],
    },
  ],
  gifts: [
    {
      id: 'dhanteras-gift-silver',
      titleEn: 'Pure Silver Coin or Utensils',
      titleHi: 'शुद्ध चांदी का सिक्का अथवा पात्र',
      recipientTypeEn: 'Family & Elders',
      recipientTypeHi: 'परिवार व बुजुर्गों हेतु',
      descEn: 'Timeless traditional Dhanteras shagun symbolizing cooling peace, lasting value, and divine grace.',
      descHi: 'शांति, शीतलता और चिरस्थायी मूल्य का परिचायक पारंपरिक चांदी का सिक्का या पूजा पात्र।',
      budgetRange: '₹500 – ₹2,500',
    },
    {
      id: 'dhanteras-gift-kansa',
      titleEn: 'Kansa (Bronze) Dinner Thali Set',
      titleHi: 'कांसे का हस्तनिर्मित थाली सेट',
      recipientTypeEn: 'Couples & Parents',
      recipientTypeHi: 'दंपति व माता-पिता हेतु',
      descEn: 'Ayurvedic dining metal that balances acidity and promotes digestive vitality in every meal.',
      descHi: 'आयुर्वेदिक दृष्टि से त्रिदोष नाशक और पाचन को शक्ति देने वाला शुद्ध कांसे का भोजन सेट।',
      budgetRange: '₹1,200 – ₹3,500',
    },
    {
      id: 'dhanteras-gift-ayurvedic-box',
      titleEn: 'Ayurvedic Herbal Wellness Box',
      titleHi: 'हर्बल आयुर्वेदिक आरोग्य हैंपर',
      recipientTypeEn: 'Friends & Colleagues',
      recipientTypeHi: 'मित्रों व सहकर्मियों हेतु',
      descEn: 'Organic honey, herbal infusions, chyawanprash, and copper flask honoring Lord Dhanvantari.',
      descHi: 'भगवान धन्वंतरि के आरोग्य संदेश का पालन करते हुए शुद्ध शहद, हर्बल चाय व तांबे की बोतल।',
      budgetRange: '₹600 – ₹1,800',
    },
  ],
  faqs: [
    {
      id: 'dhanteras-faq-meaning',
      category: 'general',
      questionEn: 'What is the literal meaning of Dhanteras?',
      questionHi: 'धनतेरस शब्द का शाब्दिक अर्थ क्या है?',
      questionHinglish: 'Dhanteras ka matlab kya hota hai?',
      answerEn:
        'The word Dhanteras is composed of two Sanskrit terms: "Dhan", meaning wealth or divine prosperity, and "Teras", referring to the thirteenth lunar day (Trayodashi) of the dark fortnight (Krishna Paksha) of Kartik month. It is also called Dhanatrayodashi.',
      answerHi:
        'धनतेरस दो शब्दों के मेल से बना है: "धन" अर्थात समृद्धि, ऐश्वर्य व स्वास्थ्य, और "तेरस" अर्थात कार्तिक मास के कृष्ण पक्ष की त्रयोदशी (तेरहवीं) तिथि। इसे शास्त्रों में धनत्रयोदशी भी कहा जाता है।',
      answerHinglish:
        'Dhanteras do shabdon se bana hai: "Dhan" matlab wealth aur health, aur "Teras" matlab Kartik Krishna Paksha ki 13th tithi (Trayodashi). Isko Dhanatrayodashi bhi kehte hain.',
    },
    {
      id: 'dhanteras-faq-dhanvantari',
      category: 'rituals',
      questionEn: 'Why is Lord Dhanvantari worshipped on Dhanteras?',
      questionHi: 'धनतेरस पर भगवान धन्वंतरि की पूजा क्यों की जाती है?',
      questionHinglish: 'Dhanteras par Bhagwan Dhanvantari ki puja kyu hoti hai?',
      answerEn:
        'According to the Puranas, Lord Dhanvantari—the incarnation of Lord Vishnu and the father of Ayurveda—manifested during the cosmic churning of the ocean (Samudra Manthan) on this exact Trayodashi tithi holding the Amrita Kalash (pot of divine nectar). Worshipping him invokes radiant health, immunity, and protection from diseases.',
      answerHi:
        'पौराणिक मान्यता के अनुसार समुद्र मंथन के समय इसी पावन त्रयोदशी को भगवान धन्वंतरि अमृत कलश लेकर प्रकट हुए थे। वे आयुर्वेद के आदि प्रवर्तक और भगवान विष्णु के अवतार हैं। उनकी पूजा से शारीरिक व्याधियों से मुक्ति और उत्तम स्वास्थ्य प्राप्त होता है।',
      answerHinglish:
        'Samudra Manthan ke samay isi tithi par Bhagwan Dhanvantari amrit kalash lekar prakat hue the. Unki puja se acchi health aur rogon se mukti milti hai.',
    },
    {
      id: 'dhanteras-faq-buying-metals',
      category: 'gifting',
      questionEn: 'Why do people buy gold, silver, brass, or utensils on Dhanteras?',
      questionHi: 'धनतेरस पर सोना, चांदी, पीतल या बर्तन खरीदना क्यों शुभ माना जाता है?',
      questionHinglish: 'Dhanteras par sona, chandi ya bartan kharidna kyu shubh hota hai?',
      answerEn:
        'Buying metals on Dhanteras is considered a sacred invocation of Goddess Lakshmi and Lord Kubera. Metals represent durability, purity, and financial stability. Bringing home new utensils, especially brass or copper, symbolizes that the family kitchen will always remain filled with nourishing food and hospitality.',
      answerHi:
        'धनतेरस पर धातु खरीदना मां लक्ष्मी और कुबेर जी के शुभागमन का प्रतीक है। धातुएं शुचिता, स्थायित्व और आर्थिक सुरक्षा की परिचायक हैं। नए बर्तन घर लाने से यह माना जाता है कि परिवार का अन्न-भंडार सदा भरा रहेगा।',
      answerHinglish:
        'Dhanteras par metals kharidna Lakshmi ji aur Kuber ji ke welcoming ka shagun hai. Isse ghar mein barkat aur financial stability aati hai.',
    },
    {
      id: 'dhanteras-faq-yamadeepdaan',
      category: 'rituals',
      questionEn: 'What is Yamadeepdaan and why is the lamp placed facing south?',
      questionHi: 'यम दीपदान क्या है और दीया दक्षिण दिशा में ही क्यों रखा जाता है?',
      questionHinglish: 'Yamadeepdaan kya hai aur diya south direction mein kyu rakhte hain?',
      answerEn:
        'Yamadeepdaan is an ancient ritual performed at dusk on Dhanteras where a four-wicked mustard oil lamp made of wheat flour is placed outside the home facing south. South is considered the direction of Yama, the deity of justice and death. This lamp is lit with prayers to protect the entire family from untimely death, accidents, and severe illnesses.',
      answerHi:
        'यम दीपदान धनतेरस की संध्या पर किया जाने वाला पावन अनुष्ठान है जिसमें चार मुखी आटे का दीप सरसों के तेल से जलाकर दक्षिण दिशा की ओर रखा जाता है। दक्षिण दिशा यमराज की मानी जाती है। यह दीप परिवार के सदस्यों को अकाल मृत्यु और दुर्घटनाओं से सुरक्षित रखने की प्रार्थना के साथ जलाया जाता है।',
      answerHinglish:
        'Dhanteras ki shaam ko south direction mein 4-mukhi diya jalane ki parampara ko Yamadeepdaan kehte hain. Yeh family ko untimely death aur bimariyon se protect karta hai.',
    },
    {
      id: 'dhanteras-faq-avoid-buying',
      category: 'gifting',
      questionEn: 'What items should be avoided when shopping on Dhanteras?',
      questionHi: 'धनतेरस के दिन किन वस्तुओं की खरीदारी से बचना चाहिए?',
      questionHinglish: 'Dhanteras ke din kya nahi kharidna chahiye?',
      answerEn:
        'According to tradition, one should avoid buying iron items (associated with Rahu/Shani, except specific tools), sharp objects like knives or scissors, glassware (associated with fragility and Rahu), black colored items, and empty vessels. If buying utensils, fill them with sweets, dry fruits, or grain before entering the home.',
      answerHi:
        'परंपरा के अनुसार धनतेरस पर लोहे की वस्तुएं, नुकीली चीजें (कैंची, चाकू), कांच के बर्तन, काले रंग की वस्तुएं और खाली बर्तन घर लाने से बचना चाहिए। नए बर्तन में थोड़ा अक्षत, बताशे या मिठाई रखकर घर में प्रवेश करना शुभ माना जाता है।',
      answerHinglish:
        'Dhanteras par iron items, sharp objects (knife/scissors), glass items aur black clothes avoid karne chahiye. Khali bartan lene par usme mithai ya chawal daal kar ghar laayein.',
    },
    {
      id: 'dhanteras-faq-muhurat',
      category: 'timing',
      questionEn: 'When is the most auspicious time (Muhurat) for Dhanteras Puja?',
      questionHi: 'धनतेरस पूजन का सबसे शुभ मुहूर्त कब होता है?',
      questionHinglish: 'Dhanteras Puja ka best shubh muhurat kab hota hai?',
      answerEn:
        'The most auspicious time for Dhanteras Puja is during the Pradosh Kaal (approximately 2 hours and 24 minutes after sunset), especially when it coincides with Sthira Lagna (Vrishabha or Taurus ascendant). Performing puja in Sthira Lagna ensures that prosperity remains stably anchored in the household.',
      answerHi:
        'धनतेरस पूजन का सबसे उत्तम समय सूर्यास्त के बाद "प्रदोष काल" माना जाता है, विशेषकर जब स्थिर लग्न (वृषभ लग्न) चल रहा हो। स्थिर लग्न में की गई पूजा से घर में लक्ष्मी का स्थायी वास होता है।',
      answerHinglish:
        'Sunset ke baad Pradosh Kaal aur Sthira Lagna (Taurus/Vrishabha) mein Dhanteras puja karna sabse shubh hota hai jisse prosperity stable rehti hai.',
    },
    {
      id: 'dhanteras-faq-broom',
      category: 'rituals',
      questionEn: 'Why is buying a broom (Jhadu) considered auspicious on Dhanteras?',
      questionHi: 'धनतेरस पर नई झाड़ू खरीदना शुभ क्यों माना जाता है?',
      questionHinglish: 'Dhanteras par jhadu kharidna kyu shubh maante hain?',
      answerEn:
        'In Matsya Purana and folklore, the broom is considered a physical manifestation of Goddess Lakshmi because it cleanses dirt, negativity, and poverty (Daridrata) from the living space. Bringing a new broom signifies a fresh, pure threshold welcoming divine energy.',
      answerHi:
        'झाड़ू को मां लक्ष्मी का रूप माना जाता है क्योंकि यह घर से दरिद्रता, गंदगी और नकारात्मकता को बाहर करती है। धनतेरस पर नई झाड़ू लाने से घर शुद्ध होता है और सकारात्मक ऊर्जा का संचार होता है।',
      answerHinglish:
        'Jhadu ko Lakshmi ji ka roop maana gaya hai kyunki yeh ghar se daridrata aur gandagi ko sweep out karti hai. Nayi jhadu se positive energy aati hai.',
    },
    {
      id: 'dhanteras-faq-coriander',
      category: 'rituals',
      questionEn: 'What is the significance of buying whole coriander seeds (Dhana)?',
      questionHi: 'धनतेरस पर साबुत धनिया खरीदने का क्या महत्व है?',
      questionHinglish: 'Dhanteras par sabut dhaniya kyu kharidte hain?',
      answerEn:
        'Whole dry coriander seeds (Dhana) represent fertility, green growth, and financial growth. Worshipped on Dhanteras evening and partially sown in pots after Diwali, the thriving green shoots symbolize continuous family abundance.',
      answerHi:
        'साबुत धनिया को समृद्धि और संपन्नता का प्रतीक माना जाता है। धनतेरस की पूजा में धनिया अर्पित किया जाता है और दीपोत्सव के बाद इसे गमले में बोया जाता है। हरी पत्तियों का उगना घर में निरंतर बरकत का सूचक होता है।',
      answerHinglish:
        'Sabut dhaniya fertility aur green prosperity ka symbol hai. Puja ke baad ise gamlo mein boya jata hai jo continuous growth ko darshata hai.',
    },
  ],
  greetingsCategoryKey: 'dhanteras',
  relatedRangoliCategories: ['traditional', 'floral', 'freehand'],
  relatedDecorationCategories: ['diyas', 'pooja-setup', 'torans'],
};

