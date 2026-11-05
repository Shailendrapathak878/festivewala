import type { FestivalDetail } from './types';
import { DHANTERAS_DETAIL } from './dhanterasDetails';

export const FESTIVAL_DETAILS: Record<string, FestivalDetail> = {
  dhanteras: DHANTERAS_DETAIL,
  diwali: {
    id: 'diwali',
    nameEn: 'Diwali — Festival of Lights',
    nameHi: 'दीपावली — प्रकाश व उल्लास का महापर्व',
    regionalAliases: ['Deepavali', 'Diwali', 'Divali', 'Deepawali', 'Badi Diwali', 'Lakshmi Puja'],
    tithiEn: 'Kartik Amavasya (October / November)',
    tithiHi: 'कार्तिक अमावस्या (अक्टूबर / नवंबर)',
    taglineEn: 'The sovereign celebration of inner light, boundless prosperity, and triumphant virtue.',
    taglineHi: 'अंधकार पर प्रकाश, अज्ञान पर ज्ञान और बुराई पर अच्छाई की शाश्वत विजय का पावन दीपोत्सव।',
    hinglishTagline: 'Andhere par ujale aur burai par achhai ki jeet ka sabse bada tyohar.',
    accentColor: '#D4AF37',
    secondaryColor: '#E65100',
    bgGradient: 'from-[#220E38] via-[#351759] to-[#120524]',
    heroMotif: 'diwali-diya',
    about: {
      summaryEn:
        'Diwali, also known as Deepavali, is India’s most celebrated festival of lights. Symbolizing the spiritual victory of light over darkness and knowledge over ignorance, it brings families together across five auspicious days: Dhanteras, Naraka Chaturdashi, Lakshmi Puja, Govardhan Puja, and Bhai Dooj.',
      summaryHi:
        'दीपावली भारत का सबसे पावन और लोकप्रिय प्रकाश पर्व है। यह अंधकार पर ज्योति और अज्ञान पर आत्मज्ञान की विजय का प्रतीक है। यह पंचदिवसीय महापर्व धनतेरस, नरक चतुर्दशी, लक्ष्मी पूजन, गोवर्धन पूजा और भाई दूज के रूप में श्रद्धा व उल्लास के साथ मनाया जाता है।',
      culturalSignificanceEn:
        'Diwali honors the homecoming of Bhagwan Shri Rama to Ayodhya after 14 years of exile and the conquest over Ravana. It is equally revered as the auspicious descent of Devi Lakshmi, bestower of wealth, spiritual abundance, and benevolent grace.',
      culturalSignificanceHi:
        'दीपावली प्रभु श्री राम के १४ वर्षों के वनवास उपरांत अयोध्या आगमन और माता महालक्ष्मी के शुभागमन की स्मृति में मनाई जाती है। यह दिन गृह-शांति, नए व्यापारिक आरंभ और समृद्धि के संकल्प का प्रतीक है।',
      historyEn:
        'Rooted in ancient Sanskrit texts such as the Skanda Purana and Padma Purana, lighting clay lamps (diyas) commemorates the illumined paths of devotion, purity, and universal brotherhood across millennia.',
      historyHi:
        'स्कंद पुराण और पद्म पुराण के अनुसार मिट्टी के दीयों में प्रज्वलित पावन अग्नि सूर्यदेव और परमात्मा के तेज का प्रतिनिधित्व करती है, जो समस्त नकारात्मक शक्तियों का शमन करती है।',
      keyThemes: [
        { en: 'Divine Radiance', hi: 'दिव्य ज्योति', icon: '🪔' },
        { en: 'Prosperity & Grace', hi: 'वैभव व श्री', icon: '🪙' },
        { en: 'Family Unity', hi: 'पारिवारिक स्नेह', icon: '🏡' },
        { en: 'Sacred Beginnings', hi: 'मंगलारंभ', icon: '✨' },
      ],
    },
    traditions: [
      {
        id: 'lakshmi-puja',
        titleEn: 'Sacred Lakshmi-Ganesha Puja',
        titleHi: 'श्री महालक्ष्मी-गणेश पूजन',
        descEn:
          'On the evening of Amavasya, households purify their sanctums, chant the Lakshmi Suktam, and invoke blessings for wisdom, righteous prosperity, and peaceful living.',
        descHi:
          'अमावस्या की पावन संध्या पर शुभ मुहूर्त में भगवान गणेश और माता लक्ष्मी का षोडशोपचार पूजन किया जाता है, जिससे घर में रिद्धि-सिद्धि और सुख-शांति का वास हो।',
        customs: [
          { en: 'Lighting 21 or 51 earthen diyas with pure sesame or mustard oil', hi: 'शुद्ध तिल या सरसों के तेल के २१ या ५१ मिट्टी के दीये जलाना' },
          { en: 'Keeping accounts book (Bahi-Khata) for auspicious commercial blessings', hi: 'व्यापारिक बही-खातों पर शुभ लाभ और स्वस्तिक अंकित करना' },
          { en: 'Offering lotus blossoms, batashas, and fresh kheer', hi: 'कमल पुष्प, बताशे और सुगंधित खीर का पावन नैवेद्य अर्पित करना' },
        ],
        regionalVariations: {
          en: 'In Bengal, Kali Puja is performed on Diwali night, honoring the fierce maternal power that dispels cosmic evil.',
          hi: 'पश्चिम बंगाल में इस रात्रि मां श्यामा (काली) का भव्य पूजन किया जाता है जो आसुरी शक्तियों का संहार करती हैं।',
        },
        icon: '🪔',
      },
      {
        id: 'deep-daan',
        titleEn: 'Deep Daan & Illumination',
        titleHi: 'दीपदान एवं गृह आलोक',
        descEn:
          'Decorating verandas, parapets, and thresholds with earthen lamps welcoming auspicious deities and ancestors with radiant warmth.',
        descHi:
          'द्वार, देहरी, तुलसी चौबारे और छत की मुंडेरों पर दीपों की कतारें सजाना ताकि घर के प्रत्येक कोने से तिमिर का नाश हो सके।',
        customs: [
          { en: 'Placing the prime Yama Deepam facing south for family longevity', hi: 'परिवार की दीर्घायु और सुरक्षा हेतु दक्षिण दिशा में यम दीप प्रज्वलित करना' },
          { en: 'Honoring the holy Tulsi plant with ghee lamps', hi: 'पवित्र तुलसी माता के चौबारे पर घी का अखंड दीपक स्थापित करना' },
        ],
        icon: '✨',
      },
      {
        id: 'family-feasting',
        titleEn: 'Joyful Gifting & Community Sweets',
        titleHi: 'पारस्परिक मिलन एवं मिष्ठान वितरण',
        descEn:
          'Visiting elders, touching feet for sacred blessings, exchanging dry fruit boxes, and sharing homemade delicacies with neighbours.',
        descHi:
          'बड़ों के चरण स्पर्श कर आशीर्वाद लेना, परिजनों व मित्रों से गले मिलकर शुभकामनाएं देना और प्रेमपूर्वक मिठाइयां बांटना।',
        customs: [
          { en: 'Wearing traditional silk kurtas and festive sarees', hi: 'पारंपरिक रेशमी परिधान और मांगलिक वस्त्र धारण करना' },
          { en: 'Distributing sweets to domestic helpers and service providers', hi: 'समाज के सभी सहयोगियों और सहायकों को मिष्ठान व उपहार भेंट करना' },
        ],
        icon: '🤝',
      },
    ],
    decorations: [
      {
        id: 'marigold-toran',
        titleEn: 'Auspicious Fresh Marigold & Mango Leaf Toran',
        titleHi: 'ताजे गेंदे के फूल और आम्रपल्लव का पावन तोरण',
        descEn:
          'Hang fresh golden marigolds interspersed with vibrant green mango leaves at your main threshold to invite positive cosmic vibration.',
        descHi:
          'मुख्य द्वार पर पीले व नारंगी गेंदे के फूल तथा हरे आम के पत्तों का तोरण बांधें। यह नकारात्मक ऊर्जा को रोककर सकारात्मकता का संचार करता है।',
        tipEn: 'Dip the stems in fresh water for 15 minutes before stringing to ensure 48 hours of natural freshness.',
        tipHi: 'पिरोने से पहले डंडियों को १५ मिनट ताजे पानी में रखें जिससे मालाएं दो दिनों तक खिली रहें।',
        tagEn: 'Entrance & Doors',
        tagHi: 'मुख्य द्वार',
      },
      {
        id: 'brass-urli',
        titleEn: 'Floating Candle & Petal Brass Urli',
        titleHi: 'पीतल की उरली में जल, पुष्प और फ्लोटिंग दीये',
        descEn:
          'Place a hand-hammered brass or terracotta urli filled with water, rose petals, jasmine buds, and floating tea-lights in the living room corner.',
        descHi:
          'लिविंग रूम या लॉबी में पीतल की उरली में स्वच्छ जल भरकर उसमें गुलाब की पंखुड़ियां, चमेली के फूल और तैरते हुए दीप सजाएं।',
        tipEn: 'Add 2 drops of sandalwood or rose essential oil to the water for an ethereal room aroma.',
        tipHi: 'जल में २ बूंद चंदन या गुलाब का इत्र मिलाएं, जिससे कक्ष में भीनी सुगंध फैल जाएगी।',
        tagEn: 'Living Room',
        tagHi: 'लिविंग रूम',
      },
      {
        id: 'diya-pathways',
        titleEn: 'Symmetrical Clay Diya Border Pathways',
        titleHi: 'बालकनी व सीढ़ियों पर सममित मिट्टी के दीयों की कतार',
        descEn:
          'Line walkways, balcony ledges, and staircase risers with terracotta diyas placed at uniform 1-foot intervals.',
        descHi:
          'बालकनी की रेलिंग, छज्जों और सीढ़ियों पर समान दूरी पर तेल से भरे मिट्टी के दीयों की मनमोहक पंक्ति सजाएं।',
        tipEn: 'Soak raw clay diyas overnight in water before adding oil so they burn longer and do not soak up excess oil.',
        tipHi: 'कच्चे दीयों को उपयोग से पहले रात भर पानी में भिगोएं, इससे वे कम तेल सोखते हैं और देर तक जलते हैं।',
        tagEn: 'Balcony & Terraces',
        tagHi: 'बालकनी व मुंडेर',
      },
    ],
        recipes: [
      {
        id: 'kaju-katli',
        nameEn: 'Royal Silver Kaju Katli',
        nameHi: 'शाही काजू कतली',
        typeEn: 'Traditional Festive Sweet',
        typeHi: 'पारंपरिक शाही मिष्ठान',
        timeEn: '30 Mins Prep • 1 Hr Set',
        timeHi: '३० मिनट तैयारी • १ घंटा विश्राम',
        descEn:
          'The crown jewel of Diwali sweets made with rich cashew nut flour, fine cane sugar syrup, and fragrant green cardamom.',
        descHi:
          'दीपावली का सबसे लोकप्रिय मिष्ठान — बारीक काजू चूर्ण, इलायची और चाशनी से बनी कोमल, मुंह में घुल जाने वाली शाही कतली।',
        ingredients: [
          { en: '2 cups Raw Cashews (ground to fine powder)', hi: '२ कप काजू (बारीक पीसा हुआ)' },
          { en: '1 cup Sugar + 1/2 cup Water', hi: '१ कप चीनी + आधा कप पानी' },
          { en: '1/2 tsp Cardamom Powder', hi: 'आधा छोटा चम्मच हरी इलायची पाउडर' },
          { en: '1 tsp Pure Cow Ghee', hi: '१ छोटा चम्मच शुद्ध गाय का घी' },
        ],
        steps: [
          { en: 'Boil sugar and water to a light single-thread consistency.', hi: 'पानी और चीनी को धीमी आंच पर एक तार की चाशनी बनने तक उबालें।' },
          { en: 'Add cashew powder gradually on low heat, stirring continuously to prevent lumps.', hi: 'काजू पाउडर को थोड़ा-थोड़ा डालकर लगातार चलाएं ताकि गुठलियां न पड़ें।' },
          { en: 'Cook until the dough leaves the sides of the pan; knead softly with ghee when warm.', hi: 'मिश्रण कड़ाही छोड़ने लगे तब उतारें और गुनगुना होने पर घी लगाकर गूंथ लें।' },
          { en: 'Roll evenly between parchment sheets and slice into elegant diamond cuts.', hi: 'बटर पेपर पर बेलें और मनमोहक डायमंड आकार में काट लें।' },
        ],
      },
      {
        id: 'besan-laddoo',
        nameEn: 'Desi Ghee Danedar Besan Laddoo',
        nameHi: 'देसी घी के दानेदार बेसन लड्डू',
        typeEn: 'Auspicious Festive Sweet',
        typeHi: 'मांगलिक पारंपरिक मिष्ठान',
        timeEn: '40 Mins Slow Roast',
        timeHi: '४० मिनट धीमी आंच पर भुनाई',
        descEn:
          'Aromatic, golden-roasted coarse gram flour folded with pure desi cow ghee, fragrant green cardamom, and powdered boora sugar.',
        descHi:
          'धीमी आंच पर सुगंधित होने तक भुना हुआ दानेदार बेसन, शुद्ध देसी गाय का घी, इलायची और बूरा चीनी से बने पारंपरिक लड्डू जो भगवान गणेश को अत्यंत प्रिय हैं।',
        ingredients: [
          { en: '2 cups Coarse Besan (Gram Flour)', hi: '२ कप मोटा दानेदार बेसन' },
          { en: '1 cup Pure Desi Ghee', hi: '१ कप शुद्ध देसी घी' },
          { en: '1.5 cups Boora / Tagar (Confectioner Sugar)', hi: 'डेढ़ कप बूरा या तगार चीनी' },
          { en: '1/2 tsp Cardamom powder & slivered almonds', hi: 'आधा छोटा चम्मच इलायची पाउडर व बादाम कतरन' },
        ],
        steps: [
          { en: 'Melt ghee in a heavy-bottomed kadai and roast besan over low flame until golden brown and nutty.', hi: 'कड़ाही में घी पिघलाएं और बेसन को धीमी आंच पर लगातार चलाते हुए सुनहरा व सुगंधित होने तक भूनें।' },
          { en: 'Sprinkle 1 tsp water to create signature granules (danedaar texture) and cool completely.', hi: 'एक चम्मच पानी के छींटे मारकर दाना उठाएं और मिश्रण को पूरी तरह ठंडा होने दें।' },
          { en: 'Mix in boora sugar, cardamom powder, and nuts; bind firmly into round laddoos.', hi: 'ठंडे मिश्रण में बूरा, इलायची और मेवे मिलाकर गोल-गोल लड्डू बना लें।' },
        ],
      },
      {
        id: 'gujiya',
        nameEn: 'Crispy Mawa & Dry Fruit Gujiya',
        nameHi: 'मावा व मेवे भरी खस्ता गुजिया',
        typeEn: 'Traditional Stuffed Pastry',
        typeHi: 'पारंपरिक खस्ता भरवां मिष्ठान',
        timeEn: '45 Mins Prep • 20 Mins Fry',
        timeHi: '४५ मिनट भरावन • २० मिनट तलना',
        descEn:
          'Crispy, golden pastry parcels filled with rich roasted mawa (khoya), desiccated coconut, chironji, and crushed dry fruits.',
        descHi:
          'मैदे की खस्ता सुनहरी परत के भीतर भुना हुआ मावा (खोया), सूखा नारियल, चिरौंजी, इलायची और काजू-बादाम का लाजवाब भरावन।',
        ingredients: [
          { en: '2 cups All-Purpose Flour (Maida) + 3 tbsp Ghee moyan', hi: '२ कप मैदा + ३ बड़े चम्मच देसी घी का मोयन' },
          { en: '1 cup Fresh Mawa (Khoya), lightly roasted', hi: '१ कप ताजा मावा, धीमी आंच पर भुना हुआ' },
          { en: '1/2 cup Powdered Sugar + 2 tbsp Chironji & nuts', hi: 'आधा कप पिसी चीनी, २ चम्मच चिरौंजी व मेवे' },
          { en: '1/2 cup Dry Grated Coconut & green cardamom', hi: 'आधा कप कद्दूकस सूखा नारियल व कुटी इलायची' },
        ],
        steps: [
          { en: 'Knead a semi-stiff dough with flour, ghee, and lukewarm water; rest 20 minutes.', hi: 'मैदा में घी का मोयन देकर गुनगुने पानी से मध्यम कड़ा आटा गूंथें और २० मिनट ढककर रखें।' },
          { en: 'Cool roasted mawa and mix with sugar, coconut, chironji, and cardamom.', hi: 'भुने हुए मावे के ठंडा होने पर उसमें चीनी, नारियल, सूखे मेवे और इलायची मिलाएं।' },
          { en: 'Roll small discs, fill with mawa mixture, seal edges neatly, and deep fry on low heat to golden perfection.', hi: 'छोटी पूरियां बेलकर भरावन भरें, किनारों को दबाकर सील करें और धीमी आंच पर सुनहरा होने तक तलें।' },
        ],
      },
      {
        id: 'crispy-jalebi',
        nameEn: 'Saffron Kesar Jalebi with Pistachio',
        nameHi: 'शाही केसरिया कुरकुरी जलेबी',
        typeEn: 'Festive Crispy Sweet',
        typeHi: 'रसीला पारंपरिक मिष्ठान',
        timeEn: '30 Mins Cook',
        timeHi: '३० मिनट तैयारी व पाक विधि',
        descEn:
          'Crisp, spiral golden coils deep-fried in desi ghee and steeped in fragrant saffron and cardamom cane syrup.',
        descHi:
          'शुद्ध घी में कुरकुरी तली हुई सुनहरी जलेबियां, जिन्हें कश्मीरी केसर, गुलाब जल और हरी इलायची की चाशनी में डुबोकर परोसा जाता है।',
        ingredients: [
          { en: '1 cup All-purpose flour + 1 tbsp cornflour', hi: '१ कप मैदा + १ बड़ा चम्मच कॉर्नफ्लोर' },
          { en: '1.5 cups Sugar + 1 cup Water for syrup', hi: 'डेढ़ कप चीनी + १ कप पानी चाशनी हेतु' },
          { en: 'Pinch of Kashmiri Saffron & Cardamom powder', hi: 'एक चुटकी कश्मीरी केसर व कुटी इलायची' },
          { en: 'Pure Cow Ghee or oil for frying', hi: 'तलने के लिए शुद्ध देसी घी अथवा तेल' },
        ],
        steps: [
          { en: 'Prepare a smooth, flowing batter and prepare a one-string saffron infused sugar syrup.', hi: 'मैदे का चिकना घोल बनाएं और केसर युक्त एक तार की गुनगुनी चाशनी तैयार करें।' },
          { en: 'Pipe spirals into medium-hot ghee, frying until crisp and light golden on both sides.', hi: 'कपड़े या बोतल की सहायता से घी में गोल-गोल घुमावदार जलेबियां बनाएं और कुरकुरी होने तक तलें।' },
          { en: 'Immediately immerse hot jalebis into warm saffron syrup for 1-2 minutes; serve fresh.', hi: 'गरमा-गरम जलेबियों को चाशनी में १-२ मिनट डुबोकर निकालें और पिस्ता से सजाकर परोसें।' },
        ],
      },
      {
        id: 'crunchy-chakli',
        nameEn: 'Crispy Spiced Spiral Chakli / Murukku',
        nameHi: 'कुरकुरी नमकीन चकली व मुरुक्कू',
        typeEn: 'Savory Festive Crunch',
        typeHi: 'पारंपरिक नमकीन व फराल',
        timeEn: '35 Mins Cook',
        timeHi: '३५ मिनट विधि',
        descEn:
          'The quintessential Diwali savory snack — seasoned rice and roasted gram flour spirals infused with sesame, carom, and cumin seeds.',
        descHi:
          'दीपावली के फराल का प्रमुख नमकीन — चावल और भुने चने के आटे से बनी कुरकुरी चकली जिसमें तिल, अजवाइन और हींग की भीनी खुशबू होती है।',
        ingredients: [
          { en: '2 cups Rice Flour + 1/2 cup Roasted Besan', hi: '२ कप चावल का आटा + आधा कप भुना बेसन' },
          { en: '1 tbsp White Sesame Seeds + 1 tsp Ajwain', hi: '१ बड़ा चम्मच सफेद तिल + १ छोटा चम्मच अजवाइन' },
          { en: '1 tsp Kashmiri Red Chilli & pinch of Hing', hi: '१ छोटा चम्मच लाल मिर्च व चुटकी भर हींग' },
          { en: '2 tbsp Hot Ghee for crispiness (Moyan)', hi: '२ बड़े चम्मच गर्म घी (मोयन हेतु)' },
        ],
        steps: [
          { en: 'Mix flours, spices, sesame, and hot melted ghee; knead a soft pliable dough with warm water.', hi: 'आटे में मसाले, तिल और गर्म घी मिलाकर गुनगुने पानी से नरम आटा गूंथें।' },
          { en: 'Press through a star-nozzle chakli maker into neat spiral coils onto parchment.', hi: 'चकली मेकर में आटा भरकर बटर पेपर पर सुंदर गोल-गोल चकली बनाएं।' },
          { en: 'Deep fry over medium-low heat until completely crisp and bubbles subside.', hi: 'मध्यम आंच पर कुरकुरी होने तक तलें और ठंडा होने पर एयरटाइट डिब्बे में रखें।' },
        ],
      },
      {
        id: 'namak-pare',
        nameEn: 'Flaky Ajwain Namak Pare & Mathri',
        nameHi: 'खस्ता अजवाइन नमक पारे व मठरी',
        typeEn: 'Crispy Savory Nibbles',
        typeHi: 'पारंपरिक चाय व उत्सव नाश्ता',
        timeEn: '25 Mins Prep • 20 Mins Fry',
        timeHi: '२५ मिनट तैयारी • २० मिनट तलना',
        descEn:
          'Diamond-cut crispy savory ribbons gently seasoned with crushed carom seeds (ajwain), black pepper, and pink rock salt.',
        descHi:
          'अजवाइन, काली मिर्च और सेंधा नमक से सुवासित डायमंड आकार के खस्ता नमक पारे, जो मीठी मिठाइयों के बीच स्वाद का उत्तम संतुलन बनाते हैं।',
        ingredients: [
          { en: '2 cups Maida (or Whole Wheat flour)', hi: '२ कप मैदा (या शुद्ध गेहूं का आटा)' },
          { en: '1 tsp Crushed Carom Seeds (Ajwain)', hi: '१ छोटा चम्मच कुटी हुई अजवाइन' },
          { en: '1 tsp Rock Salt + 1/4 cup Desi Ghee', hi: '१ छोटा चम्मच सेंधा नमक + १/४ कप देसी घी' },
          { en: 'Lukewarm water to knead stiff dough', hi: 'कड़ा आटा गूंथने के लिए गुनगुना पानी' },
        ],
        steps: [
          { en: 'Rub ghee into the flour until it resembles breadcrumbs; knead a stiff dough.', hi: 'आटे में घी और अजवाइन मिलाकर अच्छी तरह मोयन दें और कड़ा आटा गूंथें।' },
          { en: 'Roll out medium-thin sheets and cut diagonally into diamond ribbons.', hi: 'रोटी की तरह बेलकर चाकू से तिरछे डायमंड आकार में काट लें।' },
          { en: 'Fry on gentle low flame until pale golden and utterly crunchy.', hi: 'धीमी आंच पर हल्का बादामी और बेहद खस्ता होने तक तलें।' },
        ],
      },
    ],
    gifts: [
      {
        id: 'brass-puja-thali',
        titleEn: 'Engraved Brass Diya & Puja Thali Set',
        titleHi: 'नक्काशीदार पीतल पूजा थाली एवं दीया सेट',
        recipientTypeEn: 'For Parents & Family Elders',
        recipientTypeHi: 'माता-पिता व अग्रजों के लिए',
        descEn: 'A timeless heirloom gift that graces their daily morning worship and festive shrines with traditional sacred dignity.',
        descHi: 'एक पारंपरिक स्मृति उपहार जो दैनिक पूजा और दीपावली की शाम उनके मंदिर को दिव्य आभा से सुसज्जित करेगा।',
        budgetRange: '₹1,000–₹2,500',
      },
      {
        id: 'artisan-diya-hamper',
        titleEn: 'Handmade Terracotta Diya & Scented Candle Box',
        titleHi: 'हस्तनिर्मित दीया व सुगंधित मोमबत्ती उपहार बॉक्स',
        recipientTypeEn: 'For Friends & Colleagues',
        recipientTypeHi: 'मित्रों और सहकर्मियों के लिए',
        descEn: 'Eco-friendly hand-painted clay lamps paired with organic soy wax diyas, promoting artisan livelihoods.',
        descHi: 'हस्तशिल्पियों द्वारा रंग-बिरंगे चित्रित मिट्टी के दीये और सुगंधित मोमबत्तियां जो पर्यावरण के अनुकूल हैं।',
        budgetRange: '₹500–₹1,000',
      },
      {
        id: 'kashmiri-dryfruit-box',
        titleEn: 'Royal Wooden Box of Roasted Nuts & Saffron',
        titleHi: 'लकड़ी की नक्काशीदार डिब्बी में शाही मेवा व केसर',
        recipientTypeEn: 'For Corporate & Valued Clients',
        recipientTypeHi: 'व्यापारिक भागीदारों व संबंधियों के लिए',
        descEn: 'Premium California almonds, Afghani raisins, and rich cashews nestled in an ornate reusable Sheesham wooden chest.',
        descHi: 'उच्च गुणवत्ता वाले काजू, बादाम और किशमिश एक सुंदर पुनः प्रयोज्य शीशम की नक्काशीदार डिब्बी में।',
        budgetRange: '₹1,000–₹2,500',
      },
    ],
        faqs: [
      {
        id: 'diwali-faq-01',
        questionEn: 'What is Diwali (Deepavali) and what is its literal meaning?',
        questionHi: 'दीपावली (दिवाली) क्या है और इसका शाब्दिक अर्थ क्या होता है?',
        questionHinglish: 'Diwali (Deepavali) kya hai aur iska shabdeek arth kya hai?',
        answerEn:
          'Deepavali originates from the ancient Sanskrit words "Dipa" (दीप, meaning lamp or light) and "Avali" (आवलि, meaning row, series, or continuous line). Literally translating to "a continuous row of illuminated lamps", Diwali is India’s sovereign celebration of light. It commemorates the eternal spiritual victory of light over darkness, knowledge over ignorance, and righteous goodwill over malice across five sacred days in the autumn month of Kartik.',
        answerHi:
          'दीपावली शब्द संस्कृत के दो शब्दों "दीप" (दीया अथवा प्रकाश) और "आवलि" (पंक्ति अथवा कतार) के मेल से बना है, जिसका शाब्दिक अर्थ है "दीपकों की पंक्ति"। यह भारत का सबसे बड़ा और पावन प्रकाश पर्व है। यह अंधकार पर प्रकाश, अज्ञान पर ज्ञान और असत्य पर सत्य की शाश्वत विजय का प्रतीक है। कार्तिक माह में यह उत्सव पांच दिनों तक उल्लास और श्रद्धा के साथ मनाया जाता है।',
        answerHinglish:
          'Deepavali do Sanskrit shabdon se bana hai — "Dipa" (yani diya ya roshni) aur "Avali" (yani line ya katar), jiska matlab hai "deeyon ki pankti". Yeh Bharat ka sabse bada tyohar hai jo andhere par ujale, agyan par gyan aur burai par achhai ki jeet ka prateek hai.',
        category: 'general',
      },
      {
        id: 'diwali-faq-02',
        questionEn: 'Why is Diwali celebrated? What are its primary origins?',
        questionHi: 'दिवाली क्यों मनाई जाती है? इसके प्रमुख पौराणिक और सांस्कृतिक कारण क्या हैं?',
        questionHinglish: 'Diwali kyon manayi jaati hai aur iske peeche kaunsi kathaen hain?',
        answerEn:
          'Diwali embraces diverse sacred origins across Indian traditions: 1) For Hindus, it marks Bhagwan Shri Rama’s triumphant return to Ayodhya with Devi Sita and Lakshmana after 14 years of forest exile and the vanquishing of Ravana, as well as the auspicious incarnation of Devi Lakshmi from the cosmic ocean (Samudra Manthan); 2) In Krishna traditions, it honors the defeat of the demon Narakasura by Lord Krishna and Satyabhama; 3) In Jainism, it marks the day Bhagwan Mahavira attained Nirvana (spiritual liberation) at Pavapuri in 527 BCE; 4) In Sikhism, it is celebrated as Bandi Chhor Divas to commemorate Guru Hargobind Sahib Ji’s release from Gwalior Fort alongside 52 innocent kings in 1619.',
        answerHi:
          'दीपावली विभिन्न भारतीय परंपराओं में अनेक पावन घटनाओं की स्मृति में मनाई जाती है: १) सनातन परंपरा में भगवान श्री राम के १४ वर्षों के वनवास और रावण-वध के उपरांत अयोध्या लौटने की खुशी में तथा समुद्र मंथन से माता लक्ष्मी के प्राकट्य पर; २) द्वापर युग में भगवान श्रीकृष्ण व सत्यभामा द्वारा अत्याचारी नरकासुर के वध और १६,००० बंदियों की मुक्ति के उपलक्ष्य में; ३) जैन धर्म में २४वें तीर्थंकर भगवान महावीर स्वामी के कार्तिक अमावस्या पर पावापुरी में निर्वाण (मोक्ष) प्राप्ति की स्मृति में; ४) सिख धर्म में छठे गुरु श्री हरगोबिंद साहिब जी के ग्वालियर किले से ५२ निर्दोष राजाओं सहित रिहा होकर अमृतसर आगमन (बंदी छोड़ दिवस) के रूप में।',
        answerHinglish:
          'Diwali ke peeche kai pavitra itihasik aur dharmik kathaen hain: Shri Ram ka 14 saal baad Ayodhya aagman, Mata Lakshmi ka prakatya, Shri Krishna dwara Narakasur ka vadh, Jain dharm me Bhagwan Mahavira ka Nirvana, aur Sikh panth me Guru Hargobind Sahib Ji ka Bandi Chhor Divas.',
        category: 'rituals',
      },
      {
        id: 'diwali-faq-03',
        questionEn: 'Why is Diwali called the Festival of Lights?',
        questionHi: 'दिवाली को "प्रकाश का महापर्व" क्यों कहा जाता है?',
        questionHinglish: 'Diwali ko "Festival of Lights" kyon kaha jaata hai?',
        answerEn:
          'Diwali falls on Kartik Amavasya, the darkest new moon night of the Hindu autumn lunar calendar. By illuminating millions of golden clay lamps (diyas), lanterns, and candles, homes and communities transform pitch-black darkness into radiant splendour. Beyond physical light, the flame symbolizes the divine spark of the soul (Atman), the illuminating power of wisdom (Jnana), and the universal prayer "Tamaso ma jyotirgamaya" (Lead us from darkness into light).',
        answerHi:
          'दीपावली कार्तिक मास की सबसे घनी अंधेरी रात (अमावस्या) को मनाई जाती है। करोड़ों मिट्टी के दीयों और दीप-मालाओं से इस घोर तिमिर को दिव्य प्रकाश में बदल दिया जाता है। भारतीय दर्शन में प्रकाश सत्य, ज्ञान और आत्म-चेतना का प्रतीक है। उपनिषदों का शाश्वत मंत्र "तमसो मा ज्योतिर्गमय" (हमें अंधकार से प्रकाश की ओर ले चलो) इसी पर्व का मूल संदेश है।',
        answerHinglish:
          'Diwali Kartik Amavasya ki sabse andheri raat ko aati hai. Karodon clay diyas jala kar is andhere ko roshni me badla jaata hai. Light hamare andar ke gyan, sachhai aur Atma ki divine power ko symbolize karti hai.',
        category: 'general',
      },
      {
        id: 'diwali-faq-04',
        questionEn: 'How many days is Diwali celebrated and what are the five days?',
        questionHi: 'दिवाली कितने दिनों तक मनाई जाती है और ये पांच पावन दिन कौन-से हैं?',
        questionHinglish: 'Diwali kitne dino tak celebrate hoti hai aur 5 din kaunse hain?',
        answerEn:
          'Diwali is celebrated over five consecutive sacred days: 1) Dhanteras (Dhanatrayodashi) — invoking health through Bhagwan Dhanvantari and purchasing auspicious metals; 2) Naraka Chaturdashi (Choti Diwali / Roop Chaudas) — early dawn herbal bath (Abhyanga Snan) and dispelling inner negativity; 3) Lakshmi Puja (Badi Diwali) — the core celebration welcoming Goddess Lakshmi and Lord Ganesha; 4) Govardhan Puja (Annakut / Gujarati New Year Bestu Varas) — offering gratitude to nature and mountain Govardhan; 5) Bhai Dooj (Yama Dwitiya / Bhau Beej) — celebrating the sacred and unconditional bond of love between brothers and sisters.',
        answerHi:
          'दीपावली पांच पावन दिनों का महापर्व है: १) धनतेरस — भगवान धन्वंतरि पूजन, आरोग्य कामना व शुभ धातु क्रय; २) नरक चतुर्दशी (छोटी दिवाली/रूप चौदस) — अभ्यंग स्नान, चौदह दीपदान व अंतर्मन की शुद्धि; ३) लक्ष्मी पूजन (बड़ी दिवाली) — महालक्ष्मी व श्री गणेश का षोडशोपचार पूजन व दीपदान; ४) गोवर्धन पूजा (अन्नकूट/गुजराती नववर्ष) — प्रकृति व गो-माता का पूजन तथा ५६ भोग; ५) भाई दूज (यम द्वितीया) — भाई-बहन के अटूट स्नेह, तिलक व दीर्घायु की मंगलकामना।',
        answerHinglish:
          'Diwali 5 din manayi jaati hai: Day 1 Dhanteras (health & prosperity), Day 2 Naraka Chaturdashi / Choti Diwali (cleansing & 14 diyas), Day 3 Main Diwali (Lakshmi-Ganesh Puja), Day 4 Govardhan Puja / Annakut (nature gratitude), aur Day 5 Bhai Dooj (brother-sister bond).',
        category: 'timing',
      },
      {
        id: 'diwali-faq-05',
        questionEn: 'What is the significance of Lakshmi Puja and why are Lakshmi and Ganesha worshipped together?',
        questionHi: 'लक्ष्मी पूजन का क्या महत्व है और माता लक्ष्मी के साथ भगवान गणेश का पूजन क्यों किया जाता है?',
        questionHinglish: 'Lakshmi Puja ka kya mahatva hai aur Lakshmi ji ke sath Ganesh ji ki puja kyon hoti hai?',
        answerEn:
          'Goddess Lakshmi represents wealth, prosperity, and cosmic abundance, while Lord Ganesha personifies supreme wisdom, intellect (Buddhi), and the removal of obstacles (Vighnaharta). In Indian philosophy, material wealth without moral wisdom breeds egoism, greed, and destruction. Therefore, worshippers venerate both deities together on Diwali so that wealth is accompanied by ethical discernment, rightful stewardship, and spiritual peace.',
        answerHi:
          'माता महालक्ष्मी सुख, ऐश्वर्य और धन-संपदा की अधिष्ठात्री देवी हैं, जबकि भगवान श्री गणेश बुद्धि, विवेक और विघ्न विनाश के स्वामी हैं। भारतीय संस्कृति में यह मान्यता है कि विवेकहीन धन अहंकार और पतन का कारण बनता है। अतः सद्बुद्धि के बिना समृद्धि का सदुपयोग संभव नहीं है। इसीलिए दीपावली की संध्या पर दोनों का संयुक्त पूजन किया जाता है ताकि अर्जित धन धर्म और कल्याण के मार्ग पर लगे।',
        answerHinglish:
          'Mata Lakshmi wealth aur prosperity ki devi hain aur Lord Ganesha wisdom aur buddhi ke devta. Bina buddhi ke dhan ahankar lata hai, isliye Diwali par dono ki sath me puja hoti hai taaki prosperity ke sath ethical wisdom bhi mile.',
        category: 'rituals',
      },
      {
        id: 'diwali-faq-06',
        questionEn: 'Why do people specifically light earthen clay diyas on Diwali?',
        questionHi: 'दिवाली पर मिट्टी के दीये जलाने का क्या धार्मिक और वैज्ञानिक महत्व है?',
        questionHinglish: 'Diwali par earthen clay diyas jalane ka kya reason aur mahatva hai?',
        answerEn:
          'Earthen diyas (mitti ke diye) represent the harmonious union of the five primordial elements (Pancha Bhoota): Earth (clay), Water (used in kneading clay), Fire (the sacred flame), Air (oxygen sustaining the wick), and Ether (the light filling space). Burning pure mustard or sesame oil in clay lamps emits natural purifying vapours that help cleanse seasonal insects after the monsoons. Furthermore, purchasing handmade diyas directly supports indigenous traditional potters (Kumhars) and sustains village artisan economies.',
        answerHi:
          'मिट्टी के दीये पंचमहाभूतों (पृथ्वी, जल, अग्नि, वायु और आकाश) के पावन समन्वय का प्रतीक हैं। मिट्टी पृथ्वी तत्व है, उसे जल से गूंथा जाता है, अग्नि प्रकाश देती है, वायु लौ को पोषित करती है और प्रकाश आकाश में व्याप्त होता है। सरसों के तेल के दीये जलाने से वर्षा ऋतु के बाद के कीटाणु नष्ट होते हैं और वातावरण शुद्ध होता है। साथ ही, मिट्टी के दीये खरीदने से ग्रामीण कुम्हारों और दस्तकारों की आजीविका को सीधा संबल मिलता है।',
        answerHinglish:
          'Mitti ke diye Pancha Bhoota (5 elements) ka prateek hain. Mustard oil se jalne wale diye natural purification karte hain aur local kumhar (potters) ko support karte hain.',
        category: 'rituals',
      },
      {
        id: 'diwali-faq-07',
        questionEn: 'What is the difference between the terms "Diwali" and "Deepavali"?',
        questionHi: '"दिवाली" और "दीपावली" शब्दों में क्या अंतर है?',
        questionHinglish: '"Diwali" aur "Deepavali" me kya farak hota hai?',
        answerEn:
          'There is no theological difference between the two; they are linguistic variations of the identical celebration. "Deepavali" is the original, classical Sanskrit compound (Dīpa + Āvali, meaning a continuous garland or row of lamps), still universally used in South Indian states (Tamil Nadu, Karnataka, Andhra Pradesh, Kerala) and formal literature. "Diwali" is the phonetic evolution in modern Indo-Aryan languages (Prakrit to Apabhramsha to modern Hindi), widely spoken across North India, the diaspora, and international media.',
        answerHi:
          '"दीपावली" और "दिवाली" में कोई तात्विक या धार्मिक भेद नहीं है; यह केवल भाषा और उच्चारण का अंतर है। "दीपावली" मूल संस्कृत तत्सम शब्द है जो दक्षिण भारत (तमिलनाडु, कर्नाटक, आंध्र, केरल) और प्राचीन धर्मग्रंथों में प्रयुक्त होता है। समय के साथ प्राकृत और अपभ्रंश भाषा से होते हुए हिंदी में इसका तद्भव रूप "दिवाली" प्रचलित हुआ जो उत्तर भारत व वैश्विक स्तर पर लोकप्रिय है। दोनों एक ही पावन पर्व को संबोधित करते हैं।',
        answerHinglish:
          'Donon me koi religious difference nahi hai. "Deepavali" classical Sanskrit word hai jo South India me use hota hai, aur "Diwali" iska evolved Hindi form hai jo North India aur globally common hai.',
        category: 'general',
      },
      {
        id: 'diwali-faq-08',
        questionEn: 'How can we celebrate an eco-friendly and compassionate Diwali?',
        questionHi: 'पर्यावरण-अनुकूल (ईको-फ्रेंडली) और संवेदनशील दिवाली कैसे मनाएं?',
        questionHinglish: 'Eco-friendly aur compassionate Diwali kaise manayi ja sakti hai?',
        answerEn:
          'You can celebrate an eco-friendly and compassionate Diwali by: 1) Using locally made terracotta diyas with organic oils rather than electric plastic lamps or toxic paraffin candles; 2) Designing rangolis with dry rice flour, turmeric, vermilion, and real fresh flower petals instead of synthetic chemical dyes; 3) Avoiding toxic noise-heavy firecrackers to protect vulnerable seniors, infants, birds, and domestic pets; 4) Wrapping gifts in reusable cotton or handmade paper; and 5) Sharing fresh homemade sweets and warm festive clothing with underprivileged families and sanitation workers in your locality.',
        answerHi:
          'पर्यावरण-अनुकूल और करुणामयी दिवाली मनाने के सरल उपाय: १) स्थानीय कुम्हारों से मिट्टी के दीये खरीदकर सरसों या तिल के तेल से जलाएं; २) रासायनिक रंगों के स्थान पर चावल का आटा, हल्दी, रोली और ताजे फूलों की पंखुड़ियों से प्राकृतिक रंगोली सजाएं; ३) तेज आवाज और धुएं वाले पटाखों से बचें ताकि वृद्धों, नवजात शिशुओं, श्वानों व पक्षियों को कष्ट न हो; ४) उपहारों के लिए प्लास्टिक के बजाय कपड़े के थैलों का उपयोग करें; ५) वंचित परिवारों, सफाई कर्मचारियों और सहायकों के साथ मिठाई, नए वस्त्र और खुशियां साझा करें।',
        answerHinglish:
          'Eco-friendly Diwali ke liye local clay diyas use karein, rice flour aur fresh flowers se organic rangoli banayein, noisy crackers se bachein taaki pets aur elders ko pareshani na ho, aur needy logon ke sath khushiyan aur sweets share karein.',
        category: 'decoration',
      },
      {
        id: 'diwali-faq-09',
        questionEn: 'When is Diwali celebrated according to the Hindu calendar and why do Gregorian dates change?',
        questionHi: 'हिंदू पंचांग के अनुसार दिवाली कब आती है और अंग्रेजी कैलेंडर में इसकी तारीख क्यों बदलती है?',
        questionHinglish: 'Hindu calendar ke hisab se Diwali kab aati hai aur English dates kyon change hoti hain?',
        answerEn:
          'In the traditional Hindu lunisolar calendar, Diwali is fixed precisely on Kartik Amavasya — the new moon day that concludes the dark fortnight (Krishna Paksha) of the month of Kartik (Aśvina Amavasya in the Amanta calendar system). Because the lunar year has roughly 354 days compared to the 365.25 days of the solar Gregorian calendar, the Gregorian date shifts by 10 to 12 days annually, typically falling between mid-October and mid-November.',
        answerHi:
          'हिंदू पंचांग के अनुसार दीपावली प्रत्येक वर्ष कार्तिक मास के कृष्ण पक्ष की अमावस्या तिथि को मनाई जाती है। चूंकि हिंदू पंचांग चंद्र-सौर (चंद्रमा की कलाओं और सौर चक्र) पर आधारित होता है और चंद्र वर्ष में लगभग ३५४ दिन होते हैं (सौर वर्ष से ११ दिन कम), इसीलिए अंग्रेजी (ग्रेगोरियन) कैलेंडर में दीपावली की तारीख प्रतिवर्ष बदलती है और आमतौर पर मध्य अक्टूबर से मध्य नवंबर के बीच पड़ती है।',
        answerHinglish:
          'Hindu lunisolar calendar ke according Diwali hamesha Kartik Amavasya ko aati hai. Lunar year 354 days ka hone ki wajah se English calendar me iski date har saal 10-12 din shift hoti hai (mid-October se mid-November ke beech).',
        category: 'timing',
      },
      {
        id: 'diwali-faq-10',
        questionEn: 'What is the spiritual meaning behind deep cleaning and decorating the house before Diwali?',
        questionHi: 'दिवाली से पूर्व घर की गहरी सफाई और सजावट का आध्यात्मिक व व्यावहारिक महत्व क्या है?',
        questionHinglish: 'Diwali se pehle ghar ki deep cleaning aur decoration ka kya mahatva hai?',
        answerEn:
          'Deep cleaning prior to Diwali is both an external hygiene practice and an internal spiritual metaphor. Spiritually, Goddess Lakshmi resides in sanctified spaces that embody purity (Saucha), harmony, and order; clearing physical junk dispels stagnant negative energy (Tamas). Practically, it marks the post-monsoon sanitation ritual where dampness, insects, and clutter accumulated during rains are eradicated. Adorning the home with marigold torans, mango leaves, and fragrant dhoop invites cosmic positivity, elevating family morale for the new year.',
        answerHi:
          'दीपावली से पूर्व घर की गहन सफाई केवल बाहरी स्वच्छता नहीं, बल्कि अंतःकरण की शुद्धि (शौच) का आध्यात्मिक अनुष्ठान है। शास्त्रों के अनुसार माता लक्ष्मी उसी स्थान पर वास करती हैं जहां स्वच्छता, शांति और सुव्यवस्था हो। वर्षा ऋतु की समाप्ति के उपरांत सीलन, कीड़े-मकोड़े और नकारात्मक ऊर्जा को दूर करने के लिए यह आवश्यक है। मुख्य द्वार पर आम के पत्तों का तोरण और गेंदे के फूल बांधना सकारात्मक ऊर्जा और नवजीवन का स्वागत करता है।',
        answerHinglish:
          'Diwali se pehle safai karne se ghar se negative energy aur monsoon ke keede-makode khatam hote hain. Shastron ke anusaar Mata Lakshmi clean aur shant gharon me aati hain, aur toran-rangoli positivity attract karte hain.',
        category: 'decoration',
      },
    ],
    greetingsCategoryKey: 'traditional',
    relatedRangoliCategories: ['diwali', 'traditional', 'peacock'],
    relatedDecorationCategories: ['diwali-decor', 'lighting-diyas', 'entrance'],
  },

  holi: {
    id: 'holi',
    nameEn: 'Holi — Festival of Colors',
    nameHi: 'होली — रंगों व वसंत का उल्लास',
    regionalAliases: ['Holi', 'Holika Dahan', 'Chhoti Holi', 'Rangwali Holi', 'Dhulandi', 'Dol Jatra', 'Lathmar Holi'],
    tithiEn: 'Phalguna Purnima (March)',
    tithiHi: 'फाल्गुन पूर्णिमा (मार्च)',
    taglineEn: 'The exuberant carnival of vibrant herbal gulal, springtime renewal, and joyful unity.',
    taglineHi: 'वसंत के आगमन, प्राकृतिक रंगों, मधुर गुजिया और आपसी प्रेम का अल्हड़ व पावन उत्सव।',
    hinglishTagline: 'Rango, dosti aur khushiyon ka mast rangotsav.',
    accentColor: '#E91E63',
    secondaryColor: '#FF9800',
    bgGradient: 'from-[#3D0A24] via-[#5C1137] to-[#1F0413]',
    heroMotif: 'holi-colors',
    about: {
      summaryEn:
        'Holi is India’s world-renowned celebration of springtime arrival, boundless forgiveness, and playful camaraderie. Across two memorable days — Holika Dahan and Rangwali Holi — communities shed inhibitions, color each other with organic hues, and celebrate the awakening of nature.',
      summaryHi:
        'होली वसंत ऋतु के आगमन, प्रकृति के नवजीवन और प्रेम व सौहार्द का पावन महापर्व है। यह दो दिवसीय उत्सव होलिका दहन (छोटी होली) और धुलेंडी (रंगवाली होली) के रूप में संपूर्ण भारत में अपार उत्साह से मनाया जाता है।',
      culturalSignificanceEn:
        'Holika Dahan commemorates the divine preservation of Bhakta Prahlad and the destruction of the demoness Holika, proving that unshakeable devotion always triumphs. The playful colors of Dhulandi reflect the celestial divine romance of Radha and Krishna in the groves of Vrindavan.',
      culturalSignificanceHi:
        'होलिका दहन भक्त प्रह्लाद की अटूट भक्ति और अहंकार के नाश का संदेश देता है। वहीं रंगों का खेल ब्रज में श्री राधा-कृष्ण के दिव्य प्रेम और प्रकृति के इंद्रधनुषी रंगों का उत्सव है।',
      historyEn:
        'Ancient Sanskrit literature including the Ratnavali of Harsha describes Holi as the "Vasantotsava", where townspeople sprayed saffron water and powdered sandalwood through brass syringes in mutual joy.',
      historyHi:
        'प्राचीन ग्रंथों में इसे "वसंतोत्सव" और "मदनोत्सव" कहा गया है, जहां टेसू के फूलों के प्राकृतिक रंग और चंदन से सारा समाज एक रंग में रंग जाता था।',
      keyThemes: [
        { en: 'Spring Renewal', hi: 'वसंत नवजीवन', icon: '🌸' },
        { en: 'Triumph of Devotion', hi: 'सत्य की विजय', icon: '🔥' },
        { en: 'Warm Camaraderie', hi: 'आपसी भाईचारा', icon: '🤝' },
        { en: 'Organic Colors', hi: 'प्राकृतिक रंग', icon: '🎨' },
      ],
    },
    traditions: [
      {
        id: 'holika-dahan',
        titleEn: 'Sacred Holika Dahan Vigil',
        titleHi: 'होलिका दहन व अग्नि प्रदक्षिणा',
        descEn:
          'On Purnima eve, large community bonfires made with dried logs, cow-dung cakes, and mustard stalks are lit with Vedic chants.',
        descHi:
          'फाल्गुन पूर्णिमा की संध्या पर होलिका की पावन अग्नि प्रज्वलित कर उसकी परिक्रमा की जाती है और नई फसल (गेहूं व चने की बालियां) अर्पित की जाती है।',
        customs: [
          { en: 'Offering fresh green wheat and gram stalks to the sacred fire', hi: 'अग्नि में जौ और गेहूं की नई बालियां भूनकर प्रसाद रूप में ग्रहण करना' },
          { en: 'Praying for the eradication of internal doubts and negative tendencies', hi: 'घर और मन की नकारात्मकता को भस्म कर सुख-समृद्धि की प्रार्थना करना' },
        ],
        regionalVariations: {
          en: 'In Braj (Mathura, Vrindavan, Barsana), Lathmar Holi is celebrated where women playfully tap men with bamboo sticks amidst festive songs.',
          hi: 'बरसाना और नंदगांव में प्रसिद्ध "लठमार होली" खेली जाती है, जो ब्रज की अनुपम परंपरा का जीवंत रूप है।',
        },
        icon: '🔥',
      },
      {
        id: 'gulal-celebration',
        titleEn: 'Rangwali Dhulandi & Herbal Gulal',
        titleHi: 'धुलेंडी — अबीर-गुलाल व रंगोत्सव',
        descEn:
          'The morning of Dhulandi is filled with music, rhythmic dholak beats, and friendly splashing of colored water and gentle herbal powder.',
        descHi:
          'प्रातःकाल से ही ढोलक की थाप, फाग के गीतों और प्राकृतिक हर्बल गुलाल से एक-दूसरे का मुख सजाने का आनंदमय उल्लास।',
        customs: [
          { en: 'Applying soft crimson and yellow gulal to the feet of elders', hi: 'बड़ों के चरणों में श्रद्धापूर्वक गुलाल अर्पित कर चरण स्पर्श करना' },
          { en: 'Embracing friends and former rivals in forgiveness and reconciliation', hi: 'पुरानी कड़वाहट भुलाकर "होली है!" के जयघोष के साथ गले मिलना' },
        ],
        icon: '🎨',
      },
      {
        id: 'holi-milan',
        titleEn: 'Holi Milan & Thandai Soiree',
        titleHi: 'होली मिलन एवं ठंडाई का आनंद',
        descEn:
          'After afternoon baths, families dress in crisp cotton kurtas and gather for poetry, folk songs, and sharing cooled saffron milk.',
        descHi:
          'दोपहर में स्नान के बाद स्वच्छ श्वेत या हल्के वस्त्र पहनकर होली मिलन समारोह में भाग लेना और सुगंधित ठंडाई का स्वाद लेना।',
        customs: [
          { en: 'Serving cold Thandai topped with crushed rose petals and pistachios', hi: 'गुलाब जल, सौंफ और बादाम युक्त शीतल ठंडाई का सत्कार करना' },
          { en: 'Reciting humorous Chhand and celebratory festive couplets', hi: 'हास्य कविताएं और पारंपरिक फाग व रसिया गाना' },
        ],
        icon: '🥛',
      },
    ],
    decorations: [
      {
        id: 'floral-rangoli-holi',
        titleEn: 'Multi-Color Dry Powder & Petal Rangoli',
        titleHi: 'रंग-बिरंगे सूखे रंगों और फूलों की चौखट रंगोली',
        descEn:
          'Design radiant circular mandalas at your doorway using vibrant organic pink, saffron, green, and turquoise powders bordered with marigold.',
        descHi:
          'द्वार पर गुलाबी, केसरी और हरे प्राकृतिक रंगों से गोल चक्राकार रंगोली बनाएं और किनारों पर गेंदे के फूल सजाएं।',
        tipEn: 'Use stencils for crisp circular geometric outlines before filling in solid bright hues.',
        tipHi: 'रंग भरने से पहले चॉक या कटआउट से हल्की रूपरेखा बनाएं ताकि डिजाइन बिल्कुल साफ दिखे।',
        tagEn: 'Entrance',
        tagHi: 'मुख्य द्वार',
      },
      {
        id: 'colorful-drapes',
        titleEn: 'Vibrant Bandhani & Leheriya Balcony Drapes',
        titleHi: 'लहरिया और बंधेज के रंगीन पर्दों से बालकनी सज्जा',
        descEn:
          'Tie colorful Rajasthani dupattas or airy cotton fabrics along the balcony railing to billow playfully in the spring breeze.',
        descHi:
          'बालकनी की ग्रिल पर हल्के पीले, गुलाबी और नारंगी लहरिया दुपट्टे सजाएं जो वसंत की बयार में लहराते हुए मनमोहक लगें।',
        tipEn: 'Mix yellow and fuchsia pink fabrics to capture the authentic spirit of spring.',
        tipHi: 'पीले और रानी गुलाबी रंगों का संयोजन करें, यह वसंत ऋतु का प्राकृतिक प्रतीक है।',
        tagEn: 'Balcony',
        tagHi: 'बालकनी',
      },
      {
        id: 'urli-gulal',
        titleEn: 'Brass Urli with Floating Scented Marigolds',
        titleHi: 'पीतल के पात्र में गेंदे के फूल और गुलाल की थालियां',
        descEn:
          'Set up a welcome console table with brass bowls holding organic organic gulal in pink, turmeric yellow, and leaf green alongside fresh blossoms.',
        descHi:
          'प्रवेश द्वार की मेज पर पीतल के बर्तनों में खुशबूदार हर्बल गुलाल की कटोरियां और ताजे फूलों की थाली सजाएं।',
        tipEn: 'Keep moist hand towels nearby for guests to easily freshen up.',
        tipHi: 'अतिथियों के हाथ पोंछने के लिए पास में गीले सुगंधित नैपकिन रखें।',
        tagEn: 'Welcome Corner',
        tagHi: 'स्वागत कोना',
      },
    ],
    recipes: [
      {
        id: 'mawa-gujiya',
        nameEn: 'Crispy Khoya Mawa Gujiya',
        nameHi: 'पारंपरिक खस्ता मावा गुजिया',
        typeEn: 'Signature Holi Sweet',
        typeHi: 'होली का प्रमुख मिष्ठान',
        timeEn: '45 Mins Prep • 20 Mins Fry',
        timeHi: '४५ मिनट तैयारी • २० मिनट तलना',
        descEn:
          'Golden, flaky crescent pastries filled with caramelized khoya, grated coconut, fragrant cardamom, and toasted nuts, lightly dipped in sugar syrup.',
        descHi:
          'मैदे की खस्ता सुनहरी परत में भुना हुआ मीठा मावा, सूखा नारियल, इलायची और मेवे की भरावन से तैयार सर्वप्रिय होली व्यंजन।',
        ingredients: [
          { en: '2 cups All-purpose flour + 4 tbsp Ghee (for dough)', hi: '२ कप मैदा + ४ चम्मच मोयन के लिए शुद्ध घी' },
          { en: '1.5 cups Fresh Mawa/Khoya (lightly roasted)', hi: 'डेढ़ कप ताजा मावा (हल्का भुना हुआ)' },
          { en: '1/2 cup Grated Dry Coconut & chopped Pistachios', hi: 'आधा कप कसा नारियल व बारीक कटे मेवे' },
          { en: '3/4 cup Powdered Sugar & Cardamom', hi: 'पौन कप पिसी चीनी और इलायची पाउडर' },
        ],
        steps: [
          { en: 'Knead flour with ghee and water into a smooth, firm dough; let rest 20 mins.', hi: 'मैदा में घी का मोयन देकर कड़ा आटा गूंथें और २० मिनट ढककर रखें।' },
          { en: 'Roast mawa until fragrant and golden; let cool and fold in coconut, nuts, and sugar.', hi: 'मावा को धीमी आंच पर भूनें, ठंडा होने पर मेवे, नारियल और चीनी मिलाएं।' },
          { en: 'Roll small round puris, place filling inside, seal edges with water or a mold.', hi: 'छोटी पूरियां बेलें, मिश्रण भरकर किनारों पर पानी लगाकर मोड़ें या सांचे से बनाएं।' },
          { en: 'Deep fry on low-medium flame until uniformly golden brown and crisp.', hi: 'धीमी-मध्यम आंच पर सुनहरा व खस्ता होने तक तल लें।' },
        ],
      },
      {
        id: 'kesar-thandai',
        nameEn: 'Nutty Spiced Kesar Thandai',
        nameHi: 'शाही केसर बादाम ठंडाई',
        typeEn: 'Cooling Festive Beverage',
        typeHi: 'शीतल पारंपरिक पेय',
        timeEn: '20 Mins Prep + Soaking',
        timeHi: '२० मिनट तैयारी',
        descEn:
          'An invigorating spring tonic made from soaked almonds, fennel seeds, watermelon seeds, black pepper, and saffron brewed with chilled milk.',
        descHi:
          'भीगे बादाम, सौंफ, मगज के बीज, काली मिर्च और केसर की तासीर से तैयार ठंडक प्रदान करने वाला शाही पेय।',
        ingredients: [
          { en: '1 Liter Chilled Whole Milk', hi: '१ लीटर ठंडा दूध' },
          { en: '1/4 cup Almonds & Cashews (soaked)', hi: 'एक चौथाई कप भीगे बादाम व काजू' },
          { en: '2 tbsp Fennel Seeds (Saunf) & Poppy Seeds (Khus-khus)', hi: '२ चम्मच सौंफ और खसखस' },
          { en: '1/2 tsp Black Peppercorns & Green Cardamom', hi: 'आधा छोटा चम्मच काली मिर्च व हरी इलायची' },
          { en: '10 strands Saffron & 4 tbsp Sugar', hi: '१० रेशे केसर और स्वादानुसार चीनी' },
        ],
        steps: [
          { en: 'Grind soaked nuts, fennel, poppy seeds, and spices into an ultra-smooth paste.', hi: 'भीगे मेवे और मसालों को थोड़े दूध के साथ एकदम महीन पीस लें।' },
          { en: 'Mix paste thoroughly into chilled milk and sweeten to taste.', hi: 'इस पेस्ट को ठंडे दूध और चीनी में अच्छी तरह घोलें।' },
          { en: 'Strain through fine muslin or serve rustic with rose petal garnishes.', hi: 'छानकर कुल्हड़ या कांच के गिलासों में बर्फ और गुलाब की पंखुड़ियों संग परोसें।' },
        ],
      },
    ],
    gifts: [
      {
        id: 'organic-gulal-giftbox',
        titleEn: 'Luxury Organic Herbal Gulal & Scented Mist Box',
        titleHi: 'प्राकृतिक हर्बल गुलाल एवं गुलाब जल उपहार सेट',
        recipientTypeEn: 'For Friends & Family',
        recipientTypeHi: 'मित्रों और परिवार के लिए',
        descEn: 'Chemical-free skin-friendly powders derived from beetroot, turmeric, and indigo paired with pure Kannauj gulab jal.',
        descHi: 'चुकंदर, हल्दी और गेंदे के फूलों से बने त्वचा-सुरक्षित प्राकृतिक रंग और इत्रयुक्त गुलाब जल।',
        budgetRange: '₹500–₹1,000',
      },
      {
        id: 'mithai-gujiya-hamper',
        titleEn: 'Fresh Baked Mawa Gujiya & Thandai Syrup Hamper',
        titleHi: 'ताजा मावा गुजिया एवं ठंडाई सिरप मिष्ठान टोकरी',
        recipientTypeEn: 'For Relatives & Neighbours',
        recipientTypeHi: 'रिश्तेदारों और पड़ोसियों के लिए',
        descEn: 'Artisanal sweet hamper packed in a festive jute basket with organic floral decorations.',
        descHi: 'शुद्ध घी की खस्ता गुजिया और गाढ़ी केसरिया ठंडाई का मनमोहक उपहार पैक।',
        budgetRange: '₹1,000–₹2,500',
      },
      {
        id: 'white-chikankari-kurta',
        titleEn: 'Lucknowi White Cotton Chikankari Kurta',
        titleHi: 'लखनऊवी श्वेत सूती चिकनकारी कुर्ता',
        recipientTypeEn: 'For Sibling or Partner',
        recipientTypeHi: 'जीवनसाथी या भाई-बहन के लिए',
        descEn: 'Breathable hand-embroidered white cotton kurta, the quintessential attire for vibrant Holi celebrations.',
        descHi: 'होली के उल्लास के लिए पारंपरिक और आरामदायक हाथ की कढ़ाई वाला सफेद सूती कुर्ता।',
        budgetRange: '₹1,000–₹2,500',
      },
    ],
    faqs: [
      {
        id: 'holi-faq-01',
        questionEn: 'Why is Holika Dahan celebrated and what is its spiritual significance?',
        questionHi: 'होलिका दहन क्यों मनाया जाता है और इसका आध्यात्मिक महत्व क्या है?',
        questionHinglish: 'Holika Dahan kyu manaya jata hai aur iska mahatva kya hai?',
        answerEn: 'Holika Dahan honors the triumph of true devotion (Bhakt Prahlad) over ego and tyranny (King Hiranyakashipu and his sister Holika). It symbolizes the bonfire of negativity, jealousy, and past animosities before welcoming fresh beginnings.',
        answerHi: 'होलिका दहन भक्त प्रह्लाद की अटूट नारायण भक्ति और आसुरी शक्तियों (हिरण्यकश्यप व होलिका) के दंभ के विनाश का प्रतीक है। यह अग्नि में सभी राग-द्वेष और नकारात्मकता को भस्म कर शुद्ध मन से वसंत के स्वागत का संदेश देता है।',
        answerHinglish: 'Holika Dahan Bhakt Prahlad ki sacchi bhakti aur burai par achhai ki jeet ki yaad me manaya jata hai. Holika ki aag me negativity, ego aur puraane gile-shikve jala kar agle din pyaar ke rangon se Holi kheli jaati hai.',
        category: 'rituals',
      },
      {
        id: 'holi-faq-02',
        questionEn: 'How to make 100% natural and skin-friendly herbal gulal at home?',
        questionHi: 'घर पर १००% प्राकृतिक और त्वचा के लिए सुरक्षित हर्बल गुलाल कैसे बनाएं?',
        questionHinglish: 'Ghar par 100% organic aur safe herbal gulal kaise banayein?',
        answerEn: 'Use arrowroot or cornstarch as a silky base. Blend with dried turmeric (yellow), beetroot powder or dried hibiscus flowers (ruby red), dried spinach/neem leaves (green), and blue pea flowers (azure). Add a few drops of pure rosewater for fragrance.',
        answerHi: 'आरारोट या मक्के के आटे में हल्दी मिलाकर पीला, चुकंदर के रस या सूखे गुड़हल के फूलों से लाल, नीम या पालक के चूर्ण से हरा, और अपराजिता के फूलों से नीला रंग बनाएं। इसमें शुद्ध गुलाब जल की बूंदें मिलाकर सुगंधित और सुरक्षित गुलाल तैयार करें।',
        answerHinglish: 'Cornstarch ya arrowroot powder me haldi mix karke yellow gulal banayein, beetroot powder se pink/red, aur dried palak ya neem powder se green gulal banayein. Thoda rose water mila dein natural khushboo ke liye.',
        category: 'decoration',
      },
      {
        id: 'holi-faq-03',
        questionEn: 'What traditional foods and sweets are prepared during Holi?',
        questionHi: 'होली पर कौन से पारंपरिक पकवान और मिठाइयां बनाई जाती हैं?',
        questionHinglish: 'Holi par kaunse traditional pakwan aur mithai banayi jaati hain?',
        answerEn: 'Iconic Holi delicacies include crisp Mawa and Coconut Gujiyas, chilled saffron-almond Thandai infused with fennel and black pepper, crunchy savory Mathris, Dahi Bhalle, and Puran Poli.',
        answerHi: 'होली के प्रमुख व्यंजनों में खोया और मेवे से भरी खस्ता गुजिया, सौंफ-काली मिर्च-केसर युक्त ठंडाई, कुरकुरी मठरी, दही भल्ले, नमकीन पारे और मालपुआ शामिल हैं जो मेहमानों और परिजनों को बड़े प्रेम से परोसे जाते हैं।',
        answerHinglish: 'Holi par khas taur par Mawa aur Dry Fruit Gujiya, badam-kesar wali Thandai, Dahi Vada, namkeen Mathri aur Puran Poli banayi jaati hai jo sabhi ko behad pasand aati hai.',
        category: 'food',
      },
      {
        id: 'holi-faq-04',
        questionEn: 'How to protect your skin, hair, and eyes while playing Holi?',
        questionHi: 'होली खेलते समय त्वचा, बालों और आंखों को रंगों से कैसे बचाएं?',
        questionHinglish: 'Holi khelte waqt skin, baalo aur aankhon ko safe kaise rakhein?',
        answerEn: 'Apply a generous layer of coconut or almond oil to your scalp and skin 30 minutes before playing. Wear sunglasses to protect eyes from color powders, choose full-sleeved cotton clothing, and keep yourself well hydrated throughout the day.',
        answerHi: 'रंग खेलने से आधा घंटा पहले पूरे शरीर और बालों पर शुद्ध नारियल या बादाम का तेल लगाएं ताकि रंग आसानी से छूट जाए। आंखों की सुरक्षा के लिए सनग्लासेस पहनें, पूरी आस्तीन के सूती कपड़े पहनें और पर्याप्त पानी पीते रहें।',
        answerHinglish: 'Holi khelne se 30 minute pehle pure body aur baalo par coconut oil laga lein. Eyes protect karne ke liye sunglasses pehnein, full sleeves cotton kapde pehnein aur hamesha herbal gulal hi prefer karein.',
        category: 'timing',
      },
    ],
    greetingsCategoryKey: 'friends',
    relatedRangoliCategories: ['floral', 'modern', 'simple'],
    relatedDecorationCategories: ['home-decor', 'flower-decor'],
  },

  'raksha-bandhan': {
    id: 'raksha-bandhan',
    nameEn: 'Raksha Bandhan — Sacred Bond of Sibling Love',
    nameHi: 'रक्षाबंधन — भाई-बहन के अटूट स्नेह का पर्व',
    regionalAliases: ['Raksha Bandhan', 'Rakhi', 'Rakhee', 'Saluno', 'Raksha Poornima', 'Bhai Behen Tyohar'],
    tithiEn: 'Shravana Purnima (August)',
    tithiHi: 'श्रावण पूर्णिमा (अगस्त)',
    taglineEn: 'The tender sacred thread embodying lifelong protection, selfless care, and enduring vows.',
    taglineHi: 'कलाई पर बंधा स्नेह का रेशमी धागा, बहन की मंगलकामना और भाई के अटूट संरक्षण का पावन बंधन।',
    hinglishTagline: 'Bhai-behen ke atoot pyaar aur suraksha ke vachan ka pavitra bandhan.',
    accentColor: '#D81B60',
    secondaryColor: '#FFB300',
    bgGradient: 'from-[#380E2B] via-[#591745] to-[#1E0517]',
    heroMotif: 'rakhi-thread',
    about: {
      summaryEn:
        'Raksha Bandhan, celebrated on the full moon day of the holy Shravana month, celebrates the sacred, unconditional love between brothers and sisters. Sisters tie an ornate thread (the Rakhi) around their brothers’ wrists as an amulet of protection, while brothers reaffirm their lifelong pledge of care and support.',
      summaryHi:
        'रक्षाबंधन श्रावण मास की पूर्णिमा को मनाया जाने वाला भारतीय संस्कृति का अत्यंत भावुक और आत्मीय पर्व है। बहनें अपने भाई की कलाई पर रक्षा-सूत्र बांधकर उनकी दीर्घायु की कामना करती हैं, और भाई उनकी सुरक्षा व सम्मान का आजीवन वचन देते हैं।',
      culturalSignificanceEn:
        'Transcending biological bonds, Rakhi embodies universal brotherhood, mutual duty, and tender familial commitment. Mythologically, it echoes Draupadi tying a strip of her sari around Bhagwan Krishna’s wounded finger, which Krishna returned infinitely during the cheer-haran.',
      culturalSignificanceHi:
        'महाभारत की कथा के अनुसार द्रौपदी ने भगवान श्रीकृष्ण की अंगुली कटने पर अपनी साड़ी का पल्लू बांधा था, जिसके बदले प्रभु ने चीरहरण के समय अनंत वस्त्र प्रदान कर उनकी रक्षा की थी। यह पर्व उसी विश्वास का प्रतीक है।',
      historyEn:
        'Historical records recount Rani Karnavati of Mewar sending a sacred Rakhi to Mughal Emperor Humayun, who honoured the bond of protection by rushing his troops to defend Chittor.',
      historyHi:
        'इतिहास में रानी कर्णावती द्वारा हुमायूं को राखी भेजकर रक्षा की गुहार लगाने और हुमायूं द्वारा इस संबंध की मर्यादा निभाने का प्रेरक प्रसंग दर्ज है।',
      keyThemes: [
        { en: 'Sacred Vows', hi: 'पावन संकल्प', icon: '💍' },
        { en: 'Affectionate Bond', hi: 'अटूट स्नेह', icon: '💖' },
        { en: 'Elder Blessings', hi: 'आशीर्वाद', icon: '🙏' },
        { en: 'Family Nostalgia', hi: 'बचपन की यादें', icon: '🏡' },
      ],
    },
    traditions: [
      {
        id: 'rakhi-tying-ceremony',
        titleEn: 'Sacred Tilak & Rakhi Tying Ritual',
        titleHi: 'शुभ तिलक एवं रक्षा-सूत्र बंधन',
        descEn:
          'Sisters prepare a brass puja thali with roli, akshat (unbroken rice), an earthen lamp, fragrant sweets, and the sacred Rakhi.',
        descHi:
          'थाल में रोली, अक्षत, दीपक और मिष्ठान सजाकर बहन भाई के मस्तक पर तिलक लगाती है, अक्षत छिड़कती है और कलाई पर राखी बांधती है।',
        customs: [
          { en: 'Chanting the ancient Raksha Mantra: "Yena Baddho Bali Raja..."', hi: '"येन बद्धो बली राजा दानवेन्द्रो महाबलः..." रक्षा मंत्र का उच्चारण' },
          { en: 'Performing gentle aarti to ward off evil energies', hi: 'भाई की मंगल आरती उतारकर ईश्वर से संकटमुक्ति की प्रार्थना करना' },
          { en: 'Feeding traditional ghewar, peda, or ladoo with love', hi: 'भाई का मुंह मीठा कराकर आत्मीय शुभकामनाएं देना' },
        ],
        regionalVariations: {
          en: 'In Maharashtra and coastal India, Narali Purnima is celebrated simultaneously by offering golden coconuts to Varuna, the sea god.',
          hi: 'महाराष्ट्र के तटीय क्षेत्रों में इसे "नारली पूर्णिमा" के रूप में मनाते हैं और समुद्र देवता को नारियल अर्पित किया जाता है।',
        },
        icon: '🪔',
      },
      {
        id: 'rakhi-gifting',
        titleEn: 'Brotherly Vow & Reciprocal Gift',
        titleHi: 'भाई का उपहार एवं रक्षा संकल्प',
        descEn:
          'In return for the sacred thread, the brother touches his sister’s feet if elder or hugs her, offering a thoughtful gift or shagun envelope with a pledge of unwavering presence.',
        descHi:
          'राखी बंधवाने के उपरांत भाई बहन को सप्रेम शगुन व उपहार भेंट करता है और जीवन भर हर सुख-दुख में साथ निभाने का वचन देता है।',
        customs: [
          { en: 'Touching elder sister’s feet for lifelong blessings', hi: 'बड़ी बहन के चरण स्पर्श कर स्नेह व आशीर्वाद प्राप्त करना' },
          { en: 'Gifting handmade memories, jewelry, or useful keepsakes', hi: 'बहन की रुचि के अनुकूल उपहार या यादगार स्मृति भेंट करना' },
        ],
        icon: '🎁',
      },
      {
        id: 'childhood-reminiscence',
        titleEn: 'Sibling Reminiscence & Feast',
        titleHi: 'बचपन की स्मृतियां एवं सामूहिक भोज',
        descEn:
          'Reconnecting across distances, sharing old family photographs, reminiscing about shared school days, and enjoying a rich festive lunch together.',
        descHi:
          'पुरानी पारिवारिक तस्वीरों को देखना, बचपन की खट्टी-मीठी नोकझोंक याद करना और पूरे परिवार का एक साथ बैठकर स्वादिष्ट भोजन करना।',
        customs: [
          { en: 'Video calling distant siblings residing in different cities or abroad', hi: 'दूर रहने वाले भाई-बहनों से वीडियो कॉल पर आशीर्वाद व शुभकामनाएं साझा करना' },
        ],
        icon: '📸',
      },
    ],
    decorations: [
      {
        id: 'rakhi-thali-decor',
        titleEn: 'Velvet & Lace Pooja Thali Embellishment',
        titleHi: 'मखमली गोटे और मोतियों से सजी पूजा थाली',
        descEn:
          'Line a round brass or silver plate with crimson velvet, ornate gota-patti border, and small metal containers for Roli and Akshat.',
        descHi:
          'पीतल या चांदी की थाली में लाल मखमल का कपड़ा बिछाएं, गोटे की किनारी लगाएं और रोली-अक्षत की छोटी कटोरियां सजाएं।',
        tipEn: 'Stick small double-sided foam tape under the diya and sweet bowl so nothing slips during the aarti.',
        tipHi: 'दीपक और कटोरी के नीचे छोटा सा टेप लगाएं ताकि आरती के समय थाली से कोई सामान न फिसले।',
        tagEn: 'Puja Corner',
        tagHi: 'पूजा स्थल',
      },
      {
        id: 'floral-photo-wall',
        titleEn: 'Memory String Photo Wall with Fairy Lights',
        titleHi: 'बचपन की तस्वीरों और फेयरी लाइट्स की यादों की दीवार',
        descEn:
          'Hang a string of warm fairy lights across your living room wall and clip childhood photographs of brother and sister using tiny wooden pegs.',
        descHi:
          'लिविंग रूम में गोल्डन फेयरी लाइट्स लगाएं और उस पर छोटी लकड़ी की क्लिप्स से भाई-बहन की बचपन की पुरानी तस्वीरें टांगें।',
        tipEn: 'Mix baby pictures with recent graduation or wedding photos for an emotional retrospective.',
        tipHi: 'बचपन से लेकर आज तक की तस्वीरों का क्रम बनाएं, यह पुरानी यादों को ताजा कर देगा।',
        tagEn: 'Living Room',
        tagHi: 'लिविंग रूम',
      },
    ],
    recipes: [
      {
        id: 'malai-ghewar',
        nameEn: 'Traditional Rajasthani Malai Ghewar',
        nameHi: 'शाही राजस्थानी मलाई घेवर',
        typeEn: 'Shravan Signature Delicacy',
        typeHi: 'सावन का पारंपरिक मिष्ठान',
        timeEn: '1 Hr Prep & Fry',
        timeHi: '१ घंटा तैयारी व पाक',
        descEn:
          'A delicate, honeycomb-textured disc of fried flour batter sweetened with saffron sugar syrup and topped with decadent thickened rabdi and pistachios.',
        descHi:
          'श्रावण मास की पहचान — जालीदार कुरकुरा घेवर, केसर की चाशनी और गाढ़ी मलाईदार रबड़ी से सजा राजस्थानी मिष्ठान।',
        ingredients: [
          { en: '1.5 cups Maida (All-purpose flour)', hi: 'डेढ़ कप मैदा' },
          { en: '4 tbsp Desi Ghee (whipped with ice cubes until creamy white)', hi: '४ चम्मच शुद्ध देसी घी (बर्फ से फेंटा हुआ)' },
          { en: 'Cold milk & chilled water to form a flowing batter', hi: 'ठंडा दूध और बर्फीला पानी' },
          { en: 'Sugar syrup flavored with green cardamom & saffron', hi: 'इलायची व केसर युक्त एक तार की चाशनी' },
          { en: 'Thick creamy Rabdi for top spread', hi: 'ऊपर सजाने के लिए मलाईदार गाढ़ी रबड़ी' },
        ],
        steps: [
          { en: 'Whip solidified ghee with ice cubes until it becomes fluffy and white like butter.', hi: 'घी में बर्फ के टुकड़े डालकर तब तक फेंटें जब तक वह मक्खन जैसा सफेद व हल्का न हो जाए।' },
          { en: 'Gradually add flour, milk, and icy water to create a very smooth, thin flowing batter.', hi: 'थोड़ा-थोड़ा मैदा, ठंडा दूध और पानी मिलाकर पतला, गांठ-रहित घोल बनाएं।' },
          { en: 'Pour thin stream into smoking hot ghee in a deep vessel; it will foam and form fine honeycomb webs.', hi: 'तेज गरम घी में बीचो-बीच पतली धार से घोल डालें जिससे जालीदार घेवर बन सके।' },
          { en: 'Fry until golden, drain excess ghee, dip in warm syrup, and spread with rich saffron rabdi.', hi: 'सुनहरा होने पर निकालें, चाशनी में डुबोएं और ऊपर से रबड़ी व पिस्ता लगाएं।' },
        ],
      },
    ],
    gifts: [
      {
        id: 'personalized-watch-box',
        titleEn: 'Engraved Leather Watch & Cufflink Case',
        titleHi: 'अनुकूलित लेदर घड़ी व कफ़लिंक केस',
        recipientTypeEn: 'For Brother',
        recipientTypeHi: 'भाई के लिए',
        descEn: 'A sophisticated keepsake organizer with a custom engraved brass plate carrying a personal message.',
        descHi: 'एक सुरुचिपूर्ण घड़ी बॉक्स जिस पर भाई के नाम का सुंदर मोनोग्राम या शुभकामना संदेश अंकित हो।',
        budgetRange: '₹1,000–₹2,500',
      },
      {
        id: 'silver-filigree-pendant',
        titleEn: 'Pure Silver Filigree Pendant or Bracelet',
        titleHi: 'शुद्ध चांदी का कटक तारकशी पेंडेंट या ब्रेसलेट',
        recipientTypeEn: 'For Sister',
        recipientTypeHi: 'बहन के लिए',
        descEn: 'Artisanal filigree silver jewelry handcrafted with exquisite floral motifs from Odisha.',
        descHi: 'ओडिशा की प्रसिद्ध बारीक तारकशी कला से निर्मित शुद्ध चांदी का नाजुक और सदाबहार आभूषण।',
        budgetRange: '₹1,000–₹2,500',
      },
      {
        id: 'custom-photo-album',
        titleEn: 'Handmade Linen Bound "Memories of Us" Photobook',
        titleHi: 'हस्तनिर्मित लिनेन फोटो एल्बम "बचपन की यादें"',
        recipientTypeEn: 'For Sibling Sibling',
        recipientTypeHi: 'भाई-बहन दोनों के लिए',
        descEn: 'A curated 30-page album collecting candid sibling photos from toddlers to adults.',
        descHi: 'बचपन से लेकर आज तक की सबसे यादगार और प्यारी तस्वीरों का एक सुंदर एल्बम।',
        budgetRange: '₹500–₹1,000',
      },
    ],
    faqs: [
      {
        id: 'rakhi-faq-01',
        questionEn: 'What is the proper ritual and items needed for the Rakhi puja thali?',
        questionHi: 'रक्षाबंधन पर राखी पूजा थाली में कौन सी सामग्री रखनी चाहिए और सही विधि क्या है?',
        questionHinglish: 'Rakhi ki puja thali me kya kya hona chahiye aur aarti ki vidhi kya hai?',
        answerEn: 'A traditional Rakhi thali contains: auspicious Rakhi thread, Roli (kumkum) and Akshat (unbroken rice) for the tilak, a lighted ghee diya, pure sweets (like Kaju Katli or Ghewar), and fresh flower petals. Sister applies tilak, waves the aarti, ties the Rakhi on the right wrist, feeds sweet, and brother gives a gift of protection.',
        answerHi: 'राखी की पावन थाली में रोली, अक्षत, कलावा/राखी, शुद्ध घी का दीपक, ताजे पुष्प और स्वादिष्ट मिठाई (जैसे घेवर या काजू कतली) रखें। बहन भाई के माथे पर तिलक लगाकर अक्षत लगाती है, दाहिनी कलाई पर रक्षासूत्र बांधती है, आरती उतारती है और मिठाई खिलाकर दीर्घायु की प्रार्थना करती है।',
        answerHinglish: 'Puja thali me roli, chawal (akshat), rakhi, ghee ka diya aur mithai rakhein. Behen bhai ke mathe par tilak lagati hai, right wrist par rakhi baandhti hai, aarti utarti hai aur sweet khilati hai. Bhai suraksha ka vachan aur gift deta hai.',
        category: 'rituals',
      },
      {
        id: 'rakhi-faq-02',
        questionEn: 'Why is Bhadra Kaal avoided while tying Rakhi and what is the best muhurat?',
        questionHi: 'राखी बांधते समय भद्रा काल का विचार क्यों किया जाता है और शुभ मुहूर्त क्या है?',
        questionHinglish: 'Rakhi baandhte waqt Bhadra kaal kyu avoid karte hain aur shubh muhurat kya hai?',
        answerEn: 'In Vedic astrology, Bhadra is considered an inauspicious planetary shadow period during which auspicious ceremonies like Raksha Bandhan are suspended. Rakhi should be tied during Aparahna (afternoon) or Pradosh (early evening) when Bhadra has passed.',
        answerHi: 'वैदिक ज्योतिष में भद्रा को अशुभ काल माना गया है जिसमें मांगलिक कार्य वर्जित होते हैं। मान्यतानुसार भद्रा समाप्त होने के बाद अपराह्न काल या प्रदोष काल में राखी बांधना सर्वाधिक कल्याणकारी और दीर्घायु प्रदायक होता है।',
        answerHinglish: 'Vedic astrology ke mutabiq Bhadra period me koi shubh karya nahi kiya jata. Bhadra khatam hone ke baad dopahar (Aparahna) ya shaam (Pradosh) ke shubh muhurat me rakhi baandhna sabse auspicious mana jata hai.',
        category: 'timing',
      },
      {
        id: 'rakhi-faq-03',
        questionEn: 'What are thoughtful, budget-friendly Rakhi gift ideas for sisters?',
        questionHi: 'बहनों के लिए रक्षाबंधन के सबसे यादगार और बजट-फ्रेंडली उपहार क्या हैं?',
        questionHinglish: 'Rakhi par behen ke liye best aur budget-friendly gift ideas kya hain?',
        answerEn: 'Handmade memory photo albums, silver filigree pendants, curated skincare boxes, books by her favorite author, artisanal handcrafted clutches, and custom personalized photo wishes from FestiveWala make cherished gifts.',
        answerHi: 'बचपन की यादों का हस्तनिर्मित फोटो एल्बम, चांदी का नाज़ुक लॉकेट, पसंदीदा पुस्तकों का सेट, हस्तशिल्प क्लच बैग और फेस्टिववाला का व्यक्तिगत फोटो शुभकामना कार्ड बहनों के लिए अत्यंत प्रिय और भावनात्मक उपहार हैं।',
        answerHinglish: 'Personalized photo album, silver pendant, branded skincare hamper, customized chocolates aur FestiveWala ka photo greeting card behen ke liye best and heartfelt gifts hain jo budget me bhi aate hain.',
        category: 'gifting',
      },
      {
        id: 'rakhi-faq-04',
        questionEn: 'What is the mythological and historical significance of Raksha Bandhan?',
        questionHi: 'रक्षाबंधन का ऐतिहासिक और पौराणिक महत्व क्या है?',
        questionHinglish: 'Raksha Bandhan ka aitihasik aur dharmik mahatva kya hai?',
        answerEn: 'Legends recall Draupadi tearing her saree pallu to bandage Lord Krishna’s bleeding finger during Rajasuya Yajna, prompting Krishna’s vow of eternal protection. Historically, Queen Karnavati of Mewar sent a sacred Rakhi to Emperor Humayun seeking protection for Chittor.',
        answerHi: 'पौराणिक मान्यतानुसार महाभारत में द्रोपदी ने भगवान श्रीकृष्ण की घायल अंगुली पर अपनी साड़ी का पल्लू बांधा था, जिसके बदले कृष्ण ने उनके चीरहरण के समय रक्षा की थी। ऐतिहासिक संदर्भ में रानी कर्णावती ने हुमायूं को राखी भेजकर सहायता मांगी थी।',
        answerHinglish: 'Mahabharata me Draupadi ne Shri Krishna ki ungli par saari ka palla baandha tha aur Krishna ne unki hamesha raksha ki. Rani Karnavati ne bhi Humayun ko rakhi bheji thi. Yeh tyohar vishwas aur hifazat ka prateek hai.',
        category: 'rituals',
      },
    ],
    greetingsCategoryKey: 'family',
    relatedRangoliCategories: ['floral', 'simple', 'geometric'],
    relatedDecorationCategories: ['living-room', 'diy-paper'],
  },

  christmas: {
    id: 'christmas',
    nameEn: 'Christmas — Season of Peace & Goodwill',
    nameHi: 'क्रिसमस — शांति, प्रेम व उल्लास का महापर्व',
    regionalAliases: ['Christmas', 'Xmas', 'Bada Din', 'Noel', 'Feast of the Nativity'],
    tithiEn: 'December 25',
    tithiHi: '२५ दिसम्बर',
    taglineEn: 'The warmth of glowing pine trees, midnight carols, heartfelt gifting, and universal goodwill.',
    taglineHi: 'शीत ऋतु की सुनहरी शाम, जगमगाता क्रिसमस ट्री, कैरल्स की मधुर ध्वनि और अपनों संग खुशियां बांटने का पर्व।',
    hinglishTagline: 'Pyaar, shanti aur dhero uphaaron ka anandmay tyohar.',
    accentColor: '#C41E3A',
    secondaryColor: '#1A5D1A',
    bgGradient: 'from-[#172D1E] via-[#24422E] to-[#0D1C12]',
    heroMotif: 'christmas-tree',
    about: {
      summaryEn:
        'Christmas celebrates the Nativity of Jesus Christ, bringing together families and communities across the world in songs of peace, warm hospitality, decorated pine trees, and generous charity to those in need.',
      summaryHi:
        'क्रिसमस प्रभु ईसा मसीह के जन्मोत्सव का पावन पर्व है। यह संपूर्ण विश्व में प्रेम, दया, परोपकार और शांति का संदेश देता है। घरों में सजे क्रिसमस ट्री, टिमटिमाती मोमबत्तियां और पारिवारिक भोज इस दिन को अविस्मरणीय बनाते हैं।',
      culturalSignificanceEn:
        'In India, Christmas is celebrated with unique regional splendour: glowing paper star lanterns (Kandil) illuminate verandas, mango and banana trees are decorated, and fragrant plum cakes and rose cookies are shared across all faiths.',
      culturalSignificanceHi:
        'भारत में क्रिसमस बहुसांस्कृतिक सौहार्द का सुंदर उदाहरण है। गोआ, केरल, मेघालय से लेकर दिल्ली-मुंबई तक, घरों के आगे पेपर स्टार लालटेन लटकाए जाते हैं और सभी धर्मों के लोग प्लम केक का आनंद लेते हैं।',
      historyEn:
        'Observed since the 4th century, the season reflects the historic Christian tradition of Advent, midnight mass hymns, and the charitable generosity inspired by Saint Nicholas.',
      historyHi:
        'चौथी शताब्दी से मनाया जा रहा यह पर्व संत निकोलस (सांता क्लॉज) के निःस्वार्थ दान और गरीबों की सहायता के मानवीय मूल्यों को समर्पित है।',
      keyThemes: [
        { en: 'Peace on Earth', hi: 'विश्व शांति', icon: '🕊️' },
        { en: 'Warm Generosity', hi: 'उदारता व परोपकार', icon: '🎁' },
        { en: 'Family Hearth', hi: 'पारिवारिक मिलन', icon: '🎄' },
        { en: 'Sacred Hymns', hi: 'मधुर कैरल्स', icon: '⭐' },
      ],
    },
    traditions: [
      {
        id: 'midnight-mass',
        titleEn: 'Midnight Service & Carol Singing',
        titleHi: 'मिडनाइट मास प्रार्थना व कैरल गायन',
        descEn:
          'Gathering at decorated cathedrals on Christmas Eve for harmonious choral hymns, church bell chimes, and prayers of peace.',
        descHi:
          'क्रिसमस की पूर्व संध्या पर गिरजाघरों में विशेष प्रार्थना सभा, मोमबत्तियों की रोशनी और "साइलेंट नाइट" जैसे पवित्र भजनों का गायन।',
        customs: [
          { en: 'Lighting tall white taper candles in prayer for global harmony', hi: 'सफेद मोमबत्तियां जलाकर विश्व शांति और सर्वकल्याण की प्रार्थना करना' },
          { en: 'Singing joyful local carols in Hindi, English, Konkani, and Malayalam', hi: 'स्थानीय भाषाओं और अंग्रेजी में मधुर कैरल्स गाना' },
        ],
        regionalVariations: {
          en: 'In Goa, people create life-sized nativity cribs (presepe) in their gardens, judged in village competitions.',
          hi: 'गोआ में हर घर के बाहर प्रभु यीशु के जन्म की जीवंत झांकी (क्रिब) बनाई जाती है।',
        },
        icon: '⭐',
      },
      {
        id: 'tree-decoration',
        titleEn: 'Decorating the Christmas Tree',
        titleHi: 'क्रिसमस ट्री का श्रृंगार',
        descEn:
          'Adorning evergreen trees with glittering baubles, warm fairy lights, cinnamon sticks, and the crowning Bethlehem star.',
        descHi:
          'देवदार या पाइन के वृक्ष को चमकीली घंटियों, रिबन, लाल-सुनहरे बॉल्स और शीर्ष पर चमकीले सितारे से सजाना।',
        customs: [
          { en: 'Placing wrapped presents under the tree branches for family opening on Christmas morning', hi: 'पेड़ के नीचे परिवार के सदस्यों के लिए सुंदर उपहार रखना' },
          { en: 'Hanging handmade gingerbread and cinnamon ornaments', hi: 'बच्चों के साथ मिलकर हस्तनिर्मित सजावटी सामान लटकाना' },
        ],
        icon: '🎄',
      },
      {
        id: 'sharing-kushwar',
        titleEn: 'Feast of Traditional Sweets & Plum Cake',
        titleHi: 'प्लम केक एवं पारंपरिक व्यंजनों का भोज',
        descEn:
          'Preparing traditional treats weeks in advance: rum-soaked fruit cakes, rose cookies (achappam), and kulkuls shared with all neighbors.',
        descHi:
          'हफ्तों पहले से मेवों को भिगोकर तैयार किया गया प्लम केक, रोज कुकीज और कलकल बनाकर सभी पड़ोसियों में बांटना।',
        customs: [
          { en: 'Hosting a community Christmas lunch with spiced roasts, biryani, and mulled grape juice', hi: 'पारिवारिक भोज में स्वादिष्ट पकवानों और गर्म मसालों के पेय का आनंद लेना' },
        ],
        icon: '🍰',
      },
    ],
    decorations: [
      {
        id: 'star-lantern',
        titleEn: 'Illuminated Paper Star Lantern on the Balcony',
        titleHi: 'बालकनी में जलता हुआ नक्काशीदार पेपर स्टार लालटेन',
        descEn:
          'Hang an ornate geometric cut-out paper star with a warm LED bulb inside from your main window or veranda ceiling.',
        descHi:
          'खिड़की या बालकनी की छत से रंगीन कागजी सितारा (स्टार लालटेन) लटकाएं, जिसके अंदर जलता पीला बल्ब रात में मनमोहक लगता है।',
        tipEn: 'Choose a star with intricate perforated cutouts so it casts magical geometric lace shadows across the ceiling.',
        tipHi: 'बारीक कटवर्क वाला सितारा चुनें, जिससे दीवारों पर सुंदर आकृतियों की परछाई बने।',
        tagEn: 'Balcony & Windows',
        tagHi: 'बालकनी व खिड़की',
      },
      {
        id: 'pinecone-wreath',
        titleEn: 'Natural Evergreen & Cinnamon Door Wreath',
        titleHi: 'चीड़ के फलों और दालचीनी से सजा प्राकृतिक पुष्पचक्र (Wreath)',
        descEn:
          'Weave fresh pine twigs, dried orange slices, cinnamon quills, and red satin ribbon into a circular welcoming door wreath.',
        descHi:
          'हरे पत्तों, सूखी दालचीनी, चीड़ के फलों और लाल रिबन से बना गोलाकार पुष्पांजलि तोरण मुख्य द्वार पर लगाएं।',
        tipEn: 'Spray lightly with water and pine oil every two days to preserve the woody fragrance.',
        tipHi: 'हर दो दिन में हल्का पानी छिड़कें जिससे यह ताजा दिखे और भीनी खुशबू बनी रहे।',
        tagEn: 'Entrance',
        tagHi: 'मुख्य द्वार',
      },
    ],
    recipes: [
      {
        id: 'rich-plum-cake',
        nameEn: 'Traditional Spiced Christmas Plum Cake',
        nameHi: 'पारंपरिक स्पाइस्ड क्रिसमस फ्रूट केक',
        typeEn: 'Heritage Holiday Bake',
        typeHi: 'पारंपरिक क्रिसमस केक',
        timeEn: '1 Hr Prep • 1.5 Hr Bake',
        timeHi: '१ घंटा तैयारी • डेढ़ घंटा बेक',
        descEn:
          'A dark, aromatic fruit cake dense with soaked black raisins, candied orange peel, glazed cherries, nutmeg, and caramelized sugar.',
        descHi:
          'काली किशमिश, संतरे के छिलके, खजूर, चेरी और जायफल-दालचीनी की खुशबू से महकता हुआ गाढ़ा और कोमल पारंपरिक क्रिसमस केक।',
        ingredients: [
          { en: '2 cups Dried Fruits (Raisins, Cranberries, Cherries, Dates)', hi: '२ कप सूखे मेवे (किशमिश, चेरी, खजूर)' },
          { en: '1.5 cups Flour + 1 cup Butter + 1 cup Dark Brown Sugar', hi: 'डेढ़ कप मैदा + १ कप मक्खन + १ कप ब्राउन शुगर' },
          { en: 'Spice mix: 1/2 tsp each Cinnamon, Nutmeg, Clove, Dry Ginger', hi: 'दालचीनी, जायफल, लौंग और सोंठ का मसाला' },
          { en: '1/2 cup Orange juice & Caramel syrup for dark hue', hi: 'संतरे का रस और कैरेमल सिरप' },
        ],
        steps: [
          { en: 'Soak finely chopped dried fruits in fresh orange juice for at least 24 hours.', hi: 'कटे हुए मेवों को संतरे के रस में कम से कम २४ घंटे पहले भिगोकर रखें।' },
          { en: 'Cream soft butter and brown sugar until light; beat in eggs or yogurt substitute.', hi: 'मक्खन और चीनी को अच्छी तरह फेंटें जब तक वह मलाईदार न हो जाए।' },
          { en: 'Gently fold in sifted flour, spice powders, and soaked fruit mixture.', hi: 'मैदा, पिसा मसाला और भीगे मेवे हल्के हाथों से मिलाएं।' },
          { en: 'Bake in a lined tin at 160°C for 75-90 minutes until skewer comes out clean.', hi: '१६०°C पर ७५ से ९० मिनट तक धीमी आंच पर बेक करें।' },
        ],
      },
    ],
    gifts: [
      {
        id: 'holiday-cookie-tin',
        titleEn: 'Gourmet Cinnamon Shortbread & Cookie Tin',
        titleHi: 'हस्तनिर्मित कुकीज और दालचीनी बिस्कुट का टिन',
        recipientTypeEn: 'For Friends & Neighbors',
        recipientTypeHi: 'मित्रों और पड़ोसियों के लिए',
        descEn: 'Artisanal butter shortbread, spiced gingerbread men, and chocolate-dipped walnuts in an embossed holiday tin.',
        descHi: 'सुंदर लाल विंटेज टिन में पैक किए गए ताजे होममेड कुकीज और जिंजरब्रेड।',
        budgetRange: '₹500–₹1,000',
      },
      {
        id: 'warm-pashmina-stole',
        titleEn: 'Warm Kashmiri Woollen Winter Shawl / Scarf',
        titleHi: 'कश्मीरी वूलन शॉल या गर्म स्कार्फ',
        recipientTypeEn: 'For Parents & Loved Ones',
        recipientTypeHi: 'माता-पिता व जीवनसाथी के लिए',
        descEn: 'A soft, comforting winter accessory in festive emerald green, ruby red, or warm oatmeal cream.',
        descHi: 'सर्दियों के लिए एक बेहद कोमल, गर्म और सुरुचिपूर्ण कश्मीरी शॉल।',
        budgetRange: '₹1,000–₹2,500',
      },
    ],
    faqs: [
      {
        id: 'xmas-faq-01',
        questionEn: 'What is the spiritual meaning and significance of Christmas?',
        questionHi: 'क्रिसमस का आध्यात्मिक अर्थ और इसका पावन महत्व क्या है?',
        questionHinglish: 'Christmas ka asli matlab aur significance kya hai?',
        answerEn: 'Christmas commemorates the Nativity of Jesus Christ in Bethlehem, celebrating divine love, humility, forgiveness, and light triumphing over darkness. It brings people together to share meals, sing carols, and offer charity to those in need.',
        answerHi: 'क्रिसमस प्रभु ईसा मसीह के बेथलहम में अवतरण का महापर्व है, जो संसार को निस्वार्थ प्रेम, क्षमा, करुणा और शांति का संदेश देता है। यह दिन दीन-दुखियों की सहायता करने, परिजनों संग प्रार्थना करने और खुशियां बांटने का पावन अवसर है।',
        answerHinglish: 'Christmas Prabhu Yeshu ke birthday ke roop me manaya jata hai. Yeh prem, shanti, forgiveness aur zaruratmand logon ki help karne ka message deta hai.',
        category: 'rituals',
      },
      {
        id: 'xmas-faq-02',
        questionEn: 'How to decorate a Christmas tree and festive home on a budget?',
        questionHi: 'घर पर कम खर्च में क्रिसमस ट्री और लिविंग रूम की सुंदर सजावट कैसे करें?',
        questionHinglish: 'Kam budget me Christmas tree aur home decoration kaise karein?',
        answerEn: 'Use pinecones, dried cinnamon sticks, sliced dried oranges, origami paper stars, and warm fairy lights. Adorn your front door with an easy DIY wreath made of fresh pine twigs, a red ribbon bow, and small golden bells.',
        answerHi: 'कम बजट में सजावट के लिए देवदार के सूखे फल (पाइनकोन), दालचीनी की डंडियां, सूखे संतरे के टुकड़े, कागज के रंगीन सितारे और सुनहरी फेयरी लाइट्स का उपयोग करें। मुख्य द्वार पर हरी पत्तियों और लाल रिबन से हस्तनिर्मित रीथ (माला) लगाएं।',
        answerHinglish: 'Budget-friendly Christmas decor ke liye pinecones, dried orange slices, handmade paper stars aur fairy lights best hain. Door par fresh leaves aur red ribbon ki wreath lagayein jo cozy festive vibe deti hai.',
        category: 'decoration',
      },
      {
        id: 'xmas-faq-03',
        questionEn: 'What are the best Secret Santa gift ideas under ₹500?',
        questionHi: '₹५०० के बजट में सीक्रेट सांता के लिए सबसे अच्छे गिफ्ट आइडिया क्या हैं?',
        questionHinglish: 'Secret Santa ke liye ₹500 ke andar best gift ideas kya hain?',
        answerEn: 'Great options under ₹500 include festive ceramic coffee mugs filled with artisan chocolates, scented soy wax winter candles, fuzzy woollen holiday socks, insulated travel tumblers, or personalized photo wishes from FestiveWala.',
        answerHi: '₹५०० के बजट में सुंदर सिरेमिक कॉफी मग, दालचीनी व वेनिला सुगंध वाली मोमबत्तियां, आरामदायक ऊनी मोजे, मिनी इनडोर पौधे और फेस्टिववाला पर बना व्यक्तिगत ग्रीटिंग कार्ड उत्कृष्ट और लोकप्रिय उपहार हैं।',
        answerHinglish: 'Secret Santa ke liye ₹500 me ceramic coffee mug with chocolates, winter scented candles, woollen socks, desk diary ya FestiveWala ka custom photo greeting card sabse fun and thoughtful gifts hain.',
        category: 'gifting',
      },
      {
        id: 'xmas-faq-04',
        questionEn: 'Why is traditional rich plum cake baked for Christmas?',
        questionHi: 'क्रिसमस पर पारंपरिक प्लम केक बनाने का क्या महत्व और इतिहास है?',
        questionHinglish: 'Christmas par traditional plum cake kyu banaya jata hai?',
        answerEn: 'Dating back to medieval porridge traditions, rich plum cakes feature dried raisins, berries, and candied peels soaked for weeks in spiced fruit juices. It symbolizes warmth, celebration, and rich hospitality during the winter holidays.',
        answerHi: 'पारंपरिक प्लम केक में किशमिश, बेरीज और सूखे मेवों को कई सप्ताह तक सुगंधित मसालों व फलों के रस में भिगोकर पकाया जाता है। यह सर्दियों में शरीर को गर्माहट, ऊर्जा और आनंद प्रदान करने वाला पारंपरिक क्रिसमस मिष्ठान्न है।',
        answerHinglish: 'Plum cake me dry fruits, berries aur spices ko weeks tak soak karke bake kiya jata hai. Yeh cake winter me warmth aur Christmas celebration ki richness ka symbol hai.',
        category: 'food',
      },
    ],
    greetingsCategoryKey: 'friends',
    relatedRangoliCategories: ['geometric', 'modern'],
    relatedDecorationCategories: ['lighting-diyas', 'home-decor'],
  },

  'new-year': {
    id: 'new-year',
    nameEn: 'New Year — Fresh Horizons & Aspirations',
    nameHi: 'नव वर्ष — नवीन आशाएं व स्वर्णिम संकल्प',
    regionalAliases: ['New Year', 'Happy New Year', 'Naya Saal', 'Nav Varsh', 'New Year Eve', 'January 1'],
    tithiEn: 'January 1',
    tithiHi: '१ जनवरी',
    taglineEn: 'Welcoming unwritten chapters, radiant optimism, renewed health, and global harmony.',
    taglineHi: 'बीते कल की कृतज्ञता, आने वाले कल का उत्साह और नए संकल्पों के साथ नव वर्ष का स्वागत।',
    hinglishTagline: 'Naye sapne, nayi umang aur taaza umeedon ki shubh shuruat.',
    accentColor: '#F2D98B',
    secondaryColor: '#3F51B5',
    bgGradient: 'from-[#141B33] via-[#1E2952] to-[#0A0E1A]',
    heroMotif: 'newyear-sparkler',
    about: {
      summaryEn:
        'New Year’s Day marks the universal turning of the calendar page, inspiring millions to reflect on past milestones with gratitude, set purposeful resolutions, forgive past hurts, and greet the incoming year with open arms and joyful celebrations.',
      summaryHi:
        'नव वर्ष का आगमन जीवन में एक नया अध्याय शुरू करने का अवसर है। यह दिन पुरानी भूलों को क्षमा करने, जीवन में नए सकारात्मक संकल्प लेने और परिजनों व मित्रों के साथ उज्ज्वल भविष्य की कामना करने का दिन है।',
      culturalSignificanceEn:
        'In India, January 1 is celebrated with nationwide warmth alongside regional traditional new years (such as Ugadi, Baisakhi, Gudi Padwa, and Poila Baisakh). It serves as a unified celebration of gratitude, sunrise walks, temple visits, and celebratory midnight toasts.',
      culturalSignificanceHi:
        'भारत में १ जनवरी को सभी लोग उत्साह से मनाते हैं। प्रातःकाल सूर्य नमस्कार, मंदिरों और धार्मिक स्थलों में दर्शन तथा संध्या को परिवार संग संगीत व भोज का आयोजन किया जाता है।',
      historyEn:
        'Dating back to the Roman institution of the Julian calendar dedicated to Janus, the god of thresholds and doorways, looking backward to the past and forward to the future.',
      historyHi:
        'प्राचीन काल से यह समय दो दिशाओं को देखने का प्रतीक रहा है — बीते समय का सिंहावलोकन और आने वाले कल का स्वागत।',
      keyThemes: [
        { en: 'New Beginnings', hi: 'नवीन आरंभ', icon: '🌅' },
        { en: 'Positive Resolutions', hi: 'सकारात्मक संकल्प', icon: '📝' },
        { en: 'Gratitude & Grace', hi: 'कृतज्ञता', icon: '🙏' },
        { en: 'Joyful Solidarity', hi: 'सौहार्द', icon: '🥂' },
      ],
    },
    traditions: [
      {
        id: 'sunrise-contemplation',
        titleEn: 'First Sunrise Prayer & Surya Namaskar',
        titleHi: 'वर्ष के प्रथम सूर्योदय की वंदना',
        descEn:
          'Greeting the very first dawn of the New Year outdoors with quiet gratitude, mindful deep breathing, and prayers for holistic vitality.',
        descHi:
          'नव वर्ष की पहली सुबह खुले आकाश के नीचे सूर्यदेव को अर्घ्य देना और स्वस्थ व ऊर्जावान जीवन के लिए प्रार्थना करना।',
        customs: [
          { en: 'Offering water (Arghya) to the rising morning sun', hi: 'उगते सूर्य को तांबे के लोटे से जल अर्पित करना' },
          { en: 'Writing down 3 heartfelt resolutions on paper', hi: 'डायरी में अपने वर्ष के ३ सबसे महत्वपूर्ण लक्ष्य लिखना' },
        ],
        regionalVariations: {
          en: 'Many travel to sea coasts or mountain hilltops across India (Kanyakumari, Goa, Shimla) to witness the first sunrise of the year.',
          hi: 'हजारों लोग कन्याकुमारी, पुरी या पहाड़ों पर जाकर वर्ष की पहली सूर्य किरणों का स्वागत करते हैं।',
        },
        icon: '🌅',
      },
      {
        id: 'midnight-celebration',
        titleEn: 'Midnight Countdown & Sparklers',
        titleHi: 'मध्यरात्रि काउंटडाउन एवं उत्सव',
        descEn:
          'Counting down the final 10 seconds of December 31 surrounded by loved ones, shouting greetings, lighting sparklers, and sharing cake.',
        descHi:
          'घड़ी में १२ बजते ही तालियों, दीपों और संगीत के साथ "हैप्पी न्यू ईयर" कहना और एक-दूसरे को गले लगाकर शुभकामनाएं देना।',
        customs: [
          { en: 'Sending warm personalized wishes to mentors and friends at midnight', hi: 'मध्यरात्रि में प्रियजनों और गुरुओं को हार्दिक शुभकामना संदेश भेजना' },
        ],
        icon: '🎆',
      },
    ],
    decorations: [
      {
        id: 'metallic-balcony-lights',
        titleEn: 'Warm White Waterfall Fairy Curtain',
        titleHi: 'बालकनी व ड्राइंग रूम में वार्म व्हाइट कर्टेन लाइट्स',
        descEn:
          'Hang cascading fairy lights vertically behind sheer ivory drapes to create a glowing celestial ambiance for your midnight gathering.',
        descHi:
          'पर्दों के पीछे या बालकनी की दीवार पर नीचे गिरती हुई सूक्ष्म एलईडी लाइट्स की लड़ियां लगाएं, जो जादुई माहौल बनाती हैं।',
        tipEn: 'Choose warm golden white rather than cool bluish LEDs for an intimate and cozy photo backdrop.',
        tipHi: 'सुनहरी पीली रोशनी वाली लाइट्स चुनें जो तस्वीरों में बहुत सुंदर दिखती हैं।',
        tagEn: 'Living Room',
        tagHi: 'लिविंग रूम',
      },
    ],
    recipes: [
      {
        id: 'saffron-dryfruit-pulao',
        nameEn: 'Royal Kashmiri Saffron Pulao',
        nameHi: 'शाही कश्मीरी केसरिया पुलाव',
        typeEn: 'Celebratory Festive Feast',
        typeHi: 'नव वर्ष का शाही व्यंजन',
        timeEn: '35 Mins Cook',
        timeHi: '३५ मिनट',
        descEn:
          'Fragrant long-grain basmati rice infused with whole spices, Kashmiri saffron, golden fried onions, cashews, and pomegranate seeds.',
        descHi:
          'सुगंधित बासमती चावल, केसर, खड़े मसाले, भुने काजू और ताजे अनार के दानों से सजा शाही कश्मीरी पुलाव।',
        ingredients: [
          { en: '2 cups Aged Basmati Rice', hi: '२ कप पुराना बासमती चावल' },
          { en: '10-12 strands Pure Saffron soaked in warm milk', hi: 'दूध में भीगा कश्मीरी केसर' },
          { en: 'Whole spices: Bay leaf, cinnamon, green & black cardamom, star anise', hi: 'तेजपत्ता, दालचीनी, लौंग, छोटी व बड़ी इलायची' },
          { en: 'Fried onions (birista) and toasted dry fruits for topping', hi: 'तली हुई प्याज, काजू, बादाम और अनार के दाने' },
        ],
        steps: [
          { en: 'Sauté whole spices in pure ghee until wonderfully aromatic.', hi: 'घी में खड़े मसालों को धीमी आंच पर खुशबू आने तक भूनें।' },
          { en: 'Add washed basmati rice, warm saffron milk, and seasoned water.', hi: 'चावल, केसर का दूध और पानी डालकर ढककर पकाएं।' },
          { en: 'Dum-cook on low flame until every grain is long, fragrant, and separated.', hi: 'धीमी आंच पर दम देकर पकाएं और ऊपर से भुने मेवे सजाकर परोसें।' },
        ],
      },
    ],
    gifts: [
      {
        id: 'mindfulness-journal',
        titleEn: 'Leather-Bound Annual Planner & Brass Fountain Pen',
        titleHi: 'हस्तनिर्मित लेदर डायरी व पीतल का फाउंटेन पेन',
        recipientTypeEn: 'For Professionals & Mentors',
        recipientTypeHi: 'सहकर्मियों, गुरुओं व मित्रों के लिए',
        descEn: 'A high-grade notebook for setting resolutions, daily reflections, and charting professional growth throughout the year.',
        descHi: 'नए साल के संकल्पों, विचारों और प्राथमिकताओं को सहेजने के लिए एक सुरुचिपूर्ण डायरी व पेन सेट।',
        budgetRange: '₹500–₹1,000',
      },
      {
        id: 'indoor-peace-plant',
        titleEn: 'Peace Lily or Jade Plant in Ceramic Pot',
        titleHi: 'सफेद सिरेमिक गमले में जेड या पीस लिली का पौधा',
        recipientTypeEn: 'For Friends & Neighbors',
        recipientTypeHi: 'दोस्तों और पड़ोसियों के लिए',
        descEn: 'A living symbol of growth, serenity, and air-purifying freshness for their workstation or home.',
        descHi: 'सकारात्मक ऊर्जा, विकास और ताजगी का प्रतीक एक सुंदर इनडोर पौधा।',
        budgetRange: '₹250–₹500',
      },
    ],
    faqs: [
      {
        id: 'ny-faq-01',
        questionEn: 'How to set realistic New Year resolutions and stay consistent throughout the year?',
        questionHi: 'नए साल के सार्थक संकल्प कैसे लें और पूरे वर्ष उन पर कैसे अडिग रहें?',
        questionHinglish: 'New year ke realistic resolutions kaise set karein aur unhe follow kaise karein?',
        answerEn: 'Focus on 2 or 3 specific micro-habits rather than vague goals. Write them down in a daily journal, track weekly progress, celebrate small consistency milestones, and build habit loops (e.g. 15 minutes of reading right after morning tea).',
        answerHi: 'एक साथ बहुत सारे लक्ष्य बनाने के बजाय २-३ छोटे और स्पष्ट नियम बनाएं। उन्हें डायरी में लिखें, अपने दैनिक अभ्यास से जोड़ें (जैसे सुबह चाय के बाद १५ मिनट पढ़ना), और हर सप्ताह अपनी प्रगति का शांति से अवलोकन करें।',
        answerHinglish: 'Ek saath bohot saare targets lene ke bajaye 2-3 specific habits par focus karein. Unhe daily journal me likhein, weekly progress track karein aur small milestones celebrate karein.',
        category: 'timing',
      },
      {
        id: 'ny-faq-02',
        questionEn: 'How can I create a personalized New Year photo greeting card on FestiveWala?',
        questionHi: 'फेस्टिववाला पर नए साल का व्यक्तिगत फोटो शुभकामना कार्ड कैसे बनाएं?',
        questionHinglish: 'FestiveWala par apne photo ke saath new year card kaise banayein?',
        answerEn: 'Visit FestiveWala Photo Wishes Studio, choose a luxury New Year template, upload your family or personal photo, adjust framing using smooth zoom and pan controls, add your custom heartfelt wish, and download as a high-resolution PNG for instant WhatsApp sharing.',
        answerHi: 'फेस्टिववाला फोटो स्टूडियो में जाएं, नए साल का कोई भी सुंदर फ्रेम चुनें, अपनी पसंदीदा तस्वीर अपलोड करें, ज़ूम और पैन स्लाइडर से फ्रेम में सेट करें, अपने और अपने परिवार का नाम जोड़ें और एक क्लिक में एचडी कार्ड डाउनलोड करें।',
        answerHinglish: 'FestiveWala Photo Wishes Studio open karein, New Year template select karein, apni photo upload karke frame me zoom/pan adjust karein, personalized wish aur naam likhein aur high quality PNG download karein.',
        category: 'gifting',
      },
      {
        id: 'ny-faq-03',
        questionEn: 'What are fun, budget-friendly ideas for celebrating New Year\'s Eve at home?',
        questionHi: 'घर पर नए साल की पूर्वसंध्या को यादगार बनाने के कम बजट वाले विचार क्या हैं?',
        questionHinglish: 'Ghar par New Year Eve party budget me kaise celebrate karein?',
        answerEn: 'Organize a cozy family potluck dinner, host a board game or karaoke championship, project favorite childhood photos and video memories, bake festive cupcakes together, and countdown midnight with sparklers on the balcony.',
        answerHi: 'परिवार और दोस्तों संग पॉटलक डिनर (घर के बने पकवान) का आयोजन करें, अंताक्षरी या बोर्ड गेम्स खेलें, बीते वर्ष की सबसे खूबसूरत तस्वीरों का स्लाइडशो देखें और बालकनी में दीयों व फुलझड़ियों के साथ नए साल का स्वागत करें।',
        answerHinglish: 'Ghar par friends aur family ke saath potluck dinner karein, fun music playlist aur board games play karein, purani memorable photos dekhein aur 12 baje sparklers ke saath countdown celebrate karein.',
        category: 'decoration',
      },
      {
        id: 'ny-faq-04',
        questionEn: 'What are warm, inspiring New Year wishes to send to colleagues, friends, and family?',
        questionHi: 'सहकर्मियों, मित्रों और परिवार को नए साल के कौन से प्रेरक संदेश भेजने चाहिए?',
        questionHinglish: 'Naye saal par colleagues aur family ko warm messages kaise bhejein?',
        answerEn: 'Tailor your message by tone: for mentors, wish purpose and good health; for friends, wish shared laughs and adventures; for family, express gratitude for their warmth. Browse FestiveWala Wishes Hub for 300+ bilingual festive messages.',
        answerHi: 'रिश्ते के अनुसार संदेश चुनें — बड़ों के लिए उत्तम स्वास्थ्य और शांति की प्रार्थना, दोस्तों के लिए उल्लास और सफलता, और सहयोगियों के लिए नई उपलब्धियों की कामना। फेस्टिववाला विशेज हब में ३००+ सुंदर संदेश उपलब्ध हैं।',
        answerHinglish: 'Mentors ke liye health aur peace ki wish karein, friends ke liye happiness aur success, aur family ke liye gratitude. FestiveWala Wishes Hub par jakar ready-made Hindi, English aur Hinglish wishes browse karein.',
        category: 'rituals',
      },
    ],
    greetingsCategoryKey: 'professional',
    relatedRangoliCategories: ['modern', 'geometric'],
    relatedDecorationCategories: ['office-decor', 'lighting-diyas'],
  },
};

