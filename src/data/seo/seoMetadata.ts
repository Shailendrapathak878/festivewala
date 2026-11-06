import type { MetaTagsConfig } from './types';

export const BASE_URL = 'https://festivewala.in';

export interface RouteSEO {
  en: MetaTagsConfig;
  hi: MetaTagsConfig;
  hinglishKeywords: string[];
}

export const STATIC_ROUTE_SEO: Record<string, RouteSEO> = {
  home: {
    en: {
      title: 'Indian Festival Greetings, Wishes & Cards Online | FestiveWala',
      description: 'Discover Indian festival greetings, create personalized photo cards, explore 600+ heartfelt wishes in Hindi and English, and find traditional Rangoli designs.',
      keywords: 'Indian festival greetings, festival wishes online, festival greeting cards, Indian festival wishes, festival wishes in Hindi and English, Diwali wishes, Dhanteras greetings',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'भारतीय त्योहार शुभकामनाएं, ग्रीटिंग कार्ड व विचार | फेस्टिववाला',
      description: 'भारतीय त्योहारों के लिए सुंदर शुभकामनाएं, अपने फोटो के साथ ग्रीटिंग कार्ड बनाएं, ६००+ पावन संदेश और पारंपरिक रंगोली व गृह सज्जा विचार पाएं।',
      keywords: 'भारतीय त्योहार, त्योहार शुभकामनाएं, ग्रीटिंग कार्ड बनाएं, त्योहार संदेश हिंदी में, दिवाली शुभकामनाएं, धनतेरस बधाई',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: [
      'Indian festival greetings',
      'festival wishes Hindi mein',
      'photo wala greeting card kaise banaye',
      'festival greetings online free',
      'rangoli design simple',
    ],
  },

  festivals: {
    en: {
      title: 'Festival Experiences & Sacred Traditions | FestiveWala Festival Directory',
      description: 'Explore comprehensive guides to Indian festivals: auspicious tithis, sacred rituals, authentic recipes, festive home decor, and personalized greetings.',
      keywords: 'Indian festival calendar 2026, Diwali, Holi, Raksha Bandhan, Christmas, New Year, sacred rituals, festive recipes',
      canonicalUrl: `${BASE_URL}/festivals`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivals.png`,
    },
    hi: {
      title: 'भारतीय पावन पर्व व उत्सव निर्देशिका | फेस्टिववाला',
      description: 'भारत के प्रमुख त्योहारों की पावन परंपराएं, शुभ मुहूर्त, पारंपरिक व्यंजन, गृह सज्जा और विशेष शुभकामनाओं का संपूर्ण संग्रह।',
      keywords: 'भारतीय पर्व २०२६, दिवाली, होली, रक्षाबंधन, क्रिसमस, नव वर्ष, त्योहार पूजन विधि, पारंपरिक पकवान',
      canonicalUrl: `${BASE_URL}/festivals`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivals.png`,
    },
    hinglishKeywords: [
      'Indian festivals dates 2026',
      'tyohar kab hai',
      'festival list India',
      'puja muhurat aur vidhi',
    ],
  },

  rangoli: {
    en: {
      title: 'Rangoli Designs for Diwali — Simple & Easy Patterns | FestiveWala',
      description: 'Explore simple and easy Rangoli designs for Diwali. Traditional dot patterns, floral kolam, beginner step-by-step guides, and free vector SVG/PNG downloads.',
      keywords: 'Rangoli designs for Diwali, simple rangoli designs, easy rangoli designs for home, Diwali rangoli designs, kolam patterns, flower rangoli, peacock rangoli',
      canonicalUrl: `${BASE_URL}/rangoli`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-rangoli.png`,
    },
    hi: {
      title: 'दिवाली के लिए रंगोली डिजाइन — सरल व सुंदर पैटर्न | फेस्टिववाला',
      description: 'दिवाली के लिए सरल और सुंदर रंगोली डिजाइन खोजें। पारंपरिक बिंदू रंगोली, फूलों के कोलम, शुरुआती निर्देश और मुफ्त एचडी डाउनलोड।',
      keywords: 'दिवाली रंगोली डिजाइन, सरल रंगोली, घर के लिए रंगोली, फूलों की रंगोली, कोलम पैटर्न',
      canonicalUrl: `${BASE_URL}/rangoli`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-rangoli.png`,
    },
    hinglishKeywords: [
      'Simple rangoli designs for Diwali',
      'easy rangoli designs for home',
      'Diwali rangoli photo download',
      'rangoli design simple',
    ],
  },

  decorations: {
    en: {
      title: 'Festive Home Decoration Ideas — Diyas & Eco-Friendly DIY | FestiveWala',
      description: 'Discover creative festive home decoration ideas across 10 categories: balcony fairy lights, entrance torans, hand-painted diyas, and sustainable DIY decor.',
      keywords: 'festive home decoration ideas, Diwali home decor, balcony lights, diy paper decor, eco friendly decoration, entrance toran ideas',
      canonicalUrl: `${BASE_URL}/decoration-ideas`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-decorations.png`,
    },
    hi: {
      title: 'त्योहार गृह सज्जा विचार — दीये, लाइट्स व इको-फ्रेंडली DIY | फेस्टिववाला',
      description: 'त्योहारों पर घर सजाने के १० सुंदर विचार: बालकनी लाइट्स, प्रवेश द्वार तोरण, हस्तनिर्मित दीये और पर्यावरण-अनुकूल सजावट।',
      keywords: 'त्योहार घर सजावट, दिवाली डेकोरेशन, बालकनी लाइट सजावट, तोरण डिजाइन, इको फ्रेंडली सजावट',
      canonicalUrl: `${BASE_URL}/decoration-ideas`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-decorations.png`,
    },
    hinglishKeywords: [
      'Diwali decoration kaise kare',
      'home decor ideas for festival',
      'balcony sajawat ideas',
      'eco friendly diwali decoration',
    ],
  },

  gifts: {
    en: {
      title: 'Diwali Gift Ideas for Family, Friends & Corporate | FestiveWala',
      description: 'Explore thoughtful Diwali gift ideas across 5 budget tiers (Under ₹250 to ₹2,500+) and 10 recipient categories for family, friends, and corporate gifting.',
      keywords: 'Diwali gift ideas, Diwali gifts for family, Diwali gift ideas for friends, traditional Diwali gifts, corporate Diwali gifts, festive gifting India',
      canonicalUrl: `${BASE_URL}/gift-ideas`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-gifts.png`,
    },
    hi: {
      title: 'दिवाली गिफ्ट आइडियाज — परिवार व मित्रों के लिए उपहार | फेस्टिववाला',
      description: 'दिवाली के लिए श्रेष्ठ उपहार विचार: ५ बजट श्रेणियों और १० रिश्तों के अनुसार विचारशील उपहार और पारंपरिक मिष्ठान सुझाव।',
      keywords: 'दिवाली गिफ्ट आइडियाज, परिवार के लिए दिवाली उपहार, दोस्तों के लिए दिवाली गिफ्ट, कॉर्पोरेट दिवाली गिफ्ट',
      canonicalUrl: `${BASE_URL}/gift-ideas`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-gifts.png`,
    },
    hinglishKeywords: [
      'Diwali gift ideas',
      'Diwali gifts for family',
      'Diwali par kya gift dein',
      'festival gift hampers',
    ],
  },

  guides: {
    en: {
      title: 'Indian Festivals and Traditions — Authentic Cultural Guides | FestiveWala',
      description: 'In-depth cultural guides to Indian festivals and traditions: festival significance, auspicious dates, ritual timelines, authentic festive cuisine, and eco-tips.',
      keywords: 'Indian festivals and traditions, Indian festival information, festival significance, Indian festival dates and celebrations, sacred rituals India',
      canonicalUrl: `${BASE_URL}/festival-guides`,
      ogType: 'article',
      ogImage: `${BASE_URL}/assets/brand/og-guides.png`,
    },
    hi: {
      title: 'भारतीय त्योहार व परंपराएं — प्रामाणिक सांस्कृतिक गाइड | फेस्टिववाला',
      description: 'भारतीय त्योहारों और परंपराओं की विस्तृत सांस्कृतिक मार्गदर्शिका: त्योहारों का महत्व, शुभ तिथियां, पूजन विधि, पारंपरिक पकवान व पर्यावरण-अनुकूल उत्सव।',
      keywords: 'भारतीय त्योहार और परंपराएं, भारतीय त्योहार जानकारी, त्योहार का महत्व, त्योहार तिथि व उत्सव',
      canonicalUrl: `${BASE_URL}/festival-guides`,
      ogType: 'article',
      ogImage: `${BASE_URL}/assets/brand/og-guides.png`,
    },
    hinglishKeywords: [
      'Indian festivals and traditions',
      'festival significance Hindi mein',
      'Indian festival dates and celebrations',
      'tyohar kyu manate hain',
    ],
  },

  inspiration: {
    en: {
      title: 'Indian Festive Inspiration & Cultural Heritage Hub | FestiveWala',
      description: 'Timeless Indian festive inspiration: handcrafted Rangoli patterns, eco-friendly home styling, meaningful gifts, and insightful cultural essays.',
      keywords: 'Indian festive inspiration, Rangoli ideas, Diwali home decor, traditional festival gifts, cultural heritage India',
      canonicalUrl: `${BASE_URL}/inspiration`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'सांस्कृतिक प्रेरणा व उत्सव संदर्शिका | फेस्टिववाला',
      description: 'भारतीय त्योहारों के लिए प्रेरणा का समृद्ध केंद्र: रंगोली डिजाइन, इको-फ्रेंडली गृह सज्जा, विचारशील उपहार और सांस्कृतिक निबंध।',
      keywords: 'उत्सव प्रेरणा, रंगोली कला, गृह सज्जा विचार, उपहार गाइड, सांस्कृतिक दर्शन',
      canonicalUrl: `${BASE_URL}/inspiration`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: [
      'festival inspiration ideas',
      'rangoli aur decor inspiration',
      'cultural festival guide India',
    ],
  },

  wishes: {
    en: {
      title: 'Festival Wishes in Hindi and English (600+ Best Quotes) | FestiveWala',
      description: 'Explore 600+ festival wishes in Hindi and English. Heartfelt messages for family and friends for Diwali, Dhanteras, Holi, and New Year. One-click copy & share.',
      keywords: 'festival wishes in Hindi and English, festival wishes for family, festival wishes for friends, Hindi festival wishes, Hinglish festival wishes, Diwali wishes, Dhanteras messages',
      canonicalUrl: `${BASE_URL}/wishes`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-wishes.png`,
    },
    hi: {
      title: 'त्योहार शुभकामनाएं हिंदी व अंग्रेजी में (६००+ श्रेष्ठ संदेश) | फेस्टिववाला',
      description: 'हिंदी और अंग्रेजी में ६००+ पावन त्योहार शुभकामनाएं। परिवार व मित्रों के लिए दिवाली, धनतेरस, होली और नव वर्ष के सुंदर संदेश। एक क्लिक में कॉपी व शेयर करें।',
      keywords: 'त्योहार शुभकामनाएं हिंदी अंग्रेजी, परिवार के लिए शुभकामनाएं, दोस्तों के लिए बधाई, हिंदी शायरी, दिवाली संदेश',
      canonicalUrl: `${BASE_URL}/wishes`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-wishes.png`,
    },
    hinglishKeywords: [
      'festival wishes in Hindi and English',
      'festival wishes for family',
      'festival wishes for friends',
      'Hindi festival wishes',
      'Hinglish festival wishes',
    ],
  },

  greetingCards: {
    en: {
      title: 'Free Online Greeting Card Maker with Photo & Name | FestiveWala',
      description: 'Free online greeting card maker. Create personalized festival cards with your photo and name. 100+ templates for Diwali, Dhanteras, and Holi. 100% private, instant download.',
      keywords: 'free online greeting card maker, create greeting cards online, personalized festival greeting cards, festival card maker with photo, free online festival card creator, Diwali card maker',
      canonicalUrl: `${BASE_URL}/greeting-cards`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-studio.png`,
    },
    hi: {
      title: 'फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर — फोटो व नाम सहित | फेस्टिववाला',
      description: 'फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर: अपनी फोटो और नाम के साथ सुंदर त्योहार कार्ड बनाएं। दिवाली, धनतेरस और सभी पर्वों के लिए १००+ टेम्प्लेट। १००% सुरक्षित व मुफ्त।',
      keywords: 'फ्री ग्रीटिंग कार्ड मेकर, ऑनलाइन ग्रीटिंग कार्ड बनाएं, फोटो वाला त्योहार कार्ड, दिवाली कार्ड मेकर ऑनलाइन',
      canonicalUrl: `${BASE_URL}/greeting-cards`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-studio.png`,
    },
    hinglishKeywords: [
      'free online greeting card maker',
      'create greeting cards online',
      'festival card maker with photo',
      'photo wala greeting card kaise banaye',
      'personalized festival greeting cards',
    ],
  },

  about: {
    en: {
      title: 'About FestiveWala — Indian Festival Celebration & Heritage Platform',
      description: 'Discover the mission, cultural philosophy, and craftsmanship behind FestiveWala — celebrating Indian festivals through art, wishes, and digital tools.',
      keywords: 'about FestiveWala, Indian festivals platform, festive greetings mission, Indian cultural traditions',
      canonicalUrl: `${BASE_URL}/about`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'हमारे बारे में — फेस्टिववाला | भारतीय त्योहार उत्सव व संस्कृति मंच',
      description: 'फेस्टिववाला के मिशन, संस्कृति दर्शन और भारतीय त्योहारों को डिजिटल युग में जीवंत बनाए रखने की हमारी यात्रा के बारे में जानें।',
      keywords: 'फेस्टिववाला के बारे में, भारतीय संस्कृति, त्योहार मंच, भारतीय पर्व परंपराएं',
      canonicalUrl: `${BASE_URL}/about`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: ['FestiveWala ke baare mein', 'Indian festival platform kya hai'],
  },

  contact: {
    en: {
      title: 'Contact Us — FestiveWala Support & Feedback',
      description: 'Get in touch with the FestiveWala team for feedback, festival collaborations, editorial queries, or technical support.',
      keywords: 'contact FestiveWala, festival support, feedback, festive collaboration',
      canonicalUrl: `${BASE_URL}/contact`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'संपर्क करें — फेस्टिववाला सहायता व फीडबैक',
      description: 'फेस्टिववाला टीम से संपर्क करें। किसी भी प्रश्न, सुझाव, सांस्कृतिक सहयोग अथवा तकनीकी सहायता के लिए हमें लिखें।',
      keywords: 'फेस्टिववाला संपर्क, सहायता, सुझाव, कस्टमर सपोर्ट',
      canonicalUrl: `${BASE_URL}/contact`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: ['FestiveWala se contact kaise karein', 'FestiveWala helpline email'],
  },

  privacyPolicy: {
    en: {
      title: 'Privacy Policy — 100% Client-Side Private Photo Greeting Card Generation | FestiveWala',
      description: 'Learn how FestiveWala protects your privacy. Zero server photo uploads, 100% client-side browser rendering, transparent local storage usage.',
      keywords: 'privacy policy FestiveWala, photo privacy guarantee, client-side rendering privacy, DPDP act India',
      canonicalUrl: `${BASE_URL}/privacy-policy`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'गोपनीयता नीति — १००% सुरक्षित व निजी फोटो ग्रीटिंग निर्माण | फेस्टिववाला',
      description: 'जानें कि फेस्टिववाला आपकी गोपनीयता की रक्षा कैसे करता है। कोई सर्वर फोटो अपलोड नहीं, १००% ब्राउज़र-आधारित निजी निर्माण।',
      keywords: 'गोपनीयता नीति, फोटो प्राइवेसी, डेटा सुरक्षा, फेस्टिववाला प्राइवेसी',
      canonicalUrl: `${BASE_URL}/privacy-policy`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: ['FestiveWala privacy policy', 'photo upload safe hai ya nahi'],
  },

  termsOfService: {
    en: {
      title: 'Terms of Service — Personal Use Guidelines | FestiveWala',
      description: 'Read the terms and conditions for using FestiveWala greeting card templates, wishes library, and festival resources for personal celebrations.',
      keywords: 'terms of service FestiveWala, usage terms, free personal license, festival greetings license',
      canonicalUrl: `${BASE_URL}/terms-of-service`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'सेवा की शर्तें — व्यक्तिगत उपयोग दिशानिर्देश | फेस्टिववाला',
      description: 'फेस्टिववाला के ग्रीटिंग टेम्प्लेट, शुभकामना संदेश व त्योहार सामग्री के व्यक्तिगत उपयोग के नियम व शर्तें।',
      keywords: 'सेवा की शर्तें, नियम व शर्तें, फेस्टिववाला उपयोग नियम',
      canonicalUrl: `${BASE_URL}/terms-of-service`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: ['FestiveWala terms of service', 'kya greeting card free hai'],
  },

  disclaimer: {
    en: {
      title: 'Disclaimer — Cultural, Panchang & Safety Information | FestiveWala',
      description: 'Important cultural, astrological Panchang variations, festival safety advisories, and recipe allergen notices for FestiveWala visitors.',
      keywords: 'disclaimer FestiveWala, panchang variation, diya fire safety, food allergy advisory',
      canonicalUrl: `${BASE_URL}/disclaimer`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'अस्वीकरण — सांस्कृतिक, पंचांग व सुरक्षा संबंधी सूचनाएं | फेस्टिववाला',
      description: 'फेस्टिववाला उपयोगकर्ताओं के लिए महत्वपूर्ण सांस्कृतिक, क्षेत्रीय पंचांग भेद, त्योहार सुरक्षा व पारंपरिक पकवान संबंधी अस्वीकरण।',
      keywords: 'अस्वीकरण, पंचांग भेद, सुरक्षा नियम, फेस्टिववाला डिस्क्लेमर',
      canonicalUrl: `${BASE_URL}/disclaimer`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: ['FestiveWala disclaimer', 'puja time sahi hai ya nahi'],
  },
};

