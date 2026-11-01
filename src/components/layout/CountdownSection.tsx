import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getNextUpcomingFestival } from '../../data/festivals';
import { useLanguage } from '../../hooks/useLanguage';
import { PrimaryButton } from '../common/PrimaryButton';
import { Sparkles, Calendar, ArrowRight, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const CountdownSection: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Centralized festival retrieval
  const { festival, targetDate } = getNextUpcomingFestival();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPassed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { labelEn: 'Days', labelHi: 'दिन', value: timeLeft.days },
    { labelEn: 'Hours', labelHi: 'घंटे', value: timeLeft.hours },
    { labelEn: 'Minutes', labelHi: 'मिनट', value: timeLeft.minutes },
    { labelEn: 'Seconds', labelHi: 'सेकंड', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#24113D] via-[#2F154E] to-[#24113D] text-brand-white overflow-hidden border-y border-brand-gold/30">
      {/* Background Mandala Watermark */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      {/* Atmospheric Central Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-royal/90 border border-brand-gold/40 shadow-royal mb-4"
        >
          <Clock size={13} className="text-brand-gold" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest-luxury font-bold text-brand-champagne">
            {isHindi ? 'आगामी महापर्व' : 'Upcoming Celebration'}
          </span>
        </motion.div>

        {/* Festival Title & Tithi */}
        <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white">
            {isHindi ? festival.nameHi : festival.nameEn}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-brand-champagne/80 font-sans">
            <Calendar size={14} className="text-brand-gold" />
            <span>{isHindi ? festival.tithiHi : festival.tithiEn}</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-white/80 max-w-lg mx-auto pt-1 leading-relaxed">
            {isHindi ? festival.descHi : festival.descEn}
          </p>
        </div>

        {/* Countdown Time Grid (Mobile-Optimized Touch Grid) */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mb-8 sm:mb-10">
          {units.map((unit, index) => (
            <div
              key={index}
              className="relative p-2.5 sm:p-4 rounded-2xl bg-brand-deep/80 border border-brand-gold/30 backdrop-blur-md shadow-card-luxury flex flex-col items-center justify-center group"
            >
              {/* Gold Top Notch Indicator */}
              <span className="w-4 h-[1px] bg-brand-gold/60 mb-1" />

              {/* Digit Value */}
              <span className="font-display text-xl sm:text-3xl md:text-4xl font-bold text-gold-gradient tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>

              {/* Unit Label */}
              <span className="text-[9px] sm:text-[11px] font-sans uppercase tracking-widest-luxury font-semibold text-brand-champagne/80 mt-0.5">
                {isHindi ? unit.labelHi : unit.labelEn}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <PrimaryButton
            to={`/festivals#${festival.id}`}
            size="md"
            variant="gold"
            icon={<ArrowRight size={16} className="text-brand-deep" />}
            className="w-full sm:w-auto"
          >
            {isHindi ? `${festival.nameHi} संग्रह देखें` : `Explore ${festival.nameEn} Showcase`}
          </PrimaryButton>

          <PrimaryButton
            to="/greeting-cards"
            size="md"
            variant="royal"
            icon={<Sparkles size={16} className="text-brand-gold" />}
            className="w-full sm:w-auto"
          >
            {isHindi ? 'कार्ड तैयार करें' : 'Create Greeting Card'}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

