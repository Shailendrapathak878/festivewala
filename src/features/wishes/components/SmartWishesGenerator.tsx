import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../hooks/useLanguage';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Share2,
  Heart,
  Palette,
  Sliders,
  User,
  HeartHandshake,
  Flame,
  Shuffle,
  Pencil,
} from 'lucide-react';
import {
  rankWishes,
  personalizeWish,
  getWhatsAppShareUrl,
  copyTextToClipboard,
  type GeneratorParams,
  type GeneratedWishResult,
} from '../services/wishGeneratorService';
import { useSavedWishes } from '../hooks/useSavedWishes';
import { ensureCleanUnicode } from '../../../components/layout/WishesShowcase';

interface SmartWishesGeneratorProps {
  isHindi: boolean;
}

const FESTIVALS = [
  { id: 'diwali', labelEn: 'Diwali', labelHi: 'दीपावली', icon: '🪔' },
  { id: 'dhanteras', labelEn: 'Dhanteras', labelHi: 'धनतेरस', icon: '🪙' },
  { id: 'bhai-dooj', labelEn: 'Bhai Dooj', labelHi: 'भाई दूज', icon: '🌸' },
  { id: 'govardhan-puja', labelEn: 'Govardhan Puja', labelHi: 'गोवर्धन पूजा', icon: '🌾' },
  { id: 'chhath-puja', labelEn: 'Chhath Puja', labelHi: 'छठ पूजा', icon: '☀️' },
  { id: 'new-year', labelEn: 'New Year', labelHi: 'नव वर्ष', icon: '🎆' },
  { id: 'general-festive', labelEn: 'All Festivals', labelHi: 'सर्व उत्सव', icon: '✨' },
];

const RECIPIENTS = [
  { id: 'family', labelEn: 'Family', labelHi: 'परिवार', icon: '🏡' },
  { id: 'mother', labelEn: 'Mother', labelHi: 'माँ', icon: '🌸' },
  { id: 'father', labelEn: 'Father', labelHi: 'पिताजी', icon: '🌟' },
  { id: 'brother', labelEn: 'Brother', labelHi: 'भाई', icon: '💪' },
  { id: 'sister', labelEn: 'Sister', labelHi: 'बहन', icon: '✨' },
  { id: 'friends', labelEn: 'Friends', labelHi: 'मित्र', icon: '🤝' },
  { id: 'best-friend', labelEn: 'Best Friend', labelHi: 'पक्का यार', icon: '💖' },
  { id: 'partner', labelEn: 'Partner', labelHi: 'जीवनसाथी', icon: '💍' },
  { id: 'husband/wife', labelEn: 'Spouse', labelHi: 'पति/पत्नी', icon: '❤️' },
  { id: 'colleagues', labelEn: 'Colleagues', labelHi: 'सहकर्मी', icon: '💼' },
  { id: 'customers', labelEn: 'Clients / Customers', labelHi: 'ग्राहक व व्यापारी', icon: '📈' },
  { id: 'teachers', labelEn: 'Teachers / Gurus', labelHi: 'गुरु व शिक्षक', icon: '📖' },
  { id: 'general', labelEn: 'General Audience', labelHi: 'सभी के लिए', icon: '🕊️' },
];

const TONES = [
  { id: 'heartwarming', labelEn: 'Heartwarming', labelHi: 'हृदयस्पर्शी' },
  { id: 'emotional', labelEn: 'Emotional', labelHi: 'भावुक व आत्मीय' },
  { id: 'romantic', labelEn: 'Romantic', labelHi: 'प्रेमपूर्ण' },
  { id: 'funny', labelEn: 'Funny & Playful', labelHi: 'हास्य व मस्ती' },
  { id: 'traditional', labelEn: 'Traditional & Sacred', labelHi: 'पारंपरिक वंदना' },
  { id: 'professional', labelEn: 'Professional', labelHi: 'व्यावसायिक' },
  { id: 'respectful', labelEn: 'Respectful', labelHi: 'आदरपूर्ण' },
  { id: 'inspirational', labelEn: 'Inspirational', labelHi: 'प्रेरणादायी' },
  { id: 'cute', labelEn: 'Cute & Sweet', labelHi: 'मधुर व प्यारा' },
  { id: 'simple', labelEn: 'Simple & Crisp', labelHi: 'संक्षिप्त व सरल' },
];

const LENGTHS = [
  { id: 'short', labelEn: 'Short (1-2 lines)', labelHi: 'संक्षिप्त (१-२ पंक्तियाँ)' },
  { id: 'medium', labelEn: 'Medium (Balanced)', labelHi: 'मध्यम (संतुलित)' },
  { id: 'long', labelEn: 'Long (Detailed Blessing)', labelHi: 'विस्तृत (शुभकामना)' },
];

export const SmartWishesGenerator: React.FC<SmartWishesGeneratorProps> = ({ isHindi: propIsHindi }) => {
  const navigate = useNavigate();
  const { isHindi: ctxIsHindi, isHinglish, language } = useLanguage();
  const isHindi = propIsHindi ?? ctxIsHindi;
  const { toggleFavorite, isFavorite } = useSavedWishes();

  // Generator Inputs
  const [festivalId, setFestivalId] = useState<string>('diwali');
  const [recipientType, setRecipientType] = useState<string>('family');
  const [tone, setTone] = useState<string>('heartwarming');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [langPreference, setLangPreference] = useState<'en' | 'hi' | 'hinglish' | 'bilingual'>(
    language === 'hi' ? 'hi' : language === 'hinglish' ? 'hinglish' : 'en'
  );

  // Personalization Inputs
  const [senderName, setSenderName] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('');
  const [customNote, setCustomNote] = useState<string>('');

  // Generator State
  const [matchIndex, setMatchIndex] = useState<number>(0);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [editableText, setEditableText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Derive ranked matches
  const params: GeneratorParams = useMemo(() => ({
    festivalId,
    recipientType,
    tone,
    length,
    language: langPreference,
    senderName,
    recipientName,
    relationship,
    customNote,
  }), [festivalId, recipientType, tone, length, langPreference, senderName, recipientName, relationship, customNote]);

  const rankedCandidates = useMemo(() => rankWishes(params, 8), [params]);

  // Current active wish
  const currentScored = rankedCandidates[matchIndex % rankedCandidates.length] || rankedCandidates[0];
  const activeResult: GeneratedWishResult | null = useMemo(() => {
    if (!currentScored) return null;
    return personalizeWish(currentScored.wish, params);
  }, [currentScored, params]);

  const handleGenerate = () => {
    setHasGenerated(true);
    setMatchIndex(0);
    if (activeResult) {
      setEditableText(ensureCleanUnicode(activeResult.personalizedText));
    }
  };

  const handleNextMatch = () => {
    const nextIdx = (matchIndex + 1) % rankedCandidates.length;
    setMatchIndex(nextIdx);
    const nextWish = rankedCandidates[nextIdx].wish;
    const personalized = personalizeWish(nextWish, params);
    setEditableText(ensureCleanUnicode(personalized.personalizedText));
  };

  const handleCopy = async () => {
    const textToCopy = ensureCleanUnicode(editableText || activeResult?.personalizedText || '');
    const ok = await copyTextToClipboard(textToCopy);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const text = ensureCleanUnicode(editableText || activeResult?.personalizedText || '');
    const url = getWhatsAppShareUrl(text);
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    const text = ensureCleanUnicode(editableText || activeResult?.personalizedText || '');
    const title = ensureCleanUnicode(activeResult?.title || (isHindi ? 'शुभ दीपावली' : 'Happy Diwali'));
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch (err) {
        // Fallback to WhatsApp
        handleWhatsApp();
      }
    } else {
      handleWhatsApp();
    }
  };

  const handleSendToGreetingStudio = () => {
    if (!currentScored) return;
    const wish = currentScored.wish;
    const title = ensureCleanUnicode(
      langPreference === 'hi'
        ? wish.headlineHi || 'शुभ दीपावली'
        : langPreference === 'hinglish'
        ? wish.headlineHinglish || wish.headlineEn || 'Shubh Deepawali'
        : wish.headlineEn || 'Happy Diwali'
    );
    const message = ensureCleanUnicode(
      langPreference === 'hi'
        ? wish.textHi
        : langPreference === 'hinglish'
        ? wish.textHinglish || wish.textHi || wish.textEn
        : wish.textEn
    );
    // Navigate with state
    navigate(`/greeting-cards?title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}`);
  };

  const currentWishId = currentScored?.wish.id;
  const isWishFav = currentWishId ? isFavorite(currentWishId) : false;

  return (
    <div className="space-y-8">
      {/* Interactive Generator Configuration Form */}
      <div className="rounded-3xl bg-gradient-to-b from-[#220E38] via-[#1B0B2E] to-[#120524] border border-[#F2D98B]/30 p-5 sm:p-7 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2D98B]/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F2D98B] to-[#D4AF37] text-[#24113D] flex items-center justify-center font-bold shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F0]">
                {isHindi ? 'स्मार्ट शुभकामना जनरेटर' : isHinglish ? 'Smart Wishes Generator' : 'Smart Wishes Generator'}
              </h2>
            </div>
            <p className="text-xs text-[#FAF7F0]/70 mt-1">
              {isHindi
                ? 'त्योहार, रिश्ता और भाव चुनकर कुछ ही सेकंडों में व्यक्तिगत शुभकामना बनाएं।'
                : isHinglish
                ? 'Festival, relationship aur tone chunein aur customized festive wish banayein.'
                : 'Select recipient, tone, and personal touches to generate heartfelt custom wishes.'}
            </p>
          </div>

          {/* Output Language Pill */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#140624] border border-[#F2D98B]/20 self-start sm:self-center">
            <button
              type="button"
              onClick={() => setLangPreference('en')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                langPreference === 'en'
                  ? 'bg-[#F2D98B] text-[#24113D] shadow-sm'
                  : 'text-[#FAF7F0]/70 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLangPreference('hi')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                langPreference === 'hi'
                  ? 'bg-[#F2D98B] text-[#24113D] shadow-sm'
                  : 'text-[#FAF7F0]/70 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLangPreference('hinglish')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                langPreference === 'hinglish'
                  ? 'bg-[#F2D98B] text-[#24113D] shadow-sm'
                  : 'text-[#FAF7F0]/70 hover:text-white'
              }`}
            >
              Hinglish
            </button>
            <button
              type="button"
              onClick={() => setLangPreference('bilingual')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                langPreference === 'bilingual'
                  ? 'bg-[#F2D98B] text-[#24113D] shadow-sm'
                  : 'text-[#FAF7F0]/70 hover:text-white'
              }`}
            >
              Both (द्विभाषी)
            </button>
          </div>
        </div>

        {/* Step 1: Festival Selection */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#F2D98B] mb-2.5 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            <span>{isHindi ? '१. पावन त्योहार चुनें' : '1. Select Festival'}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {FESTIVALS.map((fest) => (
              <button
                key={fest.id}
                type="button"
                onClick={() => setFestivalId(fest.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border min-h-[40px] ${
                  festivalId === fest.id
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold shadow-md shadow-[#F2D98B]/20 scale-[1.02]'
                    : 'bg-[#180A2B]/80 text-[#FAF7F0]/80 border-[#F2D98B]/15 hover:border-[#F2D98B]/50'
                }`}
              >
                <span>{fest.icon}</span>
                <span>{isHindi ? fest.labelHi : fest.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Recipient Selection */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#F2D98B] mb-2.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{isHindi ? '२. शुभकामना किसके लिए है?' : '2. Who is this for? (Recipient)'}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {RECIPIENTS.map((rec) => (
              <button
                key={rec.id}
                type="button"
                onClick={() => setRecipientType(rec.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs text-left transition-all border min-h-[44px] ${
                  recipientType === rec.id
                    ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold shadow-md shadow-[#F2D98B]/20'
                    : 'bg-[#180A2B]/80 text-[#FAF7F0]/80 border-[#F2D98B]/15 hover:border-[#F2D98B]/40'
                }`}
              >
                <span className="text-sm">{rec.icon}</span>
                <span className="truncate">{isHindi ? rec.labelHi : rec.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Tone & Message Length Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#F2D98B] mb-2.5 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{isHindi ? '३. संदेश का भाव (Tone)' : '3. Tone & Emotion'}</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                    tone === t.id
                      ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold shadow-sm'
                      : 'bg-[#180A2B]/70 text-[#FAF7F0]/70 border-white/5 hover:border-[#F2D98B]/30'
                  }`}
                >
                  {isHindi ? t.labelHi : t.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#F2D98B] mb-2.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>{isHindi ? '४. संदेश की लंबाई' : '4. Desired Length'}</span>
            </label>
            <div className="flex flex-col gap-1.5">
              {LENGTHS.map((len) => (
                <button
                  key={len.id}
                  type="button"
                  onClick={() => setLength(len.id as 'short' | 'medium' | 'long')}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border min-h-[38px] ${
                    length === len.id
                      ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold shadow-sm'
                      : 'bg-[#180A2B]/70 text-[#FAF7F0]/70 border-white/5 hover:border-[#F2D98B]/30'
                  }`}
                >
                  {isHindi ? len.labelHi : len.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Personalization Fields (Collapsible / Clean) */}
        <div className="p-4 rounded-2xl bg-[#140624]/80 border border-[#F2D98B]/20 space-y-3.5">
          <span className="text-xs font-bold text-[#F2D98B] flex items-center gap-1.5">
            <Pencil className="w-3.5 h-3.5" />
            <span>{isHindi ? 'व्यक्तिगत स्पर्श (वैकल्पिक)' : 'Personal Touches (Optional)'}</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="gen-rec-name" className="text-[11px] text-[#FAF7F0]/70 block mb-1">
                {isHindi ? 'प्राप्तकर्ता का नाम' : 'Recipient Name'}
              </label>
              <input
                id="gen-rec-name"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={isHindi ? 'उदा: माँ, राहुल, पूजा' : 'e.g. Maa, Rahul, Priya'}
                className="w-full px-3 py-2 rounded-xl bg-[#1E0E33] border border-[#F2D98B]/20 text-xs text-[#FAF7F0] placeholder-[#FAF7F0]/30 outline-none focus:border-[#F2D98B]"
              />
            </div>

            <div>
              <label htmlFor="gen-rel-name" className="text-[11px] text-[#FAF7F0]/70 block mb-1">
                {isHindi ? 'रिश्ता / संबोधन' : 'Relationship / Title'}
              </label>
              <input
                id="gen-rel-name"
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder={isHindi ? 'उदा: मेरी प्यारी बहना' : 'e.g. My Dear Sister'}
                className="w-full px-3 py-2 rounded-xl bg-[#1E0E33] border border-[#F2D98B]/20 text-xs text-[#FAF7F0] placeholder-[#FAF7F0]/30 outline-none focus:border-[#F2D98B]"
              />
            </div>

            <div>
              <label htmlFor="gen-sender-name" className="text-[11px] text-[#FAF7F0]/70 block mb-1">
                {isHindi ? 'आपका नाम (प्रेषक)' : 'Your Name (Sender)'}
              </label>
              <input
                id="gen-sender-name"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={isHindi ? 'उदा: शर्मा परिवार, अमित' : 'e.g. Sharma Family, Amit'}
                className="w-full px-3 py-2 rounded-xl bg-[#1E0E33] border border-[#F2D98B]/20 text-xs text-[#FAF7F0] placeholder-[#FAF7F0]/30 outline-none focus:border-[#F2D98B]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="gen-custom-note" className="text-[11px] text-[#FAF7F0]/70 block mb-1">
              {isHindi ? 'कोई विशेष पंक्ति या संदेश जोड़ें' : 'Add a Custom Line or Memory'}
            </label>
            <input
              id="gen-custom-note"
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder={isHindi ? 'उदा: इस बार दीवाली पर घर जरूर आना!' : 'e.g. Can’t wait to celebrate together this weekend!'}
              className="w-full px-3 py-2 rounded-xl bg-[#1E0E33] border border-[#F2D98B]/20 text-xs text-[#FAF7F0] placeholder-[#FAF7F0]/30 outline-none focus:border-[#F2D98B]"
            />
          </div>
        </div>

        {/* Generate Action Button */}
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F2D98B] via-[#E5C158] to-[#D4AF37] text-[#24113D] font-bold text-sm shadow-xl shadow-[#F2D98B]/25 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>{isHindi ? '✨ व्यक्तिगत शुभकामना तैयार करें' : '✨ Generate Personalized Wish'}</span>
        </button>
      </div>

      {/* Generated Result Card Display */}
      {hasGenerated && activeResult && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-gradient-to-br from-[#2D124B] via-[#1E0B33] to-[#120524] border-2 border-[#F2D98B]/50 p-5 sm:p-7 shadow-2xl space-y-5"
        >
          {/* Result Header & Match Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2D98B]/20 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#F2D98B]/20 border border-[#F2D98B]/40 flex items-center justify-center text-[#F2D98B] font-bold text-xs">
                {matchIndex + 1}/{rankedCandidates.length}
              </span>
              <div>
                <span className="text-xs font-bold text-[#F2D98B] block">
                  {isHindi ? 'स्मार्ट मिलान परिणाम' : 'Top Smart Match'}
                </span>
                <span className="text-[11px] text-[#FAF7F0]/60 block">
                  {isHindi
                    ? `${currentScored?.wish.categoryLabelHi} • ${currentScored?.matchReasons.join(', ')}`
                    : `${currentScored?.wish.categoryLabelEn} • ${currentScored?.matchReasons.join(', ')}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNextMatch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#24113D] border border-[#F2D98B]/30 hover:border-[#F2D98B] text-xs font-bold text-[#F2D98B] shadow-sm transition-all"
                title={isHindi ? 'अन्य विकल्प देखें' : 'Show Next Candidate'}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{isHindi ? 'अगला विकल्प (शफल)' : 'Next Match'}</span>
              </button>

              <button
                type="button"
                onClick={() => currentWishId && toggleFavorite(currentWishId)}
                className={`p-2 rounded-xl border transition-all ${
                  isWishFav
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-[#24113D] border-[#F2D98B]/20 text-[#FAF7F0]/60 hover:text-[#FAF7F0]'
                }`}
                title={isWishFav ? 'Remove Favorite' : 'Save to Favorites'}
              >
                <Heart className={`w-4 h-4 ${isWishFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Message Content Area (Editable or Static View) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#FAF7F0]/60 px-1">
              <span>{isHindi ? 'शुभकामना संदेश (संपादन योग्य):' : 'Personalized Message (Editable):'}</span>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-[#F2D98B] hover:underline flex items-center gap-1 text-[11px]"
              >
                <Pencil className="w-3 h-3" />
                <span>{isEditing ? (isHindi ? 'पूर्ण' : 'Done') : (isHindi ? 'संपादित करें' : 'Edit text')}</span>
              </button>
            </div>

            <textarea
              aria-label={isHindi ? 'शुभकामना संदेश' : 'Wish message'}
              value={editableText}
              onChange={(e) => setEditableText(e.target.value)}
              rows={editableText.split('\n').length + 2}
              className="w-full p-4 rounded-2xl bg-[#130722]/90 border border-[#F2D98B]/35 text-[#FAF7F0] font-sans text-sm sm:text-base leading-relaxed outline-none focus:border-[#F2D98B] focus:ring-1 focus:ring-[#F2D98B] shadow-inner transition-all resize-y min-h-[160px]"
            />
          </div>

          {/* Action Toolbar: Copy, WhatsApp, Share, Studio */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#24113D] border border-[#F2D98B]/30 hover:bg-[#2F1650] text-[#FAF7F0] font-bold text-xs shadow-md transition-all active:scale-95 min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">{isHindi ? 'कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#F2D98B]" />
                  <span>{isHindi ? 'कॉपी करें' : 'Copy Text'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 min-h-[44px]"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#24113D] border border-[#F2D98B]/30 hover:bg-[#2F1650] text-[#FAF7F0] font-bold text-xs shadow-md transition-all active:scale-95 min-h-[44px]"
            >
              <Share2 className="w-4 h-4 text-[#F2D98B]" />
              <span>{isHindi ? 'शेयर करें' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={handleSendToGreetingStudio}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] font-bold text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 min-h-[44px]"
              title={isHindi ? 'ग्रीटिंग स्टूडियो में कार्ड बनाएं' : 'Design Card in Greeting Studio'}
            >
              <Palette className="w-4 h-4" />
              <span>{isHindi ? 'कार्ड बनाएं' : 'Design Card 🎨'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
