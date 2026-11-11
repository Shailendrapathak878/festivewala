import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { HeroFestivalCarousel } from '../layout/HeroFestivalCarousel';
import { Sparkles } from 'lucide-react';

export const UpcomingCelebrationsSection: React.FC = () => {
  const { loc } = useLanguage();

  return (
    <section
      id="upcoming-celebrations"
      aria-labelledby="upcoming-celebrations-heading"
      className="bg-brand-deep border-b border-brand-gold/30 relative"
    >
      <div className="pt-10 sm:pt-14 pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-royal text-[#F2D98B] border border-brand-gold/40 shadow-sm mb-3">
          <Sparkles size={13} className="text-[#F2D98B]" />
          <span>{loc('Cultural Calendar', 'सांस्कृतिक पंचांग', 'Festival Calendar')}</span>
        </div>

        <h2
          id="upcoming-celebrations-heading"
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FAF7F0] tracking-tight"
        >
          {loc(
            'Upcoming Festivals & Celebrations',
            'आगामी पर्व व पावन उत्सव',
            'Upcoming Festivals & Celebrations'
          )}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-brand-champagne/80 max-w-2xl mx-auto font-sans leading-relaxed">
          {loc(
            'Stay connected with sacred Indian traditions — real-time countdowns, auspicious tithis, and celebratory cards throughout the year.',
            'वर्षभर के प्रमुख भारतीय त्योहारों की प्रामाणिक तिथियां, शुभ मुहूर्त और विशेष ग्रीटिंग्स से जुड़े रहें।',
            'Year-round festival calendar, verified dates, countdowns aur celebration guides.'
          )}
        </p>
      </div>

      {/* Embedded Dynamic Priority Carousel (retains test attributes) */}
      <HeroFestivalCarousel />
    </section>
  );
};

