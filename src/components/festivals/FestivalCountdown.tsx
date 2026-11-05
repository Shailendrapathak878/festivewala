import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { getFestivalCalendarEntry, type FestivalCalendarEntry } from '../../data/festivals/festivalCalendar';
import { getNextUpcomingFestival } from '../../data/festivals';
import { formatDateInIST } from '../../utils/festivalDateUtils';
import { Sparkles, Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: 'upcoming' | 'celebrating' | 'ended';
}

interface FestivalCountdownProps {
  festivalId?: string;
  className?: string;
  showExploreLink?: boolean;
}

export const FestivalCountdown: React.FC<FestivalCountdownProps> = ({
  festivalId,
  className = '',
  showExploreLink = true,
}) => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Retrieve calendar entry from centralized calendar config or next upcoming festival
  const config: FestivalCalendarEntry = React.useMemo(() => {
    if (festivalId) {
      const entry = getFestivalCalendarEntry(festivalId);
      if (entry) return entry;
    }
    const next = getNextUpcomingFestival();
    return {
      festivalId: next.festival.id,
      displayNameEn: next.festival.nameEn,
      displayNameHi: next.festival.nameHi,
      startDateIso: next.targetDate.toISOString(),
      endDateIso: new Date(next.targetDate.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      timezone: 'Asia/Kolkata',
      tithiEn: next.festival.tithiEn,
      tithiHi: next.festival.tithiHi,
      countdownEnabled: true,
      countdownLabelEn: `Upcoming Celebration: ${next.festival.nameEn}`,
      countdownLabelHi: `आगामी महापर्व: ${next.festival.nameHi}`,
      celebrationMessageEn: `✨ Happy ${next.festival.nameEn}! May this sacred celebration bring eternal peace, wisdom, and boundless joy! 🪔`,
      celebrationMessageHi: `✨ शुभ ${next.festival.nameHi}! यह पावन पर्व आपके जीवन में शांति, ज्ञान और असीम खुशियां लाए! 🪔`,
      eventEndedMessageEn: `${next.festival.nameEn} celebrations have concluded. Cherish memories and explore festive greetings.`,
      eventEndedMessageHi: `${next.festival.nameHi} का पर्व संपन्न हुआ। पावन स्मृतियां संजोएं और शुभकामनाएं प्रेषित करें।`,
      panchangSource: 'Vedic Panchang Calendar',
      year: 2026,
    };
  }, [festivalId]);

  const targetStartTime = React.useMemo(() => new Date(config.startDateIso).getTime(), [config.startDateIso]);
  const targetEndTime = React.useMemo(
    () => (config.endDateIso ? new Date(config.endDateIso).getTime() : targetStartTime + 24 * 60 * 60 * 1000),
    [config.endDateIso, targetStartTime]
  );

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();

    if (now > targetEndTime) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'ended' };
    }

    if (now >= targetStartTime && now <= targetEndTime) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, status: 'celebrating' };
    }

    const difference = targetStartTime - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      status: 'upcoming',
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetStartTime, targetEndTime]);

  const units = [
    { labelEn: 'Days', labelHi: 'दिन', value: timeLeft.days },
    { labelEn: 'Hours', labelHi: 'घंटे', value: timeLeft.hours },
    { labelEn: 'Minutes', labelHi: 'मिनट', value: timeLeft.minutes },
    { labelEn: 'Seconds', labelHi: 'सेकंड', value: timeLeft.seconds },
  ];

  return (
    <div
      role="region"
      data-testid="festival-countdown"
      aria-label={isHindi ? `${config.displayNameHi} उलटी गिनती` : `${config.displayNameEn} Countdown Timer`}
      className={`relative p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-br from-[#24113D] via-[#2F154E] to-[#1A0B2E] border-2 border-[#F2D98B]/35 shadow-2xl overflow-hidden text-center ${className}`}
    >
      {/* Background Mandala Watermark */}
      <div className="absolute inset-0 bg-mandala opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#F2D98B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-4 sm:space-y-5">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#45216B]/80 border border-[#F2D98B]/40 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F2D98B]">
          <Clock size={13} className="text-[#F2D98B]" />
          <span>
            {timeLeft.status === 'celebrating'
              ? (isHindi ? 'पावन उत्सव आज जारी है' : 'Live Celebration Today')
              : (isHindi ? config.countdownLabelHi : config.countdownLabelEn)}
          </span>
        </div>

        {/* Tithi Display */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#FAF7F0]/85">
          <Calendar size={14} className="text-[#F2D98B]" />
          <span>{isHindi ? config.tithiHi : config.tithiEn}</span>
        </div>

        {/* STATUS: CELEBRATING NOW */}
        {timeLeft.status === 'celebrating' && (
          <motion.div
            initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#F2D98B]/25 to-[#D4AF37]/20 border border-[#F2D98B] shadow-lg text-[#FAF7F0]"
          >
            <div className="flex items-center justify-center gap-2 text-amber-300 mb-2">
              <Sparkles size={22} className="animate-pulse" />
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
                {isHindi ? 'पर्व का पावन शुभागमन!' : 'Festival is Live!'}
              </span>
              <Sparkles size={22} className="animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/90 leading-relaxed max-w-md mx-auto">
              {isHindi ? config.celebrationMessageHi : config.celebrationMessageEn}
            </p>
          </motion.div>
        )}

        {/* STATUS: FESTIVAL CONCLUDED / EVENT ENDED */}
        {timeLeft.status === 'ended' && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/20 text-[#FAF7F0]/80">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
              <CheckCircle2 size={18} />
              <span className="text-sm font-bold">{isHindi ? 'पर्व संपन्न हुआ' : 'Celebration Concluded'}</span>
            </div>
            <p className="text-xs text-[#FAF7F0]/70 max-w-md mx-auto">
              {isHindi ? config.eventEndedMessageHi : config.eventEndedMessageEn}
            </p>
          </div>
        )}

        {/* STATUS: UPCOMING DYNAMIC COUNTDOWN GRID OR UPCOMING STATUS CARD */}
        {timeLeft.status === 'upcoming' && (
          targetStartTime - Date.now() <= 7 * 24 * 60 * 60 * 1000 ? (
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-md mx-auto">
              {units.map((unit, index) => (
                <div
                  key={index}
                  className="p-2.5 sm:p-3.5 rounded-2xl bg-[#160826]/90 border border-[#F2D98B]/30 backdrop-blur-md shadow-card-luxury flex flex-col items-center justify-center"
                >
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2D98B] tracking-tight">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#FAF7F0]/80 mt-1">
                    {isHindi ? unit.labelHi : unit.labelEn}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 max-w-md mx-auto text-center space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-[#F2D98B] block">
                {isHindi ? 'आगामी उत्सव तिथि' : 'Scheduled Celebration Date'}
              </span>
              <p className="text-sm font-semibold text-[#FAF7F0]">
                {formatDateInIST(config.startDateIso, isHindi ? 'hi-IN' : 'en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="text-xs text-[#FAF7F0]/70 pt-1">
                {isHindi
                  ? 'पर्व प्रारंभ होने के ७ दिन पूर्व सजीव उलटी गिनती स्वतः प्रारंभ होगी।'
                  : 'Live seconds-level countdown begins automatically 7 days prior to celebration.'}
              </p>
            </div>
          )
        )}

        {/* Action Link to Festival Experience */}
        {showExploreLink && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/festivals/${config.festivalId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all min-h-[44px]"
            >
              <span>{isHindi ? `${config.displayNameHi} संपूर्ण अनुभव` : `Explore ${config.displayNameEn}`}</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to={`/greeting-cards?festival=${config.festivalId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#45216B] hover:bg-[#5C2B8F] text-[#FAF7F0] border border-[#F2D98B]/40 font-semibold text-xs sm:text-sm shadow-md transition-all min-h-[44px]"
            >
              <Sparkles size={14} className="text-[#F2D98B]" />
              <span>{isHindi ? 'कार्ड बनाएं' : 'Create Greeting Card'}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
