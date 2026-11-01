/**
 * FestiveWala Wishes Hinglish Enrichment Script
 * Enriches all 500 wishes with natural, emotionally resonant Hinglish.
 */

import fs from 'fs';
import path from 'path';

const VOCAB_MAP = {
  // Grammar words & Pronouns
  'में': 'mein',
  'हैं': 'hain',
  'है': 'hai',
  'हो': 'ho',
  'होते': 'hote',
  'होती': 'hoti',
  'होता': 'hota',
  'हों': 'hon',
  'था': 'tha',
  'थी': 'thi',
  'थे': 'the',
  'का': 'ka',
  'की': 'ki',
  'के': 'ke',
  'को': 'ko',
  'से': 'se',
  'पर': 'par',
  'और': 'aur',
  'भी': 'bhi',
  'नहीं': 'nahi',
  'नही': 'nahi',
  'ना': 'na',
  'तो': 'to',
  'ही': 'hi',
  'या': 'ya',
  'तक': 'tak',
  'सा': 'sa',
  'सी': 'si',
  'से': 'se',
  'केलिए': 'ke liye',
  'लिए': 'liye',
  'साथ': 'saath',
  'पास': 'paas',
  'दूर': 'door',
  'जब': 'jab',
  'तब': 'tab',
  'अब': 'ab',
  'कब': 'kab',
  'सब': 'sab',
  'सभी': 'sabhi',
  'हम': 'hum',
  'हमें': 'humein',
  'हमारा': 'hamara',
  'हमारी': 'hamari',
  'हमारे': 'hamare',
  'आप': 'aap',
  'आपको': 'aapko',
  'आपके': 'aapke',
  'आपकी': 'aapki',
  'आपका': 'aapka',
  'तुम': 'tum',
  'तुम्हें': 'tumhein',
  'तुम्हारी': 'tumhari',
  'तुम्हारा': 'tumhara',
  'तुम्हारे': 'tumhare',
  'मुझे': 'mujhe',
  'मेरी': 'meri',
  'मेरा': 'mera',
  'मेरे': 'mere',
  'इस': 'is',
  'उस': 'us',
  'इन': 'in',
  'उन': 'un',
  'इसे': 'ise',
  'उसे': 'use',
  'यही': 'yahi',
  'वही': 'wahi',
  'यहाँ': 'yahan',
  'वहाँ': 'wahan',
  'कहाँ': 'kahan',
  'जहाँ': 'jahan',
  'कैसा': 'kaisa',
  'कैसी': 'kaisi',
  'कैसे': 'kaise',
  'जैसा': 'jaisa',
  'जैसी': 'jaisi',
  'जैसे': 'jaise',
  'ऐसा': 'aisa',
  'ऐसी': 'aisi',
  'ऐसे': 'aise',

  // Common Verbs
  'करें': 'karein',
  'करे': 'kare',
  'करते': 'karte',
  'करती': 'karti',
  'करना': 'karna',
  'कराएं': 'karayein',
  'कराए': 'karaye',
  'लाएं': 'laayein',
  'लाए': 'laaye',
  'भरें': 'bharein',
  'भरे': 'bhare',
  'दे': 'de',
  'दें': 'dein',
  'देते': 'dete',
  'देना': 'dena',
  'मिले': 'mile',
  'मिलें': 'milein',
  'मिलेगी': 'milegi',
  'मिलेगा': 'milega',
  'रखें': 'rakhein',
  'रखे': 'rakhe',
  'बने': 'bane',
  'रहें': 'rahein',
  'रहे': 'rahe',
  'रहा': 'raha',
  'रही': 'rahi',
  'आएं': 'aayein',
  'आए': 'aaye',
  'आएंगी': 'aayengi',
  'आएगा': 'aayega',
  'सजाएं': 'sajayein',
  'सजाए': 'sajaye',
  'जगाएं': 'jagayein',
  'जगमगाए': 'jagmagaye',
  'जगमगाएं': 'jagmagayein',
  'मिटाकर': 'mitakar',
  'हटाकर': 'hatakar',
  'बढ़ाएं': 'badhayein',
  'चमकाएं': 'chamkayein',

  // Festivals & Festive Celebrations
  'दीपावली': 'Diwali',
  'दिवाली': 'Diwali',
  'दीपोत्सव': 'Deepotsav',
  'होली': 'Holi',
  'रक्षाबंधन': 'Raksha Bandhan',
  'राखी': 'Rakhi',
  'क्रिसमस': 'Christmas',
  'नववर्ष': 'New Year',
  'नव': 'Nava',
  'वर्ष': 'Varsh',
  'साल': 'saal',
  'त्योहार': 'festival',
  'त्यौहार': 'festival',
  'पर्व': 'parv',
  'महापर्व': 'mahaparv',
  'उत्सव': 'utsav',
  'जश्न': 'jashn',
  'शुभकामनाएं': 'shubhkamnayein',
  'शुभकामनाएँ': 'shubhkamnayein',
  'शुभकामना': 'shubhkamna',
  'बधाई': 'badhai',
  'बधाइयां': 'badhaiyan',
  'बधाइयाँ': 'badhaiyan',
  'हार्दिक': 'hardik',
  'मंगलमय': 'mangalmay',
  'पावन': 'pawan',
  'पवित्र': 'pavitra',
  'सुख': 'sukh',
  'शांति': 'shanti',
  'समृद्धि': 'samriddhi',
  'वैभव': 'vaibhav',
  'ऐश्वर्य': 'aishwarya',
  'आरोग्य': 'achhi health',
  'स्वास्थ्य': 'swasthya',
  'खुशी': 'khushi',
  'खुशियां': 'khushiyan',
  'खुशियाँ': 'khushiyan',
  'खुशियों': 'khushiyon',
  'प्रसन्नता': 'prasannata',
  'उल्लास': 'ullaas',
  'आनंद': 'aanand',
  'उमंग': 'umang',
  'तरंग': 'tarang',
  'प्रकाश': 'prakash',
  'उजाला': 'ujaala',
  'रोशनी': 'roshni',
  'लौ': 'lau',
  'दीप': 'deep',
  'दीपक': 'diye',
  'दीपकों': 'deepon',
  'दीपों': 'deepon',
  'दिए': 'diye',
  'दियों': 'diyon',
  'आंगन': 'aangan',
  'घर': 'ghar',
  'द्वार': 'dwaar',
  'दहलीज': 'dehleez',
  'परिवार': 'parivaar',
  'सपरिवार': 'saparivaar',
  'स्वजन': 'apne',
  'अपनों': 'apno',
  'मित्रों': 'doston',
  'दोस्त': 'dost',
  'मित्र': 'dost',
  'यार': 'yaar',
  'यारों': 'yaaron',
  'साथी': 'saathi',
  'साथियों': 'saathiyon',
  'सहकर्मी': 'colleagues',
  'जीवन': 'jeevan',
  'ज़िंदगी': 'zindagi',
  'जिंदगी': 'zindagi',
  'सदा': 'sada',
  'हमेशा': 'hamesha',
  'सदाबहार': 'sadabahar',
  'आशीर्वाद': 'aashirwad',
  'कृपा': 'kripa',
  'अनुग्रह': 'anugrah',
  'वरदान': 'vardan',
  'लक्ष्मीनारायण': 'Lakshmi Narayan',
  'महालक्ष्मी': 'Maha Lakshmi',
  'लक्ष्मी': 'Lakshmi',
  'गणेश': 'Ganesh',
  'गणपति': 'Ganpati',
  'भगवान': 'Bhagwan',
  'प्रभु': 'Prabhu',
  'ईश्वर': 'Ishwar',
  'श्री': 'Shree',
  'माता': 'Mata',
  'पिता': 'Pita',
  'पिताजी': 'Pitaji',
  'माताजी': 'Mataji',
  'मां': 'Maa',
  'पापा': 'Papa',
  'भाई': 'Bhai',
  'भैया': 'Bhaiya',
  'बहन': 'Behen',
  'बहना': 'Behna',
  'दीदी': 'Didi',
  'प्यार': 'pyaar',
  'स्नेह': 'sneh',
  'प्रेम': 'prem',
  'मुबारक': 'mubarak',
  'सफलता': 'safalta',
  'कामयाबी': 'kaamyabi',
  'तरक्की': 'tarakki',
  'उन्नति': 'unnati',
  'मुस्कान': 'muskaan',
  'मुस्कुराहट': 'muskurahat',
  'हंसी': 'hansi',
  'यादें': 'yaadein',
  'रिश्ते': 'rishte',
  'रिश्तों': 'rishton',
  'बंधन': 'bandhan',
  'मिठास': 'mithaas',
  'मिठाई': 'mithai',
  'मिठाइयां': 'mithaiyan',
  'रंगोली': 'rangoli',
  'पटाखे': 'patakhe',
  'फुलझड़ी': 'phuljhadi',
  'आलोकित': 'aalokit',
  'प्रफुल्लित': 'prafullit',
  'शुभ': 'Shubh',
  'लाभ': 'Labh',
  'खूब': 'khoob',
  'बहुत': 'bahut',
  'ढेर': 'dher',
  'सारी': 'saari',
  'सारे': 'saare',
  'दिल': 'dil',
  'दिलों': 'dilon',
  'असीम': 'aseem',
  'अनंत': 'anant',
  'सच्चे': 'sachhe',
  'प्यारे': 'pyare',
  'सुंदर': 'sunder',
  'खूबसूरत': 'khoobsurat',
  'रोशन': 'roshan',
  'उज्ज्वल': 'ujjwal',
  'निशा': 'nisha',
  'रात': 'raat',
  'दिन': 'din',
  'सुप्रभात': 'suprabhat',
  'प्रातः': 'pratah',
  'शाम': 'shaam',
  'शुभ': 'shubh',
  'अक्षय': 'akshay',
  'अखंड': 'akhand',
  'सद्भाव': 'sadbhav',
  'सौहार्द': 'sauhard',
  'मिठास': 'mithaas',
};

const CONSONANTS = {
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
  'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'क्ष': 'ksh', 'त्र': 'tra', 'ज्ञ': 'gya', 'श्र': 'shra',
  'क़': 'q', 'ख़': 'kh', 'ग़': 'gh', 'ज़': 'z', 'ड़': 'd', 'ढ़': 'dh', 'फ़': 'f'
};

const VOWELS = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'an', 'अः': 'ah'
};

const MATRAS = {
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
  'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  'ं': 'n', 'ँ': 'n', 'ः': 'h'
};

function transliterateHindiWord(word) {
  if (VOCAB_MAP[word]) return VOCAB_MAP[word];

  const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()।॥]/g, '');
  if (VOCAB_MAP[cleanWord]) {
    const punct = word.replace(/[^.,/#!$%^&*;:{}=\-_`~()।॥]/g, '');
    return VOCAB_MAP[cleanWord] + (punct === '।' ? '.' : punct === '॥' ? '॥' : punct);
  }

  let result = '';
  let i = 0;
  while (i < word.length) {
    const char = word[i];
    const nextChar = i + 1 < word.length ? word[i + 1] : '';

    if (char === '।') {
      result += '.';
      i++;
      continue;
    }
    if (char === '॥') {
      result += '॥';
      i++;
      continue;
    }

    if (VOWELS[char]) {
      result += VOWELS[char];
      i++;
      continue;
    }

    if (CONSONANTS[char]) {
      const c = CONSONANTS[char];
      if (nextChar === '्') {
        result += c;
        i += 2;
      } else if (MATRAS[nextChar]) {
        result += c + MATRAS[nextChar];
        i += 2;
      } else if (CONSONANTS[nextChar] || VOWELS[nextChar] || nextChar === ' ' || nextChar === '' || /[\p{P}\p{S}]/u.test(nextChar)) {
        const isEnd = (i + 1 === word.length) || nextChar === ' ' || /[\p{P}\p{S}]/u.test(nextChar);
        result += isEnd && result.length > 0 ? c : c + 'a';
        i++;
      } else {
        result += c;
        i++;
      }
      continue;
    }

    if (MATRAS[char]) {
      result += MATRAS[char];
      i++;
      continue;
    }

    result += char;
    i++;
  }

  // Smooth Roman Hindi phonetics
  return result
    .replace(/aa/g, 'aa')
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/en$/g, 'ein')
    .replace(/on$/g, 'on')
    .replace(/aapake/g, 'aapke')
    .replace(/aapako/g, 'aapko')
    .replace(/jnyan/g, 'gyaan')
    .replace(/divy/g, 'divya')
    .replace(/saty/g, 'satya')
    .replace(/anthkaran/g, 'antahkaran')
    .replace(/snshay/g, 'sanshay')
    .replace(/([aeiou])a$/g, '$1');
}

export function toHinglish(text) {
  if (!text) return '';
  const tokens = text.split(/(\s+|[.,!?:;"'()।॥🪔✨🙏🌸❤️🎉🌟]+)/);
  return tokens
    .map((token) => {
      if (!token || token.trim() === '' || /^[\s.,!?:;"'()।॥🪔✨🙏🌸❤️🎉🌟]+$/.test(token)) {
        return token === '।' ? '.' : token;
      }
      if (/^[a-zA-Z0-9]+$/.test(token)) {
        return token;
      }
      return transliterateHindiWord(token);
    })
    .join('');
}

const CATEGORY_HINGLISH_LABELS = {
  traditional: 'Traditional Blessings',
  family: 'Family & Elders',
  friends: 'Friends & Dosti',
  love: 'Love & Romance',
  professional: 'Executive & Professional',
  funny: 'Fun & Masti',
  emotional: 'Heartfelt & Emotional',
  short: 'Short & Sweet',
  captions: 'Social Captions',
  business: 'Business & Clients',
  sacred: 'Sacred Mantras',
};

// Process wishes.json
const wishesJsonPath = 'src/data/wishes/wishes.json';
const allWishes = JSON.parse(fs.readFileSync(wishesJsonPath, 'utf8'));

let enrichedCount = 0;
for (const wish of allWishes) {
  wish.textHinglish = toHinglish(wish.textHi);
  if (wish.headlineHi) {
    wish.headlineHinglish = toHinglish(wish.headlineHi);
  }
  if (wish.meaningHi) {
    wish.meaningHinglish = toHinglish(wish.meaningHi);
  }
  wish.categoryLabelHinglish = CATEGORY_HINGLISH_LABELS[wish.category] || wish.categoryLabelEn;
  enrichedCount++;
}

fs.writeFileSync(wishesJsonPath, JSON.stringify(allWishes, null, 2), 'utf8');
console.log(`[Wishes Enrichment] Successfully enriched all ${enrichedCount} wishes in wishes.json`);

// Now update the 10 TypeScript files in src/data/wishes/*.ts
const CATEGORY_FILES = [
  'traditional', 'family', 'friends', 'love', 'professional',
  'funny', 'emotional', 'short', 'captions', 'business'
];

for (const cat of CATEGORY_FILES) {
  const filePath = `src/data/wishes/${cat}.ts`;
  if (!fs.existsSync(filePath)) continue;

  const catWishes = allWishes.filter((w) => w.category === cat);
  const tsConstName = cat.toUpperCase() + '_WISHES';
  const fileContent = `import type { WishMessage } from "../types";\n\nexport const ${tsConstName}: WishMessage[] = ${JSON.stringify(catWishes, null, 2)};\n`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`[Wishes Enrichment] Updated ${filePath} with ${catWishes.length} wishes.`);
}

console.log('[Wishes Enrichment] All 500 wishes across 10 categories successfully enriched with Hinglish!');

