import fs from 'fs';

// Devanagari to Roman transliteration maps
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

// Conversational vocabulary dictionary
const VOCAB = {
  'दीपावली': 'Diwali',
  'दिवाली': 'Diwali',
  'दीपोत्सव': 'Deepotsav',
  'त्योहार': 'festival',
  'त्यौहार': 'festival',
  'पर्व': 'parv',
  'महापर्व': 'mahaparv',
  'शुभकामनाएं': 'shubhkamnayein',
  'शुभकामनाएँ': 'shubhkamnayein',
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
  'आरोग्य': 'achhi health',
  'स्वास्थ्य': 'swasthya',
  'खुशियां': 'khushiyan',
  'खुशियों': 'khushiyon',
  'प्रसन्नता': 'prasannata',
  'उल्लास': 'ullaas',
  'आनंद': 'aanand',
  'उमंग': 'umang',
  'प्रकाश': 'prakash',
  'उजाला': 'ujaala',
  'रोशनी': 'roshni',
  'दीप': 'deep',
  'दीपक': 'diye',
  'दीपों': 'deepon',
  'दिए': 'diye',
  'आंगन': 'aangan',
  'घर': 'ghar',
  'परिवार': 'parivaar',
  'स्वजन': 'apne',
  'मित्रों': 'doston',
  'दोस्त': 'dost',
  'मित्र': 'dost',
  'यार': 'yaar',
  'साथी': 'saathi',
  'जीवन': 'jeevan',
  'ज़िंदगी': 'zindagi',
  'जिंदगी': 'zindagi',
  'सदा': 'sada',
  'हमेशा': 'hamesha',
  'सदाबहार': 'sadabahar',
  'आशीर्वाद': 'aashirwad',
  'कृपा': 'kripa',
  'अनुग्रह': 'anugrah',
  'लक्ष्मीनारायण': 'Lakshmi Narayan',
  'महालक्ष्मी': 'Maha Lakshmi',
  'गणेश': 'Ganesh',
  'गणपति': 'Ganpati',
  'भगवान': 'Bhagwan',
  'ईश्वर': 'Ishwar',
  'माता': 'Mata',
  'पिता': 'Pita',
  'मां': 'Maa',
  'पापा': 'Papa',
  'भाई': 'Bhai',
  'बहन': 'Behen',
  'दीदी': 'Didi',
  'भैया': 'Bhaiya',
  'प्यार': 'pyaar',
  'स्नेह': 'sneh',
  'प्रेम': 'prem',
  'मुबारक': 'mubarak',
  'सफलता': 'safalta',
  'तरक्की': 'tarakki',
  'उन्नति': 'unnati',
  'मुस्कान': 'muskaan',
  'हंसी': 'hansi',
  'यादें': 'yaadein',
  'रिश्ते': 'rishte',
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
  'लाभ': 'Labh'
};

function transliterateHindiWord(word) {
  if (VOCAB[word]) return VOCAB[word];

  // Strip punctuation for lookup
  const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()।॥]/g, '');
  if (VOCAB[cleanWord]) {
    const punct = word.replace(/[^.,/#!$%^&*;:{}=\-_`~()।॥]/g, '');
    return VOCAB[cleanWord] + (punct === '।' ? '.' : punct === '॥' ? '॥' : punct);
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
        // Halant (virama) - half consonant, no inherent 'a'
        result += c;
        i += 2;
      } else if (MATRAS[nextChar]) {
        // Consonant + matra
        result += c + MATRAS[nextChar];
        i += 2;
      } else if (CONSONANTS[nextChar] || VOWELS[nextChar] || nextChar === ' ' || nextChar === '' || /[\p{P}\p{S}]/u.test(nextChar)) {
        // Consonant with inherent 'a', except final consonant in word which often drops 'a' in modern Hindi (schwa deletion)
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

  // Clean up double vowels or phonetic smoothing
  return result
    .replace(/aa/g, 'aa')
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/an([kg])/g, 'ang$1')
    .replace(/([aeiou])a$/g, '$1');
}

function hindiToHinglish(text) {
  if (!text) return '';
  // Split preserving spaces and emojis
  const tokens = text.split(/(\s+|[.,!?:;"'()।॥🪔✨🙏🌸❤️🎉🌟]+)/);
  return tokens
    .map((token) => {
      if (!token || token.trim() === '' || /^[\s.,!?:;"'()।॥🪔✨🙏🌸❤️🎉🌟]+$/.test(token)) {
        return token === '।' ? '.' : token;
      }
      // If already Latin, preserve
      if (/^[a-zA-Z0-9]+$/.test(token)) {
        return token;
      }
      return transliterateHindiWord(token);
    })
    .join('');
}

const data = JSON.parse(fs.readFileSync('src/data/wishes/wishes.json', 'utf8'));
for (let i = 0; i < 5; i++) {
  const w = data[i];
  console.log(`--- [Wish ${i+1}: ${w.id} (${w.category})] ---`);
  console.log('HI :', w.textHi);
  console.log('HIN:', hindiToHinglish(w.textHi));
}

