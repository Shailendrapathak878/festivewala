import type { WishMessage } from '../../../data/types';
import { WISHES_DATA } from '../../../data/wishes';

export interface GeneratorParams {
  festivalId: string;
  recipientType: string;
  tone: string;
  length: 'short' | 'medium' | 'long';
  language: 'en' | 'hi' | 'hinglish' | 'bilingual';
  senderName?: string;
  recipientName?: string;
  relationship?: string;
  customNote?: string;
}

export interface ScoredWish {
  wish: WishMessage;
  score: number;
  matchReasons: string[];
}

export interface GeneratedWishResult {
  wish: WishMessage;
  personalizedText: string;
  title: string;
  language: 'en' | 'hi' | 'hinglish' | 'bilingual';
  fallbackApplied: boolean;
}

// Recipient salutations dictionary
const SALUTATIONS: Record<
  string,
  { enPrefix: string; hiPrefixRespect: string; hiPrefixWarm: string; hinglishPrefix: string }
> = {
  mother: { enPrefix: 'Dearest Maa', hiPrefixRespect: 'पूज्य माता जी', hiPrefixWarm: 'मेरी प्यारी माँ', hinglishPrefix: 'Pyari Maa' },
  father: { enPrefix: 'Respected Papa', hiPrefixRespect: 'पूजनीय पिताजी', hiPrefixWarm: 'मेरे प्यारे पापा', hinglishPrefix: 'Pyare Papa' },
  brother: { enPrefix: 'Dear Brother', hiPrefixRespect: 'आदरणीय भैया', hiPrefixWarm: 'मेरे प्यारे भाई', hinglishPrefix: 'Mere Pyare Bhai' },
  sister: { enPrefix: 'Dearest Sister', hiPrefixRespect: 'आदरणीय दीदी', hiPrefixWarm: 'मेरी प्यारी बहना', hinglishPrefix: 'Meri Pyari Didi / Behen' },
  elders: { enPrefix: 'Respected Elders', hiPrefixRespect: 'आदरणीय एवं पूजनीय', hiPrefixWarm: 'सादर प्रणाम', hinglishPrefix: 'Aadarniya Swajan (Pranam)' },
  partner: { enPrefix: 'My Dearest', hiPrefixRespect: 'मेरे प्रिय', hiPrefixWarm: 'मेरी जान / मेरे हमसफ़र', hinglishPrefix: 'Meri Jaan / My Dearest' },
  'husband/wife': { enPrefix: 'My Beloved', hiPrefixRespect: 'प्राणप्रिय', hiPrefixWarm: 'मेरे प्यारे जीवनसाथी', hinglishPrefix: 'Mere Pyare Jeevansathi' },
  friends: { enPrefix: 'Dear Friend', hiPrefixRespect: 'प्रिय मित्र', hiPrefixWarm: 'मेरे प्यारे दोस्त', hinglishPrefix: 'Mere Pyare Dost' },
  'best-friend': { enPrefix: 'To My Best Friend', hiPrefixRespect: 'प्रिय मित्र', hiPrefixWarm: 'मेरे लंगोटिया यार', hinglishPrefix: 'To My Best Friend / Yaar' },
  colleagues: { enPrefix: 'Dear Colleague', hiPrefixRespect: 'आदरणीय सहकर्मी', hiPrefixWarm: 'प्रिय साथी', hinglishPrefix: 'Dear Colleague' },
  customers: { enPrefix: 'Valued Client', hiPrefixRespect: 'सम्मानित ग्राहक', hiPrefixWarm: 'प्रिय ग्राहक', hinglishPrefix: 'Valued Client' },
  teachers: { enPrefix: 'Respected Teacher / Guru', hiPrefixRespect: 'परम आदरणीय गुरुदेव', hiPrefixWarm: 'आदरणीय शिक्षक', hinglishPrefix: 'Respected Guruji' },
  general: { enPrefix: 'Warm Festive Greetings', hiPrefixRespect: 'सादर नमस्कार', hiPrefixWarm: 'सप्रेम नमस्कार', hinglishPrefix: 'Warm Festive Greetings' },
};

/**
 * Deterministically ranks all 500 wishes according to the user's criteria.
 */
export function rankWishes(params: GeneratorParams, limit = 10): ScoredWish[] {
  const scored = WISHES_DATA.map((w) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Festival match (0-40 pts)
    const festIds = w.festivalIds || [w.festivalId];
    if (params.festivalId === 'general-festive' || festIds.includes(params.festivalId) || festIds.includes('general-festive')) {
      score += 40;
      reasons.push('Festival Match');
    } else if (params.festivalId === 'diwali' && w.festivalId === 'diwali') {
      score += 40;
      reasons.push('Diwali Match');
    }

    // 2. Recipient match (0-45 pts)
    const recTypes = w.recipientTypes || ['general'];
    if (recTypes.includes(params.recipientType)) {
      score += 45;
      reasons.push(`Targeted to ${params.recipientType}`);
    } else if (recTypes.includes('general') || params.recipientType === 'general') {
      score += 20;
    }

    // Category correlation boost
    if (params.recipientType === 'mother' || params.recipientType === 'father' || params.recipientType === 'brother' || params.recipientType === 'sister') {
      if (w.category === 'family') score += 25;
    } else if (params.recipientType === 'partner' || params.recipientType === 'husband/wife') {
      if (w.category === 'love') score += 25;
    } else if (params.recipientType === 'colleagues') {
      if (w.category === 'professional') score += 25;
    } else if (params.recipientType === 'customers') {
      if (w.category === 'business') score += 25;
    } else if (params.recipientType === 'friends' || params.recipientType === 'best-friend') {
      if (w.category === 'friends') score += 25;
    } else if (params.recipientType === 'teachers') {
      if (w.category === 'traditional' || w.category === 'professional') score += 25;
    }

    // 3. Tone match (0-35 pts)
    if (w.tone === params.tone) {
      score += 35;
      reasons.push(`Exact Tone (${params.tone})`);
    } else if (
      (params.tone === 'heartwarming' && (w.tone === 'emotional' || w.tone === 'simple')) ||
      (params.tone === 'respectful' && w.tone === 'traditional') ||
      (params.tone === 'cute' && (w.tone === 'romantic' || w.tone === 'funny'))
    ) {
      score += 20;
      reasons.push('Compatible Tone');
    }

    // 4. Length match (0-20 pts)
    if (w.length === params.length) {
      score += 20;
      reasons.push(`Matching Length (${params.length})`);
    } else if (
      (params.length === 'medium' && (w.length === 'short' || w.length === 'long')) ||
      (params.length === 'short' && w.length === 'medium')
    ) {
      score += 10;
    }

    return { wish: w, score, matchReasons: reasons };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

/**
 * Injects personalization (recipient name, relationship, personal note, sender)
 * cleanly without awkward placeholders or empty brackets.
 */
export function personalizeWish(
  wish: WishMessage,
  params: GeneratorParams
): GeneratedWishResult {
  const isHi = params.language === 'hi';
  const isHinglish = params.language === 'hinglish';
  const isBi = params.language === 'bilingual';

  const headline = isHi
    ? wish.headlineHi || 'शुभ दीपावली'
    : isHinglish
    ? wish.headlineHinglish || wish.headlineEn || 'Shubh Deepawali'
    : wish.headlineEn || 'Happy Diwali';

  const parts: string[] = [];

  // 1. Title Banner
  if (isHi) {
    parts.push(`🪔✨ ${headline} ✨🪔`);
  } else if (isHinglish) {
    parts.push(`🪔✨ ${headline} ✨🪔`);
  } else if (isBi) {
    parts.push(`🪔✨ ${wish.headlineEn || 'Happy Diwali'} | ${wish.headlineHi || 'शुभ दीपावली'} ✨🪔`);
  } else {
    parts.push(`🪔✨ ${headline} ✨🪔`);
  }

  // 2. Salutation (Clean & natural)
  const salInfo = SALUTATIONS[params.recipientType] || SALUTATIONS.general;
  const recName = params.recipientName?.trim();
  const relName = params.relationship?.trim();

  let salutation = '';
  if (isHi) {
    if (recName && relName) {
      salutation = `${relName} ${recName},`;
    } else if (recName) {
      const isRespect = ['elders', 'teachers', 'father', 'mother', 'customers'].includes(params.recipientType);
      salutation = isRespect ? `आदरणीय ${recName} जी,` : `प्रिय ${recName},`;
    } else if (relName) {
      salutation = `${relName},`;
    } else if (params.recipientType !== 'general') {
      salutation = `${salInfo.hiPrefixWarm},`;
    }
  } else if (isHinglish) {
    if (recName && relName) {
      salutation = `${relName} ${recName},`;
    } else if (recName) {
      const isRespect = ['elders', 'teachers', 'father', 'mother', 'customers'].includes(params.recipientType);
      salutation = isRespect ? `Aadarniya ${recName} ji,` : `Pyare ${recName},`;
    } else if (relName) {
      salutation = `${relName},`;
    } else if (params.recipientType !== 'general') {
      salutation = `${salInfo.hinglishPrefix},`;
    }
  } else {
    if (recName && relName) {
      salutation = `To my dearest ${relName}, ${recName},`;
    } else if (recName) {
      const isFormal = ['customers', 'colleagues', 'teachers'].includes(params.recipientType);
      salutation = isFormal ? `Dear ${recName},` : `Dearest ${recName},`;
    } else if (relName) {
      salutation = `To my dearest ${relName},`;
    } else if (params.recipientType !== 'general') {
      salutation = `${salInfo.enPrefix},`;
    }
  }

  if (salutation) {
    parts.push(salutation);
  }

  // 3. Shloka if present
  if (wish.shloka) {
    parts.push(wish.shloka);
    const meaning = isHi ? wish.meaningHi : isHinglish ? wish.meaningHinglish || wish.meaningHi : wish.meaningEn;
    if (meaning) {
      parts.push(isHi ? `भावार्थ: ${meaning}` : isHinglish ? `Bhavarth: ${meaning}` : `Meaning: ${meaning}`);
    }
  }

  // 4. Core Body Text
  if (isBi) {
    parts.push(`${wish.textEn}\n\n${wish.textHi}`);
  } else if (isHi) {
    parts.push(wish.textHi);
  } else if (isHinglish) {
    parts.push(wish.textHinglish || wish.textHi || wish.textEn);
  } else {
    parts.push(wish.textEn);
  }

  // 5. Custom Note (if provided)
  const note = params.customNote?.trim();
  if (note) {
    if (isHi) {
      parts.push(`एक विशेष संदेश: "${note}"`);
    } else if (isHinglish) {
      parts.push(`Ek khaas sandesh: "${note}"`);
    } else {
      parts.push(`A personal note: "${note}"`);
    }
  }

  // 6. Sign-off / Sender
  const sender = params.senderName?.trim();
  if (sender) {
    parts.push(isHi ? `— सस्नेह, ${sender}` : isHinglish ? `— Dil se, ${sender}` : `— With warm festive love, ${sender}`);
  } else {
    parts.push(isHi ? '— फेस्टिववाला (उत्सव • सृजन • आनंद)' : '— FestiveWala (Celebrate. Create. Share.)');
  }

  const personalizedText = parts.join('\n\n');

  return {
    wish,
    personalizedText,
    title: headline,
    language: params.language,
    fallbackApplied: false,
  };
}

/**
 * Encodes text properly for WhatsApp sharing.
 */
export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Copies text safely to clipboard with fallback.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    // continue to execCommand fallback
  }

  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch (e) {
    return false;
  }
}
