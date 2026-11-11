import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Quote, Sparkles, Copy, Check, Share2, BookOpen, Compass } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../../data/editorial';

interface InspirationItem {
  id: string;
  quoteEn: string;
  quoteHi: string;
  authorEn: string;
  authorHi: string;
  thoughtEn: string;
  thoughtHi: string;
  thoughtAuthorEn: string;
  thoughtAuthorHi: string;
}

const INSPIRATION_BANK: InspirationItem[] = [
  {
    id: 'inspire-1',
    quoteEn: EDITORIAL_ARTICLES[0].quoteEn || 'Celebration is the sacred pause that anchors our modern pace to timeless cultural roots.',
    quoteHi: EDITORIAL_ARTICLES[0].quoteHi || 'उत्सव वह पावन विराम है जो हमारी आधुनिक भागदौड़ को हमारी जड़ों से जोड़ता है।',
    authorEn: 'FestiveWala Cultural Journal',
    authorHi: 'फेस्टिववाला सांस्कृतिक दर्शन',
    thoughtEn: EDITORIAL_ARTICLES[0].excerptEn,
    thoughtHi: EDITORIAL_ARTICLES[0].excerptHi,
    thoughtAuthorEn: 'Indian Heritage Lore',
    thoughtAuthorHi: 'भारतीय सांस्कृतिक परंपरा',
  },
  {
    id: 'inspire-2',
    quoteEn: EDITORIAL_ARTICLES[1].quoteEn || 'A rangoli is transient, reminding us that beauty exists in mindful dedication, not permanence.',
    quoteHi: EDITORIAL_ARTICLES[1].quoteHi || 'रंगोली नश्वर होते हुए भी यह सिखाती है कि सच्ची सुंदरता क्षणिक समर्पण में है, स्थायित्व में नहीं।',
    authorEn: 'Indian Sacred Art Traditions',
    authorHi: 'पारंपरिक कला दर्शन',
    thoughtEn: EDITORIAL_ARTICLES[1].excerptEn,
    thoughtHi: EDITORIAL_ARTICLES[1].excerptHi,
    thoughtAuthorEn: 'Traditional Aesthetic Essays',
    thoughtAuthorHi: 'पारंपरिक सौंदर्यशास्त्र',
  },
  {
    id: 'inspire-3',
    quoteEn: EDITORIAL_ARTICLES[2].quoteEn || 'The right blessing, offered with devotion, carries the weight of a warm parental embrace.',
    quoteHi: EDITORIAL_ARTICLES[2].quoteHi || 'सच्चे मन से दी गई एक शुभकामना में बड़ों के आत्मीय आलिंगन और आशीर्वाद का प्रभाव होता है।',
    authorEn: 'FestiveWala Family Wisdom',
    authorHi: 'पारिवारिक संस्कार',
    thoughtEn: EDITORIAL_ARTICLES[2].excerptEn,
    thoughtHi: EDITORIAL_ARTICLES[2].excerptHi,
    thoughtAuthorEn: 'Editorial Reflections',
    thoughtAuthorHi: 'सांस्कृतिक चिंतन',
  },
];

export const TodaysInspirationSection: React.FC = () => {
  const { isHindi, loc } = useLanguage();
  const [copiedType, setCopiedType] = useState<'quote' | 'thought' | null>(null);
  const [currentDate] = useState<Date>(() => new Date());

  // Deterministically select inspiration item based on current day of the year
  const activeInspiration = useMemo(() => {
    const start = new Date(currentDate.getFullYear(), 0, 0);
    const diff = currentDate.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return INSPIRATION_BANK[dayOfYear % INSPIRATION_BANK.length];
  }, [currentDate]);

  const todayDateString = useMemo(() => {
    return currentDate.toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [currentDate, isHindi]);

  const activeQuote = isHindi ? activeInspiration.quoteHi : activeInspiration.quoteEn;
  const activeQuoteAuthor = isHindi ? activeInspiration.authorHi : activeInspiration.authorEn;
  const activeThought = isHindi ? activeInspiration.thoughtHi : activeInspiration.thoughtEn;
  const activeThoughtAuthor = isHindi ? activeInspiration.thoughtAuthorHi : activeInspiration.thoughtAuthorEn;

  const handleCopy = async (type: 'quote' | 'thought', text: string, author: string) => {
    try {
      const fullText = `"${text}" — ${author}\n\nVia FestiveWala: https://festivewala.in/inspiration`;
      await navigator.clipboard.writeText(fullText);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  const handleShare = async (title: string, text: string, author: string) => {
    const fullText = `"${text}" — ${author}\n\nVia FestiveWala: https://festivewala.in/inspiration`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: fullText,
          url: 'https://festivewala.in/inspiration',
        });
        return;
      } catch {
        // User dismissed share dialog
      }
    }
    // WhatsApp Fallback
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="todays-inspiration"
      aria-labelledby="inspiration-section-title"
      className="py-12 sm:py-16 bg-[#FAF7F0] text-brand-dark border-b border-brand-gold/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep text-[#F2D98B] border border-brand-gold/40 shadow-sm">
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>{loc("Today's Inspiration", 'आज की प्रेरणा', "Today's Inspiration")}</span>
          </div>

          <h2
            id="inspiration-section-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24113D] tracking-tight"
          >
            {loc('Words of Wisdom & Celebration', 'दैनिक विचार व पावन सुभाषित', 'Words of Wisdom & Celebration')}
          </h2>

          <p className="text-xs sm:text-sm text-brand-muted font-sans">
            {todayDateString} • {loc('Curated from Indian Cultural Heritage', 'प्रामाणिक सांस्कृतिक धरोहर से संकलित', 'Curated from Heritage Lore')}
          </p>
        </div>

        {/* 2-Column Responsive Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Card 1: Quote of the Day */}
          <div
            id="quote-of-the-day"
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-brand-gold/30 shadow-card-luxury relative group hover:border-brand-gold transition-all duration-300 scroll-mt-32"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-brand-gold/15 pb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-royal">
                  <Quote className="w-4 h-4 text-brand-gold" />
                  <span>{loc('Quote of the Day', 'आज का सुविचार', 'Quote of the Day')}</span>
                </span>
                <span className="text-[11px] text-brand-muted">
                  {loc('Cultural Quote', 'सांस्कृतिक सूत्र', 'Wisdom')}
                </span>
              </div>

              <blockquote className="font-serif italic text-base sm:text-lg md:text-xl text-[#24113D] leading-relaxed">
                "{activeQuote}"
              </blockquote>

              <p className="font-sans text-xs sm:text-sm font-semibold text-brand-gold">
                — {activeQuoteAuthor}
              </p>
            </div>

            {/* Actions: Copy & Share */}
            <div className="mt-6 pt-4 border-t border-brand-gold/15 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopy('quote', activeQuote, activeQuoteAuthor)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-light text-brand-deep hover:bg-brand-gold/20 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold cursor-pointer min-h-[40px]"
                aria-label={loc('Copy Quote', 'सुविचार कॉपी करें', 'Copy Quote')}
              >
                {copiedType === 'quote' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">{loc('Copied!', 'कॉपी हुआ!', 'Copied!')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-brand-gold" />
                    <span>{loc('Copy Quote', 'कॉपी करें', 'Copy')}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleShare('Quote of the Day — FestiveWala', activeQuote, activeQuoteAuthor)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-deep text-brand-champagne hover:bg-brand-royal text-xs font-semibold transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold cursor-pointer min-h-[40px]"
                aria-label={loc('Share Quote', 'सुविचार साझा करें', 'Share Quote')}
              >
                <Share2 className="w-4 h-4 text-brand-gold" />
                <span>{loc('Share', 'साझा करें', 'Share')}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Thought of the Day */}
          <div
            id="thought-of-the-day"
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-brand-gold/30 shadow-card-luxury relative group hover:border-brand-gold transition-all duration-300 scroll-mt-32"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-brand-gold/15 pb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-royal">
                  <Compass className="w-4 h-4 text-brand-gold" />
                  <span>{loc('Thought of the Day', 'आज का चिंतन', 'Thought of the Day')}</span>
                </span>
                <span className="text-[11px] text-brand-muted">
                  {loc('Mindful Living', 'आत्मीय चिंतन', 'Reflections')}
                </span>
              </div>

              <p className="font-sans text-sm sm:text-base text-brand-dark/85 leading-relaxed">
                "{activeThought}"
              </p>

              <p className="font-sans text-xs sm:text-sm font-semibold text-brand-gold">
                — {activeThoughtAuthor}
              </p>
            </div>

            {/* Actions: Copy & Share */}
            <div className="mt-6 pt-4 border-t border-brand-gold/15 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopy('thought', activeThought, activeThoughtAuthor)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-light text-brand-deep hover:bg-brand-gold/20 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold cursor-pointer min-h-[40px]"
                aria-label={loc('Copy Thought', 'चिंतन कॉपी करें', 'Copy Thought')}
              >
                {copiedType === 'thought' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">{loc('Copied!', 'कॉपी हुआ!', 'Copied!')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-brand-gold" />
                    <span>{loc('Copy Thought', 'कॉपी करें', 'Copy')}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleShare('Thought of the Day — FestiveWala', activeThought, activeThoughtAuthor)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-deep text-brand-champagne hover:bg-brand-royal text-xs font-semibold transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold cursor-pointer min-h-[40px]"
                aria-label={loc('Share Thought', 'चिंतन साझा करें', 'Share Thought')}
              >
                <Share2 className="w-4 h-4 text-brand-gold" />
                <span>{loc('Share', 'साझा करें', 'Share')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Link to Full Inspiration Hub */}
        <div className="mt-8 text-center">
          <Link
            to="/inspiration/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-royal hover:text-brand-deep underline-offset-4 hover:underline"
          >
            <BookOpen className="w-4 h-4 text-brand-gold" />
            <span>{loc('Explore All Cultural Wisdom & Articles', 'सम्पूर्ण सांस्कृतिक दर्शन व लेख पढ़ें', 'Explore All Cultural Wisdom & Articles')} →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
