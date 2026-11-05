import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { getUpcomingFestivals, type UpcomingFestival } from '../../services/festivalPriorityEngine';
import { FESTIVALS_DATA } from '../../data/festivals';
import { formatDateInIST } from '../../utils/festivalDateUtils';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Flame,
  Coins,
  Gift,
  PartyPopper,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';

export const CountdownSection: React.FC = () => {
  const { isHindi, loc } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Tick state to keep countdowns real-time
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Retrieve dynamically the top 2 upcoming festivals
  const upcomingFestivals: UpcomingFestival[] = React.useMemo(() => {
    return getUpcomingFestivals(FESTIVALS_DATA, currentDate, 2);
  }, [currentDate]);

  const p1 = upcomingFestivals[0];
  const p2 = upcomingFestivals[1];

  // Helper icon for festival
  const getFestivalIcon = (id: string) => {
    switch (id.toLowerCase()) {
      case 'dhanteras':
        return <Coins className="w-6 h-6 text-amber-400" />;
      case 'diwali':
        return <Flame className="w-6 h-6 text-[#F2D98B]" />;
      case 'christmas':
        return <Gift className="w-6 h-6 text-emerald-400" />;
      case 'new-year':
        return <PartyPopper className="w-6 h-6 text-blue-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-300" />;
    }
  };

  const renderFestivalCard = (item: UpcomingFestival | undefined, priorityNumber: number) => {
    if (!item) return null;

    const { festival, calendar, isCountdownActive, isCelebrating, daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining, features } = item;

    const units = [
      { labelEn: 'Days', labelHi: 'दिन', value: daysRemaining },
      { labelEn: 'Hours', labelHi: 'घंटे', value: hoursRemaining },
      { labelEn: 'Minutes', labelHi: 'मिनट', value: minutesRemaining },
      { labelEn: 'Seconds', labelHi: 'सेकंड', value: secondsRemaining },
    ];

    const isPrimary = priorityNumber === 1;

    return (
      <motion.div
        key={festival.id}
        data-testid={`upcoming-festival-card-${priorityNumber}`}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: (priorityNumber - 1) * 0.1 }}
        className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden border transition-all duration-300 ${
          isPrimary
            ? 'bg-gradient-to-br from-[#2D164D] via-[#200D36] to-[#140624] border-[#F2D98B]/50 shadow-2xl ring-1 ring-[#F2D98B]/30'
            : 'bg-gradient-to-br from-[#220E3D]/95 via-[#1A0A30]/95 to-[#120622]/95 border-brand-gold/30 shadow-xl'
        }`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30 ${
            isPrimary ? 'bg-amber-500/25' : 'bg-purple-600/20'
          }`}
          aria-hidden="true"
        />

        <div>
          {/* Card Eyebrow Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-royal/90 border border-brand-gold/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-champagne">
              <Clock size={12} className="text-brand-gold" />
              <span>
                {isPrimary
                  ? (isCelebrating
                      ? (isHindi ? 'प्रथम पावन पर्व (सजीव उत्सव)' : 'Live Celebration (Priority 1)')
                      : (isHindi ? 'प्रथम आगामी पर्व (Priority 1)' : 'Next Upcoming (Priority 1)'))
                  : (isHindi ? 'द्वितीय आगामी पर्व (Priority 2)' : 'Following Celebration (Priority 2)')}
              </span>
            </div>

            {isCelebrating ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                <Sparkles size={11} />
                {isHindi ? 'पर्व जारी है' : 'Live Celebration'}
              </span>
            ) : isCountdownActive ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#F2D98B] border border-amber-500/40 text-[11px] font-bold">
                <Clock size={11} />
                {isHindi ? 'उलटी गिनती जारी' : 'Live Countdown'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-brand-champagne/80 border border-white/20 text-[11px] font-medium">
                <Calendar size={11} />
                {isHindi ? `${daysRemaining} दिन शेष` : `In ${daysRemaining} Days`}
              </span>
            )}
          </div>

          {/* Festival Name & Artwork Header */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-white">
                {isHindi ? festival.nameHi : festival.nameEn}
              </h3>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-brand-champagne/80 font-sans mt-1">
                <Calendar size={13} className="text-brand-gold" />
                <span>{isHindi ? calendar.tithiHi : calendar.tithiEn}</span>
              </div>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-brand-royal/70 border border-brand-gold/30 flex items-center justify-center shrink-0 shadow-inner">
              {getFestivalIcon(festival.id)}
            </div>
          </div>

          {/* Festival Description */}
          <p className="font-sans text-xs sm:text-sm text-brand-white/80 leading-relaxed mb-6">
            {isHindi ? calendar.celebrationMessageHi || festival.descHi : calendar.celebrationMessageEn || festival.descEn}
          </p>

          {/* Dynamic Countdown or Upcoming Status */}
          {isCelebrating ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center mb-6">
              <span className="text-sm font-bold text-[#F2D98B] block">
                {isHindi ? '✨ पावन महापर्व का शुभागमन हो चुका है! ✨' : '✨ Sacred Celebration is Happening Now! ✨'}
              </span>
            </div>
          ) : isCountdownActive ? (
            <div className="mb-6">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-brand-champagne/70 mb-2 text-center">
                {isHindi ? 'पर्व प्रारंभ होने में शेष समय' : 'Time Remaining to Celebration'}
              </span>
              <div data-testid="countdown-grid" className="grid grid-cols-4 gap-2 sm:gap-3">
                {units.map((u, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-3 rounded-2xl bg-[#140824]/90 border border-brand-gold/30 backdrop-blur-md shadow-card-luxury flex flex-col items-center justify-center group"
                  >
                    <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gold-gradient tracking-tight">
                      {String(u.value).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest font-semibold text-brand-champagne/80 mt-0.5">
                      {isHindi ? u.labelHi : u.labelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/15 text-center mb-6">
              <span className="text-xs text-brand-champagne/80 block">
                {isHindi
                  ? `यह पर्व ${formatDateInIST(item.startDateIso, 'hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })} को है। उलटी गिनती ७ दिन पूर्व स्वतः प्रारंभ होगी।`
                  : `Celebration date: ${formatDateInIST(item.startDateIso, 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}. Live countdown begins 7 days prior.`}
              </span>
            </div>
          )}
        </div>

        {/* Feature Action Links (Only Available Features Displayed) */}
        <div className="pt-4 border-t border-brand-gold/20 flex flex-wrap items-center gap-2">
          {features.hasGreetings && (
            <Link
              to={features.greetingsUrl || `/greetings/${festival.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-royal text-[#F2D98B] border border-brand-gold/30 hover:border-brand-gold text-xs font-semibold transition-colors"
            >
              <Sparkles size={12} className="text-[#F2D98B]" />
              <span>{isHindi ? 'ग्रीटिंग्स' : 'Greetings'}</span>
            </Link>
          )}

          {features.hasWishes && (
            <Link
              to={features.wishesUrl || `/wishes/${festival.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-royal text-[#F2D98B] border border-brand-gold/30 hover:border-brand-gold text-xs font-semibold transition-colors"
            >
              <BookOpen size={12} className="text-[#F2D98B]" />
              <span>{isHindi ? 'शुभकामनाएं' : 'Wishes'}</span>
            </Link>
          )}

          {features.hasPhotoGreetings && (
            <Link
              to={features.photoGreetingsUrl || `/photo-greetings/${festival.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-royal text-[#F2D98B] border border-brand-gold/30 hover:border-brand-gold text-xs font-semibold transition-colors"
            >
              <ImageIcon size={12} className="text-[#F2D98B]" />
              <span>{isHindi ? 'फोटो कार्ड्स' : 'Photo Cards'}</span>
            </Link>
          )}

          {features.hasGuide && (
            <Link
              to={features.guideUrl || `/festivals/${festival.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F2D98B] text-[#24113D] hover:bg-[#ffe39c] text-xs font-bold transition-colors ml-auto"
            >
              <span>{isHindi ? 'पूरा उत्सव विवरण' : 'Full Guide'}</span>
              <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section
      data-testid="upcoming-festivals-countdown"
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#24113D] via-[#2F154E] to-[#24113D] text-brand-white overflow-hidden border-y border-brand-gold/30"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 bg-mandala opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Atmospheric Central Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-royal/90 border border-brand-gold/40 shadow-royal mb-3"
          >
            <Clock size={13} className="text-brand-gold" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest-luxury font-bold text-brand-champagne">
              {loc('Upcoming Sacred Celebrations', 'आगामी पावन महापर्व', 'Upcoming Festival Celebrations')}
            </span>
          </motion.div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white">
            {loc('Next Upcoming Festivals on FestiveWala', 'फेस्टिववाला पर आगामी पावन पर्व', 'Upcoming Festivals on FestiveWala')}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-champagne/80 mt-2 max-w-xl mx-auto leading-relaxed">
            {loc(
              'Dynamic countdown, auspicious muhurats, custom greetings, and heartfelt wishes for India’s next celebrations.',
              'भारत के पावन महापर्वों के लिए सटीक मुहूर्त, सजीव उलटी गिनती, व्यक्तिगत ग्रीटिंग कार्ड्स एवं मंगलकारी संदेश।',
              'Next upcoming festivals ke liye live countdown, greetings aur wishes explore karein.'
            )}
          </p>
        </div>

        {/* Dynamic 2-Festival Discovery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {renderFestivalCard(p1, 1)}
          {renderFestivalCard(p2, 2)}
        </div>
      </div>
    </section>
  );
};
