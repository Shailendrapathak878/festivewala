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
      title: 'FestiveWala — Celebrate Indian Festivals with Greetings, Wishes & Decor Ideas',
      description: 'Discover Indian festivals, craft personalized photo greeting cards, explore 300+ heartfelt wishes, and find traditional Rangoli and home decoration inspiration.',
      keywords: 'Indian festivals, Diwali wishes, Holi celebration, festival greeting cards, Rangoli designs, festival decoration ideas, gift ideas India',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'फेस्टिववाला — भारतीय त्योहार, ग्रीटिंग कार्ड, शुभकामनाएं और सजावट',
      description: 'भारतीय पावन पर्वों का संपूर्ण उत्सव मंच। अपने फोटो के साथ ग्रीटिंग कार्ड बनाएं, ३००+ सुंदर संदेश खोजें और रंगोली व गृह सज्जा के नए विचार पाएं।',
      keywords: 'भारतीय त्योहार, दिवाली की शुभकामनाएं, होली का त्योहार, त्योहार ग्रीटिंग कार्ड, रंगोली डिजाइन, घर की सजावट, उपहार विचार',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hinglishKeywords: [
      'FestiveWala greetings',
      'festival wishes Hindi mein',
      'photo wala greeting card kaise banaye',
      'rangoli design simple',
      'ghar ki sajawat ideas',
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
      title: 'Free Rangoli Designs Gallery — Traditional, Floral & Geometric Patterns | FestiveWala',
      description: 'Explore 8+ handcrafted procedural Rangoli designs with difficulty ratings, materials checklist, step-by-step guides, and free vector SVG and HD PNG downloads.',
      keywords: 'rangoli designs, diwali rangoli, kolam patterns, flower rangoli, simple rangoli for beginners, peacock rangoli, download rangoli designs',
      canonicalUrl: `${BASE_URL}/rangoli`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-rangoli.png`,
    },
    hi: {
      title: 'सुंदर रंगोली डिजाइन गैलरी — पारंपरिक, पुष्प व ज्यामितीय पैटर्न | फेस्टिववाला',
      description: 'सरल और आकर्षक रंगोली डिजाइन खोजें। सामग्री सूची, चरणबद्ध निर्देश और निःशुल्क वेक्टर एसवीजी व एचडी पीएनजी डाउनलोड के साथ।',
      keywords: 'रंगोली डिजाइन, दिवाली रंगोली, कोलम, फूलों की रंगोली, सरल रंगोली, मोर रंगोली, रंगोली फोटो डाउनलोड',
      canonicalUrl: `${BASE_URL}/rangoli`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-rangoli.png`,
    },
    hinglishKeywords: [
      'Simple rangoli designs',
      'Diwali rangoli photo download',
      'kolam design kaise banaye',
      'rangoli design for beginners with dots',
    ],
  },

  decorations: {
    en: {
      title: 'Festive Decoration Ideas — Home, Diwali, Balcony & Eco-Friendly DIY | FestiveWala',
      description: 'Curated home and festival decoration ideas across 10 categories. Includes required materials, time estimates, step-by-step instructions, and expert styling tips.',
      keywords: 'festival decoration ideas, diwali home decor, eco friendly decoration, balcony lights, diy paper decor, entrance toran ideas',
      canonicalUrl: `${BASE_URL}/decoration-ideas`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-decorations.png`,
    },
    hi: {
      title: 'त्योहार गृह सज्जा के विचार — दिवाली, बालकनी व पर्यावरण-अनुकूल DIY | फेस्टिववाला',
      description: '१० श्रेणियों में घर और कार्यस्थल की सुंदर सजावट के विचार। आवश्यक सामग्री, समय और चरणबद्ध मार्गदर्शन के साथ।',
      keywords: 'त्योहार सजावट, दिवाली घर सजावट, बालकनी लाइट डेकोरेशन, तोरण डिजाइन, इको फ्रेंडली सजावट',
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
      title: 'Festival Gift Ideas — Curated Gifts for Family, Friends & Corporate | FestiveWala',
      description: 'Browse thoughtful festive gift recommendations across 5 budget tiers (Under ₹250 to ₹2,500+) and 10 recipient categories with personalized DIY tips.',
      keywords: 'festival gift ideas, diwali gifts, rakhi gifts for sister, secret santa gifts, corporate festival gifting, budget gifts under 500',
      canonicalUrl: `${BASE_URL}/gift-ideas`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-gifts.png`,
    },
    hi: {
      title: 'त्योहार उपहार मार्गदर्शिका — परिवार, मित्रों व सहकर्मियों के लिए श्रेष्ठ गिफ्ट | फेस्टिववाला',
      description: '५ बजट श्रेणियों (₹२५० से ₹२,५००+) और १० रिश्तों के अनुसार विचारशील उपहार सुझाव। व्यक्तिगत आत्मीयता के सुझावों के साथ।',
      keywords: 'त्योहार उपहार, दिवाली गिफ्ट, राखी पर बहन के लिए उपहार, सीक्रेट सांता गिफ्ट, कम बजट में गिफ्ट',
      canonicalUrl: `${BASE_URL}/gift-ideas`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-gifts.png`,
    },
    hinglishKeywords: [
      'Diwali par kya gift dein',
      'Rakhi gift for sister under 1000',
      'Secret Santa gift ideas',
      'festival gift hampers',
    ],
  },

  guides: {
    en: {
      title: 'Festival Guides & Cultural Heritage — Traditions, Food & Eco-Celebrations | FestiveWala',
      description: 'In-depth cultural and practical guides: festive home decluttering, DIY organic herbal colors, Navratri rituals, and zero-waste sustainable celebrations.',
      keywords: 'festival guides, diwali cleaning guide, how to make herbal gulal, navratri fasting rules, zero waste festival celebration',
      canonicalUrl: `${BASE_URL}/festival-guides`,
      ogType: 'article',
      ogImage: `${BASE_URL}/assets/brand/og-guides.png`,
    },
    hi: {
      title: 'त्योहार ज्ञान व संस्कृति संदर्शिका — परंपराएं, खानपान व हरित उत्सव | फेस्टिववाला',
      description: 'विस्तृत सांस्कृतिक और व्यावहारिक मार्गदर्शिका: दिवाली घर की तैयारी, प्राकृतिक हर्बल गुलाल, नवरात्रि व्रत नियम और पर्यावरण-अनुकूल उत्सव।',
      keywords: 'त्योहार गाइड, दिवाली सफाई टिप्स, हर्बल रंग बनाने की विधि, नवरात्रि पूजन विधि, हरित दिवाली',
      canonicalUrl: `${BASE_URL}/festival-guides`,
      ogType: 'article',
      ogImage: `${BASE_URL}/assets/brand/og-guides.png`,
    },
    hinglishKeywords: [
      'Diwali ki safai kaise karein',
      'organic gulal ghar par kaise banaye',
      'navratri vrat niyam',
      'green diwali celebration ideas',
    ],
  },

  inspiration: {
    en: {
      title: 'Festive Inspiration & Cultural Heritage — Rangoli, Decor, Gifts & Essays | FestiveWala',
      description: 'Discover timeless Indian festive inspiration: handcrafted Rangoli patterns, eco-friendly home styling, meaningful gifts, and cultural essays.',
      keywords: 'Indian festival inspiration, Rangoli ideas, Diwali home decor, traditional festival gifts, festival essays, cultural heritage India',
      canonicalUrl: `${BASE_URL}/inspiration`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-festivewala.png`,
    },
    hi: {
      title: 'सांस्कृतिक प्रेरणा व कला संदर्शिका — रंगोली, गृह सज्जा, उपहार व विचार | फेस्टिववाला',
      description: 'भारतीय त्योहारों के लिए प्रेरणा का समृद्ध केंद्र: रंगोली डिजाइन, इको-फ्रेंडली गृह सज्जा, विचारशील उपहार और सांस्कृतिक निबंधों का सुंदर संग्रह।',
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
      title: '300+ Readymade Festival Wishes, Quotes & Shayari in Hindi and English | FestiveWala',
      description: 'Explore 300+ warm, emotional, and heartfelt wishes for Diwali, Holi, Raksha Bandhan, New Year and more. One-click copy and instant WhatsApp share.',
      keywords: 'festival wishes, diwali wishes in hindi, holi quotes, raksha bandhan messages, new year wishes whatsapp status, festival shayari',
      canonicalUrl: `${BASE_URL}/wishes`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-wishes.png`,
    },
    hi: {
      title: '३००+ पावन त्योहार शुभकामनाएं, सुविचार व शायरी (हिंदी व अंग्रेजी) | फेस्टिववाला',
      description: 'दिवाली, होली, रक्षाबंधन, नव वर्ष और सभी पर्वों के लिए ३००+ भावपूर्ण और सुंदर शुभकामना संदेश। एक क्लिक में कॉपी और व्हाट्सएप पर शेयर करें।',
      keywords: 'त्योहार शुभकामनाएं, दिवाली शुभकामना संदेश, होली शायरी, रक्षाबंधन कोट्स, नव वर्ष बधाई संदेश',
      canonicalUrl: `${BASE_URL}/wishes`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-wishes.png`,
    },
    hinglishKeywords: [
      'Diwali ki shubhkamnaye messages',
      'Holi wishes Hindi mein',
      'Raksha bandhan quotes for brother sister',
      'Naye saal ki shayari status',
    ],
  },

  greetingCards: {
    en: {
      title: 'Free Festival Greeting Card Maker — Simple & Photo Wishes Studio | FestiveWala',
      description: 'Create customized festival greeting cards with your name and photos. 100+ luxury templates for Diwali, Holi, Christmas, and New Year. 100% private, client-side rendering.',
      keywords: 'online greeting card maker, diwali greeting card with photo, customized festive wishes, photo greeting card download, whatsapp greeting maker',
      canonicalUrl: `${BASE_URL}/greeting-cards`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-studio.png`,
    },
    hi: {
      title: 'त्योहार ग्रीटिंग कार्ड मेकर — सिंपल व फोटो विशेज स्टूडियो | फेस्टिववाला',
      description: 'अपने नाम और परिवार की फोटो के साथ सुंदर ग्रीटिंग कार्ड बनाएं। १००+ प्रीमियम टेम्प्लेट, १००% सुरक्षित एवं निजी, उच्च गुणवत्ता में मुफ्त डाउनलोड।',
      keywords: 'ग्रीटिंग कार्ड बनाएं, दिवाली फोटो कार्ड, अपने नाम का त्योहार कार्ड, व्हाट्सएप ग्रीटिंग कार्ड डाउनलोड',
      canonicalUrl: `${BASE_URL}/greeting-cards`,
      ogType: 'website',
      ogImage: `${BASE_URL}/assets/brand/og-studio.png`,
    },
    hinglishKeywords: [
      'Online greeting card maker free',
      'photo wala diwali greeting card',
      'apne naam ka card kaise banaye',
      'festival greeting card download for whatsapp',
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

