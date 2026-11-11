export interface CategoryInternalLink {
  labelEn: string;
  labelHi: string;
  href: string;
}

export interface WishesCategoryContent {
  id: string;
  seoTitle: {
    en: string;
    hi: string;
  };
  seoDesc: {
    en: string;
    hi: string;
  };
  keywords: {
    en: string;
    hi: string;
  };
  pageH1: {
    en: string;
    hi: string;
  };
  pageSubtitle: {
    en: string;
    hi: string;
  };
  editorialIntro: {
    en: string;
    hi: string;
    hinglish: string;
  };
  guideTitle: {
    en: string;
    hi: string;
  };
  guideBody: {
    en: string;
    hi: string;
  };
  internalLinks: CategoryInternalLink[];
}

export const WISHES_CATEGORIES_SEO_DATA: Record<string, WishesCategoryContent> = {
  birthday: {
    id: 'birthday',
    seoTitle: {
      en: '100 Best Birthday Wishes, Messages & Quotes in English & Hindi | FestiveWala',
      hi: 'जन्मदिन की १०० सर्वश्रेष्ठ शुभकामनाएं, बधाई संदेश व शायरी २०२६ | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Explore 100 heartfelt birthday wishes and messages for mother, father, siblings, spouse, and best friends. Free 1-click copy and instant WhatsApp sharing.',
      hi: 'माता-पिता, भाई-बहन, जीवनसाथी व जिगरी दोस्तों के लिए १०० मौलिक जन्मदिन शुभकामनाएं। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत कॉपी व शेयर करें।',
    },
    keywords: {
      en: 'birthday wishes, birthday messages, happy birthday quotes, birthday wishes for best friend, birthday wishes for parents, birthday status',
      hi: 'जन्मदिन की शुभकामनाएं, जन्मदिन बधाई संदेश, हैप्पी बर्थडे कोट्स, दोस्तों के लिए जन्मदिन शायरी, स्टेटस',
    },
    pageH1: {
      en: 'Birthday Wishes & Messages (100+ Best Greetings)',
      hi: 'जन्मदिन की हार्दिक शुभकामनाएं (१०० श्रेष्ठ संदेश)',
    },
    pageSubtitle: {
      en: 'Curated heartfelt birthday wishes for parents, siblings, spouse, best friends, and loved ones.',
      hi: 'माता-पिता, जीवनसाथी, भाई-बहन व मित्रों के लिए १०० मौलिक जन्मदिन संदेश। तुरंत कॉपी व शेयर करें।',
    },
    editorialIntro: {
      en: "Celebrate life's special milestones with 100 heartfelt birthday wishes. Thoughtfully composed across familial blessings, romantic notes, playful friend banter, and respectful greetings for elders in English, pure Hindi, and conversational Hinglish.",
      hi: 'जीवन के हर खास रिश्ते के लिए संकलित १०० अनमोल जन्मदिन शुभकामनाएं। माता-पिता के आशीर्वाद, जीवनसाथी के लिए प्रेम भरे शब्द, मित्रों की मस्ती और बड़ों के लिए आदरणीय बधाई संदेश — सब कुछ एक क्लिक में कॉपी व शेयर करें।',
      hinglish: 'Apno ke birthday ko aur bhi special banayein dil ko chhu lene wali shubhkamnayein ke saath. Family, best friends aur life partner ke liye best birthday messages aur shayari, instant WhatsApp share ke liye ready.',
    },
    guideTitle: {
      en: 'How to Choose the Perfect Birthday Wish',
      hi: 'अपनों के लिए सही जन्मदिन शुभकामना कैसे चुनें?',
    },
    guideBody: {
      en: 'A meaningful birthday greeting honors your personal bond. For parents and elders, words of gratitude and divine blessings bring comfort; for your spouse or partner, intimate affectionate lines convey deep love; and for close friends, energetic, playful banter keeps the joy alive.',
      hi: 'जन्मदिन पर भेजा गया संदेश आत्मीयता का गहरा एहसास कराता है। माता-पिता व बुजुर्गों के लिए कृतज्ञता व ईश्वर कृपा की प्रार्थनाएं उपयुक्त होती हैं, जीवनसाथी के लिए भावुक व आत्मीय पंक्तियां, और खास दोस्तों के लिए मस्ती व हंसी-मजाक से भरे संदेश सबसे ज्यादा पसंद किए जाते हैं।',
    },
    internalLinks: [
      { labelEn: 'Create Birthday Greeting Card', labelHi: 'जन्मदिन ग्रीटिंग कार्ड बनाएं', href: '/greeting-cards' },
      { labelEn: 'Friendship Messages & Shayari', labelHi: 'मित्रता संदेश व दोस्ती शायरी', href: '/wishes?category=friendship' },
      { labelEn: "Today's Quote of the Day", labelHi: 'आज का अनमोल विचार', href: '/#quote-of-the-day' },
      { labelEn: 'Explore Festival Wishes', labelHi: 'त्योहार शुभकामनाएं संग्रह', href: '/wishes?category=festival' },
    ],
  },

  anniversary: {
    id: 'anniversary',
    seoTitle: {
      en: '100 Best Wedding Anniversary Wishes, Messages & Quotes | FestiveWala',
      hi: 'विवाह वर्षगांठ की १०० सुंदर शुभकामनाएं, बधाई संदेश व कोट्स | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Romantic and heartfelt wedding anniversary messages for spouse, parents, and friends. Celebrate milestones from 1st year to 25th Silver & 50th Golden Jubilees.',
      hi: 'दांपत्य प्रेम, माता-पिता की सालगिरह व २५वीं-५०वीं जुबली के पावन संदेश। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत कॉपी व शेयर करें।',
    },
    keywords: {
      en: 'anniversary wishes, wedding anniversary messages, marriage anniversary quotes, anniversary wishes for parents, romantic anniversary status',
      hi: 'विवाह वर्षगांठ शुभकामनाएं, शादी की सालगिरह संदेश, एनिवर्सरी कोट्स, माता-पिता की सालगिरह, दांपत्य प्रेम',
    },
    pageH1: {
      en: 'Wedding Anniversary Wishes (100+ Best Messages)',
      hi: 'विवाह वर्षगांठ की पावन शुभकामनाएं (१०० श्रेष्ठ संदेश)',
    },
    pageSubtitle: {
      en: 'Romantic and heartfelt wedding anniversary messages for spouse, parents, and friends.',
      hi: 'दांपत्य प्रेम, माता-पिता की सालगिरह व मित्रों के लिए १०० सुंदर वर्षगांठ संदेश।',
    },
    editorialIntro: {
      en: 'Honor enduring companionship and sacred vows with 100 dedicated wedding anniversary messages. From tender romantic expressions for your partner and milestone tributes for parents to joyous blessings for friends, find the perfect words to celebrate love.',
      hi: 'दांपत्य प्रेम, विश्वास और अटूट साथ का उत्सव मनाएं १०० सुंदर वर्षगांठ संदेशों के साथ। जीवनसाथी के लिए रोमांटिक शायरी, माता-पिता की सालगिरह पर आदरणीय शुभकामनाएं व मित्रों के लिए बधाई संदेश एक क्लिक में शेयर करें।',
      hinglish: 'Shaadi ki salgirah par bhejein dilon ko jodne wale shandar anniversary wishes. Partner ke liye romantic quotes, mummy-papa ki anniversary ke liye respectful blessings aur friends ke liye warm messages.',
    },
    guideTitle: {
      en: 'Selecting Meaningful Anniversary Wishes for Couples & Parents',
      hi: 'विवाह वर्षगांठ के लिए सही बधाई संदेश कैसे चुनें?',
    },
    guideBody: {
      en: 'Anniversary milestones celebrate shared resilience and affection. When wishing parents, emphasize gratitude for their exemplary guidance; for friends, celebrate their companionship; and for your own partner, express appreciation for everyday memories and lifelong promises.',
      hi: 'विवाह वर्षगांठ दो हृदयों की साझा यात्रा और विश्वास का प्रतीक है। माता-पिता को बधाई देते समय उनके स्नेहपूर्ण मार्गदर्शन के प्रति कृतज्ञता व्यक्त करें; मित्रों के लिए उनकी अटूट जोड़ी की मंगलकामना करें; और जीवनसाथी के लिए बीते पलों की कृतज्ञता व आने वाले कल के संकल्प व्यक्त करें।',
    },
    internalLinks: [
      { labelEn: 'Design Anniversary Greeting Card', labelHi: 'वर्षगांठ ग्रीटिंग कार्ड बनाएं', href: '/greeting-cards' },
      { labelEn: 'Romantic Love Messages', labelHi: 'रोमांटिक प्रेम संदेश', href: '/wishes?category=love' },
      { labelEn: "Today's Thought of the Day", labelHi: 'आज का सुविचार', href: '/#thought-of-the-day' },
      { labelEn: 'All Wishes Collection', labelHi: 'सभी शुभकामनाएं संग्रह', href: '/wishes' },
    ],
  },

  love: {
    id: 'love',
    seoTitle: {
      en: '100 Romantic Love Messages, Quotes & Shayari in English & Hindi | FestiveWala',
      hi: '१०० सच्चे प्रेम संदेश, रोमांटिक शायरी व लव कोट्स | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Curated collection of 100 romantic love messages, heartfelt quotes, and poetic shayari for husband, wife, and partner. Free 1-click copy and instant WhatsApp share.',
      hi: 'जीवनसाथी व प्रियतम के लिए १०० आत्मीय व भावुक प्रेम संदेश। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत कॉपी व शेयर करें।',
    },
    keywords: {
      en: 'love messages, romantic love quotes, love shayari in Hindi, romantic messages for wife, love quotes for husband, partner status',
      hi: 'प्रेम संदेश, रोमांटिक शायरी, लव कोट्स, जीवनसाथी के लिए संदेश, प्यार भरी शायरी, लव स्टेटस',
    },
    pageH1: {
      en: 'Romantic Love Messages & Quotes (100+ Curated)',
      hi: 'सच्चे प्रेम संदेश व रोमांटिक कोट्स (१०० श्रेष्ठ संदेश)',
    },
    pageSubtitle: {
      en: 'Heartfelt romantic expressions and thoughtful words for your partner.',
      hi: 'जीवनसाथी व प्रियतम के लिए १०० गहरे, आत्मीय व सुंदर प्रेम संदेश।',
    },
    editorialIntro: {
      en: 'Give voice to genuine devotion with 100 romantic love messages and poetic shayari. Crafted to convey warmth, comfort, reassurance, and steady companionship, these lines express what words often struggle to capture.',
      hi: 'दिल के सच्चे जज्बातों को बयां करते १०० आत्मीय प्रेम संदेश, रोमांटिक शायरी और भावुक कोट्स। अपने जीवनसाथी या प्रियतम के प्रति गहरा स्नेह, भरोसा और साथ निभाने का अहसास कराएं।',
      hinglish: 'Dil ki baat seedhe unke dil tak pahunchayein. 100 romantic love messages, shayari aur emotional quotes jo life partner ya special person ko unki ahmiyat ka ehsaas dilate hain.',
    },
    guideTitle: {
      en: 'Expressing True Affection Through Thoughtful Words',
      hi: 'सच्चे प्रेम संदेश व शायरी से करें दिल की बात',
    },
    guideBody: {
      en: 'Sincere love messages avoid dramatic exaggeration and focus on presence, reassurance, and emotional security. Short reminders of appreciation often mean more than elaborate grand gestures.',
      hi: 'सच्चे प्रेम संदेश में दिखावे की जगह आत्मीयता, भरोसा और भावनात्मक संबल सबसे महत्वपूर्ण होते हैं। दैनिक जीवन में छोटे-छोटे आभार और स्नेह भरे शब्द रिश्ते को हर दिन नया और गहरा बनाते हैं।',
    },
    internalLinks: [
      { labelEn: 'Create Romantic Photo Greeting', labelHi: 'रोमांटिक फोटो कार्ड बनाएं', href: '/greeting-cards' },
      { labelEn: 'Wedding Anniversary Wishes', labelHi: 'विवाह वर्षगांठ संदेश', href: '/wishes?category=anniversary' },
      { labelEn: 'Friendship Messages & Shayari', labelHi: 'मित्रता संदेश व शायरी', href: '/wishes?category=friendship' },
      { labelEn: "Today's Quote of the Day", labelHi: 'आज का अनमोल विचार', href: '/#quote-of-the-day' },
    ],
  },

  friendship: {
    id: 'friendship',
    seoTitle: {
      en: '100 Best Friendship Messages, Dosti Quotes & Shayari | FestiveWala',
      hi: '१०० सच्ची मित्रता संदेश, दोस्ती शायरी व कोट्स | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Curated collection of 100 friendship messages, funny notes, and emotional dosti quotes for best friends and childhood companions. Free 1-click share.',
      hi: 'सच्चे दोस्तों व खास मित्रों के लिए १०० अनमोल दोस्ती संदेश। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत शेयर करें।',
    },
    keywords: {
      en: 'friendship messages, dosti shayari, friendship day wishes, best friend quotes, emotional friendship quotes, dosti status',
      hi: 'मित्रता संदेश, दोस्ती शायरी, सच्चे दोस्त के लिए कोट्स, फ्रेंडशिप स्टेटस, यारी शायरी',
    },
    pageH1: {
      en: 'Friendship Messages & Dosti Quotes (100+ Best Wishes)',
      hi: 'सच्ची मित्रता संदेश व दोस्ती शायरी (१०० श्रेष्ठ संदेश)',
    },
    pageSubtitle: {
      en: 'Emotional and fun friendship messages celebrating bonds that last a lifetime.',
      hi: 'जिगरी दोस्तों व खास मित्रों के लिए १०० भावनात्मक व मस्ती भरे मित्रता संदेश।',
    },
    editorialIntro: {
      en: 'Celebrate the friends who make every journey worthwhile with 100 dedicated friendship messages. From nostalgic memories of childhood companions to funny everyday banter and steadfast loyalty, find quotes that honour your circle.',
      hi: 'सच्ची दोस्ती के हर अनमोल पल को समर्पित १०० खूबसूरत मित्रता संदेश व दोस्ती शायरी। बचपन के लंगोटिया यार, कॉलेज के संगी-साथी और हर सुख-दुख में साथ खड़े दोस्तों के लिए दिल से लिखे गए संदेश।',
      hinglish: 'Dosti ke har rang ko celebrate karein 100 real dosti messages aur funny shayari ke saath. Best friends, childhood buddies aur college doston ke liye instant copy & WhatsApp share.',
    },
    guideTitle: {
      en: 'Celebrating True Friendship with Dosti Messages',
      hi: 'सच्ची दोस्ती के लिए खास मित्रता संदेश व शायरी',
    },
    guideBody: {
      en: 'Friendship flourishes on shared memories, trust, and unpretentious honesty. Whether sending playful banter or acknowledging steadfast support through tough times, choose messages that ring true to your shared history.',
      hi: 'सच्ची मित्रता की नींव बिना किसी औपचारिकता के आपसी भरोसे और हंसी-मजाक पर टिकी होती है। दोस्तों को संदेश भेजते समय बनावटी शब्दों से बचें और अपनी साझा यादों तथा उनके निस्वार्थ साथ को महत्व दें।',
    },
    internalLinks: [
      { labelEn: 'Create Custom Friend Card', labelHi: 'दोस्त के लिए कार्ड बनाएं', href: '/greeting-cards' },
      { labelEn: 'Birthday Wishes for Friends', labelHi: 'दोस्तों के लिए जन्मदिन संदेश', href: '/wishes?category=birthday' },
      { labelEn: 'Daily Morning Inspiration', labelHi: 'दैनिक प्रेरणा व विचार', href: '/#quote-of-the-day' },
      { labelEn: 'All Wishes Collection', labelHi: 'सभी शुभकामनाएं संग्रह', href: '/wishes' },
    ],
  },

  'good-morning': {
    id: 'good-morning',
    seoTitle: {
      en: '100 Best Good Morning Wishes, Positive Quotes & Blessings | FestiveWala',
      hi: '१०० प्रेरणादायी सुप्रभात संदेश, ईश वंदना व सुविचार | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Start the day with positivity: 100 inspiring good morning messages, morning blessings, and motivational quotes in English and Hindi. Free 1-click share.',
      hi: 'दिन की सकारात्मक शुरुआत के लिए १०० सुंदर सुप्रभात संदेश, ईश वंदना व सुविचार। तुरंत व्हाट्सएप पर शेयर करें।',
    },
    keywords: {
      en: 'good morning wishes, good morning messages, morning blessings, positive morning quotes, suprabhat quotes hindi english, morning status',
      hi: 'सुप्रभात संदेश, शुभ प्रभात, सुप्रभात सुविचार, सुबह के प्रेरणादायक विचार, मॉर्निंग कोट्स',
    },
    pageH1: {
      en: 'Good Morning Wishes & Morning Blessings (100+ Best Quotes)',
      hi: 'प्रेरणादायी सुप्रभात संदेश व सुविचार (१०० श्रेष्ठ संदेश)',
    },
    pageSubtitle: {
      en: "Positive morning thoughts, blessings, and inspirational messages to brighten someone's day.",
      hi: 'दिन की सकारात्मक शुरुआत के लिए १०० सुंदर सुप्रभात संदेश, प्रार्थनाएं व विचार।',
    },
    editorialIntro: {
      en: 'Welcome each dawn with 100 uplifting good morning wishes and serene blessings. Designed to foster calm determination, kindness, and gratitude, these messages bring light and cheer to family and friends.',
      hi: 'दिन की शुरुआत करें सकारात्मक ऊर्जा और मंगल कामनाओं के साथ। १०० प्रेरणादायी सुप्रभात संदेश, ईश वंदना, सुंदर सुविचार और आशीर्वाद जो अपनों के दिन को खुशहाल और ऊर्जावान बना दें।',
      hinglish: 'Apne din ki shuruaat karein positive thoughts ke saath. 100 best good morning wishes, suprabhat sandesh aur motivational morning quotes jo family aur WhatsApp groups par share karne ke liye perfect hain.',
    },
    guideTitle: {
      en: 'Starting the Day with Positivity & Morning Blessings',
      hi: 'दिन की सकारात्मक शुरुआत: सुंदर सुप्रभात संदेश व सुविचार',
    },
    guideBody: {
      en: 'A peaceful morning message sets a calm, constructive tone for the hours ahead. Morning blessings centered on clarity, purpose, and good health bring genuine comfort and encouragement.',
      hi: 'सुबह का पहला संदेश मन को शांति और दिन भर के कार्यों के लिए नई ऊर्जा देता है। सुबह के समय स्वास्थ्य, शांति, सद्भाव और सकारात्मक सोच से जुड़े सुविचार भेजना सबसे कल्याणकारी माना जाता है।',
    },
    internalLinks: [
      { labelEn: "Quote of the Day Inspiration", labelHi: 'आज का अनमोल विचार', href: '/#quote-of-the-day' },
      { labelEn: "Thought of the Day Wisdom", labelHi: 'आज का प्रेरक सुविचार', href: '/#thought-of-the-day' },
      { labelEn: 'Good Night Wishes & Blessings', labelHi: 'शुभ रात्रि संदेश व प्रार्थनाएं', href: '/wishes?category=good-night' },
      { labelEn: 'Create Morning Blessing Card', labelHi: 'मॉर्निंग ग्रीटिंग कार्ड बनाएं', href: '/greeting-cards' },
    ],
  },

  'good-night': {
    id: 'good-night',
    seoTitle: {
      en: '100 Peaceful Good Night Wishes, Quotes & Bedtime Blessings | FestiveWala',
      hi: '१०० शांत व सुकून भरे शुभ रात्रि संदेश व प्रार्थनाएं | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Curated collection of 100 peaceful good night wishes, bedtime blessings, and sweet dreams messages in English and Hindi. Free 1-click WhatsApp share.',
      hi: 'सुकून भरी नींद और ईश्वर कृपा के लिए १०० सुंदर शुभ रात्रि संदेश। हिंदी व अंग्रेजी में तुरंत शेयर करें।',
    },
    keywords: {
      en: 'good night wishes, peaceful good night messages, bedtime blessings, sweet dreams quotes, shubh ratri sandesh hindi english, night status',
      hi: 'शुभ रात्रि संदेश, शुभ रात्रि सुविचार, मीठे सपने शायरी, रात्रि प्रार्थना, गुड नाईट कोट्स',
    },
    pageH1: {
      en: 'Peaceful Good Night Wishes & Bedtime Blessings (100+ Quotes)',
      hi: 'सुकून भरे शुभ रात्रि संदेश व प्रार्थनाएं (१०० श्रेष्ठ संदेश)',
    },
    pageSubtitle: {
      en: 'Heartwarming bedtime blessings and soothing wishes for a peaceful night.',
      hi: 'अपनों को सुकून भरी नींद व मीठे सपनों की कामना के लिए १०० आत्मीय शुभ रात्रि संदेश।',
    },
    editorialIntro: {
      en: 'Conclude the day in tranquility with 100 comforting good night wishes. These bedtime messages gently remind loved ones of care and peace, helping release daily stress and prepare for restful slumber.',
      hi: 'दिन भर की व्यस्तता के बाद सुकून भरी नींद और प्रभु कृपा की कामना करते १०० आत्मीय शुभ रात्रि संदेश। अपनों को मीठे सपनों और शांत रात्रि की शुभकामनाएं भेजें।',
      hinglish: 'Din bhar ki thakan ke baad apno ko bhejein shanti aur sukoon bhare good night messages. Sweet dreams quotes aur restful night blessings for family and close ones.',
    },
    guideTitle: {
      en: 'Sending Calming Bedtime Blessings & Night Prayers',
      hi: 'अपनों को भेजें सुकून भरे शुभ रात्रि संदेश व प्रार्थनाएं',
    },
    guideBody: {
      en: "Night messages provide closure to busy days and invite stillness. Focus on themes of rest, gratitude for the day that passed, and quiet reassurance for tomorrow's sunrise.",
      hi: 'रात्रि का संदेश दिन भर की चिंताओं को विदा कर मन में कृतज्ञता और शांति भरने का माध्यम है। अपनों को शुभ रात्रि कहते समय बीते दिन के लिए धन्यवाद और आने वाली सुबह के लिए नई आशाओं का भाव व्यक्त करें।',
    },
    internalLinks: [
      { labelEn: 'Good Morning Wishes & Blessings', labelHi: 'सुप्रभात संदेश व सुविचार', href: '/wishes?category=good-morning' },
      { labelEn: "Thought of the Day Reflection", labelHi: 'आज का प्रेरक सुविचार', href: '/#thought-of-the-day' },
      { labelEn: "Today's Quote of the Day", labelHi: 'आज का अनमोल विचार', href: '/#quote-of-the-day' },
      { labelEn: 'Share Peace & Blessing Cards', labelHi: 'शुभकामना ग्रीटिंग कार्ड बनाएं', href: '/greeting-cards' },
    ],
  },

  festival: {
    id: 'festival',
    seoTitle: {
      en: 'Festival Wishes in Hindi & English (600+ Best Quotes) | FestiveWala',
      hi: 'त्योहार शुभकामनाएं हिंदी व अंग्रेजी में (६००+ श्रेष्ठ संदेश) | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Explore 600+ festival wishes in Hindi and English. Heartfelt messages for family and friends across Diwali, Dhanteras, Holi, and New Year. One-click copy & share.',
      hi: 'हिंदी और अंग्रेजी में ६००+ पावन त्योहार शुभकामनाएं। परिवार व मित्रों के लिए दिवाली, धनतेरस, होली और नव वर्ष के सुंदर संदेश। एक क्लिक में कॉपी व शेयर करें।',
    },
    keywords: {
      en: 'festival wishes in Hindi and English, festival wishes for family, festival greetings, Indian festival wishes, Diwali wishes, Dhanteras messages, Holi greetings',
      hi: 'त्योहार शुभकामनाएं हिंदी अंग्रेजी, परिवार के लिए शुभकामनाएं, दोस्तों के लिए बधाई, हिंदी शायरी, दिवाली संदेश, होली शुभकामनाएं',
    },
    pageH1: {
      en: 'Festival Wishes in Hindi and English (600+ Heartfelt Quotes)',
      hi: 'त्योहार शुभकामनाएं हिंदी व अंग्रेजी में (६००+ श्रेष्ठ संदेश)',
    },
    pageSubtitle: {
      en: 'Festival wishes for family and friends. Filter by relationship, emotional tone, and language.',
      hi: 'भारतीय त्योहारों के लिए ६००+ सुंदर संदेश: परिवार, मित्रों व अग्रजों के लिए हिंदी और अंग्रेजी में।',
    },
    editorialIntro: {
      en: 'Celebrate the cultural richness of Indian celebrations with over 600 festival wishes. From sacred Sanskrit shlokas and respectful greetings for elders to cheerful rhymes for friends and formal notes for colleagues, discover timeless festival greetings.',
      hi: 'भारतीय पर्वों और पावन त्योहारों के लिए ६००+ प्रामाणिक शुभकामनाएं। दीपावली, धनतेरस, होली, छठ पूजा, क्रिसमस व नव वर्ष पर अपनों को भेजें पारंपरिक संस्कृत श्लोक, भावुक बधाई संदेश व सुंदर शायरी।',
      hinglish: 'India ke sabhi festivals ke liye 600+ authentic wishes in Hindi, English aur Hinglish. Diwali, Dhanteras, Holi, Chhath aur New Year par family aur friends ke liye 1-click shareable greetings.',
    },
    guideTitle: {
      en: 'How to Choose the Perfect Festival Wish for Family & Friends',
      hi: 'अपनों के लिए सही त्योहार शुभकामना कैसे चुनें?',
    },
    guideBody: {
      en: 'A meaningful festive greeting strengthens relationships. For elders, traditional blessings and Sanskrit shlokas convey reverence; for colleagues, professional appreciation suits best; and for close friends, lively Hinglish and warm shayari bring instant joy.',
      hi: 'त्योहारों पर भेजा गया संदेश आत्मीयता का प्रतीक होता है। बुजुर्गों के लिए पारंपरिक संस्कृत श्लोक व आदरणीय शब्द उपयुक्त होते हैं, वहीं मित्रों के लिए अनौपचारिक या हिंग्लिश संदेश श्रेष्ठ रहते हैं।',
    },
    internalLinks: [
      { labelEn: 'Festival Celebration Directory', labelHi: 'त्योहार निर्देशिका व कैलेंडर', href: '/festivals' },
      { labelEn: 'Free Online Greeting Card Maker', labelHi: 'फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर', href: '/greeting-cards' },
      { labelEn: 'Dhanteras 2026 Puja & Guide', labelHi: 'धनतेरस २०२६ पूजन व परंपराएं', href: '/festivals/dhanteras' },
      { labelEn: 'Diwali 2026 Muhurat & Guide', labelHi: 'दीपावली २०२६ पूजन व मुहूर्त', href: '/festivals/diwali' },
      { labelEn: 'Rangoli Designs Gallery', labelHi: 'रंगोली डिजाइन गैलरी', href: '/rangoli' },
    ],
  },

  dhanteras: {
    id: 'dhanteras',
    seoTitle: {
      en: '100 Best Dhanteras 2026 Wishes, Quotes & Greetings | FestiveWala',
      hi: 'धनतेरस २०२६ की १०० सर्वश्रेष्ठ शुभकामनाएं, बधाई संदेश व कोट्स | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Curated collection of 100 Dhanteras wishes across family, friends, health, wealth, traditional blessings, and corporate greetings. Free 1-click copy & share.',
      hi: 'परिवार, मित्रों, व्यापार व सोशल मीडिया के लिए १०० मौलिक धनतेरस शुभकामनाएं। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत कॉपी व शेयर करें।',
    },
    keywords: {
      en: 'Dhanteras wishes 2026, Shubh Dhanteras quotes, Dhanteras greetings Hindi English, Dhanvantari wishes, Dhanteras status',
      hi: 'धनतेरस शुभकामनाएं २०२६, शुभ धनतेरस कोट्स, धनतेरस बधाई संदेश, धन्वंतरि जयंती, यम दीपदान',
    },
    pageH1: {
      en: 'Dhanteras Wishes and Greetings (100+ Best Messages)',
      hi: 'धनतेरस शुभकामनाएं और बधाई संदेश २०२६',
    },
    pageSubtitle: {
      en: 'Curated Dhanteras wishes for family, friends, and business associates. Free 1-click copy & instant WhatsApp share.',
      hi: 'परिवार, मित्रों और व्यापारिक सहयोगियों के लिए १०० मौलिक धनतेरस शुभकामनाएं। तुरंत कॉपी व शेयर करें।',
    },
    editorialIntro: {
      en: 'Open the Deepavali celebrations with 100 auspicious Dhanteras wishes honoring Bhagwan Dhanvantari, Maa Lakshmi, and Kuber Dev. Share heartfelt prayers for radiant health, prosperity, and cosmic abundance.',
      hi: 'आरोग्य, समृद्धि और नव शुभारंभ का महापर्व — भगवान धन्वंतरि, मां लक्ष्मी और कुबेर देव की कृपा की मंगलकामना करते १०० पावन धनतेरस संदेश। एक क्लिक में कॉपी व शेयर करें।',
      hinglish: 'Dhanteras ke shubh avsar par family aur business contacts ko bhejein shandar shubhkamnayein. Health aur wealth ke liye best Dhanteras wishes, quotes aur status.',
    },
    guideTitle: {
      en: 'Choosing Meaningful Dhanteras Greetings',
      hi: 'धनतेरस पर मंगलमय शुभकामनाएं कैसे चुनें?',
    },
    guideBody: {
      en: 'Dhanteras uniquely blends prayers for vitality (Arogya) through Lord Dhanvantari with prayers for material prosperity through Lord Kuber and Goddess Lakshmi. Choose greetings that highlight both health and lasting happiness.',
      hi: 'धनतेरस महापर्व पर केवल धन ही नहीं, बल्कि उत्तम स्वास्थ्य (आरोग्य) की मंगलकामना करना भी अत्यंत शुभ माना जाता है। अपनों को ऐसे संदेश भेजें जो सुख, समृद्धि और निरोगी काया दोनों का आशीर्वाद दें।',
    },
    internalLinks: [
      { labelEn: 'Dhanteras Festival Guide & Puja Vidhi', labelHi: 'धनतेरस २०२६ पूजन विधि व संदर्शिका', href: '/festivals/dhanteras' },
      { labelEn: 'Diwali Wishes & Greetings', labelHi: 'दीपावली शुभकामनाएं व शायरी', href: '/wishes/diwali' },
      { labelEn: 'Free Festival Card Maker', labelHi: 'फ्री त्योहार कार्ड मेकर', href: '/greeting-cards' },
      { labelEn: 'Rangoli Designs for Deepavali', labelHi: 'दीपावली रंगोली डिजाइन', href: '/rangoli' },
    ],
  },

  diwali: {
    id: 'diwali',
    seoTitle: {
      en: 'Diwali 2026 Best Wishes, Quotes, Status & Greetings in Hindi & English | FestiveWala',
      hi: 'दीपावली २०२६ की सर्वश्रेष्ठ शुभकामनाएं, बधाई संदेश व शायरी | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Curated Diwali wishes, shayari, and status messages for family, friends, and business associates. Free one-click copy and instant WhatsApp sharing.',
      hi: 'दीपावली पर्व पर अपनों को भेजें मंगलमय शुभकामनाएं। परिवार, मित्रों व व्यावसायिक संपर्कों के लिए तैयार सुंदर संदेश, एक क्लिक में कॉपी व शेयर करें।',
    },
    keywords: {
      en: 'Diwali wishes 2026, Deepavali greetings in Hindi, Diwali quotes English, Shubh Deepavali shayari, WhatsApp festival status',
      hi: 'दीपावली शुभकामनाएं २०२६, शुभ दीपावली शायरी, दिवाली बधाई संदेश, लक्ष्मी पूजन कोट्स, हैप्पी दिवाली स्टेटस',
    },
    pageH1: {
      en: 'Diwali Wishes and Greetings (Hindi & English)',
      hi: 'दीपावली शुभकामनाएं, बधाई संदेश व शायरी २०२६',
    },
    pageSubtitle: {
      en: 'Authentic Diwali wishes, inspiring quotes, and WhatsApp status messages for friends and loved ones.',
      hi: 'दीपावली के पावन अवसर पर अपनों को भेजें मंगलमय शुभकामनाएं, सुंदर शायरी और कोट्स।',
    },
    editorialIntro: {
      en: 'Illuminate hearts and homes with curated Diwali wishes celebrating the victory of divine light over darkness. Featuring devotional Lakshmi-Ganesh shlokas, poetic Deepavali shayari, and warm wishes for family and colleagues.',
      hi: 'प्रकाश, वैभव और सद्भावना के महापर्व पर अपनों को भेजें मंगलमय दीपावली शुभकामनाएं। लक्ष्मी-गणेश पूजन, पावन दीपदान व पारिवारिक मिलन के लिए तैयार सुंदर संदेश व शायरी।',
      hinglish: 'Diwali ki roshni aur mithas ke saath apno ko wish karein. Family, friends aur office colleagues ke liye 1-click shareable Diwali quotes aur status.',
    },
    guideTitle: {
      en: 'Sharing Heartfelt Diwali Wishes Across Generations',
      hi: 'दीपावली पर अपनों के लिए सही संदेश कैसे चुनें?',
    },
    guideBody: {
      en: 'Diwali reaches across generations. Traditional shlokas and formal wishes bring joy to elders and clients, while lively shayari and WhatsApp-ready status lines delight friends and family.',
      hi: 'दीपावली पर बुजुर्गों व वरिष्ठों के लिए आदरणीय संस्कृत श्लोक व मंगलकामनाएं उपयुक्त होती हैं, जबकि मित्रों व युवा पीढ़ी के लिए भावनात्मक शायरी व व्हाट्सएप संदेश सबसे अधिक पसंद किए जाते हैं।',
    },
    internalLinks: [
      { labelEn: 'Diwali 2026 Full Celebration Guide', labelHi: 'दीपावली २०२६ संपूर्ण मार्गदर्शिका', href: '/festivals/diwali' },
      { labelEn: 'Dhanteras Wishes Collection', labelHi: 'धनतेरस शुभकामनाएं संग्रह', href: '/wishes/dhanteras' },
      { labelEn: 'Rangoli Patterns for Diwali', labelHi: 'दीपावली रंगोली डिजाइन', href: '/rangoli' },
      { labelEn: 'Create Diwali Greeting Card', labelHi: 'दीपावली ग्रीटिंग कार्ड बनाएं', href: '/greeting-cards' },
    ],
  },

  'chhath-puja': {
    id: 'chhath-puja',
    seoTitle: {
      en: '100 Best Chhath Puja 2026 Wishes, Quotes & Status in Hindi & English | FestiveWala',
      hi: 'छठ पूजा २०२६ की १०० सर्वश्रेष्ठ शुभकामनाएं, संदेश व स्टेटस | फेस्टिववाला',
    },
    seoDesc: {
      en: 'Explore 100 original Chhath Puja 2026 wishes in English, Hindi, and Hinglish covering Nahay Khay, Kharna, Sandhya Arghya, and Usha Arghya. Free 1-click copy & WhatsApp share.',
      hi: 'नहाय-खाय, खरना, संध्या अर्घ्य व उषा अर्घ्य के लिए १०० मौलिक छठ पूजा २०२६ शुभकामनाएं व स्टेटस। हिंदी, अंग्रेजी व हिंग्लिश में तुरंत कॉपी व शेयर करें।',
    },
    keywords: {
      en: 'Chhath Puja wishes 2026, Happy Chhath Puja quotes, Sandhya Arghya wishes, Usha Arghya greetings, Chhath Puja status Hindi English',
      hi: 'छठ पूजा शुभकामनाएं २०२६, शुभ छठ महापर्व संदेश, नहाय खाय बधाई, संध्या अर्घ्य कोट्स, छठी मैया स्टेटस',
    },
    pageH1: {
      en: 'Chhath Puja Wishes and Greetings (100 Best Messages)',
      hi: 'छठ महापर्व २०२६ की पावन शुभकामनाएं व संदेश (१०० संदेश)',
    },
    pageSubtitle: {
      en: 'Curated Chhath Puja wishes across Nahay Khay, Kharna, Sandhya Arghya & Usha Arghya in English, Hindi, and Hinglish.',
      hi: 'सूर्य उपासना व छठी मैया की आस्था को समर्पित १०० मौलिक शुभकामनाएं। परिवार, मित्रों व सहकर्मियों के लिए तुरंत शेयर करें।',
    },
    editorialIntro: {
      en: 'Honor Surya Bhagwan and Chhathi Maiya with 100 curated Chhath Puja wishes across all four sacred days — Nahay Khay, Kharna, Sandhya Arghya, and Usha Arghya Parana. Available in English, Devanagari Hindi, and Hinglish.',
      hi: 'भगवान सूर्यदेव और षष्ठी मैया की पावन आस्था को समर्पित १०० विशेष छठ महापर्व संदेश। नहाय-खाय, खरना, संध्या अर्घ्य और उषा अर्घ्य व पारण की शुभकामनाएं परिवार, मित्रों और दूर बसे अपनों संग साझा करें।',
      hinglish: 'Nahay Khay, Kharna, Sandhya Arghya aur Usha Arghya ke liye 100 best Chhath Puja wishes English, Hindi aur Hinglish mein. 1-click copy karke WhatsApp par share karein.',
    },
    guideTitle: {
      en: 'Sharing Meaningful Chhath Puja Wishes Across the 4 Days',
      hi: 'छठ के चार पावन दिनों के अनुसार सही शुभकामनाएं कैसे चुनें?',
    },
    guideBody: {
      en: 'Chhath Puja unfolds over four distinct stages of purity and devotion: begin with calm Nahay Khay greetings, send encouraging strength wishes for Vratis on Kharna, share reverent river-bank twilight notes for Sandhya Arghya, and celebrate joyous Parana at Usha Arghya.',
      hi: 'छठ महापर्व के चारों दिनों की अपनी विशिष्ट आध्यात्मिक भावना होती है — नहाय-खाय पर सात्विक शुभारंभ की बधाई, खरना पर निर्जला व्रत की शक्ति हेतु प्रार्थना, संध्या अर्घ्य पर अस्ताचल सूर्य को नमन व उषा अर्घ्य पर नव प्रभात की मंगलकामना साझा करें।',
    },
    internalLinks: [
      { labelEn: 'Chhath Puja 2026 Complete Festival Guide', labelHi: 'छठ महापर्व २०२६ संपूर्ण संदर्शिका', href: '/festivals/chhath-puja' },
      { labelEn: 'Chhath Puja Greeting Card Maker', labelHi: 'छठ पूजा ग्रीटिंग कार्ड मेकर', href: '/greetings/chhath-puja' },
      { labelEn: 'Chhath Family Photo Greeting Frames', labelHi: 'छठ पूजा फोटो ग्रीटिंग फ्रेम्स', href: '/photo-greetings/chhath-puja' },
      { labelEn: 'Chhath Ritual & Samagri Guides', labelHi: 'छठ पूजा विधि व सामग्री मार्गदर्शिका', href: '/festival-guides' },
    ],
  },
};

